# Sitemap & User Flow Sorota

Dirapikan dari `docs/references/sitemap.png` dan `docs/references/user-flow.png`. Dokumen ini adalah acuan struktur halaman dan alur untuk web app Sorota.

> Status: **draf untuk direvisi**.

### Keputusan yang sudah diambil
| Topik | Keputusan |
|---|---|
| Akun | **Tanpa akun.** Pengguna cukup mengisi nama usaha dan email. Tidak ada login, daftar, maupun dashboard. Status pesanan dilacak lewat link di email |
| Pembayaran | **Setelah mentor menerima.** Pengajuan dikirim gratis. Pembayaran diminta setelah status Dikonfirmasi, dan link Meet dikirim setelah pembayaran |
| Istilah di UI | **Booking sesi** (sesuai brand guideline). Tombol: "Booking sesi". Status memakai kata "booking" |

---

## 1. Ringkasan

Alur inti Sorota (sisi pengguna), **tanpa wajib daftar akun**:

```
Landing → Daftar mentor → Profil mentor → Form pengajuan sesi → Status pemesanan
        → Mentor merespons → Link Google Meet dikirim → Sesi via Google Meet → Selesai
```

Ciri utama alur ini:
- Pengguna **tidak wajib membuat akun**. Status pesanan dilacak lewat **link di email**.
- Sesi berlangsung lewat **Google Meet**. Link dikirim ke pengguna dan mentor.
- Mentor **merespons dalam 24 jam**: terima, jadwal tidak cocok, atau tolak.
- Pengguna tidak pernah buntu: setiap penolakan punya jalan keluar (pilih jadwal lain / pilih mentor lain).

---

## 2. Sitemap

```
Landing / Beranda
├── Tentang Layanan            (label kelompok)
│   ├── F1  Manfaat mentoring
│   └── F2  Cara kerja layanan
├── Mentor                     (label kelompok)
│   └── F3  Daftar mentor
│       └── F4  Profil mentor
│           └── F5  Pemesanan sesi            [halaman fungsional]
├── Pesanan                    (label kelompok)
│   └── F6  Status pemesanan
│       └── Menunggu konfirmasi
│           ├── Terima
│           │   └── Dikonfirmasi dan link Meet
│           ├── Jadwal tidak cocok
│           │   └── Pilih jadwal lain         [halaman fungsional]
│           └── Tolak
│               └── Pilih mentor lain         [halaman fungsional]
└── Bantuan                    (label kelompok)
    ├── FAQ
    └── Kontak
```

Legenda di diagram asli: label kelompok · halaman utama · subhalaman · halaman fungsional · keputusan.

### Inventaris halaman

| ID | Halaman | Tipe | Isi utama (dari user flow) |
|---|---|---|---|
| — | Landing / Beranda | Halaman utama | Satu tombol utama **Cari mentor**; manfaat; cara kerja 3 langkah; contoh mentor; kisaran biaya |
| F1 | Manfaat mentoring | Halaman utama | Manfaat mentoring bagi pelaku usaha |
| F2 | Cara kerja layanan | Halaman utama | Langkah memakai Sorota |
| F3 | Daftar mentor | Halaman utama | **Filter jenis kebutuhan**; kartu mentor: foto, keahlian, tarif, rating |
| F4 | Profil mentor | Subhalaman | Pengalaman di usaha F&B, keahlian, ulasan, **rincian biaya**, jadwal tersedia |
| F5 | Pemesanan sesi | Fungsional | Form pengajuan: kebutuhan, jadwal, nama usaha, email; ringkasan sebelum kirim |
| F6 | Status pemesanan | Halaman utama | Status pesanan, email pengajuan + link status |
| — | Menunggu konfirmasi | Subhalaman (status) | "Mohon tunggu respons mentor dalam 24 jam" |
| — | Dikonfirmasi dan link Meet | Subhalaman (status) | Link Google Meet, jadwal sesi |
| — | Pilih jadwal lain | Fungsional | Data form tersimpan; jam kosong mentor yang sama; maksimal 2 kali |
| — | Pilih mentor lain | Fungsional | Kembali ke daftar mentor |
| — | FAQ | Subhalaman | Pertanyaan umum |
| — | Kontak | Subhalaman | Cara menghubungi Sorota |

---

## 3. User flow

> **Perubahan dari diagram asli:** langkah **pembayaran** ditambahkan antara "Terima" dan "Link Google Meet dikirim" (keputusan di atas). Diagram `docs/references/user-flow.png` perlu diperbarui agar sama.

Pelaku: **pengguna** (pemilik usaha) dan **mentor**. Tokoh yang paling cocok: Jenie (pemilik toko minuman, belum pernah mentoring).

### Langkah utama

| # | Langkah | Layar | Catatan dari diagram |
|---|---|---|---|
| 1 | Mulai | Landing page mentoring | Satu tombol utama **Cari mentor**. Manfaat, 3 langkah cara kerja, contoh mentor, kisaran biaya dalam satu halaman |
| 2 | Cari mentor | Daftar mentor | Filter jenis kebutuhan. Kartu: foto, keahlian, tarif, rating |
| 3 | Lihat detail | Profil mentor | Pengalaman di usaha F&B, keahlian, ulasan, rincian biaya, jadwal tersedia |
| 4 | **Keputusan:** cocok dengan kebutuhan? | — | **Belum** → kembali ke Daftar mentor. **Ya** → lanjut |
| 5 | Isi form pengajuan sesi | Pemesanan sesi | Pilih kebutuhan, jadwal, nama usaha, email. **Tanpa wajib daftar akun.** Ada ringkasan sebelum kirim |
| 6 | **Keputusan:** isian lengkap? | — | **Belum** → petunjuk perbaikan di kolom (pesan error singkat di kolom yang salah, isian lain tetap tersimpan). **Ya** → lanjut |
| 7 | Status pemesanan | Status | "Status: Menunggu konfirmasi." Email pengajuan dan link status dikirim. Mohon tunggu respons mentor dalam 24 jam |
| 8 | **Keputusan:** mentor merespons? | — | Lihat tabel respons mentor di bawah |
| 9 | **Pembayaran** *(baru)* | Status: menunggu pembayaran | Tarif sesuai profil mentor. Dibayar setelah mentor menerima |
| 10 | Link Google Meet dikirim | Dikonfirmasi | Link dikirim lewat email ke pengguna dan mentor setelah pembayaran |
| 11 | Sesi via Google Meet | — | Email pengingat H-1 dan 1 jam sebelum sesi |
| 12 | Selesai | — | |

### Respons mentor (langkah 8)

| Respons | Hasil untuk pengguna | Alur lanjut |
|---|---|---|
| **Terima** | Diminta membayar, lalu Dikonfirmasi + link Meet | → langkah 9 |
| **Jadwal tidak cocok** | Pilih jadwal lain. Data form tersimpan, tampil jam kosong mentor yang sama, **maksimal 2 kali** | → kembali ke Status pemesanan (menunggu konfirmasi lagi) |
| **Tolak / tidak ada respons** | Pilih mentor lain | → kembali ke Daftar mentor |

### Status pesanan (state)

```
Menunggu konfirmasi ──► Menunggu pembayaran ──► Dikonfirmasi ──► (sesi) ──► Selesai
        │
        ├──► Jadwal tidak cocok ──► Pilih jadwal lain ──► Menunggu konfirmasi
        └──► Ditolak / tidak merespons ──► Pilih mentor lain ──► Daftar mentor
```

### Email yang dikirim sistem

| Kapan | Ke siapa | Isi |
|---|---|---|
| Setelah form dikirim | Pengguna | Email pengajuan + **link status** |
| Mentor menerima | Pengguna | Permintaan pembayaran + link status |
| Pembayaran berhasil | Pengguna & mentor | **Link Google Meet** |
| H-1 sebelum sesi | Pengguna & mentor (perlu dikonfirmasi) | Pengingat |
| 1 jam sebelum sesi | Pengguna & mentor (perlu dikonfirmasi) | Pengingat |

---

## 4. Usulan rute aplikasi

| Rute | Halaman |
|---|---|
| `/` | Landing |
| `/tentang/manfaat` | F1 |
| `/tentang/cara-kerja` | F2 |
| `/mentor` | F3 Daftar mentor (query `?kebutuhan=`) |
| `/mentor/:id` | F4 Profil mentor |
| `/mentor/:id/pesan` | F5 Pemesanan sesi |
| `/pesanan/:token` | F6 Status pemesanan (diakses lewat link email) |
| `/pesanan/:token/jadwal` | Pilih jadwal lain |
| `/bantuan/faq` | FAQ |
| `/bantuan/kontak` | Kontak |

---

## 5. Pertanyaan terbuka

Sudah diputuskan: akun, pembayaran (waktunya), dan istilah (lihat bagian atas). Yang masih terbuka:

1. **Pembayaran, rincian.** Metode pembayaran apa (transfer, e-wallet, QRIS)? Berapa lama batas waktu bayar setelah mentor menerima? Apa yang terjadi jika tidak dibayar tepat waktu?
2. **Batas ganti jadwal.** Catatan di diagram terpotong: "Maksimal 2 kali, setelah…". Apa yang terjadi setelah 2 kali?
3. **Tidak ada respons.** Diagram menyebut "tolak atau tidak ada respon". Kapan dianggap tidak merespons (setelah 24 jam?) dan apa yang dilihat pengguna?
4. **Ulasan dan rating.** Kartu dan profil menampilkan rating dan ulasan, tetapi tidak ada langkah pengguna memberi ulasan setelah sesi.
5. **Pengingat.** Email H-1 dan 1 jam sebelum sesi: apakah juga dikirim ke mentor?
6. **Akses status tanpa akun.** Status hanya dapat dibuka lewat link email. Bagaimana jika link hilang? (Misalnya "Cek pesanan" dengan email + kode booking.)
7. **F1 dan F2.** Landing sudah memuat manfaat dan 3 langkah cara kerja. Apakah F1 dan F2 tetap halaman terpisah (versi lengkap)?
8. **Fokus F&B.** Profil menyebut "pengalaman di usaha F&B". Apakah mentor awal hanya untuk F&B?

---

## 6. Dampak pada desain yang sudah dibuat

| Yang sudah ada | Tindakan | Status |
|---|---|---|
| Navbar: Masuk / Daftar | Menu jadi **Tentang Layanan · Mentor · Pesanan · Bantuan**; satu tombol "Cari mentor"; tanpa Masuk/Daftar | Diterapkan |
| Hero CTA "Pilih mentormu" | Diganti **"Cari mentor"** (tombol utama sesuai user flow) | Diterapkan |
| Pattern "Form booking" | Kolom: kebutuhan, jadwal, nama usaha, email. Tanpa akun | Diterapkan |
| Pattern "Ringkasan booking" + "Bayar sekarang" | Jadi **ringkasan sebelum kirim**; pembayaran muncul setelah mentor menerima | Diterapkan |
| Pattern baru: **Status pesanan** | Stepper + kartu status (menunggu, bayar, jadwal tidak cocok, ditolak) | Diterapkan |
| Empty state "Belum ada sesi" (butuh dashboard) | Jadi empty state hasil filter | Diterapkan |
| Microcopy "cek di dashboard" | Jadi "cek statusnya lewat link di emailmu" | Diterapkan |
| Landing: rencana section | Wajib: **manfaat, cara kerja 3 langkah, contoh mentor, kisaran biaya**. Section Masalah opsional | Berikutnya |
| Halaman belum ada | Daftar mentor, profil mentor, form booking, status pesanan, pilih jadwal lain, FAQ, Kontak, Manfaat, Cara kerja | Berikutnya |
