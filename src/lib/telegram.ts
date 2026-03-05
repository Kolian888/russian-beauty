// Telegram Bot Integration
// Замените значения на реальные токен и chat_id

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''

export interface FormData {
  fullName: string
  age: string
  city: string
  category: string
  phone: string
  email: string
  socialLinks?: string
  comment?: string
}

const categoryLabels: Record<string, string> = {
  mini: 'Mini Miss (4-7 лет)',
  little: 'Little Miss (8-12 лет)',
  teen: 'Teen Miss (13-17 лет)',
  miss: 'Miss (18-28 лет)',
  mrs: 'Mrs (25+ лет)',
}

export async function sendToTelegram(data: FormData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured. Simulating success.')
    // В режиме разработки без токена - симулируем успех
    return true
  }

  const message = formatMessage(data)

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return false
  }
}

function formatMessage(data: FormData): string {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
  })

  return `
<b>🌟 Новая заявка на Russian Beauty 2026!</b>

<b>👤 ФИО:</b> ${escapeHtml(data.fullName)}
<b>📅 Возраст:</b> ${escapeHtml(data.age)} лет
<b>🏙 Город:</b> ${escapeHtml(data.city)}
<b>👑 Категория:</b> ${categoryLabels[data.category] || data.category}

<b>📱 Телефон:</b> ${escapeHtml(data.phone)}
<b>📧 Email:</b> ${escapeHtml(data.email)}
${data.socialLinks ? `<b>🔗 Соцсети:</b> ${escapeHtml(data.socialLinks)}` : ''}
${data.comment ? `<b>💬 Комментарий:</b> ${escapeHtml(data.comment)}` : ''}

<i>⏰ Отправлено: ${timestamp}</i>
`.trim()
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
