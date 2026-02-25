import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-powered-by-asu', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Powered by ASU no encontrada en Squidex' })
    }

    const data = item.data

    // Helper: primer valor de campo multiidioma (iv > es > en) o primer valor de objeto
    function resolve<T>(field: any): T | undefined {
      if (!field) return undefined
      return field.iv ?? field.es ?? field.en ?? (typeof field === 'object' ? Object.values(field)[0] as T : undefined)
    }

    // Helper: primer valor de objeto (property1, property2...)
    function firstVal<T>(field: any): T | undefined {
      if (!field) return undefined
      if (field.iv !== undefined || field.es !== undefined || field.en !== undefined) {
        return field.iv ?? field.es ?? field.en
      }
      const vals = Object.values(field)
      return vals[0] as T | undefined
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

    // ── Sección 1: Hero ───────────────────────────────────────────────────────
    const logoImgRaw = firstVal<string[]>(data?.['seccion1-logoImg'])
    const miniBannerRaw = firstVal<string[]>(data?.['seccion1-miniBannerImg'])
    const bannerImgRaw = firstVal<string[]>(data?.['seccion1-bannerImg'])

    const hero = {
      logoImg: assetUrl(logoImgRaw),
      miniBannerImg: assetUrl(miniBannerRaw),
      bannerImg: assetUrl(bannerImgRaw),
    }

    // ── Sección 2: Intro ──────────────────────────────────────────────────────
    const intro = {
      titulo: firstVal<string>(data?.['seccion2-titulo']) ?? '',
      parrafo: firstVal<string>(data?.['seccion2-parrafo']) ?? '',
    }

    // ── Sección 3: Beneficios Slider ──────────────────────────────────────────
    const beneficiosRaw: any = firstVal(data?.['seccion3-beneficioSlider'])
    const beneficios = beneficiosRaw ? {
      titulo: beneficiosRaw.titulo ?? '',
      bannerImg: assetUrl(beneficiosRaw.bannerImg),
      items: (beneficiosRaw.items ?? []).map((it: any) => ({
        titulo: it.titulo ?? '',
        texto: it.texto ?? '',
        imagen: assetUrl(it.imagen),
      })),
    } : null

    // ── Sección 4: Video ──────────────────────────────────────────────────────
    const videoTitulo = firstVal<string>(data?.['seccion4-titulo']) ?? ''
    const videoUrl = firstVal<string>(data?.['seccion4-videoUrl']) ?? 'https://www.youtube.com/embed/_L20QkHmTU8'

    // ── Sección 5: Competencias Slider ────────────────────────────────────────
    const competenciasRaw: any = firstVal(data?.['seccion5-competenciaSlider'])
    const competencias = competenciasRaw ? {
      titulo: competenciasRaw.titulo ?? '',
      bannerImg: assetUrl(competenciasRaw.bannerImg),
      items: (competenciasRaw.items ?? []).map((it: any) => ({
        titulo: it.titulo ?? '',
        texto: it.texto ?? '',
        imagen: assetUrl(it.imagen),
      })),
    } : null

    // ── Sección 6: Galería ────────────────────────────────────────────────────
    const galeriaRaw: any = firstVal(data?.['seccion6-galeria'])
    const galeria = galeriaRaw ? [
      assetUrl(galeriaRaw.imagen1),
      assetUrl(galeriaRaw.imagen2),
      assetUrl(galeriaRaw.imagen3),
      assetUrl(galeriaRaw.imagen4),
      assetUrl(galeriaRaw.imagen5),
      assetUrl(galeriaRaw.imagen6),
      assetUrl(galeriaRaw.imagen7),
      assetUrl(galeriaRaw.imagen8),
    ].filter(Boolean) : []

    // ── Sección 7: Presidentes ────────────────────────────────────────────────
    const presidenteTituloRaw = firstVal<string>(data?.['seccion7-presidenteTitulo']) ?? 'Presidentes'
    const presidenteSliderRaw: any[] = firstVal(data?.['seccion7-presidenteSlider']) ?? []
    
    const presidentes = presidenteSliderRaw.map((p: any) => ({
      titulo: presidenteTituloRaw,
      imgCircular: assetUrl(p.presidenteImagenCircular),
      logo: assetUrl(p.presidenteLogo),
      parrafo: p.presidenteParrafo ?? '',
    }))

    // ── Sección 8: Comunicado ─────────────────────────────────────────────────
    const comunicadoImgRaw = firstVal<string[]>(data?.['seccion8-img'])
    const comunicado = {
      img: assetUrl(comunicadoImgRaw),
      parrafo: firstVal<string>(data?.['seccion8-parrafo']) ?? '',
      textoBtn: firstVal<string>(data?.['seccion8-textoBtn']) ?? '',
      textoUrl: firstVal<string>(data?.['seccion8-textoUrl']) ?? '',
    }

    return {
      hero,
      intro,
      beneficios,
      video: { titulo: videoTitulo, url: videoUrl },
      competencias,
      galeria,
      presidentes,
      comunicado,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-asu] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página ASU' })
  }
})
