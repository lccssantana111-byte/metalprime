import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import SegmentSection from '@/components/home/SegmentSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ProcessSection from '@/components/home/ProcessSection'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import CtaBanner from '@/components/home/CtaBanner'
import { getFeaturedPortfolio } from '@/lib/queries/portfolio'
import { localBusinessSchema, websiteSchema } from '@/lib/seo'
import { BRAND_NAME, COMPANY_TAGLINE, SITE_URL } from '@/lib/constants'

export const revalidate = 1800

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${COMPANY_TAGLINE}`,
  description:
    'Serralheria premium em São Paulo. Portões automáticos, grades, escadas metálicas, corrimões e estruturas metálicas para residências, condomínios e construtoras. +20 anos de mercado.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: BRAND_NAME,
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: `${BRAND_NAME} — ${COMPANY_TAGLINE}` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-default.jpg`],
  },
}

export default async function HomePage() {
  const featuredItems = await getFeaturedPortfolio().catch(() => [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <SegmentSection />
      <FeaturedProjects items={featuredItems} />
      <ProcessSection />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  )
}
