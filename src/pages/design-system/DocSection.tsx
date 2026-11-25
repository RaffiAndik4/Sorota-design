import type { ReactNode } from "react";

/** Bagian dokumentasi: judul, deskripsi, area preview, dan catatan aturan. */
export default function DocSection({
  title,
  description,
  notes,
  children,
}: {
  title: string;
  description?: string;
  notes?: string[];
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2 text-ink">{title}</h2>
        {description && (
          <p className="max-w-2xl text-small text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        {children}
      </div>
      {notes && (
        <ul className="flex flex-col gap-1.5 text-small text-muted-foreground">
          {notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span
                aria-hidden
                className="mt-2 size-1 shrink-0 rounded-full bg-primary-darker"
              />
              {n}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="flex flex-col gap-3">
      <p className="text-small font-semibold text-primary-darker">{eyebrow}</p>
      <h1 className="text-h1 text-ink">{title}</h1>
      <p className="max-w-2xl text-body text-muted-foreground">{intro}</p>
    </header>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-caption font-medium text-muted-foreground">
      {children}
    </p>
  );
}
