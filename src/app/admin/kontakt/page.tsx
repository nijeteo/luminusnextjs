import { getKontaktPageRow } from "../actions";
import { KontaktPageForm } from "./KontaktPageForm";

export const dynamic = "force-dynamic";

export default async function AdminKontaktPage() {
  const row = await getKontaktPageRow();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-6">Stranica Kontakt</h1>
      <KontaktPageForm initial={row} />
    </div>
  );
}
