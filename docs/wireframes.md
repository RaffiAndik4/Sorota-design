# Wireframe Sorota (hasil mempelajari)

Sumber: `wireframe-02-tentang-layanan.png`, `wireframe-03-daftar-mentor.png`, `wireframe-04-profil-mentor.png`, `wireframe-05-pemesanan-sesi.png`, `wireframe-06-pesanan.png` (di `docs/references/`).

Wireframe ini **abu-abu dan memakai nama sementara "Mentoring UMKM"** (font Inter, teks lorem ipsum). Yang dipakai dari wireframe adalah **struktur, konten, dan alur**. Tampilan tetap mengikuti design system Sorota.

> Status: draf untuk direvisi. Bagian 3 berisi hal yang bentrok dengan keputusan sebelumnya dan perlu diputuskan.

---

## 1. Ringkasan per halaman

### 02 · Tentang Layanan (`/tentang`)
Gabungan F1 (Manfaat) dan F2 (Cara kerja) dalam satu halaman. Urutan section:
1. **Header halaman:** judul "Tentang Layanan" + paragraf pengantar.
2. **Manfaat Mentoring:** foto di kiri, daftar 4 poin di kanan:
   - Memahami kondisi dan arah usaha
   - Belajar langsung dari praktik
   - Mendapat saran yang bisa langsung dicoba
   - Sesi singkat sesuai kebutuhan
3. **Persoalan Usaha yang Dapat Dibahas:** 6 kartu (judul + 1 kalimat):
   Keuangan dan Harga Pokok · Pemasaran dan Media Sosial · Pengembangan Menu · Operasional Dapur · Legalitas dan Perizinan · Pengelolaan Stok.
4. **Cara Kerja Layanan:** **4 langkah** bernomor: Pilih Mentor → Ajukan Sesi → Konfirmasi Mentor → Ikuti Sesi.
5. **CTA penutup:** "Siap memilih mentor yang sesuai?" + tombol **Cari Mentor**.
6. **Footer** (muncul di semua halaman).

### 03 · Daftar Mentor (`/mentor`)
- Header + paragraf + **kolom pencarian** ("Cari nama atau keahlian mentor") + tombol Cari.
- **Filter kebutuhan usaha** (chip, satu terpilih): Semua · Keuangan · Pemasaran · Menu dan Produk · Operasional · Legalitas.
- Teks hasil: "Menampilkan 6 mentor".
- **Grid 3 kolom** kartu mentor: foto, nama, keahlian utama, deskripsi singkat, **harga per sesi** (contoh Rp 100.000 / 150.000 / 200.000), tombol **Lihat Profil**.

### 04 · Profil Mentor (`/mentor/:id`)
- **Breadcrumb:** Mentor / Profil Mentor.
- Kolom kiri: foto, nama, keahlian, tag keahlian; **Pengalaman** (daftar tahun–posisi); **Persoalan Usaha yang Dapat Dibahas** (chip).
- Kolom kanan (kartu tetap): **Rincian Sesi**: Durasi sesi 60 menit · Format Online via Google Meet · Biaya Rp 150.000 · tombol **Ajukan Sesi** · catatan "Pengajuan akan diteruskan ke mentor untuk dikonfirmasi."

### 05 · Pemesanan Sesi (`/mentor/:id/pesan`)
- **Stepper 3 langkah:** Isi Data Diri → Pilih Jadwal → Periksa dan Kirim.
- Kolom kiri:
  - **Langkah 1 · Data Diri:** Nama (+ petunjuk "Sesuai nama yang akan dipakai di sesi"), Nama Usaha, **Nomor WhatsApp**, Kebutuhan Mentoring (textarea, contoh: "ingin menghitung harga pokok menu").
  - **Langkah 2 · Pilihan Jadwal (usulan sementara):** chip waktu (contoh 5 pilihan), satu terpilih. Teks: "Mentor akan mengonfirmasi atau menyesuaikan jadwal."
- Kolom kanan (kartu tetap): **Ringkasan Pesanan:** mentor, durasi, biaya, daftar "Periksa sebelum mengirim" (Nama, Nama usaha, WhatsApp, Jadwal, Kebutuhan, dengan "Belum diisi"), tombol **Kirim Pengajuan**, catatan "Setelah dikirim, status pesanan menjadi Menunggu Konfirmasi."
- **State error** digambar: border tebal + teks "! Nama usaha wajib diisi" dan "! Nomor WhatsApp tidak valid. Contoh: 0812 3456 7890".

### 06 · Pesanan (`/pesanan`)
- Header "Pesanan" + "Daftar pengajuan sesi mentoring Anda." + tombol **Cari Mentor**.
- Catatan wireframe: *pengguna dianggap sudah memiliki akses ke pesanannya; mekanisme akses ditentukan kemudian.*
- **Tabel:** Mentor (foto, nama, keahlian) · Tanggal Pengajuan · Status · Aksi (**Lihat Detail**).
- **4 status** dibedakan lewat gaya, bukan warna: *Menunggu Konfirmasi* (outline), *Dikonfirmasi* (solid gelap), *Perlu Penyesuaian Jadwal* (garis putus-putus), *Selesai* (abu-abu).

### Elemen yang sama di semua halaman
- **Navbar:** logo + Beranda · Tentang Layanan · Mentor · Pesanan · Bantuan (menu aktif bergaris bawah).
- **Footer:** logo + deskripsi · kolom Menu (5 link) · kolom **Kontak Bantuan** (email, WhatsApp, jam layanan Senin–Jumat 09.00–17.00) · baris hak cipta.

---

## 2. Yang belum ada di wireframe

| Halaman / state | Keterangan |
|---|---|
| 01 Beranda | Kemungkinan landing page yang sedang kita bangun |
| Bantuan (FAQ, Kontak) | Ada di sitemap dan nav, belum digambar |
| **Detail pesanan** | Tujuan tombol "Lihat Detail" di halaman Pesanan |
| **Langkah 3 · Periksa dan Kirim** | Distepper, tapi isinya hanya diwakili Ringkasan Pesanan |
| **Halaman sukses** setelah "Kirim Pengajuan" | Belum ada |
| **Pilih jadwal lain** (saat mentor minta penyesuaian) | Status ada, layarnya belum |
| **Pembayaran** | Tidak ada status maupun layar |
| Empty state (tidak ada mentor / tidak ada pesanan) dan loading | Belum digambar |

---

## 3. Bentrok dengan keputusan sebelumnya (perlu diputuskan)

| # | Topik | Wireframe | Keputusan / desain kita | Dampak |
|---|---|---|---|---|
| 1 | **Kontak pengguna** | Nomor **WhatsApp** (tidak ada email) | User flow: **email** (link status & link Meet dikirim lewat email) | Kanal pengiriman link Meet dan status berubah |
| 2 | **Istilah** | Pemesanan Sesi · Ajukan Sesi · Kirim Pengajuan · Pesanan | Brand guideline & keputusan: **"Booking sesi"** | Label tombol dan judul halaman |
| 3 | **Pembayaran** | Tidak ada | Keputusan: **bayar setelah mentor menerima** | Perlu status "Menunggu pembayaran" dan layar bayar, atau pembayaran di luar aplikasi |
| 4 | **Akses pesanan** | Halaman daftar semua pesanan; mekanisme "ditentukan kemudian" | User flow: **tanpa akun**, status lewat link di email | Perlu cara mengenali pengguna (kode booking + WhatsApp/email, atau penyimpanan di perangkat) |
| 5 | **Cara kerja** | **4 langkah** (ada "Konfirmasi Mentor") | Landing kita: **3 langkah** | Samakan jumlah langkah |
| 6 | **Status pesanan** | 4: Menunggu Konfirmasi, Dikonfirmasi, Perlu Penyesuaian Jadwal, Selesai | User flow: juga **Ditolak/tidak merespons** dan **Menunggu pembayaran** | Tambah dua status, atau dianggap di luar cakupan |
| 7 | **Kategori topik** | Keuangan · Pemasaran · Menu dan Produk · Operasional · Legalitas (+ Harga Pokok, Stok) | Chip di landing: Harga & HPP · Promosi · Keuangan · Legalitas | Samakan nama kategori di landing, filter, dan profil |
| 8 | **Sapaan** | "Anda" ("pengajuan sesi mentoring Anda") | Brand guideline: **"kamu"** | Ganti saat menulis teks UI |
| 9 | **Fokus usaha** | Jelas **F&B** (menu, dapur, stok, kuliner) | Brand guideline: UMKM F&B dan Fashion | Menjawab pertanyaan terbuka #8 di dokumen sitemap: mentor awal F&B |
| 10 | **Navbar** | Bar datar, ada link "Beranda", tanpa tombol CTA | Landing: pil kaca melayang + tombol Mulai konsultasi, tanpa "Beranda" | Perlu varian navbar untuk halaman dalam |
| 11 | **Harga** | Contoh Rp 100.000–200.000/sesi, 60 menit | Belum ada harga resmi | Data placeholder, perlu ditandai "contoh" |
| 12 | **Jadwal** | 5 slot tetap, mentor yang mengonfirmasi | User flow: ganti jadwal maksimal 2 kali | Aturan setelah 2 kali masih terbuka |

Catatan: poin 4 menjawab sebagian pertanyaan terbuka #6 di [sitemap-user-flow.md](sitemap-user-flow.md) (link status hilang). Poin 9 menjawab #8, dan halaman Tentang Layanan yang menggabungkan F1 + F2 menjawab #7.

---

## 4. Pemetaan ke desain yang sudah ada

| Kebutuhan wireframe | Sudah ada | Perlu dibuat |
|---|---|---|
| Kartu mentor (foto, nama, keahlian, deskripsi, harga, tombol) | `MentorCard` (perlu tambah foto & deskripsi) | Varian dengan foto |
| Chip filter | `Chip` | — |
| Kolom pencarian | `MentorSearch` di hero | Versi halaman Daftar mentor |
| Form + error | `Field` | Textarea sudah ada |
| Chip jadwal | `Chip` | — |
| Badge status | `Badge` (amber, success, info, neutral, danger) | Pemetaan status → tone |
| Stepper | Sudah ada di pattern "Status booking" | Stepper form 3 langkah |
| Kartu ringkasan | Pattern "Ringkasan sebelum kirim" | Versi sticky + daftar "Belum diisi" |
| Tabel pesanan | — | Tabel (di HP menjadi daftar kartu) |
| Breadcrumb | — | Komponen baru |
| Navbar halaman dalam | Navbar landing & design system | Varian + menu aktif |
| **Footer** | — | Komponen baru |

---

## 5. Usulan urutan membangun

1. **Footer + navbar halaman dalam** (dipakai semua halaman) dan sistem rute.
2. **Daftar Mentor** (`/mentor`): search animasi di hero kita bisa langsung mengarah ke sini.
3. **Profil Mentor** (`/mentor/:id`).
4. **Pemesanan Sesi** (`/mentor/:id/pesan`) + halaman sukses.
5. **Pesanan** (`/pesanan`) + detail pesanan.
6. **Tentang Layanan** (`/tentang`) memakai section yang sudah ada di landing.
7. **Bantuan** (FAQ, Kontak).
