import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/**
 * Dialog bawaan browser (<dialog>): fokus pindah ke dalam dialog, Tab terkunci di dalamnya,
 * Escape menutup, dan fokus kembali ke tombol pemicu saat ditutup.
 */
export default function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-card p-0 text-ink shadow-lg backdrop:bg-ink/40"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            <X size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
