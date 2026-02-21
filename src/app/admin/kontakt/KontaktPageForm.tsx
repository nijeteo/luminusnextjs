"use client";

import { useState } from "react";
import { updateKontaktPage } from "../actions";

const empty = (v: unknown) => (v == null ? "" : String(v));

const FIELDS: { key: string; label: string }[] = [
  { key: "page_eyebrow", label: "Eyebrow (mali naslov)" },
  { key: "page_title", label: "Naslov stranice" },
  { key: "page_subtitle", label: "Podnaslov" },
  { key: "phone_label", label: "Telefon – label" },
  { key: "phone_value", label: "Telefon – broj" },
  { key: "instagram_label", label: "Instagram – label" },
  { key: "instagram_value", label: "Instagram – URL ili @" },
  { key: "email_label", label: "Email – label" },
  { key: "email_value", label: "Email – adresa" },
  { key: "tiktok_label", label: "TikTok – label" },
  { key: "tiktok_value", label: "TikTok – URL ili @" },
  { key: "booking_eyebrow", label: "Zakazivanje – eyebrow" },
  { key: "booking_title", label: "Zakazivanje – naslov" },
  { key: "booking_intro", label: "Zakazivanje – uvodni tekst" },
  { key: "success_title", label: "Poruka posle slanja – naslov" },
  { key: "success_message", label: "Poruka posle slanja – tekst" },
];

export function KontaktPageForm({ initial }: { initial: Record<string, unknown> | null }) {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="space-y-6"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const payload: Record<string, string | null> = {};
        for (const { key } of FIELDS) {
          payload[key] = (fd.get(key) as string) || null;
        }
        const res = await updateKontaktPage(payload);
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else setMessage({ type: "ok", text: "Sačuvano." });
      }}
    >
      {message && <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs text-zinc-500 mb-1">{label}</label>
            <input
              type="text"
              name={key}
              defaultValue={empty(initial?.[key])}
              className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-500 disabled:opacity-50"
      >
        {saving ? "Čuvam…" : "Sačuvaj"}
      </button>
    </form>
  );
}
