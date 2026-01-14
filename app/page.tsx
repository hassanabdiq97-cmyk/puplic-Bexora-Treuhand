
import React from 'react';
import type { Metadata } from 'next';
import ClientHomeLogic from '../components/ClientHomeLogic';

export const metadata: Metadata = {
  title: 'Bexora Treuhand | Ihr Partner für Finanzen & Steuern',
  description: 'Professionelle Treuhanddienstleistungen in Lengnau. Wir unterstützen KMU und Privatpersonen bei Buchhaltung, Steuern und Lohnadministration. Jetzt beraten lassen.',
  alternates: {
    canonical: 'https://bexora.ch',
    languages: {
      'de-CH': 'https://bexora.ch',
      'fr-CH': 'https://fr.bexora.ch',
    },
  },
};

export default function Home() {
  return <ClientHomeLogic lang="DE" />;
}
