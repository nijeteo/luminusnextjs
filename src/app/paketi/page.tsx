import PaketiContent from "./PaketiContent";
import { getPaketiPage, getPaketiServices, getPackages } from "@/lib/supabase-content";

export default async function PaketiPage() {
  const [pageContent, services, packages] = await Promise.all([
    getPaketiPage(),
    getPaketiServices(),
    getPackages(),
  ]);

  return (
    <PaketiContent
      pageContent={pageContent}
      services={services}
      packages={packages}
    />
  );
}
