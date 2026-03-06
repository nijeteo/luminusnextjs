"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "./AdminNav";

const StarIcon = () => (
  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const SidebarFooter = () => (
  <div className="px-4 py-4 border-t border-zinc-800 space-y-1">
    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      Pogledaj sajt
    </a>
    <a
      href="/admin/login"
      className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Odjavi se
    </a>
  </div>
);

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-zinc-200">

      {/* ── Mobile top bar ───────────────────────────── */}
      <header className="md:hidden fixed inset-x-0 top-0 z-30 h-14 flex items-center border-b border-zinc-800 bg-[#0d0d0d] px-4 gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Otvori meni"
          className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-600 flex items-center justify-center shrink-0">
            <StarIcon />
          </div>
          <span className="text-sm font-bold text-white">Luminus Admin</span>
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Sajt ↗
        </a>
      </header>

      {/* ── Backdrop (mobile only) ────────────────────── */}
      <div
        className={[
          "md:hidden fixed inset-0 z-40 bg-black/70 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      {/* ── Sidebar ──────────────────────────────────── */}
      <aside
        className={[
          // base
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0d0d0d] border-r border-zinc-800",
          "transition-transform duration-200 ease-in-out",
          // mobile: slide in/out
          open ? "translate-x-0" : "-translate-x-full",
          // desktop: always visible, sticky, narrower
          "md:translate-x-0 md:sticky md:top-0 md:h-screen md:w-56 md:shrink-0",
        ].join(" ")}
      >
        {/* Mobile: sidebar header with close button */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-600 flex items-center justify-center">
              <StarIcon />
            </div>
            <span className="text-sm font-bold text-white">Luminus Admin</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Zatvori meni"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop: brand */}
        <div className="hidden md:block px-4 py-5 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-600 flex items-center justify-center shrink-0">
              <StarIcon />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Luminus</p>
              <p className="text-[10px] text-zinc-500 leading-none mt-0.5">Admin panel</p>
            </div>
          </Link>
        </div>

        <AdminNav />
        <SidebarFooter />
      </aside>

      {/* ── Main content ─────────────────────────────── */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0 p-4 sm:p-6 lg:p-8 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
