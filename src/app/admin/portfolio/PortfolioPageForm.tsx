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
          tour_360_embed: (fd.get("tour_360_embed") as string) || null,
          video_produkcija_embed: (fd.get("video_produkcija_embed") as string) || null,
          section_tura_title: (fd.get("section_tura_title") as string) || null,
          section_enterijer_title: (fd.get("section_enterijer_title") as string) || null,
          section_eksterijer_title: (fd.get("section_eksterijer_title") as string) || null,
          section_dron_title: (fd.get("section_dron_title") as string) || null,
          section_video_title: (fd.get("section_video_title") as string) || null,
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else setMessage({ type: "ok", text: "Sačuvano." });
      }}
    >
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}

      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide pt-2">Zaglavlje stranice</p>

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

      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide pt-4">Nazivi sekcija</p>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov sekcije 360° Tura</label>
        <input type="text" name="section_tura_title" defaultValue={empty(initial?.section_tura_title)} placeholder="npr. 360° Virtuelna Tura" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov sekcije Enterijer</label>
        <input type="text" name="section_enterijer_title" defaultValue={empty(initial?.section_enterijer_title)} placeholder="npr. Enterijer" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov sekcije Eksterijer</label>
        <input type="text" name="section_eksterijer_title" defaultValue={empty(initial?.section_eksterijer_title)} placeholder="npr. Eksterijer" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov sekcije Dron</label>
        <input type="text" name="section_dron_title" defaultValue={empty(initial?.section_dron_title)} placeholder="npr. Dron Snimci" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Naslov sekcije Video Produkcija</label>
        <input type="text" name="section_video_title" defaultValue={empty(initial?.section_video_title)} placeholder="npr. Video Produkcija" className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>

      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide pt-4">Embed linkovi</p>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">360° Tura embed URL (Matterport ili sl.)</label>
        <input type="text" name="tour_360_embed" defaultValue={empty(initial?.tour_360_embed)} placeholder="https://my.matterport.com/show/?m=..." className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">Video Produkcija embed URL (YouTube ili sl.)</label>
        <input type="text" name="video_produkcija_embed" defaultValue={empty(initial?.video_produkcija_embed)} placeholder="https://www.youtube.com/embed/..." className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" />
      </div>

      <button type="submit" disabled={saving} className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50">
        {saving ? "Čuvam…" : "Sačuvaj sve"}
      </button>
    </form>
  );
}
