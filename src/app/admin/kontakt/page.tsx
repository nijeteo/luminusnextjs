import Link from "next/link";
import { getKontaktPageRow } from "../actions";
import { KontaktPageForm } from "./KontaktPageForm";

export const dynamic = "force-dynamic";

export default async function AdminKontaktPage() {
  const row = await getKontaktPageRow();
  return (
    <div className="py-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-zinc-400 hover:text-white">← Dashboard</Link>
        <span className="text-zinc-500">|</span>
        <h1 className="text-xl font-semibold text-white">Stranica Kontakt</h1>
      </div>
      <KontaktPageForm initial={row} />
    </div>
  );
}
