'use client';

import React from 'react';
import Home from './app/page';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './app/globals.css';

export default function App() {
  // In einer echten Next.js App übernimmt der Router das Rendern der pages.
  // In dieser Umgebung simulieren wir das Root-Layout und die Home-Page ohne html/body Tags.
  return (
    <div className="bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 font-sans selection:bg-blue-600/30 min-h-screen flex flex-col relative">
      <CustomCursor />
      <main className="flex-grow min-h-screen flex flex-col relative">
        <Home />
      </main>
      <Footer />
    </div>
  );
}