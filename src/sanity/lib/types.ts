import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SiteSettingsStatsItem {
  label?: string | null
  value?: string | null
}

export interface SiteSettings {
  title?: string | null
  heroHeadline?: string | null
  heroSubheadline?: string | null
  stats?: SiteSettingsStatsItem[] | null
}

export interface CmsPackage {
  _id: string
  title?: string | null
  price?: string | null
  badge?: string | null
  features?: string[] | null
  order?: number | null
}

export interface PortfolioItem {
  _id: string
  title?: string | null
  location?: string | null
  image?: SanityImageSource | null
  tags?: string[] | null
  order?: number | null
}
