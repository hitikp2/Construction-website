import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Construction Blog | X Construction — SoCal Building Insights',
  description:
    'Expert insights on home remodeling, ADU construction, permits, costs, and design trends in Southern California. Updated weekly.',
};

export default function BlogPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm font-sans text-[#6a6a64]">
            <Link href="/" className="hover:text-[#c8ff00] transition-colors">
              Home
            </Link>
            <span className="text-[#6a6a64]">/</span>
            <span className="text-[#a8a8a0]">Blog</span>
          </nav>
        </div>
      </div>

      <BlogListClient posts={BLOG_POSTS} />
    </>
  );
}
