import { getKontaktPage } from "@/lib/supabase-content";
import KontaktClient from "./KontaktClient";

export const dynamic = "force-dynamic";

export default async function KontaktPage() {
  const content = await getKontaktPage();
  return <KontaktClient content={content} />;
}
