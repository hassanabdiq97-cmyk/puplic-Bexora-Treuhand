
'use client';

import React, { Suspense } from 'react';
import MagneticButton from './MagneticButton';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

const ThreeBackground = React.lazy(() => import('./ThreeBackground'));

export default function Hero({ 
  lang = 'DE', 
  onOpenCalculator 
}: { 
  lang?: 'DE' | 'FR',
  onOpenCalculator: (type: 'private' | 'business') => void
}) {
  const t = lang === 'DE' ? deDict.hero : frDict.hero;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 md:pt-32 md:pb-20 overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-slate-50 dark:bg-dark-950" />}>
        <ThreeBackground />
      </Suspense>
      
      <div className="relative z-20 px-6 max-w-6xl mx-auto text-center w-full">
        {/* Animated Badge */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-8 md:mb-12 border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
            {t.badge}
          </div>
        </div>
        
        {/* Animated Title */}
        <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest mb-6 md:mb-8 text-slate-900 dark:text-white leading-[0.95] drop-shadow-sm break-words hyphens-auto">
          {t.title} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600">
            {t.accent}
          </span>
        </h1>

        {/* Animated Description */}
        <div className="animate-fade-up delay-200 max-w-2xl mx-auto mb-12 md:mb-16 px-2 md:px-6">
          <p className="text-base sm:text-lg md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-light">
            {t.desc}
          </p>
        </div>

        {/* Animated CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
          <MagneticButton variant="primary" className="!w-full sm:!w-auto !px-8 md:!px-10 !py-4 md:!py-5 !text-[11px] md:!text-[12px]" onClick={() => scrollToSection('contact')}>
            {t.ctaPrimary}
          </MagneticButton>
          <MagneticButton variant="outline" className="!w-full sm:!w-auto !px-8 md:!px-10 !py-4 md:!py-5 !text-[11px] md:!text-[12px] !bg-transparent" onClick={() => scrollToSection('pricing')}>
            {t.ctaSecondary}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
