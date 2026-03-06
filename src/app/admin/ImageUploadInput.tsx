"use client";

import { useRef, useState } from "react";
import { uploadImageToStorage } from "./actions";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

export function ImageUploadInput({
  name,
  label,
  defaultValue = "",
  required,
  placeholder = "https://...",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImageToStorage(fd);
    setUploading(false);
    if ("error" in res) {
      setError(res.error);
    } else {
      setValue(res.url);
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="flex-1 min-w-0 rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 flex items-center gap-1.5 rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-600 hover:text-white disabled:opacity-50 transition-colors"
        >
          {uploading ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Postavljam
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Postavi
            </>
          )}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {value && !uploading && (
        <img
          src={value}
          alt=""
          className="mt-2 h-14 w-20 rounded object-cover border border-zinc-700"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}
