'use client';

import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-[#c8ff00] text-black font-semibold hover:shadow-[0_0_20px_rgba(200,255,0,0.3)] hover:bg-[#d4ff33]',
  secondary:
    'border border-white/20 text-white hover:border-[#c8ff00] hover:text-[#c8ff00]',
  ghost:
    'bg-transparent text-white hover:text-[#c8ff00]',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-[12px] font-sans transition-all duration-300 hover:-translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00]/50 disabled:opacity-50 disabled:pointer-events-none';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
