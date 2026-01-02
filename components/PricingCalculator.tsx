
import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Check, Briefcase, Users, Shield, Minus, Plus, 
  ClipboardList, Cloud, Headphones, Search, 
  User, Home, GraduationCap, Building2, FileText, Key, Wallet,
  Send, Printer, MessageCircle, TrendingUp, Lock, ArrowLeft, Info
} from 'lucide-react';
import { gsap } from 'gsap';

interface PricingCalculatorProps {
  initialType: 'private' | 'business';
  onClose: () => void;
  onRequestQuote?: () => void;
  lang: 'DE' | 'FR';
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ initialType, onClose, onRequestQuote, lang }) => {
  
  // GLOBAL STATE
  const [clientType, setClientType] = useState<'private' | 'business'>(initialType);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [showEpostInfo, setShowEpostInfo] = useState(false);

  // --- TRANSLATIONS ---
  const t = {
    DE: {
      title: 'Ihr Fixpreis in 60 Sekunden',
      subtitle: 'Transparent. Bindungsfrei. Schweizer Qualität.',
      back: 'Zurück',
      business: 'Firmen',
      private: 'Privat',
      progress: 'Ihr Fortschritt',
      blocks: 'Blöcke aktiv',
      summaryTitle: 'Ihre Gesamtofferte',
      monthly: 'Monatlicher Fixpreis',
      oneTime: 'Einmalig',
      setup: 'Setup / Audit',
      cta: 'Offerte anfordern',
      legalNotice: 'Unverbindlich - Kostenlos - In 24h Antwort',
      security: 'SSL-verschlüsselt & DSGVO-konform',
      finance: {
        title: 'Finanzbuchhaltung & Steuern',
        desc: 'Rechtsform, MWST & Abschluss.',
        legalForm: 'Ihre Rechtsform',
        package: 'Buchungs-Paket',
        vat: 'MWST-Abrechnung',
        interval: 'Abschluss-Intervall',
        standard: 'Standard',
        popular: 'Beliebt',
        intervalStandard: 'Jährlicher Abschluss',
        intervalPremium: 'Quartals-Abschluss'
      },
      payroll: {
        title: 'Lohn & Personal',
        desc: 'Lohnbuchhaltung & HR-Services.',
        employees: 'Anzahl Mitarbeitende',
        base: 'Basis Lohnbuchhaltung',
        full: 'Personal-Admin Fullservice'
      }
    },
    FR: {
      title: 'Votre prix fixe en 60s',
      subtitle: 'Transparent. Sans engagement. Qualité suisse.',
      back: 'Retour',
      business: 'Entreprises',
      private: 'Privé',
      progress: 'Votre progression',
      blocks: 'Blocs actifs',
      summaryTitle: 'Votre offre totale',
      monthly: 'Prix fixe mensuel',
      oneTime: 'Unique',
      setup: 'Setup / Audit',
      cta: 'Demander une offre',
      legalNotice: 'Sans engagement - Gratuit - Réponse sous 24h',
      security: 'Chiffré SSL & Conforme RGPD',
      finance: {
        title: 'Comptabilité & Impôts',
        desc: 'Forme juridique, TVA & Clôture.',
        legalForm: 'Forme juridique',
        package: 'Forfait d\'écriture',
        vat: 'Décompte TVA',
        interval: 'Intervalle de clôture',
        standard: 'Standard',
        popular: 'Populaire',
        intervalStandard: 'Clôture annuelle',
        intervalPremium: 'Clôture trimestrielle'
      },
      payroll: {
        title: 'Salaires & RH',
        desc: 'Gestion des salaires & services RH.',
        employees: 'Nombre d\'employés',
        base: 'Gestion de base',
        full: 'Fullservice RH'
      }
    }
  }[lang];

  // --- STATE: BUSINESS ---
  const [activeBlocks, setActiveBlocks] = useState({
    finance: true,
    payroll: false,
    it: false
  });

  const [financeOptions, setFinanceOptions] = useState({
    legalForm: 'gmbh',
    package: 'm',
    vat: 'saldo',
    interval: 'quarter',
  });

  const [payrollOptions, setPayrollOptions] = useState({
    employees: 1,
    package: 'admin', 
  });

  const [itOptions, setItOptions] = useState({
    users: 5,
    package: 'managed', 
    automationAudit: false,
    epost: true 
  });

  // --- STATE: PRIVATE ---
  const [isTaxReturnActive, setIsTaxReturnActive] = useState(true);
  const [privateOptions, setPrivateOptions] = useState({
    status: 'single',
    living: 'rent',
    extraProperties: 0,
    highWealth: false,
    delivery: 'digital',
    costOptimization: false
  });

  // --- PRICES CONSTANTS ---
  const PRICES = {
    legalForm: { single: 79, gmbh: 149, verein: 49 },
    package: { s: 49, m: 149, l: 390 },
    vat: { none: 0, saldo: 75, effective: 150 },
    interval: { year: 0, quarter: 120 },
    epost: 89,
    payrollAccounting: 32, 
    payrollAdmin: 65, 
    itWorkplace: 49,
    itManaged: 129,
    automationAudit: 2000, 
    status: { student: 80, single: 150, married: 220 }, 
    living: { rent: 0, own: 120 },
    extraProperty: 100,
    highWealth: 40,
    delivery: { digital: 0, paper: 25, meeting: 150 }
  };

  const calculationResult = useMemo(() => {
    let recurring = 0;
    let oneTime = 0;

    if (clientType === 'business') {
      if (activeBlocks.finance) {
        recurring += PRICES.legalForm[financeOptions.legalForm as keyof typeof PRICES.legalForm] || 0;
        recurring += PRICES.package[financeOptions.package as keyof typeof PRICES.package] || 0;
        recurring += PRICES.vat[financeOptions.vat as keyof typeof PRICES.vat] || 0;
        recurring += PRICES.interval[financeOptions.interval as keyof typeof PRICES.interval] || 0;
      }
      if (activeBlocks.payroll) {
         const rate = payrollOptions.package === 'admin' ? PRICES.payrollAdmin : PRICES.payrollAccounting;
         recurring += (payrollOptions.employees * rate);
      }
      if (activeBlocks.it) {
        const rate = itOptions.package === 'managed' ? PRICES.itManaged : PRICES.itWorkplace;
        recurring += (itOptions.users * rate);
        if (itOptions.epost) recurring += PRICES.epost;
        if (itOptions.automationAudit) oneTime += PRICES.automationAudit;
      }
    } else {
      if (isTaxReturnActive) {
         recurring += PRICES.status[privateOptions.status as keyof typeof PRICES.status] || 0;
         recurring += PRICES.living[privateOptions.living as keyof typeof PRICES.living] || 0;
         recurring += (privateOptions.extraProperties * PRICES.extraProperty);
         if (privateOptions.highWealth) recurring += PRICES.highWealth;
         recurring += PRICES.delivery[privateOptions.delivery as keyof typeof PRICES.delivery] || 0;
      }
    }
    return { recurring, oneTime };
  }, [clientType, activeBlocks, financeOptions, payrollOptions, itOptions, isTaxReturnActive, privateOptions]);

  useEffect(() => {
    const obj = { val: animatedPrice };
    gsap.to(obj, {
      val: calculationResult.recurring,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setAnimatedPrice(Math.round(obj.val))
    });
  }, [calculationResult.recurring]);

  useEffect(() => {
    gsap.fromTo("#calculator-wrapper", 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
  }, []);

  const toggleBusinessBlock = (key: keyof typeof activeBlocks) => {
    setActiveBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const OptionCard = ({ selected, onClick, title, price, icon: Icon, badge, badgeColor = 'blue', desc, features }: any) => (
    <div 
      onClick={onClick}
      className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col h-full relative overflow-hidden group ${
        selected 
          ? 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-500 shadow-md' 
          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
       {badge && <div className={`absolute top-0 right-0 ${badgeColor === 'blue' ? 'bg-blue-600' : 'bg-orange-500'} text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold uppercase tracking-wider z-10`}>{badge}</div>}
       <div className="flex justify-between items-start mb-2">
         <div className="flex items-center gap-2">
            <span className={`font-bold text-sm leading-tight ${selected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>{title}</span>
            {selected && <Check size={14} className="text-blue-600 dark:text-blue-400" strokeWidth={3} />}
         </div>
         {Icon && <Icon size={18} className={selected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />}
       </div>
       {desc && <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mb-3 font-medium">{desc}</p>}
       {features && (
         <ul className="space-y-1.5 mb-3 mt-1 flex-grow">
            {features.map((feat: string, i: number) => (
               <li key={i} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className={`mt-0.5 text-[6px] ${selected ? 'text-blue-500' : 'text-slate-400'}`}>●</span> {feat}
               </li>
            ))}
         </ul>
       )}
       <div className={`text-right font-bold text-sm mt-auto ${selected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>{price}</div>
    </div>
  );

  return (
    <div id="calculator-wrapper" className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between sticky top-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md z-50">
         <button onClick={onClose} className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
            <ArrowLeft size={20} /> <span className="hidden sm:inline">{t.back}</span>
         </button>
         <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800 shadow-sm">
             <button onClick={() => setClientType('business')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${clientType === 'business' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500'}`}>{t.business}</button>
             <button onClick={() => setClientType('private')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${clientType === 'private' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500'}`}>{t.private}</button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">{t.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
               {clientType === 'business' ? (
                  <>
                     <div className={`rounded-2xl border-2 transition-all ${activeBlocks.finance ? 'border-blue-500 bg-white dark:bg-slate-900' : 'border-slate-100 dark:border-slate-800'}`}>
                        <div className="p-6 cursor-pointer flex justify-between items-center" onClick={() => toggleBusinessBlock('finance')}>
                           <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${activeBlocks.finance ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}><Briefcase size={24}/></div>
                              <div><h3 className="font-bold text-lg dark:text-white">{t.finance.title}</h3><p className="text-sm text-slate-500">{t.finance.desc}</p></div>
                           </div>
                           <div className={`w-12 h-6 rounded-full p-1 transition-colors ${activeBlocks.finance ? 'bg-blue-600' : 'bg-slate-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeBlocks.finance ? 'translate-x-6' : 'translate-x-0'}`}></div></div>
                        </div>
                        {activeBlocks.finance && (
                           <div className="p-6 border-t dark:border-slate-800 space-y-8">
                              <div><h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">{t.finance.legalForm}</h4>
                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionCard title="Einzelfirma" price="79.-" selected={financeOptions.legalForm === 'single'} onClick={() => setFinanceOptions(p => ({...p, legalForm: 'single'}))} />
                                    <OptionCard title="GmbH / AG" price="149.-" selected={financeOptions.legalForm === 'gmbh'} onClick={() => setFinanceOptions(p => ({...p, legalForm: 'gmbh'}))} badge={t.finance.popular} />
                                    <OptionCard title="Verein" price="49.-" selected={financeOptions.legalForm === 'verein'} onClick={() => setFinanceOptions(p => ({...p, legalForm: 'verein'}))} />
                                 </div>
                              </div>
                              <div><h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">{t.finance.package}</h4>
                                 <div className="grid grid-cols-1 gap-3">
                                    <OptionCard title="S (< 300)" price="+ 49.-" selected={financeOptions.package === 's'} onClick={() => setFinanceOptions(p => ({...p, package: 's'}))} />
                                    <OptionCard title="M (< 1'200)" price="+ 149.-" selected={financeOptions.package === 'm'} onClick={() => setFinanceOptions(p => ({...p, package: 'm'}))} badge={t.finance.popular} />
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </>
               ) : (
                  <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-500">
                     <h3 className="text-xl font-bold mb-6 dark:text-white">{lang === 'DE' ? 'Privatperson' : 'Particulier'}</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <OptionCard title={lang === 'DE' ? 'Einzel' : 'Seul'} price="150.-" selected={privateOptions.status === 'single'} onClick={() => setPrivateOptions(p => ({...p, status: 'single'}))} />
                        <OptionCard title={lang === 'DE' ? 'Verheiratet' : 'Marié'} price="220.-" selected={privateOptions.status === 'married'} onClick={() => setPrivateOptions(p => ({...p, status: 'married'}))} />
                        <OptionCard title={lang === 'DE' ? 'Student' : 'Étudiant'} price="80.-" selected={privateOptions.status === 'student'} onClick={() => setPrivateOptions(p => ({...p, status: 'student'}))} />
                     </div>
                  </div>
               )}
            </div>

            <div className="lg:col-span-4">
               <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 sticky top-24">
                  <h3 className="font-bold text-xl mb-6 dark:text-white">{t.summaryTitle}</h3>
                  <div className="mb-8">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.monthly}</p>
                     <div className="text-4xl font-black text-blue-600">CHF {animatedPrice}.-</div>
                  </div>
                  <button onClick={() => onRequestQuote ? onRequestQuote() : onClose()} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">{t.cta}</button>
                  <p className="text-center text-[10px] text-slate-400 mt-4">{t.legalNotice}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
