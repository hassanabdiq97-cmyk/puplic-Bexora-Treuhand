'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nur auf Geräten mit Mauszeiger aktivieren
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // Direkte DOM-Manipulation via GSAP für maximale Performance
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      }
      if (followerRef.current) {
        gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
};

export default CustomCursor;