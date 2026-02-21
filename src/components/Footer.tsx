import Link from 'next/link';
import { Instagram, Mail, Phone } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 border-t border-white/10 py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-3xl font-serif tracking-widest text-white uppercase mb-4 block">
            Luminus
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Ekskluzivna fotografija i kinematografija nekretnina. Istaknite vašu imovinu u najboljem svetlu.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/luminus_photography/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@odgajivacnicaroyal?lang=en" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#D4AF37] transition-colors" aria-label="TikTok">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest text-sm mb-6">Lokacije</h4>
          <ul className="space-y-3 text-sm">
            <li>Beograd</li>
            <li>Novi Sad</li>
            <li>Zrenjanin</li>
            <li>Pančevo</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest text-sm mb-6">Navigacija</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Početna</Link></li>
            <li><Link href="/paketi" className="hover:text-[#D4AF37] transition-colors">Paketi</Link></li>
            <li><Link href="/portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link></li>
            <li><Link href="/kontakt" className="hover:text-[#D4AF37] transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest text-sm mb-6">Kontakt</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#D4AF37]" />
              <a href="tel:+381629233484" className="hover:text-[#D4AF37] transition-colors">+381 62 923 3484</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#D4AF37]" />
              <a href="mailto:info@luminus.rs" className="hover:text-[#D4AF37] transition-colors">info@luminus.rs</a>
            </li>
          </ul>
          <Link
            href="/kontakt#zakazi"
            className="inline-block mt-8 px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            Zakaži Termin
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs text-center text-white/40">
        <p>&copy; {new Date().getFullYear()} Luminus Studio. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}

