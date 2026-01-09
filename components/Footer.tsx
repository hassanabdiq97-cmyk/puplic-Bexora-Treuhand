
'use client';

import React from 'react';
import Link from 'next/link';
import { TRANSLATIONS } from '../constants';

export default function Footer({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="py-20 bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <Link href="/impressum" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Datenschutz</Link>
          <button onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Jobs</button>
        </div>
        
        <div className="space-y-4">
          <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">
            {t.sections.contact.footer.copyright}
          </p>
          <a href="https://www.next-lab.tech/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">
               {t.sections.contact.footer.automatedBy}
             </span>
             <div className="flex items-center gap-2.5 bg-slate-100/50 dark:bg-white/5 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm group-hover:border-cyan-400/30 transition-all">
               <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
               <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-cyan-400 transition-colors">NextLab</span>
             </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
