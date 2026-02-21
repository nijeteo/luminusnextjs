"use client";

import { useState } from "react";
import { createPaketiService } from "../actions";

export function AddPaketiServiceForm() {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
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
        else {
          setMessage({ type: "ok", text: "Usluga dodata." });
          window.location.reload();
        }
      }}
    >
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov</label>
        <input type="text" name="title" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Slika (URL)</label>
        <input type="url" name="image_url" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs text-zinc-500 mb-1">Opis</label>
        <textarea name="description" rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Link (opciono)</label>
        <input type="text" name="link_to" placeholder="/portfolio" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input type="checkbox" name="reverse" value="1" className="rounded border-zinc-600 bg-zinc-700 text-amber-500" />
          Reverse layout
        </label>
        <input type="number" name="sort_order" defaultValue={0} className="w-16 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-white" />
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem…" : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
