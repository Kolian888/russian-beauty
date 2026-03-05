# Moscow Beauty 2026

Премиальный лендинг для фестиваля красоты, моды и таланта "Moscow Beauty 2026".

## Технологии

- **React 18** + **TypeScript**
- **Vite 6** (сборщик)
- **Tailwind CSS v4** (стилизация)
- **Framer Motion** (анимации)
- **Lucide React** (иконки)
- **React Hook Form** + **Zod** (формы и валидация)

## Структура проекта

```
src/
├── components/           # React-компоненты
│   ├── ui/              # UI-компоненты (Button, Card, Input)
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Benefits.tsx
│   ├── Categories.tsx
│   ├── Jury.tsx
│   ├── Schedule.tsx
│   ├── Partners.tsx
│   ├── Gallery.tsx
│   ├── LeadForm.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── hooks/               # Custom hooks
├── lib/                 # Утилиты и интеграции
│   ├── telegram.ts      # Отправка заявок в Telegram
│   └── utils.ts
├── content.ts           # Весь контент сайта
├── App.tsx
├── main.tsx
└── index.css            # Глобальные стили и дизайн-система
```

## Запуск проекта

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Настройте переменные окружения:
   ```bash
   cp .env.example .env
   ```
   Заполните `VITE_TELEGRAM_BOT_TOKEN` и `VITE_TELEGRAM_CHAT_ID`

3. Запустите сервер разработки:
   ```bash
   npm run dev
   ```

4. Сборка для продакшена:
   ```bash
   npm run build
   ```

## Интеграция с Telegram

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Добавьте бота в группу/чат и получите chat_id через [@getmyid_bot](https://t.me/getmyid_bot)
4. Заполните `.env` файл

## Редактирование контента

Весь текстовый контент находится в файле `src/content.ts`:
- `siteConfig` — основная информация (дата, место, контакты)
- `heroContent` — главный экран
- `benefitsContent` — преимущества участия
- `categoriesContent` — возрастные категории
- `juryContent` — члены жюри
- `scheduleContent` — расписание дня
- `partnersContent` — партнёры и спонсоры
- `galleryContent` — галерея фото и видео
- `formContent` — форма заявки
- `faqContent` — частые вопросы

## Изображения

Разместите изображения в папке `public/assets/`:
```
public/assets/
├── images/
│   ├── hero/         # Фоновые изображения
│   ├── jury/         # Фото жюри (jury-1.jpg, jury-2.jpg, ...)
│   ├── gallery/      # Галерея (gallery-1.jpg, ...)
│   └── partners/     # Логотипы партнёров
└── videos/
```

Обновите пути в `src/content.ts`.

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Добавьте Environment Variables:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`
3. Deploy

## Дизайн-система

**Цвета:**
- Primary (золото): `#D4AF37`
- Background (чёрный): `#0D0D0D`
- Surface: `#1A1A1A`

**Шрифты:**
- Заголовки: Playfair Display
- Акценты: Cormorant Garamond
- Текст: Inter

---

**Дата мероприятия:** 7 марта 2026
**Место:** Парк-отель Гринвуд, Путилково

*Документация: [SPEC.md](./SPEC.md)*
