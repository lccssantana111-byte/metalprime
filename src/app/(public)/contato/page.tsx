import type { Metadata } from 'next'
import { BRAND_NAME, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'
import ContactForm from '@/components/contact/ContactForm'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: `Contato | ${BRAND_NAME}`,
  description: 'Entre em contato com a Metalprime. Atendimento para orçamentos e projetos em São Paulo.',
}

export default function ContatoPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-28 bg-carbon relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
          }}
        />
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Fale conosco</span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-foreground leading-none mb-6">
            Fale com um<br />
            <span className="text-metal/30">engenheiro</span>
          </h1>
          <p className="text-metal text-lg max-w-md leading-relaxed">
            Nossa equipe responde em até 24h nos dias úteis. Para agilizar, fale direto pelo WhatsApp — resposta imediata.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-carbon">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left — Info */}
            <div className="lg:col-span-4 space-y-0">
              <div className="divide-y divide-white/5">
                {[
                  {
                    icon: Phone,
                    title: 'Telefone / WhatsApp',
                    value: COMPANY_PHONE,
                    sub: 'Seg–Sex 8h–18h · Sáb 8h–13h',
                    href: `https://wa.me/${WHATSAPP_NUMBER}`,
                  },
                  {
                    icon: Mail,
                    title: 'E-mail',
                    value: COMPANY_EMAIL,
                    sub: 'Respondemos em até 24h',
                    href: `mailto:${COMPANY_EMAIL}`,
                  },
                  {
                    icon: MapPin,
                    title: 'Endereço',
                    value: COMPANY_ADDRESS,
                    sub: 'São Paulo, SP',
                  },
                  {
                    icon: Clock,
                    title: 'Horário de atendimento',
                    value: 'Seg–Sex: 8h às 18h',
                    sub: 'Sábado: 8h às 13h',
                  },
                ].map((item) => (
                  <div key={item.title} className="py-7 flex gap-5">
                    <div className="w-10 h-10 border border-amber-brand/30 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-amber-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-metal-dark uppercase tracking-widest mb-2">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-amber-brand transition-colors"
                        >
                          {item.value}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      )}
                      <p className="text-xs text-metal mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-6">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 px-5 py-4 transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-foreground">Falar pelo WhatsApp</p>
                    <p className="text-xs text-metal">Resposta imediata</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-metal ml-auto group-hover:text-foreground transition-colors" />
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Descreva o que você precisa
                </h2>
                <p className="text-metal text-sm">
                  Nome, telefone e o que você precisa. Sem formulário longo — nossa equipe entra em contato.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-graphite border-t border-foreground/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-steel/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#8c97a0 1px, transparent 1px), linear-gradient(90deg, #8c97a0 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border border-amber-brand/30 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-amber-brand" />
            </div>
            <p className="text-metal text-sm">{COMPANY_ADDRESS}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-brand hover:underline mt-2 inline-block"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
