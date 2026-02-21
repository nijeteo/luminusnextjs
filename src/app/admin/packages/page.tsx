import Link from "next/link";
import { getPackageRows } from "../actions";
import { PackageRow } from "./PackageRow";
import { AddPackageForm } from "./AddPackageForm";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const rows = await getPackageRows();
  return (
    <div className="py-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-zinc-400 hover:text-white">← Dashboard</Link>
        <span className="text-zinc-500">|</span>
        <h1 className="text-xl font-semibold text-white">Paketi</h1>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <h2 className="mb-3 text-sm font-medium text-amber-400">Dodaj paket</h2>
        <AddPackageForm />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-zinc-400">Postojeći paketi</h2>
        <ul className="space-y-2">
          {rows.length === 0 ? (
            <li className="text-zinc-500">Nema paketa. Dodaj prvi iznad.</li>
          ) : (
            (rows as { id: string; name: string; price: string; is_popular: boolean; sort_order: number }[]).map((row) => (
              <PackageRow
                key={row.id}
                id={row.id}
                name={row.name}
                description={String((row as Record<string, unknown>).description ?? "")}
                price={row.price}
                features={Array.isArray((row as Record<string, unknown>).features) ? ((row as Record<string, unknown>).features as string[]) : []}
                isPopular={Boolean(row.is_popular)}
                sortOrder={row.sort_order}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
