import { Check, X } from "lucide-react";
import DocSection, { PageHeader } from "./DocSection";

const traits = [
  {
    name: "Ngerti banget",
    body: "Terasa tahu persis apa yang dirasakan pengguna. Mulai dari masalah mereka, baru solusi.",
  },
  {
    name: "Solutif, bukan menggurui",
    body: "Selalu arahkan ke langkah konkret, bukan teori panjang.",
  },
  {
    name: "Percaya diri tanpa sombong",
    body: "Boleh menyebut keunggulan, tapi spesifik dan tidak berlebihan.",
  },
];

const tones = [
  { ctx: "Tombol & CTA", tone: "Tegas, action-oriented, tidak lebay" },
  {
    ctx: "Judul & body copy",
    tone: "Jelas, percaya diri, tanpa jargon korporat",
  },
  {
    ctx: "Pesan error",
    tone: "Empatik dan membantu: apa yang salah + cara memperbaikinya",
  },
  { ctx: "Empty state", tone: "Ramah, ajak ke langkah berikutnya" },
  {
    ctx: "Konfirmasi sukses",
    tone: "Singkat, jelas, tunjukkan langkah selanjutnya",
  },
  { ctx: "Landing page", tone: "Profesional namun approachable" },
];

const microcopy = [
  { ctx: "Tombol", bad: "Submit", good: "Booking sesi" },
  { ctx: "Tombol", bad: "Klik di sini", good: "Cari mentor" },
  {
    ctx: "Error field",
    bad: "Field wajib diisi!!!",
    good: "Nomor WhatsApp belum diisi. Isi dulu supaya mentor bisa menghubungimu.",
  },
  {
    ctx: "Error umum",
    bad: "Terjadi kesalahan (500)",
    good: "Booking belum terkirim. Coba lagi, isianmu masih tersimpan.",
  },
  {
    ctx: "Empty state",
    bad: "Tidak ada data",
    good: "Belum ada mentor untuk topik ini. Coba topik lain atau hapus filternya.",
  },
  {
    ctx: "Sukses",
    bad: "Transaksi berhasil diproses",
    good: "Booking terkirim. Cek statusnya lewat link di emailmu.",
  },
  {
    ctx: "Loading",
    bad: "Mohon tunggu sebentar…",
    good: "Memuat daftar mentor…",
  },
  {
    ctx: "Hero",
    bad: "Platform konsultasi inovatif",
    good: "Pilih Mentor yang Paling Ngerti Bisnismu",
  },
];

const words = [
  ["Memanfaatkan", "Pakai"],
  ["Mengoptimalkan", "Bikin lebih maksimal / sebutkan hasilnya"],
  ["Solusi inovatif", "Sebutkan solusinya secara konkret"],
  ["Pelanggan / klien", "Kamu / pengguna"],
  ["Anda", "Kamu"],
];

const often = [
  "Temukan arah bisnismu",
  "Pilih mentor sesuai kebutuhanmu",
  "Sesi private 1-on-1",
  "Langkah konkret yang bisa langsung dieksekusi",
  "Tanpa subscription",
  "Booking sesi mentormu",
];

const avoid = [
  "Buzzword kosong: revolusioner, game-changer, next level, disruptif",
  "Klaim berlebihan: pasti sukses, dijamin laris, anti gagal",
  "Bahasa korporat kaku: bersama ini, sehubungan dengan",
  "Tanda seru berlebihan (!!!) dan huruf kapital semua",
  "Menyebut fitur AI Matching, TARA, atau AI Mentor (tidak aktif di versi ini)",
];

export default function VoicePage() {
  return (
    <div className="flex flex-col gap-14">
      <PageHeader
        eyebrow="Konten"
        title="Voice & Tone"
        intro="Sorota berbicara seperti teman yang lebih berpengalaman di bidang bisnis: suportif, jujur, dan to-the-point. Bukan dosen, bukan konsultan kaku berjas. Diringkas dari brand guideline."
      />

      <DocSection
        title="Kepribadian"
        description="Semi-formal Gen Z: boleh santai, tapi tetap kredibel saat membahas uang, strategi, dan data."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {traits.map((t) => (
            <article key={t.name} className="rounded-xl bg-primary-subtle p-5">
              <h3 className="text-h3 text-primary-dark">{t.name}</h3>
              <p className="mt-2 text-small text-ink">{t.body}</p>
            </article>
          ))}
        </div>
      </DocSection>

      <DocSection title="Tone per konteks">
        <div className="divide-y divide-border">
          {tones.map((t) => (
            <div
              key={t.ctx}
              className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[200px_1fr]"
            >
              <p className="text-small font-semibold text-ink">{t.ctx}</p>
              <p className="text-small text-muted-foreground">{t.tone}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Microcopy: sebelum dan sesudah"
        description="Contoh menulis teks antarmuka dengan suara Sorota. Kalimat di sini adalah contoh gaya, bukan teks final."
        notes={[
          "Pesan error menyebut apa yang salah dan cara memperbaikinya, tanpa menyalahkan pengguna.",
          'Sapa pengguna dengan "kamu", bukan "Anda".',
        ]}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-small">
            <thead className="border-b border-border text-caption text-muted-foreground">
              <tr>
                <th className="py-2 pr-4 font-medium">Konteks</th>
                <th className="py-2 pr-4 font-medium">Hindari</th>
                <th className="py-2 font-medium">Gunakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border align-top">
              {microcopy.map((m) => (
                <tr key={m.bad}>
                  <td className="py-3 pr-4 font-medium text-ink">{m.ctx}</td>
                  <td className="py-3 pr-4 text-muted-foreground line-through decoration-destructive/60">
                    {m.bad}
                  </td>
                  <td className="py-3 text-ink">{m.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Pilihan kata">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-h3 text-ink">Padanan kata</h3>
            <div className="divide-y divide-border rounded-lg border border-border">
              {words.map(([a, b]) => (
                <div
                  key={a}
                  className="grid grid-cols-2 gap-3 px-4 py-2.5 text-small"
                >
                  <span className="text-muted-foreground">{a}</span>
                  <span className="text-ink">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-h3 text-ink">Frasa khas Sorota</h3>
            <ul className="flex flex-wrap gap-2">
              {often.map((o) => (
                <li
                  key={o}
                  className="rounded-full bg-primary-subtle px-3 py-1 text-caption text-primary-dark"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DocSection>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} strokeWidth={1.75} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>Mulai dari masalah nyata pengguna, lalu arahkan ke solusi</li>
            <li>Gunakan angka atau data yang spesifik bila ada</li>
            <li>Akhiri dengan CTA yang jelas dan bisa dilakukan</li>
            <li>
              Tonjolkan kontrol di tangan pengguna: kamu yang pilih mentornya
            </li>
            <li>Tegaskan sesi bersifat private dan 1-on-1</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} strokeWidth={1.75} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            {avoid.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
