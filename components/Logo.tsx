
import React from 'react';

const Logo: React.FC<{ className?: string, 'aria-hidden'?: boolean }> = ({ className, 'aria-hidden': ariaHidden }) => {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? 'presentation' : 'img'}
      aria-label={ariaHidden ? undefined : 'Bexora Treuhand Logo'}
    >
      <title>Bexora Treuhand Logo</title>
      <defs>
        <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <path d="M250 50 L100 120 V250 C100 350 250 450 250 450 V50Z" fill="url(#logoBlueGrad)" />

      <g filter="url(#logoGlow)">
        <path d="M250 50 L400 120 V250 C400 350 250 450 250 450" stroke="#22D3EE" strokeWidth="8" strokeLinecap="round" />
        
        <path d="M280 150 H360 M360 150 V190 H320" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
        <circle cx="320" cy="190" r="5" fill="#22D3EE" />
        
        <path d="M270 230 H340 V280" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
        <circle cx="340" cy="280" r="5" fill="#22D3EE" />
        
        <path d="M290 330 H320" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
        <circle cx="320" cy="330" r="5" fill="#22D3EE" />
      </g>
      
      <line x1="250" y1="50" x2="250" y2="450" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    </svg>
  );
};

export default Logo;
