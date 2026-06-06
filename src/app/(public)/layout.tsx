import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import LenisProvider from '@/components/layout/LenisProvider'
import Preloader from '@/components/layout/Preloader'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Preloader />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFAB />
    </LenisProvider>
  )
}
