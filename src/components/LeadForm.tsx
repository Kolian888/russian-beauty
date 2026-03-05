import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Shield, Clock, Users } from 'lucide-react'
import { Button, Input, Textarea, Select, Checkbox } from './ui'
import { formContent, siteConfig } from '@/content'
import { sendToTelegram, type FormData as TelegramFormData } from '@/lib/telegram'

// Form CRO: stricter validation with helpful error messages
const formSchema = z.object({
  fullName: z.string().min(2, 'Введите имя и фамилию'),
  category: z.string().min(1, 'Выберите подходящую категорию'),
  age: z.string()
    .min(1, 'Укажите возраст')
    .refine((val) => {
      const num = Number(val)
      return num >= 3 && num <= 99
    }, 'Укажите возраст от 3 до 99 лет'),
  city: z.string().min(2, 'Укажите город'),
  phone: z.string()
    .min(10, 'Введите номер телефона')
    .regex(/^[\d\s+\-()]+$/, 'Введите корректный номер (например: +7 999 123-45-67)'),
  email: z.string().email('Введите корректный email (например: name@mail.ru)'),
  socialLinks: z.string().optional(),
  comment: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Для отправки заявки необходимо ваше согласие' }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export function LeadForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null)

    const telegramData: TelegramFormData = {
      fullName: data.fullName,
      age: data.age,
      city: data.city,
      category: data.category,
      phone: data.phone,
      email: data.email,
      socialLinks: data.socialLinks,
      comment: data.comment,
    }

    const success = await sendToTelegram(telegramData)

    if (success) {
      setIsSuccess(true)
      reset()
    } else {
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.')
    }
  }

  // Form CRO: Success state with clear next steps
  if (isSuccess) {
    return (
      <section id="form" className="section bg-gradient-to-b from-[var(--color-cherry-dark)]/15 via-[var(--color-black)] to-[var(--color-black)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[var(--color-gold)]" />
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-white)] mb-4">
              {formContent.successTitle}
            </h3>
            <p className="text-[var(--color-gray-light)] text-lg mb-8">
              {formContent.successMessage}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.open(siteConfig.contacts.telegram, '_blank')}
              >
                {formContent.successCta}
              </Button>
              <Button variant="outline" onClick={() => setIsSuccess(false)}>
                Отправить ещё одну заявку
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="form" className="section bg-gradient-to-b from-[var(--color-cherry-dark)]/15 via-[var(--color-black)] to-[var(--color-black)]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-white)] mb-4">
            {formContent.title}
          </h2>
          <p className="text-[var(--color-gray-light)] text-lg max-w-2xl mx-auto">
            {formContent.subtitle}
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="liquid-glass p-8">
              {/* Form CRO: Trust signals above fields */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 pb-6 border-b border-[var(--color-white)]/10">
                <div className="flex items-center gap-2 text-[var(--color-gray-light)] text-sm">
                  <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>{formContent.trustSignals[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-gray-light)] text-sm">
                  <Shield className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>{formContent.trustSignals[1]}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-gray-light)] text-sm">
                  <Users className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>{formContent.trustSignals[2]}</span>
                </div>
              </div>

              {/* Form CRO: Easy fields first (Name, Category), sensitive last (Phone, Email) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Name - easiest */}
                <Input
                  {...register('fullName')}
                  label={formContent.fields.fullName.label}
                  placeholder={formContent.fields.fullName.placeholder}
                  error={errors.fullName?.message}
                  autoComplete="name"
                  required
                />

                {/* 2. Category - builds commitment */}
                <Select
                  {...register('category')}
                  label={formContent.fields.category.label}
                  options={formContent.fields.category.options}
                  error={errors.category?.message}
                  required
                />

                {/* 3. Age */}
                <Input
                  {...register('age')}
                  type="number"
                  min={3}
                  max={99}
                  label={formContent.fields.age.label}
                  placeholder={formContent.fields.age.placeholder}
                  error={errors.age?.message}
                  required
                />

                {/* 4. City */}
                <Input
                  {...register('city')}
                  label={formContent.fields.city.label}
                  placeholder={formContent.fields.city.placeholder}
                  error={errors.city?.message}
                  autoComplete="address-level2"
                  required
                />

                {/* 5. Phone - sensitive, later */}
                <Input
                  {...register('phone')}
                  type="tel"
                  label={formContent.fields.phone.label}
                  placeholder={formContent.fields.phone.placeholder}
                  error={errors.phone?.message}
                  autoComplete="tel"
                  required
                />

                {/* 6. Email - sensitive, later */}
                <Input
                  {...register('email')}
                  type="email"
                  label={formContent.fields.email.label}
                  placeholder={formContent.fields.email.placeholder}
                  error={errors.email?.message}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Optional fields - clearly separated */}
              <div className="mt-6">
                <Input
                  {...register('socialLinks')}
                  label={formContent.fields.socialLinks.label}
                  placeholder={formContent.fields.socialLinks.placeholder}
                />
              </div>

              <div className="mt-6">
                <Textarea
                  {...register('comment')}
                  label={formContent.fields.comment.label}
                  placeholder={formContent.fields.comment.placeholder}
                />
              </div>

              {/* Consent */}
              <div className="mt-6">
                <Checkbox
                  {...register('consent')}
                  label={formContent.fields.consent.label}
                  error={errors.consent?.message}
                  required
                />
              </div>

              {/* Error */}
              {submitError && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              {/* Form CRO: Strong CTA with action + what they get */}
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {formContent.submitText}
                </Button>
                <p className="text-center text-[var(--color-gray)] text-xs mt-3">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки данных
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
