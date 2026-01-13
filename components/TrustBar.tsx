
'use client';

import React from 'react';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

const partners = ["NextLab", "bexio", "Abacus", "Dr. Tax", "Microsoft 365"];

export default function TrustBar({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const dict = lang === 'DE' ? deDict : frDict;
  
  return (
    <div className="relative z-20 w-full py-12 bg-white/50 dark:bg-dark-950/50 border-y border-slate-200/50 dark:border-white/5 overflow-hidden group">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
          {dict.trust.title}
        </p>
      </div>
      <div className="flex overflow-hidden relative user-select-none">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 animate-scroll items-center gap-24 min-w-full justify-around pr-24">
            {partners.concat(partners).map((name, idx) => (
              <span key={idx} className={`text-3xl md:text-4xl font-black transition-all duration-300 cursor-default tracking-tighter hover:scale-105 whitespace-nowrap ${name === 'NextLab' ? 'text-slate-900 dark:text-slate-300 opacity-30 hover:opacity-100 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-slate-900 dark:text-slate-400 opacity-40 hover:opacity-100'}`}>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}