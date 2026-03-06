import { getPortfolioDroneRows } from "../../actions";
import { DroneMediaManager } from "./DroneMediaManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioDronePage() {
  const rows = await getPortfolioDroneRows();
  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-1">Portfolio – Dron snimci</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Za video unesi embed URL (YouTube, Vimeo…) i izaberi tip &quot;Video embed&quot;.
      </p>
      <DroneMediaManager rows={rows} />
    </div>
  );
}
