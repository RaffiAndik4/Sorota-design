import { initials } from '../../lib/format'

// Placeholder foto: inisial di atas warna lembut. Ganti dengan foto mentor asli (dengan izin) bila sudah ada.
const tones = [
  'bg-primary-lighter text-primary-dark',
  'bg-amber-100 text-amber-700',
  'bg-info-subtle text-ink',
  'bg-primary-subtle text-primary-dark',
  'bg-success-subtle text-primary-dark',
  'bg-muted text-ink',
]

export default function Avatar({
  name,
  size = 56,
  tone = 0,
  shape = 'circle',
  className = '',
  src,
  pos = '50% 30%',
}: {
  name: string
  size?: number
  tone?: number
  shape?: 'circle' | 'square'
  className?: string
  src?: string
  pos?: string
}) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center overflow-hidden font-semibold ${tones[tone % tones.length]} ${
        shape === 'circle' ? 'rounded-full' : 'rounded-3xl'
      } ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" style={{ objectPosition: pos }} /> : initials(name)}
    </span>
  )
}
