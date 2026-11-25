import { Check } from 'lucide-react'
import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageIntro from '../../components/layout/PageIntro'
import Avatar from '../../components/ui/Avatar'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'
import { buttonClasses } from '../../components/ui/buttonStyles'
import { Chip } from '../../components/ui/Badge'
import Field from '../../components/ui/Field'
import { getMentor, mentorSlots } from '../../data/mentors'
import { usePageTitle } from '../../hooks/usePageTitle'
import { formatSlot, rupiah } from '../../lib/format'
import { addOrder } from '../../lib/ordersStore'

type Values = { nama: string; usaha: string; email: string; kebutuhan: string }
type Errors = Partial<Record<keyof Values, string>>

// Pesan error: sebut apa yang salah dan cara memperbaikinya.
function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.nama.trim()) e.nama = 'Nama belum diisi. Tulis nama lengkapmu supaya mentor bisa menyapamu.'
  if (!v.usaha.trim()) e.usaha = 'Nama usaha belum diisi. Contoh: Warung Kopi Senja.'
  if (!v.email.trim()) e.email = 'Email belum diisi. Kami kirim status booking dan link Google Meet ke email ini.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Format email belum benar. Tulis lengkap, contoh: nama@gmail.com.'
  if (!v.kebutuhan.trim()) e.kebutuhan = 'Kebutuhan belum diisi. Ceritakan singkat apa yang ingin kamu bahas, contoh: ingin menghitung harga pokok menu.'
  return e
}

const steps = ['Isi data diri', 'Pilih jadwal', 'Periksa dan kirim']

export default function BookingPage() {
  const { id } = useParams()
  const mentor = getMentor(id)
  const navigate = useNavigate()
  usePageTitle(mentor ? `Booking sesi · ${mentor.name}` : 'Booking sesi')

  const slots = useMemo(() => (mentor ? mentorSlots(mentor) : []), [mentor])
  const [values, setValues] = useState<Values>({ nama: '', usaha: '', email: '', kebutuhan: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [slot, setSlot] = useState<string>(slots[0] ?? '')
  const formRef = useRef<HTMLFormElement>(null)

  if (!mentor) {
    return (
      <PageIntro title="Mentor tidak ditemukan" intro="Pilih mentor dulu sebelum booking sesi.">
        <Link to="/mentor" className={`${buttonClasses('primary', 'md')} mt-6`}>
          Lihat semua mentor
        </Link>
      </PageIntro>
    )
  }

  const dataComplete = Object.keys(validate(values)).length === 0
  const current = !dataComplete ? 0 : !slot ? 1 : 2

  const change = (key: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    // Hapus error saat isiannya sudah diperbaiki
    if (errors[key] && !validate(next)[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Isian tetap tersimpan; fokus ke kolom pertama yang bermasalah
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    const order = addOrder({
      mentorId: mentor.id,
      name: values.nama.trim(),
      business: values.usaha.trim(),
      email: values.email.trim(),
      need: values.kebutuhan.trim(),
      slot,
    })
    navigate(`/pesanan/${order.id}`, { state: { baru: true } })
  }

  const rows: [string, string][] = [
    ['Nama', values.nama.trim()],
    ['Nama usaha', values.usaha.trim()],
    ['Email', values.email.trim()],
    ['Jadwal', slot ? formatSlot(slot) : ''],
    ['Kebutuhan', values.kebutuhan.trim()],
  ]

  return (
    <>
      <PageIntro
        breadcrumb={<Breadcrumb items={[{ label: 'Mentor', to: '/mentor' }, { label: mentor.name, to: `/mentor/${mentor.id}` }, { label: 'Booking sesi' }]} />}
        title="Booking sesi"
      >
        <ol aria-label="Tahap booking" className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {steps.map((s, i) => {
            const state = i < current ? 'done' : i === current ? 'current' : 'todo'
            return (
              <li key={s} aria-current={state === 'current' ? 'step' : undefined} className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold ${
                    state === 'done'
                      ? 'bg-primary-darker text-white'
                      : state === 'current'
                        ? 'border-2 border-primary-darker bg-card text-primary-dark'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {state === 'done' ? <Check size={16} aria-hidden /> : i + 1}
                </span>
                <span className={`text-small ${state === 'todo' ? 'text-muted-foreground' : 'font-semibold text-ink'}`}>{s}</span>
                {i < steps.length - 1 && <span aria-hidden className="hidden h-px w-12 bg-border sm:block" />}
              </li>
            )
          })}
        </ol>
      </PageIntro>

      <form ref={formRef} onSubmit={submit} noValidate className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <section aria-labelledby="langkah1" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 id="langkah1" className="text-h3 text-ink">
                Langkah 1 · Data diri
              </h2>
              <div className="mt-6 flex flex-col gap-6">
                <Field
                  label="Nama"
                  placeholder="Masukkan nama lengkap"
                  helper="Sesuai nama yang akan dipakai di sesi."
                  autoComplete="name"
                  value={values.nama}
                  onChange={change('nama')}
                  error={errors.nama}
                />
                <Field
                  label="Nama usaha"
                  placeholder="Contoh: Warung Kopi Senja"
                  autoComplete="organization"
                  value={values.usaha}
                  onChange={change('usaha')}
                  error={errors.usaha}
                />
                <Field
                  label="Email"
                  type="email"
                  inputMode="email"
                  placeholder="nama@email.com"
                  helper="Status booking dan link Google Meet dikirim ke email ini."
                  autoComplete="email"
                  value={values.email}
                  onChange={change('email')}
                  error={errors.email}
                />
                <Field
                  label="Kebutuhan mentoring"
                  multiline
                  placeholder="Ceritakan kebutuhan usahamu"
                  helper="Contoh: ingin menghitung harga pokok menu."
                  value={values.kebutuhan}
                  onChange={change('kebutuhan')}
                  error={errors.kebutuhan}
                />
              </div>
            </section>

            <section aria-labelledby="langkah2" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 id="langkah2" className="text-h3 text-ink">
                Langkah 2 · Pilihan jadwal <span className="font-normal text-muted-foreground">(usulan sementara)</span>
              </h2>
              <p className="mt-2 text-small text-muted-foreground">Pilih satu jadwal. Mentor akan mengonfirmasi atau menyesuaikan jadwal.</p>
              <div role="group" aria-label="Pilihan jadwal" className="mt-5 flex flex-wrap gap-2.5">
                {slots.map((s) => (
                  <Chip key={s} selected={slot === s} onClick={() => setSlot(s)}>
                    {formatSlot(s)}
                  </Chip>
                ))}
              </div>
            </section>
          </div>

          {/* Ringkasan: kartu tetap di desktop */}
          <aside aria-labelledby="ringkasan" className="rounded-2xl border border-border bg-card p-6 shadow-md lg:sticky lg:top-28">
            <h2 id="ringkasan" className="text-h3 text-ink">
              Ringkasan booking
            </h2>
            <div className="mt-5 flex items-center gap-3 border-b border-border pb-5">
              <Avatar name={mentor.name} size={48} tone={mentor.index} src={mentor.photo} pos={mentor.photoPos} />
              <div>
                <p className="text-body font-semibold text-ink">{mentor.name}</p>
                <p className="text-small text-muted-foreground">{mentor.headline}</p>
              </div>
            </div>
            <dl className="flex flex-col gap-3 border-b border-border py-5 text-small">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Durasi sesi</dt>
                <dd className="font-medium text-ink">{mentor.durationMin} menit</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Biaya</dt>
                <dd className="font-semibold text-ink">{rupiah(mentor.price)}</dd>
              </div>
            </dl>

            <h3 className="mt-5 text-small font-semibold text-ink">Periksa sebelum mengirim</h3>
            <dl className="mt-3 flex flex-col gap-3 text-small">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="shrink-0 text-muted-foreground">{k}</dt>
                  <dd className={`min-w-0 text-right break-words ${v ? 'font-medium text-ink' : 'text-muted-foreground italic'}`}>
                    {v ? (k === 'Kebutuhan' && v.length > 60 ? `${v.slice(0, 60)}…` : v) : 'Belum diisi'}
                  </dd>
                </div>
              ))}
            </dl>

            <Button type="submit" size="lg" className="mt-6 w-full">
              Booking sesi
            </Button>
            <p className="mt-4 text-caption leading-relaxed text-muted-foreground">
              Setelah dikirim, status booking menjadi Menunggu konfirmasi. Mentor merespons dalam 24 jam.
            </p>
          </aside>
        </div>
      </form>
    </>
  )
}
