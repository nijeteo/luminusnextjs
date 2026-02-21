"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Pricing from "../../components/Pricing";
import type { PaketiPageContent, PaketiServiceItem, PackageItem } from "@/lib/supabase-content";

const DEFAULT_SERVICES: PaketiServiceItem[] = [
  { id: "1", title: "Fotografija Enterijera", description: "Hvatamo suštinu svakog prostora...", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop", reverse: false, linkTo: null, sortOrder: 0 },
  { id: "2", title: "Fotografija Eksterijera", description: "Prvi utisak je najvažniji...", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop", reverse: true, linkTo: null, sortOrder: 1 },
  { id: "3", title: "Dron Snimci i Fotografije", description: "Pružite jedinstvenu perspektivu iz vazduha...", imageUrl: "/dron.jpeg", reverse: false, linkTo: null, sortOrder: 2 },
  { id: "4", title: "360° Virtuelne Ture", description: "Omogućite kupcima da prošetaju...", imageUrl: "/360cam.jpg", reverse: true, linkTo: "/portfolio#360-tura", sortOrder: 3 },
];

export default function PaketiContent({
  pageContent,
  services: servicesProp,
  packages: packagesProp,
}: {
  pageContent?: PaketiPageContent | null;
  services?: PaketiServiceItem[];
  packages?: PackageItem[] | null;
}) {
  const title = pageContent?.title ?? "Paketi";
  const subtitle = pageContent?.subtitle ?? "Izaberite paket koji odgovara vašim potrebama";
  const servicesHeading = pageContent?.servicesHeading ?? "Naše Usluge";
  const servicesSubheading = pageContent?.servicesSubheading ?? "Sve što vam je potrebno za savršenu prezentaciju nekretnine";
  const services = (servicesProp && servicesProp.length > 0) ? servicesProp : DEFAULT_SERVICES;

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <div className="py-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 uppercase tracking-widest max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <Pricing packages={packagesProp} />

      <div className="py-20 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          {servicesHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 uppercase tracking-widest max-w-2xl mx-auto"
        >
          {servicesSubheading}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-32">
        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service, index }: { service: PaketiServiceItem; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`flex flex-col ${service.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center`}
    >
      <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] relative group">
        {service.linkTo ? (
          <Link href={service.linkTo} className="block w-full h-full">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>
        ) : (
          <img
            src={service.imageUrl}
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
        <p className="text-white/70 leading-relaxed text-lg">{service.description}</p>
      </div>
    </motion.div>
  );
}
