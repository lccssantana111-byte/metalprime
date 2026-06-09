import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { PortfolioItem } from '@/types'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { PortfolioForm } from '@/components/admin/portfolio/PortfolioForm'
import { SERVICE_LABELS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('portfolio_items').select('*').eq('id', id).single()
  if (!data) notFound()
  const item = data as PortfolioItem

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao portfólio
        </Link>
        {item.published && (
          <Link
            href={`/portfolio/${item.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-amber-brand hover:text-amber-light"
          >
            Ver no site
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">{item.title}</h1>
        <p className="text-slate-500 text-sm mt-1">{SERVICE_LABELS[item.service]}</p>
      </div>

      <PortfolioForm item={item} />
    </div>
  )
}
