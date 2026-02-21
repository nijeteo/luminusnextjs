# Vercel – kalendar i email (Formspree)

Da bi na live sajtu radili **min. dan unapred za datum** i **slanje emaila**, uradi ovo na Vercel-u.

## 1. Environment variable (obavezno za email)

1. Otvori [vercel.com](https://vercel.com) → tvoj projekat.
2. **Settings** → **Environment Variables**.
3. Dodaj:
   - **Name:** `NEXT_PUBLIC_FORMSPREE_ID`
   - **Value:** `mykddrkn`
   - Environment: **Production** (i po želji **Preview**).
4. Sačuvaj.

Bez ove promenljive forma ne može da pošalje email (Formspree ne zna na koju formu da šalje).

## 2. Novo deployovanje

Posle dodavanja/izmene env varijabli Vercel **ne deployuje automatski**. Moraš da pokreneš novi deploy:

1. **Deployments** → tri tačkice (⋯) na **poslednjem** deploymentu.
2. **Redeploy**.
3. Označi **Use existing Build Cache** kao **off** (da se sve gradi iznova).
4. Potvrdi **Redeploy**.

Ili: **Deployments** → **Create Deployment** pa izaberi branch `main` i deployuj.

## 3. Da li je nova verzija zaista na sajtu?

- Otvori stranicu **Kontakt** na produkciji.
- Desni klik na formu → **Inspect** (Proveri element).
- U HTML-u traži na `<form>` atribut: `data-build="min-date-feb2026"`.  
  Ako ga vidiš, nova verzija je deployovana.
- U polju **Datum** kalendar ne bi trebalo da dozvoli izbor današnjeg datuma (min je sutra).

## 4. Ako i dalje ne šalje email

- U Formspree dashboardu proveri da forma sa ID `mykddrkn` postoji i da je email za notifikacije podešen.
- Proveri da u Vercel env varijablama za **Production** zaista stoji `NEXT_PUBLIC_FORMSPREE_ID=mykddrkn` (bez razmaka, tačan naziv).
