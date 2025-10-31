import { MetadataRoute } from 'next'
import { getAvailableYears, getEventsByYear } from '@/lib/data/events'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ieeevsit.vercel.app/'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}societies/wie`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}join-ieee`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamic event pages
  const years = getAvailableYears()
  const eventPages: MetadataRoute.Sitemap = []

  years.forEach(year => {
    const events = getEventsByYear(year)
    events.forEach(event => {
      eventPages.push({
        url: `${baseUrl}events/${year}/${event.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  return [...staticPages, ...eventPages]
}