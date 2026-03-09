// Реферальная система через ?ref= параметр URL
// Пример: сайт.com/?ref=marina_spb

const REF_KEY = 'rb_ref'

/** Считываем ?ref= из URL и сохраняем в localStorage */
export function captureReferral(): void {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (ref) {
    localStorage.setItem(REF_KEY, ref.toLowerCase().trim())
  }
}

/** Получаем сохранённый реферал (или пустую строку) */
export function getReferral(): string {
  return localStorage.getItem(REF_KEY) || ''
}

/** Сбросить реферал (если нужно) */
export function clearReferral(): void {
  localStorage.removeItem(REF_KEY)
}
