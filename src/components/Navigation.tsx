import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from './ui'
import { navigationContent } from '@/content'
import { scrollToElement } from '@/lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    scrollToElement(id)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-[var(--color-gold)] font-display text-2xl font-bold"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img src="/assets/images/logos/world-beauty-gold.png" alt="World Beauty" className="h-10 w-10 object-contain" />
            <span>{navigationContent.logo}</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationContent.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => handleNavClick(navigationContent.ctaHref)}
            >
              {navigationContent.ctaText}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--color-white)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-[var(--color-gray-dark)]"
          >
            <div className="container-custom py-6 space-y-4">
              {navigationContent.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="block text-[var(--color-gray-light)] hover:text-[var(--color-gold)] transition-colors duration-300 py-2"
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="w-full mt-4"
                onClick={() => handleNavClick(navigationContent.ctaHref)}
              >
                {navigationContent.ctaText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
