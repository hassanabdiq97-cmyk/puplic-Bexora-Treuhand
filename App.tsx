
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Sun, Moon, Menu, X, MapPin, Phone, Mail, Clock, 
  BarChart3, Users, Cpu, User, TrendingUp, Sparkles, Heart, GraduationCap,
  ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MagneticButton from './components/MagneticButton';
import CustomCursor from './components/CustomCursor';
import PricingSection from './components/PricingSection';
import PricingCalculator from './components/PricingCalculator'; 
import ThreeBackground from './components/ThreeBackground'; 
import { TRANSLATIONS } from './constants';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'DE' | 'FR'>('DE');
  const [calculatorState, setCalculatorState] = useState<{isOpen: boolean, type: 'private' | 'business'}>({
    isOpen: false,
    type: 'business'
  });

  const t = TRANSLATIONS[currentLang];
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.animate-hero', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.1, ease: 'power4.out', clearProps: 'all' }
      );

      gsap.utils.toArray('.animate-up').forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: elem, start: 'top 92%', toggleActions: 'play none none none' }
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, [currentLang]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setTimeout(() => ScrollTrigger.refresh(), 800);
    }
  };

  const openCalculator = (type: 'private' | 'business' = 'business') => {
    setCalculatorState({ isOpen: true, type });
    document.body.style.overflow = 'hidden';
  };

  const closeCalculator = () => {
    setCalculatorState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  };

  return (
    <div ref={mainRef} className="relative min-h-screen bg-white dark:bg-dark-950 font-sans transition-colors duration-700 selection:bg-blue-600/30">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
        scrolled ? 'py-4 bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-xl' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">B</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {t.nav.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors uppercase tracking-widest">{link.label}</a>
              ))}
              <MagneticButton variant="primary" className="!px-7 !py-3 !text-[11px] !bg-blue-600 !text-white !font-black !uppercase !tracking-widest" onClick={() => openCalculator('business')}>
                {currentLang === 'DE' ? 'PREISE BERECHNEN' : 'CALCULATEUR'}
              </MagneticButton>
              <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-transform hover:scale-110">{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                <button onClick={() => setCurrentLang('DE')} className={`px-2.5 py-1 rounded-lg text-[9px] font-black transition-all ${currentLang === 'DE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>DE</button>
                <button onClick={() => setCurrentLang('FR')} className={`px-2.5 py-1 rounded-lg text-[9px] font-black transition-all ${currentLang === 'FR' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>FR</button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 dark:text-white p-2">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        <ThreeBackground />
        <div className="relative z-20 px-6 max-w-6xl mx-auto text-center">
          <div className="animate-hero inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-500 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">{t.hero.badge}</div>
          
          <h1 className="animate-hero text-7xl md:text-[9rem] font-black tracking-tightest mb-8 text-slate-900 dark:text-white leading-[0.9]">
            {t.hero.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600">{t.hero.titleAccent}</span>
          </h1>

          <div className="animate-hero max-w-2xl mx-auto mb-16 px-6">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              {t.hero.desc}
            </p>
          </div>

          <div className="animate-hero flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton variant="primary" className="!px-10 !py-5 !text-[12px] !font-black !uppercase !tracking-widest" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>{t.hero.ctaPrimary}</MagneticButton>
            <MagneticButton variant="outline" className="!px-10 !py-5 !text-[12px] !font-black !uppercase !tracking-widest !bg-transparent !border-slate-200 dark:!border-white/10" onClick={() => openCalculator('business')}>{t.hero.ctaSecondary}</MagneticButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-24 animate-up">
             <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
               {t.sections.services.title.split(t.sections.services.accent)[0]}
               <span className="text-blue-600">{t.sections.services.accent}</span>.
             </h2>
             <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">{t.sections.services.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.services.map((service: any) => (
              <div key={service.id} className="animate-up flex flex-col h-full group">
                <div className={`flex-grow p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-500 shadow-xl flex flex-col items-center text-center ${
                  service.color === 'blue' ? 'border-blue-600/10 hover:border-blue-600 hover:shadow-blue-600/5' :
                  service.color === 'purple' ? 'border-purple-500/10 hover:border-purple-500 hover:shadow-purple-500/5' :
                  service.color === 'amber' ? 'border-amber-500/10 hover:border-amber-500 hover:shadow-amber-500/5' :
                  'border-cyan-400/10 hover:border-cyan-400 hover:shadow-cyan-400/5'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 shadow-lg ${
                    service.color === 'blue' ? 'bg-blue-600 text-white' :
                    service.color === 'purple' ? 'bg-purple-500 text-white' :
                    service.color === 'amber' ? 'bg-amber-500 text-white' :
                    'bg-cyan-400 text-slate-950'
                  }`}>
                    <service.icon size={26} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed font-light">{service.description}</p>
                  
                  <div className="w-full mt-auto space-y-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {service.details.slice(0, 3).map((detail: string, idx: number) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-white/5 text-slate-500 font-bold uppercase tracking-widest">{detail}</span>
                      ))}
                    </div>
                    <MagneticButton variant="outline" className="!w-full !py-3 !text-[9px] !rounded-xl group-hover:!bg-blue-600 group-hover:!text-white group-hover:!border-blue-600" onClick={() => openCalculator(service.color === 'amber' ? 'private' : 'business')}>
                      {t.sections.services.cta}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative z-20 bg-slate-50 dark:bg-slate-900/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-up">
             <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.sections.pricing.title}</h2>
             <p className="text-slate-600 dark:text-slate-400 font-light">{t.sections.pricing.desc}</p>
          </div>
          <div className="animate-up">
             <PricingSection onOpenCalculator={openCalculator} lang={currentLang} />
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-32 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-10 animate-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">{t.sections.careers.badge}</div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
                {t.sections.careers.title} <br/> <span className="text-blue-600">{t.sections.careers.accent}</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">{t.sections.careers.desc}</p>
              <div className="space-y-6 pt-6">
                {t.sections.careers.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"><benefit.icon size={20} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{benefit.title}</h4>
                      <p className="text-xs text-slate-500">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6 animate-up">
              {[{ title: 'Mandatsleiter/in Treuhand', pensum: '80-100%', location: 'Solothurn' }, { title: 'Sachbearbeiter/in Finanzen', pensum: '60-100%', location: 'Lengnau' }].map((job, i) => (
                <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-600/30 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-wider">
                        <span className="flex items-center gap-2"><Clock size={14}/> {job.pensum}</span>
                        <span className="flex items-center gap-2"><MapPin size={14}/> {job.location}</span>
                      </div>
                    </div>
                    <MagneticButton variant="outline" className="!px-8 !py-3 !text-[10px] group-hover:!bg-blue-600 group-hover:!text-white">Details</MagneticButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-24">
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-blue-600 text-white flex flex-col">
             <h2 className="text-5xl font-black mb-10 tracking-tighter">Kontaktieren Sie uns.</h2>
             <div className="space-y-10 mt-auto">
               <div className="flex items-center gap-6"><Phone size={24}/><p className="text-xl font-black">+41 32 123 45 67</p></div>
               <div className="flex items-center gap-6"><Mail size={24}/><p className="text-xl font-black">info@bexora.ch</p></div>
               <div className="flex items-center gap-6"><MapPin size={24}/><p className="text-xl font-medium">Solothurnstrasse 12, 2543 Lengnau</p></div>
             </div>
          </div>
          <div className="lg:w-1/2 p-12 lg:p-20 bg-slate-950 flex flex-col">
             <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light" />
                <input type="email" placeholder="E-Mail" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light" />
                <textarea placeholder="Nachricht" rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light resize-none"></textarea>
                <button className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-xl">Anfrage absenden</button>
             </form>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 mt-20 font-bold uppercase tracking-widest">© 2024 BEXORA TREUHAND AG</p>
      </section>

      {calculatorState.isOpen && <PricingCalculator initialType={calculatorState.type} onClose={closeCalculator} lang={currentLang} />}
    </div>
  );
}

export default App;
