import { motion } from 'framer-motion'
import { Heart, Crown, Gem } from 'lucide-react'
import { categoriesContent } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Crown,
  Gem,
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export function Categories() {
  return (
    <section id="categories" className="section bg-gradient-to-b from-[var(--color-black-light)] via-[var(--color-cherry-dark)]/30 to-[var(--color-black-light)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {categoriesContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {categoriesContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Category Groups */}
        <div className="space-y-16">
          {categoriesContent.groups.map((group, groupIndex) => {
            const GroupIcon = iconMap[group.icon] || Crown
            return (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Group Banner Image */}
                <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--color-white)]/10">
                  <div className="relative aspect-[21/9] md:aspect-[3/1]">
                    <img
                      src={group.image}
                      alt={`${group.groupTitle} категория`}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: group.groupTitle === 'Mini'
                          ? 'center 50%'
                          : group.groupTitle === 'Miss'
                          ? 'center 25%'    // лица видны в верхней части
                          : 'center 5%'     // Mrs — группа видна сверху
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)]/80 via-[var(--color-black)]/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center p-8 md:p-12">
                      <div>
                        <GroupIcon className="w-8 h-8 text-[var(--color-gold)] mb-2" />
                        <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-gold)]">
                          {group.groupTitle}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`grid gap-6 ${
                    group.items.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {group.items.map((category) => (
                    <motion.div
                      key={category.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="card-luxury p-6 h-full transition-all duration-300 group-hover:border-[var(--color-gold)]/40">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[var(--color-gold)] font-bold text-sm px-3 py-1 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20">
                            {category.ageRange}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-[var(--color-white)] mb-2">
                          {category.title}
                        </h4>
                        <p className="text-[var(--color-gray-light)] text-sm">
                          {category.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
