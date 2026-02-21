import { defineType, defineField } from "sanity";

export default defineType({
  name: "package",
  title: "Paketi",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv paketa", type: "string" }),
    defineField({ name: "price", title: "Cena", type: "string" }),
    defineField({ name: "badge", title: "Bedž", type: "string" }),
    defineField({
      name: "features",
      title: "Šta uključuje",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Redosled", type: "number" }),
  ],
});
