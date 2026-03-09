import { motion } from 'framer-motion'
import { Flower2, Crown, Star, Mic, Scissors, Palette } from 'lucide-react'
import { competitionsContent } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  Flower2, Crown, Star, Mic, Scissors, Palette,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export function Competitions() {
  return (
    <section id="competitions" className="section bg-gradient-to-b from-[var(--color-black-light)] via-[var(--color-cherry-dark)]/15 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {competitionsContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {competitionsContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {competitionsContent.items.map((item) => {
            const Icon = iconMap[item.icon] || Crown
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="card-luxury overflow-hidden h-full transition-all duration-300 group-hover:border-[var(--color-gold)]/40">
                  {/* Image */}
                  {item.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          item.id === 'young-miss' ? 'young-miss-img'
                          : item.id === 'best-model' ? 'best-model-img'
                          : 'group-hover:scale-110'
                        }`}
                        style={{
                          objectPosition: item.id === 'young-miss'
                            ? 'center 4%'
                            : item.id === 'best-model'
                              ? 'center 4%'
                              : 'center 25%'
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full liquid-glass-sm flex items-center justify-center shrink-0 group-hover:border-[var(--color-gold)]/40 transition-colors">
                        <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--color-white)] leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[var(--color-gray-light)] text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
