import { Star } from 'lucide-react'

/** Bintang Highlight dengan outline Amber 700 supaya tetap terlihat di latar putih. Angka selalu ditampilkan. */
export default function Rating({ value, count }: { value: number; count?: number }) {
  const label = `Rating ${value.toString().replace('.', ',')} dari 5${count ? `, ${count} ulasan` : ''}`
  return (
    <span className="inline-flex items-center gap-1.5 text-small text-ink" role="img" aria-label={label}>
      <span className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={16}
            strokeWidth={1.75}
            className={i < Math.round(value) ? 'fill-highlight text-amber-700' : 'text-input'}
          />
        ))}
      </span>
      <span className="font-semibold" aria-hidden>
        {value.toString().replace('.', ',')}
      </span>
      {count !== undefined && (
        <span className="text-muted-foreground" aria-hidden>
          ({count})
        </span>
      )}
    </span>
  )
}
