import { motion } from 'framer-motion'
import { Crown, Mail, Phone, Send, MapPin, Calendar, Heart } from 'lucide-react'
import { footerContent, siteConfig, navigationContent } from '@/content'
import { scrollToElement } from '@/lib/utils'

export function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    scrollToElement(id)
  }

  return (
    <footer className="relative bg-gradient-to-b from-[var(--color-cherry-dark)]/20 to-[var(--color-black)] border-t border-[var(--color-white)]/10">
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2 text-[var(--color-gold)] font-display text-2xl font-bold mb-4"
            >
              <Crown className="w-7 h-7" />
              <span>{footerContent.logo}</span>
            </a>
            <p className="text-[var(--color-gray-light)] mb-4">
              {footerContent.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--color-gold)]">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{siteConfig.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gold)]">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{siteConfig.venue}</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[var(--color-white)] font-semibold mb-4">
              Навигация
            </h4>
            <ul className="space-y-3">
              {navigationContent.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-[var(--color-white)] font-semibold mb-4">
              Контакты
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="flex items-center gap-2 text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-[var(--color-white)] font-semibold mb-4">
              Мы в соцсетях
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full liquid-glass-sm flex items-center justify-center text-[var(--color-gray-light)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)] transition-all"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[var(--color-gray)] text-sm">
              Подписывайтесь на наш Telegram-канал для новостей и обновлений фестиваля
            </p>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-white)]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-gray)] text-sm flex items-center gap-1">
              {footerContent.copyright}
              <Heart className="w-3 h-3 text-[var(--color-cherry)]" />
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href={footerContent.links.privacy}
                className="text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href={footerContent.links.terms}
                className="text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
