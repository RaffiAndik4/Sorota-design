import { AlertTriangle } from 'lucide-react'
import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

type CommonProps = {
  label: string
  helper?: string
  /** Pesan error: sebutkan apa yang salah dan cara memperbaikinya. */
  error?: string
  optional?: boolean
}

type FieldProps = CommonProps &
  (
    | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  )

export default function Field(props: FieldProps) {
  const { label, helper, error, optional, multiline, className = '', ...rest } = props
  const id = useId()
  const helpId = `${id}-help`
  const errId = `${id}-err`
  const describedBy = [helper ? helpId : null, error ? errId : null].filter(Boolean).join(' ') || undefined

  const cls = `w-full rounded-lg bg-card px-3 text-body text-ink placeholder:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-muted ${
    error ? 'border-2 border-destructive' : 'border border-input hover:border-muted-foreground focus:border-primary-darker'
  } ${className}`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(opsional)</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${cls} min-h-28 py-2.5`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${cls} min-h-11`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {helper && !error && (
        <p id={helpId} className="text-caption text-muted-foreground">
          {helper}
        </p>
      )}
      {error && (
        // Teks Ink + ikon merah: Destructive #EF4444 sebagai teks di atas putih tidak lolos 4,5:1.
        <p id={errId} role="alert" className="flex items-start gap-1.5 text-caption text-ink">
          <AlertTriangle size={16} className="mt-px shrink-0 text-destructive" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
