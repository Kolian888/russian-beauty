import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui'
import { heroContent, siteConfig } from '@/content'
import { useCountdown } from '@/hooks/useCountdown'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const countdown = useCountdown(siteConfig.dateISO)

  const handleCTA = () => scrollToElement('form')
  const handleLearnMore = () => scrollToElement('why-participate')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/images/hero/заставка_вариант_2.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black)]/85 via-[var(--color-black)]/70 to-[var(--color-black)]/95" />
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-44 pb-32 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-[var(--color-white)]">{heroContent.title}</span>
              <br />
              <span className="text-gradient-gold">{heroContent.titleAccent}</span>
            </h1>
          </motion.div>

          {/* Subtitle + Description in elegant rectangle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-3 px-10 py-6 rounded-3xl bg-gradient-to-b from-[var(--color-black)]/80 to-[var(--color-black)]/60 backdrop-blur-lg border border-[var(--color-gold)]/50 shadow-2xl max-w-2xl mx-auto">
              <p className="font-accent text-2xl md:text-3xl text-[var(--color-gold)]">
                {heroContent.subtitle}
              </p>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />
              <p className="text-[var(--color-gray-light)] text-base md:text-lg text-center">
                Отборочный этап на международные конкурсы European Beauty, Asian Beauty и World Beauty 2026
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          {!countdown.isExpired && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 mb-8"
            >
              {[
                { value: countdown.days, label: 'дней' },
                { value: countdown.hours, label: 'часов' },
                { value: countdown.minutes, label: 'минут' },
                { value: countdown.seconds, label: 'секунд' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl min-w-[80px] bg-[var(--color-black)]/60 backdrop-blur-md border border-[var(--color-gold)]/20"
                >
                  <span className="text-3xl md:text-4xl font-bold text-[var(--color-gold)]">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-[var(--color-gold-light)] uppercase tracking-wider font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Event Info in dark rectangle — moved below countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-b from-[var(--color-black)]/80 to-[var(--color-black)]/60 backdrop-blur-lg border border-[var(--color-gold)]/40 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
                <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] font-medium">27–29 марта 2026</span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
              </div>
              <span className="text-[var(--color-gray-light)] text-sm">Парк-отель Гринвуд, Московская область</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" onClick={handleCTA}>
              {heroContent.ctaText}
            </Button>
            <Button variant="outline" size="lg" onClick={handleLearnMore}>
              {heroContent.ctaSecondary}
            </Button>
          </motion.div>

          {/* Social Proof under CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-[var(--color-gray)] text-sm mt-6"
          >
            {heroContent.socialProof}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={handleLearnMore}
          >
            <ChevronDown className="w-8 h-8 text-[var(--color-gold)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
