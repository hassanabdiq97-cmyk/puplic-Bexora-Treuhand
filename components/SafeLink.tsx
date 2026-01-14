
'use client';

import React from 'react';
import Link from 'next/link';
import { navigate } from '../utils/safeNavigation';

interface SafeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ href, children, className, ...props }) => {
  // Check for the flag set by index.tsx (Preview environment)
  const isPreview = typeof window !== 'undefined' && (window as any).__IS_PREVIEW__;
  
  // Also check for common sandbox domains as a fallback
  const isSandbox = typeof window !== 'undefined' && (
      window.location.hostname.includes('usercontent.goog') || 
      window.location.hostname.includes('webcontainer.io')
  );

  // If we are in the Preview/Sandbox, we use manual <a> tags with our custom router.
  // In Vercel/Production (where __IS_PREVIEW__ is undefined), we use standard Next.js <Link>.
  if (isPreview || isSandbox) {
    return (
      <a 
        href={href} 
        className={className} 
        onClick={(e) => {
          e.preventDefault();
          navigate(href);
          
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

export default SafeLink;
