import { supabase } from "./supabase";

// ---- Tipovi (mapirani na tabele u Supabase) ----

export type HomeContent = {
  heroImageUrl: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroCtaText: string | null;
  scrollLabel: string | null;
  introHeading: string | null;
  introText: string | null;
  detailImageUrl: string | null;
  detailLabel: string | null;
  detailHeading: string | null;
  detailText: string | null;
  pricingBgImageUrl: string | null;
  pricingHeading: string | null;
  pricingSubheading: string | null;
  portfolioHeading: string | null;
  portfolioSubheading: string | null;
  portfolioCtaText: string | null;
};

export type HomePortfolioItem = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  sortOrder: number;
};

export type PackageItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  sortOrder: number;
};

export type PaketiPageContent = {
  title: string | null;
  subtitle: string | null;
  servicesHeading: string | null;
  servicesSubheading: string | null;
};

export type PaketiServiceItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
  linkTo: string | null;
  sortOrder: number;
};

export type PortfolioPageContent = {
  eyebrowText: string | null;
  title: string | null;
  subtitle: string | null;
};

export type KontaktPageContent = {
  pageEyebrow: string | null;
  pageTitle: string | null;
  pageSubtitle: string | null;
  phoneLabel: string | null;
  phoneValue: string | null;
  instagramLabel: string | null;
  instagramValue: string | null;
  emailLabel: string | null;
  emailValue: string | null;
  tiktokLabel: string | null;
  tiktokValue: string | null;
  bookingEyebrow: string | null;
  bookingTitle: string | null;
  bookingIntro: string | null;
  successTitle: string | null;
  successMessage: string | null;
};

// ---- Fetch funkcije ----

function rowToHome(row: Record<string, unknown> | null): HomeContent | null {
  if (!row) return null;
  return {
    heroImageUrl: (row.hero_image_url as string) ?? null,
    heroTitle: (row.hero_title as string) ?? null,
    heroSubtitle: (row.hero_subtitle as string) ?? null,
    heroCtaText: (row.hero_cta_text as string) ?? null,
    scrollLabel: (row.scroll_label as string) ?? null,
    introHeading: (row.intro_heading as string) ?? null,
    introText: (row.intro_text as string) ?? null,
    detailImageUrl: (row.detail_image_url as string) ?? null,
    detailLabel: (row.detail_label as string) ?? null,
    detailHeading: (row.detail_heading as string) ?? null,
    detailText: (row.detail_text as string) ?? null,
    pricingBgImageUrl: (row.pricing_bg_image_url as string) ?? null,
    pricingHeading: (row.pricing_heading as string) ?? null,
    pricingSubheading: (row.pricing_subheading as string) ?? null,
    portfolioHeading: (row.portfolio_heading as string) ?? null,
    portfolioSubheading: (row.portfolio_subheading as string) ?? null,
    portfolioCtaText: (row.portfolio_cta_text as string) ?? null,
  };
}

export async function getHome(): Promise<HomeContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("home")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToHome(data as Record<string, unknown>);
}

export async function getHomePortfolioItems(): Promise<HomePortfolioItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("home_portfolio_items")
    .select("id, image_url, title, subtitle, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    imageUrl: (row.image_url as string) ?? "",
    title: (row.title as string) ?? "",
    subtitle: (row.subtitle as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
  }));
}

export async function getPackages(): Promise<PackageItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("packages")
    .select("id, name, description, price, features, is_popular, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    name: (row.name as string) ?? "",
    description: (row.description as string) ?? "",
    price: (row.price as string) ?? "",
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    isPopular: Boolean(row.is_popular),
    sortOrder: (row.sort_order as number) ?? 0,
  }));
}

export async function getPaketiPage(): Promise<PaketiPageContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("paketi_page")
    .select("title, subtitle, services_heading, services_subheading")
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as Record<string, unknown>;
  return {
    title: (row.title as string) ?? null,
    subtitle: (row.subtitle as string) ?? null,
    servicesHeading: (row.services_heading as string) ?? null,
    servicesSubheading: (row.services_subheading as string) ?? null,
  };
}

export async function getPaketiServices(): Promise<PaketiServiceItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("paketi_services")
    .select("id, title, description, image_url, reverse, link_to, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    title: (row.title as string) ?? "",
    description: (row.description as string) ?? "",
    imageUrl: (row.image_url as string) ?? "",
    reverse: Boolean(row.reverse),
    linkTo: (row.link_to as string) ?? null,
    sortOrder: (row.sort_order as number) ?? 0,
  }));
}

export async function getPortfolioPage(): Promise<PortfolioPageContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("portfolio_page")
    .select("eyebrow_text, title, subtitle")
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as Record<string, unknown>;
  return {
    eyebrowText: (row.eyebrow_text as string) ?? null,
    title: (row.title as string) ?? null,
    subtitle: (row.subtitle as string) ?? null,
  };
}

export async function getPortfolioInteriorUrls(): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_interior")
    .select("image_url")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[])
    .map((r) => r.image_url as string)
    .filter(Boolean);
}

export async function getPortfolioExteriorUrls(): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_exterior")
    .select("image_url")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[])
    .map((r) => r.image_url as string)
    .filter(Boolean);
}

export type PortfolioDroneItem = { mediaUrl: string; mediaType: "image" | "video" };
export async function getPortfolioDrone(): Promise<PortfolioDroneItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_drone")
    .select("media_url, media_type")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map((row) => ({
    mediaUrl: (row.media_url as string) ?? "",
    mediaType: ((row.media_type as string) === "video" ? "video" : "image") as "image" | "video",
  }));
}

export async function getKontaktPage(): Promise<KontaktPageContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("kontakt_page")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as Record<string, unknown>;
  return {
    pageEyebrow: (row.page_eyebrow as string) ?? null,
    pageTitle: (row.page_title as string) ?? null,
    pageSubtitle: (row.page_subtitle as string) ?? null,
    phoneLabel: (row.phone_label as string) ?? null,
    phoneValue: (row.phone_value as string) ?? null,
    instagramLabel: (row.instagram_label as string) ?? null,
    instagramValue: (row.instagram_value as string) ?? null,
    emailLabel: (row.email_label as string) ?? null,
    emailValue: (row.email_value as string) ?? null,
    tiktokLabel: (row.tiktok_label as string) ?? null,
    tiktokValue: (row.tiktok_value as string) ?? null,
    bookingEyebrow: (row.booking_eyebrow as string) ?? null,
    bookingTitle: (row.booking_title as string) ?? null,
    bookingIntro: (row.booking_intro as string) ?? null,
    successTitle: (row.success_title as string) ?? null,
    successMessage: (row.success_message as string) ?? null,
  };
}
