import type { ReactNode } from 'react'

/** Kepala halaman dalam: latar hijau lembut, ruang atas untuk navbar kaca yang melayang. */
export default function PageIntro({
  breadcrumb,
  title,
  intro,
  actions,
  children,
}: {
  breadcrumb?: ReactNode
  title: string
  intro?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="bg-linear-to-b from-primary-subtle to-background px-4 pt-32 pb-10 sm:px-8 sm:pb-12">
      <div className="mx-auto max-w-6xl">
        {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-h1 text-balance text-ink">{title}</h1>
            {intro && <p className="mt-3 max-w-2xl text-body text-muted-foreground md:text-lg">{intro}</p>}
          </div>
          {actions && <div className="self-start sm:self-auto">{actions}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
