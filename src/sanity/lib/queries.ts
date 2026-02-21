export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  stats[]{
    label,
    value
  }
}`

export const packagesQuery = `*[_type == "package"] | order(order asc){
  _id,
  title,
  price,
  badge,
  features,
  order
}`

export const portfolioItemsQuery = `*[_type == "portfolioItem"] | order(order asc){
  _id,
  title,
  location,
  image,
  tags,
  order
}`
