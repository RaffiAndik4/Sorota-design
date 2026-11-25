export type ButtonVariant = 'primary' | 'highlight' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  // Teks putih hanya di atas Darker (4,8:1). Sorota Green #23B83D tidak lolos kontras.
  primary: 'bg-primary-darker text-white hover:bg-primary-dark',
  // Maksimal satu per layar (hero CTA).
  highlight: 'bg-highlight text-ink hover:bg-highlight-light',
  secondary: 'border border-input bg-card text-ink hover:bg-muted',
  ghost: 'text-primary-darker hover:bg-primary-subtle',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-3 text-small sm:min-h-9',
  md: 'min-h-11 px-5 text-small',
  lg: 'min-h-13 px-6 text-body',
}

/** Kelas tombol untuk elemen lain (misalnya <a> yang tampil seperti tombol). */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  return `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 ${variants[variant]} ${sizes[size]}`
}
