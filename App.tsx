
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, Menu, X, CheckCircle, 
  MapPin, Phone, Mail, Globe, ChevronRight, ArrowRight,
  Calendar, MessageSquare, Clock, Check,
  Briefcase, Calculator, Cpu, Megaphone,
  TrendingDown, ShieldCheck, 
  Smartphone, Zap, Lock, Bell, TrendingUp,
  FileText, Shield, BarChart3, Target, Receipt
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MagneticButton from './components/MagneticButton';
import CustomCursor from './components/CustomCursor';
import PricingSection from './components/PricingSection';
import PricingCalculator from './components/PricingCalculator'; 
import ServiceCard from './components/ServiceCard';
import ThreeBackground from './components/ThreeBackground'; 
import { TRANSLATIONS, PARTNERS } from './constants';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'DE' | 'FR'>('DE');
  const [contactMode, setContactMode] = useState<'message' | 'calendar'>('message');
  const [calculatorState, setCalculatorState] = useState<{isOpen: boolean, type: 'private' | 'business'}>({
    isOpen: false,
    type: 'business'
  });

  const t = TRANSLATIONS[currentLang];
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-up').forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: elem, start: 'top 90%' }
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, [currentLang]);

  const openCalculator = (type: 'private' | 'business' = 'business') => {
    setCalculatorState({ isOpen: true, type });
    document.body.style.overflow = 'hidden';
  };

  const closeCalculator = () => {
    setCalculatorState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  };

  const handleNavAction = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-full p-1 border border-slate-200 dark:border-slate-700/50">
      <button 
        onClick={() => setCurrentLang('DE')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${currentLang === 'DE' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
      >
        DE
      </button>
      <button 
        onClick={() => setCurrentLang('FR')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${currentLang === 'FR' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
      >
        FR
      </button>
    </div>
  );

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-dark-950 font-sans transition-colors duration-1000">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-500 bg-white/70 dark:bg-dark-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                B
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Bexora</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {t.nav.map((link) => (
                <button 
                  key={link.label} 
                  onClick={(e) => handleNavAction(e, link.href)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
              
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <MagneticButton variant="primary" className="!px-6 !py-2.5 !text-[11px]" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'})}>
                {currentLang === 'DE' ? 'Preisrechner' : 'Calculateur'}
              </MagneticButton>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-800 dark:text-slate-200">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-950 border-b border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {t.nav.map((link) => (
                <button 
                  key={link.label} 
                  onClick={(e) => handleNavAction(e, link.href)}
                  className="text-lg font-bold text-left text-slate-900 dark:text-white"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <LanguageSwitcher />
                <button onClick={() => setIsDark(!isDark)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              <MagneticButton variant="primary" className="w-full" onClick={() => { setIsMenuOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'}); }}>
                {currentLang === 'DE' ? 'Preisrechner' : 'Calculateur'}
              </MagneticButton>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <ThreeBackground />
        <div className="relative z-10 px-6 max-w-5xl mx-auto text-center">
          <div className="animate-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/5 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8 border border-blue-200/50 dark:border-blue-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            {t.hero.badge}
          </div>
          <h1 className="animate-up text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-slate-900 dark:text-white leading-[0.95] lg:leading-[0.9]">
            {t.hero.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x bg-[length:200%_auto]">{t.hero.titleAccent}</span>
          </h1>
          <p className="animate-up text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {t.hero.desc}
          </p>
          <div className="animate-up flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
              {t.hero.ctaPrimary}
            </MagneticButton>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'})}
              className="px-8 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* USP / Bento Grid Look - REDESIGNED FOR PLIABLE VALUE */}
      <section id="about" className="py-32 relative z-20">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)]">
               
               {/* RADICAL TRANSPARENCY (Main - Large) */}
               <div className="animate-up md:col-span-4 md:row-span-2 rounded-[3rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative shadow-2xl shadow-slate-200/50 dark:shadow-black/20">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/[0.05] to-transparent pointer-events-none"></div>
                  <div className="relative z-10 max-w-xl">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-10 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                       <BarChart3 size={32} />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
                      {t.sections.about.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-light">
                      {t.sections.about.desc}
                    </p>
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-16 flex items-center gap-3 text-blue-600 font-bold text-xs tracking-widest uppercase hover:gap-5 transition-all group/btn">
                    {t.sections.about.cta} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
               
               {/* EXPERT SECURITY (Side - Tall) */}
               <div className="animate-up md:col-span-2 md:row-span-3 rounded-[3rem] bg-slate-950 border border-slate-800 p-12 flex flex-col group relative overflow-hidden shadow-2xl">
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-blue-400 mb-10 border border-white/10 group-hover:rotate-[360deg] transition-transform duration-1000">
                       <Shield size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 tracking-tight leading-none">{t.sections.about.vaultTitle}</h3>
                    <p className="text-slate-400 text-base leading-relaxed font-light mb-10">
                      {t.sections.about.vaultDesc}
                    </p>
                    <div className="mt-auto space-y-4">
                       <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-white/5 pb-4">
                          <CheckCircle size={14} className="text-blue-500" /> AES-256 Verschlüsselung
                       </div>
                       <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-white/5 pb-4">
                          <CheckCircle size={14} className="text-blue-500" /> Swiss-Zertifizierte Server
                       </div>
                       <div className="flex items-center gap-3 text-xs text-slate-500">
                          <CheckCircle size={14} className="text-blue-500" /> Konform nach DSGVO/DSG
                       </div>
                    </div>
                  </div>
               </div>

               {/* COST OPTIMIZATION (Bottom - Wide) */}
               <div className="animate-up md:col-span-4 md:row-span-1 rounded-[3rem] bg-blue-600 border border-blue-500 p-12 flex flex-col md:flex-row items-center gap-10 group relative overflow-hidden shadow-2xl shadow-blue-900/40">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                     <Target size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{t.sections.about.optimizationTitle}</h3>
                    <p className="text-blue-50 text-base leading-relaxed font-light opacity-90">
                      {t.sections.about.optimizationDesc}
                    </p>
                  </div>
               </div>

               {/* Metric Cards (Floating below) */}
               <div className="animate-up md:col-span-2 rounded-[2.5rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-lg">
                  <div className="text-4xl font-black text-blue-600 mb-1">100%</div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revisionssicherheit</p>
               </div>
               <div className="animate-up md:col-span-2 rounded-[2.5rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-lg">
                  <div className="text-4xl font-black text-blue-600 mb-1">CHF 0</div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Versteckte Gebühren</p>
               </div>
               <div className="animate-up md:col-span-2 rounded-[2.5rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-lg">
                  <div className="text-4xl font-black text-blue-600 mb-1">24h</div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Maximale Antwortzeit</p>
               </div>

            </div>
         </div>
      </section>

      {/* Leistungen */}
      <section id="services" className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 animate-up">
             <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
               {t.sections.services.title.split(t.sections.services.accent)[0]}
               <span className="text-blue-600">{t.sections.services.accent}</span>.
             </h2>
             <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
               {t.sections.services.desc}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service: any) => (
              <div key={service.id} className="animate-up h-full">
                <div className="h-full p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-blue-500/30 transition-all shadow-xl group">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/5 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <service.icon size={32} />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold dark:text-white">{service.title}</h3>
                      {service.label && (
                        <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-[9px] font-black uppercase tracking-widest">
                          {service.label}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 font-light leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {service.details.map((detail: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                          <div className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 animate-up p-12 rounded-[4rem] bg-blue-600 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-white text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-2">Massgeschneiderte Beratung?</h3>
              <p className="text-blue-100 font-light">Lassen Sie uns gemeinsam die ideale Strategie für Ihr KMU entwickeln.</p>
            </div>
            <MagneticButton variant="outline" className="!bg-white !text-blue-600 !border-white !px-12" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Analyse starten
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Preise & Auswahl */}
      <section id="pricing" className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-up text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">{t.sections.pricing.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">{t.sections.pricing.desc}</p>
          </div>
          <PricingSection onOpenCalculator={openCalculator} lang={currentLang} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 relative z-20 bg-slate-100/30 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-up">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">{t.sections.blog.title}</h2>
            <p className="text-xl text-slate-500 font-light max-w-xl mx-auto">{t.sections.blog.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.blog.map((post: any) => (
              <div key={post.id} className="animate-up group cursor-pointer">
                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    {post.category}
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-400 mb-3">{post.date}</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Weiterlesen <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Karriere Section - Original Clean Look */}
      <section id="career" className="py-32 relative z-20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center animate-up">
            <h2 className="text-4xl font-black mb-12 dark:text-white">{currentLang === 'DE' ? 'Werde Teil von Bexora' : 'Rejoindre Bexora'}</h2>
            <div className="p-16 rounded-[4rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-2xl">
               <div className="w-20 h-20 mx-auto bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-600 mb-10">
                  <Briefcase size={40} />
               </div>
               <p className="text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                 {currentLang === 'DE' ? 'Wir suchen immer nach Talenten, die Treuhand neu denken wollen. Entdecke unsere Vision und finde deinen Platz.' : 'Nous cherchons toujours des talents voulant repenser la fiduciaire. Découvrez notre vision.'}
               </p>
               <MagneticButton variant="outline" className="!px-12">{currentLang === 'DE' ? 'Offene Stellen ansehen' : 'Voir les postes'}</MagneticButton>
            </div>
         </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white dark:bg-slate-900/30 transition-colors duration-1000">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 animate-up">
               <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">{t.sections.team.title}</h2>
               <p className="text-lg text-slate-500 font-light max-w-xl mx-auto">
                 {t.sections.team.desc}
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
               {[
                 { name: "Thomas Wyss", role: "CEO & Strategie", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400", desc: currentLang === 'DE' ? "Verbindet Vision mit präziser Umsetzung." : "Relie la vision à une mise en œuvre précise." },
                 { name: "Sarah Müller", role: "Treuhand Expertin", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400", desc: currentLang === 'DE' ? "Expertin für komplexe Steuer-Architekturen." : "Experte en architectures fiscales complexes." },
                 { name: "David Keller", role: "IT & Automation", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400", desc: currentLang === 'DE' ? "Baut die Brücken in die digitale Zukunft." : "Bâtit les ponts vers le futur numérique." },
                 { name: "Elena Rossi", role: "Kundenberatung", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400", desc: currentLang === 'DE' ? "Ihre Stimme und erste Anlaufstelle bei uns." : "Votre voix et premier point de contact." }
               ].map((m, i) => (
                 <div key={i} className="animate-up group">
                    <div className="aspect-square overflow-hidden rounded-[2.5rem] mb-8 relative shadow-xl">
                       <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{m.name}</h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{m.role}</p>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">{m.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Kontakt */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto relative z-20">
        <div className="bg-white dark:bg-slate-900/50 rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-blue-600 text-white flex flex-col">
             <h2 className="text-5xl font-black mb-10 leading-none">Bereit für den nächsten Schritt?</h2>
             <p className="text-blue-100 text-xl mb-16 font-light leading-relaxed">
               {currentLang === 'DE' ? 'Lassen Sie uns Ihre Situation unverbindlich analysieren. Wir garantieren Ihnen eine Antwort innerhalb von 24 Stunden.' : 'Analysons votre situation sans engagement. Réponse garantie sous 24h.'}
             </p>
             <div className="space-y-10 mt-auto">
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><Phone size={24}/></div>
                 <p className="text-xl font-medium">+41 32 123 45 67</p>
               </div>
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><Mail size={24}/></div>
                 <p className="text-xl font-medium">info@bexora.ch</p>
               </div>
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><MapPin size={24}/></div>
                 <p className="text-xl font-medium">Solothurnstrasse 44, 2543 Lengnau</p>
               </div>
             </div>
          </div>
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col">
            <div className="flex gap-4 mb-16">
               <button onClick={() => setContactMode('message')} className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${contactMode === 'message' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                 {currentLang === 'DE' ? 'Nachricht' : 'Message'}
               </button>
               <button onClick={() => setContactMode('calendar')} className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${contactMode === 'calendar' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                 {currentLang === 'DE' ? 'Kalender' : 'Calendrier'}
               </button>
            </div>
            {contactMode === 'message' ? (
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="relative">
                  <input type="text" placeholder={currentLang === 'DE' ? 'Name' : 'Nom'} className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 focus:border-blue-500 outline-none transition-colors text-xl font-light" />
                </div>
                <div className="relative">
                  <input type="email" placeholder="E-Mail" className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 focus:border-blue-500 outline-none transition-colors text-xl font-light" />
                </div>
                <div className="relative">
                  <textarea rows={4} placeholder={currentLang === 'DE' ? 'Ihre Herausforderung' : 'Votre défi'} className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 focus:border-blue-500 outline-none transition-colors text-xl font-light resize-none"></textarea>
                </div>
                <MagneticButton className="w-full mt-10 !py-5" variant="primary">{currentLang === 'DE' ? 'Anfrage absenden' : 'Envoyer la demande'}</MagneticButton>
              </form>
            ) : (
              <div className="flex flex-col h-full animate-in fade-in duration-500">
                <h3 className="text-2xl font-bold mb-10">{currentLang === 'DE' ? 'Wählen Sie Ihren Slot.' : 'Choisissez votre créneau.'}</h3>
                <div className="p-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center text-slate-400">
                   <Calendar size={48} className="mx-auto mb-4 opacity-20" />
                  {currentLang === 'DE' ? 'Kalender-API wird geladen...' : 'Chargement du calendrier...'}
                </div>
                <p className="mt-auto text-sm text-slate-400 text-center italic font-light">Initiales Audit: 30 Min via Microsoft Teams.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black py-24 px-6 border-t border-slate-200 dark:border-slate-900 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-4xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">Bexora</h3>
            <p className="text-slate-500 text-base font-light max-w-xs text-center md:text-left">Einfachheit ist die höchste Stufe der Vollendung.</p>
          </div>
          <div className="flex flex-col items-center gap-10">
            <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-slate-500">
              <button className="hover:text-blue-600 transition-colors">Impressum</button>
              <button className="hover:text-blue-600 transition-colors">Datenschutz</button>
              <button className="hover:text-blue-600 transition-colors">AGB</button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-widest text-center">
              © {new Date().getFullYear()} BEXORA TREUHAND AG — <span className="text-blue-600">powered by NextLab</span>
            </p>
          </div>
        </div>
      </footer>

      {calculatorState.isOpen && (
        <PricingCalculator 
          initialType={calculatorState.type} 
          onClose={closeCalculator}
          lang={currentLang}
        />
      )}
    </div>
  );
}

export default App;
