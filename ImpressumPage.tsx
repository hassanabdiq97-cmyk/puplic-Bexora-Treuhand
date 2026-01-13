
'use client';

import React from 'react';
import { ArrowLeft, Building2, User, Mail, Hash, CheckCircle } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import Logo from './components/Logo';

interface ImpressumPageProps {
  onBack?: () => void;
  lang?: 'DE' | 'FR';
}

const ImpressumPage: React.FC<ImpressumPageProps> = ({ onBack, lang = 'DE' }) => {
  const translations = {
    DE: {
      title: 'IMPRESSUM',
      subtitle: 'Rechtliche Informationen & Transparenz',
      company: 'Unternehmen',
      rep: 'Vertretung',
      management: 'Geschäftsführung',
      register: 'Handelsregister',
      contact: 'Kontakt',
      registryText: 'Eingetragen im Handelsregister des Kantons Bern.',
      rights: 'Alle Rechte vorbehalten.',
      back: 'ZURÜCK ZUR STARTSEITE'
    },
    FR: {
      title: 'MENTIONS LÉGALES',
      subtitle: 'Informations juridiques & transparence',
      company: 'Entreprise',
      rep: 'Représentation',
      management: 'Direction',
      register: 'Registre du commerce',
      contact: 'Contact',
      registryText: 'Inscrit au registre du commerce du canton de Berne.',
      rights: 'Tous droits réservés.',
      back: 'RETOUR À L\'ACCUEIL'
    }
  };

  const t = translations[lang] || translations.DE;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-cyan-500/30 transition-colors duration-500">
      {/* Navigation Overlay */}
      <nav className="fixed w-full z-[110] top-0 py-6 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={onBack} className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity">
            <Logo className="h-10 w-10 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" aria-hidden={true} />
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">Bexora</span>
          </div>
          <MagneticButton variant="outline" className="!px-6 !py-2 !text-[10px] !border-slate-300 dark:!border-white/10 hover:!bg-slate-100 dark:hover:!bg-white/5" onClick={onBack}>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"><ArrowLeft size={14}/> {t.back}</div>
          </MagneticButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-40 pb-20 px-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-20">
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-400 dark:from-white dark:to-slate-500">{t.title}.</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-light border-l-2 border-cyan-500 pl-6">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Company */}
          <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 group-hover:translate-x-0 translate-x-10 transition-all duration-500">
               <Building2 className="text-blue-500 opacity-20" size={100} />
            </div>
            <div className="flex items-center gap-4 text-blue-600 dark:text-blue-500 mb-8">
              <div className="p-3 rounded-2xl bg-blue-500/10"><Building2 size={24} /></div>
              <h2 className="text-lg font-black uppercase tracking-widest">{t.company}</h2>
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300 font-light text-lg relative z-10">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pano & Partner AG</p>
              <p>Solothurnstrasse 44</p>
              <p>2543 Lengnau</p>
              <p>Schweiz / Suisse</p>
            </div>
          </div>

          {/* Card: Representation */}
          <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan-400/30 dark:hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 group-hover:translate-x-0 translate-x-10 transition-all duration-500">
               <User className="text-cyan-400 opacity-20" size={100} />
            </div>
            <div className="flex items-center gap-4 text-cyan-600 dark:text-cyan-400 mb-8">
              <div className="p-3 rounded-2xl bg-cyan-400/10"><User size={24} /></div>
              <h2 className="text-lg font-black uppercase tracking-widest">{t.rep}</h2>
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300 font-light text-lg relative z-10">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Francesco Lanzo</p>
              <p className="opacity-80">{t.management}</p>
            </div>
          </div>

          {/* Card: Register & Contact (Full Width) */}
          <div className="md:col-span-2 group p-10 md:p-14 rounded-[2.5rem] bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
               <div className="space-y-8 flex-1">
                  <div className="flex items-center gap-4 text-emerald-500 mb-2">
                    <div className="p-3 rounded-2xl bg-emerald-500/10"><Hash size={24} /></div>
                    <h2 className="text-lg font-black uppercase tracking-widest">{t.register}</h2>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">UID / IDE</span>
                        <span className="text-2xl font-mono text-white">CHE-215.111.954</span>
                     </div>
                     <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</span>
                        <span className="inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
                           <CheckCircle size={12} /> Aktiv / Actif
                        </span>
                     </div>
                  </div>
               </div>

               <div className="w-px bg-white/5 hidden md:block"></div>

               <div className="space-y-8 flex-1">
                  <div className="flex items-center gap-4 text-purple-400 mb-2">
                    <div className="p-3 rounded-2xl bg-purple-400/10"><Mail size={24} /></div>
                    <h2 className="text-lg font-black uppercase tracking-widest">{t.contact}</h2>
                  </div>
                  <div className="space-y-4">
                     <a href="mailto:info@bexora.ch" className="block group/link">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">E-Mail</span>
                        <span className="text-xl text-white group-hover/link:text-purple-400 transition-colors">info@bexora.ch</span>
                     </a>
                     <a href="https://bexora.ch" className="block group/link">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Web</span>
                        <span className="text-xl text-white group-hover/link:text-purple-400 transition-colors">www.bexora.ch</span>
                     </a>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-wider">
          <p>{t.registryText}</p>
          <p>© {new Date().getFullYear()} Pano & Partner AG. {t.rights}</p>
        </div>
      </main>
    </div>
  );
};

export default ImpressumPage;
