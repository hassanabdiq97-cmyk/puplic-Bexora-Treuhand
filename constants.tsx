
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
      badge: 'Bexora Treuhand — Lengnau / Seeland',
      title: 'Fokus auf Ihr Business.',
      titleAccent: 'Wir erledigen den Rest.',
      desc: 'Wir verbinden persönliche Expertise mit digitaler Effizienz. Erhalten Sie finanzielle Klarheit in Echtzeit und proaktive Beratung, die Ihr Unternehmen nachhaltig weiterbringt.',
      ctaPrimary: 'Erstgespräch sichern',
      ctaSecondary: 'Preisrechner'
    },
    sections: {
      services: {
        title: 'Ganzheitliche Begleitung.',
        accent: 'Begleitung',
        desc: 'Vier Kompetenzbereiche, eine Vision: Maximale Effizienz durch digitale Exzellenz und persönliche Fachexpertise für KMUs im Seeland.',
        cta: 'Individueller Fixpreis'
      },
      pricing: {
        title: 'Transparente Preisgestaltung.',
        desc: 'Keine versteckten Kosten. Berechnen Sie Ihr massgeschneidertes Treuhand-Paket basierend auf Ihren realen Bedürfnissen.'
      },
      careers: {
        badge: 'Karriere bei Bexora',
        title: 'Gestalten Sie die',
        accent: 'digitale Transformation.',
        desc: 'Keine Lust auf verstaubte Aktenordner? Bexora ist der Tech-Hub für moderne Finanzprozesse. Wir suchen Talente, die Innovation leben.',
        cta: 'Positionen entdecken',
        close: 'Schliessen',
        apply: 'Jetzt bewerben',
        tasksTitle: 'Ihre Verantwortungen',
        reqTitle: 'Ihre Qualifikationen',
        empty: 'Talent-Pool',
        emptyDesc: 'Wir nehmen laufend Top-Talente in unseren Pool auf. Überzeugen Sie uns.',
        benefits: [
          { icon: Sparkles, title: 'Tech-Stack', desc: 'Cloud-First & KI-Support.' },
          { icon: Heart, title: 'Work-Life', desc: 'Hybride Arbeitsmodelle.' },
          { icon: GraduationCap, title: 'Weiterbildung', desc: 'Unterstützung bei Fachexperten.' }
        ],
        jobs: [
          {
            id: 1,
            title: 'Mandatsleiter/in Treuhand',
            pensum: '80 - 100%',
            location: 'Lengnau / Hybrid',
            tags: ['Steuerexperte', 'Consulting'],
            tasks: [
              'Fachliche Führung komplexer Kundenmandate im KMU-Umfeld',
              'Erstellung von Abschlüssen nach OR und fachspezifische Beratung',
              'Umfassende Steuerplanung für KMU und deren Inhaber',
              'Begleitung von Gründungsprozessen und Nachfolgeregelungen',
              'Prozessberatung zur digitalen Transformation beim Kunden'
            ],
            requirements: [
              'Dipl. Treuhandexperte oder Fachausweis mit relevanter Erfahrung',
              'Sicherer Umgang mit digitalen Ökosystemen (Abacus, bexio etc.)',
              'Analytisches Denken und hohe Beratungskompetenz',
              'Lösungsorientierte und exakte Arbeitsweise'
            ]
          },
          {
            id: 2,
            title: 'Sachbearbeiter/in Treuhand',
            pensum: '60 - 100%',
            location: 'Lengnau BE',
            tags: ['Digital Native', 'Support'],
            tasks: [
              'Führen von Finanz- und Lohnbuchhaltungen in der Cloud',
              'Erstellung von MWST-Abrechnungen und Zwischenabschlüssen',
              'Unterstützung bei der Digitalisierung des Belegwesens',
              'Aktive Korrespondenz mit Behörden und Versicherungen',
              'Mitarbeit bei spannenden Sonderprojekten'
            ],
            requirements: [
              'Kaufmännische Grundbildung mit Fokus Treuhand/Rechnungswesen',
              'Affinität für moderne Softwarelösungen und Automatisierung',
              'Exakte Arbeitsweise und hohe Zuverlässigkeit',
              'Motivation zur fachlichen Weiterentwicklung'
            ]
          }
        ]
      },
      contact: {
        title: 'Kontakt aufnehmen.',
        info: {
          address: 'Solothurnstrasse 44, 2543 Lengnau'
        },
        form: {
          name: 'Vorname Nachname',
          email: 'E-Mail Adresse',
          message: 'Wie können wir Sie unterstützen?',
          btn: 'Anfrage senden'
        },
        footer: {
          copyright: '© 2015 Pano & Partner AG',
          automatedBy: 'AUTOMATISIERT DURCH'
        }
      }
    },
    services: [
      { 
        id: 1, 
        title: 'Finanzen & Steuern', 
        description: 'Vom Jahresabschluss bis zur strategischen Steueroptimierung. Wir sichern Ihre finanzielle Transparenz und Liquidität.', 
        icon: BarChart3,
        color: 'blue',
        details: ['Finanzbuchhaltung', 'MWST-Beratung', 'Steuerplanung', 'Jahresabschlüsse']
      },
      { 
        id: 2, 
        title: 'Lohnbuchhaltung & Personaladministration', 
        description: 'Effizientes Lohnwesen und rechtssichere HR-Prozesse. Wir entlasten Sie bei allen Mitarbeiterfragen komplett.', 
        icon: Users,
        color: 'purple',
        details: ['Lohnverarbeitung', 'Sozialversicherungen', 'HR-Consulting', 'Quellensteuer']
      },
      { 
        id: 3, 
        title: 'IT & Automation', 
        description: 'Wir implementieren kostenoptimierende Workflows und automatisieren Ihr Belegwesen nachhaltig mit Bexio & Abacus.', 
        icon: Cpu,
        color: 'cyan',
        details: ['KI-Automation', 'Digitale Poststelle', 'Cloud-Integration', 'Prozess-Audit']
      },
      { 
        id: 4, 
        title: 'Private Steuerberatung & Erklärung', 
        description: 'Professionelle Steuererklärungen und Vorsorgeplanung für anspruchsvolle Privatpersonen im Raum Biel/Seeland.', 
        icon: User,
        color: 'amber',
        details: ['Steuererklärung', 'Vorsorgeanalyse', 'Erbrecht', 'Grundstücksteuern']
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
      badge: 'Fiduciaire Bexora — Lengnau / Seeland',
      title: 'Concentrez-vous sur l\'essentiel.',
      titleAccent: 'Nous gérons le reste.',
      desc: 'Nous allions expertise personnelle et efficacité numérique. Obtenez une clarté financière en temps réel et des conseils proactifs qui font avancer votre entreprise.',
      ctaPrimary: 'Réserver un entretien',
      ctaSecondary: 'Calculateur d\'honoraires'
    },
    sections: {
      services: {
        title: 'Accompagnement global.',
        accent: 'Accompagnement',
        desc: 'Quatre domaines d\'expertise, eine vision : efficacité maximale grâce à l\'excellence numérique pour les PME du Seeland.',
        cta: 'Forfait individuel'
      },
      pricing: {
        title: 'Honoraires transparents.',
        desc: 'Pas de coûts cachés. Calculez votre pack fiduciaire sur mesure en fonction de vos besoins réels.'
      },
      careers: {
        badge: 'Carrière chez Bexora',
        title: 'Façonnez la',
        accent: 'transformation digitale.',
        desc: 'Bexora est plus qu\'une fiduciaire. Nous sommes un hub technologique pour les finances. Rejoignez l\'innovation.',
        cta: 'Découvrir les postes',
        close: 'Fermer',
        apply: 'Postuler',
        tasksTitle: 'Vos tâches',
        reqTitle: 'Profil',
        empty: 'Vivier de talents',
        emptyDesc: 'Nous sommes toujours intéressés par des profils motivés. Convainquez-nous.',
        benefits: [
          { icon: Sparkles, title: 'Tech-Stack', desc: 'Cloud & IA.' },
          { icon: Heart, title: 'Work-Life', desc: 'Modèles hybrides.' },
          { icon: GraduationCap, title: 'Formation', desc: 'Soutien aux diplômes.' }
        ],
        jobs: [
          {
            id: 1,
            title: 'Chef/fe de mandat',
            pensum: '80 - 100%',
            location: 'Lengnau / Hybride',
            tags: ['Expert fiscal', 'Conseil'],
            tasks: [
              'Gestion de mandats complexes pour PME',
              'Établissement des comptes et conseil fiscal',
              'Planification fiscale stratégique',
              'Accompagnement de création et succession',
              'Conseil en transformation digitale'
            ],
            requirements: [
              'Expert fiduciaire dipl. oder brevet fédéral',
              'Maîtrise des outils digitaux (Abacus, bexio)',
              'Capacité d\'analyse et sens du conseil',
              'Précision et autonomie'
            ]
          },
          {
            id: 2,
            title: 'Gestionnaire de dossiers',
            pensum: '60 - 100%',
            location: 'Lengnau BE',
            tags: ['Digital Native', 'Support'],
            tasks: [
              'Gestion de la comptabilité financière et des salaires dans le cloud',
              'Établissement des décomptes TVA et bouclement intermédiaires',
              'Soutien à la digitalisation des pièces comptables',
              'Correspondance active avec les autorités et assurances',
              'Participation à des projets spéciaux passionnants'
            ],
            requirements: [
              'Formation commerciale avec focus fiduciaire/comptabilité',
              'Affinité pour les solutions logicielles modernes et l\'automatisation',
              'Travail précis et grande fiabilité',
              'Motivation pour le développement professionnel'
            ]
          }
        ]
      },
      contact: {
        title: 'Prendre contact.',
        info: {
          address: 'Solothurnstrasse 44, 2543 Lengnau'
        },
        form: {
          name: 'Prénom Nom',
          email: 'Adresse E-Mail',
          message: 'Comment pouvons-nous vous aider ?',
          btn: 'Envoyer la demande'
        },
        footer: {
          copyright: '© 2015 Pano & Partner AG',
          automatedBy: 'AUTOMATISÉ PAR'
        }
      }
    },
    services: [
      { 
        id: 1, 
        title: 'Finances & Fiscalité', 
        description: 'Du bouclage annuel à l\'optimisation fiscale stratégique. Précision garantie pour votre entreprise.', 
        icon: BarChart3,
        color: 'blue',
        details: ['Comptabilité', 'Conseil TVA', 'Planification fiscale', 'Bouclages']
      },
      { 
        id: 2, 
        title: 'Gestion des Salaires & RH', 
        description: 'Gestion des salaires et processus RH sécurisés. Nous vous déchargeons de A à Z.', 
        icon: Users,
        color: 'purple',
        details: ['Salaires', 'Assurances sociales', 'Conseil RH', 'Impôt source']
      },
      { 
        id: 3, 
        title: 'IT & Automation', 
        description: 'Workflows optimisés et automatisation durable de votre courrier avec les derniers outils.', 
        icon: Cpu,
        color: 'cyan',
        details: ['Automation IA', 'Courrier digital', 'Cloud-Integration', 'Audit']
      },
      { 
        id: 4, 
        title: 'Conseil Fiscal & Déclarations', 
        description: 'Déclarations d\'impôts et planification de prévoyance pour clients exigeants dans la région.', 
        icon: User,
        color: 'amber',
        details: ['Impôts', 'Prévoyance', 'Successions', 'Immobilier']
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
