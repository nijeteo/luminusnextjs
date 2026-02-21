import Link from "next/link";

const links = [
  { href: "/admin/home", label: "Početna (Home)", desc: "Hero, intro, detalj, naslovi sekcija, slike" },
  { href: "/admin/home/portfolio", label: "Kartice na početnoj", desc: "Home portfolio stavke (slika, naslov, podnaslov)" },
  { href: "/admin/packages", label: "Paketi", desc: "Cene, opisi, feature liste, oznaka popularno" },
  { href: "/admin/paketi", label: "Stranica Paketi", desc: "Naslov stranice i lista usluga (tekst + slike)" },
  { href: "/admin/portfolio", label: "Stranica Portfolio", desc: "Naslov i podnaslov stranice Portfolio" },
  { href: "/admin/kontakt", label: "Stranica Kontakt", desc: "Kontakt podaci i tekstovi forme za zakazivanje" },
];

export default function AdminDashboard() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-white mb-2">Dashboard</h1>
      <p className="text-zinc-400 mb-8">Izaberi šta želiš da menjaš.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map(({ href, label, desc }) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:border-amber-500 hover:bg-zinc-750"
            >
              <span className="font-medium text-white">{label}</span>
              <p className="mt-1 text-sm text-zinc-400">{desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
