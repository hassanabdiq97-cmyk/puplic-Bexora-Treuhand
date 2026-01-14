
'use client';

import React from 'react';
import { Lightbulb, MapPin, Cpu } from 'lucide-react';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

interface AboutSectionProps {
  lang?: 'DE' | 'FR';
}

export default function AboutSection({ lang = 'DE' }: AboutSectionProps) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.sections.about;
  
  // Inlined Noise SVG
  const noiseBg = `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiAvPjwvc3ZnPg==")`;

  return (
    <section id="about" className="py-20 md:py-48 px-6 bg-slate-50 dark:bg-dark-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro */}
        <div className="mb-24 md:mb-32 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 md:mb-12 border border-slate-200 dark:border-white/10">
            {dict.nav.about}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-12 tracking-tighter text-slate-900 dark:text-white leading-[0.95] md:leading-[0.9]">
            {t.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">{t.accent}</span>
          </h2>
          <p className="text-lg md:text-3xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-4xl border-l-4 border-blue-600 pl-6 md:pl-8">
            {t.intro}
          </p>
        </div>

        {/* Vision Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 md:mb-40">
           <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2.5rem] md:rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative h-full p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col justify-center">
                 <Lightbulb size={48} md:size={64} className="text-blue-600 mb-6 md:mb-8" strokeWidth={1} />
                 <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.vision}</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed">
                   {t.visionDesc}
                 </p>
              </div>
           </div>
           
           <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
              {t.values.map((val, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm shrink-0">
                      <span className="font-mono text-lg md:text-xl font-bold">0{i+1}</span>
                   </div>
                   <div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">{val.title}</h4>
                      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-light">{val.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Location / Tech Symbiosis */}
        <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-slate-900 border border-white/10 p-8 md:p-24 text-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: noiseBg }} />
            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12">
               <div className="flex gap-4 md:gap-8">
                  <div className="p-4 md:p-6 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                    <MapPin size={32} md:size={40} />
                  </div>
                   <div className="p-4 md:p-6 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                    <Cpu size={32} md:size={40} />
                  </div>
               </div>
               <div>
                 <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">{t.location}</h2>
                 <p className="text-base md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                   {t.locationDesc}
                 </p>
               </div>
            </div>
        </div>

      </div>
    </section>
  );
}
