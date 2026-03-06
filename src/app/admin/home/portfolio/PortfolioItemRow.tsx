"use client";

import { useState } from "react";
import { updateHomePortfolioItem, deleteHomePortfolioItem } from "../../actions";
import { ImageUploadInput } from "../../ImageUploadInput";

export function PortfolioItemRow({
  id,
  imageUrl,
  title,
  subtitle,
  sortOrder,
}: {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
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
          const res = await updateHomePortfolioItem(id, {
            image_url: (fd.get("image_url") as string) || "",
            title: (fd.get("title") as string) || "",
            subtitle: (fd.get("subtitle") as string) || "",
            sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
          });
          setSaving(false);
          if (res?.error) setMsg(res.error);
          else { setMsg("Sacuvano."); setEditing(false); window.location.reload(); }
        }}
      >
        <ImageUploadInput name="image_url" label="Slika" defaultValue={imageUrl} />
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-zinc-500 mb-1">Naslov</label>
            <input name="title" defaultValue={title} className="w-full rounded border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-sm text-white" />
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs text-zinc-500 mb-1">Podnaslov</label>
            <input name="subtitle" defaultValue={subtitle} className="w-full rounded border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-sm text-white" />
          </div>
          <div className="w-16">
            <label className="block text-xs text-zinc-500 mb-1">Red</label>
            <input name="sort_order" type="number" defaultValue={sortOrder} className="w-full rounded border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-sm text-white" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded bg-amber-600 px-3 py-1.5 text-sm text-white">Sacuvaj</button>
          <button type="button" onClick={() => setEditing(false)} className="rounded border border-zinc-600 px-3 py-1.5 text-sm text-zinc-400">Odustani</button>
          {msg && <span className="text-sm text-zinc-400">{msg}</span>}
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-3">
      <div className="flex items-center gap-3 min-w-0">
        {imageUrl && <img src={imageUrl} alt="" className="h-10 w-14 rounded object-cover" />}
        <div>
          <span className="font-medium text-white">{title}</span>
          {subtitle && <span className="ml-2 text-zinc-400">{subtitle}</span>}
        </div>
        <span className="text-xs text-zinc-500">red: {sortOrder}</span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">Izmeni</button>
        <form action={async () => {
          if (confirm("Obrisi ovu karticu?")) { await deleteHomePortfolioItem(id); window.location.reload(); }
        }}>
          <button type="submit" className="rounded border border-red-800 px-2 py-1 text-sm text-red-400 hover:bg-red-900/30">Obrisi</button>
        </form>
      </div>
    </div>
  );
}
