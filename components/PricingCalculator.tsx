
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Check, User, Building2, Users, BarChart3, FileText, ShieldCheck, 
  Cpu, HardDrive, Settings, Zap, ArrowLeft, TrendingUp, GraduationCap,
  Home, Wallet, Landmark, Info, Plus, Lock, ArrowRight, Laptop, Heart,
  Mail, UploadCloud, Coffee, FileCheck, Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';

interface PricingCalculatorProps {
  initialType: 'private' | 'business';
  onClose: () => void;
  onRequestQuote: () => void;
  lang: 'DE' | 'FR';
}

// Define specific types for options to avoid 'any'
type LegalForm = 'single' | 'gmbh' | 'association';
type Volume = 's' | 'm' | 'l';
type Vat = 'none' | 'saldo' | 'effective';
type Interval = 'year' | 'quarter';
type PayrollLevel = 'base' | 'full';
type CivilStatus = 'single' | 'married';
type RealEstate = 'none' | 'one' | 'multiple';
type DataSubmission = 'digital' | 'paper';
type DeliveryMethod = 'digital' | 'meeting';

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ initialType, onClose, onRequestQuote, lang }) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [calcType, setCalcType] = useState<'private' | 'business'>(initialType);

  const t = {
    DE: {
      header: 'Ihr Preis-Modell in 60 Sekunden',
      subtitle: 'Transparent. Planbar. Schweizer Qualität.',
      back: 'Zurück zur Übersicht',
      progress: 'Fortschritt',
      activeBlocks: 'Module gewählt',
      summaryTitle: 'Zusammenfassung',
      monthly: 'Basis-Preis (mtl.)',
      oneTime: 'Investition',
      cta: 'Jetzt Offerte anfordern',
      ctaIndiv: 'Individuelles Paket anfragen',
      trust: 'Datenübertragung SSL-verschlüsselt',
      inclusive: 'IMMER INKLUSIVE:',
      support: 'Persönliche Beratung & Support',
      vatInfo: 'inkl. MWST',
      indivCheck: 'Individuelle Prüfung',
      typeSelection: 'Berechnungstyp:',
      types: {
        private: 'Privatperson',
        business: 'Unternehmen'
      },
      finance: { 
        title: calcType === 'business' ? 'Finanzbuchhaltung & Steuern' : 'Steuererklärung privat',
        desc: calcType === 'business' ? 'Transparente Abrechnung basierend auf Ihrem Belegvolumen – inklusive Bankbewegungen.' : 'Professionelle Steuererklärung für Privatpersonen.',
        q1: 'Welche Rechtsform hat Ihr Unternehmen?',
        q2: 'Wie viele Belege fallen pro Jahr etwa an?',
        q3: 'Sind Sie MWST-pflichtig?',
        q4: 'Gewünschter Abschluss-Intervall?',
        options: {
           year: 'Jahresabschluss',
           yearDesc: 'Klassischer Jahresabschluss.',
           quarter: 'Quartalsabschluss',
           quarterDesc: '4x pro Jahr Zwischenabschluss.'
        },
        p_q1: 'Ihr Zivilstand?',
        p_q2: 'Besitzen Sie Immobilien?',
        p_q3: 'Wie reichen Sie Ihre Unterlagen ein?',
        p_q4: 'Gewünschter Abschluss?',
        p_q5: 'Sparpotenzial & Optimierung',
      },
      payroll: { 
        title: 'Lohn & Personal', 
        desc: 'Rechtssichere Lohnläufe und HR-Administration.',
        q1: 'Wie viele Mitarbeitende beschäftigen Sie?',
        q2: 'Welchen Service-Level benötigen Sie?'
      },
      it: { 
        title: 'IT & Automation', 
        desc: 'Wir digitalisieren Ihre Prozesse für maximale Effizienz.',
        q1: 'Wählen Sie Ihre Automations-Module:',
        labels: {
          devices: 'IT-Arbeitsplätze',
          epost: 'ePost Connect',
          epostDesc: 'Vermeiden Sie manuelles Belegwesen. Wir digitalisieren Ihre tägliche Post automatisch. Das spart enorme Zeit in der Verwaltung.',
          support: 'Managed IT-Support',
          supportDesc: 'Professioneller Full-Service Support für Ihre Hardware, Software und Sicherheit.',
          audit: 'KI Prozess-Audit',
          auditDesc: 'Tiefenanalyse Ihrer digitalen Workflows. Wir identifizieren konkrete Einsparungspotenziale durch KI.'
        }
      }
    },
    FR: {
      header: 'Votre tarif en 60 secondes',
      subtitle: 'Transparent. Prévisible. Qualité suisse.',
      back: 'Retour à l\'aperçu',
      progress: 'Progression',
      activeBlocks: 'Modules choisis',
      summaryTitle: 'Résumé',
      monthly: 'Honoraires de base (mens.)',
      oneTime: 'Investissement',
      cta: 'Demander l\'offre',
      ctaIndiv: 'Demander un pack individuel',
      trust: 'SSL sécurisé',
      inclusive: 'TOUJOURS INCLUS:',
      support: 'Conseil & Support personnel',
      vatInfo: 'TVA incluse',
      indivCheck: 'Examen individuel',
      typeSelection: 'Type de calcul:',
      types: {
        private: 'Particulier',
        business: 'Entreprise'
      },
      finance: { 
        title: calcType === 'business' ? 'Comptabilité & Impôts' : 'Impôts privés',
        desc: calcType === 'business' ? 'Facturation transparente basée sur votre volume – mouvements bancaires inclus.' : 'Déclaration fiscale professionnelle pour particuliers.',
        q1: 'Forme juridique ?',
        q2: 'Volume de pièces ?',
        q3: 'TVA ?',
        q4: 'Fréquence de bouclage ?',
        options: {
           year: 'Bouclage annuel',
           yearDesc: 'Standard.',
           quarter: 'Bouclage trimestriel',
           quarterDesc: '4x par an.'
        },
        p_q1: 'État civil ?',
        p_q2: 'Immobilier ?',
        p_q3: 'Transmission des données ?',
        p_q4: 'Bouclage désiré ?',
        p_q5: 'Potentiel d\'économie',
      },
      payroll: { 
        title: 'Salaires & RH', 
        desc: 'Gestion des salaires et administration RH.',
        q1: 'Nombre d\'employés ?',
        q2: 'Niveau de service ?'
      },
      it: { 
        title: 'IT & Automation', 
        desc: 'Numérisation de vos processus pour une efficacité maximale.',
        q1: 'Choisissez vos modules :',
        labels: {
          devices: 'Postes IT',
          epost: 'ePost Connect',
          epostDesc: 'Numérisation automatique de votre courrier quotidien pour un gain de temps massif.',
          support: 'Support IT managé',
          supportDesc: 'Support complet pour matériel et sécurité.',
          audit: 'Audit IA',
          auditDesc: 'Analyse approfondie de vos flux pour identifier les économies via l\'IA.'
        }
      }
    }
  }[lang];

  // --- STATE ---
  const [activeBlocks, setActiveBlocks] = useState({ finance: true, payroll: false, automation: false });
  
  // Business State
  const [financeOpts, setFinanceOpts] = useState<{legalForm: LegalForm, volume: Volume, vat: Vat, interval: Interval}>({ legalForm: 'gmbh', volume: 'm', vat: 'saldo', interval: 'year' });
  const [payrollOpts, setPayrollOpts] = useState<{employees: number, level: PayrollLevel}>({ employees: 1, level: 'base' });
  const [automationOpts, setAutomationOpts] = useState({ epost: false, managedIt: false, itDevices: 1, aiAudit: false });

  // Private State
  const [privateOpts, setPrivateOpts] = useState<{
    civilStatus: CivilStatus, 
    realEstate: RealEstate, 
    submission: DataSubmission, 
    delivery: DeliveryMethod,
    insuranceCheck: boolean
  }>({ 
    civilStatus: 'single', 
    realEstate: 'none',
    submission: 'digital',
    delivery: 'digital',
    insuranceCheck: false
  });

  // --- PRICING ENGINE ---
  const PRICES = {
    business: {
      base: { single: 80, gmbh: 150, association: 0 }, 
      volume: { s: 49, m: 99, l: 249 },
      vat: { none: 0, saldo: 80, effective: 160 },
      interval: { year: 0, quarter: 120 },
      payroll: { base: 35, full: 65 },
      epost: 135,
      it: 130,
      audit: 1500
    },
    private: {
      base: 0, 
      status: { single: 130, married: 190 }, 
      realEstate: { none: 0, one: 100, multiple: 250 },
      submission: { digital: 0, paper: 50 },
      delivery: { digital: 0, meeting: 120 },
      insuranceDiscount: 20
    }
  };

  const isAssociation = calcType === 'business' && financeOpts.legalForm === 'association';
  const activeCount = Object.values(activeBlocks).filter(Boolean).length;
  
  const totals = useMemo(() => {
    let monthly = 0;
    let oneTime = 0;

    if (calcType === 'business') {
      if (activeBlocks.finance && !isAssociation) {
        monthly += PRICES.business.base[financeOpts.legalForm];
        monthly += PRICES.business.volume[financeOpts.volume];
        monthly += PRICES.business.vat[financeOpts.vat];
        monthly += PRICES.business.interval[financeOpts.interval];
      }
      if (activeBlocks.payroll) {
        monthly += (payrollOpts.employees * PRICES.business.payroll[payrollOpts.level]);
      }
      if (activeBlocks.automation) {
        if (automationOpts.epost) monthly += PRICES.business.epost;
        if (automationOpts.managedIt) monthly += (automationOpts.itDevices * PRICES.business.it);
        if (automationOpts.aiAudit) oneTime += PRICES.business.audit;
      }
    } else {
      let cost = 0;
      if (activeBlocks.finance) {
         cost += PRICES.private.base;
         cost += PRICES.private.status[privateOpts.civilStatus];
         cost += PRICES.private.realEstate[privateOpts.realEstate];
         cost += PRICES.private.submission[privateOpts.submission];
         cost += PRICES.private.delivery[privateOpts.delivery];
         
         // Apply discount if insurance check is selected
         if (privateOpts.insuranceCheck) {
            cost -= PRICES.private.insuranceDiscount;
         }
      }
      oneTime = cost; 
      monthly = 0;
    }

    return { monthly, oneTime };
  }, [activeBlocks, financeOpts, payrollOpts, automationOpts, privateOpts, calcType, isAssociation]);

  useEffect(() => {
    const obj = { val: animatedPrice };
    const target = calcType === 'business' ? totals.monthly : totals.oneTime;
    
    gsap.to(obj, {
      val: target,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: () => setAnimatedPrice(Math.round(obj.val))
    });
  }, [totals.monthly, totals.oneTime, calcType]);

  const ToggleSwitch = ({ active, onToggle, colorClass }: any) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-14 h-8 rounded-full relative cursor-pointer transition-all duration-300 ${active ? colorClass : 'bg-slate-200 dark:bg-white/10'}`}
    >
      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  );

  const SelectionCard = ({ selected, onClick, title, price, desc, icon: Icon, colorClass, badge, partner, children, fullWidth, special }: any) => {
    const colors: any = {
      blue: { border: 'border-blue-600', bg: 'bg-blue-600/5', shadow: 'shadow-blue-600/10', text: 'text-blue-600', activeBorder: 'border-blue-500' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-500/5', shadow: 'shadow-purple-500/10', text: 'text-purple-500', activeBorder: 'border-purple-500' },
      cyan: { border: 'border-cyan-400', bg: 'bg-cyan-400/5', shadow: 'shadow-cyan-400/10', text: 'text-cyan-500', activeBorder: 'border-cyan-400' },
      amber: { border: 'border-amber-500', bg: 'bg-amber-500/5', shadow: 'shadow-amber-500/10', text: 'text-amber-500', activeBorder: 'border-amber-500' },
      emerald: { border: 'border-emerald-500', bg: 'bg-emerald-500/5', shadow: 'shadow-emerald-500/10', text: 'text-emerald-500', activeBorder: 'border-emerald-500' }
    };
    const c = colors[colorClass] || colors.blue;

    return (
      <div 
        onClick={onClick}
        className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col group backdrop-blur-md min-h-[140px] ${fullWidth ? 'w-full' : 'h-full'} ${selected ? `${c.activeBorder} ${c.bg} ${c.shadow}` : 'border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10'} ${special ? 'ring-2 ring-emerald-500/20' : ''}`}
      >
        {badge && <span className={`absolute -top-3 -right-2 px-3 py-1 rounded-lg text-[9px] font-black text-white shadow-lg uppercase tracking-widest ${colorClass === 'blue' ? 'bg-blue-600' : (colorClass === 'amber' ? 'bg-amber-500' : (colorClass === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'))}`}>{badge}</span>}
        <div className="flex justify-between items-start mb-4">
          {Icon && <Icon className={`mb-3 ${selected ? c.text : 'text-slate-400 group-hover:text-slate-600'}`} size={24} />}
          {!Icon && <span className={`text-[10px] font-black uppercase tracking-widest ${selected ? c.text : 'text-slate-400'}`}>{price}</span>}
          {selected ? <div className={`p-1 rounded-full ${c.text.replace('text-', 'bg-')}/10`}><Check size={14} className={c.text} strokeWidth={4} /></div> : <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-white/10" />}
        </div>
        <div className="mt-auto">
          {Icon && <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${selected ? c.text : (special && !selected ? 'text-emerald-500' : 'text-slate-400')}`}>{price}</span>}
          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-2">{title}</h4>
          {desc && <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-1">{desc}</p>}
          {partner && <div className="mt-3 flex"><span className="text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-lg">Powered by {partner}</span></div>}
        </div>
        {selected && children && <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5" onClick={e => e.stopPropagation()}>{children}</div>}
      </div>
    );
  };

  const accentClass = calcType === 'business' ? 'text-blue-600' : 'text-amber-500';
  const bgAccentClass = calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500';

  return (
    <div className="fixed inset-0 z-[120] bg-slate-50/95 dark:bg-[#020617]/95 backdrop-blur-2xl overflow-y-auto font-sans animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <button onClick={onClose} className={`flex items-center gap-3 font-bold text-xs uppercase tracking-widest mb-8 md:mb-16 transition-all group ${accentClass} hover:opacity-70`}>
          <div className={`p-2 rounded-full ${calcType === 'business' ? 'bg-blue-600/10' : 'bg-amber-500/10'} group-hover:scale-90 transition-transform`}>
            <ArrowLeft size={18} />
          </div>
          {t.back}
        </button>

        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.header}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-light text-xl md:text-2xl mb-12">{t.subtitle}</p>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.typeSelection}</span>
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 w-fit">
              <button onClick={() => setCalcType('business')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${calcType === 'business' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>{t.types.business}</button>
              <button onClick={() => setCalcType('private')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${calcType === 'private' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500'}`}>{t.types.private}</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
          <div className="xl:col-span-8 space-y-12">
            <div className="bg-white/60 dark:bg-white/[0.02] rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400">{t.progress}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${accentClass}`}>{activeCount}</span>
                  <span className="text-sm font-bold text-slate-400">/ {calcType === 'business' ? '3' : '1'} {t.activeBlocks}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${bgAccentClass}`} style={{ width: `${(activeCount / (calcType === 'business' ? 3 : 1)) * 100}%` }} />
              </div>
            </div>

            {/* FINANCE BLOCK */}
            <div className={`relative bg-white/60 dark:bg-white/[0.02] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.finance ? (calcType === 'business' ? 'border-blue-600/30' : 'border-amber-500/30') : 'border-slate-200 opacity-70'}`}>
              <div className={`p-6 md:p-12 flex items-center justify-between cursor-pointer ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600/[0.02]' : 'bg-amber-500/[0.02]') : ''}`} onClick={() => setActiveBlocks(p => ({...p, finance: !p.finance}))}>
                <div className="flex items-center gap-4 md:gap-8 flex-1">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600 text-white shadow-xl' : 'bg-amber-500 text-white shadow-xl') : 'bg-slate-100 text-slate-400'}`}>
                    {calcType === 'business' ? <BarChart3 className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} /> : <User className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />}
                  </div>
                  <div className="pr-4">
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{t.finance.title}</h3>
                    <p className="text-xs md:text-base text-slate-500 font-light line-clamp-2 md:line-clamp-none">{t.finance.desc}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <ToggleSwitch active={activeBlocks.finance} colorClass={calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500'} onToggle={() => setActiveBlocks(p => ({...p, finance: !p.finance}))} />
                </div>
              </div>
              {activeBlocks.finance && (
                <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 space-y-16 animate-in fade-in duration-500">
                  {calcType === 'business' ? (
                    <>
                      <div className="pt-8 md:pt-14"><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title="Einzelfirma" price="80.-/Mo" desc="Optimiert für Einzelunternehmer." selected={financeOpts.legalForm === 'single'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'single'}))} colorClass="blue" />
                          <SelectionCard title="GmbH / AG" price="150.-/Mo" desc="Fokus auf Kapitalgesellschaften." selected={financeOpts.legalForm === 'gmbh'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'gmbh'}))} colorClass="blue" badge="Mandats-Tipp" />
                          <SelectionCard title="Verein / Stiftung" price="Indiv." desc="Spezialtarife für gemeinnützige Zwecke." selected={financeOpts.legalForm === 'association'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'association'}))} colorClass="blue" />
                        </div>
                      </div>
                      {!isAssociation && (
                        <><div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q2}</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectionCard title="Paket S" price={`+ ${PRICES.business.volume.s}.-/Mo`} desc="Bis 300 Belege/Jahr" selected={financeOpts.volume === 's'} onClick={() => setFinanceOpts(p => ({...p, volume: 's'}))} colorClass="blue" />
                            <SelectionCard title="Paket M" price={`+ ${PRICES.business.volume.m}.-/Mo`} desc="Bis 1'200 Belege/Jahr" selected={financeOpts.volume === 'm'} onClick={() => setFinanceOpts(p => ({...p, volume: 'm'}))} colorClass="blue" badge="Beliebt" />
                            <SelectionCard title="Paket L" price={`+ ${PRICES.business.volume.l}.-/Mo`} desc="Bis 3'600 Belege/Jahr" selected={financeOpts.volume === 'l'} onClick={() => setFinanceOpts(p => ({...p, volume: 'l'}))} colorClass="blue" />
                          </div>
                        </div>
                        <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q3}</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectionCard title="Befreit" price="+ 0.-" desc="Keine MWST-Pflicht." selected={financeOpts.vat === 'none'} onClick={() => setFinanceOpts(p => ({...p, vat: 'none'}))} colorClass="blue" />
                            <SelectionCard title="Saldosteuersatz" price="+ 80.-" desc="Pauschalabrechnung." selected={financeOpts.vat === 'saldo'} onClick={() => setFinanceOpts(p => ({...p, vat: 'saldo'}))} colorClass="blue" />
                            <SelectionCard title="Effektiv" price="+ 160.-" desc="Mit Vorsteuerabzug." selected={financeOpts.vat === 'effective'} onClick={() => setFinanceOpts(p => ({...p, vat: 'effective'}))} colorClass="blue" />
                          </div>
                        </div>
                        <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q4}</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectionCard title={t.finance.options.year} price="+ 0.-" desc={t.finance.options.yearDesc} selected={financeOpts.interval === 'year'} onClick={() => setFinanceOpts(p => ({...p, interval: 'year'}))} colorClass="blue" badge={lang === 'DE' ? "Beliebt" : "Populaire"} />
                            <SelectionCard title={t.finance.options.quarter} price={`+ ${PRICES.business.interval.quarter}.-`} desc={t.finance.options.quarterDesc} selected={financeOpts.interval === 'quarter'} onClick={() => setFinanceOpts(p => ({...p, interval: 'quarter'}))} colorClass="blue" />
                          </div>
                        </div></>
                      )}
                    </>
                  ) : (
                    <div className="pt-8 md:pt-14 space-y-16">
                      {/* Civil Status Section */}
                      <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={lang === 'DE' ? "Alleinstehend / Ledig" : "Célibataire"} price="130.-" desc={lang === 'DE' ? "Einzelperson" : "Personne seule"} selected={privateOpts.civilStatus === 'single'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'single'}))} colorClass="amber" icon={User} badge={lang === 'DE' ? "Basis" : "Standard"} />
                          <SelectionCard title={lang === 'DE' ? "Verheiratet" : "Marié(e)"} price="190.-" desc={lang === 'DE' ? "Zusammen veranlagt" : "Imposition commune"} selected={privateOpts.civilStatus === 'married'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'married'}))} colorClass="amber" icon={Heart} />
                        </div>
                      </div>

                      {/* Real Estate Section */}
                      <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q2}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title={lang === 'DE' ? "Keine" : "Aucun"} price="+ 0.-" desc={lang === 'DE' ? "Kein Wohneigentum" : "Pas de propriété"} selected={privateOpts.realEstate === 'none'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'none'}))} colorClass="amber" />
                          <SelectionCard title={lang === 'DE' ? "Eine Immobilie" : "Un bien"} price="+ 100.-" desc={lang === 'DE' ? "Eigenheim / Stockwerk" : "Maison / Appartement"} selected={privateOpts.realEstate === 'one'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'one'}))} colorClass="amber" icon={Home} />
                          <SelectionCard title={lang === 'DE' ? "Mehrere" : "Plusieurs"} price="+ 250.-" desc={lang === 'DE' ? "Liegenschaftsverwaltung" : "Gestion immobilière"} selected={privateOpts.realEstate === 'multiple'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'multiple'}))} colorClass="amber" icon={Building2} />
                        </div>
                      </div>

                       {/* Insurance Optimization Section (Lead Gen) */}
                       <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q5}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard 
                            title={lang === 'DE' ? "Kostenloser Check" : "Analyse gratuite"} 
                            price="- 20.-" 
                            desc={lang === 'DE' ? "Unverbindlicher Versicherungsvergleich: Wir prüfen Ihr Sparpotenzial." : "Comparaison d'assurance sans engagement."} 
                            selected={privateOpts.insuranceCheck === true} 
                            onClick={() => setPrivateOpts(p => ({...p, insuranceCheck: true}))} 
                            colorClass="emerald" 
                            icon={ShieldCheck} 
                            badge={lang === 'DE' ? "Kombi-Rabatt" : "Rabais combiné"}
                            special
                          />
                          <SelectionCard 
                            title={lang === 'DE' ? "Keine Optimierung" : "Pas d'optimisation"} 
                            price="+ 0.-" 
                            desc={lang === 'DE' ? "Nur Steuererklärung ausfüllen." : "Remplir uniquement la déclaration."} 
                            selected={privateOpts.insuranceCheck === false} 
                            onClick={() => setPrivateOpts(p => ({...p, insuranceCheck: false}))} 
                            colorClass="amber" 
                          />
                        </div>
                      </div>

                      {/* Data Submission Section */}
                      <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q3}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={lang === 'DE' ? "Digital (Upload)" : "Numérique"} price="+ 0.-" desc={lang === 'DE' ? "Bexora-Portal" : "Upload via portail"} selected={privateOpts.submission === 'digital'} onClick={() => setPrivateOpts(p => ({...p, submission: 'digital'}))} colorClass="amber" icon={UploadCloud} />
                          <SelectionCard title={lang === 'DE' ? "Per Post" : "Par courrier"} price="+ 50.-" desc={lang === 'DE' ? "Physische Einreichung" : "Envoi physique"} selected={privateOpts.submission === 'paper'} onClick={() => setPrivateOpts(p => ({...p, submission: 'paper'}))} colorClass="amber" icon={Mail} />
                        </div>
                      </div>

                      {/* Delivery / Consultation Section */}
                      <div><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q4}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={lang === 'DE' ? "Nur digital" : "Digital seul"} price="+ 0.-" desc={lang === 'DE' ? "Zustellung per E-Mail" : "Envoi par email"} selected={privateOpts.delivery === 'digital'} onClick={() => setPrivateOpts(p => ({...p, delivery: 'digital'}))} colorClass="amber" icon={FileCheck} />
                          <SelectionCard title={lang === 'DE' ? "Besprechung Büro" : "Séance au bureau"} price="+ 120.-" desc={lang === 'DE' ? "30 Min. in Lengnau" : "30 min de conseil"} selected={privateOpts.delivery === 'meeting'} onClick={() => setPrivateOpts(p => ({...p, delivery: 'meeting'}))} colorClass="amber" icon={Building2} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PAYROLL BLOCK */}
            {calcType === 'business' && (
              <div className={`relative bg-white/60 dark:bg-white/[0.02] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.payroll ? 'border-purple-500/30 shadow-xl shadow-purple-500/5' : 'border-slate-200 opacity-70'}`}>
                <div className={`p-6 md:p-12 flex items-center justify-between cursor-pointer ${activeBlocks.payroll ? 'bg-purple-500/[0.02]' : ''}`} onClick={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))}>
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.payroll ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Users className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                    </div>
                    <div className="pr-4">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{t.payroll.title}</h3>
                      <p className="text-xs md:text-base text-slate-500 font-light line-clamp-2 md:line-clamp-none">{t.payroll.desc}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <ToggleSwitch active={activeBlocks.payroll} colorClass="bg-purple-500" onToggle={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))} />
                  </div>
                </div>
                {activeBlocks.payroll && (
                  <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 space-y-20 animate-in fade-in duration-500">
                    <div className="mt-8 md:mt-14 pt-8 md:pt-14 flex flex-col bg-slate-100/30 dark:bg-white/5 p-8 md:p-12 rounded-[2.5rem]">
                        <div className="w-full flex justify-between items-end mb-12"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.payroll.q1}</label><div className="flex items-baseline gap-2"><span className="text-4xl font-black text-purple-500 tabular-nums">{payrollOpts.employees}</span><span className="text-xs font-bold text-slate-400">MA</span></div></div>
                        <input type="range" min="1" max="50" value={payrollOpts.employees} onChange={e => setPayrollOpts(p => ({...p, employees: parseInt(e.target.value)}))} className="w-full h-3 bg-slate-200 appearance-none accent-purple-500 rounded-full" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-10 block tracking-widest">{t.payroll.q2}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard title="Basis Lohn" price="35.- / MA" desc="Standard Lohnabrechnung." selected={payrollOpts.level === 'base'} onClick={() => setPayrollOpts(p => ({...p, level: 'base'}))} colorClass="purple" />
                        <SelectionCard title="Full HR Service" price="65.- / MA" desc="Inklusive Administration & Recht." selected={payrollOpts.level === 'full'} onClick={() => setPayrollOpts(p => ({...p, level: 'full'}))} colorClass="purple" badge="Premium" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AUTOMATION BLOCK */}
            {calcType === 'business' && (
              <div className={`relative bg-white/60 dark:bg-white/[0.02] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.automation ? 'border-cyan-400/30 shadow-xl shadow-cyan-400/5' : 'border-slate-200 opacity-70'}`}>
                <div className={`p-6 md:p-12 flex items-center justify-between cursor-pointer ${activeBlocks.automation ? 'bg-cyan-400/[0.02]' : ''}`} onClick={() => setActiveBlocks(p => ({...p, automation: !p.automation}))}>
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.automation ? 'bg-cyan-400 text-slate-950' : 'bg-slate-100 text-slate-400'}`}>
                      <Cpu className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                    </div>
                    <div className="pr-4">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{t.it.title}</h3>
                      <p className="text-xs md:text-base text-slate-500 font-light line-clamp-2 md:line-clamp-none">{t.it.desc}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <ToggleSwitch active={activeBlocks.automation} colorClass="bg-cyan-400" onToggle={() => setActiveBlocks(p => ({...p, automation: !p.automation}))} />
                  </div>
                </div>
                {activeBlocks.automation && (
                  <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 space-y-8 animate-in fade-in duration-500">
                    <div className="pt-8 md:pt-14"><label className="text-[10px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.it.q1}</label>
                      <div className="flex flex-col gap-6">
                        <SelectionCard title={t.it.labels.epost} price={`+ ${PRICES.business.epost}.-/Mo`} desc={t.it.labels.epostDesc} selected={automationOpts.epost} onClick={() => setAutomationOpts(p => ({...p, epost: !p.epost}))} colorClass="cyan" partner="NextLab" fullWidth />
                        
                        <SelectionCard title={t.it.labels.support} price="130.-/PC" desc={t.it.labels.supportDesc} selected={automationOpts.managedIt} onClick={() => setAutomationOpts(p => ({...p, managedIt: !p.managedIt}))} colorClass="cyan" fullWidth>
                            <div className="pt-4 max-w-xl">
                                <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.it.labels.devices}</span>
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-2xl font-black text-cyan-500">{automationOpts.itDevices}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Einheiten</span>
                                  </div>
                                </div>
                                <input type="range" min="1" max="20" value={automationOpts.itDevices} onChange={e => setAutomationOpts(p => ({...p, itDevices: parseInt(e.target.value)}))} className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 appearance-none accent-cyan-400 rounded-full cursor-pointer" />
                            </div>
                        </SelectionCard>
                        
                        <SelectionCard title={t.it.labels.audit} price="1'500.-" desc={t.it.labels.auditDesc} selected={automationOpts.aiAudit} onClick={() => setAutomationOpts(p => ({...p, aiAudit: !p.aiAudit}))} colorClass="cyan" badge="Investition" partner="NextLab" fullWidth />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-12 bg-white/70 dark:bg-[#0d1425]/90 backdrop-blur-2xl p-10 xl:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-2xl relative">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">{t.summaryTitle}</h3>
              
              <div className="space-y-6 mb-12">
                {/* FINANCE SUMMARY */}
                <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.finance ? (calcType === 'business' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/5' : 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/5') : 'border-slate-200 grayscale'}`}>
                  <span className="font-bold text-slate-600 dark:text-slate-400">{calcType === 'business' ? 'Finanzen' : 'Steuern'}</span>
                  <span className="text-slate-900 dark:text-white font-black">
                    {activeBlocks.finance ? (
                        isAssociation ? t.indivCheck : 
                        (calcType === 'business' 
                            ? `CHF ${totals.monthly - (activeBlocks.payroll ? payrollOpts.employees * PRICES.business.payroll[payrollOpts.level] : 0) - (activeBlocks.automation && automationOpts.epost ? 135 : 0) - (activeBlocks.automation && automationOpts.managedIt ? automationOpts.itDevices * 130 : 0)}.-`
                            : `CHF ${totals.oneTime}.-`
                        )
                    ) : '—'}
                  </span>
                </div>

                {/* INSURANCE DISCOUNT SUMMARY */}
                {calcType === 'private' && privateOpts.insuranceCheck && (
                   <div className="flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5 transition-all">
                      <span className="font-bold text-slate-600 dark:text-slate-400">Kombi-Rabatt</span>
                      <span className="text-emerald-500 font-black">- CHF 20.-</span>
                   </div>
                )}

                {/* PAYROLL SUMMARY */}
                {calcType === 'business' && (
                  <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.payroll ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/5' : 'border-slate-200 grayscale opacity-40'}`}>
                    <span className="font-bold text-slate-600 dark:text-slate-400">Personal ({payrollOpts.employees} MA)</span>
                    <span className="text-slate-900 dark:text-white font-black">{activeBlocks.payroll ? `CHF ${payrollOpts.employees * PRICES.business.payroll[payrollOpts.level]}.-` : '—'}</span>
                  </div>
                )}

                {/* IT SUMMARY */}
                {calcType === 'business' && (
                  <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.automation && (automationOpts.epost || automationOpts.managedIt) ? 'border-cyan-400 bg-cyan-50/50 dark:bg-cyan-400/5' : 'border-slate-200 grayscale opacity-40'}`}>
                    <span className="font-bold text-slate-600 dark:text-slate-400">IT & Automation</span>
                    <span className="text-slate-900 dark:text-white font-black">{activeBlocks.automation && (automationOpts.epost || automationOpts.managedIt) ? `CHF ${(automationOpts.epost ? 135 : 0) + (automationOpts.managedIt ? automationOpts.itDevices * 130 : 0)}.-` : '—'}</span>
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/10 mb-12" />

              <div className="mb-14">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black uppercase text-slate-400">{calcType === 'business' ? t.monthly : 'Preis total'}</p>
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{t.vatInfo}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  {isAssociation ? (
                    <span className="text-3xl font-black text-slate-900 dark:text-white leading-tight">Ab CHF {animatedPrice}.-<br/><span className="text-sm font-bold text-slate-400 tracking-normal">+ individuelle Finanzen</span></span>
                  ) : (
                    <>
                      <span className={`text-base font-black ${accentClass}`}>CHF</span>
                      <span className="text-7xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{animatedPrice}</span>
                    </>
                  )}
                </div>
              </div>

              <button onClick={onRequestQuote} className={`w-full py-7 text-white rounded-[2rem] font-black text-[15px] uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-1.5 active:translate-y-0 flex items-center justify-center gap-4 ${isAssociation ? 'bg-slate-900' : (calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500')}`}>
                {isAssociation ? t.ctaIndiv : t.cta} <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-40" />
    </div>
  );
};

export default PricingCalculator;
