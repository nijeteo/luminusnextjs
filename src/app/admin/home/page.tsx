import Link from "next/link";
import { getHomeRow } from "../actions";
import { AdminHomeForm } from "./AdminHomeForm";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const row = await getHomeRow();
  return (
    <div className="py-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-zinc-400 hover:text-white">
          ← Dashboard
        </Link>
        <span className="text-zinc-500">|</span>
        <h1 className="text-xl font-semibold text-white">Početna (Home)</h1>
      </div>
      <AdminHomeForm initial={row} />
      <p className="mt-4 text-sm text-zinc-500">
        Kartice u sekciji „Naš rad” menjaj na{" "}
        <Link href="/admin/home/portfolio" className="text-amber-500 hover:underline">
          Home → Kartice
        </Link>
        .
      </p>
    </div>
  );
}
