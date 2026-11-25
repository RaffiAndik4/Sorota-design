export const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

const dayFmt = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
const dateFmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

/** "Sen, 1 Des · 10.00" */
export const formatSlot = (iso: string) => {
  const d = new Date(iso)
  return `${dayFmt.format(d)} · ${timeFmt.format(d)}`
}

/** "24 Nov 2026" */
export const formatDate = (iso: string) => dateFmt.format(new Date(iso))

const TIMES: [number, number][] = [
  [10, 0],
  [14, 0],
  [19, 30],
  [9, 0],
  [13, 0],
  [15, 0],
]

/** 5 jadwal usulan pada hari kerja berikutnya (selalu di masa depan). seed membedakan jam tiap mentor. */
export function slotsFor(seed: number): string[] {
  const out: string[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (out.length < 5) {
    d.setDate(d.getDate() + 1)
    const w = d.getDay()
    if (w === 0 || w === 6) continue
    const [h, m] = TIMES[(seed + out.length) % TIMES.length]
    const s = new Date(d)
    s.setHours(h, m)
    out.push(s.toISOString())
  }
  return out
}

/** Inisial dari nama (placeholder foto) */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}
