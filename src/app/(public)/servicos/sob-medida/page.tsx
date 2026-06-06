import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/queries/services'
import { buildServiceMetadata } from '@/lib/seo'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceFaq from '@/components/services/ServiceFaq'
import ServiceCta from '@/components/services/ServiceCta'

export const revalidate = 3600

export async function generateMetadata() {
  const service = await getServiceBySlug('sob_medida')
  if (!service) return {}
  return buildServiceMetadata(service)
}

export default async function SobMedidaPage() {
  const service = await getServiceBySlug('sob_medida')
  if (!service) notFound()

  return (
    <>
      <ServiceHero name={service.name} tagline={service.tagline} heroImage={service.hero_image} />
      <ServiceFeatures features={service.features} />
      <ServiceFaq faq={service.faq} />
      <ServiceCta serviceName={service.name} />
    </>
  )
}
