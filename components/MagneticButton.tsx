import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'outline' | 'ghost';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick, variant = 'primary' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.2, // Reduced movement slightly for more stability
      y: y * 0.2,
      duration: 0.4,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)' // Smoother elastic return
    });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-semibold transition-all duration-300 text-sm uppercase tracking-wider overflow-hidden group flex items-center justify-center";
  
  const variants = {
    // Elegant primary with glow effect and lift
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_35px_-12px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
    
    // Outline with glass feel on hover
    outline: "border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-blue-500/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    
    // Ghost for subtle links
    ghost: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {/* Subtle shine effect for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />
      )}
    </button>
  );
};

export default MagneticButton;