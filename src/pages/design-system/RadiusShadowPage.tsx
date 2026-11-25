import { Check, X } from "lucide-react";

const radii = [
  {
    cls: "rounded-full",
    name: "Pill",
    px: "penuh",
    use: "Badge, chip, avatar, kolom pencarian, dropdown, tombol CTA",
  },
  {
    cls: "rounded-lg",
    name: "Medium",
    px: "8px",
    use: "Tombol, input, dropdown",
  },
  {
    cls: "rounded-xl",
    name: "Large",
    px: "12px",
    use: "Kartu mentor, kartu konten",
  },
  {
    cls: "rounded-2xl",
    name: "XL",
    px: "16px",
    use: "Kartu mentor, kartu form, daftar dropdown, modal",
  },
  {
    cls: "rounded-3xl",
    name: "2XL",
    px: "24px",
    use: "Kartu besar dan foto di landing, kartu hero",
  },
];

const shadows = [
  { cls: "shadow-xs", name: "XS", use: "Input saat fokus, chip aktif" },
  { cls: "shadow-sm", name: "SM", use: "Kartu yang bisa diklik (diam)" },
  {
    cls: "shadow-md",
    name: "MD",
    use: "Kartu saat hover, kolom pencarian saat fokus, dropdown",
  },
  {
    cls: "shadow-lg",
    name: "LG",
    use: "Modal, dialog, toast, foto dan kartu besar di landing",
  },
];

const borders = [
  {
    name: "Default",
    spec: "1px · --border",
    use: "Kartu, pemisah, tabel",
    cls: "border border-border",
  },
  {
    name: "Input",
    spec: "1px · --input",
    use: "Field form (sedikit lebih tegas)",
    cls: "border border-input",
  },
  {
    name: "Aktif / fokus",
    spec: "2px · --primary-darker",
    use: "Input fokus, kartu terpilih",
    cls: "border-2 border-primary-darker",
  },
  {
    name: "Error",
    spec: "2px · --destructive",
    use: "Field dengan error (plus teks & ikon)",
    cls: "border-2 border-destructive",
  },
];

export default function RadiusShadowPage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-3">
        <p className="text-small font-semibold text-primary-darker">
          Foundations
        </p>
        <h1 className="text-h1 text-ink">Radius, Border & Shadow</h1>
        <p className="max-w-2xl text-body text-muted-foreground">
          Gaya soft/clean: sudut membulat sedang, garis tipis, dan bayangan
          lembut. Mengacu pada gaya <em>Soft UI Evolution</em> (radius 8–12px,
          shadow berlapis, kontras tetap terjaga).
        </p>
      </header>

      {/* Radius */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Radius</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {radii.map((r) => (
            <article
              key={r.cls}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div
                className={`h-20 border-2 border-primary-dark-shade bg-primary-subtle ${r.cls}`}
                aria-hidden
              />
              <div>
                <p className="text-small font-semibold text-ink">
                  {r.name}{" "}
                  <span className="font-normal text-muted-foreground">
                    {r.px}
                  </span>
                </p>
                <code className="font-mono text-caption text-primary-dark">
                  {r.cls}
                </code>
                <p className="mt-1 text-caption text-muted-foreground">
                  {r.use}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="text-small text-muted-foreground">
          Aturan elemen bersarang: radius elemen dalam = radius luar − jarak
          padding. Contoh tombol 8px di dalam kartu 12px dengan padding 16px
          sudah terlihat serasi.
        </p>
      </section>

      {/* Border */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Border</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {borders.map((b) => (
            <article
              key={b.name}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div
                className={`h-14 w-20 shrink-0 rounded-lg bg-card ${b.cls}`}
                aria-hidden
              />
              <div>
                <p className="text-small font-semibold text-ink">{b.name}</p>
                <p className="font-mono text-caption text-primary-dark">
                  {b.spec}
                </p>
                <p className="text-caption text-muted-foreground">{b.use}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Shadow */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Shadow (elevasi)</h2>
        <p className="text-small text-muted-foreground">
          Bayangan dipakai hemat dan hanya untuk menunjukkan elemen yang
          melayang atau bisa berinteraksi. Warna bayangan memakai Ink dengan
          opasitas rendah.
        </p>
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-background p-6 ring-1 ring-border lg:grid-cols-4">
          {shadows.map((s) => (
            <article key={s.cls} className="flex flex-col gap-3">
              <div className={`h-24 rounded-xl bg-card ${s.cls}`} aria-hidden />
              <div>
                <p className="text-small font-semibold text-ink">{s.name}</p>
                <code className="font-mono text-caption text-primary-dark">
                  {s.cls}
                </code>
                <p className="mt-1 text-caption text-muted-foreground">
                  {s.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contoh kartu */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Contoh: kartu mentor</h2>
        <p className="text-small text-muted-foreground">
          Arahkan kursor ke kartu: border dan bayangan naik satu tingkat (SM →
          MD) dengan transisi 200ms.
        </p>
        <article className="max-w-sm cursor-pointer rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div
              className="flex size-14 items-center justify-center rounded-full bg-primary-subtle text-h3 text-primary-dark"
              aria-hidden
            >
              A
            </div>
            <div>
              <p className="text-h3 text-ink">Nama Mentor</p>
              <p className="text-small text-muted-foreground">
                Spesialis harga & promosi
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-subtle px-3 py-1 text-caption text-primary-dark">
              Harga & HPP
            </span>
            <span className="rounded-full bg-primary-subtle px-3 py-1 text-caption text-primary-dark">
              Promosi
            </span>
          </div>
          <button
            type="button"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary-darker px-4 text-small font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Booking sesi
          </button>
        </article>
        <p className="text-caption text-muted-foreground">
          Nama dan data mentor di atas hanya placeholder ilustrasi.
        </p>
      </section>

      {/* Focus */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Focus ring</h2>
        <p className="text-small text-muted-foreground">
          Semua elemen interaktif punya focus ring 2px Darker (#18842B, kontras
          4,8 : 1) dengan jarak 2px. Coba tekan Tab untuk melihatnya.
        </p>
        <div className="flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-6">
          <button
            type="button"
            className="min-h-11 rounded-lg border border-input px-4 text-small font-semibold text-ink"
          >
            Tombol
          </button>
          <input
            aria-label="Contoh input"
            placeholder="Contoh input"
            className="min-h-11 rounded-lg border border-input px-3 text-small text-ink placeholder:text-muted-foreground"
          />
        </div>
      </section>

      {/* Aturan */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>Pakai satu radius per jenis elemen secara konsisten</li>
            <li>
              Pilih border atau shadow untuk memisahkan elemen, tidak perlu
              keduanya berat
            </li>
            <li>
              Naikkan satu tingkat shadow saat hover, dengan transisi 200–300ms
            </li>
            <li>
              Tandai state error dengan teks dan ikon, tidak hanya border merah
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>
              Mencampur radius acak (misalnya 6px, 10px, 14px) dalam satu layar
            </li>
            <li>Shadow gelap dan tebal, atau shadow keras tanpa blur</li>
            <li>Menumpuk shadow besar pada kartu yang bersarang</li>
            <li>Menghapus focus ring tanpa pengganti</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
