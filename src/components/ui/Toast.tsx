import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'

type Tone = 'success' | 'info' | 'warning'

const tones = {
  success: { Icon: CheckCircle2, cls: 'text-success' },
  info: { Icon: Info, cls: 'text-info' },
  warning: { Icon: AlertTriangle, cls: 'text-amber-700' },
}

/**
 * Konfirmasi ringan. Auto-dismiss 3-5 detik, hanya untuk info yang juga bisa ditemukan di tempat lain.
 * Error pada form atau pembayaran TIDAK boleh hanya berupa toast: tampilkan inline & tetap terlihat.
 */
export default function Toast({ tone = 'success', children, onDismiss }: { tone?: Tone; children: ReactNode; onDismiss?: () => void }) {
  const { Icon, cls } = tones[tone]
  return (
    <div role="status" className="flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-lg">
      <Icon size={20} strokeWidth={1.75} className={`mt-px shrink-0 ${cls}`} aria-hidden />
      <p className="flex-1 text-small text-ink">{children}</p>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Tutup notifikasi" className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
          <X size={16} aria-hidden />
        </button>
      )}
    </div>
  )
}
