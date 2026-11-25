import { Check, X } from "lucide-react";

const spacing = [
  { token: "1", px: 4, use: "Jarak ikon ke teks kecil" },
  {
    token: "2",
    px: 8,
    use: "Jarak antar tombol/chip (minimum antar target sentuh)",
  },
  { token: "3", px: 12, use: "Padding badge, jarak label ke input" },
  { token: "4", px: 16, use: "Padding kartu kecil, jarak antar elemen form" },
  { token: "6", px: 24, use: "Padding kartu, jarak antar kartu" },
  { token: "8", px: 32, use: "Jarak antar blok dalam section" },
  { token: "12", px: 48, use: "Padding section di mobile" },
  { token: "16", px: 64, use: "Padding section di desktop" },
  { token: "24", px: 96, use: "Jarak antar section besar (landing page)" },
];

const breakpoints = [
  { name: "Default", px: "0–639", cols: "4 kolom", use: "HP" },
  { name: "sm", px: "640", cols: "4 kolom", use: "HP besar / landscape" },
  { name: "md", px: "768", cols: "8 kolom", use: "Tablet" },
  { name: "lg", px: "1024", cols: "12 kolom", use: "Laptop kecil" },
  { name: "xl", px: "1280", cols: "12 kolom", use: "Desktop" },
];

const containers = [
  {
    name: "Prose",
    cls: "max-w-xl",
    px: 576,
    use: "Paragraf panjang (60–75 karakter)",
  },
  { name: "Form", cls: "max-w-md", px: 448, use: "Login, booking, pembayaran" },
  {
    name: "Content",
    cls: "max-w-5xl",
    px: 1024,
    use: "Halaman dashboard & detail mentor",
  },
  {
    name: "Page",
    cls: "max-w-6xl",
    px: 1152,
    use: "Landing page & explore mentor",
  },
];

export default function SpacingPage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-3">
        <p className="text-small font-semibold text-primary-darker">
          Foundations
        </p>
        <h1 className="text-h1 text-ink">Spacing & Layout</h1>
        <p className="max-w-2xl text-body text-muted-foreground">
          Semua jarak memakai kelipatan 4px. Ruang yang lega dan konsisten
          membuat layar terasa tenang dan mudah dipindai.
        </p>
      </header>

      {/* Spacing scale */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Skala spacing</h2>
        <p className="text-small text-muted-foreground">
          Gunakan nama token Tailwind, contoh{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">p-6</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">gap-4</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">mt-8</code>.
        </p>
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {spacing.map((s) => (
            <div
              key={s.token}
              className="grid items-center gap-3 px-6 py-4 md:grid-cols-[110px_1fr_1.4fr]"
            >
              <p className="text-small text-ink">
                <code className="rounded bg-primary-subtle px-1.5 py-0.5 font-mono text-primary-dark">
                  {s.token}
                </code>{" "}
                <span className="text-muted-foreground">{s.px}px</span>
              </p>
              <div
                className="h-4 rounded-sm bg-primary"
                style={{ width: s.px }}
                aria-hidden
              />
              <p className="text-small text-muted-foreground">{s.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Breakpoints */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Breakpoint & grid</h2>
        <p className="text-small text-muted-foreground">
          Mobile-first: tulis gaya untuk HP dulu, lalu tambahkan{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">md:</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">lg:</code> untuk
          layar lebih besar.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[480px] text-left text-small">
            <thead className="border-b border-border text-caption text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Breakpoint</th>
                <th className="px-6 py-3 font-medium">Lebar min (px)</th>
                <th className="px-6 py-3 font-medium">Grid</th>
                <th className="px-6 py-3 font-medium">Perangkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-ink">
              {breakpoints.map((b) => (
                <tr key={b.name}>
                  <td className="px-6 py-3 font-semibold">{b.name}</td>
                  <td className="px-6 py-3">{b.px}</td>
                  <td className="px-6 py-3">{b.cols}</td>
                  <td className="px-6 py-3 text-muted-foreground">{b.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-small text-muted-foreground">
          Jarak antar kolom (gutter): 16px di HP, 24px di tablet ke atas. Margin
          tepi halaman: 24px di HP, 48px di desktop.
        </p>
      </section>

      {/* Containers */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Lebar container</h2>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
          {containers.map((c) => (
            <div key={c.name} className="flex flex-col gap-1.5">
              <div
                className="flex h-9 items-center rounded-lg bg-primary-subtle px-3 text-caption font-semibold text-primary-dark"
                style={{
                  width: `${(c.px / 1152) * 100}%`,
                  minWidth: "fit-content",
                }}
              >
                {c.name} · {c.px}px
              </div>
              <p className="text-caption text-muted-foreground">
                <code className="font-mono">{c.cls}</code> · {c.use}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ritme */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Ritme vertikal</h2>
        <p className="text-small text-muted-foreground">
          Elemen yang saling terkait didekatkan, elemen yang berbeda topik
          dijauhkan.
        </p>
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-caption font-medium text-primary-darker">
                KONSULTASI BISNIS 1-ON-1
              </p>
              <h3 className="text-h1 text-ink">Temukan Arah Bisnismu</h3>
            </div>
            <p className="max-w-xl text-body text-muted-foreground">
              Lihat profil, keahlian, dan rekam jejak mentor, lalu booking sesi
              private sesuai kebutuhan bisnismu.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-subtle px-3 py-1 text-caption font-medium text-primary-dark">
                Harga & promosi
              </span>
              <span className="rounded-full bg-primary-subtle px-3 py-1 text-caption font-medium text-primary-dark">
                Keuangan
              </span>
            </div>
          </div>
          <ul className="mt-6 flex flex-col gap-1 border-t border-border pt-4 text-caption text-muted-foreground">
            <li>
              Label → judul: <b className="text-ink">8px (gap-2)</b>
            </li>
            <li>
              Antar blok: <b className="text-ink">24px (gap-6)</b>
            </li>
            <li>
              Antar chip: <b className="text-ink">8px (gap-2)</b>
            </li>
            <li>
              Padding kartu: <b className="text-ink">24px (p-6)</b>
            </li>
          </ul>
        </article>
      </section>

      {/* Aturan */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>Pakai kelipatan 4px saja (gap-2, p-4, mt-6, dst.)</li>
            <li>Beri jarak minimal 8px antar elemen yang bisa diklik</li>
            <li>Rancang untuk HP dulu, lalu perluas ke desktop</li>
            <li>Gunakan 1 container per halaman supaya tepi konten sejajar</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>Nilai ad hoc seperti mt-[13px] atau p-[22px]</li>
            <li>Tombol dan chip yang menempel tanpa jarak</li>
            <li>Lebar tetap dalam px untuk container utama</li>
            <li>Scroll horizontal di layar HP</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
