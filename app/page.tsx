
import React from 'react';
import type { Metadata } from 'next';
import ClientHomeLogic from '../components/ClientHomeLogic';

export const metadata: Metadata = {
  title: 'Der Vorteil: Bexora Treuhand | Wettbewerbsvorteil durch Echtzeit-Daten',
  description: 'Werden Sie verwaltet oder schon optimiert? Bexora verwandelt Ihre Buchhaltung in ein strategisches Führungsinstrument. 360° Vision-Pulse™ für maximale Liquidität.',
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
