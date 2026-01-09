
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronRight, Calculator } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang?: 'DE' | 'FR';
  onToggleLang?: () => void;
}

export default function Navbar({ lang = 'DE', onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-[110] top-0 transition-all duration-500 ${
        scrolled ? 'py-4 bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-xl' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Logo className="h-10 w-10 md:h-12 md:w-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {t.nav.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)} className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors uppercase tracking-widest">
                  {link.label}
                </button>
              ))}
              <MagneticButton variant="primary" className="!px-7 !py-3 !text-[11px]" onClick={() => scrollTo('#pricing')}>
                {lang === 'DE' ? 'PREISRECHNER' : 'DEVIS RAPIDE'}
              </MagneticButton>
              
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-6">
                 {onToggleLang && (
                  <button onClick={onToggleLang} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                    {lang === 'DE' ? 'FR' : 'DE'}
                  </button>
                 )}
                 <button 
                    onClick={() => setIsDark(!isDark)} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                 >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                 </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900 dark:text-white relative z-[120]">
              {isMenuOpen ? <X size={32} className="text-blue-500" /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[105] bg-white dark:bg-dark-950 md:hidden flex flex-col pt-28 px-6 pb-10 overflow-y-auto animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-6">
            {t.nav.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className="text-4xl font-black text-slate-900 dark:text-white flex items-center justify-between group tracking-tight">
                {link.label} <ChevronRight className="text-slate-200 dark:text-white/10 group-hover:text-blue-600 transition-colors" size={28} />
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-6 pt-12">
             <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
             
             {/* Mobile Preisrechner Button */}
             <MagneticButton variant="primary" className="!w-full !py-6 !text-sm !rounded-2xl shadow-xl shadow-blue-600/20" onClick={() => scrollTo('#pricing')}>
                <span className="flex items-center gap-3 font-bold tracking-wider"><Calculator size={20}/> {lang === 'DE' ? 'PREISRECHNER' : 'CALCULATEUR'}</span>
             </MagneticButton>

             <div className="flex gap-4 h-16">
                {/* Language Toggle (Sliding Switch) */}
                {onToggleLang && (
                  <div className="flex-1 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl flex relative overflow-hidden border border-slate-200 dark:border-white/5">
                     <div 
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-800 shadow-sm rounded-xl transition-all duration-300 ease-spring ${lang === 'DE' ? 'left-1.5' : 'left-[50%]'}`} 
                     />
                     <button 
                        onClick={() => lang !== 'DE' && onToggleLang()} 
                        className={`relative z-10 flex-1 flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${lang === 'DE' ? 'text-blue-600' : 'text-slate-400'}`}
                     >
                        DE
                     </button>
                     <button 
                        onClick={() => lang !== 'FR' && onToggleLang()} 
                        className={`relative z-10 flex-1 flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${lang === 'FR' ? 'text-blue-600' : 'text-slate-400'}`}
                     >
                        FR
                     </button>
                  </div>
                )}

                {/* Dark Mode Icon Button */}
                <button 
                   onClick={() => setIsDark(!isDark)} 
                   className="aspect-square h-full flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
                >
                   {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
