// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Exporting the structure function directly to avoid circular references

// Define the structure builder
export default (S: any) => {
  return S.list()
    .title('Content')
    .items([
      // Landing page singleton
      S.listItem()
        .title('Landing Page')
        .schemaType('landingPage')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
            .title('Landing Page')
        ),

      // Portfolio projects
      S.listItem()
        .title('Marketing Pages')
        .schemaType('marketingPage')
        .child(
          S.documentTypeList('marketingPage')
            .title('Marketing Pages')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
        ),

      // Portfolio projects
      S.listItem()
        .title('Portfolio Projects')
        .schemaType('portfolio')
        .child(
          S.documentTypeList('portfolio')
            .title('Portfolio Projects')
            .defaultOrdering([{ field: 'projectDate', direction: 'desc' }])
        ),

      // Categories
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      // Add remaining document types
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['landingPage', 'marketingPage', 'portfolio', 'category'].includes(listItem.getId())
      ),
    ])
}
