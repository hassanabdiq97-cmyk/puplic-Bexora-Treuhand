
'use client';

import React, { useRef, useState } from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtler rotation for "heavy" glass feel
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className="relative h-full p-8 rounded-3xl transition-all duration-300 group
                 bg-white/60 dark:bg-slate-900/40 
                 backdrop-blur-xl 
                 border border-white/20 dark:border-slate-700/30
                 shadow-xl shadow-slate-200/20 dark:shadow-black/20
                 hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-900/10
                 hover:border-blue-500/20 dark:hover:border-blue-400/20"
    >
      {/* Internal Gradient Glow on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                        bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-700
                        text-blue-600 dark:text-blue-400
                        shadow-inner border border-white/50 dark:border-slate-600/50
                        group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20">
          <service.icon size={28} strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {service.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-light">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
