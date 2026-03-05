import { motion } from 'framer-motion'
import { Camera, Mic, Crown, Gem, Globe, GraduationCap } from 'lucide-react'
import { Card, CardContent } from './ui'
import { benefitsContent } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Mic,
  Crown,
  Gem,
  Globe,
  GraduationCap,
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

export function Benefits() {
  return (
    <section id="benefits" className="section bg-gradient-to-b from-[var(--color-black)] via-[var(--color-cherry-dark)]/15 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {benefitsContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {benefitsContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefitsContent.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Gem

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center p-8 group">
                  <CardContent>
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full liquid-glass-sm flex items-center justify-center group-hover:border-[var(--color-gold)]/40 transition-all duration-300">
                      <Icon className="w-8 h-8 text-[var(--color-gold)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-white)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-gray-light)]">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
