const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''
const SHEETS_WEBHOOK = import.meta.env.VITE_SHEETS_WEBHOOK || ''

export interface FormData {
  fullName: string
  age: string
  city: string
  category: string
  phone: string
  email: string
  socialLinks?: string
  comment?: string
  ref?: string
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
    return true
  }

  const [telegramOk] = await Promise.allSettled([
    postTelegram(data),
    postSheets(data),
  ])

  return telegramOk.status === 'fulfilled' && telegramOk.value
}

async function postTelegram(data: FormData): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formatMessage(data),
          parse_mode: 'HTML',
        }),
      }
    )
    return response.ok
  } catch {
    return false
  }
}

async function postSheets(data: FormData): Promise<void> {
  if (!SHEETS_WEBHOOK) return
  try {
    await fetch(SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
        fullName: data.fullName,
        age: data.age,
        city: data.city,
        category: categoryLabels[data.category] || data.category,
        phone: data.phone,
        email: data.email,
        socialLinks: data.socialLinks || '',
        comment: data.comment || '',
        ref: data.ref || '',
      }),
    })
  } catch {
    // Sheets — не критично, не блокируем форму
  }
}

function formatMessage(data: FormData): string {
  const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
  const refLine = data.ref ? `\n<b>🔗 Реферал:</b> ${escapeHtml(data.ref)}` : ''

  return `
<b>🌟 Новая заявка на Russian Beauty 2026!</b>

<b>👤 ФИО:</b> ${escapeHtml(data.fullName)}
<b>📅 Возраст:</b> ${escapeHtml(data.age)} лет
<b>🏙 Город:</b> ${escapeHtml(data.city)}
<b>👑 Категория:</b> ${categoryLabels[data.category] || data.category}

<b>📱 Телефон:</b> ${escapeHtml(data.phone)}
<b>📧 Email:</b> ${escapeHtml(data.email)}
${data.socialLinks ? `<b>🔗 Соцсети:</b> ${escapeHtml(data.socialLinks)}` : ''}
${data.comment ? `<b>💬 Комментарий:</b> ${escapeHtml(data.comment)}` : ''}${refLine}

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
