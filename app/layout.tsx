
'use client';

import React from 'react';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import './globals.css';

export const metadata = {
  title: 'Bexora | Treuhand & IT-Automation',
  description: 'Ihr Partner für digitales Treuhandwesen und IT-Effizienz in Lengnau. Powered by NextLab.',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={`scroll-smooth font-sans bg-white dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 min-h-screen flex flex-col relative`}>
      <CustomCursor />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
