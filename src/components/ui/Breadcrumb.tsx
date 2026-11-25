import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-small text-muted-foreground">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.label} className="flex items-center gap-1.5">
              {it.to && !last ? (
                <Link to={it.to} className="inline-flex min-h-11 items-center sm:min-h-8 rounded px-1 hover:text-ink hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-ink' : ''}>
                  {it.label}
                </span>
              )}
              {!last && <ChevronRight size={14} strokeWidth={1.75} aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
