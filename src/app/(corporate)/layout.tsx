import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants'

export default async function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-carbon">
      {user && (
        <header className="sticky top-0 z-40 bg-graphite/95 backdrop-blur-sm border-b border-metal-dark/30">
          {/* Top amber accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/50 to-transparent" />

          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/corporate/dashboard" className="flex items-center gap-3 group">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 border border-amber-brand/30 rotate-45 transition-colors group-hover:border-amber-brand/60" />
                <div
                  className="w-3 h-3 bg-amber-brand"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-foreground text-sm">
                  {BRAND_NAME.split(' ')[0]}
                  <span className="text-amber-brand">.</span>
                </span>
                <span className="text-[10px] text-metal-dark uppercase tracking-widest">
                  Portal Corporativo
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-xs text-metal-dark hidden sm:block truncate max-w-[200px]">
                {user.email}
              </span>
              <div className="w-px h-4 bg-metal-dark/40 hidden sm:block" />
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-xs text-metal hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-steel/40"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
