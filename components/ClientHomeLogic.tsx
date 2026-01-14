
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustBar from './TrustBar';
import ServicesSection from './ServicesSection';
import PricingSection from './PricingSection';
import CareersSection from './CareersSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import WhyUsSection from './WhyUsSection';
import AboutSection from './AboutSection';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';
import { Loader2 } from 'lucide-react';

// Dynamic import for heavy calculator component
// This removes it from the initial bundle (saving ~KB) and loads it only when needed
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
        <Hero lang={lang} onOpenCalculator={openCalculator} />
        
        <TrustBar lang={lang} />
        
        <WhyUsSection lang={lang} />
        
        <AboutSection lang={lang} />
        
        <ServicesSection lang={lang} onOpenCalculator={openCalculator} />
        
        <section id="pricing" className="py-32 md:py-48 bg-slate-50 dark:bg-dark-950/50 scroll-mt-24">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-24 max-w-4xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10">
                    {dict.nav.calculator}
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
                   {dict.sections.pricing.title}
                 </h2>
                 <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                    {dict.sections.pricing.desc}
                 </p>
              </div>
              <PricingSection onOpenCalculator={openCalculator} lang={lang} />
           </div>
        </section>

        <section id="careers" className="py-32 md:py-48 bg-white dark:bg-dark-950 scroll-mt-24">
           <div className="max-w-7xl mx-auto px-6">
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
