import { fetchSquidexContent, fetchSquidexContentById } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-vida-estudiantil', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Vida Estudiantil no encontrada en Squidex' })
    }

    const data = item.data

    function firstVal<T>(field: any): T | undefined {
      if (!field) return undefined
      if (field.iv !== undefined) return field.iv as T
      const vals = Object.values(field)
      return vals[0] as T | undefined
    }

    const config = useRuntimeConfig()
    const baseUrl = config.squidex.url
    const appName = config.squidex.appName

    function assetUrl(ids: string[] | string | undefined): string {
      if (!ids) return ''
      const id = Array.isArray(ids) ? ids[0] : ids
      if (!id) return ''
      return `${baseUrl}/api/assets/${appName}/${id}`
    }

    function toDateStr(raw: string | undefined): string | undefined {
      if (!raw) return undefined
      return raw.split('T')[0]
    }

    // Sección 1: Calendario
    const calendarioTitulo = firstVal<string>(data?.['Seccion1-calendarioTitulo']) ?? 'Calendario Académico'

    // Obtener todos los eventos del calendario directamente (independiente de refs)
    const calendarioResult = await fetchSquidexContent('calendario-academico', { $top: 500 })
    const calendarioEvents: any[] = (calendarioResult.items ?? []).map((calItem: any) => {
      const d = calItem.data
      const esRango = firstVal<boolean>(d?.esRango) ?? false
      const label = firstVal<string>(d?.label) ?? ''
      const type = firstVal<string>(d?.type) ?? 'clases'
      const color = firstVal<string>(d?.color) ?? '#C3E8F8'

      if (esRango) {
        return {
          label, type, color,
          start: toDateStr(firstVal<string>(d?.fechaInicio)),
          end: toDateStr(firstVal<string>(d?.fechaFin)),
        }
      } else {
        return {
          label, type, color,
          date: toDateStr(firstVal<string>(d?.fecha)),
        }
      }
    })

    // Sección 2: Eventos
    const eventosTitulo = firstVal<string>(data?.['seccion2-eventos-titulo']) ?? 'Eventos'
    const eventosRaw: any[] = firstVal<any[]>(data?.['seccion2-eventos-items']) ?? []
    const eventos = eventosRaw.map((e: any) => ({
      imagen: assetUrl(e.imagen),
      titulo: e.titulo ?? '',
      descripcion: e.descripcion ?? '',
      fecha: e.fecha ?? '',
      dia: e.dia ?? '',
      mes: e.mes ?? '',
      modalidad: e.modalidad ?? '',
    }))

    // Sección 3: Clubes
    const clubesTitulo = firstVal<string>(data?.['seccion3-clubes-titulo']) ?? 'Clubes'
    const clubesImagenIzq = assetUrl(firstVal<string[]>(data?.['seccion3-clubes-imagenIzq']))
    const clubesRaw: any[] = firstVal<any[]>(data?.['seccion3-clubes-items']) ?? []
    const clubes = clubesRaw.map((c: any) => ({
      nombre: c.nombreClub ?? '',
      horario: c.horarioClub ?? '',
      modalidad: c.modalidadClub ?? '',
    }))

    // Sección 4: Galería
    const galeriaRaw: any = firstVal<any>(data?.['seccion4-galeria']) ?? {}
    const galeria: string[] = [
      galeriaRaw.imagen1, galeriaRaw.imagen2, galeriaRaw.imagen3, galeriaRaw.imagen4,
      galeriaRaw.imagen5, galeriaRaw.imagen6, galeriaRaw.imagen7, galeriaRaw.imagen8,
    ]
      .map((ids: any) => assetUrl(ids))
      .filter(Boolean)

    // Sección 5: Asistencias Estudiantiles
    const asistenciaTitulo = firstVal<string>(data?.['seccion5-asistencia-titulo']) ?? 'Asistencias Estudiantiles'
    const asistenciasRaw: any[] = firstVal<any[]>(data?.['seccion5-asistencia']) ?? []
    const asistencias = asistenciasRaw.map((a: any) => ({
      titulo: a.titulo ?? '',
      imagenMiniBanner: assetUrl(a.imagenMiniBanner),
      parrafo: a.parrafo ?? '',
      direccion: a.direccion ?? '',
      correo: a.correo ?? '',
      telefono: a.telefono ?? '',
      horario: a.horario ?? '',
    }))

    return {
      tituloPagina: firstVal<string>(data?.tituloPagina) ?? 'Vida Estudiantil',
      calendarioTitulo,
      calendarioEvents,
      eventosTitulo,
      eventos,
      clubesTitulo,
      clubesImagenIzq,
      clubes,
      galeria,
      asistenciaTitulo,
      asistencias,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode ?? 500,
      message: error.message ?? 'Error al obtener la página Vida Estudiantil',
    })
  }
})
