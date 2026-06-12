'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Save } from 'lucide-react'

interface ConfiguracoesFormProps {
  settings: Record<string, string>
}

interface FieldConfig {
  key: string
  label: string
  placeholder: string
  hint?: string
}

const SECTIONS: { title: string; fields: FieldConfig[] }[] = [
  {
    title: 'Empresa',
    fields: [
      { key: 'company_name', label: 'Nome da empresa', placeholder: 'Ferro & Arte Serralheria' },
      { key: 'company_tagline', label: 'Tagline', placeholder: 'Precisão e resistência em cada detalhe' },
      { key: 'company_phone', label: 'Telefone principal', placeholder: '(11) 99999-9999' },
      { key: 'whatsapp_number', label: 'WhatsApp (E.164)', placeholder: '5511999999999', hint: 'Formato: código do país + DDD + número, sem espaços ou símbolos' },
      { key: 'company_email', label: 'E-mail', placeholder: 'contato@empresa.com.br' },
      { key: 'company_address', label: 'Endereço', placeholder: 'Rua das Indústrias, 100 – São Paulo, SP' },
    ],
  },
  {
    title: 'Links e Redes Sociais',
    fields: [
      { key: 'social_instagram', label: 'Instagram (URL completa)', placeholder: 'https://instagram.com/suaempresa' },
      { key: 'social_facebook', label: 'Facebook (URL completa)', placeholder: 'https://facebook.com/suaempresa' },
      { key: 'google_maps_url', label: 'Google Maps (URL embed)', placeholder: 'https://maps.google.com/maps?q=...' },
      { key: 'hero_video_url', label: 'Vídeo da hero (URL)', placeholder: 'https://cdn.supabase.co/...mp4', hint: 'Opcional — URL pública do vídeo mp4' },
    ],
  },
]

export function ConfiguracoesForm({ settings }: ConfiguracoesFormProps) {
  const [values, setValues] = useState<Record<string, string>>(settings)
  const [saving, setSaving] = useState(false)

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    const updates = Object.entries(values).map(([key, value]) => ({ key, value }))
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: updates }),
    })
    setSaving(false)
    if (res.ok) {
      toast.success('Configurações salvas com sucesso.')
    } else {
      toast.error('Erro ao salvar configurações.')
    }
  }

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-5">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {section.fields.map((field) => (
              <div key={field.key} className={field.key === 'company_address' || field.key === 'company_tagline' ? 'md:col-span-2' : ''}>
                <Label htmlFor={field.key} className="text-slate-500 text-sm">{field.label}</Label>
                <Input
                  id={field.key}
                  value={values[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#ea580c]/60"
                />
                {field.hint && (
                  <p className="text-xs text-slate-400 mt-1">{field.hint}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar configurações'}
        </Button>
      </div>
    </div>
  )
}
