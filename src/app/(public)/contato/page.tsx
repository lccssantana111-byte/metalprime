import type { Metadata } from 'next'
import { BRAND_NAME } from '@/lib/constants'
import ContatoHero from './_components/ContatoHero'
import ContatoContent from './_components/ContatoContent'
import ContatoAddress from './_components/ContatoAddress'

export const metadata: Metadata = {
  title: `Contato | ${BRAND_NAME}`,
  description: 'Entre em contato com a Metalprime. Atendimento para orçamentos e projetos em São Paulo.',
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
