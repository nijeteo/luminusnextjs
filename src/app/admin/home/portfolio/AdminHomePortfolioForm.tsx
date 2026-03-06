"use client";

import { useState } from "react";
import { createHomePortfolioItem } from "../../actions";
import { ImageUploadInput } from "../../ImageUploadInput";

export function AdminHomePortfolioForm() {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <form
      key={key}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const res = await createHomePortfolioItem({
          image_url: (fd.get("image_url") as string) || "",
          title: (fd.get("title") as string) || "",
          subtitle: (fd.get("subtitle") as string) || "",
          sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else {
          setMessage({ type: "ok", text: "Dodato." });
          setKey((k) => k + 1);
        }
      }}
    >
      {message && <p className={`sm:col-span-2 lg:col-span-4 text-sm ${message.type === "ok" ? "text-green-400" : "text-red-400"}`}>{message.text}</p>}
      <input type="hidden" name="sort_order" value={999} />
      <div className="lg:col-span-2">
        <ImageUploadInput name="image_url" label="Slika" required />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov</label>
        <input type="text" name="title" required className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Podnaslov</label>
        <input type="text" name="subtitle" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div className="flex items-end">
        <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
          {saving ? "Dodajem..." : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
