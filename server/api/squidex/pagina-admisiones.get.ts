import { fetchSquidexContent, fetchSquidexContentById } from '../../utils/squidex'

export default defineEventHandler(async (event) => {
  try {
    // Traer el primer (y único) item del schema pagina-admisiones
    const result = await fetchSquidexContent('pagina-admisiones', { $top: 1 })
    const item = result.items[0]

    if (!item) {
      throw createError({ statusCode: 404, message: 'Página de admisiones no encontrada en Squidex' })
    }

    const data = item.data

    // Helper: resuelve campo multiidioma (iv > es > en)
    function resolve<T>(field: any): T | undefined {
      if (!field) return undefined
      return field.iv ?? field.es ?? field.en
    }

    // Helper: resuelve URL de asset desde Squidex
    const config = useRuntimeConfig()
    const baseUrl = config.squidex.url
    const appName = config.squidex.appName

    function assetUrl(ids: string[] | undefined): string {
      if (!ids || ids.length === 0) return ''
      return `${baseUrl}/api/assets/${appName}/${ids[0]}`
    }

    // Helper: divide observaciones en items individuales.
    // Soporta: saltos de línea (\n) o numeración inline ("1. texto 2. texto")
    function parseObservaciones(text: string | undefined): string[] {
      if (!text || !text.trim()) return []
      // Si tiene saltos de línea reales, dividir por ellos
      const byNewline = text.split('\n').map((l: string) => l.trim()).filter(Boolean)
      if (byNewline.length > 1) return byNewline
      // Si es un solo bloque, intentar dividir por patrón "N. " (número + punto + espacio)
      const byNumber = text.split(/(?=\d+\.\s)/).map((l: string) => l.trim()).filter(Boolean)
      if (byNumber.length > 1) return byNumber
      // Fallback: devolver como un solo item
      return [text.trim()]
    }

    // ── 1. Pasos de admisión ──────────────────────────────────────────────────
    const pasosRaw: any[] = resolve(data?.pasoAdmision) ?? []
    const pasos = pasosRaw.map((p: any, i: number) => ({
      numero: `PASO ${i + 1}`,
      titulo: p.titulo ?? '',
      descripcion: p.descripcion ?? '',
      icono: assetUrl(p.icono)
    }))

    // ── 2. Sección tags (Requisitos Pregrado) ─────────────────────────────────
    const seccionTagsRaw: any[] = resolve(data?.['seccion-tags']) ?? []
    const tabs = seccionTagsRaw.map((tab: any) => ({
      id: tab.tituloTag?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? `tab-${Math.random()}`,
      label: tab.tituloTag ?? '',
      pasos: (tab.tagItem ?? []).map((item: any) => ({
        numero: parseInt(item.pasoNumero ?? '0') || 0,
        contenido: [
          item.titulo ? `<strong>${item.titulo}</strong>` : '',
          item.descripcion ?? ''
        ].filter(Boolean).join('<br>')
      })),
      notas: parseObservaciones(tab.observaciones),
    }))

    // ── 3. Bloque informativo POV ─────────────────────────────────────────────
    const povRaw: any = resolve(data?.['bloque-informativo-pov'])
    const pov = povRaw ? {
      titulo: povRaw.titulo ?? '',
      subtitulo: povRaw.subtitulo ?? '',
      descripcion: povRaw.descripcionPrincipal ?? '',
      areasTitulo: povRaw.areasTitulo ?? '',
      areas: (povRaw.areasLista ?? []).map((a: any) => a.areaNombre ?? ''),
      pasosTitulo: povRaw.pasosTitulo ?? '',
      pasos: (povRaw.pasosLista ?? []).map((p: any) => p.pasosDescripcion ?? ''),
      agendaTitulo: povRaw.agendaTitulo ?? '',
      botones: (povRaw.agendaBotones ?? []).map((b: any) => ({
        texto: b.texto ?? '',
        enlace: b.enlace ?? ''
      }))
    } : null

    // ── 4. Costo del programa ─────────────────────────────────────────────────
    const costoRaw: any = resolve(data?.costoPrograma)
    const costo = costoRaw ? {
      tituloSeccion: costoRaw.tituloSeccion ?? '',
      filas: (costoRaw.filasCostos ?? []).map((f: any) => ({
        label: f.concepto ?? '',
        monto: f.monto ?? ''
      })),
      totalLabel: costoRaw.totalTexto ?? '',
      totalMonto: costoRaw.totalMonto ?? '',
      notas: parseObservaciones(costoRaw.notasLegales)
    } : null

    // ── 5. Beneficios UFG+ASU ─────────────────────────────────────────────────
    // BeneficiosUFG es un objeto con property1 como clave dinámica; tomamos el primer valor
    const beneficiosField: any = resolve(data?.BeneficiosUFG)
    const beneficiosRaw: any = beneficiosField
      ? (Array.isArray(beneficiosField) ? beneficiosField[0] : Object.values(beneficiosField)[0])
      : null
    const beneficios = beneficiosRaw ? {
      titulo: beneficiosRaw.titulo ?? '',
      logoUrl: assetUrl(beneficiosRaw.imagen),
      items: (beneficiosRaw.items ?? []).map((item: any) => ({
        titulo: item.titulo ?? '',
        descripcion: item.texto ?? '',
        imagen: assetUrl(item.imagen)
      }))
    } : null

    // ── 6. Admisión Postgrado ─────────────────────────────────────────────────
    // admisionPostgrado es un objeto con property1 como clave dinámica; tomamos el primer array
    const postgradoField: any = resolve(data?.admisionPostgrado)
    const postgradoRaw: any[] = postgradoField
      ? (Array.isArray(postgradoField) ? postgradoField : (Object.values(postgradoField)[0] as any[] ?? []))
      : []
    const postgradoTabs = postgradoRaw.map((tab: any) => ({
      id: tab.tituloTag?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? `tab-${Math.random()}`,
      label: tab.tituloTag ?? '',
      pasos: (tab.tagItem ?? []).map((item: any) => {
        const tieneBoton = item.boton?.texto && item.boton?.enlace
        // descripcion puede ser texto libre o lista separada por \n
        const descripcionLineas = item.descripcion
          ? item.descripcion.split('\n').map((l: string) => l.trim()).filter(Boolean)
          : []
        const esLista = descripcionLineas.length > 1
        return {
          numero: parseInt(item.pasoNumero ?? '0') || 0,
          contenido: item.titulo ?? item.descripcion ?? '',
          ctaText: tieneBoton ? item.boton.texto : '',
          ctaLink: tieneBoton ? item.boton.enlace : '',
          lista: !tieneBoton && esLista ? descripcionLineas : (esLista ? descripcionLineas : [])
        }
      }),
      notas: parseObservaciones(tab.observaciones)
    }))

    return {
      pasos,
      tabs,
      pov,
      costo,
      beneficios,
      postgradoTabs
    }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    console.error('[pagina-admisiones] Error:', error)
    throw createError({ statusCode: 500, message: 'Error al obtener datos de admisiones' })
  }
})
