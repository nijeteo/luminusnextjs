import { getPortfolioPageRow } from "../actions";
import { PortfolioPageForm } from "./PortfolioPageForm";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const row = await getPortfolioPageRow();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-1">Portfolio – Tekstovi & embeds</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Galerije slika menjaj iz sidebar-a (Enterijer / Eksterijer / Dron).
      </p>
      <PortfolioPageForm initial={row} />
    </div>
  );
}
