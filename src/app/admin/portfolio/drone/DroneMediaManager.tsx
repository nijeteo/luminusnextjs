"use client";

import { useState } from "react";
import { createPortfolioDrone, updatePortfolioDrone, deletePortfolioDrone } from "../../actions";
import { ImageUploadInput } from "../../ImageUploadInput";

type Row = { id: string; media_url: string; media_type: "image" | "video"; sort_order: number };

function DroneRow({ row }: { row: Row }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">(row.media_type);

  if (editing) {
    return (
      <form
        className="rounded border border-zinc-600 bg-zinc-800 p-4 space-y-3"
        action={async (fd: FormData) => {
          setSaving(true);
          setMsg(null);
          const res = await updatePortfolioDrone(row.id, {
            media_url: (fd.get("media_url") as string) || "",
            media_type: (fd.get("media_type") as "image" | "video") || "image",
            sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
          });
          setSaving(false);
          if (res?.error) setMsg(res.error);
          else { setEditing(false); window.location.reload(); }
        }}
      >
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Tip</label>
          <select
            name="media_type"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as "image" | "video")}
            className="rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white"
          >
            <option value="image">Slika</option>
            <option value="video">Video embed</option>
          </select>
        </div>
        {mediaType === "image" ? (
          <ImageUploadInput name="media_url" label="Slika" defaultValue={row.media_url} />
        ) : (
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Video embed URL</label>
            <input
              name="media_url"
              defaultValue={row.media_url}
              placeholder="https://www.youtube.com/embed/..."
              className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        )}
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
        {row.media_type === "image" && row.media_url && (
          <img src={row.media_url} alt="" className="h-12 w-20 rounded object-cover" />
        )}
        {row.media_type === "video" && (
          <span className="flex h-12 w-20 items-center justify-center rounded bg-zinc-700 text-xs text-zinc-400">VIDEO</span>
        )}
        <div className="min-w-0">
          <span className="text-xs font-medium text-amber-400">{row.media_type === "video" ? "Video embed" : "Slika"}</span>
          <p className="text-sm text-zinc-300 truncate max-w-[240px]">{row.media_url || "—"}</p>
        </div>
        <span className="text-xs text-zinc-500">red: {row.sort_order}</span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="rounded border border-zinc-600 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">Izmeni</button>
        <form action={async () => {
          if (confirm("Obrisi ovaj medij?")) { await deletePortfolioDrone(row.id); window.location.reload(); }
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
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [key, setKey] = useState(0);

  return (
    <form
      key={key}
      className="rounded border border-zinc-700 bg-zinc-800 p-4 space-y-3"
      action={async (fd: FormData) => {
        setSaving(true);
        setMsg(null);
        const res = await createPortfolioDrone({
          media_url: (fd.get("media_url") as string) || "",
          media_type: (fd.get("media_type") as "image" | "video") || "image",
          sort_order: parseInt((fd.get("sort_order") as string) || "999", 10),
        });
        setSaving(false);
        if (res?.error) setMsg({ type: "error", text: res.error });
        else { setMsg({ type: "ok", text: "Dodato." }); setKey((k) => k + 1); setMediaType("image"); }
      }}
    >
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Tip</label>
        <select
          name="media_type"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as "image" | "video")}
          className="rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
        >
          <option value="image">Slika</option>
          <option value="video">Video embed</option>
        </select>
      </div>

      {mediaType === "image" ? (
        <ImageUploadInput name="media_url" label="Slika *" required />
      ) : (
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Video embed URL *</label>
          <input
            name="media_url"
            required
            placeholder="https://www.youtube.com/embed/..."
            className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">Redosled</label>
          <input type="number" name="sort_order" defaultValue={999} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white" />
        </div>
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem..." : "Dodaj"}
        </button>
        {msg && <p className={msg.type === "ok" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>{msg.text}</p>}
      </div>
    </form>
  );
}

export function DroneMediaManager({ rows }: { rows: Record<string, unknown>[] }) {
  const typed = rows as unknown as Row[];
  return (
    <div className="space-y-4">
      <AddForm />
      {typed.length === 0 && <p className="text-zinc-500 text-sm">Nema medija. Dodaj prvi.</p>}
      {typed.map((r) => <DroneRow key={r.id} row={r} />)}
    </div>
  );
}
