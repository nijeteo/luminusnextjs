"use client";

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { PortfolioPageContent, PortfolioMediaItem, PortfolioDroneItem } from "@/lib/supabase-content";

// Fallback podaci ako je baza prazna
const FALLBACK_INTERIORS = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
];

const FALLBACK_EXTERIORS = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=1000&auto=format&fit=crop",
];

const FALLBACK_DRONES: PortfolioDroneItem[] = [
  { id: "f1", mediaUrl: "/dron-reales.jpg", mediaType: "image", sortOrder: 0 },
  { id: "f2", mediaUrl: "https://www.youtube.com/embed/qKFT4VA7elU", mediaType: "video", sortOrder: 1 },
  { id: "f3", mediaUrl: "/dron-reales-3.jpg", mediaType: "image", sortOrder: 2 },
];

const FALLBACK_360 = "https://my.matterport.com/show/?m=SxQL3iGyoDo&play=1";
const FALLBACK_VIDEO = "https://www.youtube.com/embed/ye7eRew9pgg?autoplay=0&loop=1";

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

type Props = {
  page: PortfolioPageContent | null;
  interiors: PortfolioMediaItem[];
  exteriors: PortfolioMediaItem[];
  drones: PortfolioDroneItem[];
};

export function PortfolioClient({ page, interiors, exteriors, drones }: Props) {
  const interiorRef = useRef<HTMLDivElement>(null);
  const exteriorRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [interiorIdx, setInteriorIdx] = useState(0);
  const [exteriorIdx, setExteriorIdx] = useState(0);
  const [droneIdx, setDroneIdx] = useState(0);

  // Podaci iz baze ili fallback
  const interiorUrls = interiors.length > 0 ? interiors.map((i) => i.imageUrl) : FALLBACK_INTERIORS;
  const exteriorUrls = exteriors.length > 0 ? exteriors.map((e) => e.imageUrl) : FALLBACK_EXTERIORS;
  const droneItems = drones.length > 0 ? drones : FALLBACK_DRONES;

  const tour360 = page?.tour360Embed || FALLBACK_360;
  const videoProd = page?.videoProdukcijaEmbed || FALLBACK_VIDEO;

  const eyebrow = page?.eyebrowText || "Naš Rad";
  const title = page?.title || "Portfolio";
  const subtitle = page?.subtitle || "Pregledajte naše najnovije projekte i uverite se u kvalitet naših usluga.";

  const turaTitle = page?.sectionTuraTitle || "360° Virtuelna Tura";
  const enterijerTitle = page?.sectionEnterijerTitle || "Enterijer";
  const eksterijerTitle = page?.sectionEksterijerTitle || "Eksterijer";
  const dronTitle = page?.sectionDronTitle || "Dron Snimci";
  const videoTitle = page?.sectionVideoTitle || "Video Produkcija";

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, setIdx: (idx: number) => void) => {
    const container = ref.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setIdx(index);
  };

  const navItems = [
    { name: turaTitle, href: '#360-tura' },
    { name: enterijerTitle, href: '#enterijer' },
    { name: eksterijerTitle, href: '#eksterijer' },
    { name: dronTitle, href: '#dron-snimci' },
    { name: videoTitle, href: '#video-produkcija' },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      {/* Header */}
      <div className="text-center px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-lg max-w-2xl mx-auto mb-12"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-6 py-2 border border-white/10 text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 bg-white/5"
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* 1. 360° Tura */}
        <section id="360-tura" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">{turaTitle}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-video bg-white/5 border border-white/10 relative"
          >
            {tour360 ? (
              <iframe
                width="100%"
                height="100%"
                src={tour360}
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
                className="absolute inset-0 w-full h-full"
                title="360 Virtual Tour"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/30 text-sm">
                360° tura nije podešena
              </div>
            )}
          </motion.div>
        </section>

        {/* 2. Enterijer */}
        <section id="enterijer" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">{enterijerTitle}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          {interiorUrls.length > 0 ? (
            <>
              <div
                ref={interiorRef}
                onScroll={() => handleScroll(interiorRef, setInteriorIdx)}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
              >
                {interiorUrls.map((src, idx) => {
                  const slideClass = "aspect-[4/3] overflow-hidden group relative min-w-[85vw] md:min-w-0 snap-center";
                  if (isMobile) {
                    return (
                      <div key={idx} className={slideClass}>
                        <img src={src} alt={`${enterijerTitle} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    );
                  }
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }} className={slideClass}>
                      <img src={src} alt={`${enterijerTitle} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {interiorUrls.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-300 ${i === interiorIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-white/30 text-sm py-12 text-center border border-white/10">Nema slika. Dodajte ih u admin panelu.</div>
          )}
        </section>

        {/* 3. Eksterijer */}
        <section id="eksterijer" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">{eksterijerTitle}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          {exteriorUrls.length > 0 ? (
            <>
              <div
                ref={exteriorRef}
                onScroll={() => handleScroll(exteriorRef, setExteriorIdx)}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
              >
                {exteriorUrls.map((src, idx) => {
                  const slideClass = "aspect-[4/3] overflow-hidden group relative min-w-[85vw] md:min-w-0 snap-center";
                  if (isMobile) {
                    return (
                      <div key={idx} className={slideClass}>
                        <img src={src} alt={`${eksterijerTitle} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    );
                  }
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }} className={slideClass}>
                      <img src={src} alt={`${eksterijerTitle} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {exteriorUrls.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-300 ${i === exteriorIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-white/30 text-sm py-12 text-center border border-white/10">Nema slika. Dodajte ih u admin panelu.</div>
          )}
        </section>

        {/* 4. Dron */}
        <section id="dron-snimci" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">{dronTitle}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          {droneItems.length > 0 ? (
            <>
              <div
                ref={droneRef}
                onScroll={() => handleScroll(droneRef, setDroneIdx)}
                className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
              >
                {droneItems.map((item, idx) => {
                  const slideClass = "aspect-video md:aspect-[4/3] overflow-hidden group relative bg-white/5 min-w-[85vw] md:min-w-0 snap-center";
                  const content = (
                    <>
                      {item.mediaType === 'image' ? (
                        <img src={item.mediaUrl} alt={`${dronTitle} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      ) : (
                        <iframe width="100%" height="100%" src={item.mediaUrl} title={`${dronTitle} Video ${idx + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full" />
                      )}
                      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </>
                  );
                  if (isMobile) return <div key={item.id} className={slideClass}>{content}</div>;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }} className={slideClass}>
                      {content}
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {droneItems.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-300 ${i === droneIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-white/30 text-sm py-12 text-center border border-white/10">Nema sadržaja. Dodajte ih u admin panelu.</div>
          )}
        </section>

        {/* 5. Video Produkcija */}
        <section id="video-produkcija" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">{videoTitle}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {videoProd ? (
              <div className="w-full max-w-[400px] aspect-[9/16] bg-white/5 border border-white/10 relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoProd}
                  title="Real Estate Video Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <div className="text-white/30 text-sm py-12 text-center border border-white/10 w-full max-w-[400px]">
                Video nije podešen
              </div>
            )}
          </motion.div>
        </section>

      </div>
    </div>
  );
}
