"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

type HomePayload = {
  hero_image_url?: string | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_cta_text?: string | null;
  scroll_label?: string | null;
  intro_heading?: string | null;
  intro_text?: string | null;
  detail_image_url?: string | null;
  detail_label?: string | null;
  detail_heading?: string | null;
  detail_text?: string | null;
  pricing_bg_image_url?: string | null;
  pricing_heading?: string | null;
  pricing_subheading?: string | null;
  portfolio_heading?: string | null;
  portfolio_subheading?: string | null;
  portfolio_cta_text?: string | null;
};

export async function updateHome(payload: HomePayload) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { data: row } = await supabaseAdmin.from("home").select("id").limit(1).maybeSingle();
  if (row) {
    const { error } = await supabaseAdmin.from("home").update(payload).eq("id", row.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin.from("home").insert(payload as Record<string, unknown>);
    if (error) return { error: error.message };
  }
  revalidatePath("/");
  revalidatePath("/admin/home");
  return { ok: true };
}

export async function getHomeRow() {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin.from("home").select("*").limit(1).maybeSingle();
  return data as Record<string, unknown> | null;
}

// ---- Home portfolio items ----
export async function getHomePortfolioRows() {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("home_portfolio_items")
    .select("id, image_url, title, subtitle, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Record<string, unknown>[];
}

export async function createHomePortfolioItem(item: {
  image_url: string;
  title: string;
  subtitle: string;
  sort_order: number;
}) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("home_portfolio_items").insert(item);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/home/portfolio");
  return { ok: true };
}

export async function updateHomePortfolioItem(
  id: string,
  item: { image_url?: string; title?: string; subtitle?: string; sort_order?: number }
) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("home_portfolio_items").update(item).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/home/portfolio");
  return { ok: true };
}

export async function deleteHomePortfolioItem(id: string) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("home_portfolio_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/home/portfolio");
  return { ok: true };
}

// ---- Packages ----
export async function getPackageRows() {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("packages")
    .select("id, name, description, price, features, is_popular, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Record<string, unknown>[];
}

export async function createPackage(item: {
  name: string;
  description: string;
  price: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("packages").insert({
    ...item,
    features: item.features,
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/paketi");
  revalidatePath("/admin/packages");
  return { ok: true };
}

export async function updatePackage(
  id: string,
  item: Partial<{
    name: string;
    description: string;
    price: string;
    features: string[];
    is_popular: boolean;
    sort_order: number;
  }>
) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("packages").update(item).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/paketi");
  revalidatePath("/admin/packages");
  return { ok: true };
}

export async function deletePackage(id: string) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("packages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/paketi");
  revalidatePath("/admin/packages");
  return { ok: true };
}

// ---- Paketi page (single row) ----
export async function getPaketiPageRow() {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin.from("paketi_page").select("*").limit(1).maybeSingle();
  return data as Record<string, unknown> | null;
}

export async function updatePaketiPage(payload: {
  title?: string | null;
  subtitle?: string | null;
  services_heading?: string | null;
  services_subheading?: string | null;
}) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { data: row } = await supabaseAdmin.from("paketi_page").select("id").limit(1).maybeSingle();
  if (row) {
    const { error } = await supabaseAdmin.from("paketi_page").update(payload).eq("id", row.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin.from("paketi_page").insert(payload as Record<string, unknown>);
    if (error) return { error: error.message };
  }
  revalidatePath("/paketi");
  revalidatePath("/admin/paketi");
  return { ok: true };
}

// ---- Paketi services ----
export async function getPaketiServiceRows() {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("paketi_services")
    .select("id, title, description, image_url, reverse, link_to, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Record<string, unknown>[];
}

export async function createPaketiService(item: {
  title: string;
  description: string;
  image_url: string;
  reverse: boolean;
  link_to: string | null;
  sort_order: number;
}) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("paketi_services").insert(item);
  if (error) return { error: error.message };
  revalidatePath("/paketi");
  revalidatePath("/admin/paketi");
  return { ok: true };
}

export async function updatePaketiService(
  id: string,
  item: Partial<{
    title: string;
    description: string;
    image_url: string;
    reverse: boolean;
    link_to: string | null;
    sort_order: number;
  }>
) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("paketi_services").update(item).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/paketi");
  revalidatePath("/admin/paketi");
  return { ok: true };
}

export async function deletePaketiService(id: string) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { error } = await supabaseAdmin.from("paketi_services").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/paketi");
  revalidatePath("/admin/paketi");
  return { ok: true };
}

// ---- Portfolio page (single row) ----
export async function getPortfolioPageRow() {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin.from("portfolio_page").select("*").limit(1).maybeSingle();
  return data as Record<string, unknown> | null;
}

export async function updatePortfolioPage(payload: {
  eyebrow_text?: string | null;
  title?: string | null;
  subtitle?: string | null;
}) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { data: row } = await supabaseAdmin.from("portfolio_page").select("id").limit(1).maybeSingle();
  if (row) {
    const { error } = await supabaseAdmin.from("portfolio_page").update(payload).eq("id", row.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin.from("portfolio_page").insert(payload as Record<string, unknown>);
    if (error) return { error: error.message };
  }
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return { ok: true };
}

// ---- Kontakt page (single row) ----
export async function getKontaktPageRow() {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin.from("kontakt_page").select("*").limit(1).maybeSingle();
  return data as Record<string, unknown> | null;
}

export async function updateKontaktPage(payload: Record<string, string | null>) {
  if (!supabaseAdmin) return { error: "Admin klijent nije dostupan." };
  const { data: row } = await supabaseAdmin.from("kontakt_page").select("id").limit(1).maybeSingle();
  if (row) {
    const { error } = await supabaseAdmin.from("kontakt_page").update(payload).eq("id", row.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin.from("kontakt_page").insert(payload as Record<string, unknown>);
    if (error) return { error: error.message };
  }
  revalidatePath("/kontakt");
  revalidatePath("/admin/kontakt");
  return { ok: true };
}
