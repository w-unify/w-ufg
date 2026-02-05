import type { SquidexContent, SquidexListResponse, SquidexQueryParams } from '~/types/squidex'

export function useSquidexContent<T = any>(
  schema: string,
  params?: SquidexQueryParams
) {
  const { data, error, pending, refresh } = useAsyncData(
    `squidex-${schema}-${JSON.stringify(params || {})}`,
    () => $fetch<SquidexListResponse<T>>('/api/squidex/content', {
      params: {
        schema,
        ...params
      }
    })
  )

  return {
    content: computed(() => data.value?.items || []),
    total: computed(() => data.value?.total || 0),
    error,
    pending,
    refresh
  }
}

export function useSquidexContentById<T = any>(
  schema: string,
  id: string
) {
  const { data, error, pending, refresh } = useAsyncData(
    `squidex-${schema}-${id}`,
    () => $fetch<SquidexContent<T>>('/api/squidex/content-by-id', {
      params: {
        schema,
        id
      }
    })
  )

  return {
    content: data,
    error,
    pending,
    refresh
  }
}

export function useSquidexContentBySlug<T = any>(
  schema: string,
  slug: string | Ref<string>,
  language: string = 'iv'
) {
  const slugValue = computed(() => unref(slug))

  const { data, error, pending, refresh } = useAsyncData(
    `squidex-${schema}-slug-${slugValue.value}`,
    () => $fetch<SquidexContent<T> | null>('/api/squidex/content-by-slug', {
      params: {
        schema,
        slug: slugValue.value,
        language
      }
    }),
    {
      watch: [slugValue]
    }
  )

  return {
    content: data,
    error,
    pending,
    refresh
  }
}

export function resolveSquidexField<T = any>(
  field: any,
  language: string = 'iv'
): T {
  if (!field) return field
  
  if (typeof field === 'object' && field.iv !== undefined) {
    return field[language] || field.iv
  }
  
  return field
}
