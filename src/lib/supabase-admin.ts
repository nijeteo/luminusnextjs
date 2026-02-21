import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Supabase klijent sa service_role key – samo na serveru za admin operacije (insert/update/delete).
 * Nikad ga ne koristi u client komponentama niti izlaži u browser.
 */
export const supabaseAdmin =
  url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
