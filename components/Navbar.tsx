
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import { useSafeRouter, useSafePathname } from '../utils/safeNavigation';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

interface NavbarProps {
  lang?: 'DE' | 'FR';
  onToggleLang?: () => void;
}

export default function Navbar({ lang = 'DE', onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  // Use Safe Hooks
  const router = useSafeRouter();
  const pathname = useSafePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isPreview = typeof window !== 'undefined' && 
                      (window.location.hostname.includes('localhost') || 
                       !window.location.hostname.includes('bexora')); 

    if (isPreview) {
      // Preview Mode (Path Prefix Logic)
      if (lang === 'DE') {
        // Switch to FR: Prepend /fr if not present
        if (!currentPath.startsWith('/fr')) {
           const target = '/fr' + (currentPath === '/' ? '' : currentPath);
           router.push(target);
        }
      } else {
        // Switch to DE: Remove /fr prefix
        const target = currentPath.replace(/^\/fr/, '') || '/';
        router.push(target);
      }
    } else {
      // Production Mode (Subdomain Logic)
      // Preserves the path suffix (e.g. /impressum) while switching domain
      // NOTE: middleware handles the internal rewrite on fr.bexora.ch
      if (lang === 'DE') {
        window.location.href = `https://fr.bexora.ch${currentPath === '/' ? '' : currentPath}`;
      } else {
        window.location.href = `https://bexora.ch${currentPath}`;
      }
    }
    
    onToggleLang?.();
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const isMainPage = pathname === '/' || pathname === '/fr' || pathname === '/fr/' || pathname === '';
    
    if (isMainPage) {
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Navigate home then scroll
        const homePath = lang === 'FR' ? '/fr' : '/';
        router.push(homePath);
        // Simple timeout to allow navigation to happen before scrolling
        // In a real Next.js app, using hash links with Link component is better, but this handles the mixed SPA/Multi-page setup
        setTimeout(() => {
             const target = document.querySelector(id);
             if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
  };

  const dict = lang === 'DE' ? deDict : frDict;

  return (
    <>
      <nav className={`fixed w-full z-[110] top-0 transition-all duration-500 ${
        scrolled ? 'py-4 bg-white/90 dark:bg-dark-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-lg' : 'py-6 md:py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo Navigation */}
            <SafeLink 
              href={lang === 'FR' ? '/fr' : '/'}
              className="flex items-center gap-3 group cursor-pointer py-2"
              aria-label={dict.aria.logoLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo className="h-10 w-10 md:h-12 md:w-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" aria-hidden={true} />
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
            </SafeLink>

            <div className="hidden lg:flex items-center space-x-8">
              {['whyUs', 'about', 'services', 'careers', 'contact'].map((key) => (
                <button 
                  key={key}
                  onClick={() => scrollTo(`#${key === 'whyUs' ? 'why-us' : key}`)} 
                  className="text-[10px] font-black text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors uppercase tracking-widest py-2"
                >
                  {dict.nav[key as keyof typeof dict.nav]}
                </button>
              ))}

              <MagneticButton variant="primary" className="!px-6 !py-3 !text-[11px]" onClick={() => scrollTo('#pricing')}>
                {dict.nav.calculator}
              </MagneticButton>
              
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-6">
                 {/* Increased touch target size for desktop/tablet users too */}
                 <button 
                  onClick={toggleLanguage} 
                  aria-label={dict.aria.toggleLang}
                  className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300"
                 >
                    {lang === 'DE' ? 'FR' : 'DE'}
                 </button>
                 <button 
                    onClick={() => setIsDark(!isDark)} 
                    aria-label={dict.aria.toggleTheme}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                 >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                 </button>
              </div>
            </div>

            {/* Mobile Menu Button - Large Touch Target */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label={isMenuOpen ? dict.aria.closeMenu : dict.aria.openMenu}
              className="lg:hidden p-3 -mr-3 text-slate-900 dark:text-white relative z-[120]"
            >
              {isMenuOpen ? <X size={32} className="text-blue-500" /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[105] bg-white dark:bg-dark-950 lg:hidden flex flex-col pt-32 px-6 pb-12 overflow-y-auto animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-2">
            {[
              { id: '#why-us', label: dict.nav.whyUs },
              { id: '#about', label: dict.nav.about },
              { id: '#services', label: dict.nav.services },
              { id: '#careers', label: dict.nav.careers },
              { id: '#contact', label: dict.nav.contact }
            ].map((item, idx) => (
              <React.Fragment key={item.id}>
                <button 
                  onClick={() => scrollTo(item.id)} 
                  className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between group tracking-tight py-4"
                >
                  {item.label} <ChevronRight className="text-slate-200 dark:text-white/10 group-hover:text-blue-600 transition-colors" size={24} />
                </button>
                {idx === 1 && <div className="h-px w-full bg-slate-100 dark:bg-white/5 my-2" />}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-auto space-y-8 pt-12">
             <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
             
             <MagneticButton variant="primary" className="!w-full !py-6 !text-sm !rounded-2xl shadow-xl shadow-blue-600/20" onClick={() => scrollTo('#pricing')}>
                <span className="font-bold tracking-wider">{dict.nav.calculator}</span>
             </MagneticButton>

             <div className="flex gap-4 h-16">
                  <div className="flex-1 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl flex relative overflow-hidden border border-slate-200 dark:border-white/5">
                     <div 
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-800 shadow-sm rounded-xl transition-all duration-300 ease-spring ${lang === 'DE' ? 'left-1.5' : 'left-[50%]'}`} 
                     />
                     <button 
                        onClick={toggleLanguage} 
                        className={`relative z-10 flex-1 flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${lang === 'DE' ? 'text-blue-600' : 'text-slate-400'}`}
                     >
                        DE
                     </button>
                     <button 
                        onClick={toggleLanguage} 
                        className={`relative z-10 flex-1 flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${lang === 'FR' ? 'text-blue-600' : 'text-slate-400'}`}
                     >
                        FR
                     </button>
                  </div>

                <button 
                   onClick={() => setIsDark(!isDark)} 
                   aria-label={dict.aria.toggleTheme}
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
