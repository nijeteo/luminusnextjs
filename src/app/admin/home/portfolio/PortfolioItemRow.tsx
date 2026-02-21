"use client";

import { useState } from "react";
import { updateHomePortfolioItem, deleteHomePortfolioItem } from "../../actions";

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
        className="flex flex-wrap items-center gap-2 rounded border border-zinc-600 bg-zinc-800 p-3"
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
          else {
            setMsg("Sačuvano.");
            setEditing(false);
            window.location.reload();
          }
        }}
      >
        <input name="image_url" defaultValue={imageUrl} placeholder="URL slike" className="flex-1 min-w-[120px] rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        <input name="title" defaultValue={title} placeholder="Naslov" className="flex-1 min-w-[100px] rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        <input name="subtitle" defaultValue={subtitle} placeholder="Podnaslov" className="flex-1 min-w-[80px] rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        <input name="sort_order" type="number" defaultValue={sortOrder} className="w-14 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-2 py-1 text-sm text-white">Sačuvaj</button>
        <button type="button" onClick={() => setEditing(false)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-400">Odustani</button>
        {msg && <span className="text-sm text-zinc-400">{msg}</span>}
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-3">
      <div className="flex items-center gap-3 min-w-0">
        {imageUrl && (
          <img src={imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
        )}
        <div>
          <span className="font-medium text-white">{title}</span>
          {subtitle && <span className="ml-2 text-zinc-400">{subtitle}</span>}
        </div>
        <span className="text-xs text-zinc-500">red: {sortOrder}</span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">
          Izmeni
        </button>
        <form action={async () => {
          if (confirm("Obriši ovu karticu?")) {
            await deleteHomePortfolioItem(id);
            window.location.reload();
          }
        }}>
          <button type="submit" className="rounded border border-red-800 px-2 py-1 text-sm text-red-400 hover:bg-red-900/30">
            Obriši
          </button>
        </form>
      </div>
    </div>
  );
}
