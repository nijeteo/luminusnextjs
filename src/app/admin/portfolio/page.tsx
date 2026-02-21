import Link from "next/link";
import { getPortfolioPageRow } from "../actions";
import { PortfolioPageForm } from "./PortfolioPageForm";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const row = await getPortfolioPageRow();
  return (
    <div className="py-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-zinc-400 hover:text-white">← Dashboard</Link>
        <span className="text-zinc-500">|</span>
        <h1 className="text-xl font-semibold text-white">Stranica Portfolio</h1>
      </div>
      <p className="mb-4 text-sm text-zinc-500">
        Naslov i podnaslov koji se prikazuju na vrhu stranice /portfolio. Galerije (enterijer, eksterijer, dron) se trenutno ne menjaju iz ovog panela.
      </p>
      <PortfolioPageForm initial={row} />
    </div>
  );
}
