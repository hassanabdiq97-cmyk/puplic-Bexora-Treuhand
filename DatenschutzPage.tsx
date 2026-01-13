
'use client';

import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Database, Globe, Server, UserCheck } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import Logo from './components/Logo';

interface DatenschutzPageProps {
  onBack?: () => void;
  lang?: 'DE' | 'FR';
}

const DatenschutzPage: React.FC<DatenschutzPageProps> = ({ onBack, lang = 'DE' }) => {
  const translations = {
    DE: {
      title: 'DATENSCHUTZ',
      subtitle: 'Ihre Privatsphäre hat höchste Priorität.',
      back: 'ZURÜCK ZUR STARTSEITE',
      contact: 'Kontakt für Datenschutzanliegen',
      sections: [
        {
          title: 'Allgemeines & Rechtsgrundlage',
          icon: ShieldCheck,
          color: 'blue',
          text: 'Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein.'
        },
        {
          title: 'Hosting & Logfiles',
          icon: Server,
          color: 'cyan',
          text: 'Diese Webseite wird bei Vercel Inc. gehostet. Der Provider erhebt automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (IP-Adresse, Browser, OS, Zeit). Diese Daten sind für den technischen Betrieb zwingend erforderlich.'
        },
        {
          title: 'Datenverarbeitung via Formulare',
          icon: Database,
          color: 'purple',
          text: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Wir nutzen hierfür den Dienst Formspree.'
        },
        {
          title: 'SSL-/TLS-Verschlüsselung',
          icon: Lock,
          color: 'emerald',
          text: 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.'
        },
        {
          title: 'Rechte der betroffenen Person',
          icon: UserCheck,
          color: 'amber',
          text: 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.'
        }
      ]
    },
    FR: {
      title: 'CONFIDENTIALITÉ',
      subtitle: 'Votre vie privée est notre priorité.',
      back: 'RETOUR À L\'ACCUEIL',
      contact: 'Contact pour la protection des données',
      sections: [
        {
          title: 'Généralités & Base légale',
          icon: ShieldCheck,
          color: 'blue',
          text: 'Conformément à l\'article 13 de la Constitution fédérale suisse et aux dispositions relatives à la protection des données (LPD), toute personne a droit à la protection de sa sphère privée ainsi qu\'à la protection contre l\'usage abusif de ses données personnelles. Nous respectons ces dispositions.'
        },
        {
          title: 'Hébergement & Logs',
          icon: Server,
          color: 'cyan',
          text: 'Ce site est hébergé par Vercel Inc. Le fournisseur collecte automatiquement des informations dans des fichiers journaux de serveur (IP, navigateur, OS, heure). Ces données sont indispensables pour le fonctionnement technique.'
        },
        {
          title: 'Traitement via formulaires',
          icon: Database,
          color: 'purple',
          text: 'Si vous nous envoyez des demandes via le formulaire de contact, vos données, y compris les coordonnées fournies, seront stockées chez nous pour le traitement de la demande et en cas de questions de suivi. Nous utilisons le service Formspree.'
        },
        {
          title: 'Cryptage SSL/TLS',
          icon: Lock,
          color: 'emerald',
          text: 'Ce site utilise un cryptage SSL/TLS pour des raisons de sécurité. Vous pouvez reconnaître une connexion cryptée au fait que la barre d\'adresse du navigateur passe de "http://" à "https://" et au symbole de cadenas.'
        },
        {
          title: 'Droits des personnes concernées',
          icon: UserCheck,
          color: 'amber',
          text: 'Vous avez le droit d\'obtenir à tout moment et gratuitement des informations sur vos données personnelles enregistrées, leur origine et destinataire et le but du traitement des données, ainsi qu\'un droit de rectification, de blocage ou de suppression de ces données.'
        }
      ]
    }
  };

  const t = translations[lang] || translations.DE;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-purple-500/30 transition-colors duration-500">
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

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-24 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-6 ring-1 ring-purple-500/20">
             <ShieldCheck size={32} />
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">{t.title}</h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        
        <div className="space-y-6">
          {t.sections.map((section, idx) => (
            <section key={idx} className="group p-8 md:p-10 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/20 dark:hover:bg-white/[0.04] transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  section.color === 'blue' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white' : 
                  section.color === 'cyan' ? 'bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900' :
                  section.color === 'purple' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-500 group-hover:bg-purple-500 group-hover:text-white' :
                  section.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' :
                  'bg-amber-500/10 text-amber-600 dark:text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                  <section.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">{section.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                    {section.text}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
        
        <div className="mt-24 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/10 text-center">
            <h3 className="text-slate-900 dark:text-white font-bold mb-2">{t.contact}</h3>
            <a href="mailto:info@bexora.ch" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors text-lg">info@bexora.ch</a>
        </div>
      </main>
    </div>
  );
};

export default DatenschutzPage;
