"use client";

import { useState } from "react";
import { updatePackage, deletePackage } from "../actions";

export function PackageRow({
  id,
  name,
  description,
  price,
  features,
  isPopular,
  sortOrder,
}: {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  sortOrder: number;
}) {
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (editing) {
    return (
      <form
        className="rounded border border-zinc-600 bg-zinc-800 p-4 space-y-3"
        action={async (fd: FormData) => {
          setMsg(null);
          setSaving(true);
          const featuresStr = (fd.get("features") as string) || "";
          const featuresList = featuresStr.split("\n").map((s) => s.trim()).filter(Boolean);
          const res = await updatePackage(id, {
            name: (fd.get("name") as string) || "",
            description: (fd.get("description") as string) || "",
            price: (fd.get("price") as string) || "",
            features: featuresList,
            is_popular: fd.get("is_popular") === "1",
            sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
          });
          setSaving(false);
          if (res?.error) setMsg(res.error);
          else {
            setMsg("Sačuvano.");
            setEditing(false);
            window.location.reload();
          }
        }}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Naziv</label>
            <input name="name" defaultValue={name} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Cena</label>
            <input name="price" defaultValue={price} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input type="checkbox" name="is_popular" value="1" defaultChecked={isPopular} className="rounded border-zinc-600 bg-zinc-700 text-amber-500" />
              Popularan
            </label>
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Opis</label>
          <textarea name="description" defaultValue={description} rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Stavke (jedna po liniji)</label>
          <textarea name="features" defaultValue={features.join("\n")} rows={3} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Redosled</label>
          <input type="number" name="sort_order" defaultValue={sortOrder} className="w-20 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-white" />
          <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white">Sačuvaj</button>
          <button type="button" onClick={() => setEditing(false)} className="rounded border border-zinc-600 px-4 py-2 text-zinc-400">Odustani</button>
        </div>
        {msg && <p className="text-sm text-zinc-400">{msg}</p>}
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-3">
      <div>
        <span className="font-medium text-white">{name}</span>
        {isPopular && <span className="ml-2 text-xs text-amber-400">popularan</span>}
        <span className="ml-2 text-zinc-400">{price}</span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">Izmeni</button>
        <form action={async () => { if (confirm("Obriši paket?")) { await deletePackage(id); window.location.reload(); } }}>
          <button type="submit" className="rounded border border-red-800 px-2 py-1 text-sm text-red-400 hover:bg-red-900/30">Obriši</button>
        </form>
      </div>
    </div>
  );
}
