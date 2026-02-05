import { fetchSquidexContentById } from '../../utils/squidex'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const schema = query.schema as string
  const id = query.id as string

  if (!schema || !id) {
    throw createError({
      statusCode: 400,
      message: 'Schema and ID parameters are required'
    })
  }

  try {
    const content = await fetchSquidexContentById(schema, id)
    return content
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch content by ID from Squidex'
    })
  }
})
