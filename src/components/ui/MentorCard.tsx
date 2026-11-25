import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Badge } from './Badge'
import Button from './Button'
import { buttonClasses } from './buttonStyles'
import Rating from './Rating'

export type MentorCardProps = {
  name: string
  headline: string
  topics: string[]
  price: string
  /** Deskripsi singkat (opsional) */
  description?: string
  /** Rating hanya ditampilkan bila ada data nyata */
  rating?: number
  reviews?: number
  /** Jika diisi, tombol menjadi tautan ke halaman profil */
  href?: string
  /** Inisial lama (tidak dipakai lagi, dipertahankan agar contoh di design system tetap valid) */
  initials?: string
  tone?: number
}

export default function MentorCard({ name, headline, topics, price, description, rating, reviews, href, tone = 0 }: MentorCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-[box-shadow,translate] duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        <Avatar name={name} size={56} tone={tone} />
        <div className="min-w-0">
          <h3 className="text-h3 text-ink">{name}</h3>
          <p className="text-small text-muted-foreground">{headline}</p>
        </div>
      </div>
      {description && <p className="text-small leading-relaxed text-muted-foreground">{description}</p>}
      {rating !== undefined && <Rating value={rating} count={reviews} />}
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-t border-border pt-4">
        <p className="text-small whitespace-nowrap text-ink">
          <span className="text-h3">{price}</span> <span className="text-muted-foreground">/ sesi</span>
        </p>
        {href ? (
          <Link to={href} className={`${buttonClasses('secondary', 'md')} whitespace-nowrap`} aria-label={`Lihat profil ${name}`}>
            Lihat profil
          </Link>
        ) : (
          <Button size="sm" className="whitespace-nowrap">
            Lihat profil
          </Button>
        )}
      </div>
    </article>
  )
}
