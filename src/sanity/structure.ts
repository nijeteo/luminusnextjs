import type {StructureResolver} from 'sanity/structure'

const SINGLETON_ID = 'siteSettings'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: samo jedan dokument "Podešavanja sajta", bez "Create new"
      S.listItem()
        .title('Podešavanja sajta')
        .id(SINGLETON_ID)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SINGLETON_ID)
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
    ])
