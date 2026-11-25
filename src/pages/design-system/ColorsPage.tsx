import { Check, Copy, X } from "lucide-react";
import { useState } from "react";

type Swatch = { name: string; token: string; hex: string; note?: string };
type Group = { title: string; usage: string; swatches: Swatch[] };

const groups: Group[] = [
  {
    title: "Brand Green",
    usage: "Primary action, link, focus ring, active state",
    swatches: [
      {
        name: "Sorota Green",
        token: "--primary",
        hex: "#23B83D",
        note: "Warna utama brand",
      },
      { name: "Dark", token: "--primary-dark", hex: "#0A3D15" },
      {
        name: "Darker",
        token: "--primary-darker",
        hex: "#18842B",
        note: "Latar tombol teks putih",
      },
      { name: "Dark Shade", token: "--primary-dark-shade", hex: "#1FA737" },
      { name: "Light", token: "--primary-light", hex: "#4ADE63" },
      { name: "Lighter", token: "--primary-lighter", hex: "#B9F7C3" },
      { name: "Subtle", token: "--primary-subtle", hex: "#EDFBEF" },
    ],
  },
  {
    title: "Ink & Neutrals",
    usage: "Teks, outline, surface",
    swatches: [
      { name: "Ink", token: "--ink", hex: "#101510", note: "Teks utama" },
      {
        name: "Muted Text",
        token: "--muted-foreground",
        hex: "#586158",
        note: "Teks sekunder",
      },
      { name: "Input", token: "--input", hex: "#DDE5DD", note: "Border input" },
      { name: "Border", token: "--border", hex: "#E2E8E2" },
      {
        name: "Muted",
        token: "--muted",
        hex: "#F2F4F2",
        note: "Latar hover, chip",
      },
      {
        name: "Background",
        token: "--background",
        hex: "#FAFAFA",
        note: "Latar halaman",
      },
      { name: "Card", token: "--card", hex: "#FFFFFF", note: "Latar kartu" },
    ],
  },
  {
    title: "Highlight",
    usage:
      "Satu per area: CTA utama sebuah section (hero, pencarian, ajakan penutup), bintang rating",
    swatches: [
      { name: "Highlight", token: "--highlight", hex: "#FACC15" },
      { name: "Highlight Light", token: "--highlight-light", hex: "#FDE047" },
      {
        name: "Amber 700",
        token: "--amber-700",
        hex: "#B45309",
        note: "Teks di latar amber",
      },
      { name: "Amber 100", token: "--amber-100", hex: "#FEF3C7" },
      { name: "Amber 50", token: "--amber-50", hex: "#FFFBEB" },
    ],
  },
  {
    title: "Warna kategori (dekoratif)",
    usage:
      "Hanya untuk lingkaran ikon filter kategori mentor. Bukan warna brand dan bukan status.",
    swatches: [
      {
        name: "Blue 100 / 700",
        token: "Keuangan",
        hex: "#DBEAFE",
        note: "Ikon #1D4ED8",
      },
      {
        name: "Amber 100 / 700",
        token: "Pemasaran",
        hex: "#FEF3C7",
        note: "Ikon #B45309",
      },
      {
        name: "Rose 100 / 700",
        token: "Menu dan Produk",
        hex: "#FFE4E6",
        note: "Ikon #BE123C",
      },
      {
        name: "Violet 100 / 700",
        token: "Operasional",
        hex: "#EDE9FE",
        note: "Ikon #6D28D9",
      },
      {
        name: "Teal 100 / 700",
        token: "Legalitas",
        hex: "#CCFBF1",
        note: "Ikon #0F766E",
      },
      {
        name: "Orange 100 / 700",
        token: "Strategi Bisnis",
        hex: "#FFEDD5",
        note: "Ikon #C2410C",
      },
    ],
  },
  {
    title: "Semantic",
    usage: "Hanya untuk feedback sistem, jangan untuk dekorasi",
    swatches: [
      { name: "Success", token: "--success", hex: "#16A34A" },
      { name: "Warning", token: "--warning", hex: "#F59E0B" },
      { name: "Destructive", token: "--destructive", hex: "#EF4444" },
      { name: "Info", token: "--info", hex: "#2563EB" },
      { name: "Success Subtle", token: "--success-subtle", hex: "#DCFCE7" },
      { name: "Warning Subtle", token: "--warning-subtle", hex: "#FEF3C7" },
      {
        name: "Destructive Subtle",
        token: "--destructive-subtle",
        hex: "#FEE2E2",
      },
      { name: "Info Subtle", token: "--info-subtle", hex: "#DBEAFE" },
    ],
  },
];

const INK = "#101510";

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

function rating(ratio: number) {
  if (ratio >= 7)
    return { label: "AAA", cls: "bg-success-subtle text-success" };
  if (ratio >= 4.5)
    return { label: "AA", cls: "bg-success-subtle text-success" };
  if (ratio >= 3)
    return { label: "AA Large", cls: "bg-amber-100 text-amber-700" };
  return { label: "Gagal", cls: "bg-destructive-subtle text-destructive" };
}

function ContrastRow({
  fg,
  bg,
  label,
}: {
  fg: string;
  bg: string;
  label: string;
}) {
  const ratio = contrast(fg, bg);
  const r = rating(ratio);
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="font-medium text-ink tabular-nums">
          {ratio.toFixed(1)}
        </span>
        <span className={`rounded px-1.5 py-0.5 font-semibold ${r.cls}`}>
          {r.label}
        </span>
      </span>
    </div>
  );
}

function SwatchCard({ s }: { s: Swatch }) {
  const [copied, setCopied] = useState<string | null>(null);
  const textOnSwatch =
    contrast("#FFFFFF", s.hex) >= contrast(INK, s.hex) ? "#FFFFFF" : INK;

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => copy(s.hex)}
        className="group relative flex h-24 items-end p-3 text-left"
        style={{ background: s.hex, color: textOnSwatch }}
        aria-label={`Salin ${s.hex}`}
      >
        <span className="flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {copied === s.hex ? (
            <Check size={14} aria-hidden />
          ) : (
            <Copy size={14} aria-hidden />
          )}
          {copied === s.hex ? "Tersalin" : "Salin hex"}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-3 border-t border-border p-4">
        <div>
          <p className="text-sm font-semibold text-ink">{s.name}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            <button
              type="button"
              onClick={() => copy(s.hex)}
              className="inline-flex min-h-6 items-center font-mono text-ink hover:text-primary-darker"
            >
              {copied === s.hex ? "Tersalin ✓" : s.hex}
            </button>
            <button
              type="button"
              onClick={() => copy(`var(${s.token})`)}
              className="inline-flex min-h-6 items-center font-mono text-muted-foreground hover:text-primary-darker"
            >
              {copied === `var(${s.token})` ? "Tersalin ✓" : s.token}
            </button>
          </div>
          {s.note && (
            <p className="mt-2 text-xs text-muted-foreground">{s.note}</p>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-1.5 border-t border-border pt-3">
          <ContrastRow fg="#FFFFFF" bg={s.hex} label="Teks putih" />
          <ContrastRow fg={INK} bg={s.hex} label="Teks ink" />
        </div>
      </div>
    </article>
  );
}

const proportion = [
  { label: "Neutrals", pct: 60, cls: "bg-muted text-ink" },
  { label: "Green", pct: 25, cls: "bg-primary text-ink" },
  { label: "Ink", pct: 10, cls: "bg-ink text-white" },
  { label: "Yellow", pct: 5, cls: "bg-highlight text-ink" },
];

const pairings = [
  {
    bg: "#18842B",
    fg: "#FFFFFF",
    label: "Tombol utama",
    desc: "Putih di atas Darker",
  },
  {
    bg: "#23B83D",
    fg: "#101510",
    label: "Tombol hijau terang",
    desc: "Ink di atas Sorota Green",
  },
  {
    bg: "#EDFBEF",
    fg: "#0A3D15",
    label: "Badge / info brand",
    desc: "Dark di atas Subtle",
  },
  {
    bg: "#FACC15",
    fg: "#101510",
    label: "Highlight CTA",
    desc: "Ink di atas Highlight",
  },
  {
    bg: "#CCFBF1",
    fg: "#0F766E",
    label: "Ikon kategori",
    desc: "Ikon 700 di atas latar 100",
  },
  {
    bg: "#FFFFFF",
    fg: "#586158",
    label: "Teks sekunder",
    desc: "Muted Text di atas Card",
  },
  {
    bg: "#FEF3C7",
    fg: "#B45309",
    label: "Peringatan lembut",
    desc: "Amber 700 di atas Amber 100",
  },
];

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-primary-darker">Foundations</p>
        <h1 className="text-4xl font-bold tracking-tight text-ink">Colors</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Netral mendominasi supaya tampilan tenang, hijau dipakai untuk aksi,
          dan kuning hanya sebagai aksen. Klik swatch untuk menyalin hex, klik
          nama token untuk menyalin{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            var(--token)
          </code>
          .
        </p>
      </header>

      {/* Proporsi */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Proporsi warna</h2>
        <p className="text-sm text-muted-foreground">
          Perkiraan bobot warna dalam satu layar.
        </p>
        <div
          className="flex h-16 overflow-hidden rounded-xl border border-border"
          role="img"
          aria-label="Proporsi warna: Neutrals 60%, Green 25%, Ink 10%, Yellow 5%"
        >
          {proportion.map((p) => (
            <div
              key={p.label}
              className={p.cls}
              style={{ width: `${p.pct}%` }}
            />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {proportion.map((p) => (
            <li
              key={p.label}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <span
                className={`size-3 rounded-full border border-border ${p.cls}`}
                aria-hidden
              />
              <span className="font-semibold">{p.label}</span>
              <span className="text-muted-foreground">{p.pct}%</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Palet */}
      {groups.map((g) => (
        <section key={g.title} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold text-ink">{g.title}</h2>
            <p className="text-sm text-muted-foreground">{g.usage}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {g.swatches.map((s) => (
              <SwatchCard key={s.token} s={s} />
            ))}
          </div>
        </section>
      ))}

      {/* Gradasi */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">Gradasi hijau</h2>
        <p className="text-sm text-muted-foreground">
          Hijau muda yang lembut dipakai sebagai latar area besar. Teks di
          atasnya tetap Ink atau Muted Text.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Pita halaman",
              use: "Kepala halaman Tentang dan Daftar Mentor",
              cls: "bg-linear-to-b from-primary-lighter via-primary-light/60 to-primary-lighter",
            },
            {
              name: "Footer",
              use: "Footer di semua halaman",
              cls: "bg-linear-to-b from-primary-subtle to-primary-lighter/40",
            },
            {
              name: "Kartu penutup",
              use: "Kartu ajakan di akhir halaman",
              cls: "bg-linear-to-b from-card to-primary-subtle",
            },
          ].map((g) => (
            <article
              key={g.name}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className={`h-24 ${g.cls}`} aria-hidden />
              <div className="border-t border-border p-4">
                <p className="text-sm font-semibold text-ink">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.use}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pasangan aman */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-ink">
          Pasangan warna yang direkomendasikan
        </h2>
        <p className="text-sm text-muted-foreground">
          Semua pasangan di bawah lolos standar kontras WCAG AA untuk teks
          normal (≥ 4,5 : 1).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pairings.map((p) => {
            const ratio = contrast(p.fg, p.bg);
            const r = rating(ratio);
            return (
              <article
                key={p.label}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div
                  className="flex h-20 items-center px-5"
                  style={{ background: p.bg, color: p.fg }}
                >
                  <span className="text-base font-semibold">
                    Booking sesi mentormu
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold ${r.cls}`}
                  >
                    {ratio.toFixed(1)} · {r.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Aturan */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
            <li>
              Pakai Darker (#18842B) sebagai latar tombol dengan teks putih
            </li>
            <li>
              Pakai Sorota Green hanya untuk elemen dekoratif; ikon bermakna,
              garis aktif, dan focus ring pakai Darker (4,8 : 1)
            </li>
            <li>
              Pakai Ink di atas Sorota Green bila butuh teks (kontras 7,0 : 1)
            </li>
            <li>Biarkan netral (Background, Card, Muted) mendominasi layar</li>
            <li>
              Pakai warna semantic hanya untuk status: sukses, peringatan,
              error, info
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
            <li>
              Teks putih di atas Sorota Green #23B83D (hanya 2,6 : 1, tidak
              lolos WCAG)
            </li>
            <li>
              Teks Sorota Green di atas latar putih (kontras sama, 2,6 : 1)
            </li>
            <li>
              Lebih dari satu elemen kuning (Highlight) dalam satu area section
            </li>
            <li>Merah atau oranye semantic sebagai dekorasi</li>
            <li>Teks hijau terang (Light/Lighter) di atas latar putih</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
