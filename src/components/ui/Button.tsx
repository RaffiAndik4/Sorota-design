import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${buttonClasses(variant, size)} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
