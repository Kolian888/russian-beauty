import { motion } from 'framer-motion'
import { Button } from './ui'
import { partnersContent, siteConfig } from '@/content'

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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
}

export function Partners() {
  return (
    <section className="section bg-gradient-to-b from-[var(--color-black)] via-[var(--color-cherry-dark)]/10 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {partnersContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {partnersContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          {partnersContent.items.map((partner) => (
            <motion.a
              key={partner.id}
              variants={itemVariants}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-[5/2] rounded-xl liquid-glass-sm flex items-center justify-center p-4 transition-all duration-300 group-hover:border-[var(--color-gold)]/40 overflow-hidden">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-center text-[var(--color-gray-light)] text-sm mt-3">
                {partner.name}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            onClick={() => window.open(siteConfig.contacts.telegram, '_blank')}
          >
            {partnersContent.ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
