
import React from 'react';
import { ShieldCheck, Lock, Database, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Logo from '../../components/Logo';

export const metadata = {
  title: 'Datenschutz | Pano & Partner AG',
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/30">
      <nav className="fixed w-full z-[110] top-0 py-6 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <Logo className="h-10 w-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
            <span className="text-xl font-black tracking-tighter text-white">Bexora</span>
          </Link>
          <Link href="/" className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-black tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
            <ArrowLeft size={14}/> ZURÜCK
          </Link>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">Datenschutz.</h1>
        
        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-blue-400">
              <ShieldCheck size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">1. Allgemeines (nDSG)</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              Gestützt auf das neue Schweizer Datenschutzgesetz (nDSG) haben Sie Anspruch auf Schutz Ihrer Privatsphäre sowie auf Schutz vor Missbrauch Ihrer persönlichen Daten. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-cyan-400">
              <Globe size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">2. Hosting (Vercel)</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              Unsere Webseite wird bei Vercel Inc. gehostet. Beim Zugriff auf unsere Webseite werden automatisch Informationen (Logfiles) erhoben, die Ihr Browser an Vercel übermittelt. Dies umfasst IP-Adresse, Datum, Uhrzeit und Browser-Informationen.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-purple-400">
              <Database size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">3. Formspree Verarbeitung</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              Für die Verarbeitung Ihrer Anfragen nutzen wir den Dienst Formspree. Die von Ihnen eingegebenen Daten (Name, E-Mail, Nachricht) werden verschlüsselt an Formspree übertragen und dort zum Zweck der Bearbeitung gespeichert.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-emerald-400">
              <Lock size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">4. SSL-Verschlüsselung</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              Diese Webseite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an der Adresszeile "https://" und am Schloss-Symbol in Ihrem Browser.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
