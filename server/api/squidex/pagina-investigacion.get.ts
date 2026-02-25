import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-investigacion', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Investigación no encontrada en Squidex' })
    }

    const data = item.data

    function firstVal<T>(field: any): T | undefined {
      if (!field) return undefined
      if (field.iv !== undefined) return field.iv as T
      const vals = Object.values(field)
      return vals[0] as T | undefined
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

    const config = useRuntimeConfig()
    const baseUrl = config.squidex.url
    const appName = config.squidex.appName

    function assetUrl(ids: string[] | string | undefined): string {
      if (!ids) return ''
      const id = Array.isArray(ids) ? ids[0] : ids
      if (!id) return ''
      return `${baseUrl}/api/assets/${appName}/${id}`
    }

    // ── Sección 1: Líneas de Investigación (parrafo + tabs) ───────────────────
    const lineasParrafo = firstVal<string>(data?.['seccion1-parrafo']) ?? ''

    const lineasTabs: any[] = []
    if (data?.['seccion1-tabs']) {
      const field = data['seccion1-tabs']
      const rawVals = field.iv !== undefined ? [field.iv] : Object.values(field)
      for (const val of rawVals) {
        if (Array.isArray(val)) {
          for (const tab of val) {
            lineasTabs.push({
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

    // ── Sección 2: Unidades de Apoyo ──────────────────────────────────────────
    const unidadesTitulo = firstVal<string>(data?.['seccion2-unidadesTitulo']) ?? 'Unidades de Apoyo Investigativo'
    const unidadesRaw: any[] = firstVal(data?.['seccion2-unidadesApoyo']) ?? []
    const unidades = unidadesRaw.map((u: any) => ({
      parrafo: u.contactoParrafo ?? '',
      botones: (u.boton ?? [])
        .map((b: any) => {
          const raw = stripHtml(b.texto ?? '')
          const emailMatch = raw.match(/[\w.+-]+@[\w-]+\.[\w.]+/)
          const phoneMatch = raw.match(/[\d\-+]{7,15}/)
          const isContaminated = raw.includes(' ') && raw.length > 20
          let texto = raw
          if (isContaminated) {
            texto = emailMatch?.[0] ?? phoneMatch?.[0] ?? ''
          }
          return {
            texto,
            enlace: b.enlace ?? '#',
            icono: assetUrl(b.icono),
          }
        })
        .filter((b: any) => b.texto.length > 0),
    }))

    // ── Sección 3: Publicaciones ──────────────────────────────────────────────
    const publicacionesTitulo = firstVal<string>(data?.['seccion3-publicaciones-titulo']) ?? 'Publicaciones'
    const publicacionesRaw: any[] = firstVal(data?.['seccion3-publicaciones-libros']) ?? []
    const publicaciones = publicacionesRaw.map((p: any) => ({
      imagen: assetUrl(p.imagen),
      titulo: p.titulo ?? '',
      categoria: p.categoria ?? '',
      botonNombre: p.botonNombre ?? 'DESCARGAR',
      botonUrl: assetUrl(p.botonUrl) || '#',
    }))

    return {
      tituloPagina: firstVal<string>(data?.['tituloPagina']) ?? 'Dirección de Investigación UFG',
      lineasParrafo,
      lineasTabs,
      unidadesTitulo,
      unidades,
      publicacionesTitulo,
      publicaciones,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-investigacion] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página Investigación' })
  }
})
