import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import category from './category'
import portfolio from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, category, blockContent],
}
