import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/queries/services'
import { buildServiceMetadata } from '@/lib/seo'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceGallery from '@/components/services/ServiceGallery'
import ServiceProcess from '@/components/services/ServiceProcess'
import ServiceQuoteForm from '@/components/services/ServiceQuoteForm'
import ServiceFaq from '@/components/services/ServiceFaq'
import ServiceCta from '@/components/services/ServiceCta'

export const revalidate = 3600

export async function generateMetadata() {
  const service = await getServiceBySlug('escadas')
  if (!service) return {}
  return buildServiceMetadata(service)
}

export default async function EscadasPage() {
  const service = await getServiceBySlug('escadas')
  if (!service) notFound()

  return (
    <>
      <ServiceHero name={service.name} tagline={service.tagline} heroImage={service.hero_image} slug="escadas" />
      <ServiceFeatures features={service.features} />
      <ServiceGallery serviceSlug="escadas" />
      <ServiceProcess />
      <ServiceQuoteForm serviceName={service.name} serviceSlug="escadas" />
      <ServiceFaq faq={service.faq} />
      <ServiceCta serviceName={service.name} />
    </>
  )
}
