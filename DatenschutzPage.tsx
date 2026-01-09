
import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Database, Globe, Mail } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import Logo from './components/Logo';

interface DatenschutzPageProps {
  onBack: () => void;
  lang: 'DE' | 'FR';
}

const DatenschutzPage: React.FC<DatenschutzPageProps> = ({ onBack, lang }) => {
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
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">Datenschutz.</h1>
        
        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-blue-400">
              <ShieldCheck size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'DE' ? '1. Allgemeines' : '1. Généralités'}</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {lang === 'DE' 
                ? 'Gestützt auf das neue Schweizer Datenschutzgesetz (nDSG) haben Sie Anspruch auf Schutz Ihrer Privatsphäre sowie auf Schutz vor Missbrauch Ihrer persönlichen Daten. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.' 
                : 'Conformément à la nouvelle loi suisse sur la protection des données (nLPD), vous avez droit à la protection de votre sphère privée ainsi qu\'à une protection contre l\'usage abusif de vos données personnelles.'}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-cyan-400">
              <Globe size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'DE' ? '2. Hosting (Vercel)' : '2. Hébergement (Vercel)'}</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {lang === 'DE' 
                ? 'Unsere Webseite wird bei Vercel Inc. gehostet. Beim Zugriff auf unsere Webseite werden automatisch Informationen (Logfiles) erhoben, die Ihr Browser an Vercel übermittelt. Dies umfasst IP-Adresse, Datum, Uhrzeit, Browser-Anfrage und allgemein übertragene Informationen zum Betriebssystem resp. Browser.' 
                : 'Notre site web est hébergé par Vercel Inc. Lors de l\'accès à notre site, des informations (fichiers journaux) sont automatiquement collectées et transmises par votre navigateur à Vercel.'}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-purple-400">
              <Database size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'DE' ? '3. Kontaktformular (Formspree)' : '3. Formulaire de contact (Formspree)'}</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {lang === 'DE' 
                ? 'Für die Verarbeitung Ihrer Anfragen über unser Kontaktformular nutzen wir den Dienst Formspree. Die von Ihnen eingegebenen Daten (Name, E-Mail, Nachricht) werden verschlüsselt an Formspree übertragen und dort zum Zweck der Bearbeitung gespeichert.' 
                : 'Pour le traitement de vos demandes via notre formulaire de contact, nous utilisons le service Formspree. Les données saisies sont transmises de manière cryptée à Formspree.'}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-emerald-400">
              <Lock size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'DE' ? '4. SSL-Verschlüsselung' : '4. Cryptage SSL'}</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {lang === 'DE' 
                ? 'Diese Webseite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an der Adresszeile "https://" und am Schloss-Symbol.' 
                : 'Ce site web utilise un cryptage SSL pour des raisons de sécurité et pour protéger la transmission de contenus confidentiels.'}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-blue-400">
              <Mail size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'DE' ? '5. Ihre Rechte' : '5. Vos droits'}</h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {lang === 'DE' 
                ? 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.' 
                : 'Vous avez en tout temps le droit d\'obtenir gratuitement des informations sur vos données personnelles enregistrées.'}
            </p>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{lang === 'DE' ? 'Verantwortliche Stelle' : 'Responsable'}</p>
              <p className="text-white font-bold">Pano & Partner AG</p>
              <p className="text-slate-400">info@bexora.ch</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DatenschutzPage;
