import { fetchSquidexContent } from '../../utils/squidex'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const schema = query.schema as string

  if (!schema) {
    throw createError({
      statusCode: 400,
      message: 'Schema parameter is required'
    })
  }

  const { schema: _, ...params } = query

  try {
    const content = await fetchSquidexContent(schema, params)
    return content
  } catch (error: any) {
    console.error('[Squidex API Error]', error)
    throw createError({
      statusCode: 500,
      message: error?.message || 'Failed to fetch content from Squidex',
      data: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})
