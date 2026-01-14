
import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './app/page';
import ImpressumPage from './app/impressum/page';
import DatenschutzPage from './app/datenschutz/page';
import FrenchHome from './app/fr/page';
import FrenchImpressum from './app/fr/impressum/page';
import FrenchDatenschutz from './app/fr/datenschutz/page';
import CustomCursor from './components/CustomCursor';

// Set global flag to identify the Preview environment
if (typeof window !== 'undefined') {
  (window as any).__IS_PREVIEW__ = true;
}

// Simple client-side router for preview
const Router = () => {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  // Scroll to top whenever path changes (Fixes "Impressum not opening" feeling)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    
    // Handler for robust navigation in sandboxed environments
    const handleCustomNav = (e: any) => {
      if (e.detail?.path) {
        const targetPath = e.detail.path.split('?')[0];
        setPath(targetPath);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('bexora-navigation', handleCustomNav);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('bexora-navigation', handleCustomNav);
    };
  }, []);

  // Normalize path (remove trailing slash for consistency)
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

  // Simple routing logic based on URL
  if (normalizedPath === '/fr') return <FrenchHome />;
  if (normalizedPath === '/fr/impressum') return <FrenchImpressum />;
  if (normalizedPath === '/fr/datenschutz') return <FrenchDatenschutz />;
  if (normalizedPath === '/impressum') return <ImpressumPage />;
  if (normalizedPath === '/datenschutz') return <DatenschutzPage />;
  
  // Handle fallback for legacy lang param or partial matches
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const lang = params.get('lang');
  
  if (lang === 'FR' || normalizedPath.startsWith('/fr')) return <FrenchHome />;

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
