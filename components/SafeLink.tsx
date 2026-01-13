'use client';

import React from 'react';
import Link from 'next/link';

interface SafeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ href, children, className, ...props }) => {
  // Detect if we are in a pure client-side environment (Preview) without Next.js hydration.
  // Next.js injects __NEXT_DATA__ into the window object.
  // If window is undefined (SSR) or __NEXT_DATA__ exists, we assume Next.js context is active.
  const isPreview = typeof window !== 'undefined' && !window.__NEXT_DATA__;

  if (isPreview) {
    return (
      <a 
        href={href} 
        className={className} 
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState({}, '', href);
          // Dispatch event to notify custom router in index.tsx
          window.dispatchEvent(new PopStateEvent('popstate'));
          
          if (props.onClick) {
            props.onClick(e);
          }
        }} 
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={props.onClick} {...props}>
      {children}
    </Link>
  );
};

declare global {
  interface Window {
    __NEXT_DATA__: any;
  }
}

export default SafeLink;