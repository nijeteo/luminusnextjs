import { getPortfolioExteriorRows } from "../../actions";
import { ExteriorMediaManager } from "./ExteriorMediaManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioExteriorPage() {
  const rows = await getPortfolioExteriorRows();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-6">Portfolio – Eksterijer slike</h1>
      <ExteriorMediaManager rows={rows} />
    </div>
  );
}
