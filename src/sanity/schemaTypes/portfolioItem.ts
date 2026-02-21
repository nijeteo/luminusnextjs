import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioItem",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv", type: "string" }),
    defineField({ name: "location", title: "Lokacija", type: "string" }),
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tagovi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Redosled", type: "number" }),
  ],
});
