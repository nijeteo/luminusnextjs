"use client";

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const interiors = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687931-cebf0746e50e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
];

const exteriors = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=1000&auto=format&fit=crop"
];

const drones = [
  { type: 'image', src: '/dron-reales.jpg' },
  { type: 'video', src: 'https://www.youtube.com/embed/qKFT4VA7elU' },
  { type: 'image', src: '/dron-reales-3.jpg' }
];

const navItems = [
  { name: '360° Tura', href: '#360-tura' },
  { name: 'Enterijer', href: '#enterijer' },
  { name: 'Eksterijer', href: '#eksterijer' },
  { name: 'Dron Snimci', href: '#dron-snimci' },
  { name: 'Video Produkcija', href: '#video-produkcija' },
];

export default function Portfolio() {
  const interiorRef = useRef<HTMLDivElement>(null);
  const exteriorRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);

  const [interiorIdx, setInteriorIdx] = useState(0);
  const [exteriorIdx, setExteriorIdx] = useState(0);
  const [droneIdx, setDroneIdx] = useState(0);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, setIdx: (idx: number) => void) => {
    const container = ref.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setIdx(index);
  };

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
          Naš Rad
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          Portfolio
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-lg max-w-2xl mx-auto mb-12"
        >
          Pregledajte naše najnovije projekte i uverite se u kvalitet naših usluga.
        </motion.p>

        {/* Navigation Buttons */}
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
        
        {/* 1. 360 Tour Section - Matterport embed (my.matterport.com/show) */}
        <section id="360-tura" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">360° Virtuelna Tura</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-video bg-white/5 border border-white/10 relative"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://my.matterport.com/show/?m=SxQL3iGyoDo&play=1"
              frameBorder="0"
              allowFullScreen
              allow="xr-spatial-tracking"
              className="absolute inset-0 w-full h-full"
              title="360 Virtual Tour Example"
            />
          </motion.div>
        </section>

        {/* 2. Interior Section */}
        <section id="enterijer" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">Enterijer</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <div 
            ref={interiorRef}
            onScroll={() => handleScroll(interiorRef, setInteriorIdx)}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          >
            {interiors.map((src, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="aspect-[4/3] overflow-hidden group relative min-w-[85vw] md:min-w-0 snap-center"
              >
                <img 
                  src={src} 
                  alt={`Enterijer ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {interiors.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-300 ${i === interiorIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </section>

        {/* 3. Exterior Section */}
        <section id="eksterijer" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">Eksterijer</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <div 
            ref={exteriorRef}
            onScroll={() => handleScroll(exteriorRef, setExteriorIdx)}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          >
            {exteriors.map((src, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="aspect-[4/3] overflow-hidden group relative min-w-[85vw] md:min-w-0 snap-center"
              >
                <img 
                  src={src} 
                  alt={`Eksterijer ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {exteriors.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-300 ${i === exteriorIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </section>

        {/* 4. Drone Section */}
        <section id="dron-snimci" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">Dron Snimci</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <div 
            ref={droneRef}
            onScroll={() => handleScroll(droneRef, setDroneIdx)}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          >
            {drones.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="aspect-video md:aspect-[4/3] overflow-hidden group relative bg-white/5 min-w-[85vw] md:min-w-0 snap-center"
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={`Dron ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={item.src} 
                    title={`Dron Video ${idx + 1}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {drones.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-300 ${i === droneIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </section>

        {/* 5. Video Section */}
        <section id="video-produkcija" className="scroll-mt-32">
          <div className="mb-10 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-serif">Video Produkcija</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[400px] aspect-[9/16] bg-white/5 border border-white/10 relative overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ye7eRew9pgg?autoplay=0&loop=1" 
                title="Real Estate Video Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}


