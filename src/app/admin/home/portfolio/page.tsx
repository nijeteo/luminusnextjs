import Link from "next/link";
import { getHomePortfolioRows } from "../../actions";
import { AdminHomePortfolioForm } from "./AdminHomePortfolioForm";
import { PortfolioItemRow } from "./PortfolioItemRow";

export const dynamic = "force-dynamic";

export default async function AdminHomePortfolioPage() {
  const rows = await getHomePortfolioRows();
  return (
    <div className="py-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-zinc-400 hover:text-white">← Dashboard</Link>
        <span className="text-zinc-500">|</span>
        <Link href="/admin/home" className="text-zinc-400 hover:text-white">Home</Link>
        <span className="text-zinc-500">|</span>
        <h1 className="text-xl font-semibold text-white">Kartice (portfolio)</h1>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <h2 className="mb-3 text-sm font-medium text-amber-400">Dodaj novu karticu</h2>
        <AdminHomePortfolioForm />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-zinc-400">Postojeće kartice</h2>
        <ul className="space-y-2">
          {rows.length === 0 ? (
            <li className="text-zinc-500">Nema stavki. Dodaj prvu iznad.</li>
          ) : (
            rows.map((row) => (
              <PortfolioItemRow
                key={String(row.id)}
                id={String(row.id)}
                imageUrl={String(row.image_url ?? "")}
                title={String(row.title ?? "")}
                subtitle={String(row.subtitle ?? "")}
                sortOrder={Number(row.sort_order ?? 0)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
