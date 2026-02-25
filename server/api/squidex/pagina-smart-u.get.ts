import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-smart-u', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Smart U no encontrada en Squidex' })
    }

    const data = item.data

    // Helper: primer valor de objeto (property1, property2...)
    function firstVal<T>(field: any): T | undefined {
      if (!field) return undefined
      if (field.iv !== undefined) return field.iv as T
      const vals = Object.values(field)
      return vals[0] as T | undefined
    }

    // Helper: strip HTML tags → texto plano
    function stripHtml(html: string): string {
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&oacute;/g, 'ó').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ').replace(/\s+/g, ' ').trim()
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

    // ── Sección 1: Reinscripción ──────────────────────────────────────────────
    const reinscripcion = {
      titulo: firstVal<string>(data?.['tituloPagina']) ?? 'Smart U',
      parrafo: firstVal<string>(data?.['seccion1-parrafo']) ?? '',
      btnTexto: firstVal<string>(data?.['seccion1-btnTexto']) ?? 'APLICAR',
      btnUrl: firstVal<string>(data?.['seccion1-btnUrl']) ?? '#',
    }

    // ── Sección 2: Beneficios y Descuentos ───────────────────────────────────
    const beneficiosRaw: any = firstVal(data?.['seccion2-imagenIzq'])
    const btn1Raw: any = firstVal(data?.['seccion2-btn1'])
    const btn2Raw: any = firstVal(data?.['seccion2-btn2'])

    const beneficios = {
      titulo: firstVal<string>(data?.['seccion2-titulo']) ?? 'Beneficios y Descuentos',
      imagenIzq: assetUrl(beneficiosRaw),
      parrafo: firstVal<string>(data?.['seccion2-parrafo']) ?? '',
      btn1: btn1Raw ? {
        texto: btn1Raw.texto ?? '',
        icono: assetUrl(btn1Raw.icono),
        enlace: btn1Raw.enlace ?? '#',
      } : null,
      btn2: btn2Raw ? {
        texto: btn2Raw.texto ?? '',
        icono: assetUrl(btn2Raw.icono),
        enlace: btn2Raw.enlace ?? '#',
      } : null,
    }

    // ── Sección 3: Fechas Importantes ────────────────────────────────────────
    const fechasImgRaw: any = firstVal(data?.['seccion3-imagenIzq'])
    const fechasItems: any[] = firstVal(data?.['seccion3-fechas']) ?? []

    const fechas = {
      titulo: firstVal<string>(data?.['seccion3-titulo']) ?? 'Fechas Importantes',
      imagenIzq: assetUrl(fechasImgRaw),
      items: fechasItems.map((f: any) => ({
        fechaTitulo: f.fechaTitulo ?? '',
        fechaDiaHora: f.fechaDiaHora ?? '',
      })),
    }

    // ── Sección 4: Asesoría ──────────────────────────────────────────────────
    const asesoriaRaw: any = firstVal(data?.['seccion4-asesoria'])
    const asesoria = asesoriaRaw ? {
      parrafo: stripHtml(asesoriaRaw.contactoParrafo ?? ''),
      imagen: assetUrl(asesoriaRaw.contactoImagen),
      nombre: asesoriaRaw.contactoNombre ?? '',
      cargo: asesoriaRaw.contactoCargo ?? '',
      botones: (asesoriaRaw.boton ?? []).map((b: any) => ({
        texto: b.texto ?? '',
        enlace: b.enlace ?? '#',
        icono: assetUrl(b.icono),
      })),
    } : null

    // ── FAQs ─────────────────────────────────────────────────────────────────
    const faqsRaw: any = firstVal(data?.['FAQS'])
    const faqs = faqsRaw ? {
      titulo: faqsRaw.titulo ?? 'FAQs',
      items: (faqsRaw.items ?? []).map((f: any) => ({
        titulo: f.titulo ?? '',
        parrafo: f.parrafo ?? '',
        imagen: assetUrl(f.imagen),
      })),
    } : null

    return {
      reinscripcion,
      beneficios,
      fechas,
      asesoria,
      faqs,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-smart-u] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página Smart U' })
  }
})
