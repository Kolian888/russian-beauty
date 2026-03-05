import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Crown, Award, Sparkles } from 'lucide-react'
import { siteConfig } from '@/content'

const stats = [
  {
    icon: Users,
    value: siteConfig.stats.participants,
    label: 'участниц',
  },
  {
    icon: Crown,
    value: siteConfig.stats.categories,
    label: 'категорий',
  },
  {
    icon: Award,
    value: siteConfig.stats.juryMembers,
    label: 'экспертов жюри',
  },
  {
    icon: Sparkles,
    value: siteConfig.stats.competitions,
    label: 'направлений',
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-[var(--color-gold)] mb-1">
      {display}{suffix}
    </div>
  )
}

function parseStatValue(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/)
  if (match) return { num: parseInt(match[1], 10), suffix: match[2] }
  return { num: 0, suffix: raw }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function SocialProof() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(110,26,53,0.25), rgba(42,26,36,0.6), rgba(110,26,53,0.25))' }}>
      {/* Decorative gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />

      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const { num, suffix } = parseStatValue(stat.value)
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full liquid-glass-sm flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[var(--color-gold)]" />
                </div>
                <AnimatedNumber value={num} suffix={suffix} />
                <div className="text-[var(--color-gray-light)] text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Decorative gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
    </section>
  )
}
