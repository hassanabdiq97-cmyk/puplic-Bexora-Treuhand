
'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import { useSafeRouter } from '../utils/safeNavigation';

interface LegalNavigationProps {
  lang: 'DE' | 'FR';
  backLabel: string;
}

export default function LegalNavigation({ lang, backLabel }: LegalNavigationProps) {
  const router = useSafeRouter();
  const homeLink = lang === 'FR' ? '/fr' : '/';

  const toggleLanguage = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isPreview = typeof window !== 'undefined' && 
                      (window.location.hostname.includes('localhost') || 
                       !window.location.hostname.includes('bexora')); 

    if (isPreview) {
      if (lang === 'DE') {
        if (!currentPath.startsWith('/fr')) {
           router.push('/fr' + (currentPath === '/' ? '' : currentPath));
        }
      } else {
        const target = currentPath.replace(/^\/fr/, '') || '/';
        router.push(target);
      }
    } else {
      if (lang === 'DE') {
        window.location.href = `https://fr.bexora.ch${currentPath === '/' ? '' : currentPath}`;
      } else {
        window.location.href = `https://bexora.ch${currentPath}`;
      }
    }
  };

  return (
    <nav className="fixed w-full z-[110] top-0 py-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <SafeLink href={homeLink} className="flex items-center gap-3 cursor-pointer group">
          <Logo className="h-10 w-10 group-hover:scale-110 transition-transform duration-300 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
        </SafeLink>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
            >
                {lang === 'DE' ? 'FR' : 'DE'}
            </button>
            <MagneticButton variant="outline" className="!px-6 !py-2 !text-[10px] !border-slate-300 dark:!border-white/10" onClick={() => router.push(homeLink)}>
            <div className="flex items-center gap-2 text-slate-700 dark:text-white"><ArrowLeft size={14}/> {backLabel}</div>
            </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
