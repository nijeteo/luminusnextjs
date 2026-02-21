"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Pricing from "../components/Pricing";
import type { HomeContent, HomePortfolioItem, PackageItem } from "@/lib/supabase-content";

const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2075&auto=format&fit=crop";
const DEFAULT_DETAIL_IMAGE = "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2000&auto=format&fit=crop";

export type HomePageFallbackProps = {
  home?: HomeContent | null;
  homePortfolioItems?: HomePortfolioItem[];
  packages?: PackageItem[] | null;
};

const DEFAULT_PORTFOLIO_ITEMS: HomePortfolioItem[] = [
  { id: "1", imageUrl: "/modern-interior.jpg", title: "Moderan Enterijer", subtitle: "Beograd", sortOrder: 0 },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", title: "Luksuzna Vila", subtitle: "Novi Sad", sortOrder: 1 },
];

export default function HomePageFallback({
  home,
  homePortfolioItems = [],
  packages: packagesProp,
}: HomePageFallbackProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const heroImage = home?.heroImageUrl || DEFAULT_HERO_IMAGE;
  const heroTitle = home?.heroTitle ?? "LUMINUS";
  const heroSubtitle = home?.heroSubtitle ?? "Ekskluzivna Fotografija Nekretnina";
  const heroCta = home?.heroCtaText ?? "Zakaži Termin";
  const scrollLabel = home?.scrollLabel ?? "Skroluj";
  const introHeading = home?.introHeading ?? "Istaknite vašu imovinu u ";
  const introText = home?.introText ?? "Specijalizovani smo za profesionalno fotografisanje, snimanje, 360° ture i dron snimke nekretnina. Naš cilj je da prenesemo atmosferu i luksuz svakog prostora, privlačeći prave kupce.";
  const detailImage = home?.detailImageUrl || DEFAULT_DETAIL_IMAGE;
  const detailLabel = home?.detailLabel ?? "Enterijeri & Prostori";
  const detailHeading = home?.detailHeading ?? "Svaki detalj\ngovori.";
  const detailText = home?.detailText ?? "Od dnevne sobe do kuhinje — svaki prostor prikazan tačno onako kako kupci žele da ga vide.";
  const portfolioHeading = home?.portfolioHeading ?? "Naš Rad";
  const portfolioSubheading = home?.portfolioSubheading ?? "Odabrani Projekti";
  const portfolioCta = home?.portfolioCtaText ?? "Pogledaj ceo portfolio";
  const portfolioItems = homePortfolioItems.length >= 2 ? homePortfolioItems : DEFAULT_PORTFOLIO_ITEMS;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <section
        ref={containerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={heroImage}
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter mb-6"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-widest uppercase text-white/80 mb-12"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link
              href="/kontakt#zakazi"
              className="inline-block px-10 py-4 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
            >
              {heroCta}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">
            {scrollLabel}
          </span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-[#D4AF37] absolute top-0"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-black relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif mb-8 leading-tight"
          >
            {introHeading}
            <span className="text-[#D4AF37] italic">najboljem svetlu</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
          >
            {introText}
          </motion.p>
        </div>
      </section>

      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <img
            src={detailImage}
            alt="Interior Details"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4">
              {detailLabel}
            </p>
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight whitespace-pre-line">
              {detailHeading}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {detailText}
            </p>
          </motion.div>
        </div>
      </section>

      <Pricing
        packages={packagesProp}
        heading={home?.pricingHeading ?? undefined}
        subheading={home?.pricingSubheading ?? undefined}
        bgImageUrl={home?.pricingBgImageUrl ?? undefined}
      />

      <section className="py-32 px-6 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-4">{portfolioHeading}</h2>
            <p className="text-white/50 uppercase tracking-widest text-sm mb-8">
              {portfolioSubheading}
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-sm font-medium group"
            >
              {portfolioCta}
              <span className="w-8 h-[1px] bg-[#D4AF37] group-hover:bg-white transition-colors block ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.slice(0, 2).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`group relative overflow-hidden aspect-[4/5] ${idx === 1 ? "md:mt-16" : ""}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                  <p className="text-[#D4AF37] uppercase tracking-widest text-xs">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
