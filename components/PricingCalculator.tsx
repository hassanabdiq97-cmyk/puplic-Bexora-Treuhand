
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Check, User, Building2, Users, BarChart3, ShieldCheck, 
  Cpu, ArrowLeft, ArrowRight, Heart,
  Mail, UploadCloud, FileCheck, Home
} from 'lucide-react';
import { gsap } from 'gsap';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

interface PricingCalculatorProps {
  initialType: 'private' | 'business';
  onClose: () => void;
  onRequestQuote: () => void;
  lang: 'DE' | 'FR';
}

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

  const dict = lang === 'DE' ? deDict : frDict;
  const t = dict.calculator;

  // --- STATE ---
  const [activeBlocks, setActiveBlocks] = useState({ finance: false, payroll: false, automation: false });
  const [financeOpts, setFinanceOpts] = useState<{legalForm: LegalForm, volume: Volume, vat: Vat, interval: Interval}>({ legalForm: 'gmbh', volume: 'm', vat: 'saldo', interval: 'year' });
  const [payrollOpts, setPayrollOpts] = useState<{employees: number, level: PayrollLevel}>({ employees: 1, level: 'base' });
  const [automationOpts, setAutomationOpts] = useState({ epost: false, managedIt: false, itDevices: 1, aiAudit: false });
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

  useEffect(() => {
    setActiveBlocks({ finance: false, payroll: false, automation: false });
    setFinanceOpts({ legalForm: 'gmbh', volume: 'm', vat: 'saldo', interval: 'year' });
    setPayrollOpts({ employees: 1, level: 'base' });
    setAutomationOpts({ epost: false, managedIt: false, itDevices: 1, aiAudit: false });
    setPrivateOpts({ 
      civilStatus: 'single', 
      realEstate: 'none', 
      submission: 'digital', 
      delivery: 'digital',
      insuranceCheck: false
    });
  }, [calcType]);

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
      if (activeBlocks.payroll) monthly += (payrollOpts.employees * PRICES.business.payroll[payrollOpts.level]);
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
         if (privateOpts.insuranceCheck) cost -= PRICES.private.insuranceDiscount;
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

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const ToggleSwitch = ({ active, onToggle, colorClass, label }: any) => (
    <div 
      role="switch"
      aria-checked={active}
      aria-label={label || dict.aria.toggleSection}
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      onKeyDown={(e) => handleKeyDown(e, onToggle)}
      className={`min-w-[56px] h-8 rounded-full relative cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${active ? colorClass : 'bg-slate-200 dark:bg-white/20'}`}
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
        role="radio"
        aria-checked={selected}
        aria-label={`${dict.aria.selectOption} ${title}`}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => handleKeyDown(e, onClick)}
        className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col group backdrop-blur-md min-h-[160px] focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${fullWidth ? 'w-full' : 'h-full'} ${selected ? `${c.activeBorder} ${c.bg} ${c.shadow}` : 'border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20'} ${special ? 'ring-2 ring-emerald-500/20' : ''}`}
      >
        {badge && <span className={`absolute -top-3 -right-2 px-3 py-1 rounded-lg text-[9px] font-black text-white shadow-lg uppercase tracking-widest ${colorClass === 'blue' ? 'bg-blue-600' : (colorClass === 'amber' ? 'bg-amber-500' : (colorClass === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'))}`}>{badge}</span>}
        <div className="flex justify-between items-start mb-4">
          {Icon && <Icon className={`mb-3 ${selected ? c.text : 'text-slate-400 dark:text-slate-300 group-hover:text-slate-600'}`} size={24} />}
          {!Icon && <span className={`text-[10px] font-black uppercase tracking-widest ${selected ? c.text : 'text-slate-500 dark:text-slate-300'}`}>{price}</span>}
          {selected ? <div className={`p-1 rounded-full ${c.text.replace('text-', 'bg-')}/10`}><Check size={14} className={c.text} strokeWidth={4} /></div> : <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-white/20" />}
        </div>
        <div className="mt-auto">
          {Icon && <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${selected ? c.text : (special && !selected ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400')}`}>{price}</span>}
          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-2">{title}</h4>
          {desc && <p className="text-xs text-slate-500 dark:text-slate-300 font-light leading-relaxed mb-1">{desc}</p>}
          {partner && <div className="mt-3 flex"><span className="text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 rounded-lg">Powered by {partner}</span></div>}
        </div>
        {selected && children && <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/10" onClick={e => e.stopPropagation()}>{children}</div>}
      </div>
    );
  };

  const accentClass = calcType === 'business' ? 'text-blue-600' : 'text-amber-500';
  const bgAccentClass = calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500';

  return (
    <div className="fixed inset-0 z-[120] bg-slate-50/95 dark:bg-[#020617]/95 backdrop-blur-2xl overflow-y-auto font-sans animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        {/* Close Button / Back Link with large touch target */}
        <button onClick={onClose} className={`flex items-center gap-3 font-bold text-xs uppercase tracking-widest mb-8 md:mb-16 transition-all group ${accentClass} hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg p-2 -ml-2 min-h-[44px] min-w-[44px]`}>
          <div className={`p-2 rounded-full ${calcType === 'business' ? 'bg-blue-600/10' : 'bg-amber-500/10'} group-hover:scale-90 transition-transform`}>
            <ArrowLeft size={18} />
          </div>
          {t.back}
        </button>

        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.header}</h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-xl md:text-2xl mb-12">{t.subtitle}</p>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-300">{t.typeSelection}</span>
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 w-fit" role="radiogroup" aria-label="Calculator Type">
              <button 
                role="radio"
                aria-checked={calcType === 'business'}
                onClick={() => setCalcType('business')} 
                className={`px-6 py-3 min-h-[44px] rounded-xl text-xs font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${calcType === 'business' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {t.types.business}
              </button>
              <button 
                role="radio"
                aria-checked={calcType === 'private'}
                onClick={() => setCalcType('private')} 
                className={`px-6 py-3 min-h-[44px] rounded-xl text-xs font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${calcType === 'private' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {t.types.private}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
          <div className="xl:col-span-8 space-y-12">
            {/* Progress Bar */}
            <div className="bg-white/60 dark:bg-white/[0.03] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-300">{t.progress}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${accentClass}`}>{activeCount}</span>
                  <span className="text-sm font-bold text-slate-400 dark:text-slate-400">/ {calcType === 'business' ? '3' : '1'} {t.activeBlocks}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${bgAccentClass}`} style={{ width: `${(activeCount / (calcType === 'business' ? 3 : 1)) * 100}%` }} />
              </div>
            </div>

            {/* FINANCE BLOCK */}
            <div className={`relative bg-white/60 dark:bg-white/[0.03] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.finance ? (calcType === 'business' ? 'border-blue-600/30' : 'border-amber-500/30') : 'border-slate-200 dark:border-white/10 opacity-70'}`}>
              <div 
                className={`p-6 md:p-12 flex items-center justify-between cursor-pointer focus:outline-none focus:bg-slate-50 dark:focus:bg-white/5 ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600/[0.02]' : 'bg-amber-500/[0.02]') : ''}`} 
                onClick={() => setActiveBlocks(p => ({...p, finance: !p.finance}))}
                onKeyDown={(e) => handleKeyDown(e, () => setActiveBlocks(p => ({...p, finance: !p.finance})))}
                tabIndex={0}
                role="button"
                aria-expanded={activeBlocks.finance}
                aria-label={calcType === 'business' ? t.finance.titleBusiness : t.finance.titlePrivate}
              >
                <div className="flex items-center gap-4 md:gap-8 flex-1">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600 text-white shadow-xl' : 'bg-amber-500 text-white shadow-xl') : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                    {calcType === 'business' ? <BarChart3 className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} /> : <User className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />}
                  </div>
                  <div className="pr-4">
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{calcType === 'business' ? t.finance.titleBusiness : t.finance.titlePrivate}</h3>
                    <p className="text-xs md:text-base text-slate-600 dark:text-slate-300 font-light line-clamp-2 md:line-clamp-none">{calcType === 'business' ? t.finance.descBusiness : t.finance.descPrivate}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <ToggleSwitch active={activeBlocks.finance} colorClass={calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500'} onToggle={() => setActiveBlocks(p => ({...p, finance: !p.finance}))} label={calcType === 'business' ? t.finance.titleBusiness : t.finance.titlePrivate} />
                </div>
              </div>
              {activeBlocks.finance && (
                <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 dark:border-white/10 space-y-16 animate-in fade-in duration-500">
                  {calcType === 'business' ? (
                    <>
                      <div className="pt-8 md:pt-14" role="radiogroup" aria-label={t.finance.q1}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title={t.finance.options.single} price="80.-/Mo" desc={t.finance.options.singleDesc} selected={financeOpts.legalForm === 'single'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'single'}))} colorClass="blue" />
                          <SelectionCard title={t.finance.options.gmbh} price="150.-/Mo" desc={t.finance.options.gmbhDesc} selected={financeOpts.legalForm === 'gmbh'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'gmbh'}))} colorClass="blue" badge="Mandats-Tipp" />
                          <SelectionCard title={t.finance.options.assoc} price="Indiv." desc={t.finance.options.assocDesc} selected={financeOpts.legalForm === 'association'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'association'}))} colorClass="blue" />
                        </div>
                      </div>
                      {!isAssociation && (
                        <><div role="radiogroup" aria-label={t.finance.q2}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.q2}</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectionCard title={t.finance.options.packageS} price={`+ ${PRICES.business.volume.s}.-/Mo`} desc="Bis 300 Belege/Jahr" selected={financeOpts.volume === 's'} onClick={() => setFinanceOpts(p => ({...p, volume: 's'}))} colorClass="blue" />
                            <SelectionCard title={t.finance.options.packageM} price={`+ ${PRICES.business.volume.m}.-/Mo`} desc="Bis 1'200 Belege/Jahr" selected={financeOpts.volume === 'm'} onClick={() => setFinanceOpts(p => ({...p, volume: 'm'}))} colorClass="blue" badge="Beliebt" />
                            <SelectionCard title={t.finance.options.packageL} price={`+ ${PRICES.business.volume.l}.-/Mo`} desc="Bis 3'600 Belege/Jahr" selected={financeOpts.volume === 'l'} onClick={() => setFinanceOpts(p => ({...p, volume: 'l'}))} colorClass="blue" />
                          </div>
                        </div>
                        <div role="radiogroup" aria-label={t.finance.q3}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.q3}</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectionCard title={t.finance.options.vatNone} price="+ 0.-" desc="Keine MWST-Pflicht." selected={financeOpts.vat === 'none'} onClick={() => setFinanceOpts(p => ({...p, vat: 'none'}))} colorClass="blue" />
                            <SelectionCard title={t.finance.options.vatSaldo} price="+ 80.-" desc="Pauschalabrechnung." selected={financeOpts.vat === 'saldo'} onClick={() => setFinanceOpts(p => ({...p, vat: 'saldo'}))} colorClass="blue" />
                            <SelectionCard title={t.finance.options.vatEff} price="+ 160.-" desc="Mit Vorsteuerabzug." selected={financeOpts.vat === 'effective'} onClick={() => setFinanceOpts(p => ({...p, vat: 'effective'}))} colorClass="blue" />
                          </div>
                        </div>
                        <div role="radiogroup" aria-label={t.finance.q4}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.q4}</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectionCard title={t.finance.options.year} price="+ 0.-" desc={t.finance.options.yearDesc} selected={financeOpts.interval === 'year'} onClick={() => setFinanceOpts(p => ({...p, interval: 'year'}))} colorClass="blue" badge={lang === 'DE' ? "Beliebt" : "Populaire"} />
                            <SelectionCard title={t.finance.options.quarter} price={`+ ${PRICES.business.interval.quarter}.-`} desc={t.finance.options.quarterDesc} selected={financeOpts.interval === 'quarter'} onClick={() => setFinanceOpts(p => ({...p, interval: 'quarter'}))} colorClass="blue" />
                          </div>
                        </div></>
                      )}
                    </>
                  ) : (
                    <div className="pt-8 md:pt-14 space-y-16">
                      <div role="radiogroup" aria-label={t.finance.p_q1}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.p_q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={t.finance.p_options.single} price="130.-" desc={t.finance.p_options.singleDesc} selected={privateOpts.civilStatus === 'single'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'single'}))} colorClass="amber" icon={User} badge={lang === 'DE' ? "Basis" : "Standard"} />
                          <SelectionCard title={t.finance.p_options.married} price="190.-" desc={t.finance.p_options.marriedDesc} selected={privateOpts.civilStatus === 'married'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'married'}))} colorClass="amber" icon={Heart} />
                        </div>
                      </div>
                      <div role="radiogroup" aria-label={t.finance.p_q2}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.p_q2}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title={t.finance.p_options.none} price="+ 0.-" desc={t.finance.p_options.noneDesc} selected={privateOpts.realEstate === 'none'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'none'}))} colorClass="amber" />
                          <SelectionCard title={t.finance.p_options.one} price="+ 100.-" desc={t.finance.p_options.oneDesc} selected={privateOpts.realEstate === 'one'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'one'}))} colorClass="amber" icon={Home} />
                          <SelectionCard title={t.finance.p_options.multi} price="+ 250.-" desc={t.finance.p_options.multiDesc} selected={privateOpts.realEstate === 'multiple'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'multiple'}))} colorClass="amber" icon={Building2} />
                        </div>
                      </div>
                       <div role="radiogroup" aria-label={t.finance.p_q5}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.p_q5}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={t.finance.p_options.check} price="- 20.-" desc={t.finance.p_options.checkDesc} selected={privateOpts.insuranceCheck === true} onClick={() => setPrivateOpts(p => ({...p, insuranceCheck: true}))} colorClass="emerald" icon={ShieldCheck} badge={lang === 'DE' ? "Kombi-Rabatt" : "Rabais combiné"} special />
                          <SelectionCard title={t.finance.p_options.noCheck} price="+ 0.-" desc={t.finance.p_options.noCheckDesc} selected={privateOpts.insuranceCheck === false} onClick={() => setPrivateOpts(p => ({...p, insuranceCheck: false}))} colorClass="amber" />
                        </div>
                      </div>
                      <div role="radiogroup" aria-label={t.finance.p_q3}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.p_q3}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={t.finance.p_options.digital} price="+ 0.-" desc={t.finance.p_options.digitalDesc} selected={privateOpts.submission === 'digital'} onClick={() => setPrivateOpts(p => ({...p, submission: 'digital'}))} colorClass="amber" icon={UploadCloud} />
                          <SelectionCard title={t.finance.p_options.paper} price="+ 50.-" desc={t.finance.p_options.paperDesc} selected={privateOpts.submission === 'paper'} onClick={() => setPrivateOpts(p => ({...p, submission: 'paper'}))} colorClass="amber" icon={Mail} />
                        </div>
                      </div>
                      <div role="radiogroup" aria-label={t.finance.p_q4}><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.finance.p_q4}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title={t.finance.p_options.deliveryDig} price="+ 0.-" desc={t.finance.p_options.deliveryDigDesc} selected={privateOpts.delivery === 'digital'} onClick={() => setPrivateOpts(p => ({...p, delivery: 'digital'}))} colorClass="amber" icon={FileCheck} />
                          <SelectionCard title={t.finance.p_options.deliveryMeet} price="+ 120.-" desc={t.finance.p_options.deliveryMeetDesc} selected={privateOpts.delivery === 'meeting'} onClick={() => setPrivateOpts(p => ({...p, delivery: 'meeting'}))} colorClass="amber" icon={Building2} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PAYROLL BLOCK */}
            {calcType === 'business' && (
              <div className={`relative bg-white/60 dark:bg-white/[0.03] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.payroll ? 'border-purple-500/30 shadow-xl shadow-purple-500/5' : 'border-slate-200 dark:border-white/10 opacity-70'}`}>
                <div 
                  className={`p-6 md:p-12 flex items-center justify-between cursor-pointer focus:outline-none focus:bg-slate-50 dark:focus:bg-white/5 ${activeBlocks.payroll ? 'bg-purple-500/[0.02]' : ''}`} 
                  onClick={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))}
                  onKeyDown={(e) => handleKeyDown(e, () => setActiveBlocks(p => ({...p, payroll: !p.payroll})))}
                  tabIndex={0}
                  role="button"
                  aria-expanded={activeBlocks.payroll}
                  aria-label={t.payroll.title}
                >
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.payroll ? 'bg-purple-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                      <Users className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                    </div>
                    <div className="pr-4">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{t.payroll.title}</h3>
                      <p className="text-xs md:text-base text-slate-600 dark:text-slate-300 font-light line-clamp-2 md:line-clamp-none">{t.payroll.desc}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <ToggleSwitch active={activeBlocks.payroll} colorClass="bg-purple-500" onToggle={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))} label={t.payroll.title} />
                  </div>
                </div>
                {activeBlocks.payroll && (
                  <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 dark:border-white/10 space-y-20 animate-in fade-in duration-500">
                    <div className="mt-8 md:mt-14 pt-8 md:pt-14 flex flex-col bg-slate-100/30 dark:bg-white/5 p-8 md:p-12 rounded-[2.5rem]">
                        <div className="w-full flex justify-between items-end mb-12"><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 tracking-widest">{t.payroll.q1}</label><div className="flex items-baseline gap-2"><span className="text-4xl font-black text-purple-500 tabular-nums">{payrollOpts.employees}</span><span className="text-xs font-bold text-slate-400 dark:text-slate-300">MA</span></div></div>
                        <input type="range" min="1" max="50" value={payrollOpts.employees} onChange={e => setPayrollOpts(p => ({...p, employees: parseInt(e.target.value)}))} className="w-full h-3 bg-slate-200 dark:bg-slate-800 appearance-none accent-purple-500 rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-500/30" aria-label={t.payroll.q1} />
                    </div>
                    <div role="radiogroup" aria-label={t.payroll.q2}>
                      <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-10 block tracking-widest">{t.payroll.q2}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard title={t.payroll.base} price="35.- / MA" desc={t.payroll.baseDesc} selected={payrollOpts.level === 'base'} onClick={() => setPayrollOpts(p => ({...p, level: 'base'}))} colorClass="purple" />
                        <SelectionCard title={t.payroll.full} price="65.- / MA" desc={t.payroll.fullDesc} selected={payrollOpts.level === 'full'} onClick={() => setPayrollOpts(p => ({...p, level: 'full'}))} colorClass="purple" badge="Premium" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AUTOMATION BLOCK */}
            {calcType === 'business' && (
              <div className={`relative bg-white/60 dark:bg-white/[0.03] rounded-[3rem] border transition-all duration-500 overflow-hidden ${activeBlocks.automation ? 'border-cyan-400/30 shadow-xl shadow-cyan-400/5' : 'border-slate-200 dark:border-white/10 opacity-70'}`}>
                <div 
                  className={`p-6 md:p-12 flex items-center justify-between cursor-pointer focus:outline-none focus:bg-slate-50 dark:focus:bg-white/5 ${activeBlocks.automation ? 'bg-cyan-400/[0.02]' : ''}`} 
                  onClick={() => setActiveBlocks(p => ({...p, automation: !p.automation}))}
                  onKeyDown={(e) => handleKeyDown(e, () => setActiveBlocks(p => ({...p, automation: !p.automation})))}
                  tabIndex={0}
                  role="button"
                  aria-expanded={activeBlocks.automation}
                  aria-label={t.it.title}
                >
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeBlocks.automation ? 'bg-cyan-400 text-slate-950' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                      <Cpu className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                    </div>
                    <div className="pr-4">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-3">{t.it.title}</h3>
                      <p className="text-xs md:text-base text-slate-600 dark:text-slate-300 font-light line-clamp-2 md:line-clamp-none">{t.it.desc}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <ToggleSwitch active={activeBlocks.automation} colorClass="bg-cyan-400" onToggle={() => setActiveBlocks(p => ({...p, automation: !p.automation}))} label={t.it.title} />
                  </div>
                </div>
                {activeBlocks.automation && (
                  <div className="p-6 md:p-14 pt-0 border-t border-slate-200/50 dark:border-white/10 space-y-8 animate-in fade-in duration-500">
                    <div className="pt-8 md:pt-14"><label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 mb-8 block tracking-widest">{t.it.q1}</label>
                      <div className="flex flex-col gap-6">
                        <SelectionCard title={t.it.labels.epost} price={`+ ${PRICES.business.epost}.-/Mo`} desc={t.it.labels.epostDesc} selected={automationOpts.epost} onClick={() => setAutomationOpts(p => ({...p, epost: !p.epost}))} colorClass="cyan" partner="NextLab" fullWidth />
                        <SelectionCard title={t.it.labels.support} price="130.-/PC" desc={t.it.labels.supportDesc} selected={automationOpts.managedIt} onClick={() => setAutomationOpts(p => ({...p, managedIt: !p.managedIt}))} colorClass="cyan" fullWidth>
                            <div className="pt-4 max-w-xl">
                                <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 tracking-widest">{t.it.labels.devices}</span>
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-2xl font-black text-cyan-500">{automationOpts.itDevices}</span>
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest">Einheiten</span>
                                  </div>
                                </div>
                                <input type="range" min="1" max="20" value={automationOpts.itDevices} onChange={e => setAutomationOpts(p => ({...p, itDevices: parseInt(e.target.value)}))} className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 appearance-none accent-cyan-400 rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-400/30" aria-label={t.it.labels.devices} />
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
            <div className="sticky top-12 bg-white/70 dark:bg-[#0d1425]/95 backdrop-blur-2xl p-10 xl:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-2xl relative">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">{t.summaryTitle}</h3>
              <div className="space-y-6 mb-12">
                <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.finance ? (calcType === 'business' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/10' : 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10') : 'border-slate-200 dark:border-white/10 grayscale'}`}>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{calcType === 'business' ? 'Finanzen' : 'Steuern'}</span>
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
                {calcType === 'private' && privateOpts.insuranceCheck && (
                   <div className="flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 transition-all">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Kombi-Rabatt</span>
                      <span className="text-emerald-500 font-black">- CHF 20.-</span>
                   </div>
                )}
                {calcType === 'business' && (
                  <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.payroll ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/10' : 'border-slate-200 dark:border-white/10 grayscale opacity-40'}`}>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Personal ({payrollOpts.employees} MA)</span>
                    <span className="text-slate-900 dark:text-white font-black">{activeBlocks.payroll ? `CHF ${payrollOpts.employees * PRICES.business.payroll[payrollOpts.level]}.-` : '—'}</span>
                  </div>
                )}
                {calcType === 'business' && (
                  <div className={`flex justify-between items-center text-sm p-4 rounded-2xl border-l-4 transition-all ${activeBlocks.automation && (automationOpts.epost || automationOpts.managedIt) ? 'border-cyan-400 bg-cyan-50/50 dark:bg-cyan-400/10' : 'border-slate-200 dark:border-white/10 grayscale opacity-40'}`}>
                    <span className="font-bold text-slate-700 dark:text-slate-300">IT & Automation</span>
                    <span className="text-slate-900 dark:text-white font-black">{activeBlocks.automation && (automationOpts.epost || automationOpts.managedIt) ? `CHF ${(automationOpts.epost ? 135 : 0) + (automationOpts.managedIt ? automationOpts.itDevices * 130 : 0)}.-` : '—'}</span>
                  </div>
                )}
              </div>
              <div className="h-px bg-slate-200 dark:bg-white/10 mb-12" />
              <div className="mb-14">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300">{calcType === 'business' ? t.monthly : 'Preis total'}</p>
                  <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">{t.vatInfo}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  {isAssociation ? (
                    <span className="text-3xl font-black text-slate-900 dark:text-white leading-tight">Ab CHF {animatedPrice}.-<br/><span className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-normal">+ individuelle Finanzen</span></span>
                  ) : (
                    <>
                      <span className={`text-base font-black ${accentClass}`}>CHF</span>
                      <span className="text-7xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{animatedPrice}</span>
                    </>
                  )}
                </div>
              </div>
              <button onClick={onRequestQuote} className={`w-full py-7 text-white rounded-[2rem] font-black text-[15px] uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-1.5 active:translate-y-0 flex items-center justify-center gap-4 focus:outline-none focus:ring-4 focus:ring-offset-2 ${isAssociation ? 'bg-slate-900 dark:bg-slate-800' : (calcType === 'business' ? 'bg-blue-600 focus:ring-blue-500' : 'bg-amber-500 focus:ring-amber-500')}`}>
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
