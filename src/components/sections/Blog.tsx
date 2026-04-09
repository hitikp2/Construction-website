'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { BLOG_POSTS } from '@/lib/blog-data';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Insights"
          title="Construction Insights"
          subtitle="Expert advice and industry updates"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {BLOG_POSTS.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <Card className="h-full flex flex-col">
                  {/* Category badge */}
                  <span className="inline-block self-start bg-[#c8ff00]/10 text-[#c8ff00] rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>

                  {/* Date + read time */}
                  <p className="text-sm text-[#6a6a64] mt-3">
                    {formatDate(post.date)} &middot; {post.readTime} min read
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#f0efe9] mt-2 group-hover:text-[#c8ff00] transition-colors duration-300 font-sans">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#a8a8a0] mt-2 line-clamp-3 text-sm leading-relaxed flex-1 font-sans">
                    {post.excerpt}
                  </p>

                  {/* Read More link */}
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#c8ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read More &rarr;
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Posts */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#c8ff00] font-semibold hover:underline underline-offset-4 transition-all duration-300"
          >
            View All Posts &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
