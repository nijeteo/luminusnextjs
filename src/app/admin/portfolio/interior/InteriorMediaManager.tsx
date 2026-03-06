"use client";

import { useState } from "react";
import { createPortfolioInterior, updatePortfolioInterior, deletePortfolioInterior } from "../../actions";
import { ImageUploadInput } from "../../ImageUploadInput";

type Row = { id: string; image_url: string; sort_order: number };

function MediaRow({ row }: { row: Row }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (editing) {
    return (
      <form
        className="rounded border border-zinc-600 bg-zinc-800 p-4 space-y-3"
        action={async (fd: FormData) => {
          setSaving(true);
          setMsg(null);
          const res = await updatePortfolioInterior(row.id, {
            image_url: (fd.get("image_url") as string) || "",
            sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
          });
          setSaving(false);
          if (res?.error) setMsg(res.error);
          else { setEditing(false); window.location.reload(); }
        }}
      >
        <ImageUploadInput name="image_url" label="Slika" defaultValue={row.image_url} />
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">Redosled</label>
          <input name="sort_order" type="number" defaultValue={row.sort_order} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
          <button type="submit" disabled={saving} className="rounded bg-amber-600 px-3 py-1.5 text-sm text-white">Sacuvaj</button>
          <button type="button" onClick={() => setEditing(false)} className="rounded border border-zinc-600 px-3 py-1.5 text-sm text-zinc-400">Odustani</button>
          {msg && <span className="text-sm text-red-400">{msg}</span>}
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-3">
      <div className="flex items-center gap-3 min-w-0">
        {row.image_url && <img src={row.image_url} alt="" className="h-12 w-20 rounded object-cover" />}
        <span className="text-sm text-zinc-300 truncate max-w-[240px]">{row.image_url || "—"}</span>
        <span className="text-xs text-zinc-500">red: {row.sort_order}</span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">Izmeni</button>
        <form action={async () => {
          if (confirm("Obrisi ovu sliku?")) { await deletePortfolioInterior(row.id); window.location.reload(); }
        }}>
          <button type="submit" className="rounded border border-red-800 px-2 py-1 text-sm text-red-400 hover:bg-red-900/30">Obrisi</button>
        </form>
      </div>
    </div>
  );
}

function AddForm() {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [key, setKey] = useState(0);

  return (
    <form
      key={key}
      className="rounded border border-zinc-700 bg-zinc-800 p-4 space-y-3"
      action={async (fd: FormData) => {
        setSaving(true);
        setMsg(null);
        const res = await createPortfolioInterior({
          image_url: (fd.get("image_url") as string) || "",
          sort_order: parseInt((fd.get("sort_order") as string) || "999", 10),
        });
        setSaving(false);
        if (res?.error) setMsg({ type: "error", text: res.error });
        else { setMsg({ type: "ok", text: "Dodato." }); setKey((k) => k + 1); }
      }}
    >
      <ImageUploadInput name="image_url" label="Slika *" required />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">Redosled</label>
          <input type="number" name="sort_order" defaultValue={999} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        </div>
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem..." : "Dodaj sliku"}
        </button>
        {msg && <p className={msg.type === "ok" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>{msg.text}</p>}
      </div>
    </form>
  );
}

export function InteriorMediaManager({ rows }: { rows: Record<string, unknown>[] }) {
  const typed = rows as unknown as Row[];
  return (
    <div className="space-y-4">
      <AddForm />
      {typed.length === 0 && <p className="text-zinc-500 text-sm">Nema slika. Dodaj prvu.</p>}
      {typed.map((r) => <MediaRow key={r.id} row={r} />)}
    </div>
  );
}
