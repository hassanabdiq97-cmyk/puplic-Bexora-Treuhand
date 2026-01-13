
import React from 'react';
import type { Metadata } from 'next';
import ClientHomeLogic from '../../components/ClientHomeLogic';

export const metadata: Metadata = {
  title: 'L\'avantage: Fiduciaire Bexora | Optimisation Stratégique',
  description: 'Êtes-vous géré ou déjà optimisé ? Bexora transforme votre comptabilité en un instrument de gestion stratégique. Bexora 360° Vision-Pulse™ pour une liquidité maximale.',
  alternates: {
    canonical: 'https://fr.bexora.ch',
    languages: {
      'de-CH': 'https://bexora.ch',
      'fr-CH': 'https://fr.bexora.ch',
    },
  },
};

export default function FrenchHome() {
  return <ClientHomeLogic lang="FR" />;
}
