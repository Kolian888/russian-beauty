import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ZoomIn, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryContent } from '@/content'

const PHOTOS_PREVIEW = 10

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
}

const getVideoId = (url: string) => url.split('/video/')[1]?.replace('/', '') ?? ''

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const images = galleryContent.images
  const visiblePhotos = showAllPhotos ? images : images.slice(0, PHOTOS_PREVIEW)

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % images.length)
  }, [selectedIndex, images.length])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }, [selectedIndex, images.length])

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, goNext, goPrev])

  return (
    <section id="gallery" className="section bg-gradient-to-br from-[var(--color-black-light)] via-[var(--color-cherry-dark)]/15 to-[var(--color-black-light)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {galleryContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {galleryContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* — ФОТОГРАФИИ — */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8 bg-[var(--color-gold)]/40" />
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] font-medium">Фотографии</span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap justify-center gap-4"
        >
          {visiblePhotos.map((image, idx) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square cursor-pointer group"
              style={{ width: 'calc(50% - 8px)', maxWidth: '280px', minWidth: '160px' }}
              onClick={() => setSelectedIndex(idx)}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-300 border border-[var(--color-white)]/10 group-hover:border-[var(--color-gold)]/40">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center 30%' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[var(--color-black)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-black)]/80 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more / less button */}
        {images.length > PHOTOS_PREVIEW && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAllPhotos(!showAllPhotos)}
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              {showAllPhotos ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Свернуть
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Смотреть все фото ({images.length})
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* — ВИДЕО — */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mt-16 mb-6"
        >
          <div className="h-[1px] w-8 bg-[var(--color-gold)]/40" />
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] font-medium">Видео</span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryContent.videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              onClick={() => setSelectedVideo(getVideoId(video.url))}
              className="relative aspect-video cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-300 border border-[var(--color-white)]/10 group-hover:border-[var(--color-gold)]/40">
                <img
                  src={video.thumbnail}
                  alt="Видео фестиваля"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[var(--color-black)]/30 group-hover:bg-[var(--color-black)]/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-black)]/60 flex items-center justify-center group-hover:bg-[var(--color-gold)]/80 transition-colors border-2 border-[var(--color-gold)]/60 group-hover:border-[var(--color-gold)]">
                    <Play className="w-8 h-8 text-[var(--color-gold)] group-hover:text-[var(--color-white)] ml-1 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-black)]/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://rutube.ru/play/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full rounded-xl"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[var(--color-black)]/80 flex items-center justify-center text-[var(--color-white)] hover:text-[var(--color-gold)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox с навигацией */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-black)]/95 p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Кнопка назад */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-[var(--color-black)]/80 border border-[var(--color-white)]/20 flex items-center justify-center text-[var(--color-white)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/50 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Фото */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
              {/* Счётчик */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-black)]/70 text-[var(--color-gray-light)] text-xs">
                {selectedIndex + 1} / {images.length}
              </div>
              {/* Закрыть */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-black)]/80 flex items-center justify-center text-[var(--color-white)] hover:text-[var(--color-gold)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Кнопка вперёд */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-[var(--color-black)]/80 border border-[var(--color-white)]/20 flex items-center justify-center text-[var(--color-white)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/50 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
