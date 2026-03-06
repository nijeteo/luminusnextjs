import { getPaketiPageRow, getPaketiServiceRows } from "../actions";
import { PaketiPageForm } from "./PaketiPageForm";
import { PaketiServiceRow } from "./PaketiServiceRow";
import { AddPaketiServiceForm } from "./AddPaketiServiceForm";

export const dynamic = "force-dynamic";

export default async function AdminPaketiPage() {
  const [pageRow, serviceRows] = await Promise.all([getPaketiPageRow(), getPaketiServiceRows()]);
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-6">Stranica Paketi</h1>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <h2 className="mb-3 text-sm font-medium text-amber-400">Naslovi stranice</h2>
        <PaketiPageForm initial={pageRow} />
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-amber-400">Dodaj uslugu</h2>
        <AddPaketiServiceForm />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-zinc-400">Lista usluga</h2>
        <ul className="space-y-2">
          {serviceRows.length === 0 ? (
            <li className="text-zinc-500">Nema usluga. Dodaj iznad.</li>
          ) : (
            (serviceRows as { id: string; title: string; description: string; image_url: string; reverse: boolean; link_to: string | null; sort_order: number }[]).map((row) => (
              <PaketiServiceRow
                key={row.id}
                id={row.id}
                title={row.title}
                description={row.description}
                imageUrl={row.image_url}
                reverse={row.reverse}
                linkTo={row.link_to}
                sortOrder={row.sort_order}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
