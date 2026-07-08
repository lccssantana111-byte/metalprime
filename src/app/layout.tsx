import type { Metadata } from 'next'
import { DM_Sans, Outfit, IBM_Plex_Mono, Barlow_Condensed } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { BRAND_NAME, COMPANY_TAGLINE, SITE_URL } from '@/lib/constants'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | ${COMPANY_TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: COMPANY_TAGLINE,
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: BRAND_NAME,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${outfit.variable} ${ibmPlexMono.variable} ${barlowCondensed.variable}`}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body className="min-h-screen bg-background text-foreground antialiased">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
