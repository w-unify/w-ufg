import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-rsu', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página RSU no encontrada en Squidex' })
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

    function stripHtml(html: string): string {
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
    }

    // ── Sección 1: Cuadrícula de cards ────────────────────────────────────────
    const cuadriculaRaw: any[] = firstVal(data?.['seccion1-cuadricula']) ?? []
    const cuadricula = cuadriculaRaw.map((c: any) => ({
      parrafo: c.parrafo ?? '',
      imagen: assetUrl(c.imagen),
    }))

    // ── Sección 2: Beneficios estudiantes (slider imagen circular) ────────────
    const beneficiosTitulo = firstVal<string>(data?.['seccion2-beneficios-titulo']) ?? 'Beneficios de Estudiantes UFG'
    const beneficiosRaw: any[] = firstVal(data?.['seccion2-beneficios-slider']) ?? []
    const beneficios = beneficiosRaw.map((b: any) => ({
      imagenCircular: assetUrl(b.imagenCircular),
      parrafo: b.parrafo ?? '',
    }))

    // ── Sección 3: Colaboradores (slider con fondo imagen) ────────────────────
    const colaboradoresTitulo = firstVal<string>(data?.['seccion3-colaboradores-titulo']) ?? 'Beneficios para Colaboradores'
    const colaboradoresFondo = assetUrl(firstVal(data?.['seccion3-colaboradores-slider-fondo']))
    const colaboradoresRaw: any[] = firstVal(data?.['seccion3-colaboradores-slider']) ?? []
    const colaboradores = colaboradoresRaw.map((c: any) => ({
      parrafo: c.parrafo ?? '',
    }))

    // ── Sección 4: Marco Estratégico (tabs) ───────────────────────────────────
    const marcoTitulo = firstVal<string>(data?.['seccion4-titulo']) ?? 'Marco Estratégico de Sostenibilidad'
    const marcoTabs: any[] = []
    if (data?.['seccion4-tabs']) {
      const field = data['seccion4-tabs']
      const rawVals = field.iv !== undefined ? [field.iv] : Object.values(field)
      for (const val of rawVals) {
        if (Array.isArray(val)) {
          for (const tab of val) {
            marcoTabs.push({
              id: (tab.tituloTag ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
              label: tab.tituloTag ?? '',
              items: (tab.tagItem ?? []).map((it: any) => ({
                titulo: it.tituloItem ?? '',
                contenido: it.textoEnriquecido ?? '',
              })),
            })
          }
        }
      }
    }

    return {
      tituloPagina: firstVal<string>(data?.['tituloPagina']) ?? 'Responsabilidad Social Universitaria',
      cuadricula,
      beneficiosTitulo,
      beneficios,
      colaboradoresTitulo,
      colaboradoresFondo,
      colaboradores,
      marcoTitulo,
      marcoTabs,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-rsu] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página RSU' })
  }
})
