
import { useRouter as useNextRouter, usePathname as useNextPathname, useSearchParams as useNextSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * Hook: useSafeRouter
 * Returns the Next.js router if available, otherwise a mock router for the preview.
 */
export const useSafeRouter = () => {
  try {
    return useNextRouter();
  } catch (e) {
    // Fallback for Preview / Client-Only mode
    return {
      push: (path: string) => {
        window.history.pushState({}, '', path);
        // Dispatch event so the preview router in index.tsx detects the change
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
      replace: (path: string) => {
        window.history.replaceState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      refresh: () => window.location.reload(),
      prefetch: () => {}, // No-op in preview
    };
  }
};

/**
 * Hook: useSafePathname
 * Returns Next.js pathname or window.location.pathname
 */
export const useSafePathname = () => {
  try {
    return useNextPathname();
  } catch (e) {
    // We need state here to trigger re-renders on navigation in preview
    const [pathname, setPathname] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      const handleLocationChange = () => {
        setPathname(window.location.pathname);
      };

      // Listen to popstate (browser back/forward) and custom pushState events
      window.addEventListener('popstate', handleLocationChange);
      return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    return pathname;
  }
};

/**
 * Hook: useSafeSearchParams
 * Returns Next.js searchParams or window.location.search
 */
export const useSafeSearchParams = () => {
  try {
    return useNextSearchParams();
  } catch (e) {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }
};
