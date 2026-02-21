import HomePageFallback from "./HomePageFallback";
import { getHome, getHomePortfolioItems, getPackages } from "@/lib/supabase-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [home, homePortfolioItems, packages] = await Promise.all([
    getHome(),
    getHomePortfolioItems(),
    getPackages(),
  ]);

  return (
    <HomePageFallback
      home={home}
      homePortfolioItems={homePortfolioItems}
      packages={packages}
    />
  );
}
