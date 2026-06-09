import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPortfolioBySlug, getPortfolioSlugs } from '@/lib/queries/portfolio'
import { buildPortfolioMetadata, buildPortfolioSchema } from '@/lib/seo'
import { SERVICE_LABELS, SERVICE_SLUGS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)
  if (!item) return {}
  return buildPortfolioMetadata(item)
}

const SERVICE_CTA: Record<string, string> = {
  portoes: 'Quero um portão assim',
  grades_e_cercas: 'Quero grades como essas',
  escadas: 'Quero uma escada assim',
  corrimoes: 'Quero corrimões como esses',
  estruturas_metalicas: 'Quero uma estrutura assim',
  sob_medida: 'Quero um projeto sob medida',
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)
  if (!item) notFound()

  const serviceSlug = SERVICE_SLUGS[item.service] ?? item.service
  const ctaHref = `/orcamento?service=${item.service}`
  const ctaText = SERVICE_CTA[item.service] ?? 'Quero um projeto assim'
  const schema = buildPortfolioSchema(item)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="pt-24 pb-16" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8" style={{ color: '#94a3b8' }}>
            <Link href="/" className="hover:text-slate-700 transition-colors" style={{ color: '#64748b' }}>Início</Link>
            <span aria-hidden>/</span>
            <Link href="/portfolio" className="hover:text-slate-700 transition-colors" style={{ color: '#64748b' }}>Portfólio</Link>
            <span aria-hidden>/</span>
            <Link href={`/servicos/${serviceSlug}`} className="hover:text-slate-700 transition-colors capitalize" style={{ color: '#64748b' }}>
              {SERVICE_LABELS[item.service]}
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: '#f97316' }}>{item.title}</span>
          </nav>

          {/* Hero image */}
          <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-8" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
            {item.cover_image ? (
              <img
                src={item.cover_image}
                alt={`${item.title} — ${SERVICE_LABELS[item.service]} por ${process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Metalprime'}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)' }}>
                <span className="text-6xl">🏗️</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex flex-wrap gap-3">
                <Link
                  href={`/servicos/${serviceSlug}`}
                  className="text-xs px-3 py-1 rounded-full font-medium transition-colors"
                  style={{ background: 'rgba(249,115,22,0.08)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
                >
                  {SERVICE_LABELS[item.service]}
                </Link>
                {item.featured && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}
                  >
                    Destaque
                  </span>
                )}
              </div>
              <h1
                className="font-display text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: '#0f172a' }}
              >
                {item.title}
              </h1>
              {item.short_desc && (
                <p className="text-xl mb-6 leading-relaxed" style={{ color: '#475569' }}>{item.short_desc}</p>
              )}
              {item.description && (
                <div className="prose max-w-none leading-relaxed" style={{ color: '#64748b' }}>
                  <p>{item.description}</p>
                </div>
              )}

              {/* Contextual service link */}
              <div className="mt-8 p-5 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="text-sm mb-3" style={{ color: '#64748b' }}>
                  Interessado em <span className="font-medium" style={{ color: '#0f172a' }}>{SERVICE_LABELS[item.service]}</span>?
                  Veja todos os detalhes do serviço.
                </p>
                <Link
                  href={`/servicos/${serviceSlug}`}
                  className="text-sm font-medium inline-flex items-center gap-1 transition-colors"
                  style={{ color: '#f97316' }}
                >
                  Ver serviço de {SERVICE_LABELS[item.service]}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Meta + CTA */}
            <div className="space-y-4">
              {item.city && (
                <div className="flex items-center gap-3 rounded-xl p-4" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
                  <MapPin className="w-5 h-5 shrink-0" style={{ color: '#f97316' }} />
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Localização</p>
                    <p className="font-medium" style={{ color: '#0f172a' }}>{item.city}</p>
                  </div>
                </div>
              )}
              {item.year && (
                <div className="flex items-center gap-3 rounded-xl p-4" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
                  <Calendar className="w-5 h-5 shrink-0" style={{ color: '#f97316' }} />
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Ano de execução</p>
                    <p className="font-medium" style={{ color: '#0f172a' }}>{item.year}</p>
                  </div>
                </div>
              )}

              {/* Primary CTA */}
              <button
                onClick={() => { window.location.href = ctaHref }}
                className="w-full font-bold text-sm tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 group transition-colors"
                style={{ background: '#0f172a', color: '#ffffff' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1e293b' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0f172a' }}
              >
                <Link href={ctaHref} className="flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </button>

              {/* Secondary CTA — WhatsApp */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511999999999'}?text=${encodeURIComponent(`Olá! Vi o projeto "${item.title}" no portfólio e quero um orçamento similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: '#16a34a' }}
              >
                <MessageCircle className="w-4 h-4" />
                Perguntar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Gallery */}
          {item.images.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Galeria de imagens</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <img
                      src={img}
                      alt={`${item.title} — imagem ${i + 1} — ${SERVICE_LABELS[item.service]}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA banner */}
          <div
            className="mt-16 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: '#0f172a' }}>Gostou do resultado?</h3>
              <p style={{ color: '#64748b' }}>Solicite um orçamento gratuito e sem compromisso para seu projeto.</p>
            </div>
            <Button asChild className="font-bold px-8 py-4 h-auto shrink-0" style={{ background: '#f97316', color: '#ffffff' }}>
              <Link href={ctaHref}>Solicitar orçamento</Link>
            </Button>
          </div>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
              <Link href="/portfolio">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar ao portfólio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
