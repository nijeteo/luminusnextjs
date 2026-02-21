"use client";

import { useState } from "react";
import { updatePaketiService, deletePaketiService } from "../actions";

export function PaketiServiceRow({
  id,
  title,
  description,
  imageUrl,
  reverse,
  linkTo,
  sortOrder,
}: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
  linkTo: string | null;
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
          const res = await updatePaketiService(id, {
            title: (fd.get("title") as string) || "",
            description: (fd.get("description") as string) || "",
            image_url: (fd.get("image_url") as string) || "",
            reverse: fd.get("reverse") === "1",
            link_to: (fd.get("link_to") as string) || null,
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
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Naslov</label>
            <input name="title" defaultValue={title} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Slika (URL)</label>
            <input name="image_url" defaultValue={imageUrl} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Opis</label>
          <textarea name="description" defaultValue={description} rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input name="link_to" defaultValue={linkTo ?? ""} placeholder="Link" className="rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white w-48" />
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input type="checkbox" name="reverse" value="1" defaultChecked={reverse} className="rounded border-zinc-600 bg-zinc-700 text-amber-500" />
            Reverse
          </label>
          <input type="number" name="sort_order" defaultValue={sortOrder} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-white" />
          <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white">Sačuvaj</button>
          <button type="button" onClick={() => setEditing(false)} className="rounded border border-zinc-600 px-4 py-2 text-zinc-400">Odustani</button>
        </div>
        {msg && <p className="text-sm text-zinc-400">{msg}</p>}
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-3">
      <div className="flex items-center gap-3 min-w-0">
        {imageUrl && <img src={imageUrl} alt="" className="h-10 w-14 rounded object-cover" />}
        <div>
          <span className="font-medium text-white">{title}</span>
          {reverse && <span className="ml-2 text-xs text-zinc-500">reverse</span>}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">Izmeni</button>
        <form action={async () => { if (confirm("Obriši uslugu?")) { await deletePaketiService(id); window.location.reload(); } }}>
          <button type="submit" className="rounded border border-red-800 px-2 py-1 text-sm text-red-400 hover:bg-red-900/30">Obriši</button>
        </form>
      </div>
    </div>
  );
}
