
import React, { Suspense } from 'react';
import { ShieldCheck, Lock, Database, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import LegalNavigation from '../../components/LegalNavigation';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung (nDSG) | Bexora Treuhand',
  description: 'Informationen zum Umgang mit Daten gemäss neuem Schweizer Datenschutzgesetz (nDSG) bei Bexora.',
  alternates: {
    canonical: 'https://bexora.ch/datenschutz',
    languages: {
      'de-CH': 'https://bexora.ch/datenschutz',
      'fr-CH': 'https://fr.bexora.ch/datenschutz',
    },
  },
  robots: { index: true, follow: true }
};

export default function DatenschutzPage() {
  const t = {
    title: 'Datenschutz.',
    back: 'ZURÜCK',
    sections: [
      {
        title: '1. Allgemeines (nDSG)',
        icon: ShieldCheck,
        color: 'blue',
        text: 'Gestützt auf das neue Schweizer Datenschutzgesetz (nDSG) haben Sie Anspruch auf Schutz Ihrer Privatsphäre sowie auf Schutz vor Missbrauch Ihrer persönlichen Daten. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.'
      },
      {
        title: '2. Hosting (Vercel)',
        icon: Globe,
        color: 'cyan',
        text: 'Unsere Webseite wird bei Vercel Inc. gehostet. Beim Zugriff auf unsere Webseite werden automatisch Informationen (Logfiles) erhoben, die Ihr Browser an Vercel übermittelt. Dies umfasst IP-Adresse, Datum, Uhrzeit und Browser-Informationen.'
      },
      {
        title: '3. Formspree Verarbeitung',
        icon: Database,
        color: 'purple',
        text: 'Für die Verarbeitung Ihrer Anfragen nutzen wir den Dienst Formspree. Die von Ihnen eingegebenen Daten (Name, E-Mail, Nachricht) werden verschlüsselt an Formspree übertragen und dort zum Zweck der Bearbeitung gespeichert.'
      },
      {
        title: '4. SSL-Verschlüsselung',
        icon: Lock,
        color: 'emerald',
        text: 'Diese Webseite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an der Adresszeile "https://" und am Schloss-Symbol in Ihrer Browserzeile.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600/30 transition-colors duration-500">
      <LegalNavigation lang="DE" backLabel={t.back} />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-slate-900 dark:text-white">{t.title}</h1>
        
        <div className="space-y-16">
          {t.sections.map((section, idx) => (
            <section key={idx} className="space-y-6">
              <div className={`flex items-center gap-4 text-${section.color}-600 dark:text-${section.color}-400`}>
                <section.icon size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tight">{section.title}</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-lg">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
