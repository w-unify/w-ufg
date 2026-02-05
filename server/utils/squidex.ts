import type { SquidexToken, SquidexConfig, SquidexQueryParams, SquidexListResponse, SquidexContent } from '~/types/squidex'

let cachedToken: SquidexToken | null = null

export async function getSquidexToken(): Promise<string> {
  const config = useRuntimeConfig()
  const squidexConfig: SquidexConfig = {
    appName: config.squidex.appName,
    clientId: config.squidex.clientId,
    clientSecret: config.squidex.clientSecret,
    url: config.squidex.url
  }

  if (!squidexConfig.appName || !squidexConfig.clientId || !squidexConfig.clientSecret) {
    throw new Error('Squidex credentials not configured')
  }

  if (cachedToken && cachedToken.expires_at && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token
  }

  try {
    const tokenUrl = `${squidexConfig.url}/identity-server/connect/token`
    
    const response = await $fetch<SquidexToken>(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: squidexConfig.clientId,
        client_secret: squidexConfig.clientSecret,
        scope: 'squidex-api'
      })
    })

    cachedToken = {
      ...response,
      expires_at: Date.now() + (response.expires_in - 60) * 1000
    }

    return cachedToken.access_token
  } catch (error) {
    console.error('Error obtaining Squidex token:', error)
    throw new Error('Failed to authenticate with Squidex')
  }
}

export async function fetchSquidexContent<T = any>(
  schema: string,
  params?: SquidexQueryParams
): Promise<SquidexListResponse<T>> {
  const config = useRuntimeConfig()
  const token = await getSquidexToken()
  const appName = config.squidex.appName
  const url = config.squidex.url

  const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : ''
  const endpoint = `${url}/api/content/${appName}/${schema}${queryString ? `?${queryString}` : ''}`

  try {
    const response = await $fetch<SquidexListResponse<T>>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    console.error(`Error fetching Squidex content for schema ${schema}:`, error)
    throw error
  }
}

export async function fetchSquidexContentById<T = any>(
  schema: string,
  id: string
): Promise<SquidexContent<T>> {
  const config = useRuntimeConfig()
  const token = await getSquidexToken()
  const appName = config.squidex.appName
  const url = config.squidex.url

  const endpoint = `${url}/api/content/${appName}/${schema}/${id}`

  try {
    const response = await $fetch<SquidexContent<T>>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    console.error(`Error fetching Squidex content by ID ${id}:`, error)
    throw error
  }
}

export async function fetchSquidexContentBySlug<T = any>(
  schema: string,
  slug: string,
  language: string = 'iv'
): Promise<SquidexContent<T> | null> {
  try {
    const response = await fetchSquidexContent<T>(schema, {
      $filter: `data/slug/${language} eq '${slug}'`,
      $top: 1
    })

    return response.items[0] || null
  } catch (error) {
    console.error(`Error fetching Squidex content by slug ${slug}:`, error)
    return null
  }
}
