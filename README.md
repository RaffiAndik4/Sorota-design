# Sorota: web app mentoring bisnis 1-on-1

Frontend (prototipe, tanpa backend) untuk Sorota. React + Vite + TypeScript + Tailwind v4 + react-router.

## Menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run build    # build produksi ke dist/
npm run lint     # oxlint
```

## Struktur folder

| Folder | Isi |
|---|---|
| `src/pages/` | Halaman per fitur: `landing`, `mentors`, `booking`, `orders`, `about`, `help`, `design-system` |
| `src/components/` | `layout` (navbar, footer, dll), `ui` (komponen bersama), `orders` |
| `src/data/` | Data contoh: mentor, FAQ, info situs |
| `src/hooks/`, `src/lib/` | Hook bersama; format, dan penyimpanan pesanan (localStorage) |
| `src/index.css` | Design token (warna, tipografi, bayangan) |
| `public/` | Aset yang dipakai situs: logo, favicon, `images/` (foto yang sudah dioptimasi) |
| `docs/` | Brand guideline, sitemap dan user flow, wireframe, kredit gambar |
| `docs/references/` | Gambar acuan: wireframe, sitemap, user flow |
| `docs/source-images/` | Foto asli sebelum dioptimasi (tidak ikut build) |

Design system tersedia di rute `/design-system`.

## Catatan

- Data mentor, harga, dan kontak (`src/data/`) masih sebagian placeholder.
- Pesanan disimpan di perangkat (localStorage), bukan di server.
