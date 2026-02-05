export interface SquidexToken {
  access_token: string
  token_type: string
  expires_in: number
  expires_at?: number
}

export interface SquidexLanguageField<T = any> {
  iv: T
  [key: string]: T
}

export interface SquidexData {
  [key: string]: SquidexLanguageField | any
}

export interface SquidexContent<T = SquidexData> {
  id: string
  created: string
  createdBy: string
  lastModified: string
  lastModifiedBy: string
  data: T
  schemaName?: string
  version: number
  newStatus?: string
  status?: string
}

export interface SquidexListResponse<T = SquidexData> {
  total: number
  items: SquidexContent<T>[]
}

export interface SquidexComponentData {
  type: string
  [key: string]: any
}

export interface PageContentData extends SquidexData {
  title: SquidexLanguageField<string>
  slug: SquidexLanguageField<string>
  components?: SquidexLanguageField<SquidexComponentData[]>
  metaDescription?: SquidexLanguageField<string>
  metaTitle?: SquidexLanguageField<string>
}

export type PageContent = SquidexContent<PageContentData>

export interface SquidexConfig {
  appName: string
  clientId: string
  clientSecret: string
  url: string
}

export interface SquidexQueryParams {
  $top?: number
  $skip?: number
  $filter?: string
  $orderby?: string
  $search?: string
  [key: string]: any
}
