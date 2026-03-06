import { getPortfolioPage, getPortfolioInteriorItems, getPortfolioExteriorItems, getPortfolioDrone } from "@/lib/supabase-content";
import { PortfolioClient } from "./PortfolioClient";

export const dynamic = "force-dynamic";

export default async function Portfolio() {
  const [page, interiors, exteriors, drones] = await Promise.all([
    getPortfolioPage(),
    getPortfolioInteriorItems(),
    getPortfolioExteriorItems(),
    getPortfolioDrone(),
  ]);

  return (
    <PortfolioClient
      page={page}
      interiors={interiors}
      exteriors={exteriors}
      drones={drones}
    />
  );
}
