import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LeadForm } from '@/components/admin/leads/LeadForm'

export default function NovoLeadPage() {
  return (
    <div>
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-metal hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar aos leads
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Novo Lead</h1>
      <LeadForm />
    </div>
  )
}
