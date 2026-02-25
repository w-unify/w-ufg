import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-conexion-u', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Conexión U no encontrada en Squidex' })
    }

    const data = item.data

    // Helper: primer valor de objeto (property1, property2…)
    function firstVal<T>(field: any): T | undefined {
      if (!field) return undefined
      if (field.iv !== undefined) return field.iv as T
      const vals = Object.values(field)
      return vals[0] as T | undefined
    }

    // Helper: strip HTML → texto plano
    function stripHtml(html: string): string {
      return (html ?? '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&oacute;/g, 'ó').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é')
        .replace(/&iacute;/g, 'í').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ')
        .replace(/&Ntilde;/g, 'Ñ')
        .replace(/\s+/g, ' ')
        .trim()
    }

    // Helper: URL de asset
    const config = useRuntimeConfig()
    const baseUrl = config.squidex.url
    const appName = config.squidex.appName

    function assetUrl(ids: string[] | string | undefined): string {
      if (!ids) return ''
      const id = Array.isArray(ids) ? ids[0] : ids
      if (!id) return ''
      return `${baseUrl}/api/assets/${appName}/${id}`
    }

    // ── Sección 1: Beneficios Estudiantiles ───────────────────────────────────
    const beneficiosRaw: any = firstVal(data?.['seccion1-beneficiosEstudiantiles'])
    const beneficios = beneficiosRaw ? {
      tituloSeccion: beneficiosRaw.tituloTag ?? 'Beneficios estudiantiles',
      tabs: Array.isArray(beneficiosRaw)
        ? beneficiosRaw.map((tab: any) => ({
            id: (tab.tituloTag ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            label: tab.tituloTag ?? '',
            items: (tab.tagItem ?? []).map((it: any) => ({
              titulo: it.tituloItem ?? '',
              contenido: it.textoEnriquecido ?? '',
            })),
          }))
        : [{
            id: (beneficiosRaw.tituloTag ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            label: beneficiosRaw.tituloTag ?? '',
            items: (beneficiosRaw.tagItem ?? []).map((it: any) => ({
              titulo: it.tituloItem ?? '',
              contenido: it.textoEnriquecido ?? '',
            })),
          }],
    } : null

    // Si beneficios tiene múltiples tabs en property1, property2, etc. extraerlos todos
    const allBeneficiosTabs: any[] = []
    if (data?.['seccion1-beneficiosEstudiantiles']) {
      const field = data['seccion1-beneficiosEstudiantiles']
      const rawVals = field.iv !== undefined ? [field.iv] : Object.values(field)
      console.log('[Conexion-U] Total raw values from CMS:', rawVals.length)
      for (const val of rawVals) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const tab = val as any
          console.log('[Conexion-U] Extracting tab:', tab.tituloTag)
          allBeneficiosTabs.push({
            id: (tab.tituloTag ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            label: tab.tituloTag ?? '',
            items: (tab.tagItem ?? []).map((it: any) => ({
              titulo: it.tituloItem ?? '',
              contenido: it.textoEnriquecido ?? '',
            })),
          })
        }
      }
      console.log('[Conexion-U] Total tabs extracted:', allBeneficiosTabs.length)
    }

    // ── Sección 2: Video Slider (Stories UFG) ────────────────────────────────
    const videoSliderRaw: any[] = firstVal(data?.['seccion2-videoSlider']) ?? []
    const bannerFondoRaw: any = firstVal(data?.['seccion2-bannerFondo'])
    const videoSlider = videoSliderRaw.map((v: any) => ({
      titulo: v.titulo ?? '',
      videoUrl: v.videoURL ?? '',
      nombrePersona: v.nombrePersona ?? '',
      profesionPersona: v.profesionPersona ?? '',
    }))
    const bannerFondo = assetUrl(bannerFondoRaw)

    // ── Sección 3: Contactos ──────────────────────────────────────────────────
    const contactosRaw: any[] = firstVal(data?.['seccion3-contactos']) ?? []
    const contactos = contactosRaw.map((c: any) => ({
      parrafo: stripHtml(c.contactoParrafo ?? ''),
      imagen: assetUrl(c.contactoImagen),
      nombre: c.contactoNombre ?? '',
      cargo: c.contactoCargo ?? '',
      botones: (c.boton ?? [])
        .map((b: any) => {
          const raw = stripHtml(b.texto ?? '')
          // Si el texto contiene teléfono o email, extraer solo esa parte
          const emailMatch = raw.match(/[\w.+-]+@[\w-]+\.[\w.]+/)
          const phoneMatch = raw.match(/[\d\-+]{7,15}/)
          // Si el texto tiene espacios (más de una palabra) y supera 20 chars, es texto contaminado
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

    // ── Sección 4: JoinWork ───────────────────────────────────────────────────
    const joinWorkImgRaw: any = firstVal(data?.['seccion4-imagenIzq'])
    const joinWork = {
      imagenIzq: assetUrl(joinWorkImgRaw),
      parrafo: firstVal<string>(data?.['seccion4-parrafo']) ?? '',
    }

    return {
      tituloPagina: firstVal<string>(data?.['tituloPagina']) ?? 'Conexión U',
      beneficiosTabs: allBeneficiosTabs.length ? allBeneficiosTabs : (beneficios?.tabs ?? []),
      videoSlider,
      bannerFondo,
      contactos,
      joinWork,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-conexion-u] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página Conexión U' })
  }
})
