import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Klijent za čitanje sadržaja sa sajta (anon key).
 * Koristi se u Server Components i API rutama za javni sadržaj.
 */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
