
import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './app/page';
import ImpressumPage from './app/impressum/page';
import DatenschutzPage from './app/datenschutz/page';
import FrenchHome from './app/fr/page';
import FrenchImpressum from './app/fr/impressum/page';
import FrenchDatenschutz from './app/fr/datenschutz/page';
import CustomCursor from './components/CustomCursor';

// Simple client-side router for preview
const Router = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [search, setSearch] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      setSearch(window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic based on URL
  if (path === '/fr') return <FrenchHome />;
  if (path === '/fr/impressum') return <FrenchImpressum />;
  if (path === '/fr/datenschutz') return <FrenchDatenschutz />;
  if (path === '/impressum') return <ImpressumPage />;
  if (path === '/datenschutz') return <DatenschutzPage />;
  
  // Handle query param for lang (legacy/fallback)
  const params = new URLSearchParams(search);
  const lang = params.get('lang');
  if (lang === 'FR') return <FrenchHome />;

  return <Home />;
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>}>
      <CustomCursor />
      <Router />
    </Suspense>
  </React.StrictMode>
);
