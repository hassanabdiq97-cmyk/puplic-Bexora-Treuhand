
import React from 'react';
import { ArrowLeft, Building2, User, Mail, MapPin, Hash } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import Logo from './components/Logo';

interface ImpressumPageProps {
  onBack: () => void;
  lang: 'DE' | 'FR';
}

const ImpressumPage: React.FC<ImpressumPageProps> = ({ onBack, lang }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/30">
      <nav className="fixed w-full z-[110] top-0 py-6 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
            <Logo className="h-10 w-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
            <span className="text-xl font-black tracking-tighter text-white">Bexora</span>
          </div>
          <MagneticButton variant="outline" className="!px-6 !py-2 !text-[10px] !border-white/10" onClick={onBack}>
            <div className="flex items-center gap-2"><ArrowLeft size={14}/> {lang === 'DE' ? 'ZURÜCK' : 'RETOUR'}</div>
          </MagneticButton>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">Impressum.</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white/5 border border-white/5">
            <div className="flex items-center gap-4 text-blue-400">
              <Building2 size={24} />
              <h2 className="text-xl font-bold">{lang === 'DE' ? 'Unternehmen' : 'Entreprise'}</h2>
            </div>
            <div className="space-y-2 text-slate-400 font-light text-lg">
              <p className="text-white font-bold">Pano & Partner AG</p>
              <p>Solothurnstrasse 44</p>
              <p>2543 Lengnau</p>
              <p>Schweiz</p>
            </div>
          </section>

          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white/5 border border-white/5">
            <div className="flex items-center gap-4 text-cyan-400">
              <User size={24} />
              <h2 className="text-xl font-bold">{lang === 'DE' ? 'Vertretung' : 'Représentation'}</h2>
            </div>
            <div className="space-y-2 text-slate-400 font-light text-lg">
              <p className="text-white font-bold">Francesco Lanzo</p>
              <p>{lang === 'DE' ? 'Geschäftsführung' : 'Direction'}</p>
            </div>
          </section>

          <section className="space-y-8 p-10 rounded-[2.5rem] bg-white/5 border border-white/5 md:col-span-2">
            <div className="flex items-center gap-4 text-emerald-400">
              <Hash size={24} />
              <h2 className="text-xl font-bold">Register & Kontakt</h2>
            </div>
            <div className="space-y-4 text-slate-400 font-light text-lg">
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-500">UID</span>
                <span className="text-white">CHE-215.111.954</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-500">Email</span>
                <a href="mailto:info@bexora.ch" className="text-white hover:text-blue-400 transition-colors">info@bexora.ch</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-slate-500">Web</span>
                <a href="https://bexora.ch" className="text-white hover:text-blue-400 transition-colors">www.bexora.ch</a>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 text-slate-500 text-sm font-light leading-relaxed">
          <p>{lang === 'DE' ? 'Handelsregister: Kanton Bern.' : 'Registre du commerce : Canton de Berne.'}</p>
          <p className="mt-4 italic">© 2015 Pano & Partner AG. {lang === 'DE' ? 'Alle Rechte vorbehalten.' : 'Tous droits réservés.'}</p>
        </div>
      </main>
    </div>
  );
};

export default ImpressumPage;
