
'use client';

import React from 'react';
import { TRANSLATIONS } from '../constants';
import MagneticButton from './MagneticButton';

export default function ServicesSection({ 
  lang = 'DE', 
  onOpenCalculator 
}: { 
  lang?: 'DE' | 'FR',
  onOpenCalculator: (type: 'private' | 'business') => void
}) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="py-32 relative z-20 bg-white dark:bg-dark-950 scroll-mt-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
           <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
             {t.sections.services.title.split(t.sections.services.accent)[0]}
             <span className="text-blue-600">{t.sections.services.accent}</span>.
           </h2>
           <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">{t.sections.services.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {t.services.map((service: any) => (
            <div key={service.id} className="flex flex-col h-full group">
              <div className={`flex-grow p-10 md:p-14 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-500 shadow-xl flex flex-col items-center text-center ${
                service.color === 'blue' ? 'border-blue-600/10 hover:border-blue-600' :
                service.color === 'purple' ? 'border-purple-500/10 hover:border-purple-500' :
                service.color === 'amber' ? 'border-amber-500/10 hover:border-amber-500' :
                'border-cyan-400/10 hover:border-cyan-400'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all group-hover:scale-110 shadow-lg ${
                  service.color === 'blue' ? 'bg-blue-600 text-white' :
                  service.color === 'purple' ? 'bg-purple-500 text-white' :
                  service.color === 'amber' ? 'bg-amber-500 text-white' :
                  'bg-cyan-400 text-slate-950'
                }`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-10 text-base leading-relaxed font-light">{service.description}</p>
                <div className="w-full mt-auto space-y-6">
                  <div className="flex flex-wrap justify-center gap-3">
                    {service.details.map((detail: string, idx: number) => (
                      <span key={idx} className="text-[10px] px-3 py-1 rounded-lg bg-slate-200 dark:bg-white/5 text-slate-500 font-bold uppercase tracking-widest">{detail}</span>
                    ))}
                  </div>
                  <MagneticButton variant="outline" className="!w-full !py-4 !text-[10px] !rounded-2xl group-hover:!bg-blue-600 group-hover:!text-white group-hover:!border-blue-600" onClick={() => onOpenCalculator(service.color === 'amber' ? 'private' : 'business')}>
                    {t.sections.services.cta}
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
