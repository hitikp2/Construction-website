import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AREA_DETAILS, getAreaBySlug } from '@/lib/area-data';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import AreaDetailClient from './AreaDetailClient';

export async function generateStaticParams() {
  return AREA_DETAILS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `${area.name} Construction & Remodeling | X Construction`,
    description: `Licensed construction and remodeling services in ${area.name}. Serving ${area.neighborhoods.slice(0, 5).join(', ')} and more. Rated 4.9★.`,
    keywords: [
      area.name.toLowerCase(),
      'construction',
      'remodeling',
      'contractor',
      ...area.neighborhoods.slice(0, 5).map((n) => n.toLowerCase()),
    ],
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://xconstruction.com' },
    { name: 'Service Areas', url: 'https://xconstruction.com/#areas' },
    { name: area.name, url: `https://xconstruction.com/areas/${area.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <AreaDetailClient area={area} />
    </>
  );
}
