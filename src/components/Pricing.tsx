"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Camera, Video, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PackageItem } from '@/lib/supabase-content';

const ICONS = [Camera, Video, Plane];

const DEFAULT_PACKAGES: PackageItem[] = [
  { id: "1", name: "Osnovni", description: "Idealan za manje stanove i brzu prodaju.", price: "Od 100€", features: ["Profesionalne fotografije (do 20 slika)", "Osnovna obrada i korekcija boja", "Isporuka u roku od 48h"], isPopular: false, sortOrder: 0 },
  { id: "2", name: "Premium", description: "Sveobuhvatan prikaz za veće nekretnine.", price: "Od 250€", features: ["Sve iz Osnovnog paketa (do 40 slika)", "Video tura nekretnine (do 2 min)", "360° virtuelna tura"], isPopular: true, sortOrder: 1 },
  { id: "3", name: "Ekskluzivni", description: "Vrhunska prezentacija luksuznih objekata.", price: "Od 450€", features: ["Sve iz Premium paketa (neograničeno slika)", "Dron fotografije i video snimci iz vazduha", "Detaljna retuširanja i napredna montaža", "Isporuka u roku od 24h"], isPopular: false, sortOrder: 2 },
];

export type PricingProps = {
  packages?: PackageItem[] | null;
  heading?: string | null;
  subheading?: string | null;
  bgImageUrl?: string | null;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(max-width: 767px)');
    setIsMobile(m.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    m.addEventListener('change', handler);
    return () => m.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function Pricing({ packages: packagesProp, heading, subheading, bgImageUrl }: PricingProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const packages = (packagesProp && packagesProp.length > 0) ? packagesProp : DEFAULT_PACKAGES;
  const pricingHeading = heading ?? "Naši Paketi";
  const pricingSubheading = subheading ?? "Odaberite uslugu koja vam najviše odgovara";
  const defaultBg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
  const bgSrc = bgImageUrl || defaultBg;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const i = Math.max(0, Math.min(index, packages.length - 1));
    container.scrollTo({ left: i * container.offsetWidth, behavior: 'smooth' });
  };

  const cardClass = (pkg: PackageItem) =>
    `relative bg-black/40 backdrop-blur-xl border ${pkg.isPopular ? 'border-[#D4AF37]' : 'border-white/10'} p-8 md:p-10 flex flex-col h-full hover:bg-black/60 transition-colors duration-300 min-w-[85vw] md:min-w-0 snap-center ${pkg.isPopular ? 'pt-0' : ''}`;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Pozadina: na mobilnom statična, na desktopu parallax */}
      {isMobile ? (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={bgSrc} 
            alt="Living Room" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={bgSrc} 
            alt="Living Room" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          {isMobile ? (
            <>
              <h2 className="text-4xl md:text-6xl font-serif mb-4">{pricingHeading}</h2>
              <p className="text-white/70 uppercase tracking-widest text-sm">{pricingSubheading}</p>
            </>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif mb-4"
              >
                {pricingHeading}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70 uppercase tracking-widest text-sm"
              >
                {pricingSubheading}
              </motion.p>
            </>
          )}
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide"
        >
          {packages.map((pkg, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return isMobile ? (
              <div key={pkg.id} className={cardClass(pkg)}>
              {pkg.isPopular && (
                <div className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest py-2 text-center -mx-8 mb-4 rounded-t-sm md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mx-0 md:mb-0 md:rounded md:py-1 md:px-4">
                  Najpopularniji
                </div>
              )}
              <IconComponent className="w-8 h-8 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-serif mb-2">{pkg.name}</h3>
              <p className="text-white/50 text-sm mb-8 h-10">{pkg.description}</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-xl font-serif mb-6">{pkg.price}</p>
                <Link 
                  href="/kontakt#zakazi" 
                  className={`block w-full text-center py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                    pkg.isPopular 
                      ? 'bg-[#D4AF37] text-black hover:bg-white hover:text-black' 
                      : 'border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  Rezerviši
                </Link>
              </div>
            </div>
          ) : (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={cardClass(pkg)}
            >
              {pkg.isPopular && (
                <div className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest py-2 text-center -mx-8 mb-4 rounded-t-sm md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mx-0 md:mb-0 md:rounded md:py-1 md:px-4">
                  Najpopularniji
                </div>
              )}
              <IconComponent className="w-8 h-8 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-serif mb-2">{pkg.name}</h3>
              <p className="text-white/50 text-sm mb-8 h-10">{pkg.description}</p>
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-xl font-serif mb-6">{pkg.price}</p>
                <Link 
                  href="/kontakt#zakazi" 
                  className={`block w-full text-center py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                    pkg.isPopular 
                      ? 'bg-[#D4AF37] text-black hover:bg-white hover:text-black' 
                      : 'border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  Rezerviši
                </Link>
              </div>
            </motion.div>
          );
          })}
        </div>

        {/* Mobile: tačkice + dugmad levo/desno (bez loopa) */}
        <div className="flex items-center justify-center gap-4 -mt-2 md:hidden">
          <button
            type="button"
            aria-label="Prethodni paket"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="p-2 rounded-full border border-white/20 text-white disabled:opacity-40 disabled:pointer-events-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {packages.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Sledeći paket"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === packages.length - 1}
            className="p-2 rounded-full border border-white/20 text-white disabled:opacity-40 disabled:pointer-events-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
