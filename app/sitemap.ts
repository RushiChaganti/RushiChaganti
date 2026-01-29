import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rushichaganti.github.io/RushiChaganti'
  const lastModified = new Date('2026-01-29')

  return [
    {
      url: baseUrl,
      lastModified,
    },
  ]
}
