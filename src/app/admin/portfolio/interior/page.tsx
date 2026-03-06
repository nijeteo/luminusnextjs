import { getPortfolioInteriorRows } from "../../actions";
import { InteriorMediaManager } from "./InteriorMediaManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioInteriorPage() {
  const rows = await getPortfolioInteriorRows();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-6">Portfolio – Enterijer slike</h1>
      <InteriorMediaManager rows={rows} />
    </div>
  );
}
