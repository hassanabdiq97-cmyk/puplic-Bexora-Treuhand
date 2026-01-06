
import React from 'react';
import { User, Building2, Check, ArrowRight } from 'lucide-react';

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
        features: ['Buchhaltung & Abschluss', 'Lohn & HR optional', 'IT & Automation inklusive'],
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
        features: ['Comptabilité & Bilan', 'RH en option', 'IT & Automation inclus'],
        cta: 'Calculer le prix',
        badge: 'Populaire'
      }
    }
  }[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      {/* PRIVATE */}
      <div className="group relative p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border-2 border-slate-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-600/30">
         <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-blue-600"><User size={28}/></div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{content.private.title}</h3>
               <p className="text-blue-600 text-xs font-black uppercase tracking-widest">{content.private.subtitle}</p>
            </div>
         </div>
         <p className="text-slate-500 dark:text-slate-400 mb-10 font-light leading-relaxed">{content.private.desc}</p>
         <div className="mb-10 text-center py-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{content.private.priceLabel}</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">150.- <span className="text-sm font-bold text-slate-400">CHF</span></p>
         </div>
         <ul className="space-y-4 mb-10">
            {content.private.features.map((f, i) => (
               <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check size={14} className="text-blue-600" /> {f}
               </li>
            ))}
         </ul>
         <button onClick={() => onOpenCalculator('private')} className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
            {content.private.cta} <ArrowRight size={18}/>
         </button>
      </div>

      {/* BUSINESS */}
      <div className="group relative p-10 rounded-[3rem] bg-slate-900 border-2 border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-600/50 shadow-2xl">
         <div className="absolute top-8 right-8 bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/30">{content.business.badge}</div>
         <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-600"><Building2 size={28}/></div>
            <div>
               <h3 className="text-2xl font-black text-white tracking-tight">{content.business.title}</h3>
               <p className="text-blue-600 text-xs font-black uppercase tracking-widest">{content.business.subtitle}</p>
            </div>
         </div>
         <p className="text-slate-400 mb-10 font-light leading-relaxed">{content.business.desc}</p>
         <div className="mb-10 text-center py-8 bg-white/5 rounded-3xl border border-white/5">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{content.business.priceLabel}</p>
            <p className="text-4xl font-black text-white">79.- <span className="text-sm font-bold text-slate-500">CHF</span></p>
         </div>
         <ul className="space-y-4 mb-10">
            {content.business.features.map((f, i) => (
               <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check size={14} className="text-blue-600" /> {f}
               </li>
            ))}
         </ul>
         <button onClick={() => onOpenCalculator('business')} className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
            {content.business.cta} <ArrowRight size={18}/>
         </button>
      </div>
    </div>
  );
};

export default PricingSection;
