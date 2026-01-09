
import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
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
import ThreeBackground from './components/ThreeBackground'; 
import CareersSection from './components/CareersSection';
import { TRANSLATIONS } from './constants';

// Lazy Load PricingCalculator to improve initial load performance
const PricingCalculator = React.lazy(() => import('./components/PricingCalculator'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'DE' | 'FR'>('DE');
  const [calculatorState, setCalculatorState] = useState<{isOpen: boolean, type?: 'private' | 'business'}>({
    isOpen: false,
    type: undefined
  });

  // Kontaktformular State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | null, id: string) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setTimeout(() => ScrollTrigger.refresh(), 800);
    }
  };

  const openCalculator = (type: 'private' | 'business') => {
    setCalculatorState({ isOpen: true, type });
    document.body.style.overflow = 'hidden';
  };

  const closeCalculator = () => {
    setCalculatorState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  };

  const handleRequestQuote = () => {
    closeCalculator();
    // Kleine Verzögerung damit der Modal-Close-Effekt wirken kann, dann scrollen
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    
    // Betreff und Body für die E-Mail zusammenbauen
    const subject = `Anfrage via Webseite: ${name}`;
    const body = `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`;
    
    // Mailto-Link erstellen und öffnen
    window.location.href = `mailto:info@bexora.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const partners = ["NextLab", "bexio", "Abacus", "Dr. Tax", "Microsoft 365"];

  return (
    <div ref={mainRef} className="relative min-h-screen bg-white dark:bg-dark-950 font-sans transition-colors duration-700 selection:bg-blue-600/30 text-slate-900 dark:text-slate-100 pb-20 md:pb-0">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
        scrolled ? 'py-4 bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-xl' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img src="logo.png" alt="Bexora Logo" className="h-12 w-auto object-contain group-hover:scale-110 transition-transform drop-shadow-sm" />
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {t.nav.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors uppercase tracking-widest">{link.label}</a>
              ))}
              <MagneticButton variant="primary" className="!px-7 !py-3 !text-[11px] !bg-blue-600 !text-white !font-black !uppercase !tracking-widest" onClick={(e) => scrollToSection(e, '#pricing')}>
                {currentLang === 'DE' ? 'PREISRECHNER' : 'DEVIS RAPIDE'}
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
          
          <h1 className="animate-hero text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest mb-8 text-slate-900 dark:text-white leading-[0.95]">
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
            <MagneticButton variant="outline" className="!px-10 !py-5 !text-[12px] !font-black !uppercase !tracking-widest !bg-transparent !border-slate-200 dark:!border-white/10" onClick={(e) => scrollToSection(e, '#pricing')}>{t.hero.ctaSecondary}</MagneticButton>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="relative z-20 w-full py-12 bg-white/50 dark:bg-dark-950/50 border-y border-slate-200/50 dark:border-white/5 overflow-hidden group">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
            {currentLang === 'DE' ? 'UNSERE DIGITALEN PARTNER' : 'NOS PARTENAIRES DIGITAUX'}
          </p>
        </div>
        <div className="flex overflow-hidden relative">
          <div className="flex gap-24 items-center animate-scroll whitespace-nowrap px-12 min-w-full">
            {partners.concat(partners).map((name, i) => (
              <span 
                key={i} 
                className={`text-3xl md:text-4xl font-black transition-all duration-300 cursor-default tracking-tighter hover:scale-105 
                  ${name === 'NextLab' 
                    ? 'text-slate-900 dark:text-slate-300 opacity-30 hover:opacity-100 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
                    : 'text-slate-900 dark:text-slate-400 opacity-40 hover:opacity-100'
                  }`}
              >
                {name}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-dark-950 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-dark-950 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-32 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24 animate-up">
             <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
               {t.sections.services.title.split(t.sections.services.accent)[0]}
               <span className="text-blue-600">{t.sections.services.accent}</span>.
             </h2>
             <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">{t.sections.services.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {t.services.map((service: any) => (
              <div key={service.id} className="animate-up flex flex-col h-full group">
                <div className={`flex-grow p-10 md:p-14 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-500 shadow-xl flex flex-col items-center text-center ${
                  service.color === 'blue' ? 'border-blue-600/10 hover:border-blue-600' :
                  service.color === 'purple' ? 'border-purple-500/10 hover:border-purple-500' :
                  service.color === 'amber' ? 'border-amber-500/10 hover:border-amber-500' :
                  'border-cyan-400/10 hover:border-cyan-400'
                }`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all group-hover:scale-110 shadow-lg ${
                    service.color === 'blue' ? 'bg-blue-600 text-white' :
                    service.color === 'purple' ? 'bg-purple-500 text-white' :
                    service.color === 'amber' ? 'bg-amber-500 text-white' :
                    'bg-cyan-400 text-slate-950'
                  }`}>
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-10 text-base leading-relaxed font-light">{service.description}</p>
                  <div className="w-full mt-auto space-y-6">
                    <div className="flex flex-wrap justify-center gap-3">
                      {service.details.map((detail: string, idx: number) => (
                        <span key={idx} className="text-[10px] px-3 py-1 rounded-lg bg-slate-200 dark:bg-white/5 text-slate-500 font-bold uppercase tracking-widest">{detail}</span>
                      ))}
                    </div>
                    <MagneticButton variant="outline" className="!w-full !py-4 !text-[10px] !rounded-2xl group-hover:!bg-blue-600 group-hover:!text-white group-hover:!border-blue-600" onClick={() => openCalculator(service.color === 'amber' ? 'private' : 'business')}>
                      {t.sections.services.cta}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
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

      {/* Careers */}
      <section id="careers" className="py-32 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <CareersSection t={t} onApplyClick={() => scrollToSection(null, '#contact')} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-24">
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-blue-600 text-white flex flex-col">
             <h2 className="text-5xl font-black mb-10 tracking-tighter">{t.sections.contact.title}</h2>
             <div className="space-y-10 mt-auto">
               <div className="flex items-center gap-6"><Phone size={24}/><p className="text-xl font-black">+41 32 123 45 67</p></div>
               <div className="flex items-center gap-6"><Mail size={24}/><p className="text-xl font-black">info@bexora.ch</p></div>
               <div className="flex items-center gap-6"><MapPin size={24}/><p className="text-xl font-medium">{t.sections.contact.info.address}</p></div>
             </div>
          </div>
          <div className="lg:w-1/2 p-12 lg:p-20 bg-slate-950 flex flex-col">
             <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">{t.sections.contact.form.name}</label>
                  <input 
                    id="name" 
                    type="text" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder={t.sections.contact.form.name} 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light"
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{t.sections.contact.form.email}</label>
                  <input 
                    id="email" 
                    type="email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder={t.sections.contact.form.email} 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">{t.sections.contact.form.message}</label>
                  <textarea 
                    id="message" 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder={t.sections.contact.form.message} 
                    rows={4} 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light resize-none"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-xl">
                  {t.sections.contact.form.btn}
                </button>
             </form>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-8 animate-up">
          <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">{t.sections.contact.footer.copyright}</p>
          <a href="https://www.next-lab.tech/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group transition-all duration-500">
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">{t.sections.contact.footer.automatedBy}</span>
             <div className="flex items-center gap-2.5 bg-slate-100/50 dark:bg-white/5 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm group-hover:border-cyan-400/30 group-hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.2)] transition-all">
               <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
               <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-cyan-400 transition-colors">NextLab</span>
             </div>
          </a>
        </div>
      </section>
      
      {/* Sticky Mobile Action Bar - Visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-[90] bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 flex gap-4">
        <a href="tel:+41321234567" className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
           <Phone size={18} className="text-blue-600" /> Anrufen
        </a>
        <a href="mailto:info@bexora.ch" className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20 font-black text-xs uppercase tracking-widest">
           <Mail size={18} /> E-Mail
        </a>
      </div>

      {/* Suspense wrapper for lazy loading the calculator */}
      <Suspense fallback={null}>
        {calculatorState.isOpen && calculatorState.type && <PricingCalculator initialType={calculatorState.type} onClose={closeCalculator} onRequestQuote={handleRequestQuote} lang={currentLang} />}
      </Suspense>
    </div>
  );
}

export default App;
