import { MetadataRoute } from 'next';

const DOMAIN = 'https://exportform.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/generator',
    '/edf-form',
    '/edf-form-for-freelancers',
    '/how-to-fill-edf-form',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/edf-form' ? 1 : 0.8,
  }));

  return routes;
}
