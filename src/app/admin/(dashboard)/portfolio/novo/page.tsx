import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PortfolioForm } from '@/components/admin/portfolio/PortfolioForm'

export default function NovoPortfolioPage() {
  return (
    <div>
      <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-sm text-metal hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao portfólio
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Novo Item de Portfólio</h1>
      <PortfolioForm />
    </div>
  )
}
