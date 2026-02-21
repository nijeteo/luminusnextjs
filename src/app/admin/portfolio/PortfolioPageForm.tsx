"use client";

import { useState } from "react";
import { updatePortfolioPage } from "../actions";

const empty = (v: unknown) => (v == null ? "" : String(v));

export function PortfolioPageForm({ initial }: { initial: Record<string, unknown> | null }) {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="space-y-4 max-w-xl"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const res = await updatePortfolioPage({
          eyebrow_text: (fd.get("eyebrow_text") as string) || null,
          title: (fd.get("title") as string) || null,
          subtitle: (fd.get("subtitle") as string) || null,
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else setMessage({ type: "ok", text: "Sačuvano." });
      }}
    >
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Eyebrow tekst (mali naslov iznad)</label>
        <input type="text" name="eyebrow_text" defaultValue={empty(initial?.eyebrow_text)} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov</label>
        <input type="text" name="title" defaultValue={empty(initial?.title)} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Podnaslov</label>
        <textarea name="subtitle" defaultValue={empty(initial?.subtitle)} rows={2} className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
        {saving ? "Čuvam…" : "Sačuvaj"}
      </button>
    </form>
  );
}
