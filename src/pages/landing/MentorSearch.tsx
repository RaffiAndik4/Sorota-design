import { Search } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { activeCategories } from '../../data/mentors'
import { searchWords, usePrefersReducedMotion, useTypewriter } from '../../hooks/useTypewriter'

// Topik populer = kategori mentor (wireframe). Klik langsung membuka Daftar Mentor yang sudah difilter.
const popular = activeCategories.slice(0, 4)

export default function MentorSearch() {
  const id = useId()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const reduceMotion = usePrefersReducedMotion()

  const typed = useTypewriter(searchWords, query === '' && !reduceMotion)
  const shown = reduceMotion ? searchWords[0] : typed

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/mentor?cari=${encodeURIComponent(q)}` : '/mentor')
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <form
        role="search"
        onSubmit={submit}
        className="flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-md transition-[border-color,box-shadow] duration-200 focus-within:border-primary-darker focus-within:shadow-lg"
      >
        <Search size={20} strokeWidth={1.75} className="shrink-0 text-muted-foreground" aria-hidden />

        <div className="group relative min-w-0 flex-1">
          <label htmlFor={id} className="sr-only">
            Cari mentor berdasarkan topik atau keahlian
          </label>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className="min-h-11 w-full bg-transparent text-body text-ink outline-none"
          />
          {query === '' && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-body text-muted-foreground"
            >
              <span className="hidden sm:inline">Cari mentor untuk&nbsp;</span>
              <span className="text-ink">{shown}</span>
              <span className="ml-0.5 h-5 w-px animate-pulse bg-ink group-focus-within:hidden motion-reduce:animate-none" />
            </span>
          )}
        </div>

        {/* Highlight kuning: satu per layar, hanya untuk CTA hero */}
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-highlight px-6 text-small font-semibold text-ink transition-colors duration-200 hover:bg-highlight-light"
        >
          <span className="sm:hidden">Cari</span>
          <span className="hidden sm:inline">Cari mentor</span>
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-small text-muted-foreground">Pencarian populer:</span>
        {popular.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => navigate(`/mentor?kebutuhan=${c.id}`)}
            className="inline-flex min-h-11 items-center rounded-full sm:min-h-9 border border-border bg-card px-3 text-caption font-medium text-ink transition-colors duration-200 hover:bg-muted"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
