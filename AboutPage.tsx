
'use client';

import React from 'react';
import { MapPin, Cpu, Lightbulb, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { deDict } from './dictionaries/de';
import { frDict } from './dictionaries/fr';

interface AboutPageProps {
  lang?: 'DE' | 'FR';
}

export default function AboutPage({ lang = 'DE' }: AboutPageProps) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.sections.about;

  return (
    <>
      <Navbar lang={lang} />
      
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-screen">
        
        {/* Hero Section */}
        <div className="mb-32 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-slate-200 dark:border-white/10">
            {dict.nav.about}
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            {t.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">{t.accent}</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-4xl border-l-4 border-blue-600 pl-8">
            {t.intro}
          </p>
        </div>

        {/* Vision Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
           <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative h-full p-12 rounded-[3rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col justify-center">
                 <Lightbulb size={64} className="text-blue-600 mb-8" strokeWidth={1} />
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.vision}</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-lg font-light leading-relaxed">
                   {t.visionDesc}
                 </p>
              </div>
           </div>
           
           <div className="space-y-8 flex flex-col justify-center">
              {t.values.map((val, i) => (
                <div key={i} className="flex gap-6 group">
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm shrink-0">
                      <span className="font-mono text-xl font-bold">0{i+1}</span>
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 font-light">{val.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Location / Tech Symbiosis */}
        <div className="relative rounded-[4rem] overflow-hidden bg-slate-900 border border-white/10 p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10 flex flex-col items-center gap-12">
               <div className="flex gap-8">
                  <div className="p-6 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                    <MapPin size={40} />
                  </div>
                   <div className="p-6 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                    <Cpu size={40} />
                  </div>
               </div>
               <div>
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t.location}</h2>
                 <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                   {t.locationDesc}
                 </p>
               </div>
            </div>
        </div>

      </main>
      <Footer lang={lang} />
    </>
  );
}