
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';
import { Loader2 } from 'lucide-react';

// --- PERFORMANCE OPTIMIZATION: DYNAMIC IMPORTS ---
// Load everything below the fold dynamically.
// This splits the JS bundle, so the browser only downloads the Hero section initially.
const TrustBar = dynamic(() => import('./TrustBar'), { ssr: true });
const WhyUsSection = dynamic(() => import('./WhyUsSection'), { ssr: true });
const AboutSection = dynamic(() => import('./AboutSection'), { ssr: true });
const ServicesSection = dynamic(() => import('./ServicesSection'), { ssr: true });
const PricingSection = dynamic(() => import('./PricingSection'), { ssr: true });
const CareersSection = dynamic(() => import('./CareersSection'), { ssr: true });
const ContactSection = dynamic(() => import('./ContactSection'), { ssr: true });

// PricingCalculator is heavy and interactive-only, strictly client-side
const PricingCalculator = dynamic(() => import('./PricingCalculator'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[120] bg-slate-50/95 dark:bg-[#020617]/95 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  )
});

interface ClientHomeLogicProps {
  lang?: 'DE' | 'FR';
}

export default function ClientHomeLogic({ lang = 'DE' }: ClientHomeLogicProps) {
  const dict = lang === 'DE' ? deDict : frDict;
  
  const [calculatorState, setCalculatorState] = useState<{isOpen: boolean, type?: 'private' | 'business'}>({
    isOpen: false,
    type: undefined
  });

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
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar lang={lang} />
      
      <main>
        {/* Hero is critical, loaded normally */}
        <Hero lang={lang} onOpenCalculator={openCalculator} />
        
        {/* All subsequent sections are chunked */}
        <TrustBar lang={lang} />
        
        <WhyUsSection lang={lang} />
        
        <AboutSection lang={lang} />
        
        <ServicesSection lang={lang} onOpenCalculator={openCalculator} />
        
        <section id="pricing" className="min-h-screen flex flex-col items-center justify-center py-20 md:py-32 bg-slate-50 dark:bg-dark-950/50 scroll-mt-24">
           <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10">
                    {dict.nav.calculator}
                 </div>
                 {/* Optimized Header for Mobile: reduced size, added break-words */}
                 <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter break-words hyphens-auto leading-tight">
                   {dict.sections.pricing.title} <br className="hidden md:block" />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                     {dict.sections.pricing.accent}
                   </span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                    {dict.sections.pricing.desc}
                 </p>
              </div>
              <PricingSection onOpenCalculator={openCalculator} lang={lang} />
           </div>
        </section>

        <section id="careers" className="min-h-screen flex flex-col items-center justify-center py-20 md:py-32 bg-white dark:bg-dark-950 scroll-mt-24">
           <div className="max-w-7xl mx-auto px-6 w-full">
             <CareersSection onApplyClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} lang={lang} />
           </div>
        </section>
        
        <ContactSection lang={lang} />
      </main>
      
      <Footer lang={lang} />

      {calculatorState.isOpen && calculatorState.type && (
        <PricingCalculator 
          initialType={calculatorState.type} 
          onClose={closeCalculator}
          onRequestQuote={handleRequestQuote}
          lang={lang}
        />
      )}
    </>
  );
}
