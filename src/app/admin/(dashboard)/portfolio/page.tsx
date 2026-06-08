import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { SERVICE_LABELS } from '@/lib/constants'
import type { PortfolioItem } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Eye, EyeOff, Star } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminPortfolioPage() {
  const supabase = createAdminClient()
  const { data: items } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const list = (items ?? []) as PortfolioItem[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Portfólio</h1>
          <p className="text-metal mt-1">{list.length} itens · {list.filter((i) => i.published).length} publicados</p>
        </div>
        <Button asChild className="bg-amber-brand hover:bg-amber-light text-carbon font-semibold">
          <Link href="/admin/portfolio/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Item
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/admin/portfolio/${item.id}`}
            className="group bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden hover:border-amber-brand/40 transition-colors"
          >
            <div className="relative aspect-video bg-steel">
              {item.cover_image ? (
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-metal-dark text-xs">
                  Sem imagem
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1.5">
                {item.featured && (
                  <span className="bg-amber-brand rounded-full p-1">
                    <Star className="w-3 h-3 text-carbon" />
                  </span>
                )}
                <span className={`rounded-full p-1 ${item.published ? 'bg-green-500' : 'bg-metal-dark'}`}>
                  {item.published ? (
                    <Eye className="w-3 h-3 text-foreground" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-foreground" />
                  )}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground group-hover:text-amber-brand transition-colors truncate">
                {item.title}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <Badge variant="outline" className="text-[10px] border-metal-dark/40 text-metal-dark px-1.5 py-0.5">
                  {SERVICE_LABELS[item.service]}
                </Badge>
                <span className="text-xs text-metal-dark">{item.year ?? formatDate(item.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-20 bg-graphite border border-metal-dark/30 rounded-xl">
          <p className="text-metal mb-4">Nenhum item no portfólio.</p>
          <Button asChild size="sm" className="bg-amber-brand hover:bg-amber-light text-carbon">
            <Link href="/admin/portfolio/novo">Adicionar primeiro projeto</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
