"use client";

import { useState } from "react";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      <form
        action={async (fd) => {
          setError(null);
          const res = await login(fd);
          if (res?.error) setError(res.error);
        }}
        className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-800 p-6 shadow-xl"
      >
        <h1 className="text-xl font-semibold text-white mb-4">Admin prijava</h1>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <label className="block text-sm text-zinc-400 mb-2">Lozinka</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
          placeholder="Unesi admin lozinku"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full rounded bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Uđi
        </button>
      </form>
    </div>
  );
}
