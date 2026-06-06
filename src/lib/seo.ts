import type { Metadata } from 'next'
import { BRAND_NAME, COMPANY_PHONE, COMPANY_EMAIL, SITE_URL, WHATSAPP_NUMBER } from './constants'
import type { Service, PortfolioItem } from '@/types'

export function buildServiceMetadata(service: Service): Metadata {
  const slug = service.slug.replace(/_/g, '-')
  const title = service.seo_title ?? `${service.name} em São Paulo | ${BRAND_NAME}`
  const description =
    service.seo_description ??
    service.tagline ??
    `${service.name} sob medida com qualidade premium. Solicite um orçamento gratuito.`
  const ogImage = service.hero_image ?? `${SITE_URL}/og-default.jpg`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/servicos/${slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: service.name }],
      type: 'website',
      locale: 'pt_BR',
      siteName: BRAND_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function buildPortfolioMetadata(item: PortfolioItem): Metadata {
  const title = item.seo_title ?? `${item.title} | Portfólio | ${BRAND_NAME}`
  const description =
    item.seo_description ??
    item.short_desc ??
    `Projeto de serralheria realizado pela ${BRAND_NAME} — ${item.service.replace(/_/g, ' ')}.`
  const ogImage = item.cover_image ?? `${SITE_URL}/og-default.jpg`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/portfolio/${item.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: item.title }],
      type: 'article',
      locale: 'pt_BR',
      siteName: BRAND_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function buildPortfolioSchema(item: PortfolioItem) {
  const images = [item.cover_image, ...item.images].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.short_desc ?? item.description,
    image: images,
    url: `${SITE_URL}/portfolio/${item.slug}`,
    author: { '@type': 'Organization', name: BRAND_NAME, url: SITE_URL },
    ...(item.city ? { locationCreated: { '@type': 'City', name: item.city } } : {}),
    ...(item.year ? { dateCreated: String(item.year) } : {}),
    about: {
      '@type': 'Service',
      name: item.service.replace(/_/g, ' '),
      provider: { '@type': 'LocalBusiness', name: BRAND_NAME },
    },
  }
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/portfolio?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BRAND_NAME,
  image: [`${SITE_URL}/og-default.jpg`],
  logo: `${SITE_URL}/logo.svg`,
  url: SITE_URL,
  telephone: COMPANY_PHONE,
  email: COMPANY_EMAIL,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: COMPANY_PHONE,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
    {
      '@type': 'ContactPoint',
      telephone: `+${WHATSAPP_NUMBER}`,
      contactType: 'sales',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua das Indústrias, 123',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01000-000',
    addressCountry: 'BR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -23.55, longitude: -46.63 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, PIX',
  description:
    'Serralheria premium em São Paulo. Portões automáticos, grades, escadas metálicas, corrimões e estruturas metálicas para residências, condomínios e construtoras. Mais de 20 anos de mercado.',
  foundingDate: '2004',
  areaServed: [
    { '@type': 'City', name: 'São Paulo' },
    { '@type': 'City', name: 'Guarulhos' },
    { '@type': 'City', name: 'São Bernardo do Campo' },
    { '@type': 'AdministrativeArea', name: 'Grande São Paulo' },
  ],
  knowsAbout: [
    'Portões automáticos',
    'Grades de ferro e alumínio',
    'Escadas metálicas',
    'Corrimões e guarda-corpos',
    'Estruturas metálicas',
    'Serralheria industrial',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de Serralheria',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Portões Automáticos e Manuais', url: `${SITE_URL}/servicos/portoes` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Grades e Cercas', url: `${SITE_URL}/servicos/grades-e-cercas` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Escadas Metálicas', url: `${SITE_URL}/servicos/escadas` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corrimões e Guarda-corpos', url: `${SITE_URL}/servicos/corrimoes` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estruturas Metálicas', url: `${SITE_URL}/servicos/estruturas-metalicas` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Projetos Sob Medida', url: `${SITE_URL}/servicos/sob-medida` } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: ['https://www.instagram.com/metalprime', 'https://www.facebook.com/metalprime'],
}
