
import { Calculator, Users, User, Cpu, ShieldCheck, BarChart3, TrendingUp, Sparkles, Heart, GraduationCap } from 'lucide-react';
import { Partner } from './types';

export const TRANSLATIONS = {
  DE: {
    nav: [
      { label: 'Dienstleistungen', href: '#services' },
      { label: 'Karriere', href: '#careers' },
      { label: 'Kontakt', href: '#contact' },
    ],
    hero: {
      badge: 'Bexora Treuhand — Lengnau / Solothurn',
      title: 'Ihre Finanzen.',
      titleAccent: 'Glasklar geführt.',
      desc: 'Wir befreien Sie von administrativen Sorgen. Durch digitalisierte Prozesse und proaktive Kostenoptimierung schaffen wir echte Freiräume für Ihr Kerngeschäft.',
      ctaPrimary: 'Jetzt Kennenlernen',
      ctaSecondary: 'Preise berechnen'
    },
    sections: {
      services: {
        title: 'Fokussierte Kompetenz.',
        accent: 'Kompetenz',
        desc: 'Vier Spezialgebiete, eine Vision: Maximale Effizienz für Unternehmen und Private.',
        cta: 'Jetzt Preis berechnen'
      },
      pricing: {
        title: 'Ehrliche Preise.',
        desc: 'Wählen Sie Ihre Rechtsform und berechnen Sie Ihr massgeschneidertes Paket in Sekunden.'
      },
      careers: {
        badge: 'Arbeiten bei Bexora',
        title: 'Wir suchen Talente,',
        accent: 'keine Aktenfresser.',
        desc: 'Bexora ist mehr als ein Treuhandbüro. Wir sind ein Tech-Hub für Finanzen. Wir suchen Menschen, die Digitalisierung als Chance sehen.',
        cta: 'Details ansehen',
        empty: 'Nichts passendes dabei?',
        emptyDesc: 'Wir freuen uns auf Ihre Initiativbewerbung.',
        benefits: [
          { icon: Sparkles, title: 'Moderne IT', desc: 'Cloud-Tools & KI.' },
          { icon: Heart, title: 'Flexibilität', desc: 'Homeoffice & flexible Modelle.' },
          { icon: GraduationCap, title: '發展', desc: 'Support bei Fachausweisen.' }
        ]
      }
    },
    services: [
      { 
        id: 1, 
        title: 'Finanzen & Steuern', 
        description: 'Vom Jahresabschluss bis zur Steuerplanung. Präzise und vorausschauend.', 
        icon: BarChart3,
        color: 'blue',
        details: ['Finanzbuchhaltung', 'MWST-Abrechnungen', 'Steueroptimierung', 'Jahresabschlüsse']
      },
      { 
        id: 2, 
        title: 'HR & Lohn', 
        description: 'Pünktliche und rechtssichere Lohnverarbeitung für Ihr Team.', 
        icon: Users,
        color: 'purple',
        details: ['Lohnläufe', 'Sozialversicherungen', 'Arbeitsverträge', 'Quellensteuer']
      },
      { 
        id: 3, 
        title: 'IT & Automation', 
        description: 'Wir implementieren digitale Workflows und automatisieren Ihre Post.', 
        icon: Cpu,
        color: 'cyan',
        details: ['Belegwesen', 'Digitale Poststelle', 'KI-Automation', 'IT-Support']
      },
      { 
        id: 4, 
        title: 'Privatpersonen', 
        description: 'Professionelle Steuererklärungen und Finanzplanung für Private.', 
        icon: User,
        color: 'amber',
        details: ['Steuererklärungen', 'Vorsorgeberatung', 'Grundstückgewinn', 'Erbrecht']
      }
    ]
  },
  FR: {
    nav: [
      { label: 'Services', href: '#services' },
      { label: 'Carrière', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      badge: 'Fiduciaire Bexora — Lengnau / Soleure',
      title: 'Vos finances.',
      titleAccent: 'Gérées avec clarté.',
      desc: 'Nous vous libérons des soucis administratifs. Grâce à des processus digitalisés et une optimisation proactive des coûts, nous creons un espace pour votre croissance.',
      ctaPrimary: 'Nous découvrir',
      ctaSecondary: 'Calculer le prix'
    },
    sections: {
      services: {
        title: 'Compétence ciblée.',
        accent: 'Compétence',
        desc: 'Quatre domaines d\'expertise, eine vision : Efficacité maximale pour entreprises et particuliers.',
        cta: 'Calculer le prix'
      },
      pricing: {
        title: 'Prix honnêtes.',
        desc: 'Choisissez votre forme juridique et calculez votre pack sur mesure en quelques secondes.'
      },
      careers: {
        badge: 'Travailler chez Bexora',
        title: 'Nous cherchons des talents,',
        accent: 'pas des gratte-papiers.',
        desc: 'Bexora est plus qu\'une fiduciaire. C\'est un hub tech pour la finance. Nous cherchons des personnes qui voient la numérisation comme une chance.',
        cta: 'Voir les détails',
        empty: 'Rien ne vous correspond ?',
        emptyDesc: 'Nous nous réjouissons de recevoir votre candidature spontanée.',
        benefits: [
          { icon: Sparkles, title: 'IT moderne', desc: 'Outils cloud & IA.' },
          { icon: Heart, title: 'Flexibilité', desc: 'Homeoffice & modèles flexibles.' },
          { icon: GraduationCap, title: 'Évolution', desc: 'Soutien aux brevets fédéraux.' }
        ]
      }
    },
    services: [
      { 
        id: 1, 
        title: 'Finances & Impôts', 
        description: 'Du bouclage annuel à la planification fiscale. Précis et prévoyant.', 
        icon: BarChart3,
        color: 'blue',
        details: ['Comptabilité financière', 'Décomptes TVA', 'Optimisation fiscale', 'Bouclages annuels']
      },
      { 
        id: 2, 
        title: 'RH & Salaires', 
        description: 'Gestion des salaires ponctuelle et sûre pour votre équipe.', 
        icon: Users,
        color: 'purple',
        details: ['Traitement des salaires', 'Assurances sociales', 'Contrats de travail', 'Impôt à la source']
      },
      { 
        id: 3, 
        title: 'IT & Automation', 
        description: 'Nous implémentons des workflows digitaux et automatisons votre courrier.', 
        icon: Cpu,
        color: 'cyan',
        details: ['Gestion des pièces', 'Courrier digital', 'Automation IA', 'Support IT']
      },
      { 
        id: 4, 
        title: 'Particuliers', 
        description: 'Déclarations d\'impôts professionnelles et conseil pour particuliers.', 
        icon: User,
        color: 'amber',
        details: ['Déclarations d\'impôts', 'Prévoyance', 'Gain immobilier', 'Successions']
      }
    ]
  }
};

export const PARTNERS: Partner[] = [
  { name: 'Bexio', logoText: 'bexio' },
  { name: 'Abacus', logoText: 'ABACUS' },
  { name: 'Sage', logoText: 'sage' },
  { name: 'Klara', logoText: 'KLARA' },
];
