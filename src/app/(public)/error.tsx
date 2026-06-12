'use client'

import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="pt-24 pb-16 min-h-[60vh] flex items-center" style={{ background: '#ffffff' }}>
      <div className="container mx-auto px-4 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>
          Algo deu errado
        </h1>
        <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#64748b' }}>
          Não foi possível carregar esta página. Tente novamente ou volte ao início.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: '#f97316', color: '#ffffff' }}
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
