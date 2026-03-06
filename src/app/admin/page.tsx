const sections = [
  {
    title: "Početna stranica",
    color: "border-blue-800/60",
    items: [
      { href: "/admin/home", label: "Tekstovi i slike", desc: "Hero, intro, detalj, pricing, portfolio naslovi" },
      { href: "/admin/home/portfolio", label: "Portfolio kartice", desc: "Slike i naslovi kartica na početnoj" },
    ],
  },
  {
    title: "Paketi",
    color: "border-emerald-800/60",
    items: [
      { href: "/admin/packages", label: "Paketi & cene", desc: "Cene, opisi, feature liste, popularno" },
      { href: "/admin/paketi", label: "Stranica paketi", desc: "Naslov i lista usluga sa slikama" },
    ],
  },
  {
    title: "Portfolio",
    color: "border-amber-800/60",
    items: [
      { href: "/admin/portfolio", label: "Tekstovi & embeds", desc: "Naslovi sekcija, 360° tura, video embed" },
      { href: "/admin/portfolio/interior", label: "Enterijer slike", desc: "Galerija fotografija interijera" },
      { href: "/admin/portfolio/exterior", label: "Eksterijer slike", desc: "Galerija fotografija eksterijera" },
      { href: "/admin/portfolio/drone", label: "Dron snimci", desc: "Dron slike i video embeds" },
    ],
  },
  {
    title: "Kontakt",
    color: "border-purple-800/60",
    items: [
      { href: "/admin/kontakt", label: "Stranica kontakt", desc: "Telefon, email, socijalne mreže, booking tekst" },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Izaberi sekciju koju želiš da urediš.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
              {section.title}
            </h2>
            <ul className={`grid gap-2 sm:grid-cols-2 border-l-2 pl-4 ${section.color}`}>
              {section.items.map(({ href, label, desc }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    <span className="text-sm font-medium text-white">{label}</span>
                    <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
