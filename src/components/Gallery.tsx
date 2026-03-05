import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ZoomIn } from 'lucide-react'
import { galleryContent } from '@/content'

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

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

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

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryContent.images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-300 border border-[var(--color-white)]/10 group-hover:border-[var(--color-gold)]/40">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center 30%' }}
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[var(--color-black)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-black)]/80 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Video Thumbnails */}
          {galleryContent.videos.map((video) => (
            <motion.a
              key={video.id}
              variants={itemVariants}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-300 border border-[var(--color-white)]/10 group-hover:border-[var(--color-gold)]/40">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cherry)]/20 to-[var(--color-black-light)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center group-hover:bg-[var(--color-gold)]/30 transition-colors">
                    <Play className="w-8 h-8 text-[var(--color-gold)] ml-1" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-black)]/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-black)]/80 flex items-center justify-center text-[var(--color-white)] hover:text-[var(--color-gold)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
