
import React from 'react';
import { ShieldCheck, Lock, Database, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import LegalNavigation from '../../../components/LegalNavigation';

export const metadata: Metadata = {
  title: 'Déclaration de confidentialité (nLPD) | Bexora',
  description: 'Informations sur le traitement des données conformément à la nouvelle loi fédérale sur la protection des données (nLPD).',
  alternates: {
    canonical: 'https://fr.bexora.ch/datenschutz',
    languages: {
      'de-CH': 'https://bexora.ch/datenschutz',
      'fr-CH': 'https://fr.bexora.ch/datenschutz',
    },
  },
  robots: { index: true, follow: true }
};

export default function DatenschutzPage() {
  const t = {
    title: 'Confidentialité.',
    back: 'RETOUR',
    sections: [
      {
        title: '1. Généralités (nLPD)',
        icon: ShieldCheck,
        color: 'blue',
        text: 'Conformément à la nouvelle loi suisse sur la protection des données (nLPD), vous avez droit à la protection de votre sphère privée ainsi qu\'à une protection contre l\'usage abusif de vos données personnelles. Nous prenons la protection de vos données très au sérieux.'
      },
      {
        title: '2. Hébergement (Vercel)',
        icon: Globe,
        color: 'cyan',
        text: 'Notre site web est hébergé par Vercel Inc. Lors de l\'accès à notre site web, des informations (fichiers journaux) sont automatiquement collectées et transmises par votre navigateur à Vercel. Cela inclut l\'adresse IP, la date, l\'heure et les informations du navigateur.'
      },
      {
        title: '3. Traitement Formspree',
        icon: Database,
        color: 'purple',
        text: 'Pour le traitement de vos demandes, nous utilisons le service Formspree. Les données que vous saisissez (nom, e-mail, message) sont transmises de manière cryptée à Formspree et y sont stockées à des fins de traitement.'
      },
      {
        title: '4. Cryptage SSL',
        icon: Lock,
        color: 'emerald',
        text: 'Ce site web utilise un cryptage SSL pour des raisons de sécurité. Vous pouvez reconnaître une connexion cryptée à la barre d\'adresse "https://" et à l\'icône de cadenas dans votre navigateur.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600/30 transition-colors duration-500">
      <LegalNavigation lang="FR" backLabel={t.back} />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-slate-900 dark:text-white">{t.title}</h1>
        
        <div className="space-y-16">
          {t.sections.map((section, idx) => (
            <section key={idx} className="space-y-6">
              <div className={`flex items-center gap-4 text-${section.color}-600 dark:text-${section.color}-400`}>
                <section.icon size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tight">{section.title}</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-400 font-light leading-relaxed text-lg">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
