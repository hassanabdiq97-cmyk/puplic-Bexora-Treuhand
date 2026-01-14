
import React from 'react';
import type { Metadata } from 'next';
import ClientHomeLogic from '../components/ClientHomeLogic';

export const metadata: Metadata = {
  title: 'Bexora Treuhand | Kompetenz für Ihre Finanzen',
  description: 'Verlässliche Treuhanddienstleistungen in Lengnau. Wir entlasten Sie bei Buchhaltung, Steuern und Personaladministration. Schweizer Qualitätsstandards.',
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
