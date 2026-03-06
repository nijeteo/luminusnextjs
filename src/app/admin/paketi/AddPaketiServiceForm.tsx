"use client";

import { useState } from "react";
import { createPaketiService } from "../actions";
import { ImageUploadInput } from "../ImageUploadInput";

export function AddPaketiServiceForm() {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <form
      key={key}
      className="space-y-3"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const res = await createPaketiService({
          title: (fd.get("title") as string) || "",
          description: (fd.get("description") as string) || "",
          image_url: (fd.get("image_url") as string) || "",
          reverse: fd.get("reverse") === "1",
          link_to: (fd.get("link_to") as string) || null,
          sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else { setMessage({ type: "ok", text: "Usluga dodata." }); setKey((k) => k + 1); }
      }}
    >
      {message && <p className={`text-sm ${message.type === "ok" ? "text-green-400" : "text-red-400"}`}>{message.text}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Naslov *</label>
          <input type="text" name="title" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Link (opciono)</label>
          <input type="text" name="link_to" placeholder="/portfolio" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
        </div>
      </div>
      <ImageUploadInput name="image_url" label="Slika *" required />
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Opis</label>
        <textarea name="description" rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input type="checkbox" name="reverse" value="1" className="rounded border-zinc-600 bg-zinc-700 text-amber-500" />
          Reverse layout
        </label>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">Redosled</label>
          <input type="number" name="sort_order" defaultValue={0} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-white" />
        </div>
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem..." : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
