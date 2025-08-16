// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Exporting the structure function directly to avoid circular references

// Define the structure builder
export default (S: any) => {
  return S.list()
    .title('Content')
    .items([
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
        (listItem: any) => !['portfolio', 'category'].includes(listItem.getId())
      ),
    ])
}
