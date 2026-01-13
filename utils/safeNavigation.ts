
import { useRouter as useNextRouter, usePathname as useNextPathname, useSearchParams as useNextSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Custom event name for virtual routing
export const NAVIGATION_EVENT = 'bexora-navigation';

/**
 * Safely navigates to a new path.
 * Tries to update browser history; if restricted (SecurityError),
 * it falls back to dispatching a custom event to update the app state.
 */
export const navigate = (path: string, replace = false) => {
  try {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
  } catch (e) {
    // Suppress SecurityError in sandboxed environments (e.g. Blob URLs)
    // We proceed to dispatch the event so the UI still updates.
    console.debug('Navigation fallback: History API restricted');
  }

  // Dispatch custom event for our internal router (index.tsx)
  const event = new CustomEvent(NAVIGATION_EVENT, { detail: { path } });
  window.dispatchEvent(event);

  // Dispatch popstate for standard listeners, though location might be stale if pushState failed
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/**
 * Hook: useSafeRouter
 * Returns the Next.js router if available, otherwise a safe mock router for the preview.
 */
export const useSafeRouter = () => {
  try {
    return useNextRouter();
  } catch (e) {
    // Fallback for Preview / Client-Only mode
    return {
      push: (path: string) => navigate(path),
      replace: (path: string) => navigate(path, true),
      back: () => {
        try { window.history.back(); } catch(e) {}
      },
      forward: () => {
        try { window.history.forward(); } catch(e) {}
      },
      refresh: () => {
        try { window.location.reload(); } catch(e) {}
      },
      prefetch: () => {}, 
    };
  }
};

/**
 * Hook: useSafePathname
 * Returns Next.js pathname or window.location.pathname, updated via custom events.
 */
export const useSafePathname = () => {
  try {
    return useNextPathname();
  } catch (e) {
    const [pathname, setPathname] = useState(() => 
      typeof window !== 'undefined' ? window.location.pathname : '/'
    );

    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      const updatePath = () => setPathname(window.location.pathname);
      
      // Handle custom navigation event for sandboxed environments
      const updateFromEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail?.path) {
          // Extract path from potentially full URL or relative path
          const p = customEvent.detail.path.split('?')[0];
          setPathname(p);
        }
      };

      window.addEventListener('popstate', updatePath);
      window.addEventListener(NAVIGATION_EVENT, updateFromEvent);
      
      return () => {
        window.removeEventListener('popstate', updatePath);
        window.removeEventListener(NAVIGATION_EVENT, updateFromEvent);
      };
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
