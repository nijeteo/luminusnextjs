import { getHomePortfolioRows } from "../../actions";
import { AdminHomePortfolioForm } from "./AdminHomePortfolioForm";
import { PortfolioItemRow } from "./PortfolioItemRow";

export const dynamic = "force-dynamic";

export default async function AdminHomePortfolioPage() {
  const rows = await getHomePortfolioRows();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-6">Portfolio kartice (početna)</h1>

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
