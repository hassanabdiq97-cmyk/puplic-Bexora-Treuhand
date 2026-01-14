
import React from 'react';
import type { Metadata } from 'next';
import ClientHomeLogic from '../../components/ClientHomeLogic';

export const metadata: Metadata = {
  title: 'Fiduciaire Bexora | Compétence pour vos finances',
  description: 'Services fiduciaires fiables à Lengnau. Nous vous soutenons dans la comptabilité, la fiscalité et l\'administration du personnel. Normes de qualité suisses.',
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
