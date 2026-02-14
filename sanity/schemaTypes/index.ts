import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import category from './category'
import portfolio from './portfolio'
import event from './event'
import landingPage from './landingPage'
import marketingPage from './marketingPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, marketingPage, portfolio, category, event, blockContent],
}
