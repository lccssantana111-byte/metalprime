import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getPortfolioSlugs } from '@/lib/queries/portfolio'

export const revalidate = 3600

const SITE_LAST_MODIFIED = new Date('2026-06-14')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioSlugs = await getPortfolioSlugs().catch(() => [])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/sobre`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/servicos`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/servicos/portoes`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servicos/grades-e-cercas`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servicos/escadas`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servicos/corrimoes`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servicos/estruturas-metalicas`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servicos/sob-medida`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contato`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...portfolioRoutes]
}
