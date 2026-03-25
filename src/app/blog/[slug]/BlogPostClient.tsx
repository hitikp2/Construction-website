'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { BlogPost } from '@/lib/blog-data';
import { BLOG_CONTENT } from '@/lib/blog-content';

const categoryColors: Record<string, string> = {
  ADU: 'bg-emerald-500/20 text-emerald-400',
  Remodeling: 'bg-blue-500/20 text-blue-400',
  Design: 'bg-purple-500/20 text-purple-400',
  Permits: 'bg-orange-500/20 text-orange-400',
  Tips: 'bg-cyan-500/20 text-cyan-400',
  Sustainability: 'bg-lime-500/20 text-lime-400',
};

export default function BlogPostClient({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const content = BLOG_CONTENT[post.slug] || post.excerpt;

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm font-sans text-[#6a6a64]">
            <Link href="/" className="hover:text-[#c8ff00] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/blog"
              className="hover:text-[#c8ff00] transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#a8a8a0] truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-sans mb-6 ${
                categoryColors[post.category] || 'bg-white/10 text-[#a8a8a0]'
              }`}
            >
              {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#f0efe9] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-[#6a6a64] font-sans mb-12">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-custom"
          >
            {content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold font-serif text-[#f0efe9] mt-10 mb-4"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={i}
                    className="text-xl font-semibold font-sans text-[#f0efe9] mt-8 mb-3"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 mb-4">
                    {items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[#a8a8a0] font-sans leading-relaxed"
                      >
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[#a8a8a0] font-sans leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              );
            })}
          </motion.div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-[20px] bg-[#161616] border border-white/5 text-center">
            <h3 className="text-xl font-semibold font-sans text-[#f0efe9] mb-2">
              Ready to Start Your Project?
            </h3>
            <p className="text-[#a8a8a0] font-sans text-sm mb-6">
              Get a free, no-obligation consultation from our licensed team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" href="/#contact">
                Get Free Quote
              </Button>
              <Button variant="secondary" href="/#calculator">
                Estimate Cost
              </Button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#c8ff00] text-sm font-sans hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 px-6 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="Keep Reading"
              title="Related Articles"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <Card className="group h-full flex flex-col cursor-pointer">
                    <span
                      className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium font-sans mb-3 ${
                        categoryColors[rp.category] ||
                        'bg-white/10 text-[#a8a8a0]'
                      }`}
                    >
                      {rp.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#f0efe9] font-sans leading-snug mb-2">
                      {rp.title}
                    </h3>
                    <p className="text-[#a8a8a0] font-sans text-sm flex-1 mb-4">
                      {rp.excerpt.slice(0, 120)}...
                    </p>
                    <div className="flex items-center gap-2 text-[#c8ff00] text-sm font-sans">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
