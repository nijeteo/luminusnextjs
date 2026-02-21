import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <header className="border-b border-zinc-700 bg-zinc-800 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/admin" className="font-semibold text-white">
            Luminus Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="text-zinc-400 hover:text-white">
              Dashboard
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white" target="_blank">
              Sajt →
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">{children}</main>
    </div>
  );
}
