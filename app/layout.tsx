import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
import CustomCursor from '../components/CustomCursor';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bexora.ch'),
  title: {
    template: '%s | Bexora Treuhand Lengnau',
    default: 'Bexora Treuhand | Ihr Partner für Finanzen & Steuern im Seeland',
  },
  description: 'Pano & Partner AG (Bexora) in Lengnau: Professionelle Treuhanddienstleistungen für KMU und Privatpersonen. Buchhaltung, Steuern & Beratung für KMU im Seeland. Jetzt Sparpotenzial prüfen.',
  keywords: ['Treuhand Lengnau', 'Steuerberatung Biel', 'Buchhaltung KMU', 'Lohnadministration', 'Bexora', 'Seeland', 'Fiduciaire'],
  alternates: {
    canonical: '/',
    languages: {
      'de-CH': '/',
      'fr-CH': 'https://fr.bexora.ch',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://bexora.ch',
    siteName: 'Bexora Treuhand AG',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Bexora Treuhand - Kompetenz und Vertrauen',
    }],
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "Bexora Treuhand (Pano & Partner AG)",
  "image": "https://bexora.ch/logo.png",
  "@id": "https://bexora.ch",
  "url": "https://bexora.ch",
  "telephone": "+41 32 123 45 67",
  "email": "info@bexora.ch",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Solothurnstrasse 44",
    "addressLocality": "Lengnau",
    "postalCode": "2543",
    "addressRegion": "BE",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.1783,
    "longitude": 7.3687
  },
  "areaServed": [
    { "@type": "City", "name": "Lengnau" },
    { "@type": "City", "name": "Biel/Bienne" },
    { "@type": "City", "name": "Grenchen" },
    { "@type": "City", "name": "Bern" },
    { "@type": "City", "name": "Solothurn" },
    { "@type": "AdministrativeArea", "name": "Seeland" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "priceRange": "$$",
  "description": "Umfassende Treuhanddienstleistungen: Finanzbuchhaltung, Steuerberatung, Lohnwesen und Unternehmensberatung für KMU und Privatpersonen.",
  "sameAs": [
    "https://www.linkedin.com/company/bexora",
    "https://www.local.ch/de/d/lengnau-be/2543/treuhandgesellschaft/bexora"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Treuhand Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Finanzbuchhaltung & Jahresabschluss" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steuerberatung für Juristische Personen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steuererklärung Privatpersonen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lohnbuchhaltung & Sozialversicherungen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Unternehmensberatung" } }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const isFrench = host.startsWith('fr.') || headersList.get('x-url')?.includes('/fr');
  const lang = isFrench ? 'fr' : 'de';

  return (
    <html lang={lang} className={`scroll-smooth ${outfit.variable}`}>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`bg-slate-50 text-slate-900 dark:bg-dark-950 dark:text-slate-100 transition-colors duration-700 selection:bg-blue-600/30 font-sans`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}