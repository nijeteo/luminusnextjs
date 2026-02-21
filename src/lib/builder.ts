import { Builder } from "@builder.io/sdk";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

/**
 * Builder client za fetch sadržaja. Koristi NEXT_PUBLIC_BUILDER_API_KEY.
 * Ako ključ nije podešen, builder je null i fetch se ne izvršava.
 */
export const builder = apiKey ? new Builder(apiKey) : null;
