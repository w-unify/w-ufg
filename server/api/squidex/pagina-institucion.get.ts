import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (_event) => {
  try {
    const result = await fetchSquidexContent('pagina-institucion', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página Institución no encontrada en Squidex' })
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

    // ── Sección 1: Hero ───────────────────────────────────────────────────────
    const bannerFondo = assetUrl(firstVal(data?.['seccion1-bannerFondo']))
    const logo = assetUrl(firstVal(data?.['seccion1-logo']))
    const mision = firstVal<string>(data?.['seccion1-mision']) ?? ''
    const vision = firstVal<string>(data?.['seccion1-vision']) ?? ''

    // ── Sección 2: Valores ────────────────────────────────────────────────────
    const valoresTitulo = firstVal<string>(data?.['seccion2-valores-titulo']) ?? 'Valores'
    const valoresItemsRaw: any[] = firstVal(data?.['seccion2-valores-items']) ?? []
    const valores = valoresItemsRaw.map((v: any) => v.valorNombre ?? '')

    // ── Sección 3: Historia ───────────────────────────────────────────────────
    const historiaTitulo = firstVal<string>(data?.['seccion3-historia-titulo']) ?? 'Nuestra Historia'
    const historiaItemsRaw: any[] = firstVal(data?.['seccion3-historia-item']) ?? []
    const historia = historiaItemsRaw.map((h: any) => ({
      fecha: h.fecha ?? '',
      parrafo: h.parrafo ?? '',
    }))

    // ── Sección 4: Organigrama ────────────────────────────────────────────────
    const organigramaTitulo = firstVal<string>(data?.['seccion4-titulo']) ?? 'Organización Funcional de la Universidad Francisco Gavidia'
    const organigramaImagen = assetUrl(firstVal(data?.['seccion4-imagen']))

    // ── Sección 5: Autoridades (tabs) ─────────────────────────────────────────
    const autoridades: any[] = []
    if (data?.['seccion5-tabs']) {
      const field = data['seccion5-tabs']
      const rawVals = field.iv !== undefined ? [field.iv] : Object.values(field)
      for (const val of rawVals) {
        if (Array.isArray(val)) {
          for (const tab of val) {
            autoridades.push({
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
    const autoridadesBtnTexto = firstVal<string>(data?.['seccion5-btnTexto']) ?? ''
    const autoridadesBtnUrl = firstVal<string>(data?.['seccion5-btnUrl']) ?? '#'

    // ── Sección 6: Acreditaciones ─────────────────────────────────────────────
    const acreditacionesTitulo = firstVal<string>(data?.['seccion6-acreditacionesTitulo']) ?? 'Acreditaciones'
    const acreditacionesRaw: any[] = firstVal(data?.['seccion6-acreditaciones']) ?? []
    const acreditaciones = acreditacionesRaw.map((a: any) => ({
      imagen: assetUrl(a.imagen),
      titulo: a.titulo ?? '',
    }))

    // ── Sección 7: Reglamento ─────────────────────────────────────────────────
    const reglamentoRaw: any = firstVal(data?.['seccion7-reglamentos'])
    const reglamento = reglamentoRaw ? {
      titulo: reglamentoRaw.titulo ?? 'Reglamento',
      items: (reglamentoRaw.items ?? []).map((it: any) => ({
        titulo: it.titulo ?? '',
        parrafo: it.parrafo ?? '',
        imagen: assetUrl(it.imagen),
      })),
    } : null

    return {
      tituloPagina: firstVal<string>(data?.['tituloPagina']) ?? 'Institución',
      hero: { bannerFondo, logo, mision, vision },
      valoresTitulo,
      valores,
      historiaTitulo,
      historia,
      organigramaTitulo,
      organigramaImagen,
      autoridades,
      autoridadesBtnTexto,
      autoridadesBtnUrl,
      acreditacionesTitulo,
      acreditaciones,
      reglamento,
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-institucion] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de la página Institución' })
  }
})
