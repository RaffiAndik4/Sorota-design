import type { ReactNode } from 'react'

export type BadgeTone = 'brand' | 'neutral' | 'amber' | 'success' | 'info' | 'danger'

const tones: Record<BadgeTone, string> = {
  brand: 'bg-primary-subtle text-primary-dark',
  neutral: 'bg-muted text-ink',
  amber: 'bg-amber-100 text-amber-700',
  success: 'bg-success-subtle text-primary-dark',
  info: 'bg-info-subtle text-ink',
  danger: 'bg-destructive-subtle text-ink',
}

export function Badge({ tone = 'brand', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-caption ${tones[tone]}`}>
      {children}
    </span>
  )
}

/** Chip yang bisa dipilih (filter topik). Memakai aria-pressed. */
export function Chip({
  selected = false,
  onClick,
  children,
}: {
  selected?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-full border px-4 sm:min-h-9 text-small font-medium transition-colors duration-200 ${
        selected
          ? 'border-primary-darker bg-primary-darker text-white'
          : 'border-input bg-card text-ink hover:bg-muted'
      }`}
    >
      {children}
    </button>
  )
}
