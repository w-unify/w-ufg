import { fetchSquidexContentBySlug } from '../../utils/squidex'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const schema = query.schema as string
  const slug = query.slug as string
  const language = (query.language as string) || 'iv'

  if (!schema || !slug) {
    throw createError({
      statusCode: 400,
      message: 'Schema and slug parameters are required'
    })
  }

  try {
    const content = await fetchSquidexContentBySlug(schema, slug, language)
    
    if (!content) {
      throw createError({
        statusCode: 404,
        message: `Content with slug "${slug}" not found`
      })
    }
    
    return content
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch content by slug from Squidex'
    })
  }
})
