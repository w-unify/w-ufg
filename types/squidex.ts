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

/* ============================================================
   UFG Specific Schema Types
   ============================================================ */

/* --- Home Schema (home) --- */

export interface HomeSliderItem {
  titulo: string
  subtitulo: string
  imagenDesktop: string[]
  imagenMobile: string[]
  enlace: string
}

export interface HomeTitleItem {
  titulo: string
  subtitulo: string
  imagenIzq: string[]
}

export interface HomeEstadistica {
  cifra: string
  etiqueta: string
}

export interface HomeFuturoData {
  schemaId: string
  titulo: string
  descripcion: string
  estadisticas: HomeEstadistica[]
  homeIzq: string[]
}

export interface HomeEducacionData {
  schemaId: string
  titulo: string
  parrafo: string
  imagen1: string[]
  imagen2: string[]
  imagen3Grande: string[]
  botonTexto: string
  botonEnlace: string
}

export interface HomeAcreditacionItem {
  imagen: string[]
  titulo: string
}

export interface HomeReinventaItem {
  titulo: string
  subtitulo: string
  parrafo: string
  botonTexto: string
  botonUrl: string
}

export interface HomePageData extends SquidexData {
  'home-slider': SquidexLanguageField<HomeSliderItem[]>
  'home-title-1': SquidexLanguageField<HomeTitleItem[]>
  'home-futuro': SquidexLanguageField<HomeFuturoData>
  'home-educacion': SquidexLanguageField<HomeEducacionData>
  'home-acreditaciones': SquidexLanguageField<HomeAcreditacionItem[]>
  'home-reinventa': SquidexLanguageField<HomeReinventaItem[]>
}

// --- HEADER DATA ---
export interface HeaderData extends SquidexData {
  linkPortalEducativo: SquidexLanguageField<string>
  linkWebDesktop: SquidexLanguageField<string>
  linkUVirtual: SquidexLanguageField<string>
  linkTramites: SquidexLanguageField<string>
  nombreBtn: SquidexLanguageField<string>
  linkBtnAplicar: SquidexLanguageField<string>
}

// --- FOOTER DATA ---
export interface FooterData extends SquidexData {
  nombreSede: SquidexLanguageField<string>
  direccionSede: SquidexLanguageField<string>
  telefonoSede: SquidexLanguageField<string>
  emailSede: SquidexLanguageField<string>
  linkInstagram: SquidexLanguageField<string>
  linkFacebook: SquidexLanguageField<string>
  linkX: SquidexLanguageField<string>
  linkLinkedin: SquidexLanguageField<string>
  linkYoutube: SquidexLanguageField<string>
}

export type HomePageContent = SquidexContent<HomePageData>

export interface CareerData extends SquidexData {
  title: SquidexLanguageField<string>
  slug: SquidexLanguageField<string>
  description: SquidexLanguageField<string>
  heroImage: SquidexLanguageField<string[]>
  modality: SquidexLanguageField<string>
  asuEnriched: SquidexLanguageField<boolean>
  duration: SquidexLanguageField<string>
  degree: SquidexLanguageField<string>
  aboutText: SquidexLanguageField<string>
  learnTitle: SquidexLanguageField<string>
  learnText: SquidexLanguageField<string>
  learnImage: SquidexLanguageField<string[]>
  ufgDegree: SquidexLanguageField<string>
  asuDegree: SquidexLanguageField<string>
  workPositions: SquidexLanguageField<string[]>
  costItems: SquidexLanguageField<SquidexComponentData[]>
  totalLabel: SquidexLanguageField<string>
  totalAmount: SquidexLanguageField<string>
  disclaimers: SquidexLanguageField<string[]>
  scholarships: SquidexLanguageField<SquidexComponentData[]>
  testimonials: SquidexLanguageField<SquidexComponentData[]>
  components?: SquidexLanguageField<SquidexComponentData[]>
  metaTitle?: SquidexLanguageField<string>
  metaDescription?: SquidexLanguageField<string>
}

export type CareerContent = SquidexContent<CareerData>
