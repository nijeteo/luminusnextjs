# Formspree ne šalje – šta proveriti (redom)

## 1. Da li je na sajtu nova verzija?

- Otvori **Kontakt** na **luminusnextjs.vercel.app**
- Desni klik na formu → **Inspect** → u HTML-u traži na `<form>` atribut **data-build="min-date-feb2026"**
- Ako **nema** tog atributa → na Vercel-u je stari build. Nastavi na korak 2.

## 2. GitHub i Vercel

- U terminalu: `cd` u projekat, pa `git status`. Ako piše "Your branch is ahead of 'origin/main'" → uradi **git push origin main**.
- Na **Vercel** → **Deployments**: da li je poslednji deploy sa commita koji sadrži "Formspree" ili "CSP connect-src"? Ako nije → **Redeploy** (bez cache) ili sačekaj auto-deploy posle push-a.

## 3. Environment variable (obavezno)

- **Vercel** → tvoj projekat → **Settings** → **Environment Variables**
- Mora da postoji:
  - **Name:** `NEXT_PUBLIC_FORMSPREE_ID`
  - **Value:** `mykddrkn`
  - **Environment:** Production (i po želji Preview)
- Ako si tek dodao ili menjao → **Deployments** → **Redeploy** (bez "Use existing Build Cache"). Bez novog deploya promenljiva ne ulazi u build.

## 4. Šta tačno puca (Network tab)

- Na live sajtu otvori **Kontakt**, pa **F12** → **Network** (Mreža).
- Ispuni formu i klikni **Potvrdi rezervaciju**.
- U listi zahteva traži zahtev ka **formspree.io**:
  - **Nema zahteva** → blokira ga CSP ili env var nije podešen (stari build). Redeploy sa koraka 2 i 3.
  - **Status (blocked)** ili crveno → CSP. Proveri da je u repou u `next.config.ts` **connect-src 'self' https://formspree.io** i da je taj commit deployovan.
  - **Status 404** → pogrešan Form ID. Na Formspree-u proveri da je ID forme zaista `mykddrkn`.
  - **Status 200** → Formspree je primio; proveri Formspree inbox / email.

## 5. Formspree dashboard

- formspree.io → uloguj se → forma sa ID **mykddrkn**
- Proveri: **Email za notifikacije** (npr. info@luminus.rs), forma **nije pauzirana**, nema blokade za domen.

---

**Rezime:** Najčešće je uzrok da **NEXT_PUBLIC_FORMSPREE_ID** nije podešen na Vercel-u ili da nije urađen **Redeploy** posle podešavanja. Drugo je da na sajtu još uvek radi stari build (nije pushan novi kod ili nije redeployovan).
