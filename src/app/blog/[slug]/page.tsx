import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | X Construction Blog`,
    description: post.excerpt,
    keywords: [
      post.category.toLowerCase(),
      'construction',
      'Southern California',
      'remodeling',
    ],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', url: 'https://xconstruction.com' },
    { name: 'Blog', url: 'https://xconstruction.com/blog' },
    { name: post.title, url: `https://xconstruction.com/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateArticleSchema(post)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
