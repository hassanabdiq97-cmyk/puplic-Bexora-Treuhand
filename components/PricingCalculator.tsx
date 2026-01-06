
import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Check, User, Building2, Users, BarChart3, FileText, ShieldCheck, 
  Cpu, HardDrive, Settings, Zap, ArrowLeft, TrendingUp, GraduationCap,
  Home, Wallet, Landmark, Info, Plus, Lock, ArrowRight, Laptop
} from 'lucide-react';
import { gsap } from 'gsap';

interface PricingCalculatorProps {
  initialType: 'private' | 'business';
  onClose: () => void;
  lang: 'DE' | 'FR';
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ initialType, onClose, lang }) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [calcType, setCalcType] = useState<'private' | 'business'>(initialType);

  const t = {
    DE: {
      header: 'Ihr Fixpreis in 60 Sekunden',
      subtitle: 'Transparent. Bindungsfrei. Schweizer Qualität.',
      back: 'Zurück',
      progress: 'Ihr Fortschritt',
      activeBlocks: 'Blöcke aktiv',
      summaryTitle: 'Ihre Gesamtofferte',
      monthly: 'Monatlicher Fixpreis',
      oneTime: 'Einmalige Investition',
      cta: 'Gesamtofferte anfordern',
      trust: 'SSL-verschlüsselt & DSGVO-konform',
      inclusive: 'ALLES INKLUSIVE:',
      support: 'Persönliche Beratung & Support',
      typeSelection: 'Für wen dürfen wir rechnen?',
      types: {
        private: 'Privatperson',
        business: 'Unternehmen'
      },
      finance: { 
        title: calcType === 'business' ? 'Finanzbuchhaltung & Steuern' : 'Steuern & Vorsorge',
        desc: calcType === 'business' ? 'Kernmodul für Buchführung und Steueroptimierung.' : 'Professionelle Steuererklärung und Beratung.',
        q1: 'Welche Rechtsform hat Ihr Unternehmen?',
        q2: 'Wie hoch ist Ihr monatliches Belegvolumen?',
        q3: 'Sind Sie MWST-pflichtig?',
        q4: 'Gewünschter Abschluss-Intervall?',
        // Private specific
        p_q1: 'Welche Dienstleistung benötigen Sie?',
        p_q2: 'Ihr Zivilstand?',
        p_q3: 'Besitzen Sie Immobilien?',
      },
      payroll: { 
        title: 'Lohn & Personalverwaltung', 
        desc: 'Pünktliche Lohnläufe und HR-Administration.',
        q1: 'Wie viele Mitarbeitende beschäftigen Sie?',
        q2: 'Welchen Service-Level benötigen Sie?'
      },
      it: { 
        title: 'IT, Automation & ePost', 
        desc: 'Digitaler Posteingang und IT-Infrastruktur.',
        q1: 'Wählen Sie Ihre Automations-Module:',
        labels: {
          devices: 'Anzahl IT-Arbeitsplätze',
          epostDesc: 'Tägliche Digitalisierung Ihrer physischen Post. Direkt in Ihr System – weltweit abrufbar.'
        }
      }
    }
  }[lang] || { /* Fallback */ };

  // --- STATE ---
  const [activeBlocks, setActiveBlocks] = useState({ finance: true, payroll: false, automation: false });
  
  // Business State
  const [financeOpts, setFinanceOpts] = useState({ legalForm: 'gmbh', volume: 'm', vat: 'saldo', interval: 'year' });
  const [payrollOpts, setPayrollOpts] = useState({ employees: 1, level: 'base' });
  const [automationOpts, setAutomationOpts] = useState({ epost: false, managedIt: false, itDevices: 1, aiAudit: false });

  // Private State
  const [privateOpts, setPrivateOpts] = useState({ service: 'tax', civilStatus: 'single', realEstate: 'none' });

  // --- PRICING ENGINE ---
  const PRICES = {
    business: {
      base: { single: 80, gmbh: 150, association: 0 },
      volume: { s: 50, m: 150, l: 400 },
      vat: { none: 0, saldo: 80, effective: 160 },
      interval: { year: 0, quarter: 120 },
      payroll: { base: 35, full: 65 },
      epost: 135,
      it: 130,
      audit: 1500
    },
    private: {
      base: { tax: 150, advice: 250 },
      status: { single: 0, married: 50 },
      realEstate: { none: 0, one: 100, multiple: 250 }
    }
  };

  const activeCount = Object.values(activeBlocks).filter(Boolean).length;
  const isIndividualFinance = calcType === 'business' && activeBlocks.finance && financeOpts.legalForm === 'association';

  const totals = useMemo(() => {
    let monthly = 0;
    let oneTime = 0;

    if (calcType === 'business') {
      if (activeBlocks.finance) {
        monthly += (PRICES.business.base as any)[financeOpts.legalForm];
        monthly += (PRICES.business.volume as any)[financeOpts.volume];
        monthly += (PRICES.business.vat as any)[financeOpts.vat];
        monthly += (PRICES.business.interval as any)[financeOpts.interval];
      }
      if (activeBlocks.payroll) {
        monthly += (payrollOpts.employees * (PRICES.business.payroll as any)[payrollOpts.level]);
      }
      if (activeBlocks.automation) {
        if (automationOpts.epost) monthly += PRICES.business.epost;
        if (automationOpts.managedIt) monthly += (automationOpts.itDevices * PRICES.business.it);
        if (automationOpts.aiAudit) oneTime += PRICES.business.audit;
      }
    } else {
      // Private Calculation (One Time Fees mostly, but handled as 'monthly' for the display or separated)
      // For this UI, let's treat Tax Return as "One Time" usually, but here as "Base Price" to fit the UI slot.
      // Let's assume the calculator shows the "Total" which might be annual for private.
      // To fit the "Monthly Fixprice" label, we might want to adjust labels, but sticking to the request:
      let cost = 0;
      if (activeBlocks.finance) {
         cost += (PRICES.private.base as any)[privateOpts.service];
         cost += (PRICES.private.status as any)[privateOpts.civilStatus];
         cost += (PRICES.private.realEstate as any)[privateOpts.realEstate];
      }
      // Private is typically once a year, so we display it as the main price
      oneTime = cost; 
      monthly = 0; // Or display as 0 monthly, and X one-time.
    }

    return { monthly, oneTime };
  }, [activeBlocks, financeOpts, payrollOpts, automationOpts, privateOpts, calcType]);

  useEffect(() => {
    const obj = { val: animatedPrice };
    // For private, we animate the oneTime price if monthly is 0
    const target = calcType === 'business' ? totals.monthly : totals.oneTime;
    
    gsap.to(obj, {
      val: target,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => setAnimatedPrice(Math.round(obj.val))
    });
  }, [totals.monthly, totals.oneTime, calcType]);

  const ToggleSwitch = ({ active, onToggle, colorClass }: any) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-14 h-8 rounded-full relative cursor-pointer transition-all duration-500 ${active ? colorClass : 'bg-slate-200 dark:bg-slate-800'}`}
    >
      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  );

  const SelectionCard = ({ selected, onClick, title, price, desc, icon: Icon, colorClass, badge, children }: any) => {
    const colors: any = {
      blue: { border: 'border-blue-600', bg: 'bg-blue-600/5', shadow: 'shadow-[0_0_20px_rgba(37,99,235,0.15)]', text: 'text-blue-600' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-500/5', shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]', text: 'text-purple-500' },
      cyan: { border: 'border-cyan-400', bg: 'bg-cyan-400/5', shadow: 'shadow-[0_0_20_rgba(34,211,238,0.15)]', text: 'text-cyan-500' },
      amber: { border: 'border-amber-500', bg: 'bg-amber-500/5', shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]', text: 'text-amber-500' }
    };
    const c = colors[colorClass] || colors.blue;

    return (
      <div 
        onClick={onClick}
        className={`relative p-7 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col group ${
          selected ? `${c.border} ${c.bg} ${c.shadow}` : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 hover:border-slate-200'
        }`}
      >
        {badge && <span className={`absolute -top-2 -right-2 px-2.5 py-1 rounded-md text-[9px] font-black text-white ${colorClass === 'blue' ? 'bg-blue-600' : (colorClass === 'amber' ? 'bg-amber-500' : 'bg-purple-500')}`}>{badge}</span>}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-black uppercase tracking-widest ${selected ? c.text : 'text-slate-400'}`}>{price}</span>
          {selected ? <Check size={14} className={c.text} strokeWidth={3} /> : <div className="w-4 h-4 rounded-full border border-slate-200" />}
        </div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-2">{title}</h4>
        {desc && <p className="text-xs text-slate-500 font-light leading-relaxed mb-2">{desc}</p>}
        {selected && children && <div className="mt-8 pt-8 border-t border-slate-200/10" onClick={e => e.stopPropagation()}>{children}</div>}
      </div>
    );
  };

  const accentColor = calcType === 'business' ? 'blue' : 'amber';
  const accentClass = calcType === 'business' ? 'text-blue-600' : 'text-amber-500';
  const bgAccentClass = calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500';

  return (
    <div className="fixed inset-0 z-[120] bg-slate-50 dark:bg-slate-950 overflow-y-auto font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={onClose} className={`flex items-center gap-2 font-bold text-sm mb-12 transition-all group ${accentClass} hover:opacity-80`}>
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t.back}
        </button>
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">{t.header}</h2>
          <p className="text-slate-500 font-light text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* PROGRESS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.progress}</span>
                <span className={`text-xs font-black ${accentClass}`}>{activeCount}/{calcType === 'business' ? '3' : '1'} {t.activeBlocks}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-700 ease-out ${bgAccentClass}`} style={{ width: `${(activeCount / (calcType === 'business' ? 3 : 1)) * 100}%` }} />
              </div>
            </div>

            {/* BLOCK 1: FINANCE / TAXES */}
            <div className={`bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${activeBlocks.finance ? (calcType === 'business' ? 'border-blue-600 shadow-xl shadow-blue-600/5' : 'border-amber-500 shadow-xl shadow-amber-500/5') : 'border-slate-100 dark:border-white/5 opacity-80'}`}>
              
              <div className={`p-8 md:p-10 flex items-center justify-between cursor-pointer ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600/5' : 'bg-amber-500/5') : ''}`} onClick={() => setActiveBlocks(p => ({...p, finance: !p.finance}))}>
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${activeBlocks.finance ? (calcType === 'business' ? 'bg-blue-600 text-white shadow-lg' : 'bg-amber-500 text-white shadow-lg') : 'bg-slate-100 text-slate-400'}`}>
                    {calcType === 'business' ? <BarChart3 size={32} /> : <User size={32} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-2">{t.finance.title}</h3>
                    <p className="text-sm text-slate-500">{t.finance.desc}</p>
                  </div>
                </div>
                <ToggleSwitch active={activeBlocks.finance} colorClass={calcType === 'business' ? 'bg-blue-600' : 'bg-amber-500'} onToggle={() => setActiveBlocks(p => ({...p, finance: !p.finance}))} />
              </div>
              
              {activeBlocks.finance && (
                <div className="p-10 md:p-14 pt-0 border-t border-slate-100 dark:border-white/5 space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                  
                  {/* TYPE SELECTION TOGGLE */}
                  <div className="pt-14">
                     <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.typeSelection}</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectionCard 
                          title={t.types.business} 
                          price="Business" 
                          icon={Building2} 
                          selected={calcType === 'business'} 
                          onClick={() => setCalcType('business')} 
                          colorClass="blue" 
                        />
                        <SelectionCard 
                          title={t.types.private} 
                          price="Private" 
                          icon={User} 
                          selected={calcType === 'private'} 
                          onClick={() => setCalcType('private')} 
                          colorClass="amber" 
                        />
                     </div>
                  </div>

                  {/* DYNAMIC CONTENT */}
                  {calcType === 'business' ? (
                    <>
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title="Einzelfirma" price="80.-/Mo" selected={financeOpts.legalForm === 'single'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'single'}))} colorClass="blue" />
                          <SelectionCard title="GmbH / AG" price="150.-/Mo" selected={financeOpts.legalForm === 'gmbh'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'gmbh'}))} colorClass="blue" badge="Top Choice" />
                          <SelectionCard title="Verein / Stiftung" price="Auf Anfrage" selected={financeOpts.legalForm === 'association'} onClick={() => setFinanceOpts(p => ({...p, legalForm: 'association'}))} colorClass="blue" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q2}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title="Bis 20 Belege" price="+ 50.-" desc="Ideal für Kleinbetriebe" selected={financeOpts.volume === 's'} onClick={() => setFinanceOpts(p => ({...p, volume: 's'}))} colorClass="blue" />
                          <SelectionCard title="Bis 100 Belege" price="+ 150.-" desc="KMU Standard-Paket" selected={financeOpts.volume === 'm'} onClick={() => setFinanceOpts(p => ({...p, volume: 'm'}))} colorClass="blue" />
                          <SelectionCard title="Über 100 Belege" price="+ 400.-" desc="Für hohe Transaktionen" selected={financeOpts.volume === 'l'} onClick={() => setFinanceOpts(p => ({...p, volume: 'l'}))} colorClass="blue" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                          <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q3}</label>
                          <div className="space-y-5">
                            <SelectionCard title="Nicht pflichtig" price="+ 0.-" selected={financeOpts.vat === 'none'} onClick={() => setFinanceOpts(p => ({...p, vat: 'none'}))} colorClass="blue" />
                            <SelectionCard title="Saldosteuersatz" price="+ 80.-" selected={financeOpts.vat === 'saldo'} onClick={() => setFinanceOpts(p => ({...p, vat: 'saldo'}))} colorClass="blue" />
                            <SelectionCard title="Effektive Methode" price="+ 160.-" selected={financeOpts.vat === 'effective'} onClick={() => setFinanceOpts(p => ({...p, vat: 'effective'}))} colorClass="blue" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.q4}</label>
                          <div className="space-y-5">
                            <SelectionCard title="Jährlicher Abschluss" price="+ 0.-" selected={financeOpts.interval === 'year'} onClick={() => setFinanceOpts(p => ({...p, interval: 'year'}))} colorClass="blue" />
                            <SelectionCard title="Quartalsabschluss" price="+ 120.-" selected={financeOpts.interval === 'quarter'} onClick={() => setFinanceOpts(p => ({...p, interval: 'quarter'}))} colorClass="blue" badge="Empfohlen" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* PRIVATE CONTENT */
                    <>
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title="Steuererklärung" price="150.-/Jahr" selected={privateOpts.service === 'tax'} onClick={() => setPrivateOpts(p => ({...p, service: 'tax'}))} colorClass="amber" badge="Basis" />
                          <SelectionCard title="Steuerberatung" price="250.-/Jahr" selected={privateOpts.service === 'advice'} onClick={() => setPrivateOpts(p => ({...p, service: 'advice'}))} colorClass="amber" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q2}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectionCard title="Ledig / Alleinstehend" price="+ 0.-" selected={privateOpts.civilStatus === 'single'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'single'}))} colorClass="amber" />
                          <SelectionCard title="Verheiratet" price="+ 50.-" selected={privateOpts.civilStatus === 'married'} onClick={() => setPrivateOpts(p => ({...p, civilStatus: 'married'}))} colorClass="amber" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-400 mb-8 block tracking-widest">{t.finance.p_q3}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <SelectionCard title="Keine" price="+ 0.-" selected={privateOpts.realEstate === 'none'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'none'}))} colorClass="amber" />
                          <SelectionCard title="Eine Liegenschaft" price="+ 100.-" selected={privateOpts.realEstate === 'one'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'one'}))} colorClass="amber" />
                          <SelectionCard title="Mehrere" price="+ 250.-" selected={privateOpts.realEstate === 'multiple'} onClick={() => setPrivateOpts(p => ({...p, realEstate: 'multiple'}))} colorClass="amber" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* BLOCK 2: PAYROLL (Business Only) */}
            {calcType === 'business' && (
              <div className={`bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${activeBlocks.payroll ? 'border-purple-500 shadow-xl shadow-purple-500/5' : 'border-slate-100 dark:border-white/5 opacity-80'}`}>
                <div className={`p-8 md:p-10 flex items-center justify-between cursor-pointer ${activeBlocks.payroll ? 'bg-purple-500/5' : ''}`} onClick={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))}>
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${activeBlocks.payroll ? 'bg-purple-500 text-white shadow-lg' : 'bg-purple-100 text-purple-600'}`}>
                      <Users size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-2">{t.payroll.title}</h3>
                      <p className="text-sm text-slate-500">{t.payroll.desc}</p>
                    </div>
                  </div>
                  <ToggleSwitch active={activeBlocks.payroll} colorClass="bg-purple-500" onToggle={() => setActiveBlocks(p => ({...p, payroll: !p.payroll}))} />
                </div>

                {activeBlocks.payroll && (
                  <div className="p-10 md:p-14 pt-0 border-t border-slate-100 dark:border-white/5 space-y-20 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="mt-14 pt-14 flex flex-col bg-slate-100/30 dark:bg-white/5 p-12 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5">
                        <div className="w-full flex justify-between items-end mb-12">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{t.payroll.q1}</label>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-purple-500 tabular-nums">{payrollOpts.employees}</span>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Pers.</span>
                          </div>
                        </div>
                        <input type="range" min="1" max="50" value={payrollOpts.employees} onChange={e => setPayrollOpts(p => ({...p, employees: parseInt(e.target.value)}))} className="w-full h-3 bg-slate-200 dark:bg-slate-800 appearance-none accent-purple-500 rounded-full cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase text-slate-400 mb-10 block tracking-widest">{t.payroll.q2}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard title="Basis Lohnlauf" price="35.- / MA" desc="Abrechnungen & Quellensteuer-Administration" selected={payrollOpts.level === 'base'} onClick={() => setPayrollOpts(p => ({...p, level: 'base'}))} colorClass="purple" />
                        <SelectionCard title="Full Service HR" price="65.- / MA" desc="Inkl. Verträge, Mutationen & Korrespondenz" selected={payrollOpts.level === 'full'} onClick={() => setPayrollOpts(p => ({...p, level: 'full'}))} colorClass="purple" badge="Premium" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BLOCK 3: IT & AUTOMATION (Business Only) */}
            {calcType === 'business' && (
              <div className={`bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${activeBlocks.automation ? 'border-cyan-400 shadow-xl shadow-cyan-400/5' : 'border-slate-100 dark:border-white/5 opacity-80'}`}>
                <div className={`p-8 md:p-10 flex items-center justify-between cursor-pointer ${activeBlocks.automation ? 'bg-cyan-400/5' : ''}`} onClick={() => setActiveBlocks(p => ({...p, automation: !p.automation}))}>
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${activeBlocks.automation ? 'bg-cyan-400 text-slate-950 shadow-lg' : 'bg-cyan-50 text-cyan-600'}`}>
                      <Cpu size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-2">{t.it.title}</h3>
                      <p className="text-sm text-slate-500">{t.it.desc}</p>
                    </div>
                  </div>
                  <ToggleSwitch active={activeBlocks.automation} colorClass="bg-cyan-400" onToggle={() => setActiveBlocks(p => ({...p, automation: !p.automation}))} />
                </div>

                {activeBlocks.automation && (
                  <div className="p-10 md:p-14 pt-0 border-t border-slate-100 dark:border-white/5 space-y-20 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="pt-14">
                      <label className="text-[11px] font-black uppercase text-slate-400 mb-12 block tracking-widest">{t.it.q1}</label>
                      
                      <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <SelectionCard 
                            title="ePost Connect" 
                            price="135.- / Mo" 
                            desc={t.it.labels.epostDesc} 
                            selected={automationOpts.epost} 
                            onClick={() => setAutomationOpts(p => ({...p, epost: !p.epost}))} 
                            colorClass="cyan" 
                          />
                          
                          <SelectionCard 
                            title="Managed IT-Support" 
                            price="130.- / PC" 
                            desc="Professioneller Full-Service Support für Ihre Hardware & Software." 
                            selected={automationOpts.managedIt} 
                            onClick={() => setAutomationOpts(p => ({...p, managedIt: !p.managedIt}))} 
                            colorClass="cyan"
                          >
                            <div className="space-y-8 pt-6">
                                <div className="flex justify-between items-end mb-6">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.it.labels.devices}</span>
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-2xl font-black text-cyan-500 tabular-nums">{automationOpts.itDevices}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PC</span>
                                  </div>
                                </div>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="20" 
                                  value={automationOpts.itDevices} 
                                  onChange={e => setAutomationOpts(p => ({...p, itDevices: parseInt(e.target.value)}))} 
                                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 appearance-none accent-cyan-400 rounded-full cursor-pointer" 
                                />
                            </div>
                          </SelectionCard>
                        </div>

                        <div className="pt-8">
                          <SelectionCard 
                            title="KI Prozess-Audit" 
                            price="1'500.-" 
                            desc="Einmalige Tiefenanalyse zur Optimierung Ihrer digitalen Workflows mittels KI-Technologie." 
                            selected={automationOpts.aiAudit} 
                            onClick={() => setAutomationOpts(p => ({...p, aiAudit: !p.aiAudit}))} 
                            colorClass="cyan" 
                            badge="Einmalig" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* RIGHT: SUMMARY SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white dark:bg-[#0d1425] p-10 md:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
              {/* Decorative Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] pointer-events-none ${calcType === 'business' ? 'bg-blue-600/10' : 'bg-amber-500/10'}`} />
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 tracking-tight flex items-center gap-4 relative z-10">
                <div className={`w-2.5 h-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] ${bgAccentClass}`} /> {t.summaryTitle}
              </h3>
              
              <div className="space-y-7 mb-14 relative z-10">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-slate-400 font-medium">Finanzen & Steuern</span>
                  <span className={activeBlocks.finance ? 'text-slate-900 dark:text-white font-black' : 'text-slate-300'}>
                    {activeBlocks.finance ? (
                      calcType === 'business' ? (
                         isIndividualFinance ? 'Individuell' : `CHF ${totals.monthly - (activeBlocks.payroll ? (payrollOpts.employees * (PRICES.business.payroll as any)[payrollOpts.level]) : 0) - (activeBlocks.automation && automationOpts.epost ? 135 : 0) - (activeBlocks.automation && automationOpts.managedIt ? automationOpts.itDevices * 130 : 0)}.-`
                      ) : (
                        `CHF ${totals.oneTime}.-`
                      )
                    ) : 'Inaktiv'}
                  </span>
                </div>
                {calcType === 'business' && activeBlocks.payroll && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-slate-400 font-medium">Lohnwesen ({payrollOpts.employees} MA)</span>
                    <span className="text-slate-900 dark:text-white font-black">CHF {payrollOpts.employees * (PRICES.business.payroll as any)[payrollOpts.level]}.-</span>
                  </div>
                )}
                {calcType === 'business' && activeBlocks.automation && (automationOpts.epost || automationOpts.managedIt) && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-slate-400 font-medium">IT & Automation</span>
                    <span className="text-slate-900 dark:text-white font-black">CHF {(automationOpts.epost ? 135 : 0) + (automationOpts.managedIt ? automationOpts.itDevices * 130 : 0)}.-</span>
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/10 mb-12 relative z-10" />

              <div className="mb-14 relative z-10">
                <p className="text-[11px] font-black uppercase text-slate-400 mb-5 tracking-widest">{calcType === 'business' ? t.monthly : 'Jahresgebühr'}</p>
                {isIndividualFinance ? (
                   <div className="flex items-center gap-3">
                     <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Auf Anfrage</span>
                   </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-black tracking-widest ${accentClass}`}>CHF</span>
                    <span className="text-7xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{animatedPrice}</span>
                    <span className={`text-3xl font-black ${accentClass}`}>.-</span>
                  </div>
                )}
                {totals.oneTime > 0 && calcType === 'business' && (
                  <div className="mt-10 p-6 bg-cyan-400/5 rounded-3xl border border-cyan-400/20 flex justify-between items-center shadow-lg shadow-cyan-400/5">
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">{t.oneTime}</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">CHF {totals.oneTime}.-</span>
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-12 relative z-10">
                <p className="text-[11px] font-black text-slate-900 dark:text-white tracking-widest uppercase">{t.inclusive}</p>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 shadow-sm border border-green-500/20"><Check size={14} strokeWidth={4} /></div>
                  {t.support}
                </div>
              </div>

              <button className={`w-full py-7 text-white rounded-[2rem] font-black text-[15px] uppercase tracking-widest shadow-2xl transition-all transform hover:-translate-y-1.5 active:translate-y-0 flex items-center justify-center gap-4 group/btn relative z-10 ${calcType === 'business' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'}`}>
                {t.cta} <ArrowRight size={22} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </button>

              <div className="mt-12 flex flex-col items-center gap-2 relative z-10 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Lock size={12} /> {t.trust}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="h-40" />
    </div>
  );
};

export default PricingCalculator;
