import { fetchSquidexContentBySlug, fetchSquidexContent, fetchSquidexContentById } from '../../utils/squidex'
import type { CareerData, DetalleCarreraData, ModalidadData, MateriaData, PensumCiclo, PensumCicloResolved } from '~/types/squidex'

export default defineEventHandler(async (event) => {
// export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = query.slug as string

  if (!slug) {
    throw createError({ statusCode: 400, message: 'slug parameter is required' })
  }

  try {
    console.log(`[detalle-carrera] Buscando slug: "${slug}"`)

    // Buscar carrera por slug normalizado (sin tildes)
    const slugNorm = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const todas = await fetchSquidexContent<CareerData>('carreras', { $top: 200 })
    const carrera = todas.items.find(item => {
      const s = item.data?.slug
      const val = s?.iv || s?.es || s?.en || ''
      const valNorm = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      return valNorm === slugNorm
    }) || null

    if (!carrera) {
      console.log(`[detalle-carrera] No encontrada con slug "${slug}"`)
      throw createError({ statusCode: 404, message: `Carrera con slug "${slug}" no encontrada` })
    }
    
    console.log(`[detalle-carrera] Carrera encontrada: ${carrera.id}`)

    // 2-3. Paralelizar: modalidad, detalles y TODAS las materias de una vez
    const [modalidadResult, detallesResult, todasMaterias] = await Promise.all([
      // Modalidad
      (async () => {
        try {
          const modalidadIds: string[] = carrera.data?.['modalidad-ref']?.iv || carrera.data?.['modalidad-ref']?.es || []
          if (modalidadIds.length > 0) {
            const modalidad = await fetchSquidexContentById<ModalidadData>('modalidades', modalidadIds[0]!)
            return modalidad?.data?.modalidadNombre?.iv || modalidad?.data?.modalidadNombre?.es || ''
          }
        } catch {}
        return ''
      })(),
      // Detalles
      (async () => {
        try {
          const detalles = await fetchSquidexContent<DetalleCarreraData>('detalles-carrera', { $top: 100 })
          return detalles.items.find(item => {
            const refs: string[] = item.data?.['carreras-ref']?.iv || item.data?.['carreras-ref']?.es || []
            return refs.includes(carrera!.id)
          }) || null
        } catch {}
        return null
      })(),
      // TODAS las materias con paginación (Squidex limita a 200 por página)
      (async () => {
        try {
          const pageSize = 200
          const first = await fetchSquidexContent<MateriaData>('materias', { $top: String(pageSize), $skip: '0' })
          const total = first.total
          let allItems = [...first.items]

          if (total > pageSize) {
            const pages = Math.ceil(total / pageSize)
            const requests = []
            for (let page = 1; page < pages; page++) {
              requests.push(fetchSquidexContent<MateriaData>('materias', { $top: String(pageSize), $skip: String(page * pageSize) }))
            }
            const results = await Promise.all(requests)
            results.forEach(r => { allItems = allItems.concat(r.items) })
          }

          console.log(`[detalle-carrera] Materias totales obtenidas: ${allItems.length} de ${total}`)
          return { items: allItems, total }
        } catch {
          return { items: [], total: 0 }
        }
      })()
    ])

    const modalidadNombre = modalidadResult
    const detalle = detallesResult

    // 4. Resolver pensum usando el Map de TODAS las materias (O(1) lookup)
    let pensumResuelto: PensumCicloResolved[] = []
    try {
      const pensumRaw: PensumCiclo[] = carrera.data?.pensum?.iv || carrera.data?.pensum?.es || []
      if (pensumRaw.length > 0) {
        // Crear Map de materias para lookup O(1)
        const materiasMap = new Map<string, { nombre: string; esASU: boolean }>()
        todasMaterias.items.forEach(materia => {
          const nombre = materia.data?.nombre?.iv || materia.data?.nombre?.es || ''
          const esASU = materia.data?.esASU?.iv ?? materia.data?.esASU?.es ?? false
          materiasMap.set(materia.id, { nombre, esASU })
        })

        console.log(`[detalle-carrera] Total materias en Map: ${materiasMap.size}`)
        console.log(`[detalle-carrera] Total ciclos en pensum: ${pensumRaw.length}`)
        
        // Log de primeros 3 IDs en el Map para debug
        const firstMapIds = Array.from(materiasMap.keys()).slice(0, 3)
        console.log(`[detalle-carrera] Ejemplo IDs en Map:`, firstMapIds)

        // Construir pensum resuelto (instantáneo con Map)
        pensumResuelto = pensumRaw.map((ciclo, cicloIdx) => {
          const materias = (ciclo.MateriasDelCiclo || []).map((id: string, materiaIdx: number) => {
            // Log del ID que estamos buscando
            if (cicloIdx === 0 && materiaIdx === 0) {
              console.log(`[detalle-carrera] Buscando ID (Ciclo 1, Materia 1): "${id}"`)
              console.log(`[detalle-carrera] Tipo de ID: ${typeof id}`)
              console.log(`[detalle-carrera] Longitud ID: ${id.length}`)
            }
            
            const materia = materiasMap.get(id)
            if (!materia) {
              console.log(`[detalle-carrera] ⚠️ Materia no encontrada en ${ciclo.nombreCiclo}: ID="${id}"`)
              return { nombre: `[Materia no encontrada: ${id.substring(0, 8)}...]`, esASU: false }
            }
            return materia
          })
          return {
            nombreCiclo: ciclo.nombreCiclo,
            esASU: (ciclo.esASU as any) === true || (ciclo.esASU as any) === 'true' || (ciclo.esASU as any)?.iv === true || false,
            materias
          }
        })
      }
    } catch (error) {
      console.error('[detalle-carrera] Error al resolver pensum:', error)
    }

    return {
      carrera,
      detalle,
      modalidadNombre,
      pensumResuelto
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    throw createError({ 
      statusCode: 500, 
      message: `Error al obtener detalle de carrera: ${error.message || 'Unknown error'}`
    })
  }
// }, {
//   maxAge: 60 * 60, // Cache por 1 hora (3600 segundos)
//   swr: true,       // Stale-While-Revalidate: sirve cache mientras regenera en background
//   getKey: (event) => {
//     const query = getQuery(event)
//     return `detalle-carrera:${query.slug}` // Key única por carrera
//   }
})
