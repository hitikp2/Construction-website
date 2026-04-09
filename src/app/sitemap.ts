import type { MetadataRoute } from 'next';
import { SERVICE_DETAILS } from '@/lib/service-data';
import { AREA_DETAILS } from '@/lib/area-data';
import { BLOG_POSTS } from '@/lib/blog-data';

const BASE_URL = 'https://xconstruction.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_DETAILS.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const areaPages: MetadataRoute.Sitemap = AREA_DETAILS.map((a) => ({
    url: `${BASE_URL}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
