import { z } from 'zod'

export const quoteSchema = z.object({
  services: z.array(z.string()).nonempty(),
  specs: z.record(z.string(), z.unknown()).optional().default({}),
  description: z.string().max(2000).optional(),
  reference_image_paths: z.array(z.string()).max(5).optional().default([]),
  name: z.string().min(2, 'Nome obrigatório').max(100),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^\d+$/, 'Apenas números')
    .max(15),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  cep: z
    .string()
    .min(8, 'CEP inválido')
    .regex(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
  address: z.string().min(5, 'Endereço obrigatório').max(200),
  city: z.string().min(2, 'Cidade obrigatória').max(100),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
