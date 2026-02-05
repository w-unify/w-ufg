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
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch content from Squidex'
    })
  }
})
