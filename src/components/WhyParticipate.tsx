import { motion } from 'framer-motion'
import { Sparkles, Briefcase, Camera, Globe, Users, Heart } from 'lucide-react'
import { Button } from './ui'
import { whyParticipateContent } from '@/content'
import { scrollToElement } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Briefcase,
  Camera,
  Globe,
  Users,
  Heart,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function WhyParticipate() {
  return (
    <section id="why-participate" className="section bg-gradient-to-b from-[var(--color-black)] via-[var(--color-cherry-dark)]/20 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {whyParticipateContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {whyParticipateContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {whyParticipateContent.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="card-luxury p-8 h-full text-center transition-all duration-300 group-hover:border-[var(--color-gold)]/40">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full liquid-glass-sm flex items-center justify-center group-hover:border-[var(--color-gold)]/40 transition-all duration-300">
                    <Icon className="w-8 h-8 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-white)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-gray-light)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => scrollToElement(whyParticipateContent.cta.href.replace('#', ''))}
          >
            {whyParticipateContent.cta.text}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
