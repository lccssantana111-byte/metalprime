'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { UserPlus, X, Trash2, ShieldCheck, Briefcase, Eye, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { convidarUsuario, removerUsuario } from './actions'
import { formatDate } from '@/lib/utils'

const ROLE_CONFIG = {
  admin: { label: 'Admin', icon: ShieldCheck, className: 'border-amber-brand/40 text-amber-brand' },
  comercial: { label: 'Comercial', icon: Briefcase, className: 'border-blue-500/30 text-blue-300' },
  viewer: { label: 'Visualizador', icon: Eye, className: 'border-slate-200 text-slate-400' },
} as const

interface User {
  id: string
  full_name: string
  role: string
  is_active: boolean
  created_at: string
  email: string
  last_sign_in: string | null | undefined
}

export function UsuariosClient({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [role, setRole] = useState('comercial')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleConvidar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const result = await convidarUsuario(new FormData(e.currentTarget))
    setLoading(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Convite enviado! A pessoa receberá um e-mail para definir a senha.')
      setModalOpen(false)
      formRef.current?.reset()
      setRole('comercial')
    }
  }

  async function handleRemover(userId: string, nome: string) {
    if (!confirm(`Remover ${nome} do painel? Esta ação não pode ser desfeita.`)) return
    setRemovingId(userId)
    const result = await removerUsuario(userId)
    setRemovingId(null)
    if (result.error) toast.error(result.error)
    else toast.success('Usuário removido.')
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Usuários</h1>
          <p className="text-slate-500 mt-1">
            {users.length} usuário{users.length !== 1 ? 's' : ''} com acesso ao painel
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-amber-brand hover:bg-amber-light text-carbon font-bold gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Adicionar usuário
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">E-mail</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Perfil</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Último acesso</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Desde</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const roleCfg = ROLE_CONFIG[u.role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.viewer
                const RoleIcon = roleCfg.icon
                const isSelf = u.id === currentUserId
                return (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-steel flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-slate-600 uppercase">
                            {(u.full_name || u.email)[0]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {u.full_name}
                          {isSelf && <span className="ml-2 text-xs text-slate-400">(você)</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-500">{u.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="outline" className={`text-xs border inline-flex items-center gap-1 ${roleCfg.className}`}>
                        <RoleIcon className="w-3.5 h-3.5" />
                        {roleCfg.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-400">
                        {u.last_sign_in ? formatDate(u.last_sign_in) : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-400">{formatDate(u.created_at)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {!isSelf && (
                        <button
                          onClick={() => handleRemover(u.id, u.full_name)}
                          disabled={removingId === u.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                          title="Remover usuário"
                        >
                          {removingId === u.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Adicionar usuário</h2>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form ref={formRef} onSubmit={handleConvidar} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-slate-600 text-xs uppercase tracking-wider">Nome completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Ex: João Silva"
                    required
                    className="bg-carbon/60 border-slate-300/50 focus:border-amber-brand/60 text-foreground placeholder:text-slate-400 h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-600 text-xs uppercase tracking-wider">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="joao@email.com"
                    required
                    className="bg-carbon/60 border-slate-300/50 focus:border-amber-brand/60 text-foreground placeholder:text-slate-400 h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 text-xs uppercase tracking-wider">Perfil de acesso</Label>
                  <input type="hidden" name="role" value={role} />
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.entries(ROLE_CONFIG) as [string, typeof ROLE_CONFIG[keyof typeof ROLE_CONFIG]][]).map(([key, cfg]) => {
                      const Icon = cfg.icon
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setRole(key)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                            role === key
                              ? 'border-amber-brand bg-amber-brand/10 text-amber-brand'
                              : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-foreground'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {cfg.label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {role === 'admin' && 'Acesso total ao painel — crie, edite e remova qualquer dado.'}
                    {role === 'comercial' && 'Gerencia leads, orçamentos e projetos. Não altera configurações.'}
                    {role === 'viewer' && 'Apenas visualização. Não pode criar nem editar nada.'}
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 border-slate-200 text-slate-500 hover:text-slate-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-amber-brand hover:bg-amber-light text-carbon font-bold"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Adicionar'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
