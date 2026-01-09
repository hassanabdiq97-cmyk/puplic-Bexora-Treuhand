
'use client';

import React from 'react';
import ThreeBackground from './ThreeBackground';
import MagneticButton from './MagneticButton';
import { TRANSLATIONS } from '../constants';

export default function Hero({ 
  lang = 'DE', 
  onOpenCalculator 
}: { 
  lang?: 'DE' | 'FR',
  onOpenCalculator: (type: 'private' | 'business') => void
}) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <ThreeBackground />
      <div className="relative z-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-500 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
          {t.hero.badge}
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest mb-8 text-slate-900 dark:text-white leading-[0.95]">
          {t.hero.title} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600">
            {t.hero.titleAccent}
          </span>
        </h1>

        <div className="max-w-2xl mx-auto mb-16 px-6">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {t.hero.desc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <MagneticButton variant="primary" className="!px-10 !py-5 !text-[12px]" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
            {t.hero.ctaPrimary}
          </MagneticButton>
          <MagneticButton variant="outline" className="!px-10 !py-5 !text-[12px] !bg-transparent" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'})}>
            {t.hero.ctaSecondary}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
