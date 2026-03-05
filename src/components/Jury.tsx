import { motion } from 'framer-motion'
import {
  Crown,
  Mic,
  BookOpen,
  Palette,
  Globe,
  Briefcase,
  Film,
  Drama,
  Shield,
  Users,
} from 'lucide-react'
import { juryContent } from '@/content'

const roleIconMap: Record<string, React.ElementType> = {
  'Председатель жюри': Crown,
  'Народная артистка РСФСР': Mic,
  'Историк моды': BookOpen,
  'Художник, дизайнер': Palette,
  'Президент WRB': Globe,
  'Генеральный директор FHI': Briefcase,
  'Генеральный продюсер': Film,
  'Режиссёр-постановщик': Drama,
  'Председатель мандатной комиссии': Shield,
  'Директор российского филиала': Users,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Jury() {
  return (
    <section id="jury" className="section bg-gradient-to-br from-[var(--color-black)] via-[var(--color-cherry-dark)]/20 to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {juryContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {juryContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Jury Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {juryContent.members.map((member) => {
            const Icon = roleIconMap[member.role] || Crown
            return (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl liquid-glass-sm transition-all duration-500 group-hover:border-[var(--color-gold)]/40 h-full flex flex-col">
                  {/* Photo */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: 'center 20%' }}
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent" />
                    {/* Role icon badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--color-black)]/70 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--color-gold)]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-[var(--color-white)] text-sm mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[var(--color-gold)] text-xs mb-1 min-h-[2.5rem] flex items-center justify-center">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-[var(--color-gray-light)] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 min-h-[2rem]">
                      {member.description}
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
