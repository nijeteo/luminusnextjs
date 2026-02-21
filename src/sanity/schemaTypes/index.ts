import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import packageSchema from './package'
import portfolioItem from './portfolioItem'

export const schemaTypes = [siteSettings, packageSchema, portfolioItem]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
