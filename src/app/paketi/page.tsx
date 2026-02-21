"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Pricing from '../../components/Pricing';

const services = [
  {
    title: "Fotografija Enterijera",
    description: "Hvatamo suštinu svakog prostora. Kroz pažljivo kadriranje, optimalno osvetljenje i naprednu postprodukciju, ističemo toplinu, prostranost i dizajn vašeg enterijera. Svaka fotografija je dizajnirana da privuče pažnju i stvori emotivnu povezanost sa potencijalnim kupcima.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    reverse: false
  },
  {
    title: "Fotografija Eksterijera",
    description: "Prvi utisak je najvažniji. Naše fotografije eksterijera prikazuju vašu nekretninu u najboljem svetlu, naglašavajući arhitekturu, okolinu i pejzaž. Koristimo najbolje doba dana, uključujući 'zlatni sat' i sumrak, kako bismo stvorili dramatične i privlačne slike.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    reverse: true
  },
  {
    title: "Dron Snimci i Fotografije",
    description: "Pružite jedinstvenu perspektivu iz vazduha. Dron snimci su savršeni za prikazivanje veličine imanja, granica parcele i okolnog susedstva. Naši licencirani operateri hvataju spektakularne kadrove koji izdvajaju vašu nekretninu na tržištu.",
    image: "/dron.jpeg",
    reverse: false
  },
  {
    title: "360° Virtuelne Ture",
    description: "Omogućite kupcima da prošetaju kroz nekretninu sa bilo kog mesta na svetu. Naše interaktivne 360° ture pružaju realističan osećaj prostora i rasporeda prostorija, štedeći vreme i vama i klijentima filtriranjem samo najozbiljnijih kupaca. Kliknite na sliku da biste videli video snimak.",
    image: "/360cam.jpg",
    reverse: true,
    linkTo: "/portfolio#360-tura"
  }
];

export default function Packages() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      {/* Header - Paketi */}
      <div className="py-20 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          Paketi
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 uppercase tracking-widest max-w-2xl mx-auto"
        >
          Izaberite paket koji odgovara vašim potrebama
        </motion.p>
      </div>

      {/* Pricing Section - prvo */}
      <Pricing />

      {/* Naše usluge */}
      <div className="py-20 text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          Naše Usluge
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 uppercase tracking-widest max-w-2xl mx-auto"
        >
          Sve što vam je potrebno za savršenu prezentaciju nekretnine
        </motion.p>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-32">
        {services.map((service, index) => (
          <ServiceRow key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service, index }: { service: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className={`flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
    >
      <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] relative group">
        {service.linkTo ? (
          <Link href={service.linkTo} className="block w-full h-full">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>
        ) : (
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">{service.title}</h2>
        <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
        <p className="text-white/70 leading-relaxed text-lg">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
