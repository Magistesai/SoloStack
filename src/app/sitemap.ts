// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { tools, categories, stacks } from '@/lib/data';

const BASE = 'https://solostack.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/stacks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map(t => ({
    url: `${BASE}/tool/${t.slug}`,
    lastModified: new Date(t.addedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const comparePages: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${BASE}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const stackPages: MetadataRoute.Sitemap = stacks.map(s => ({
    url: `${BASE}/stack/${s.slug}`,
    lastModified: new Date(s.addedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...comparePages, ...stackPages];
}
