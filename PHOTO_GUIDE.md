# Инструкция по загрузке фотографий на сайт Moscow Beauty 2026

## Структура папок

Все изображения хранятся в папке `public/assets/images/`. Вот полная структура:

```
public/assets/images/
  ├── hero-bg.jpg            ← Фон главного экрана (1920x1080, мин.)
  ├── category-mini.jpg      ← Фото для категории Mini Miss
  ├── category-little.jpg    ← Фото для категории Little Miss
  ├── category-teen.jpg      ← Фото для категории Teen Miss
  ├── category-miss.jpg      ← Фото для категории Miss
  ├── category-mrs.jpg       ← Фото для категории Mrs
  ├── gallery/
  │   ├── gallery-1.jpg      ← Фото галереи (церемония награждения)
  │   ├── gallery-2.jpg      ← Фото галереи (дефиле)
  │   ├── gallery-3.jpg      ← Фото галереи (за кулисами)
  │   ├── gallery-4.jpg      ← Фото галереи (жюри)
  │   ├── gallery-5.jpg      ← Фото галереи (Mini Miss)
  │   ├── gallery-6.jpg      ← Фото галереи (подарки)
  │   ├── gallery-7.jpg      ← Фото галереи (зрители)
  │   ├── gallery-8.jpg      ← Фото галереи (фотозона)
  │   └── video-thumb-1.jpg  ← Превью видео
  ├── jury/
  │   ├── jury-1.jpg         ← Фото члена жюри #1
  │   ├── jury-2.jpg         ← Фото члена жюри #2
  │   ├── ...
  │   └── jury-12.jpg        ← Фото члена жюри #12
  └── partners/
      ├── partner-1.png      ← Логотип партнёра #1
      ├── partner-2.png      ← Логотип партнёра #2
      ├── ...
      └── partner-6.png      ← Логотип партнёра #6
```

---

## Пошаговая инструкция

### 1. Фон главного экрана (Hero)

**Файл:** `public/assets/images/hero-bg.jpg`

**Требования:**
- Размер: минимум 1920x1080 px
- Формат: JPG
- Тема: сцена, зал, фестиваль красоты, красная дорожка

**Как подключить:**
Откройте файл `src/components/Hero.tsx` и замените URL в строке `backgroundImage`:

```tsx
// Было (стоковое фото):
backgroundImage: `url('https://images.unsplash.com/...')`

// Стало (ваше фото):
backgroundImage: `url('/assets/images/hero-bg.jpg')`
```

---

### 2. Фотографии категорий

**Файлы:** `public/assets/images/category-mini.jpg`, `category-little.jpg`, `category-teen.jpg`, `category-miss.jpg`, `category-mrs.jpg`

**Требования:**
- Размер: минимум 600x800 px (вертикальная ориентация, пропорция 3:4)
- Формат: JPG
- Тема: представительница каждой категории

**Как подключить:**
Откройте `src/components/Categories.tsx` и добавьте отображение изображений. Замените плейсхолдер-иконку на `<img>`:

```tsx
// В блоке Image Placeholder замените:
<div className="absolute inset-0 flex items-center justify-center">
  <Icon className="..." />
</div>

// На:
<img
  src={category.image}
  alt={category.title}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

---

### 3. Фотографии жюри

**Файлы:** `public/assets/images/jury/jury-1.jpg` ... `jury-12.jpg`

**Требования:**
- Размер: минимум 400x400 px (квадрат)
- Формат: JPG
- Тема: портрет на нейтральном фоне

**Как подключить:**
Откройте `src/components/Jury.tsx` и замените плейсхолдер на `<img>`:

```tsx
// Замените блок с иконкой:
<div className="absolute inset-0 flex items-center justify-center">
  <Icon className="..." />
</div>

// На:
<img
  src={member.photo}
  alt={member.name}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

**Не забудьте** обновить имена жюри в файле `src/content.ts` — сейчас там стоит "Имя Фамилия".

---

### 4. Фотографии галереи

**Файлы:** `public/assets/images/gallery/gallery-1.jpg` ... `gallery-8.jpg`

**Требования:**
- Размер: минимум 800x800 px (квадрат)
- Формат: JPG
- Тема: моменты с фестиваля

**Как подключить:**
Откройте `src/components/Gallery.tsx` и замените плейсхолдер:

```tsx
// Замените блок Placeholder:
<div className="absolute inset-0 flex items-center justify-center">
  <Icon className="..." />
</div>

// На:
<img
  src={image.src}
  alt={image.alt}
  className="absolute inset-0 w-full h-full object-cover"
  loading="lazy"
/>
```

---

### 5. Логотипы партнёров

**Файлы:** `public/assets/images/partners/partner-1.png` ... `partner-6.png`

**Требования:**
- Размер: минимум 200x200 px
- Формат: PNG (прозрачный фон)
- Тема: логотип компании-партнёра

**Как подключить:**
Откройте `src/components/Partners.tsx` и замените иконку на `<img>`:

```tsx
// Замените:
<Icon className="w-12 h-12 ..." />

// На:
<img
  src={partner.logo}
  alt={partner.name}
  className="w-full h-full object-contain p-2"
/>
```

**Не забудьте** обновить названия и URL партнёров в `src/content.ts`.

---

### 6. Превью видео

**Файл:** `public/assets/images/gallery/video-thumb-1.jpg`

**Требования:**
- Размер: минимум 800x800 px
- Формат: JPG

**Также обновите** ссылку на видео в `src/content.ts`:
```ts
videos: [
  { id: 1, thumbnail: '/assets/images/gallery/video-thumb-1.jpg', url: 'https://youtube.com/watch?v=ВАШ_ID' },
],
```

---

## Оптимизация изображений

Перед загрузкой рекомендуется сжать изображения:

1. **Онлайн:** [squoosh.app](https://squoosh.app) или [tinypng.com](https://tinypng.com)
2. **Формат:** JPG для фото (качество 80-85%), PNG для логотипов с прозрачностью
3. **WebP:** Для лучшей производительности конвертируйте в WebP (поддерживается всеми браузерами)

## Обновление контента

Все тексты сайта (имена жюри, названия партнёров, описания) редактируются в одном файле:

```
src/content.ts
```

Откройте его в любом текстовом редакторе и замените плейсхолдеры на реальные данные.

---

## Быстрый чеклист

- [ ] Hero: загружен фон `hero-bg.jpg`, обновлён путь в `Hero.tsx`
- [ ] Категории: 5 фото загружены, код обновлён в `Categories.tsx`
- [ ] Жюри: 12 фото загружены, имена обновлены в `content.ts`, код обновлён в `Jury.tsx`
- [ ] Галерея: 8 фото загружены, код обновлён в `Gallery.tsx`
- [ ] Партнёры: 6 логотипов загружены, имена/URL обновлены в `content.ts`, код обновлён в `Partners.tsx`
- [ ] Видео: превью загружено, ссылка на YouTube обновлена в `content.ts`
