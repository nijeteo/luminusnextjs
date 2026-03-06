import Link from "next/link";
import { getHomeRow } from "../actions";
import { AdminHomeForm } from "./AdminHomeForm";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const row = await getHomeRow();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-1">Pocetna (Home)</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Kartice u sekciji &quot;Nas rad&quot; menjaj u{" "}
        <Link href="/admin/home/portfolio" className="text-amber-500 hover:underline">Portfolio karticama</Link>.
      </p>
      <AdminHomeForm initial={row} />
    </div>
  );
}
