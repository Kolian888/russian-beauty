import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-gray-light)]"
          >
            {label}
            {props.required && <span className="text-[var(--color-gold)] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${className} ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          {...props}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-gray-light)]"
          >
            {label}
            {props.required && <span className="text-[var(--color-gold)] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`resize-none ${className} ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          rows={4}
          {...props}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--color-gray-light)]"
          >
            {label}
            {props.required && <span className="text-[var(--color-gold)] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`cursor-pointer ${className} ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          {...props}
        >
          <option value="">Выберите...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || props.name

    return (
      <div className="space-y-1">
        <label htmlFor={checkboxId} className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`w-5 h-5 mt-0.5 rounded border-[var(--color-gray-dark)] bg-[var(--color-black-light)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] cursor-pointer ${className}`}
            {...props}
          />
          <span className="text-sm text-[var(--color-gray-light)]">
            {label}
            {props.required && <span className="text-[var(--color-gold)] ml-1">*</span>}
          </span>
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
