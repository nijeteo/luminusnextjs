"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Pocetna",
    items: [
      { href: "/admin/home", label: "Tekstovi i slike" },
      { href: "/admin/home/portfolio", label: "Portfolio kartice" },
    ],
  },
  {
    label: "Paketi",
    items: [
      { href: "/admin/packages", label: "Paketi & cene" },
      { href: "/admin/paketi", label: "Stranica paketi" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { href: "/admin/portfolio", label: "Tekstovi & embeds" },
      { href: "/admin/portfolio/interior", label: "Enterijer slike" },
      { href: "/admin/portfolio/exterior", label: "Eksterijer slike" },
      { href: "/admin/portfolio/drone", label: "Dron snimci" },
    ],
  },
  {
    label: "Kontakt",
    items: [{ href: "/admin/kontakt", label: "Stranica kontakt" }],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
      <Link
        href="/admin"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
          pathname === "/admin"
            ? "bg-amber-600 text-white"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        )}
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </Link>

      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-amber-600/20 text-amber-400 font-medium"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", active ? "bg-amber-400" : "bg-zinc-700")} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
