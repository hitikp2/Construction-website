'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/lib/blog-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const categoryColors: Record<string, string> = {
  ADU: 'bg-emerald-500/20 text-emerald-400',
  Remodeling: 'bg-blue-500/20 text-blue-400',
  Design: 'bg-purple-500/20 text-purple-400',
  Permits: 'bg-orange-500/20 text-orange-400',
  Tips: 'bg-cyan-500/20 text-cyan-400',
  Sustainability: 'bg-lime-500/20 text-lime-400',
};

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Blog"
          title="Construction Insights"
          subtitle="Expert articles on remodeling, ADUs, permits, costs, and design trends in Southern California."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#c8ff00] text-black font-medium'
                  : 'bg-white/5 text-[#a8a8a0] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filtered.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="group h-full flex flex-col cursor-pointer">
                  {/* Category badge */}
                  <span
                    className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium font-sans mb-4 ${
                      categoryColors[post.category] || 'bg-white/10 text-[#a8a8a0]'
                    }`}
                  >
                    {post.category}
                  </span>

                  <h3 className="text-lg font-semibold text-[#f0efe9] font-sans leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-[#a8a8a0] font-sans text-sm leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#6a6a64] font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} min read
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-[#c8ff00] text-sm font-sans">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
