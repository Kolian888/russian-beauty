import { motion } from 'framer-motion'
import { Flag, Dumbbell, Sparkles, FileCheck, CheckCircle, Info } from 'lucide-react'
import { regulationsContent } from '@/content'

const exitIconMap: Record<string, React.ElementType> = {
  Flag, Dumbbell, Sparkles,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Regulations() {
  return (
    <section id="regulations" className="section bg-gradient-to-b from-[var(--color-black)] via-[var(--color-cherry-dark)]/20 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {regulationsContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {regulationsContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Competition Exits — with side image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-6 text-center">
              {regulationsContent.competitionExits.title}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Exit cards */}
              <div className="grid grid-cols-1 gap-6">
                {regulationsContent.competitionExits.items.map((item, index) => {
                  const Icon = exitIconMap[item.icon] || Sparkles
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="card-luxury p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full liquid-glass-sm flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[var(--color-white)] mb-1">
                            {item.name}
                          </h4>
                          <p className="text-[var(--color-gray-light)] text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              {/* Right: Image */}
              <div className="hidden lg:block rounded-2xl overflow-hidden border border-[var(--color-white)]/10">
                <img
                  src="/assets/images/regulations/exits.jpg"
                  alt="Конкурсные выходы на фестивале"
                  className="w-full h-full object-cover aspect-[3/4]"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="card-luxury p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileCheck className="w-6 h-6 text-[var(--color-gold)]" />
                <h3 className="text-2xl font-bold text-[var(--color-white)]">
                  {regulationsContent.requirements.title}
                </h3>
              </div>
              <p className="text-[var(--color-cherry-light)] font-medium mb-4">
                Срок подачи: до {regulationsContent.requirements.deadline}
              </p>
              <ul className="space-y-3">
                {regulationsContent.requirements.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-gray-light)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="liquid-glass p-8">
              <h3 className="text-2xl font-bold text-[var(--color-white)] mb-6">
                {regulationsContent.included.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regulationsContent.included.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-gray-light)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 p-5 rounded-xl bg-[var(--color-cherry-dark)]/20 border border-[var(--color-cherry)]/20"
          >
            <Info className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
            <p className="text-[var(--color-gray-light)] text-sm">{regulationsContent.note}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
