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
  const service = await getServiceBySlug('estruturas_metalicas')
  if (!service) return {}
  return buildServiceMetadata(service)
}

export default async function EstrutasMetalicasPage() {
  const service = await getServiceBySlug('estruturas_metalicas')
  if (!service) notFound()

  return (
    <>
      <ServiceHero name={service.name} tagline={service.tagline} heroImage={service.hero_image} slug="estruturas-metalicas" />
      <ServiceFeatures features={service.features} />
      <ServiceGallery serviceSlug="estruturas-metalicas" />
      <ServiceProcess />
      <ServiceQuoteForm serviceName={service.name} serviceSlug="estruturas-metalicas" />
      <ServiceFaq faq={service.faq} />
      <ServiceCta serviceName={service.name} />
    </>
  )
}
