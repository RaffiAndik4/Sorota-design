// TODO: ganti dengan kontak resmi Sorota. Nilai di bawah hanya contoh (placeholder).
export const siteInfo = {
  name: 'Sorota',
  tagline: 'Temukan Arah Bisnismu',
  email: 'bantuan@sorota.id',
  whatsappDisplay: '0812-0000-0000',
  whatsappLink: 'https://wa.me/6281200000000',
  instagramLink: 'https://www.instagram.com/sorota.id/',
  hours: 'Senin–Jumat, 09.00–17.00',
  year: 2026,
}

export const navLinks = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/mentor', label: 'Mentor' },
  { to: '/mentor?tab=sesi', label: 'Pesanan' },
]

// Tampil sebagai tombol kaca di kanan navbar (dan sebagai tautan biasa di menu HP)
export const aboutLink = { to: '/tentang', label: 'Tentang' }
