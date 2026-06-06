import { NextResponse } from 'next/server'
import { getDashboardMetrics } from '@/lib/queries/metrics'
import { requireAuth, isAuthError } from '@/lib/auth'

export async function GET() {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  try {
    const metrics = await getDashboardMetrics()
    return NextResponse.json(metrics)
  } catch (err) {
    console.error('[api/admin/metrics]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
