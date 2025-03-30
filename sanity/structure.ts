// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Exporting the structure function directly to avoid circular references

// Define the structure builder
export default (S: any) => {
  return S.list()
    .title('Content')
    .items([
      // Group portfolio items
      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              S.listItem()
                .title('All Projects')
                .schemaType('portfolio')
                .child(S.documentTypeList('portfolio').title('All Projects')),
              
              S.listItem()
                .title('Featured Projects')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "portfolio" && featured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
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
