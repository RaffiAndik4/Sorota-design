import { CalendarClock, ClipboardList } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMentor } from '../../data/mentors'
import { formatDate, formatSlot } from '../../lib/format'
import { useOrders, type Order, type OrderStatus } from '../../lib/ordersStore'
import Avatar from '../ui/Avatar'
import { Chip } from '../ui/Badge'
import ChipScroller from '../ui/ChipScroller'
import { buttonClasses } from '../ui/buttonStyles'
import StatusBadge from '../ui/StatusBadge'

const statusLabel: Record<OrderStatus, string> = {
  menunggu: 'Menunggu',
  dikonfirmasi: 'Dikonfirmasi',
  penyesuaian: 'Perlu penyesuaian',
  ditolak: 'Tidak diterima',
  selesai: 'Selesai',
}
const statusOrder: OrderStatus[] = ['menunggu', 'dikonfirmasi', 'penyesuaian', 'selesai', 'ditolak']

function MentorCell({ o }: { o: Order }) {
  const m = getMentor(o.mentorId)
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar name={m?.name ?? '?'} size={44} tone={m?.index ?? 0} src={m?.photo} pos={m?.photoPos} />
      <div className="min-w-0">
        <p className="truncate text-body font-semibold text-ink">{m?.name ?? 'Mentor'}</p>
        <p className="truncate text-caption text-muted-foreground">
          {o.id} · Dibooking {formatDate(o.createdAt)}
        </p>
      </div>
    </div>
  )
}

/** Daftar booking sesi ("Sesi saya"): tabel di layar sedang ke atas, kartu di HP. */
export default function OrdersList() {
  const orders = useOrders()
  const [filter, setFilter] = useState<OrderStatus | 'semua'>('semua')

  const counts = useMemo(() => {
    const c: Partial<Record<OrderStatus, number>> = {}
    orders.forEach((o) => (c[o.status] = (c[o.status] ?? 0) + 1))
    return c
  }, [orders])
  const shown = filter === 'semua' ? orders : orders.filter((o) => o.status === filter)

  if (orders.length === 0) {
    return (
      <div aria-label="Sesi saya" className="mx-auto flex max-w-sm flex-col items-center gap-3 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary-subtle text-primary-darker">
          <ClipboardList size={28} strokeWidth={1.75} aria-hidden />
        </div>
        <h2 className="text-h3 text-ink">Belum ada sesi</h2>
        <p className="text-small text-muted-foreground">Pilih mentor yang paling nyambung sama masalah bisnismu, lalu booking sesi pertamamu.</p>
        <Link to="/mentor" className={`${buttonClasses('primary', 'md')} mt-2`}>
          Cari mentor
        </Link>
      </div>
    )
  }

  return (
    <div aria-label="Sesi saya">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-h3 text-ink">Sesi saya</h2>
          <p className="mt-0.5 text-small text-muted-foreground" aria-live="polite">
            {shown.length} sesi{filter !== 'semua' && ` · ${statusLabel[filter].toLowerCase()}`}
          </p>
        </div>
        <ChipScroller label="Saring berdasarkan status" watch={filter}>
          <ul className="flex w-max gap-2 px-4 sm:px-8 lg:w-auto lg:flex-wrap lg:px-0">
            <li className="snap-start">
              <Chip selected={filter === 'semua'} onClick={() => setFilter('semua')}>
                Semua ({orders.length})
              </Chip>
            </li>
            {statusOrder
              .filter((st) => counts[st])
              .map((st) => (
                <li key={st} className="snap-start">
                  <Chip selected={filter === st} onClick={() => setFilter(st)}>
                    {statusLabel[st]} ({counts[st]})
                  </Chip>
                </li>
              ))}
          </ul>
        </ChipScroller>
      </div>

      {/* Tabel di layar sedang ke atas */}
      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <table className="w-full text-left text-small">
          <caption className="sr-only">Daftar booking sesi mentoring</caption>
          <thead className="border-b border-border bg-muted/60 text-caption text-muted-foreground">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Mentor
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Jadwal sesi
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shown.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-muted/40">
                <td className="max-w-xs px-6 py-4">
                  <MentorCell o={o} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-ink">{formatSlot(o.slot)}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/pesanan/${o.id}`} className={buttonClasses('secondary', 'md')} aria-label={`Lihat detail sesi ${getMentor(o.mentorId)?.name ?? ''}`}>
                    Lihat detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kartu di HP */}
      <ul className="mt-5 flex flex-col gap-3 md:hidden">
        {shown.map((o) => (
          <li key={o.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <MentorCell o={o} />
            <div className="mt-3 flex items-center gap-2 text-small text-ink">
              <CalendarClock size={16} strokeWidth={1.75} className="shrink-0 text-muted-foreground" aria-hidden />
              {formatSlot(o.slot)}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
              <StatusBadge status={o.status} />
              <Link to={`/pesanan/${o.id}`} className={buttonClasses('secondary', 'md')}>
                Lihat detail
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-caption text-muted-foreground">
        Prototipe: sesi disimpan di perangkat ini dan berisi data contoh. Tanpa akun, kamu juga bisa membuka sesi lewat link yang dikirim ke emailmu.
      </p>
    </div>
  )
}
