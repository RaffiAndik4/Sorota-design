import { CalendarClock, Check, CheckCircle2, Copy, Hourglass, Info, SearchCheck, Video, XCircle } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PageIntro from '../../components/layout/PageIntro'
import Avatar from '../../components/ui/Avatar'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'
import { buttonClasses } from '../../components/ui/buttonStyles'
import { Chip } from '../../components/ui/Badge'
import StatusBadge from '../../components/ui/StatusBadge'
import { getMentor, mentorSlots } from '../../data/mentors'
import { usePageTitle } from '../../hooks/usePageTitle'
import { formatDate, formatSlot, rupiah } from '../../lib/format'
import { MAX_RESCHEDULE, updateOrder, useOrder, type OrderStatus } from '../../lib/ordersStore'

const stages = ['Booking terkirim', 'Respons mentor', 'Sesi via Google Meet']

function stageIndex(status: OrderStatus) {
  if (status === 'dikonfirmasi') return 2
  if (status === 'selesai') return 3
  return 1
}

function Panel({ tone, Icon, title, children }: { tone: 'amber' | 'success' | 'info' | 'danger' | 'neutral'; Icon: typeof Hourglass; title: string; children: ReactNode }) {
  const tones = {
    amber: 'border-amber-100 bg-amber-50',
    success: 'border-primary-lighter bg-primary-subtle',
    info: 'border-info-subtle bg-info-subtle/40',
    danger: 'border-destructive-subtle bg-destructive-subtle/40',
    neutral: 'border-border bg-muted/50',
  }
  return (
    <section className={`rounded-2xl border p-6 ${tones[tone]}`}>
      <h2 className="flex items-center gap-2.5 text-h3 text-ink">
        <Icon size={22} strokeWidth={1.75} className="shrink-0 text-primary-darker" aria-hidden />
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-4 text-body text-muted-foreground">{children}</div>
    </section>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const order = useOrder(id)
  const mentor = getMentor(order?.mentorId)
  const location = useLocation()
  const justCreated = Boolean((location.state as { baru?: boolean } | null)?.baru)
  const [newSlot, setNewSlot] = useState('')
  const [copied, setCopied] = useState(false)
  usePageTitle(order ? `Pesanan ${order.id}` : 'Pesanan tidak ditemukan')

  if (!order || !mentor) {
    return (
      <PageIntro title="Pesanan tidak ditemukan" intro="Pesanan ini tidak ada di perangkat ini. Coba buka lewat link di emailmu, atau lihat sesi saya.">
        <Link to="/mentor?tab=sesi" className={`${buttonClasses('primary', 'md')} mt-6`}>
          Lihat sesi saya
        </Link>
      </PageIntro>
    )
  }

  const stage = stageIndex(order.status)
  const otherSlots = mentorSlots(mentor).filter((s) => s !== order.slot)
  const remaining = MAX_RESCHEDULE - order.rescheduleCount

  const copyLink = async () => {
    if (!order.meetLink) return
    try {
      await navigator.clipboard.writeText(`https://${order.meetLink}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  const sendNewSlot = () => {
    if (!newSlot) return
    updateOrder(order.id, { slot: newSlot, status: 'menunggu', rescheduleCount: order.rescheduleCount + 1 })
    setNewSlot('')
  }

  const rows: [string, string][] = [
    ['Kode booking', order.id],
    ['Tanggal booking', formatDate(order.createdAt)],
    ['Jadwal', formatSlot(order.slot)],
    ['Nama', order.name],
    ['Nama usaha', order.business],
    ['Email', order.email],
    ['Kebutuhan', order.need],
  ]

  return (
    <>
      <PageIntro
        breadcrumb={<Breadcrumb items={[{ label: 'Sesi saya', to: '/mentor?tab=sesi' }, { label: order.id }]} />}
        title={`Booking sesi dengan ${mentor.name}`}
        actions={<StatusBadge status={order.status} />}
      >
        {/* Tahap */}
        <ol aria-label="Tahap booking" className="mt-6 grid gap-3 sm:grid-cols-3">
          {stages.map((s, i) => {
            const state = i < stage ? 'done' : i === stage ? 'current' : 'todo'
            const stopped = order.status === 'ditolak' && i === 1
            return (
              <li key={s} aria-current={state === 'current' ? 'step' : undefined} className="flex items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold ${
                    stopped
                      ? 'bg-destructive-subtle text-ink'
                      : state === 'done'
                        ? 'bg-primary-darker text-white'
                        : state === 'current'
                          ? 'border-2 border-primary-darker bg-card text-primary-dark'
                          : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {stopped ? <XCircle size={16} aria-hidden /> : state === 'done' ? <Check size={16} aria-hidden /> : i + 1}
                </span>
                <span className={`text-small ${state === 'todo' ? 'text-muted-foreground' : 'font-semibold text-ink'}`}>{s}</span>
              </li>
            )
          })}
        </ol>
      </PageIntro>

      <div className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            {justCreated && (
              <div role="status" className="flex gap-3 rounded-2xl border border-primary-lighter bg-primary-subtle p-5">
                <CheckCircle2 size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary-darker" aria-hidden />
                <div>
                  <p className="text-body font-semibold text-ink">Booking terkirim</p>
                  <p className="mt-1 text-small text-muted-foreground">
                    Kami kirim link status ke <b className="font-medium text-ink">{order.email}</b>. Simpan kode booking{' '}
                    <b className="font-medium text-ink">{order.id}</b> untuk membukanya lagi.
                  </p>
                </div>
              </div>
            )}

            {order.status === 'menunggu' && (
              <Panel tone="amber" Icon={Hourglass} title="Menunggu konfirmasi mentor">
                <p>Mohon tunggu respons mentor dalam 24 jam. Kami kirim email begitu ada kabar, jadi kamu tidak perlu mengecek terus.</p>
              </Panel>
            )}

            {order.status === 'dikonfirmasi' && (
              <Panel tone="success" Icon={Video} title="Sesi dikonfirmasi">
                <p>
                  Mentor menerima bookingmu untuk <b className="font-medium text-ink">{formatSlot(order.slot)}</b>. Gabung lewat link Google Meet di bawah.
                </p>
                <div className="flex flex-col gap-3 rounded-xl border border-primary-lighter bg-card p-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
                    <Video size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary-darker sm:mt-0" aria-hidden />
                    <span className="min-w-0 text-small font-medium break-all text-ink">{order.meetLink} (contoh)</span>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={copyLink} icon={copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}>
                    {copied ? 'Tersalin' : 'Salin link'}
                  </Button>
                </div>
                <p className="flex gap-2 text-small">
                  <Info size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
                  Pengingat dikirim ke emailmu sehari sebelum sesi dan 1 jam sebelum sesi dimulai.
                </p>
              </Panel>
            )}

            {order.status === 'penyesuaian' && (
              <Panel tone="info" Icon={CalendarClock} title="Mentor minta jadwal lain">
                <p>Jadwal yang kamu pilih belum cocok untuk mentor. Isianmu tersimpan, tinggal pilih jam kosong lain dari mentor yang sama.</p>
                {remaining > 0 ? (
                  <>
                    <p className="text-small">
                      Kesempatan ganti jadwal: <b className="font-medium text-ink">{remaining} dari {MAX_RESCHEDULE}</b>.
                    </p>
                    <div role="group" aria-label="Pilih jadwal baru" className="flex flex-wrap gap-2.5">
                      {otherSlots.map((s) => (
                        <Chip key={s} selected={newSlot === s} onClick={() => setNewSlot(s)}>
                          {formatSlot(s)}
                        </Chip>
                      ))}
                    </div>
                    <div>
                      <Button onClick={sendNewSlot} disabled={!newSlot}>
                        Kirim jadwal baru
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>
                    Kamu sudah memakai batas ganti jadwal ({MAX_RESCHEDULE} kali). Hubungi{' '}
                    <Link to="/bantuan#kontak" className="font-medium text-primary-darker underline">
                      bantuan
                    </Link>{' '}
                    supaya kami bantu mencarikan jadwal.
                  </p>
                )}
              </Panel>
            )}

            {order.status === 'ditolak' && (
              <Panel tone="danger" Icon={XCircle} title="Mentor belum bisa menerima">
                <p>Tenang, masih banyak mentor lain yang cocok untuk kebutuhanmu. Isi kebutuhanmu bisa kamu pakai lagi.</p>
                <div>
                  <Link to="/mentor" className={buttonClasses('primary', 'md')}>
                    Pilih mentor lain
                  </Link>
                </div>
              </Panel>
            )}

            {order.status === 'selesai' && (
              <Panel tone="neutral" Icon={SearchCheck} title="Sesi selesai">
                <p>Terima kasih sudah ngobrol bareng mentor. Semoga langkah konkretnya bisa langsung kamu coba.</p>
                <div>
                  <Link to={`/mentor/${mentor.id}/pesan`} className={buttonClasses('secondary', 'md')}>
                    Booking sesi lagi
                  </Link>
                </div>
              </Panel>
            )}

            <section aria-labelledby="detail-title" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 id="detail-title" className="text-h3 text-ink">
                Detail booking
              </h2>
              <dl className="mt-5 flex flex-col divide-y divide-border text-small">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr]">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium break-words text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Hanya prototipe: tanpa backend, respons mentor disimulasikan di sini */}
            {(order.status === 'menunggu' || order.status === 'dikonfirmasi') && (
              <section aria-label="Simulasi prototipe" className="rounded-2xl border border-dashed border-input p-5">
                <p className="text-small font-medium text-ink">Simulasi prototipe</p>
                <p className="mt-1 text-caption text-muted-foreground">Belum ada backend, jadi respons mentor disimulasikan lewat tombol ini. Bagian ini tidak ada di produk sebenarnya.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status === 'menunggu' ? (
                    <>
                      <Button size="sm" variant="secondary" onClick={() => updateOrder(order.id, { status: 'dikonfirmasi', meetLink: 'meet.google.com/abc-defg-hij' })}>
                        Mentor menerima
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => updateOrder(order.id, { status: 'penyesuaian' })}>
                        Jadwal tidak cocok
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => updateOrder(order.id, { status: 'ditolak' })}>
                        Mentor menolak
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => updateOrder(order.id, { status: 'selesai' })}>
                      Tandai sesi selesai
                    </Button>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside aria-label="Mentor dan biaya" className="rounded-2xl border border-border bg-card p-6 shadow-md lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <Avatar name={mentor.name} size={56} tone={mentor.index} src={mentor.photo} pos={mentor.photoPos} />
              <div>
                <p className="text-h3 text-ink">{mentor.name}</p>
                <p className="text-small text-muted-foreground">{mentor.headline}</p>
              </div>
            </div>
            <dl className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-small">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Durasi sesi</dt>
                <dd className="font-medium text-ink">{mentor.durationMin} menit</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Format</dt>
                <dd className="font-medium text-ink">Google Meet</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Biaya</dt>
                <dd className="font-semibold text-ink">{rupiah(mentor.price)}</dd>
              </div>
            </dl>
            <Link to={`/mentor/${mentor.id}`} className={`${buttonClasses('secondary', 'md')} mt-5 w-full`}>
              Lihat profil mentor
            </Link>
          </aside>
        </div>
      </div>
    </>
  )
}
