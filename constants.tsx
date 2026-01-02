
import { Calculator, PieChart, TrendingUp, Users, Cpu, FileText, ShieldCheck } from 'lucide-react';
import { NavLink, Service, BlogPost, Job, Partner } from './types';

export const TRANSLATIONS = {
  DE: {
    nav: [
      { label: 'Über uns', href: '#about' },
      { label: 'Leistungen', href: '#services' },
      { label: 'Blog', href: '#blog' },
      { label: 'Karriere', href: '#career' },
      { label: 'Kontakt', href: '#contact' },
    ],
    hero: {
      badge: 'Treuhand & Innovation aus Lengnau',
      title: 'Ihr Unternehmen.',
      titleAccent: 'Absolute Klarheit.',
      desc: 'Wir befreien Sie von administrativer Last. Mit digitalen Prozessen und proaktiver Beratung schaffen wir Raum für das, was zählt: Ihr Wachstum.',
      ctaPrimary: 'Erstgespräch',
      ctaSecondary: 'Preise berechnen'
    },
    sections: {
      about: {
        title: 'Radikale Kostentransparenz.',
        desc: 'Wir verwalten nicht nur Ihre Buchhaltung – wir optimieren Ihre Ausgabenstruktur. Durch unsere proaktive Analyse identifizieren wir unnötige Fixkosten und steuerliche Ineffizienzen, bevor sie Ihr Ergebnis belasten.',
        cta: 'Kosten-Audit anfragen',
        vaultTitle: 'Zertifizierte Experten-Sicherheit.',
        vaultDesc: 'Datenintegrität nach Schweizer Bankenstandard. Ihre sensiblen Finanzdaten sind durch modernste Verschlüsselung, regelmässige Audits und proaktives Monitoring aktiv geschützt.',
        optimizationTitle: 'Proaktive Ausgaben-Optimierung.',
        optimizationDesc: 'Jeder Beleg wird bei uns nicht nur verbucht, sondern auf Einsparungspotenzial geprüft. Wir sind Ihr strategischer Partner für messbare Kostenreduktion.'
      },
      services: {
        title: 'Skalierbare Lösungen.',
        accent: 'Lösungen',
        desc: 'Wir verwalten nicht nur Ihre Zahlen – wir optimieren Ihre gesamte Unternehmensstruktur für maximale Effizienz und minimalen Zeitaufwand.'
      },
      pricing: {
        title: 'Transparente Kalkulation.',
        desc: 'Nutzen Sie unseren interaktiven Rechner für eine sofortige, verbindliche Einschätzung Ihres Budgets.'
      },
      team: {
        title: 'Köpfe hinter Bexora.',
        desc: 'Nahbar, kompetent und technologisch versiert. Wir sprechen Ihre Sprache.'
      },
      blog: {
        title: 'Insights & News.',
        desc: 'Aktuelles aus der Welt der Steuern, Finanzen und Digitalisierung.'
      }
    },
    services: [
      { 
        id: 1, 
        title: 'Digitale Finanzbuchhaltung', 
        description: 'Verwandeln Sie Ihre Buchhaltung von einer Pflichtaufgabe in ein strategisches Instrument. Wir digitalisieren Ihre Belegflüsse komplett und garantieren fehlerfreie Abschlüsse – in Echtzeit.', 
        icon: PieChart,
        details: [
          'Effektive & Saldo-MWST Abrechnung', 
          'Quartals- & Jahresabschlüsse (OR/Swiss GAAP)', 
          'Vollautomatisches Belegwesen via Cloud', 
          'Liquiditätsplanung & Reporting'
        ]
      },
      { 
        id: 2, 
        title: 'Strategische Steuerberatung', 
        description: 'Zahlen Sie nur das, was absolut notwendig ist. Wir entwickeln vorausschauende Steuerstrategien für KMU und Privatpersonen, die Ihre Liquidität langfristig schützen.', 
        icon: Calculator,
        details: [
          'KMU Steuerplanung & Optimierung', 
          'Komplexe Privat-Steuererklärungen', 
          'Interkantonale & Int. Steuerfragen', 
          'Vertretung vor Steuerbehörden'
        ]
      },
      { 
        id: 3, 
        title: 'Lohn & Personaladministration', 
        description: 'Minimieren Sie Ihr Haftungsrisiko. Von der präzisen monatlichen Lohnabrechnung bis zum komplexen HR-Management übernehmen wir die volle Verantwortung für Ihr Personalwesen.', 
        icon: Users,
        details: [
          'Rechtssichere Lohnbuchhaltung', 
          'Quellensteuer- & Sozialversicherungs-Management', 
          'Arbeitsverträge & HR-Fullservice', 
          'Begleitung bei AHV-Revisionen'
        ]
      },
      { 
        id: 4, 
        title: 'IT & Automation Services', 
        description: 'Die Zukunft der Administration ist automatisiert. Wir implementieren KI-gestützte Workflows und ePost-Lösungen, damit Sie nie wieder einen physischen Brief öffnen müssen.', 
        icon: Cpu,
        details: [
          'Automation Audit & Prozessdesign', 
          'ePost-Digitalisierungsservice', 
          'Managed Digital Workplace', 
          'Höchste Schweizer Datensicherheit'
        ],
        label: 'powered by NextLab'
      },
      { 
        id: 5, 
        title: 'Unternehmensberatung', 
        description: 'Wir begleiten Sie durch jede Phase Ihres Unternehmerlebens. Von der mutigen Gründung über die effiziente Skalierung bis hin zur wertoptimierten Nachfolgeplanung.', 
        icon: TrendingUp,
        details: [
          'Gründungsbegleitung & Rechtsformwahl', 
          'Businessplanung & Finanzierungsberatung', 
          'Nachfolge- & Verkaufsstrategien', 
          'Restrukturierungen & Sanierungen'
        ]
      }
    ],
    blog: [
      { id: 1, category: 'Steuern', title: 'Steueroptimierung 2025: Was KMU jetzt wissen müssen.', date: '12. Mai 2024', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
      { id: 2, category: 'Digitalisierung', title: 'Künstliche Intelligenz in der Buchhaltung.', date: '05. Mai 2024', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' },
      { id: 3, category: 'Recht', title: 'Neue MWST-Sätze: Eine Checkliste für Gastronomen.', date: '28. April 2024', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  FR: {
    nav: [
      { label: 'À propos', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Blog', href: '#blog' },
      { label: 'Carrière', href: '#career' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      badge: 'Fiduciaire & Innovation à Lengnau',
      title: 'Votre entreprise.',
      titleAccent: 'Clarté absolue.',
      desc: 'Nous vous libérons du fardeau administratif. Grâce à des processus digitaux et des conseils proactifs, nous créons de\'espace pour votre croissance.',
      ctaPrimary: 'Entretien initial',
      ctaSecondary: 'Calculer les prix'
    },
    sections: {
      about: {
        title: 'Transparence radicale des coûts.',
        desc: 'Nous ne gérons pas seulement votre comptabilité, nous optimisons votre structure de dépenses. Nous identifions les coûts fixes inutiles et les inefficacités fiscales.',
        cta: 'Demander un audit de coûts',
        vaultTitle: 'Sécurité experte certifiée.',
        vaultDesc: 'Intégrité des données selon les normes bancaires suisses. Vos données financières sont activement protégées par un cryptage de pointe.',
        optimizationTitle: 'Optimisation proactive des dépenses.',
        optimizationDesc: 'Chaque pièce comptable est examinée pour son potentiel d\'économie. Nous sommes votre partenaire stratégique pour la réduction des coûts.'
      },
      services: {
        title: 'Solutions évolutives.',
        accent: 'Solutions',
        desc: 'Nous ne nous contentons pas de gérer vos chiffres - nous optimisons toute votre structure pour une efficacité maximale.'
      },
      pricing: {
        title: 'Calcul transparent.',
        desc: 'Utilisez notre calculateur interactif pour une estimation immédiate et ferme de votre budget.'
      },
      team: {
        title: 'L\'équipe Bexora.',
        desc: 'Accessibles, compétents et férus de technologie. Nous parlons votre langue.'
      },
      blog: {
        title: 'Insights & News.',
        desc: 'Actualités du monde de la fiscalité, de la finance et de la numérisation.'
      }
    },
    services: [
      { id: 1, title: 'Comptabilité digitale', description: 'Transformez votre comptabilité en instrument stratégique. Nous digitalisons vos flux et garantissons des clôtures parfaites.', icon: PieChart, details: ['TVA effective & forfait', 'Clôtures OR/Swiss GAAP', 'Gestion cloud', 'Reporting en temps réel'] },
      { id: 2, title: 'Conseil Fiscal', description: 'Optimisation stratégique pour PME et particuliers. Nous protégeons votre liquidité à long terme.', icon: Calculator, details: ['Planification PME', 'Déclarations complexes', 'Conseil intercantonal', 'Représentation fiscale'] },
      { id: 3, title: 'Salaires & RH', description: 'Réduisez vos risques de responsabilité. De la paie mensuelle à la gestion RH complète.', icon: Users, details: ['Gestion des salaires', 'Assurances sociales', 'Contrats de travail', 'Révisions AVS'] },
      { id: 4, title: 'IT & Automation', description: 'L\'avenir de l\'administration est automatisé. Workflows IA et solutions ePost.', icon: Cpu, details: ['Audit Automation', 'Service ePost digital', 'Managed Workplace', 'Sécurité suisse'], label: 'powered by NextLab' },
      { id: 5, title: 'Conseil Business', description: 'Nous vous accompagnons à chaque étape : création, croissance et succession.', icon: TrendingUp, details: ['Création d\'entreprise', 'Plans d\'affaires', 'Stratégies de vente', 'Restructurations'] }
    ],
    blog: [
      { id: 1, category: 'Fiscalité', title: 'Optimisation fiscale 2025: ce que les PME doivent savoir.', date: '12 mai 2024', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
      { id: 2, category: 'Digitalisation', title: 'L\'intelligence artificielle dans la comptabilité.', date: '05 mai 2024', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' },
      { id: 3, category: 'Droit', title: 'Nouveaux taux de TVA: une checklist.', date: '28 avril 2024', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' }
    ]
  }
};

export const NAV_LINKS = TRANSLATIONS.DE.nav;
export const SERVICES = TRANSLATIONS.DE.services;

export const PARTNERS: Partner[] = [
  { name: 'Bexio', logoText: 'bexio' },
  { name: 'Abacus', logoText: 'ABACUS' },
  { name: 'Sage', logoText: 'sage' },
  { name: 'Klara', logoText: 'KLARA' },
];
