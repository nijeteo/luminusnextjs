# Builder.io – kako da menjaš početnu stranicu

## Šta je urađeno

- Početna stranica (`/`) sada **prvo pokušava da učita sadržaj iz Builder.io** za URL `/`.
- Ako **nema API ključa** ili **nema objavljenog sadržaja** za `/`, prikazuje se **tvoja postojeća početna** (ista kao do sada).

## Šta ti treba da uradiš

### 1. API ključ

1. Otvori [builder.io](https://www.builder.io) i napravi nalog (ili se uloguj).
2. U dashboardu: **Account** → **API Keys** (ili **Settings** → **API Keys**).
3. Kopiraj **Public API Key**.
4. U root-u projekta otvori **`.env.local`** (ili kreiraj ako ne postoji).
5. Dodaj liniju (zameni sa svojim ključem):
   ```env
   NEXT_PUBLIC_BUILDER_API_KEY=tvoj_public_api_key_ovde
   ```
6. Restartuj dev server: u terminalu **Ctrl+C**, pa ponovo **`npm run dev`**.

### 2. Prva stranica u Builder-u

1. U Builder.io: **Content** → **New** → **Page**.
2. Postavi **URL** na **`/`** (početna stranica).
3. U editoru dodaj blokove (Text, Image, Button, Columns itd.) i popuni sadržaj.
4. Klikni **Publish**.

### 3. Pregled na sajtu

1. Otvori **http://localhost:3000** (ili tvoj domen).
2. Osveži stranicu (F5). Trebalo bi da vidiš sadržaj koji si napravio u Builder-u.
3. Dalje izmene radiš u Builder.io (edituj stranicu, Publish), pa osvežiš sajt.

## Fajlovi

- **`src/lib/builder.ts`** – Builder client (koristi `NEXT_PUBLIC_BUILDER_API_KEY`).
- **`src/app/page.tsx`** – server komponenta: fetch za `/`, pa render Builder sadržaja ili fallback.
- **`src/app/BuilderPageRenderer.tsx`** – client komponenta koja renderuje Builder JSON (sa Next.js Link za unutrašnje linkove).
- **`src/app/HomePageFallback.tsx`** – tvoja trenutna početna (korišćena kada Builder nema sadržaj).

## Na Vercel-u

U **Settings** → **Environment Variables** dodaj **`NEXT_PUBLIC_BUILDER_API_KEY`** sa svojim Public API Key-om (za Production i po želji Preview), pa uradi **Redeploy**.
