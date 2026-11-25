import { Check, Download, X } from "lucide-react";
import Logo from "../../components/Logo";

const downloads = [
  {
    title: "Primary (hijau)",
    file: "/sorota-logo.svg",
    variant: "primary" as const,
    bg: "bg-card",
  },
  {
    title: "White (putih)",
    file: "/sorota-logo-white.svg",
    variant: "white" as const,
    bg: "bg-primary",
  },
];

/** Render SVG ke canvas lalu unduh sebagai PNG transparan (tinggi 200px × scale). */
function downloadPng(svgUrl: string, scale: number) {
  const img = new Image();
  img.onload = () => {
    const height = 200 * scale;
    const width = Math.round((img.naturalWidth / img.naturalHeight) * height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${svgUrl.slice(1, -4)}${scale === 1 ? "" : `@${scale}x`}.png`;
    a.click();
  };
  img.src = svgUrl;
}

const specs = [
  { label: "Warna", value: "Sorota Green · --primary · #23B83D" },
  { label: "Font", value: "Jano Sans Pro · SemiBold (600)" },
  {
    label: "File",
    value: "public/sorota-logo.svg · public/sorota-logo-white.svg",
  },
  { label: "Rasio", value: "± 4,66 : 1 (lebar : tinggi)" },
];

const dos = [
  "Pakai versi hijau di latar putih, krem, atau netral terang",
  "Pakai versi putih di latar Sorota Green atau Ink",
  'Beri ruang kosong di sekeliling logo minimal setinggi huruf "o"',
];

const donts = [
  "Mengganti warna logo di luar hijau dan putih",
  "Meletakkan logo hijau di latar hijau atau foto ramai",
  "Memutar, memiringkan, meregangkan, atau memberi efek bayangan",
];

export default function LogoPage() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-primary-darker">Foundations</p>
        <h1 className="text-4xl font-bold tracking-tight text-ink">Logo</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Wordmark Sorota adalah identitas utama brand. Gunakan secara konsisten
          di semua permukaan produk.
        </p>
      </header>

      {/* Hero */}
      <section className="flex min-h-64 items-center justify-center rounded-3xl border border-border bg-card">
        <Logo height={64} />
      </section>

      {/* Download */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Download</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {downloads.map((d) => (
            <article
              key={d.file}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className={`flex h-32 items-center justify-center ${d.bg}`}>
                <Logo height={32} variant={d.variant} />
              </div>
              <div className="flex flex-col gap-3 border-t border-border p-4">
                <p className="text-sm font-semibold text-ink">{d.title}</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={d.file}
                    download={d.file.slice(1)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-darker px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    <Download size={16} aria-hidden /> SVG
                  </a>
                  {[1, 4].map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => downloadPng(d.file, scale)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-muted"
                    >
                      <Download size={16} aria-hidden /> PNG{" "}
                      {scale === 1 ? "" : `${scale}x`}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          SVG untuk web, Figma, dan cetak. PNG berlatar transparan untuk dokumen
          dan presentasi (PNG: tinggi 200px, PNG 4x: tinggi 800px).
        </p>
      </section>

      {/* Spesifikasi */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Spesifikasi</h2>
        <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {specs.map((s) => (
            <div
              key={s.label}
              className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr]"
            >
              <dt className="text-sm font-medium text-muted-foreground">
                {s.label}
              </dt>
              <dd className="text-sm text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="rounded-xl bg-primary-subtle px-4 py-3 text-sm text-primary-dark">
          Logo berupa SVG dengan huruf yang sudah dikonversi menjadi outline,
          jadi tampil sama di semua perangkat tanpa perlu font Jano Sans Pro
          terpasang. Selalu pakai file ini, jangan mengetik ulang
          &quot;sorota&quot; dengan font.
        </p>
      </section>

      {/* Varian */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Varian warna</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <figure className="flex flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex h-40 items-center justify-center bg-card">
              <Logo height={36} />
            </div>
            <figcaption className="border-t border-border bg-card px-4 py-3 text-sm">
              <p className="font-semibold text-ink">Primary</p>
              <p className="text-muted-foreground">Latar putih / card</p>
            </figcaption>
          </figure>
          <figure className="flex flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex h-40 items-center justify-center bg-primary">
              <Logo height={36} variant="white" />
            </div>
            <figcaption className="border-t border-border bg-card px-4 py-3 text-sm">
              <p className="font-semibold text-ink">White on Green</p>
              <p className="text-muted-foreground">Latar Sorota Green</p>
            </figcaption>
          </figure>
          <figure className="flex flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex h-40 items-center justify-center bg-ink">
              <Logo height={36} variant="white" />
            </div>
            <figcaption className="border-t border-border bg-card px-4 py-3 text-sm">
              <p className="font-semibold text-ink">White on Ink</p>
              <p className="text-muted-foreground">Latar gelap</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Ukuran */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Ukuran</h2>
        <div className="flex flex-wrap items-end gap-10 rounded-xl border border-border bg-card p-8">
          {[
            { size: 40, label: "Hero · 40px" },
            { size: 24, label: "Navbar · 24px" },
            { size: 20, label: "Sidebar · 20px" },
            { size: 14, label: "Minimum · 14px" },
          ].map((s) => (
            <div key={s.size} className="flex flex-col gap-3">
              <Logo height={s.size} />
              <span className="text-xs font-medium text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Do & Don't */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
            {dos.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
            {donts.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
