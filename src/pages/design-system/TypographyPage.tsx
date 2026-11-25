import { Check, X } from "lucide-react";

const scale = [
  {
    cls: "text-hero",
    name: "Hero",
    size: "40 → 76px",
    lh: "1,06",
    weight: "Bold 700",
    use: "Judul hero beranda (khusus landing)",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-section",
    name: "Section",
    size: "34 → 56px",
    lh: "1,1",
    weight: "Bold 700",
    use: "Judul tiap section beranda dan halaman Tentang (khusus landing)",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-display",
    name: "Display",
    size: "36 → 48px",
    lh: "1,1",
    weight: "Bold 700",
    use: "Judul besar di halaman biasa",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-h1",
    name: "H1",
    size: "30 → 36px",
    lh: "1,2",
    weight: "Bold 700",
    use: "Judul halaman",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-h2",
    name: "H2",
    size: "24 → 28px",
    lh: "1,25",
    weight: "SemiBold 600",
    use: "Judul section",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-h3",
    name: "H3",
    size: "20px",
    lh: "1,35",
    weight: "SemiBold 600",
    use: "Judul kartu, judul modal",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-body",
    name: "Body",
    size: "16px",
    lh: "1,6",
    weight: "Regular 400",
    use: "Teks utama, paragraf",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-small",
    name: "Small",
    size: "14px",
    lh: "1,5",
    weight: "Regular 400",
    use: "Teks pendukung, deskripsi kartu",
    sample: "Temukan Arah Bisnismu",
  },
  {
    cls: "text-caption",
    name: "Caption",
    size: "12px",
    lh: "1,4",
    weight: "Medium 500",
    use: "Label, metadata, badge",
    sample: "Temukan Arah Bisnismu",
  },
];

const weights = [
  { w: 400, name: "Regular", use: "Body, Small" },
  { w: 500, name: "Medium", use: "Caption, label form" },
  { w: 600, name: "SemiBold", use: "H2, H3, tombol" },
  { w: 700, name: "Bold", use: "Hero, Section, Display, H1" },
];

export default function TypographyPage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-3">
        <p className="text-small font-semibold text-primary-darker">
          Foundations
        </p>
        <h1 className="text-h1 text-ink">Typography</h1>
        <p className="max-w-2xl text-body text-muted-foreground">
          Satu keluarga font, sembilan level ukuran. Hero dan Section hanya
          untuk landing page; halaman lain memakai Display sampai Caption.
          Hierarki dibangun dari ukuran dan ketebalan, bukan dari banyak font
          atau banyak warna.
        </p>
      </header>

      {/* Font family */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Font</h2>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <article className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-card p-8">
            <div>
              <p className="text-caption text-muted-foreground">
                Plus Jakarta Sans · Variable
              </p>
              <p className="mt-2 text-[96px] leading-none font-semibold tracking-tight text-ink">
                Aa
              </p>
            </div>
            <p className="text-body break-all text-ink">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 Rp 150.000 · 25% · @sorota
            </p>
          </article>
          <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8">
            <h3 className="text-h3 text-ink">Dipakai untuk</h3>
            <ul className="flex flex-col gap-2 text-small text-ink">
              <li>Semua teks UI: heading, body, tombol, form</li>
              <li>Angka harga dan jadwal sesi</li>
            </ul>
            <h3 className="mt-2 text-h3 text-ink">Tidak dipakai untuk</h3>
            <ul className="flex flex-col gap-2 text-small text-ink">
              <li>
                Logo. Logo selalu memakai file SVG (Jano Sans Pro SemiBold)
              </li>
            </ul>
            <p className="mt-auto rounded-xl bg-muted px-4 py-3 text-caption text-muted-foreground">
              Fallback: ui-sans-serif, system-ui, sans-serif
            </p>
          </article>
        </div>
      </section>

      {/* Scale */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Skala ukuran</h2>
        <p className="text-small text-muted-foreground">
          Gunakan kelas Tailwind di kolom pertama. Ukuran Hero, Section, Display, H1, dan H2
          menyesuaikan lebar layar secara otomatis (nilai kecil di HP → nilai
          besar di desktop).
        </p>
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {scale.map((s) => (
            <article
              key={s.name}
              className="grid gap-4 p-6 lg:grid-cols-[200px_1fr]"
            >
              <dl className="flex flex-col gap-1 text-caption">
                <dt className="sr-only">Kelas</dt>
                <dd>
                  <code className="rounded bg-primary-subtle px-1.5 py-0.5 font-mono text-primary-dark">
                    {s.cls}
                  </code>
                </dd>
                <dd className="mt-1 text-small font-semibold text-ink">
                  {s.name}
                </dd>
                <dd className="text-muted-foreground">
                  {s.size} · lh {s.lh}
                </dd>
                <dd className="text-muted-foreground">{s.weight}</dd>
                <dd className="text-muted-foreground">{s.use}</dd>
              </dl>
              <p className={`${s.cls} text-ink`}>{s.sample}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Weights */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Ketebalan</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {weights.map((w) => (
            <article
              key={w.w}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-4xl text-ink" style={{ fontWeight: w.w }}>
                Ag
              </p>
              <p className="mt-3 text-small font-semibold text-ink">
                {w.name} <span className="text-muted-foreground">{w.w}</span>
              </p>
              <p className="text-caption text-muted-foreground">{w.use}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contoh hierarki */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Contoh hierarki</h2>
        <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-8">
          <p className="text-caption text-primary-darker">
            KONSULTASI BISNIS 1-ON-1
          </p>
          <h3 className="text-display text-ink">Temukan Arah Bisnismu</h3>
          <p className="max-w-xl text-body text-muted-foreground">
            Lihat profil, keahlian, dan rekam jejak mentor, lalu booking sesi
            private sesuai kebutuhan bisnismu. Tanpa subscription.
          </p>
          <p className="text-small text-muted-foreground">
            Mulai dari Rp 75.000 per sesi
          </p>
        </article>
      </section>

      {/* Aturan */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>Pakai maksimal 2–3 level ukuran dalam satu kartu</li>
            <li>Batasi lebar paragraf 60–75 karakter (sekitar max-w-xl)</li>
            <li>Teks utama Ink, teks pendukung Muted Text (kontras 6,4 : 1)</li>
            <li>
              Rata kiri untuk paragraf; rata tengah hanya untuk judul hero
              singkat
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>
              Teks isi di bawah 12px, dan body di bawah 16px untuk paragraf
              panjang
            </li>
            <li>Semua huruf kapital untuk kalimat panjang</li>
            <li>Ukuran font ad hoc di luar skala (misalnya text-[17px])</li>
            <li>
              Teks putih atau hijau Sorota Green untuk paragraf (kontras tidak
              cukup)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
