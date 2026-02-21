import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Podešavanja sajta",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero naslov", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero podnaslov", type: "text" }),
    defineField({
      name: "stats",
      title: "Statistike",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Vrednost", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
