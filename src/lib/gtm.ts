import { sendGTMEvent } from '@next/third-parties/google'

/**
 * Dispara um evento no dataLayer quando o usuário clica em um link do WhatsApp.
 * `source` identifica de qual ponto do site o clique partiu, para segmentação no GTM/GA4.
 */
export function trackWhatsAppClick(source: string) {
  sendGTMEvent({ event: 'whatsapp_click', source })
}

/**
 * Dispara um evento no dataLayer após a confirmação de sucesso de um envio de formulário
 * (chamar somente depois que a API respondeu OK — não no clique do botão).
 */
export function trackFormSubmit(formName: string, extra?: Record<string, unknown>) {
  sendGTMEvent({ event: 'form_submit', form_name: formName, ...extra })
}
