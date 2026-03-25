'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
}) => {
  return (
    <div
      className={`
        bg-[#161616] border border-white/5 rounded-[20px] p-6
        transition-all duration-300
        ${hover ? 'hover:-translate-y-1 hover:border-[#c8ff00]/20 hover:shadow-[0_8px_30px_rgba(200,255,0,0.1)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
