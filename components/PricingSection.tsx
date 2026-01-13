
'use client';

import React from 'react';
import { User, Building2, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

interface PricingSectionProps {
  onOpenCalculator: (type: 'private' | 'business') => void;
  lang: 'DE' | 'FR';
}

const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCalculator, lang }) => {
  const dict = lang === 'DE' ? deDict : frDict;
  const content = dict.sections.pricing;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      {/* Private Card */}
      <div className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 shadow-xl hover:shadow-amber-500/5 flex flex-col h-full" role="article" aria-label={dict.aria.pricingCardPrivate}>
         <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner border border-amber-500/20">
                <User size={28} aria-hidden="true"/>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.private.title}</h3>
               <p className="text-amber-500 font-bold uppercase text-xs tracking-widest">{content.private.subtitle}</p>
            </div>
         </div>
         
         <div className="mb-8 py-6 border-y border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-2 tracking-widest">{content.private.priceLabel}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">CHF 130.-</span>
            </div>
         </div>
         
         <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8">
            {content.private.desc}
         </p>

         <div className="space-y-4 mb-10 flex-grow">
            {content.private.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <Check size={16} className="text-amber-500" aria-hidden="true" /> {feature}
                </div>
            ))}
         </div>

         <div className="mt-auto">
            <MagneticButton 
                variant="primary" 
                className="!w-full !py-4 !bg-amber-500 hover:!bg-amber-400 !shadow-[0_10px_20px_-10px_rgba(245,158,11,0.4)] hover:!shadow-[0_20px_35px_-12px_rgba(245,158,11,0.6)]" 
                onClick={() => onOpenCalculator('private')}
            >
                {content.private.cta}
            </MagneticButton>
         </div>
      </div>

      {/* Business Card */}
      <div className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-600/30 shadow-xl hover:shadow-blue-600/5 flex flex-col h-full" role="article" aria-label={dict.aria.pricingCardBusiness}>
         
         <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shadow-inner border border-blue-600/20">
                <Building2 size={28} aria-hidden="true"/>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.business.title}</h3>
               <p className="text-blue-600 font-bold uppercase text-xs tracking-widest">{content.business.subtitle}</p>
            </div>
         </div>

         <div className="mb-8 py-6 border-y border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-2 tracking-widest">{content.business.priceLabel}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">CHF 129.-</span>
            </div>
         </div>
         
         <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8">
            {content.business.desc}
         </p>

         <div className="space-y-4 mb-10 flex-grow">
            {content.business.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <Check size={16} className="text-blue-600" aria-hidden="true" /> {feature}
                </div>
            ))}
         </div>

         <div className="mt-auto">
            <MagneticButton variant="primary" className="!w-full !py-4" onClick={() => onOpenCalculator('business')}>
                {content.business.cta}
            </MagneticButton>
         </div>
      </div>
    </div>
  );
};

export default PricingSection;
