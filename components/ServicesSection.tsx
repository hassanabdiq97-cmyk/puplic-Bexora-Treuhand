
'use client';

import React from 'react';
import MagneticButton from './MagneticButton';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';
import { BarChart3, Users, Cpu, User } from 'lucide-react';

export default function ServicesSection({ 
  lang = 'DE', 
  onOpenCalculator 
}: { 
  lang?: 'DE' | 'FR',
  onOpenCalculator: (type: 'private' | 'business') => void
}) {
  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.sections.services;
  
  const iconMap: any = {
    1: BarChart3,
    2: Users,
    3: Cpu,
    4: User
  };

  return (
    <section id="services" className="py-32 md:py-48 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 md:mb-32 max-w-4xl mx-auto">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10">
              {dict.nav.services}
           </div>
           <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
             {t.title.split(t.accent)[0]}
             <span className="text-blue-600">{t.accent}</span>.
           </h2>
           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">{t.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {dict.servicesList.map((service: any, index: number) => {
            const Icon = iconMap[service.id];
            // Staggered delay logic
            const delayClass = index === 0 ? '' : index === 1 ? 'md:delay-100' : index === 2 ? 'md:delay-200' : 'md:delay-300';
            
            return (
              <div key={service.id} className={`flex flex-col h-full group animate-fade-up ${delayClass}`}>
                <div className={`flex-grow p-10 md:p-14 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-500 shadow-xl flex flex-col items-center text-center ${
                  service.color === 'blue' ? 'border-blue-600/10 hover:border-blue-600' :
                  service.color === 'purple' ? 'border-purple-500/10 hover:border-purple-500' :
                  service.color === 'amber' ? 'border-amber-500/10 hover:border-amber-500' :
                  'border-cyan-400/10 hover:border-cyan-400'
                }`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 shadow-lg ${
                    service.color === 'blue' ? 'bg-blue-600 text-white' :
                    service.color === 'purple' ? 'bg-purple-500 text-white' :
                    service.color === 'amber' ? 'bg-amber-500 text-white' :
                    'bg-cyan-400 text-slate-950'
                  }`}>
                    {Icon && <Icon size={32} aria-hidden="true" strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-10 text-base leading-relaxed font-light">{service.description}</p>
                  <div className="w-full mt-auto space-y-8">
                    <div className="flex flex-wrap justify-center gap-3">
                      {service.details.map((detail: string, idx: number) => (
                        <span key={idx} className="text-[9px] px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-200 font-bold uppercase tracking-widest">{detail}</span>
                      ))}
                    </div>
                    {/* Explicit minimum height for touch area */}
                    <MagneticButton variant="outline" className="!w-full !py-5 !min-h-[56px] !text-[10px] !rounded-2xl group-hover:!bg-slate-900 dark:group-hover:!bg-white group-hover:!text-white dark:group-hover:!text-slate-900 group-hover:!border-transparent" onClick={() => onOpenCalculator(service.color === 'amber' ? 'private' : 'business')}>
                      {t.cta}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}