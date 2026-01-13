
'use client';

import React from 'react';
import { AlertTriangle, Layers, Zap, ArrowRight } from 'lucide-react';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';
import MagneticButton from './MagneticButton';

interface WhyUsSectionProps {
  lang?: 'DE' | 'FR';
}

export default function WhyUsSection({ lang = 'DE' }: WhyUsSectionProps) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.sections.whyUs;

  const icons = [AlertTriangle, Layers, Zap];
  const accentColors = [
    'text-amber-500 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 hover:bg-amber-500/10',
    'text-blue-500 border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 hover:bg-blue-500/10',
    'text-cyan-400 border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/40 hover:bg-cyan-400/10'
  ];

  const noiseBg = `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiAvPjwvc3ZnPg==")`;

  return (
    <section id="why-us" className="relative py-32 md:py-48 bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden scroll-mt-20 transition-colors duration-500">
      <div 
        className="absolute inset-0 opacity-0 dark:opacity-10 pointer-events-none transition-opacity duration-500" 
        style={{ backgroundImage: noiseBg }}
      />
      <div className="px-6 max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-24 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10 animate-fade-up">
                {t.badge}
              </div>
              <h2 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-black mb-10 tracking-tighter leading-[0.95] text-slate-900 dark:text-white">
                  {t.title} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t.accent}</span>
              </h2>
              <p className="animate-fade-up delay-200 text-lg md:text-3xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl mx-auto border-t border-slate-200 dark:border-white/10 pt-10">
                  {t.subtitle}
              </p>
          </div>

          {/* The 3 Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-fade-up delay-300 mb-24">
              {t.blocks.map((block: any, idx: number) => {
                  const Icon = icons[idx % icons.length];
                  const style = accentColors[idx % accentColors.length];
                  const [textColor] = style.split(' ');
                  
                  return (
                      <div key={idx} className={`group p-10 md:p-12 rounded-[2.5rem] bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${style}`}>
                          <div className="flex justify-between items-start mb-12">
                              <div className={`p-4 rounded-2xl border bg-slate-50 dark:bg-black/40 ${textColor} border-current border-opacity-20`}>
                                  <Icon size={32} strokeWidth={1.5} />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">0{idx + 1}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-6 tracking-tight min-h-[3rem] text-slate-900 dark:text-white">{block.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-12 text-base">
                              {block.text}
                          </p>

                          <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Tech-Core</span>
                              <span className={`text-[9px] font-black px-3 py-1.5 rounded-full border bg-white dark:bg-white/5 uppercase tracking-wide ${textColor.replace('text-', 'text-').replace('text-', 'border-').replace('text-', 'bg-').replace('500', '500/20').replace('400', '400/20')}`}>
                                  {block.usp}
                              </span>
                          </div>
                      </div>
                  );
              })}
          </div>

          {/* Final CTA Anchor */}
          <div className="animate-fade-up delay-400 flex justify-center">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <MagneticButton variant="primary" className="!px-12 !py-6 !text-sm !font-black !tracking-widest" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    {t.cta} <ArrowRight className="ml-2" size={18} />
                </MagneticButton>
            </div>
          </div>
      </div>
    </section>
  );
}
