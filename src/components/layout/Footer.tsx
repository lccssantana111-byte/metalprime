import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import {
  BRAND_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  WHATSAPP_NUMBER,
} from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes' },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas' },
  { label: 'Escadas Metálicas', href: '/servicos/escadas' },
  { label: 'Corrimões', href: '/servicos/corrimoes' },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas' },
  { label: 'Sob Medida', href: '/servicos/sob-medida' },
]

const company = [
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Solicitar Orçamento', href: '/orcamento' },
  { label: 'Contato', href: '/contato' },
]

export default function Footer() {
  return (
    <footer className="bg-carbon relative overflow-hidden">
      {/* Top amber line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-brand/60 to-transparent" />

      {/* Background text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black text-[18vw] leading-none text-transparent block"
          style={{ WebkitTextStroke: '1px rgba(30,35,40,0.8)' }}
        >
          METALPRIME
        </span>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

            {/* Brand column */}
            <div className="md:col-span-4 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
                <div className="relative w-7 h-7 shrink-0">
                  <div className="absolute inset-0 bg-amber-brand rotate-45 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-[3px] bg-carbon rotate-45" />
                  <div className="absolute inset-[6px] bg-amber-brand rotate-45" />
                </div>
                <span className="font-display font-bold text-base tracking-wider text-white uppercase">
                  {BRAND_NAME.split(' ')[0]}
                  <span className="text-amber-brand">.</span>
                </span>
              </Link>

              <p className="text-sm text-metal leading-relaxed mb-8 max-w-xs">
                Excelência em serralheria premium há mais de 20 anos. Portões, grades, escadas e
                estruturas metálicas para residências, condomínios e construtoras.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/metalprime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/s w-9 h-9 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/metalprime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="md:col-span-2 lg:col-span-2">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.25em] mb-5">
                Serviços
              </h3>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="group text-sm text-metal hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 bg-metal-dark group-hover:bg-amber-brand rounded-full transition-colors shrink-0" />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2 lg:col-span-2">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.25em] mb-5">
                Empresa
              </h3>
              <ul className="space-y-3">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="group text-sm text-metal hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 bg-metal-dark group-hover:bg-amber-brand rounded-full transition-colors shrink-0" />
                      {c.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/admin"
                    className="text-sm text-metal-dark/50 hover:text-metal-dark transition-colors duration-200 flex items-center gap-1.5 mt-4"
                  >
                    <span className="w-1 h-1 bg-metal-dark/30 rounded-full shrink-0" />
                    Área Admin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4 lg:col-span-4">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.25em] mb-5">
                Contato
              </h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 border border-amber-brand/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-brand/10 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-amber-brand" />
                    </div>
                    <div>
                      <p className="text-sm text-white group-hover:text-amber-brand transition-colors">{COMPANY_PHONE}</p>
                      <p className="text-xs text-metal-dark mt-0.5">Seg–Sex 8h–18h · Sáb 8h–13h</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-amber-brand/30 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-metal group-hover:text-amber-brand transition-colors" />
                    </div>
                    <p className="text-sm text-metal group-hover:text-white transition-colors mt-1.5">{COMPANY_EMAIL}</p>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-metal" />
                  </div>
                  <p className="text-sm text-metal mt-1.5">{COMPANY_ADDRESS}</p>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/orcamento"
                className="group mt-8 inline-flex items-center gap-2 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-xs tracking-wide uppercase px-5 py-3 transition-colors duration-200"
              >
                Orçamento Gratuito
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-metal-dark">
              © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-metal-dark">
              CNPJ 00.000.000/0001-00 — São Paulo, SP
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
