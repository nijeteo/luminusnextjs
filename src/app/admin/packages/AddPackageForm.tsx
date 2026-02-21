"use client";

import { useState } from "react";
import { createPackage } from "../actions";

export function AddPackageForm() {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="space-y-3"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const featuresStr = (fd.get("features") as string) || "";
        const features = featuresStr.split("\n").map((s) => s.trim()).filter(Boolean);
        const res = await createPackage({
          name: (fd.get("name") as string) || "",
          description: (fd.get("description") as string) || "",
          price: (fd.get("price") as string) || "",
          features,
          is_popular: fd.get("is_popular") === "1",
          sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else {
          setMessage({ type: "ok", text: "Paket dodat." });
          window.location.reload();
        }
      }}
    >
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Naziv</label>
          <input type="text" name="name" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Cena (npr. Od 100€)</label>
          <input type="text" name="price" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input type="checkbox" name="is_popular" value="1" className="rounded border-zinc-600 bg-zinc-700 text-amber-500" />
            Popularan
          </label>
        </div>
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Opis</label>
        <textarea name="description" rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Stavke (jedna po liniji)</label>
        <textarea name="features" rows={4} placeholder="Fotografije&#10;Video&#10;360° tura" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-zinc-400">Redosled</label>
        <input type="number" name="sort_order" defaultValue={0} className="w-20 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-white" />
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem…" : "Dodaj paket"}
        </button>
      </div>
    </form>
  );
}
