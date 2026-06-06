import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).regex(/^\d+$/).max(15),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10).max(2000),
})

export type ContactFormData = z.infer<typeof contactSchema>
