import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants/site';
import { SITE_SEO } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: SITE_SEO.dateModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
