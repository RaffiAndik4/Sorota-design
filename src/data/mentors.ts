import { slotsFor } from '../lib/format'

// Data mentor disalin dari desain "Sorota — Temukan Mentor Bisnis". Hanya fakta yang tertulis di desain yang dipakai.
// Yang BELUM pasti ditandai TODO: dua mentor terakhir tampil buram di desain sumber.
export const categories = [
  { id: 'keuangan', label: 'Keuangan' },
  { id: 'pemasaran', label: 'Pemasaran' },
  { id: 'menu', label: 'Menu dan Produk' },
  { id: 'operasional', label: 'Operasional' },
  { id: 'legalitas', label: 'Legalitas' },
  { id: 'strategi', label: 'Strategi Bisnis' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export type Mentor = {
  id: string
  index: number
  name: string
  headline: string
  /** Kategori utama (lencana di kartu) */
  category: CategoryId
  /** Kategori tambahan agar muncul di filter lain */
  alsoIn?: CategoryId[]
  /** Keahlian (chip) */
  topics: string[]
  /** Sektor yang didampingi */
  sectors: string[]
  summary: string
  /** Sorotan pengalaman: hanya yang tertulis di desain sumber */
  highlights: string[]
  price: number
  durationMin: number
  rating?: number
  reviews?: number
  photo: string
  /** object-position untuk memotong foto supaya wajah terlihat */
  photoPos: string
}

export const mentors: Mentor[] = [
  {
    id: 'suwastika-wijayanti',
    index: 0,
    name: 'Suwastika Wijayanti, S.Si., M.T',
    headline: 'Bisnis F&B & Frozen Food | Strategi Marketing | Operasional UMKM',
    category: 'pemasaran',
    alsoIn: ['operasional', 'menu'],
    topics: ['UMKM Development', 'Food Business', 'Brand Building', 'Digital Marketing', 'Social Media Marketing', 'Product Development', 'Frozen Food'],
    sectors: ['Makanan & Minuman', 'Digital / Online'],
    summary:
      'Punya bisnis F&B tapi stuck di operasional atau marketing? Suwastika buktikan sendiri — dari lab riset ITB sampai frozen food-nya masuk binaan PLN dan pitching ke Sandiaga Uno. Dia tahu persis cara tumbuhkan bisnis kuliner kamu dari nol.',
    highlights: ['Berangkat dari lab riset ITB', 'Produk frozen food-nya masuk binaan PLN', 'Pernah pitching ke Sandiaga Uno'],
    price: 49000,
    durationMin: 60,
    rating: 5,
    reviews: 1,
    photo: '/images/mentors/suwastika-wijayanti.webp',
    photoPos: '50% 35%',
  },
  {
    id: 'afdal-adam',
    index: 1,
    name: 'Afdal Adam, S.H',
    headline: 'Legalitas Bisnis | Pendirian PT & CV | Regulasi & Kepatuhan Usaha',
    category: 'legalitas',
    topics: ['Legalitas Bisnis', 'Regulasi OJK', 'Data Privacy', 'Legal & Corporate Law'],
    sectors: ['Fintech / Keuangan Digital', 'Jasa / Service', 'Digital', 'Jasa'],
    summary: 'Mau bikin PT, CV, atau urus izin usaha? Afdal siap bantu legalitas bisnismu dari nol — aman, benar, dan sesuai regulasi.',
    highlights: ['Pendirian PT dan CV', 'Perizinan dan legalitas usaha', 'Regulasi dan kepatuhan usaha'],
    price: 300000,
    durationMin: 60,
    photo: '/images/mentors/afdal-adam.webp',
    photoPos: '50% 28%',
  },
  {
    id: 'hardianto',
    index: 2,
    name: 'Dr. Hardianto, S.Pd., M.Pd',
    headline: 'Business Development | EduTech | Riset & Inovasi Bisnis',
    category: 'strategi',
    topics: ['Kepemimpinan Eksekutif', 'Inovasi Pendidikan', 'Manajemen Organisasi', 'Research & Development', 'EdTech', 'Business Development', 'Academic Writing'],
    sectors: ['Pendidikan / EdTech', 'Jasa / Service', 'Jasa', 'Digital'],
    summary:
      'Mau bangun bisnis di sektor edukasi atau teknologi tapi nggak tahu harus mulai dari mana? Hardianto buktikan sendiri — lulus S3 di usia 26 tahun dan langsung bangun PT. Cognifera Education Academy dari nol. Dia tahu cara ubah ide jadi bisnis yang jalan.',
    highlights: ['Lulus S3 di usia 26 tahun', 'Membangun PT. Cognifera Education Academy dari nol'],
    price: 250000,
    durationMin: 60,
    photo: '/images/mentors/hardianto.webp',
    photoPos: '50% 25%',
  },
  {
    // TODO: data mentor ini tampil buram di desain sumber (nama terbaca, harga dan detail tidak). Lengkapi dari data asli.
    id: 'risa-agung-pribadi',
    index: 3,
    name: 'Risa Agung Pribadi, S.Si',
    headline: 'Operasional dan Pengembangan Usaha',
    category: 'operasional',
    topics: ['UMKM Development', 'Operasional Usaha'],
    sectors: ['Jasa / Service'],
    summary: 'Profil lengkap mentor ini menyusul.',
    highlights: [],
    price: 150000,
    durationMin: 60,
    photo: '/images/mentors/risa-agung-pribadi.webp',
    photoPos: '50% 32%',
  },
  {
    // TODO: data mentor ini tampil buram di desain sumber (nama terbaca, harga dan detail tidak). Lengkapi dari data asli.
    id: 'mahmud-asrul',
    index: 4,
    name: 'Mahmud Asrul',
    headline: 'Strategi dan Pengembangan Bisnis',
    category: 'strategi',
    topics: ['Business Strategy', 'Operations Management'],
    sectors: ['Jasa / Service'],
    summary: 'Profil lengkap mentor ini menyusul.',
    highlights: [],
    price: 100000,
    durationMin: 60,
    photo: '/images/mentors/mahmud-asrul.webp',
    photoPos: '50% 38%',
  },
]

export const getMentor = (id: string | undefined) => mentors.find((m) => m.id === id)
export const mentorSlots = (m: Mentor) => slotsFor(m.index)
export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id
export const inCategory = (m: Mentor, id: string) => m.category === id || (m.alsoIn ?? []).includes(id as CategoryId)
/** Hanya kategori yang punya mentor (supaya filter tidak berujung hasil kosong) */
export const activeCategories = categories.filter((c) => mentors.some((m) => inCategory(m, c.id)))
