
'use client';

import React from 'react';
import SafeLink from './SafeLink';
import { useSafeRouter, useSafePathname } from '../utils/safeNavigation';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

export default function Footer({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.footer;
  const router = useSafeRouter();
  const pathname = useSafePathname();

  const scrollTo = (id: string) => {
    const isMainPage = pathname === '/' || pathname === '/fr' || pathname === '/fr/' || pathname === '';
    if (isMainPage) {
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        const homePath = lang === 'FR' ? '/fr' : '/';
        router.push(homePath);
        setTimeout(() => {
             const target = document.querySelector(id);
             if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
  };

  return (
    <footer className="py-16 bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-white/5 relative z-30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        
        <div className="flex flex-col gap-2 order-2 md:order-1">
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest">
            {t.copyright}
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-4 order-1 md:order-2">
           <button 
            onClick={() => scrollTo('#why-us')}
            className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          >
            {dict.nav.whyUs}
          </button>
           <button 
            onClick={() => scrollTo('#about')}
            className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          >
            {dict.nav.about}
          </button>
          
          <SafeLink 
            href={lang === 'FR' ? '/fr/impressum' : '/impressum'}
            className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          >
            Impressum
          </SafeLink>
          
          <SafeLink 
            href={lang === 'FR' ? '/fr/datenschutz' : '/datenschutz'}
            className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          >
            Datenschutz
          </SafeLink>
        </div>

        <div className="flex items-center gap-1.5 order-3 opacity-80 hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500">
             {t.automatedBy}
           </span>
           <a 
             href="https://www.next-lab.tech/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-[10px] font-black text-slate-900 dark:text-white hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
           >
             NextLab
           </a>
        </div>
      </div>
    </footer>
  );
}
