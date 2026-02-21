# Šta uraditi na Supabase – detaljno step-by-step

Ovaj projekat čita sadržaj (tekst i slike) iz Supabase. U kodu su spremne funkcije za sve tabele ispod. Kada napraviš projekat, tabele, Storage i RLS, sajt će prikazivati sadržaj iz baze; prazne tabele = prikazuju se podrazumevani (trenutni) tekstovi i slike.

---

## 1. Kreiranje projekta

1. Otvori **[supabase.com](https://supabase.com)** i uloguj se.
2. **New project** → izaberi organizaciju (ili kreiraj).
3. Unesi **Project name** (npr. `luminus`), **Database password** (sačuvaj ga), **Region**.
4. Klikni **Create new project** i sačekaj da se projekat podigne.

---

## 2. API ključevi

1. U levom meniju: **Project Settings** (zupčanik).
2. **API** u sidebaru.
3. Zapiši:
   - **Project URL** (npr. `https://xxxxx.supabase.co`)
   - **anon public** (ključ za čitanje sa sajta)
   - **service_role** (samo za server / admin; nikad u browseru za obične korisnike)

U root-u svog projekta u fajlu **`.env.local`** dodaj (zameni vrednosti):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tvoj-projekat.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Restartuj dev server: `npm run dev`.

---

## 3. Storage za slike

1. U levom meniju: **Storage**.
2. **New bucket** → ime: **`images`**.
3. Uključi **Public bucket** (da se slike mogu učitavati bez auth).
4. **Create bucket**.

### Policy za čitanje (anon)

1. Otvori bucket **images** → **Policies**.
2. **New policy** → **For full customization**.
3. **Policy name:** `Public read`.
4. **Allowed operation:** **SELECT** (Read).
5. **Target roles:** `anon`.
6. **USING expression:** `true`.
7. **Save**.

Kada admin uploaduje sliku u **images**, dobijaš public URL tipa:
`https://tvoj-projekat.supabase.co/storage/v1/object/public/images/ime-fajla.jpg`  
Taj URL unosiš u odgovarajuću kolonu u tabeli (npr. `hero_image_url`).

---

## 4. Tabele – SQL u SQL Editoru

1. U levom meniju: **SQL Editor**.
2. **New query**.
3. Nalepi ceo SQL ispod i pokreni **Run**.

### 4.1 Tabela `home` (jedan red – početna stranica)

```sql
create table if not exists public.home (
  id uuid primary key default gen_random_uuid(),
  hero_image_url text,
  hero_title text,
  hero_subtitle text,
  hero_cta_text text,
  scroll_label text,
  intro_heading text,
  intro_text text,
  detail_image_url text,
  detail_label text,
  detail_heading text,
  detail_text text,
  pricing_bg_image_url text,
  pricing_heading text,
  pricing_subheading text,
  portfolio_heading text,
  portfolio_subheading text,
  portfolio_cta_text text,
  updated_at timestamptz default now()
);

-- Jedan red sa podrazumevanim vrednostima (možeš ga odmah editovati u Table Editoru)
insert into public.home (
  hero_title, hero_subtitle, hero_cta_text, scroll_label,
  intro_heading, intro_text, detail_label, detail_heading, detail_text,
  pricing_heading, pricing_subheading, portfolio_heading, portfolio_subheading, portfolio_cta_text
) values (
  'LUMINUS',
  'Ekskluzivna Fotografija Nekretnina',
  'Zakaži Termin',
  'Skroluj',
  'Istaknite vašu imovinu u ',
  'Specijalizovani smo za profesionalno fotografisanje, snimanje, 360° ture i dron snimke nekretnina. Naš cilj je da prenesemo atmosferu i luksuz svakog prostora, privlačeći prave kupce.',
  'Enterijeri & Prostori',
  'Svaki detalj' || E'\n' || 'govori.',
  'Od dnevne sobe do kuhinje — svaki prostor prikazan tačno onako kako kupci žele da ga vide.',
  'Naši Paketi',
  'Odaberite uslugu koja vam najviše odgovara',
  'Naš Rad',
  'Odabrani Projekti',
  'Pogledaj ceo portfolio'
);
```

Ako već imaš red u **home**, preskoči ovaj INSERT ili obriši postojeći red pa pokreni ponovo. Inače pokreni INSERT samo jednom.

### 4.2 Tabela `home_portfolio_items` (2 kartice na početnoj)

```sql
create table if not exists public.home_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text not null,
  subtitle text not null,
  sort_order int default 0
);

insert into public.home_portfolio_items (image_url, title, subtitle, sort_order) values
  ('/modern-interior.jpg', 'Moderan Enterijer', 'Beograd', 0),
  ('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', 'Luksuzna Vila', 'Novi Sad', 1);
```

### 4.3 Tabela `packages` (cene – koriste se na početnoj i /paketi)

```sql
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price text not null,
  features jsonb default '[]',
  is_popular boolean default false,
  sort_order int default 0
);

insert into public.packages (name, description, price, features, is_popular, sort_order) values
  ('Osnovni', 'Idealan za manje stanove i brzu prodaju.', 'Od 100€',
   '["Profesionalne fotografije (do 20 slika)","Osnovna obrada i korekcija boja","Isporuka u roku od 48h"]'::jsonb, false, 0),
  ('Premium', 'Sveobuhvatan prikaz za veće nekretnine.', 'Od 250€',
   '["Sve iz Osnovnog paketa (do 40 slika)","Video tura nekretnine (do 2 min)","360° virtuelna tura"]'::jsonb, true, 1),
  ('Ekskluzivni', 'Vrhunska prezentacija luksuznih objekata.', 'Od 450€',
   '["Sve iz Premium paketa (neograničeno slika)","Dron fotografije i video snimci iz vazduha","Detaljna retuširanja i napredna montaža","Isporuka u roku od 24h"]'::jsonb, false, 2);
```

### 4.4 Tabela `paketi_page` (naslov i podnaslov stranice /paketi)

```sql
create table if not exists public.paketi_page (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  services_heading text,
  services_subheading text
);

insert into public.paketi_page (title, subtitle, services_heading, services_subheading) values
  ('Paketi', 'Izaberite paket koji odgovara vašim potrebama', 'Naše Usluge', 'Sve što vam je potrebno za savršenu prezentaciju nekretnine');
```

### 4.5 Tabela `paketi_services` (usluge na /paketi)

```sql
create table if not exists public.paketi_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text not null,
  reverse boolean default false,
  link_to text,
  sort_order int default 0
);

insert into public.paketi_services (title, description, image_url, reverse, link_to, sort_order) values
  ('Fotografija Enterijera', 'Hvatamo suštinu svakog prostora. Kroz pažljivo kadriranje...', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop', false, null, 0),
  ('Fotografija Eksterijera', 'Prvi utisak je najvažniji...', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop', true, null, 1),
  ('Dron Snimci i Fotografije', 'Pružite jedinstvenu perspektivu iz vazduha...', '/dron.jpeg', false, null, 2),
  ('360° Virtuelne Ture', 'Omogućite kupcima da prošetaju...', '/360cam.jpg', true, '/portfolio#360-tura', 3);
```

### 4.6 Tabele za Portfolio i Kontakt (opciono – za kasniju upotrebu)

```sql
-- Portfolio – naslov stranice
create table if not exists public.portfolio_page (
  id uuid primary key default gen_random_uuid(),
  eyebrow_text text,
  title text,
  subtitle text
);

-- Portfolio – galerije (URL slika)
create table if not exists public.portfolio_interior (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order int default 0
);

create table if not exists public.portfolio_exterior (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order int default 0
);

create table if not exists public.portfolio_drone (
  id uuid primary key default gen_random_uuid(),
  media_url text not null,
  media_type text check (media_type in ('image','video')),
  sort_order int default 0
);

-- Kontakt – tekstovi
create table if not exists public.kontakt_page (
  id uuid primary key default gen_random_uuid(),
  page_eyebrow text,
  page_title text,
  page_subtitle text,
  phone_label text,
  phone_value text,
  instagram_label text,
  instagram_value text,
  email_label text,
  email_value text,
  tiktok_label text,
  tiktok_value text,
  booking_eyebrow text,
  booking_title text,
  booking_intro text,
  success_title text,
  success_message text
);
```

---

## 5. RLS (Row Level Security) – dozvoli čitanje svima

Za svaku tabelu mora da postoji policy koja dozvoljava **SELECT** za ulogu **anon**, da bi Next.js (sa anon ključem) mogao da čita podatke.

1. **SQL Editor** → **New query**.
2. Nalepi i pokreni:

```sql
alter table public.home enable row level security;
alter table public.home_portfolio_items enable row level security;
alter table public.packages enable row level security;
alter table public.paketi_page enable row level security;
alter table public.paketi_services enable row level security;
alter table public.portfolio_page enable row level security;
alter table public.portfolio_interior enable row level security;
alter table public.portfolio_exterior enable row level security;
alter table public.portfolio_drone enable row level security;
alter table public.kontakt_page enable row level security;

create policy "Public read home" on public.home for select to anon using (true);
create policy "Public read home_portfolio_items" on public.home_portfolio_items for select to anon using (true);
create policy "Public read packages" on public.packages for select to anon using (true);
create policy "Public read paketi_page" on public.paketi_page for select to anon using (true);
create policy "Public read paketi_services" on public.paketi_services for select to anon using (true);
create policy "Public read portfolio_page" on public.portfolio_page for select to anon using (true);
create policy "Public read portfolio_interior" on public.portfolio_interior for select to anon using (true);
create policy "Public read portfolio_exterior" on public.portfolio_exterior for select to anon using (true);
create policy "Public read portfolio_drone" on public.portfolio_drone for select to anon using (true);
create policy "Public read kontakt_page" on public.kontakt_page for select to anon using (true);
```

---

## 6. Kako da menjaš sadržaj (admin)

- **Table Editor**: u levom meniju otvori **Table Editor**, izaberi tabelu (npr. **home**), klikni na red i menjaj polja. Za slike u polja tipa `*_image_url` ili `image_url` unesi **pun URL** (npr. od Supabase Storage: nakon što u **Storage → images** uploaduješ fajl, desni klik → **Copy URL**).
- **Storage**: **Storage → images** → **Upload file**. Zatim u tabeli u odgovarajuće polje nalepi taj public URL.

Nema posebne “admin stranice” u kodu – za sada je admin = Supabase Table Editor + Storage. Kasnije možeš dodati Next.js rutu `/admin` i forme koje pišu u Supabase preko API ruta sa `service_role` ključem.

---

## 7. Provera

1. U **Table Editor** proveri da **home** ima bar jedan red (ako insert nije prošao, dodaj ručno jedan red i popuni bar `hero_title`).
2. Pokreni lokalno `npm run dev` i otvori **http://localhost:3000**. Početna bi trebalo da prikaže tekst iz tabele **home** (npr. "LUMINUS"). Ako tabele nisu pune, videćeš podrazumevane vrednosti.
3. Na **Vercel** (ili drugi hosting) u **Environment Variables** dodaj `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`, pa redeploy.

---

## Rezime redosleda

1. Kreiraj projekat na Supabase.  
2. U **Settings → API** kopiraj URL i anon key; u `.env.local` dodaj `NEXT_PUBLIC_SUPABASE_*` i `SUPABASE_SERVICE_ROLE_KEY`.  
3. **Storage** → bucket **images**, public, policy SELECT za anon.  
4. **SQL Editor** → pokreni sve CREATE TABLE i INSERT (korak 4).  
5. **SQL Editor** → pokreni RLS i policy (korak 5).  
6. U **Table Editor** po želji dopuni/izmeni sadržaj; za slike koristi Storage upload i URL u tabelama.
