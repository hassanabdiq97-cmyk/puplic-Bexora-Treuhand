
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
        desc: 'Wir erledigen Ihre Steuererklärung – korrekt, pünktlich und stressfrei.',
        priceLabel: 'Komplettpreis ab',
        priceDetail: 'einmalig, alles inklusive',
        features: ['Alle Formulare & Beilagen', 'Steueroptimierung inklusive', 'Persönliche Durchsicht'],
        cta: 'Preis berechnen'
      },
      business: {
        title: 'Unternehmen',
        subtitle: 'KMU & Selbstständige',
        desc: 'Buchhaltung, Löhne, Steuern – alles aus einer Hand, monatlich planbar.',
        priceLabel: 'Monatlich ab',
        priceDetail: 'keine versteckten Kosten',
        features: ['Buchhaltung & Abschluss', 'Lohnbuchhaltung optional', 'IT & Automation optional'],
        cta: 'Preis berechnen',
        badge: 'Beliebt'
      }
    },
    FR: {
      private: {
        title: 'Particulier',
        subtitle: 'Déclaration d\'impôts',
        desc: 'Nous gérons votre déclaration – correcte, ponctuelle et sans stress.',
        priceLabel: 'Forfait dès',
        priceDetail: 'une fois, tout compris',
        features: ['Tous les formulaires', 'Optimisation incluse', 'Révision personnelle'],
        cta: 'Calculer le prix'
      },
      business: {
        title: 'Entreprise',
        subtitle: 'PME & Indépendants',
        desc: 'Comptabilité, salaires, impôts – le tout d\'une seule main, planifiable.',
        priceLabel: 'Mensuel dès',
        priceDetail: 'aucun coût caché',
        features: ['Comptabilité & Bilan', 'Salaires en option', 'IT & Automation en option'],
        cta: 'Calculer le prix',
        badge: 'Populaire'
      }
    }
  }[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-[2.5rem] group transition-all duration-500 hover:-translate-y-2 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/30 hover:border-cyan-500/30 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-cyan-500/10">
         <div className="p-10 flex flex-col h-full relative z-10">
             <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-slate-800/50 border border-cyan-100 dark:border-slate-700 shadow-inner">
                    <User size={32} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{content.private.title}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wide">{content.private.subtitle}</p>
                </div>
             </div>
             <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed font-light">{content.private.desc}</p>
             <div className="bg-slate-50 dark:bg-slate-950/40 rounded-3xl p-8 text-center mb-10 border border-slate-100 dark:border-slate-800 group-hover:border-cyan-500/20 transition-colors">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest font-bold">{content.private.priceLabel}</p>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">150.-</span>
                    <span className="text-xl text-slate-500 font-medium">CHF</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">{content.private.priceDetail}</p>
             </div>
             <ul className="space-y-5 mb-10 flex-grow">
                {content.private.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20"><Check size={14} strokeWidth={3} /></div>
                        <span className="font-light">{item}</span>
                    </li>
                ))}
             </ul>
             <button onClick={() => onOpenCalculator('private')} className="w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group/btn bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 dark:shadow-cyan-900/40 hover:shadow-cyan-500/30">
                {content.private.cta} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
             </button>
         </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] group transition-all duration-500 hover:-translate-y-2 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/50 shadow-xl shadow-slate-200/50 dark:shadow-black/30 hover:shadow-blue-500/20">
         <div className="absolute top-6 right-6 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/30 z-20">{content.business.badge}</div>
         <div className="p-10 flex flex-col h-full relative z-10">
             <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 shadow-inner">
                    <Building2 size={32} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{content.business.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium tracking-wide">{content.business.subtitle}</p>
                </div>
             </div>
             <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed font-light">{content.business.desc}</p>
             <div className="bg-slate-50 dark:bg-slate-950/40 rounded-3xl p-8 text-center mb-10 border border-slate-100 dark:border-slate-800 group-hover:border-blue-500/20 transition-colors">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest font-bold">{content.business.priceLabel}</p>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">79.-</span>
                    <span className="text-xl text-slate-500 font-medium">CHF</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">{content.business.priceDetail}</p>
             </div>
             <ul className="space-y-5 mb-10 flex-grow">
                {content.business.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20"><Check size={14} strokeWidth={3} /></div>
                        <span className="font-light">{item}</span>
                    </li>
                ))}
             </ul>
             <button onClick={() => onOpenCalculator('business')} className="w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group/btn bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 dark:shadow-blue-900/40 hover:shadow-blue-500/40">
                {content.business.cta} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
             </button>
         </div>
      </div>
    </div>
  );
};

export default PricingSection;
