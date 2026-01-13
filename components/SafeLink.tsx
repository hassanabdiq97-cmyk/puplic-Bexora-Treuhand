
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
  // Ersetze die Prüfung durch diese Zeile (Type-Safe Hack):
  const isNext = typeof window !== 'undefined' && !!(window as any).__NEXT_DATA__;
  const isSandbox = typeof window !== 'undefined' && window.location.hostname.includes('usercontent.goog');

  // Wenn wir nicht in einer hydrierten Next.js Umgebung sind (Preview) oder in der Sandbox,
  // nutzen wir den manuellen Router.
  if (!isNext || isSandbox) {
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
