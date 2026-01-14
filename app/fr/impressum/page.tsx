
'use client';

import React from 'react';
import { Building2, User, Hash } from 'lucide-react';
import type { Metadata } from 'next';
import LegalNavigation from '../../../components/LegalNavigation';

const metadata: Metadata = {
  title: 'Mentions Légales | Bexora Fiduciaire SA',
  description: 'Informations juridiques, registre du commerce (CHE-215.111.954) et contact de Pano & Partner AG (Bexora).',
  alternates: {
    canonical: 'https://fr.bexora.ch/impressum',
    languages: {
      'de-CH': 'https://bexora.ch/impressum',
      'fr-CH': 'https://fr.bexora.ch/impressum',
    },
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function ImpressumPage() {
  const t = {
    title: 'Impressum.',
    company: 'Entreprise',
    rep: 'Représentation',
    management: 'Direction',
    register: 'Registre & Contact',
    registryText: 'Registre du commerce : Canton de Berne.',
    rights: 'Tous droits réservés.',
    back: 'RETOUR'
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600/30 transition-colors duration-500">
      <LegalNavigation lang="FR" backLabel={t.back} />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-slate-900 dark:text-white">{t.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-500">
            <div className="flex items-center gap-4 text-blue-600 dark:text-blue-400">
              <Building2 size={24} />
              <h2 className="text-xl font-bold">{t.company}</h2>
            </div>
            <div className="space-y-2 text-slate-600 dark:text-slate-300 font-light text-lg">
              <p className="text-slate-900 dark:text-white font-bold">Pano & Partner AG</p>
              <p>Solothurnstrasse 44</p>
              <p>2543 Lengnau</p>
              <p>Suisse</p>
            </div>
          </section>

          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-500">
            <div className="flex items-center gap-4 text-cyan-600 dark:text-cyan-400">
              <User size={24} />
              <h2 className="text-xl font-bold">{t.rep}</h2>
            </div>
            <div className="space-y-2 text-slate-600 dark:text-slate-300 font-light text-lg">
              <p className="text-slate-900 dark:text-white font-bold">Francesco Lanzo</p>
              <p>{t.management}</p>
            </div>
          </section>

          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-500 md:col-span-2">
            <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400">
              <Hash size={24} />
              <h2 className="text-xl font-bold">{t.register}</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 font-light text-lg">
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">UID</span>
                <span className="text-slate-900 dark:text-white">CHE-215.111.954</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Email</span>
                <a href="mailto:info@bexora.ch" className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@bexora.ch</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Web</span>
                <a href="https://bexora.ch" className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">www.bexora.ch</a>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed transition-colors duration-500">
          <p>{t.registryText}</p>
          <p className="mt-4 italic">© 2015 Pano & Partner AG. {t.rights}</p>
        </div>
      </main>
    </div>
  );
}
