"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronDown, CheckCircle2, AlertCircle, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Contact() {
  useEffect(() => {
    if (window.location.hash === '#zakazi') {
      const element = document.getElementById('zakazi');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    package: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
    ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
    : null;

  // Minimalno dan unapred za rezervaciju (lokalan datum)
  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const minDate = getMinDate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Ime i prezime su obavezni';
    
    if (!formData.email.includes('@')) newErrors.email = 'Unesite validnu email adresu';
    
    const phoneRegex = /^\+3816[0-9]{6,8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Broj mora početi sa +3816 i sadržati validan broj cifara';
    }
    
    if (!formData.package) newErrors.package = 'Izaberite paket';
    
    if (!formData.date) {
      newErrors.date = 'Izaberite datum';
    } else if (formData.date < minDate) {
      newErrors.date = 'Rezervacija mora biti najmanje dan unapred';
    }
    
    if (formData.time) {
      const hour = parseInt(formData.time.split(':')[0], 10);
      if (hour < 8 || hour >= 18) {
        newErrors.time = 'Radno vreme je od 08:00 do 18:00';
      }
    } else {
      newErrors.time = 'Izaberite vreme';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    if (!FORMSPREE_ENDPOINT) {
      setSubmitError('Forma nije podešena. Kontaktirajte nas direktno: info@luminus.rs ili +381 62 923 3484.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          package: formData.package,
          date: formData.date,
          time: formData.time,
          message: formData.message,
          _replyto: formData.email,
        }),
      });
      if (!res.ok) {
        await res.text();
        setSubmitError(`Formspree greška (${res.status}). Na Vercel-u u Settings → Environment Variables dodajte NEXT_PUBLIC_FORMSPREE_ID=mykddrkn. Ili nas kontaktirajte: info@luminus.rs`);
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError('Mreža ili Formspree nisu dostupni. Proverite internet i da li je NEXT_PUBLIC_FORMSPREE_ID podešen na deploy-u. Kontakt: info@luminus.rs');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Očisti grešku kada korisnik krene da kuca
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      {/* Contact Info Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4"
          >
            Kontakt
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Stupimo u kontakt
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Pratite naš rad na društvenim mrežama ili nas kontaktirajte direktno.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* 1. Phone */}
          <motion.a 
            href="tel:+381629233484"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-row md:flex-col items-center text-left md:text-center hover:bg-white/10 hover:border-[#D4AF37] transition-all duration-300 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border border-white/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:border-[#D4AF37] transition-colors flex-shrink-0">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">Telefon</h3>
              <p className="text-white/50 text-xs md:text-sm">+381 62 923 3484</p>
            </div>
          </motion.a>

          {/* 2. Instagram */}
          <motion.a 
            href="https://www.instagram.com/luminus_photography/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-row md:flex-col items-center text-left md:text-center hover:bg-white/10 hover:border-[#D4AF37] transition-all duration-300 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border border-white/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:border-[#D4AF37] transition-colors flex-shrink-0">
              <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">Instagram</h3>
              <p className="text-white/50 text-xs md:text-sm">@luminus_photography</p>
            </div>
          </motion.a>

          {/* 3. Email */}
          <motion.a 
            href="mailto:info@luminus.rs"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-row md:flex-col items-center text-left md:text-center hover:bg-white/10 hover:border-[#D4AF37] transition-all duration-300 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border border-white/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:border-[#D4AF37] transition-colors flex-shrink-0">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">Email</h3>
              <p className="text-white/50 text-xs md:text-sm">info@luminus.rs</p>
            </div>
          </motion.a>

          {/* 4. TikTok */}
          <motion.a 
            href="https://www.tiktok.com/@odgajivacnicaroyal?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-row md:flex-col items-center text-left md:text-center hover:bg-white/10 hover:border-[#D4AF37] transition-all duration-300 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border border-white/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:border-[#D4AF37] transition-colors flex-shrink-0">
              <TikTokIcon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">TikTok</h3>
              <p className="text-white/50 text-xs md:text-sm">@odgajivacnicaroyal</p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Booking Section */}
      <div id="zakazi" className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-2 md:mb-4">Rezervacija</p>
            <h2 className="text-4xl md:text-7xl font-serif mb-4 md:mb-8 leading-tight">Zakažite<br/>Termin.</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md">
              Spremni ste da istaknete vašu nekretninu? Popunite formu i odaberite željeni termin.
            </p>
            
            <div className="space-y-4 md:space-y-6 text-xs text-white/50">
              <div className="flex items-center gap-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]" />
                <p>Radno vreme: 08:00 - 18:00</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]" />
                <p>Lokacije: Beograd, Novi Sad, Zrenjanin, Pančevo</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#050505] border border-white/10 p-6 md:p-12"
          >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 md:py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-[#D4AF37] mb-6" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Zahtev Poslat</h3>
              <p className="text-white/60 text-sm md:text-base">
                Hvala vam na interesovanju. Kontaktiraćemo vas uskoro radi potvrde termina.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 md:mt-12 text-[#D4AF37] text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Pošalji novi zahtev
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Name */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Ime i Prezime</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                    placeholder="Petar Petrović"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                    placeholder="petar@primer.com"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Broj Telefona</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                  placeholder="+3816..."
                />
                {errors.phone && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.phone}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Odaberi grad */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Odaberi Grad</label>
                  <div className="relative">
                    <select 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full appearance-none bg-white/5 border border-white/10 px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="" disabled className="bg-black text-white/50">Izaberite grad...</option>
                      <option value="beograd" className="bg-black">Beograd</option>
                      <option value="novi-sad" className="bg-black">Novi Sad</option>
                      <option value="zrenjanin" className="bg-black">Zrenjanin</option>
                      <option value="pancevo" className="bg-black">Pančevo</option>
                      <option value="ostalo" className="bg-black">Ostalo</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Package Selection */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Izaberite Paket</label>
                  <div className="relative">
                    <select 
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-white/5 border ${errors.package ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                    >
                      <option value="" disabled className="bg-black text-white/50">Izaberite opciju...</option>
                      <option value="osnovni" className="bg-black">Osnovni Paket (od 100€)</option>
                      <option value="premium" className="bg-black">Premium Paket (od 250€)</option>
                      <option value="ekskluzivni" className="bg-black">Ekskluzivni Paket (od 450€)</option>
                      <option value="custom" className="bg-black">Prilagođena Ponuda</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" size={16} />
                  </div>
                  {errors.package && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.package}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Date */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Datum</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      className={`w-full bg-white/5 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]`}
                    />
                  </div>
                  {errors.date && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.date}</p>}
                </div>

                {/* Time - 24h format, jednostavan izbor */}
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Vreme (24h)</label>
                  <div className="relative">
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-white/5 border ${errors.time ? 'border-red-500/50' : 'border-white/10'} px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                    >
                      <option value="" disabled className="bg-black text-white/50">Izaberite vreme...</option>
                      {Array.from({ length: 20 }, (_, i) => {
                        const h = 8 + Math.floor(i / 2);
                        const m = (i % 2) * 30;
                        const val = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                        const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                        return <option key={val} value={val} className="bg-black">{label}</option>;
                      })}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" size={16} />
                  </div>
                  {errors.time && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> {errors.time}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Dodatne Informacije (Opciono)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Lokacija nekretnine..."
                />
              </div>

              {submitError && (
                <p className="text-red-400 text-[10px] flex items-center gap-2 mt-2">
                  <AlertCircle size={14} /> {submitError}
                </p>
              )}
              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] text-black py-3.5 md:py-4 text-xs md:text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300 mt-2 md:mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Šaljem...' : 'Potvrdi Rezervaciju'}
              </button>
            </form>
          )}
        </motion.div>

        </div>
      </div>
    </div>
  );
}
