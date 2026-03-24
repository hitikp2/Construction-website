'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

const FILTERS = ['All', 'Remodeling', 'ADU', 'Commercial', 'Outdoor'] as const;

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredItems =
    activeFilter === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Work"
          title="Featured Projects"
          subtitle="Browse our portfolio of completed projects"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#c8ff00] text-black'
                  : 'bg-white/5 text-[#a8a8a0] hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative aspect-video rounded-[20px] overflow-hidden cursor-pointer border border-white/5 transition-all duration-300 hover:border-[#c8ff00]/20 hover:shadow-[0_8px_30px_rgba(200,255,0,0.1)]"
                style={{ background: item.gradient }}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-[#f0efe9]">
                    {item.title}
                  </h3>
                  <p className="text-[#a8a8a0] text-sm mt-1">{item.location}</p>
                  <p className="text-[#c8ff00] font-mono mt-1">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
