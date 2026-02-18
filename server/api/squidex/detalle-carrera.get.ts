import { fetchSquidexContentBySlug, fetchSquidexContent, fetchSquidexContentById } from '../../utils/squidex'
import type { CareerData, DetalleCarreraData, ModalidadData, MateriaData, PensumCiclo, PensumCicloResolved } from '~/types/squidex'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = query.slug as string

  if (!slug) {
    throw createError({ statusCode: 400, message: 'slug parameter is required' })
  }

  try {
    console.log(`[detalle-carrera] Buscando slug: "${slug}"`)

    // Buscar en múltiples idiomas: iv, es, en
    const idiomas = ['iv', 'es', 'en']
    let carrera = null

    for (const lang of idiomas) {
      carrera = await fetchSquidexContentBySlug<CareerData>('carreras', slug, lang)
      if (carrera) {
        console.log(`[detalle-carrera] Encontrada en idioma "${lang}": ${carrera.id}`)
        break
      }
    }

    // Si no encontró, buscar todas las carreras y comparar slug normalizado (sin tildes)
    if (!carrera) {
      console.log(`[detalle-carrera] No encontrada por slug exacto, buscando por slug normalizado...`)
      const todas = await fetchSquidexContent<CareerData>('carreras', { $top: 200 })
      const slugNorm = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      carrera = todas.items.find(item => {
        const s = item.data?.slug
        const val = s?.iv || s?.es || s?.en || ''
        const valNorm = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        return valNorm === slugNorm
      }) || null
      if (carrera) console.log(`[detalle-carrera] Encontrada por slug normalizado: ${carrera.id}`)
    }

    if (!carrera) {
      console.log(`[detalle-carrera] No encontrada con slug "${slug}"`)
      throw createError({ statusCode: 404, message: `Carrera con slug "${slug}" no encontrada` })
    }

    // 2. Resolver nombre de modalidad
    let modalidadNombre = ''
    try {
      const modalidadIds: string[] = carrera.data?.['modalidad-ref']?.iv || carrera.data?.['modalidad-ref']?.es || []
      if (modalidadIds.length > 0) {
        const modalidad = await fetchSquidexContentById<ModalidadData>('modalidades', modalidadIds[0]!)
        modalidadNombre = modalidad?.data?.modalidadNombre?.iv || modalidad?.data?.modalidadNombre?.es || ''
      }
    } catch {
      // continuar sin nombre de modalidad
    }

    // 3. Buscar el detalle-carrera que referencia esta carrera por su ID
    // Squidex no soporta contains/eq en arrays de referencias, traemos todos y filtramos en memoria
    let detalle = null
    try {
      const detalles = await fetchSquidexContent<DetalleCarreraData>('detalles-carrera', { $top: 100 })
      detalle = detalles.items.find(item => {
        const refs: string[] = item.data?.['carreras-ref']?.iv || item.data?.['carreras-ref']?.es || []
        return refs.includes(carrera!.id)
      }) || null
      console.log(`[detalle-carrera] detalle encontrado: ${detalle ? detalle.id : 'ninguno'}`)
    } catch {
      // Si falla, continuar sin detalle
    }

    // 4. Resolver pensum: cada MateriasDelCiclo contiene UUIDs de referencias al schema "materias"
    let pensumResuelto: PensumCicloResolved[] = []
    try {
      const pensumRaw: PensumCiclo[] = carrera.data?.pensum?.iv || carrera.data?.pensum?.es || []
      if (pensumRaw.length > 0) {
        // Recolectar todos los IDs únicos de materias
        const todosIds = [...new Set(pensumRaw.flatMap(c => c.MateriasDelCiclo || []))]

        // Resolver todas las materias en paralelo
        const materiasMap = new Map<string, { nombre: string; esASU: boolean }>()
        await Promise.all(
          todosIds.map(async (id) => {
            try {
              const materia = await fetchSquidexContentById<MateriaData>('materias', id)
              if (materia) {
                const nombre = materia.data?.nombre?.iv || materia.data?.nombre?.es || ''
                const esASU = materia.data?.esASU?.iv ?? materia.data?.esASU?.es ?? false
                materiasMap.set(id, { nombre, esASU })
              }
            } catch {
              // ignorar materias que fallen
            }
          })
        )

        // Log raw del primer ciclo para ver estructura de esASU
        console.log(`[detalle-carrera] pensumRaw[0] raw:`, JSON.stringify(pensumRaw[0]))
        if (pensumRaw.length > 2) console.log(`[detalle-carrera] pensumRaw[2] raw:`, JSON.stringify(pensumRaw[2]))

        // Construir pensum resuelto
        pensumResuelto = pensumRaw.map(ciclo => ({
          nombreCiclo: ciclo.nombreCiclo,
          esASU: (ciclo.esASU as any) === true || (ciclo.esASU as any) === 'true' || (ciclo.esASU as any)?.iv === true || false,
          materias: (ciclo.MateriasDelCiclo || []).map((id: string) => materiasMap.get(id) ?? { nombre: id, esASU: false })
        }))

        // DEBUG: log pensum resuelto
        console.log(`[detalle-carrera] pensumResuelto ciclos: ${pensumResuelto.length}`)
        pensumResuelto.forEach(ciclo => {
          console.log(`[detalle-carrera] Ciclo "${ciclo.nombreCiclo}" esASU=${ciclo.esASU} materias:`, JSON.stringify(ciclo.materias))
        })
      }
    } catch {
      // continuar sin pensum resuelto
    }

    return {
      carrera,
      detalle,
      modalidadNombre,
      pensumResuelto
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    throw createError({ statusCode: 500, message: 'Error al obtener detalle de carrera' })
  }
})
