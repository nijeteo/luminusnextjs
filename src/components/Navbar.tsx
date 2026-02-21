"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: 'Početna', path: '/' },
    { name: 'Paketi', path: '/paketi' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  const mobileNavLinks = [
    { name: 'Paketi', path: '/paketi' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5rem] sm:min-h-[5.5rem] md:h-24 gap-3 py-2">
          {/* Logo - levo na svim uređajima, na mobilnom manji */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Luminus Logo" className="h-[3.8rem] sm:h-[5rem] md:h-[6.8rem] w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "text-sm uppercase tracking-widest font-medium transition-colors hover:text-[#D4AF37]",
                  pathname === link.path ? "text-[#D4AF37]" : "text-white/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/kontakt#zakazi"
              className="ml-4 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              Zakaži Termin
            </Link>
          </div>

          {/* Mobile Navigation - Paketi, Portfolio, Kontakt */}
          <nav className="md:hidden flex items-center gap-4 sm:gap-6 flex-shrink-0">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium transition-colors hover:text-[#D4AF37] whitespace-nowrap py-2",
                  pathname === link.path ? "text-[#D4AF37]" : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.nav>
  );
}

