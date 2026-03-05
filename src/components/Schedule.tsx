import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardCheck,
  Sparkles,
  Star,
  Crown,
  Trophy,
  Wine,
  Calendar,
  GraduationCap,
  Search,
  Mic,
  Scissors,
  Palette,
  MapPin,
} from 'lucide-react'
import { scheduleContent } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  Sparkles,
  Star,
  Crown,
  Trophy,
  Wine,
  GraduationCap,
  Search,
  Mic,
  Scissors,
  Palette,
}

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="schedule" className="section bg-gradient-to-br from-[var(--color-black-light)] to-[var(--color-cherry-dark)]/20">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {scheduleContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {scheduleContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Day Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {scheduleContent.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeDay === index
                  ? 'bg-[var(--color-gold)] text-[var(--color-black)] shadow-lg shadow-[var(--color-gold)]/20'
                  : 'liquid-glass-sm text-[var(--color-gray-light)] hover:text-[var(--color-white)] hover:border-[var(--color-gold)]/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {day.date}
              </span>
            </button>
          ))}
        </div>

        {/* Day Content */}
        <AnimatePresence mode="wait">
          {scheduleContent.days.map((day, dayIndex) =>
            activeDay === dayIndex ? (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                {/* Day Title */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-2">
                    {day.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-[var(--color-gray-light)] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{day.venue}</span>
                  </div>
                </div>

                {/* Timeline Items */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {day.items.map((item, index) => {
                    const Icon = iconMap[item.icon] || Sparkles
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative flex gap-6 pb-8 last:pb-0"
                      >
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full liquid-glass-sm border-2 border-[var(--color-gold)]/50 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                          </div>
                          {index < day.items.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gradient-to-b from-[var(--color-gold)] to-[var(--color-gray-dark)] mt-2" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                          <div className="card-luxury p-5 group hover:border-[var(--color-gold)]">
                            <div className="text-[var(--color-gold)] font-bold text-lg mb-1">
                              {item.time}
                            </div>
                            <h4 className="text-[var(--color-white)] font-semibold text-lg mb-2">
                              {item.title}
                            </h4>
                            <p className="text-[var(--color-gray-light)] text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
