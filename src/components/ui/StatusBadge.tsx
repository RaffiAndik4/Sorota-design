import { CalendarClock, CheckCircle2, CircleCheckBig, Hourglass, XCircle, type LucideIcon } from 'lucide-react'
import type { OrderStatus } from '../../lib/ordersStore'
import { Badge, type BadgeTone } from './Badge'

// Status selalu ditandai ikon + teks (tidak hanya warna).
const statusMeta: Record<OrderStatus, { label: string; tone: BadgeTone; Icon: LucideIcon }> = {
  menunggu: { label: 'Menunggu konfirmasi', tone: 'amber', Icon: Hourglass },
  dikonfirmasi: { label: 'Dikonfirmasi', tone: 'success', Icon: CheckCircle2 },
  penyesuaian: { label: 'Perlu penyesuaian jadwal', tone: 'info', Icon: CalendarClock },
  ditolak: { label: 'Tidak bisa diterima', tone: 'danger', Icon: XCircle },
  selesai: { label: 'Selesai', tone: 'neutral', Icon: CircleCheckBig },
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone, Icon } = statusMeta[status]
  return (
    <Badge tone={tone}>
      <Icon size={14} strokeWidth={1.75} aria-hidden />
      {label}
    </Badge>
  )
}
