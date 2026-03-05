import { motion } from 'framer-motion'
import { Crown, Star, Globe, Mic, Building2 } from 'lucide-react'
import { honoraryGuestsContent } from '@/content'

const categoryIcons: Record<string, React.ElementType> = {
  'Легенды мировой моды': Crown,
  'Народные и заслуженные артисты России': Star,
  'Голливуд и международные звезды': Globe,
  'VIP-гости и звезды шоу-бизнеса': Mic,
  'Официальные лица и дипломаты': Building2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface Guest {
  id: string
  name: string
  role: string
  years: string
  photo?: string
  description: string
}

function GuestCard({ guest }: { guest: Guest }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl liquid-glass-sm transition-all duration-500 group-hover:border-[var(--color-gold)]/40 h-full flex flex-col">
        {/* Photo or Initials */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[var(--color-cherry-dark)]/30 to-[var(--color-black)]">
          {guest.photo ? (
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: 'center 20%' }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold text-[var(--color-gold)]/60 font-serif">
                {getInitials(guest.name)}
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent" />
          {/* Years badge */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--color-black)]/70 text-[var(--color-gold)] text-[10px] font-medium">
            {guest.years}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 text-center flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-[var(--color-white)] text-sm mb-1">
              {guest.name}
            </h4>
            <p className="text-[var(--color-gold)] text-xs mb-1 min-h-[2rem] flex items-center justify-center leading-tight">
              {guest.role}
            </p>
          </div>
          <p className="text-[var(--color-gray-light)] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3 min-h-[2.5rem]">
            {guest.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function HonoraryGuests() {
  return (
    <section
      id="honorary-guests"
      className="section bg-gradient-to-br from-[var(--color-black)] via-[var(--color-cherry-dark)]/10 to-[var(--color-black)]"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {honoraryGuestsContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-3xl mx-auto">
            {honoraryGuestsContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16"
        >
          {[
            { label: 'Звезд', value: honoraryGuestsContent.stats.totalStars },
            { label: 'Народных артистов', value: honoraryGuestsContent.stats.honoredArtists },
            { label: 'Голливуд', value: honoraryGuestsContent.stats.hollywood },
            { label: 'VIP-гостей', value: honoraryGuestsContent.stats.vipGuests },
            { label: 'Лет истории', value: honoraryGuestsContent.stats.yearsOfHistory },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-gold)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-gray-light)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Categories */}
        {honoraryGuestsContent.categories.map((category) => {
          const Icon = categoryIcons[category.title] || Star
          return (
            <div key={category.title} className="mb-16 last:mb-0">
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-white)]">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-gold)]/30 to-transparent" />
              </motion.div>

              {/* Guests grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {category.guests.map((guest) => (
                  <GuestCard key={guest.id} guest={guest} />
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
