
'use client';

import React from 'react';
import { AlertTriangle, Layers, Zap, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MagneticButton from './components/MagneticButton';
import { deDict } from './dictionaries/de';
import { frDict } from './dictionaries/fr';

interface WhyUsPageProps {
  lang?: 'DE' | 'FR';
}

export default function WhyUsPage({ lang = 'DE' }: WhyUsPageProps) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.sections.whyUs;

  const navigateToContact = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'home' } }));
    setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const icons = [AlertTriangle, Layers, Zap];
  const accentColors = [
    'text-amber-500 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50', // Loss Aversion (Red/Amber)
    'text-blue-500 border-blue-500/20 bg-blue-500/5 hover:border-blue-500/50',   // Complexity (Blue)
    'text-cyan-400 border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/50'    // Tech (Cyan)
  ];

  // Inlined Noise SVG
  const noiseBg = `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiAvPjwvc3ZnPg==")`;

  return (
    <>
      <Navbar lang={lang} />
      
      <main className="pt-32 min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">
        
        {/* Ticker Strip */}
        <div className="w-full bg-blue-100/50 dark:bg-blue-900/10 border-y border-blue-600/10 py-3 overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-12 items-center mx-6 opacity-60">
                         {t.proof.map((item: string, j: number) => (
                             <span key={j} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                 {item}
                             </span>
                         ))}
                    </div>
                ))}
            </div>
        </div>

        <div className="px-6 max-w-7xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="text-center mb-32 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                    {t.title} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t.accent}</span>
                </h1>
                <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl mx-auto border-t border-slate-200 dark:border-white/10 pt-8 mt-8">
                    {t.subtitle}
                </p>
            </div>

            {/* The 3 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                {t.blocks.map((block: any, idx: number) => {
                    const Icon = icons[idx % icons.length];
                    const style = accentColors[idx % accentColors.length];
                    const [textColor] = style.split(' ');
                    
                    return (
                        <div key={idx} className={`group p-10 rounded-[2.5rem] bg-white dark:bg-transparent border border-slate-200 dark:border-transparent backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${style}`}>
                            <div className="flex justify-between items-start mb-12">
                                <div className={`p-4 rounded-2xl border bg-slate-50 dark:bg-black/20 ${textColor} border-current border-opacity-20`}>
                                    <Icon size={32} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50 text-slate-500 dark:text-slate-400">0{idx + 1}</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-6 tracking-tight min-h-[3rem] text-slate-900 dark:text-white">{block.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 text-base">
                                {block.text}
                            </p>

                            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Tech-Stack</span>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border bg-white dark:bg-white/5 uppercase tracking-wide ${textColor.replace('text-', 'text-').replace('text-', 'border-').replace('text-', 'bg-').replace('500', '500/20').replace('400', '400/20')}`}>
                                    {block.usp}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA Section */}
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:to-black p-12 md:p-24 text-center">
                 <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: noiseBg }} />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                 
                 <div className="relative z-10">
                     <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight max-w-4xl mx-auto">
                        {t.cta}
                     </h2>
                     <MagneticButton variant="primary" className="!px-12 !py-6 !text-sm" onClick={navigateToContact}>
                        {dict.common.send} <ArrowRight className="ml-2" size={20} />
                     </MagneticButton>
                 </div>
            </div>

        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
