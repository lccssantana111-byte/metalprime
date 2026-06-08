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

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb with schema.org markup */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-metal mb-8">
            <Link href="/" className="hover:text-metal-light transition-colors">Início</Link>
            <span aria-hidden>/</span>
            <Link href="/portfolio" className="hover:text-metal-light transition-colors">Portfólio</Link>
            <span aria-hidden>/</span>
            <Link href={`/servicos/${serviceSlug}`} className="hover:text-metal-light transition-colors capitalize">
              {SERVICE_LABELS[item.service]}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-amber-brand">{item.title}</span>
          </nav>

          {/* Hero image */}
          <div className="aspect-[16/7] bg-graphite rounded-2xl overflow-hidden mb-8 border border-metal-dark/30">
            {item.cover_image ? (
              <img
                src={item.cover_image}
                alt={`${item.title} — ${SERVICE_LABELS[item.service]} por ${process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Metalprime'}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-steel to-graphite flex items-center justify-center">
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
                  className="text-xs px-3 py-1 bg-amber-brand/10 text-amber-brand border border-amber-brand/20 rounded-full font-medium hover:bg-amber-brand/20 transition-colors"
                >
                  {SERVICE_LABELS[item.service]}
                </Link>
                {item.featured && (
                  <span className="text-xs px-3 py-1 bg-steel/50 text-metal-light border border-metal-dark/30 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {item.title}
              </h1>
              {item.short_desc && (
                <p className="text-xl text-metal-light mb-6 leading-relaxed">{item.short_desc}</p>
              )}
              {item.description && (
                <div className="prose prose-invert max-w-none text-metal leading-relaxed">
                  <p>{item.description}</p>
                </div>
              )}

              {/* Contextual service link */}
              <div className="mt-8 p-5 bg-graphite border border-metal-dark/30 rounded-xl">
                <p className="text-sm text-metal mb-3">
                  Interessado em <span className="text-foreground font-medium">{SERVICE_LABELS[item.service]}</span>?
                  Veja todos os detalhes do serviço.
                </p>
                <Link
                  href={`/servicos/${serviceSlug}`}
                  className="text-sm text-amber-brand hover:text-amber-light transition-colors font-medium inline-flex items-center gap-1"
                >
                  Ver serviço de {SERVICE_LABELS[item.service]}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Meta + CTA */}
            <div className="space-y-4">
              {item.city && (
                <div className="flex items-center gap-3 bg-graphite border border-metal-dark/30 rounded-xl p-4">
                  <MapPin className="w-5 h-5 text-amber-brand shrink-0" />
                  <div>
                    <p className="text-xs text-metal-dark">Localização</p>
                    <p className="text-foreground font-medium">{item.city}</p>
                  </div>
                </div>
              )}
              {item.year && (
                <div className="flex items-center gap-3 bg-graphite border border-metal-dark/30 rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-amber-brand shrink-0" />
                  <div>
                    <p className="text-xs text-metal-dark">Ano de execução</p>
                    <p className="text-foreground font-medium">{item.year}</p>
                  </div>
                </div>
              )}

              {/* Primary CTA — contextual per service */}
              <Button
                asChild
                className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold py-4 h-auto group"
              >
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Secondary CTA — WhatsApp */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511999999999'}?text=${encodeURIComponent(`Olá! Vi o projeto "${item.title}" no portfólio e quero um orçamento similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-xl text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Perguntar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Gallery */}
          {item.images.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Galeria de imagens</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.images.map((img, i) => (
                  <div key={i} className="aspect-square bg-graphite rounded-xl overflow-hidden">
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
          <div className="mt-16 bg-graphite border border-amber-brand/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Gostou do resultado?</h3>
              <p className="text-metal">Solicite um orçamento gratuito e sem compromisso para seu projeto.</p>
            </div>
            <Button asChild className="bg-amber-brand hover:bg-amber-light text-carbon font-bold px-8 py-4 h-auto shrink-0">
              <Link href={ctaHref}>Solicitar orçamento</Link>
            </Button>
          </div>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" className="border-metal-dark/50 text-metal-light hover:bg-steel/30">
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
