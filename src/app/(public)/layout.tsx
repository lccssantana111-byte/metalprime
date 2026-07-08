import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import LenisProvider from '@/components/layout/LenisProvider'
import Preloader from '@/components/layout/Preloader'
import { WhatsAppNumberProvider } from '@/components/providers/WhatsAppNumberProvider'
import { getWhatsAppNumber } from '@/lib/queries/settings'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const whatsappNumber = await getWhatsAppNumber()

  return (
    <WhatsAppNumberProvider number={whatsappNumber}>
      <LenisProvider>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </LenisProvider>
    </WhatsAppNumberProvider>
  )
}
