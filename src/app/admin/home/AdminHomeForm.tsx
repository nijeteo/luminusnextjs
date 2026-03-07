"use client";

import { useState, useRef } from "react";
import { updateHome } from "../actions";
import { ImageUploadInput } from "../ImageUploadInput";

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
          intro_heading_accent: (fd.get("intro_heading_accent") as string) || null,
          intro_heading_accent_color: (fd.get("intro_heading_accent_color") as string) || null,
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
        else setMessage({ type: "ok", text: "Sacuvano." });
      }}
    >
      {message && (
        <p className={message.type === "ok" ? "text-green-400" : "text-red-400"}>{message.text}</p>
      )}

      <Section title="Hero">
        <ImageUploadInput label="Slika" name="hero_image_url" defaultValue={empty(initial?.hero_image_url)} />
        <Input label="Naslov" name="hero_title" defaultValue={empty(initial?.hero_title)} />
        <Input label="Podnaslov" name="hero_subtitle" defaultValue={empty(initial?.hero_subtitle)} />
        <Input label="Tekst dugmeta (CTA)" name="hero_cta_text" defaultValue={empty(initial?.hero_cta_text)} />
        <Input label="Scroll label" name="scroll_label" defaultValue={empty(initial?.scroll_label)} />
      </Section>

      <Section title="Intro sekcija">
        <Input label="Intro naslov" name="intro_heading" defaultValue={empty(initial?.intro_heading)} />
        <AccentInput
          defaultValue={empty(initial?.intro_heading_accent) || "najboljem svetlu"}
          defaultColor={empty(initial?.intro_heading_accent_color) || "#D4AF37"}
        />
        <Textarea label="Intro tekst" name="intro_text" defaultValue={empty(initial?.intro_text)} />
      </Section>

      <Section title="Detalj sekcija">
        <ImageUploadInput label="Slika" name="detail_image_url" defaultValue={empty(initial?.detail_image_url)} />
        <Input label="Label" name="detail_label" defaultValue={empty(initial?.detail_label)} />
        <Input label="Naslov" name="detail_heading" defaultValue={empty(initial?.detail_heading)} />
        <Textarea label="Tekst" name="detail_text" defaultValue={empty(initial?.detail_text)} />
      </Section>

      <Section title="Pricing sekcija">
        <ImageUploadInput label="Pozadinska slika" name="pricing_bg_image_url" defaultValue={empty(initial?.pricing_bg_image_url)} />
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
        {saving ? "Cuvam..." : "Sacuvaj"}
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

function Input({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">{label}</label>
      <input
        type="text"
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

const PRIMARY_COLOR = "#D4AF37";

function AccentInput({ defaultValue, defaultColor }: { defaultValue: string; defaultColor: string }) {
  const [text, setText] = useState(defaultValue);
  const [color, setColor] = useState(defaultColor);
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">
        Akcentovani tekst naslova{" "}
        <span className="text-zinc-400">(prikazuje se u odabranoj boji, italic)</span>
      </label>

      {/* Preview */}
      <div className="mb-2 px-3 py-2 rounded bg-black/40 border border-zinc-700 text-sm font-serif">
        <span className="text-white/60 text-xs">Preview: </span>
        <span className="italic" style={{ color }}>{text || "…"}</span>
      </div>

      {/* Text input */}
      <input
        type="text"
        name="intro_heading_accent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white focus:border-amber-500 focus:outline-none mb-2"
        placeholder="najboljem svetlu"
      />

      {/* Color picker row */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500">Boja teksta:</span>

        {/* Native color picker (hidden, triggered by swatch) */}
        <input
          ref={colorInputRef}
          type="color"
          name="intro_heading_accent_color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="sr-only"
        />

        {/* Color swatch — click to open picker */}
        <button
          type="button"
          onClick={() => colorInputRef.current?.click()}
          className="w-8 h-8 rounded border-2 border-zinc-500 hover:border-white transition-colors flex-shrink-0"
          style={{ backgroundColor: color }}
          title="Izaberi boju"
        />

        {/* Hex value display */}
        <span className="text-xs text-zinc-400 font-mono">{color.toUpperCase()}</span>

        {/* Primary/favorite color preset */}
        {color.toUpperCase() !== PRIMARY_COLOR ? (
          <button
            type="button"
            onClick={() => setColor(PRIMARY_COLOR)}
            className="flex items-center gap-1.5 px-2 py-1 rounded border border-amber-600/50 text-xs text-amber-400 hover:border-amber-400 hover:bg-amber-900/20 transition-colors"
            title="Vrati na originalnu zlatnu boju"
          >
            <span
              className="inline-block w-3 h-3 rounded-full border border-amber-500"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
            Originalna boja
          </button>
        ) : (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-amber-600/30 text-xs text-amber-600">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
            Originalna boja &#10003;
          </span>
        )}
      </div>
    </div>
  );
}
