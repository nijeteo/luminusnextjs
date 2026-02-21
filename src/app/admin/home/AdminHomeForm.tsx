"use client";

import { useState } from "react";
import { updateHome } from "../actions";

const empty = (v: unknown) => (v == null ? "" : String(v));

export function AdminHomeForm({ initial }: { initial: Record<string, unknown> | null }) {
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="space-y-8"
      action={async (fd: FormData) => {
        setMessage(null);
        setSaving(true);
        const res = await updateHome({
          hero_image_url: (fd.get("hero_image_url") as string) || null,
          hero_title: (fd.get("hero_title") as string) || null,
          hero_subtitle: (fd.get("hero_subtitle") as string) || null,
          hero_cta_text: (fd.get("hero_cta_text") as string) || null,
          scroll_label: (fd.get("scroll_label") as string) || null,
          intro_heading: (fd.get("intro_heading") as string) || null,
          intro_text: (fd.get("intro_text") as string) || null,
          detail_image_url: (fd.get("detail_image_url") as string) || null,
          detail_label: (fd.get("detail_label") as string) || null,
          detail_heading: (fd.get("detail_heading") as string) || null,
          detail_text: (fd.get("detail_text") as string) || null,
          pricing_bg_image_url: (fd.get("pricing_bg_image_url") as string) || null,
          pricing_heading: (fd.get("pricing_heading") as string) || null,
          pricing_subheading: (fd.get("pricing_subheading") as string) || null,
          portfolio_heading: (fd.get("portfolio_heading") as string) || null,
          portfolio_subheading: (fd.get("portfolio_subheading") as string) || null,
          portfolio_cta_text: (fd.get("portfolio_cta_text") as string) || null,
        });
        setSaving(false);
        if (res?.error) setMessage({ type: "error", text: res.error });
        else setMessage({ type: "ok", text: "Sačuvano." });
      }}
    >
      {message && (
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>
      )}

      <Section title="Hero">
        <Input label="Slika (URL)" name="hero_image_url" defaultValue={empty(initial?.hero_image_url)} />
        <Input label="Naslov" name="hero_title" defaultValue={empty(initial?.hero_title)} />
        <Input label="Podnaslov" name="hero_subtitle" defaultValue={empty(initial?.hero_subtitle)} />
        <Input label="Tekst dugmeta (CTA)" name="hero_cta_text" defaultValue={empty(initial?.hero_cta_text)} />
        <Input label="Scroll label" name="scroll_label" defaultValue={empty(initial?.scroll_label)} />
      </Section>

      <Section title="Intro sekcija">
        <Input label="Intro naslov" name="intro_heading" defaultValue={empty(initial?.intro_heading)} />
        <Textarea label="Intro tekst" name="intro_text" defaultValue={empty(initial?.intro_text)} />
      </Section>

      <Section title="Detalj sekcija">
        <Input label="Slika (URL)" name="detail_image_url" defaultValue={empty(initial?.detail_image_url)} />
        <Input label="Label" name="detail_label" defaultValue={empty(initial?.detail_label)} />
        <Input label="Naslov" name="detail_heading" defaultValue={empty(initial?.detail_heading)} />
        <Textarea label="Tekst" name="detail_text" defaultValue={empty(initial?.detail_text)} />
      </Section>

      <Section title="Pricing sekcija">
        <Input label="Pozadinska slika (URL)" name="pricing_bg_image_url" defaultValue={empty(initial?.pricing_bg_image_url)} />
        <Input label="Naslov" name="pricing_heading" defaultValue={empty(initial?.pricing_heading)} />
        <Input label="Podnaslov" name="pricing_subheading" defaultValue={empty(initial?.pricing_subheading)} />
      </Section>

      <Section title="Portfolio sekcija (naslovi)">
        <Input label="Naslov" name="portfolio_heading" defaultValue={empty(initial?.portfolio_heading)} />
        <Input label="Podnaslov" name="portfolio_subheading" defaultValue={empty(initial?.portfolio_subheading)} />
        <Input label="Tekst linka (CTA)" name="portfolio_cta_text" defaultValue={empty(initial?.portfolio_cta_text)} />
      </Section>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-500 disabled:opacity-50"
      >
        {saving ? "Čuvam…" : "Sačuvaj"}
      </button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h2 className="mb-3 text-sm font-medium text-amber-400">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
      />
    </div>
  );
}

function Textarea({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
      />
    </div>
  );
}
