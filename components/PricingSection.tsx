
'use client';

import React from 'react';
import { User, Building2, Check, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface PricingSectionProps {
  onOpenCalculator: (type: 'private' | 'business') => void;
  lang: 'DE' | 'FR';
}

const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCalculator, lang }) => {
  const content = {
    DE: {
      private: {
        title: 'Privatperson',
        subtitle: 'Steuererklärung',
        desc: 'Sorgenfreie Steueroptimierung für Privatpersonen – digital und pünktlich.',
        priceLabel: 'Einmalig ab',
        features: ['Optimale Steuerersparnis', 'Digitale Übermittlung', 'Persönlicher Review'],
        cta: 'Preis berechnen'
      },
      business: {
        title: 'Unternehmen',
        subtitle: 'KMU & Startups',
        desc: 'Ganzheitliche Buchhaltung & digitale Finanzprozesse für Ihr Wachstum.',
        priceLabel: 'Monatlich ab',
        features: ['Buchhaltung & Abschluss', 'Lohn & HR', 'IT & Automation'],
        cta: 'Preis berechnen',
        badge: 'Top-Wahl'
      }
    },
    FR: {
      private: {
        title: 'Particulier',
        subtitle: 'Impôts',
        desc: 'Optimisation fiscale sans souci pour particuliers – digital et ponctuel.',
        priceLabel: 'Dès (unique)',
        features: ['Économies maximales', 'Transmission digitale', 'Revue personnelle'],
        cta: 'Calculer le prix'
      },
      business: {
        title: 'Entreprise',
        subtitle: 'PME & Startups',
        desc: 'Comptabilité globale et processus financiers digitaux pour votre croissance.',
        priceLabel: 'Mensuel dès',
        features: ['Comptabilité & Bilan', 'RH', 'IT & Automation'],
        cta: 'Calculer le prix',
        badge: 'Populaire'
      }
    }
  }[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      {/* Private Card */}
      <div className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 shadow-xl hover:shadow-amber-500/5 flex flex-col h-full">
         <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner border border-amber-500/20">
                <User size={28}/>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.private.title}</h3>
               <p className="text-amber-500 font-bold uppercase text-xs tracking-widest">{content.private.subtitle}</p>
            </div>
         </div>
         
         <div className="mb-8 py-6 border-y border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{content.private.priceLabel}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">CHF 120.-</span>
            </div>
         </div>
         
         <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
            {content.private.desc}
         </p>

         <div className="space-y-4 mb-10 flex-grow">
            {content.private.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={16} className="text-amber-500" /> {feature}
                </div>
            ))}
         </div>

         <div className="mt-auto">
            <MagneticButton variant="outline" className="!w-full !py-4 group-hover:!border-amber-500 group-hover:!text-amber-500" onClick={() => onOpenCalculator('private')}>
                {content.private.cta}
            </MagneticButton>
         </div>
      </div>

      {/* Business Card */}
      <div className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-600/30 shadow-xl hover:shadow-blue-600/5 flex flex-col h-full">
         <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2.3rem]">
            {content.business.badge}
         </div>
         
         <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shadow-inner border border-blue-600/20">
                <Building2 size={28}/>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.business.title}</h3>
               <p className="text-blue-600 font-bold uppercase text-xs tracking-widest">{content.business.subtitle}</p>
            </div>
         </div>

         <div className="mb-8 py-6 border-y border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{content.business.priceLabel}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">CHF 129.-</span>
            </div>
         </div>
         
         <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
            {content.business.desc}
         </p>

         <div className="space-y-4 mb-10 flex-grow">
            {content.business.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={16} className="text-blue-600" /> {feature}
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
