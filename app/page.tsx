'use client';

import React, { useState, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ServicesSection from '../components/ServicesSection';
import PricingSection from '../components/PricingSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import PricingCalculator from '../components/PricingCalculator';
import { TRANSLATIONS } from '../constants';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'DE' | 'FR'>('DE');
  
  // Zustand für den Preisrechner
  const [calculatorState, setCalculatorState] = useState<{isOpen: boolean, type?: 'private' | 'business'}>({
    isOpen: false,
    type: undefined
  });

  const t = TRANSLATIONS[currentLang];

  const openCalculator = (type: 'private' | 'business') => {
    setCalculatorState({ isOpen: true, type });
    // Verhindert Scrollen im Hintergrund wenn Modal offen ist
    document.body.style.overflow = 'hidden';
  };

  const closeCalculator = () => {
    setCalculatorState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  };

  const handleRequestQuote = () => {
    closeCalculator();
    // Smooth scroll zum Kontaktformular
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar lang={currentLang} onToggleLang={() => setCurrentLang(prev => prev === 'DE' ? 'FR' : 'DE')} />
      
      <Hero lang={currentLang} onOpenCalculator={openCalculator} />
      
      <TrustBar lang={currentLang} />
      
      <ServicesSection lang={currentLang} onOpenCalculator={openCalculator} />
      
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-slate-900/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.sections.pricing.title}</h2>
             <p className="text-slate-600 dark:text-slate-400 font-light">{t.sections.pricing.desc}</p>
          </div>
          <PricingSection onOpenCalculator={openCalculator} lang={currentLang} />
        </div>
      </section>
      
      <section id="careers" className="py-32 bg-white dark:bg-dark-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <CareersSection t={t} onApplyClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
      </section>
      
      <ContactSection lang={currentLang} />

      {/* Lazy Loading für schwere Komponenten wie den Rechner */}
      <Suspense fallback={null}>
        {calculatorState.isOpen && calculatorState.type && (
          <PricingCalculator 
            initialType={calculatorState.type} 
            onClose={closeCalculator} 
            onRequestQuote={handleRequestQuote} 
            lang={currentLang} 
          />
        )}
      </Suspense>
    </>
  );
}