'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      <span className="inline-block mb-4 text-sm font-medium tracking-widest uppercase text-[#c8ff00] font-sans">
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0efe9] font-serif leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-[#a8a8a0] font-sans mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
