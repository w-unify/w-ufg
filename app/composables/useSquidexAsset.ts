/**
 * Construye la URL completa de un asset de Squidex a partir de su ID.
 * Los campos de imagen en Squidex devuelven arrays de asset IDs (strings).
 * La URL del asset es: {squidexUrl}/api/assets/{assetId}
 */
export function useSquidexAsset() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.squidexUrl as string
  const appName = config.public.squidexAppName as string

  /**
   * Resuelve un asset ID a su URL completa
   */
  function assetUrl(assetId: string): string {
    if (!assetId) return ''
    // Si ya es una URL completa, devolverla tal cual
    if (assetId.startsWith('http://') || assetId.startsWith('https://')) {
      return assetId
    }
    // Si es una ruta local (empieza con /), devolverla tal cual
    if (assetId.startsWith('/')) {
      return assetId
    }
    return `${baseUrl}/api/assets/${assetId}`
  }

  /**
   * Resuelve el primer asset de un array de IDs
   */
  function firstAssetUrl(assetIds: string[] | undefined | null, fallback: string = ''): string {
    if (!assetIds || assetIds.length === 0) return fallback
    return assetUrl(assetIds[0])
  }

  return {
    assetUrl,
    firstAssetUrl
  }
}
