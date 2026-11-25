import { useSyncExternalStore } from 'react'
import { slotsFor } from './format'

// Tanpa akun & tanpa backend: pesanan disimpan di perangkat (localStorage). Prototipe.
export type OrderStatus = 'menunggu' | 'dikonfirmasi' | 'penyesuaian' | 'ditolak' | 'selesai'

export type Order = {
  id: string
  mentorId: string
  createdAt: string
  status: OrderStatus
  name: string
  business: string
  email: string
  need: string
  slot: string
  rescheduleCount: number
  meetLink?: string
}

export const MAX_RESCHEDULE = 2
const KEY = 'sorota.orders.v2'
const listeners = new Set<() => void>()
let cache: Order[] | null = null

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

function seed(): Order[] {
  const base = { name: 'Pengguna Contoh', business: 'Toko Minuman Contoh', email: 'nama@email.com' }
  return [
    { ...base, id: 'SRT-A1B2', mentorId: 'suwastika-wijayanti', createdAt: daysAgo(1), status: 'menunggu', need: 'Ingin menghitung harga pokok frozen food.', slot: slotsFor(0)[0], rescheduleCount: 0 },
    { ...base, id: 'SRT-C3D4', mentorId: 'afdal-adam', createdAt: daysAgo(5), status: 'dikonfirmasi', need: 'Ingin mendirikan CV untuk usaha minuman.', slot: slotsFor(1)[1], rescheduleCount: 0, meetLink: 'meet.google.com/abc-defg-hij' },
    { ...base, id: 'SRT-E5F6', mentorId: 'hardianto', createdAt: daysAgo(7), status: 'penyesuaian', need: 'Ingin membangun bisnis di bidang edukasi.', slot: slotsFor(2)[0], rescheduleCount: 0 },
    { ...base, id: 'SRT-G7H8', mentorId: 'risa-agung-pribadi', createdAt: daysAgo(23), status: 'selesai', need: 'Alur kerja usaha sering berantakan saat ramai.', slot: daysAgo(20), rescheduleCount: 1 },
  ]
}

function read(): Order[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    cache = raw ? (JSON.parse(raw) as Order[]) : seed()
    if (!raw) localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    cache = seed()
  }
  return cache
}

function write(next: Order[]) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* penyimpanan penuh/diblokir: tetap simpan di memori */
  }
  listeners.forEach((l) => l())
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const useOrders = () => useSyncExternalStore(subscribe, read, read)
export const useOrder = (id: string | undefined) => useOrders().find((o) => o.id === id)

export function addOrder(input: Pick<Order, 'mentorId' | 'name' | 'business' | 'email' | 'need' | 'slot'>): Order {
  const order: Order = {
    ...input,
    id: `SRT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'menunggu',
    rescheduleCount: 0,
  }
  write([order, ...read()])
  return order
}

export function updateOrder(id: string, patch: Partial<Order>) {
  write(read().map((o) => (o.id === id ? { ...o, ...patch } : o)))
}
