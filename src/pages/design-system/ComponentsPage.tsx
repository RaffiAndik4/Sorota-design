import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge, Chip } from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import MentorCard from "../../components/ui/MentorCard";
import MentorPhotoCard from "../../components/ui/MentorPhotoCard";
import Select from "../../components/ui/Select";
import { Ring, Sparkle } from "../../components/ui/Decor";
import Modal from "../../components/ui/Modal";
import Navbar from "../../components/ui/Navbar";
import Rating from "../../components/ui/Rating";
import Toast from "../../components/ui/Toast";
import DocSection, { Label, PageHeader } from "./DocSection";

const topics = ["Harga & HPP", "Promosi", "Keuangan", "Pelanggan tetap"];
type Sort = "rekomendasi" | "termurah" | "termahal";

export default function ComponentsPage() {
  const [selected, setSelected] = useState<string[]>(["Promosi"]);
  const [modal, setModal] = useState(false);
  const [sort, setSort] = useState<Sort>("rekomendasi");
  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  return (
    <div className="flex flex-col gap-14">
      <PageHeader
        eyebrow="Komponen"
        title="Components"
        intro="Komponen asli yang juga dipakai di aplikasi Sorota (src/components/ui). Semua interaktif: coba hover, tekan Tab, dan klik. Nama, harga, dan kalimat di contoh hanya ilustrasi, bukan data atau kebijakan resmi Sorota."
      />

      <DocSection
        title="Button"
        description="Satu aksi utama per area. Hijau Darker untuk aksi utama, kuning untuk CTA utama sebuah section."
        notes={[
          "Primary memakai latar Darker #18842B dengan teks putih (4,8 : 1). Jangan pakai Sorota Green #23B83D dengan teks putih.",
          "Highlight (kuning) satu per area: tombol Cari, CTA hero, dan ajakan penutup. Jangan dua tombol kuning bersebelahan.",
          "Tinggi 44px (md) untuk area sentuh yang nyaman. sm menjadi 44px di HP dan 36px di desktop.",
          "Saat loading, tombol dinonaktifkan dan label tetap terlihat supaya pengguna tahu apa yang diproses.",
        ]}
      >
        <div className="flex flex-col gap-8">
          <div>
            <Label>Varian</Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Booking sesi</Button>
              <Button variant="highlight">Cari mentor</Button>
              <Button variant="secondary">Lihat profil</Button>
              <Button variant="ghost">Pelajari cara kerja</Button>
            </div>
          </div>
          <div>
            <Label>Ukuran</Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small 36px</Button>
              <Button size="md">Medium 44px</Button>
              <Button size="lg">Large 52px</Button>
            </div>
          </div>
          <div>
            <Label>State (hover dan focus: arahkan kursor / tekan Tab)</Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                icon={<Calendar size={18} strokeWidth={1.75} aria-hidden />}
              >
                Dengan ikon
              </Button>
              <Button disabled>Disabled</Button>
              <Button loading>Memproses…</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button variant="ghost">
                Lanjut <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Input & form field"
        description="Label selalu terlihat di atas field (bukan hanya placeholder). Error menyebut apa yang salah dan cara memperbaikinya."
        notes={[
          "Pesan error tetap tampil sampai masalahnya diperbaiki; jangan hanya lewat toast.",
          "Teks error berwarna Ink dengan ikon merah, karena merah #EF4444 sebagai teks di atas putih tidak lolos kontras 4,5 : 1.",
          "Tinggi field 44px. Isi field jangan dihapus saat submit gagal.",
        ]}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Nama usaha"
            placeholder="Contoh: Es Teh Manis Jenie"
            helper="Nama toko atau brand kamu."
          />
          <Field
            label="Nomor WhatsApp"
            defaultValue="0812"
            error="Nomor WhatsApp belum lengkap. Isi 10–13 digit, contoh: 081234567890."
          />
          <Field
            label="Email"
            optional
            type="email"
            placeholder="nama@email.com"
          />
          <Field
            label="Kode booking"
            disabled
            value="Dibuat otomatis"
            readOnly
          />
          <div className="md:col-span-2">
            <Field
              label="Ceritakan masalah bisnismu"
              multiline
              placeholder="Contoh: pelanggan baru banyak, tapi jarang yang balik lagi."
              helper="Makin spesifik, makin tepat arahan dari mentor."
            />
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Badge & chip"
        description="Badge menampilkan label atau status. Chip adalah filter yang bisa dipilih."
        notes={[
          "Chip memakai aria-pressed. Chip terpilih berlatar Darker dengan teks putih.",
          "Status selalu bersama teks, tidak hanya warna.",
        ]}
      >
        <div className="flex flex-col gap-6">
          <div>
            <Label>Badge</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Harga & HPP</Badge>
              <Badge tone="neutral">Selesai</Badge>
              <Badge tone="amber">Menunggu pembayaran</Badge>
              <Badge tone="success">Terkonfirmasi</Badge>
              <Badge tone="info">Sesi besok</Badge>
              <Badge tone="danger">Dibatalkan</Badge>
            </div>
          </div>
          <div>
            <Label>Chip filter (klik untuk memilih)</Label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <Chip
                  key={t}
                  selected={selected.includes(t)}
                  onClick={() => toggle(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Rating"
        description="Bintang Highlight dengan outline Amber 700, selalu disertai angka."
        notes={[
          "Bintang kuning sendirian kontrasnya rendah di atas putih, jadi angka dan label aksesibel selalu disertakan.",
        ]}
      >
        <div className="flex flex-wrap items-center gap-8">
          <Rating value={4.8} count={24} />
          <Rating value={4} count={9} />
          <Rating value={3.5} />
        </div>
      </DocSection>

      <DocSection
        title="Kartu mentor"
        description="Komponen utama di halaman explore. Hover untuk melihat shadow naik dari SM ke MD."
        notes={[
          "Nama, harga, dan topik adalah data ilustrasi, bukan mentor atau harga sebenarnya.",
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <MentorCard
            name="Mentor Contoh 1"
            initials="M1"
            headline="Spesialis harga & promosi"
            rating={4.8}
            reviews={24}
            topics={["Harga & HPP", "Promosi"]}
            price="Rp 75.000"
          />
          <MentorCard
            name="Mentor Contoh 2"
            initials="M2"
            headline="Pengelolaan keuangan UMKM"
            rating={4.6}
            reviews={12}
            topics={["Keuangan", "Pelanggan tetap"]}
            price="Rp 90.000"
          />
        </div>
      </DocSection>

      <DocSection
        title="Dropdown (Select)"
        description="Pengganti <select> bawaan browser supaya daftar pilihannya bisa mengikuti gaya Sorota. Pola ARIA combobox + listbox."
        notes={[
          "Keyboard: Panah atas/bawah memilih, Home/End ke ujung, Enter atau Spasi mengonfirmasi, Escape menutup. Klik di luar juga menutup.",
          "Pilihan aktif ditandai centang dan teks tebal, tidak hanya warna. Tiap baris setinggi 44px.",
          "Dipakai untuk urutan mentor. Untuk pilihan dengan banyak opsi atau pencarian, pakai komponen lain.",
        ]}
      >
        <div className="max-w-xs">
          <Select
            label="Urutkan mentor"
            value={sort}
            onChange={setSort}
            options={[
              { value: "rekomendasi", label: "Urut: Rekomendasi" },
              { value: "termurah", label: "Urut: Harga terendah" },
              { value: "termahal", label: "Urut: Harga tertinggi" },
            ]}
          />
          <div className="h-36" aria-hidden />
        </div>
      </DocSection>

      <DocSection
        title="Kartu mentor (foto)"
        description="Kartu yang dipakai di Daftar Mentor: foto besar di atas, satu tombol utama Booking sesi, dan tautan kecil Lihat profil."
        notes={[
          "Satu aksi utama per kartu. Lihat profil sengaja dibuat kecil dan abu-abu agar tidak bersaing dengan Booking sesi.",
          "Tanpa foto, kartu menampilkan inisial di atas gradasi lembut. Nama, harga, dan topik di sini hanya ilustrasi.",
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <MentorPhotoCard
            name="Mentor Contoh 1"
            headline="Spesialis harga dan promosi"
            category="Pemasaran"
            topics={["Harga & HPP", "Promosi"]}
            price="Rp 75.000"
            href="/design-system/components"
            bookHref="/design-system/components"
            tone={0}
            rating={4.8}
            reviews={24}
          />
          <MentorPhotoCard
            name="Mentor Contoh 2"
            headline="Pengelolaan keuangan UMKM"
            category="Keuangan"
            topics={["Keuangan"]}
            price="Rp 90.000"
            href="/design-system/components"
            bookHref="/design-system/components"
            tone={2}
          />
        </div>
      </DocSection>

      <DocSection
        title="Hiasan garis"
        description="Bintang empat sudut dan lingkaran kecil bergaris tipis. Dipakai hemat di pita hijau halaman Tentang dan di dekat judul section."
        notes={[
          "Murni dekoratif (aria-hidden) dan hanya tampil di layar sedang ke atas. Jangan menaruhnya di atas teks atau di dalam kartu berisi informasi.",
        ]}
      >
        <div className="relative h-28 overflow-hidden rounded-xl bg-linear-to-b from-primary-lighter via-primary-light/60 to-primary-lighter">
          <Sparkle className="absolute top-6 left-[20%] size-7" />
          <Ring className="absolute top-5 left-[30%] size-3" />
          <Ring className="absolute top-14 left-[34%] size-4" />
          <Ring className="absolute top-16 left-[26%] size-3" />
          <Sparkle className="absolute right-[18%] bottom-5 size-6" />
        </div>
      </DocSection>

      <DocSection
        title="Navbar"
        description="Menu kaca (liquid glass) yang melayang. Menu penuh di tablet ke atas, hamburger di HP. Di situs, navbar bersembunyi saat scroll turun dan muncul lagi saat scroll naik, tetapi selalu tampil bila menu HP terbuka atau fokus keyboard ada di dalamnya."
        notes={[
          "Contoh di bawah adalah versi sederhana untuk dokumentasi. Versi sebenarnya ada di src/components/layout/SiteNavbar.tsx.",
        ]}
      >
        <div className="overflow-hidden rounded-lg border border-border">
          <Navbar />
        </div>
      </DocSection>

      <DocSection
        title="Modal"
        description="Dialog untuk keputusan penting. Fokus pindah ke dalam dialog, Tab tidak keluar, Escape menutup, dan fokus kembali ke tombol pemicu."
        notes={["Judul jelas, satu aksi utama, dan selalu ada cara menutup."]}
      >
        <Button onClick={() => setModal(true)}>Buka contoh modal</Button>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Booking sesi ini?"
        >
          <p className="text-small text-muted-foreground">
            Kamu akan booking sesi 1-on-1 private bersama Mentor Contoh 1. Cek
            lagi jadwalnya sebelum lanjut.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button onClick={() => setModal(false)}>Ya, booking</Button>
          </div>
        </Modal>
      </DocSection>

      <DocSection
        title="Toast"
        description="Konfirmasi ringan yang hilang sendiri dalam 3–5 detik."
        notes={[
          "Hanya untuk info yang juga bisa ditemukan di tempat lain. Error form atau pembayaran harus inline dan tetap terlihat.",
        ]}
      >
        <div className="flex flex-col gap-3">
          <Toast>Booking terkirim. Cek statusnya lewat link di emailmu.</Toast>
          <Toast tone="info">Mentor akan merespons booking-mu.</Toast>
          <Toast tone="warning" onDismiss={() => undefined}>
            Sesi dimulai 15 menit lagi.
          </Toast>
        </div>
      </DocSection>
    </div>
  );
}
