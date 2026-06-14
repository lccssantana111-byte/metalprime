import type { Metadata } from 'next'
import { BRAND_NAME, SITE_URL } from '@/lib/constants'
import ContatoHero from './_components/ContatoHero'
import ContatoContent from './_components/ContatoContent'
import ContatoAddress from './_components/ContatoAddress'

export const metadata: Metadata = {
  title: `Fale com um Engenheiro — Orçamento Técnico | ${BRAND_NAME}`,
  description: 'Entre em contato com a Metal Shark. Solicite orçamento técnico para estruturas metálicas, galpões, coberturas e escadas em São Paulo. Proposta técnica em 48h úteis.',
  alternates: { canonical: `${SITE_URL}/contato` },
  openGraph: {
    title: `Fale com um Engenheiro — Orçamento Técnico | ${BRAND_NAME}`,
    description: 'Proposta técnica em 48h. Engenheiro na visita, sem custo. Atendemos construtoras, indústrias e empresas na Grande São Paulo.',
    url: `${SITE_URL}/contato`,
    siteName: BRAND_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: `Contato | ${BRAND_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Fale com um Engenheiro | ${BRAND_NAME}`,
    description: 'Proposta técnica em 48h para estruturas metálicas industriais e comerciais em São Paulo.',
    images: [`${SITE_URL}/og-default.jpg`],
  },
}

export default function ContatoPage() {
  return (
    <div>
      <ContatoHero />
      <ContatoContent />
      <ContatoAddress />
    </div>
  )
}
