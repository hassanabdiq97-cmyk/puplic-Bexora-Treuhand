import React from 'react';
import type { Metadata } from 'next';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bexora | Digitale Treuhand & Unternehmensberatung Lengnau',
  description: 'Bexora Treuhand in Lengnau: Maximale Transparenz durch digitale Prozesse. Buchhaltung, Steuern & Beratung für KMU im Seeland.',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "Pano & Partner AG",
    "image": "",
    "@id": "https://bexora.ch",
    "url": "https://bexora.ch",
    "telephone": "+41 32 123 45 67",
    "email": "info@bexora.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Solothurnstrasse 44",
      "addressLocality": "Lengnau",
      "postalCode": "2543",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.1783,
      "longitude": 7.3687
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "description": "Digitale Treuhanddienstleistungen, Steuerberatung und Unternehmensberatung in Lengnau und dem Seeland."
  };

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 font-sans selection:bg-blue-600/30">
        <CustomCursor />
        <main className="flex-grow min-h-screen flex flex-col relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}