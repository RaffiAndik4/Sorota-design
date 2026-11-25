import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Heart,
  Info,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  SlidersHorizontal,
  Star,
  Store,
  Tag,
  TrendingUp,
  User,
  Video,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

const STROKE = 1.75;

const groups: { title: string; icons: [string, LucideIcon][] }[] = [
  {
    title: "Navigasi & aksi",
    icons: [
      ["Search", Search],
      ["SlidersHorizontal", SlidersHorizontal],
      ["Menu", Menu],
      ["X", X],
      ["ChevronRight", ChevronRight],
      ["ArrowRight", ArrowRight],
      ["Settings", Settings],
      ["LogOut", LogOut],
    ],
  },
  {
    title: "Mentoring & booking",
    icons: [
      ["User", User],
      ["Calendar", Calendar],
      ["Clock", Clock],
      ["Video", Video],
      ["MessageCircle", MessageCircle],
      ["Star", Star],
      ["Heart", Heart],
      ["Bell", Bell],
    ],
  },
  {
    title: "Bisnis & pembayaran",
    icons: [
      ["Store", Store],
      ["Briefcase", Briefcase],
      ["TrendingUp", TrendingUp],
      ["Tag", Tag],
      ["Wallet", Wallet],
      ["CreditCard", CreditCard],
    ],
  },
  {
    title: "Status",
    icons: [
      ["Check", Check],
      ["CheckCircle2", CheckCircle2],
      ["Info", Info],
      ["AlertTriangle", AlertTriangle],
    ],
  },
];

const sizes = [
  { px: 16, use: "Di dalam teks kecil, badge, chip" },
  { px: 20, use: "Ukuran standar: tombol, input, menu" },
  { px: 24, use: "Ikon mandiri, navigasi, empty state kecil" },
  { px: 32, use: "Penanda fitur / ilustrasi ringan" },
];

const colors = [
  { cls: "text-ink", name: "Ink", use: "Ikon default" },
  {
    cls: "text-muted-foreground",
    name: "Muted Text",
    use: "Ikon pendamping, tidak aktif",
  },
  {
    cls: "text-primary-darker",
    name: "Darker",
    use: "Ikon aktif / aksen (4,8 : 1)",
  },
  {
    cls: "text-destructive",
    name: "Destructive",
    use: "Ikon error, selalu bersama teks",
  },
];

export default function IconsPage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-3">
        <p className="text-small font-semibold text-primary-darker">
          Foundations
        </p>
        <h1 className="text-h1 text-ink">Iconography</h1>
        <p className="max-w-2xl text-body text-muted-foreground">
          Satu set ikon (Lucide) dengan garis tipis {STROKE}px dan sudut
          membulat, selaras dengan gaya soft/clean. Ikon memperjelas teks, bukan
          menggantikannya.
        </p>
      </header>

      {/* Ukuran */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Ukuran</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {sizes.map((s) => (
            <article
              key={s.px}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 items-center">
                <Search
                  size={s.px}
                  strokeWidth={STROKE}
                  className="text-ink"
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-small font-semibold text-ink">{s.px}px</p>
                <p className="text-caption text-muted-foreground">{s.use}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Warna */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Warna ikon</h2>
        <p className="text-small text-muted-foreground">
          Ikon yang menyampaikan informasi butuh kontras minimal 3 : 1 terhadap
          latarnya. Sorota Green{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">#23B83D</code> hanya
          2,6 : 1 di atas putih, jadi dipakai untuk dekorasi saja. Untuk ikon
          aktif pakai Darker.
        </p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {colors.map((c) => (
            <article
              key={c.name}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
            >
              <Star
                size={24}
                strokeWidth={STROKE}
                className={c.cls}
                aria-hidden
              />
              <div>
                <p className="text-small font-semibold text-ink">{c.name}</p>
                <code className="font-mono text-caption text-primary-dark">
                  {c.cls}
                </code>
                <p className="mt-1 text-caption text-muted-foreground">
                  {c.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Set ikon */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 text-ink">Set ikon Sorota</h2>
          <p className="text-small text-muted-foreground">
            Ikon yang diperkirakan dipakai di web app. Impor dari{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">lucide-react</code>{" "}
            menurut nama di bawah. Tambahkan ikon baru dari set yang sama.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title} className="flex flex-col gap-3">
            <h3 className="text-h3 text-ink">{g.title}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {g.icons.map(([name, Icon]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <Icon
                    size={24}
                    strokeWidth={STROKE}
                    className="shrink-0 text-ink"
                    aria-hidden
                  />
                  <span className="truncate font-mono text-caption text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Pola pemakaian */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-ink">Pola pemakaian</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <p className="text-small font-semibold text-ink">
              1. Ikon + teks (dekoratif)
            </p>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-darker px-4 text-small font-semibold text-white"
            >
              <Calendar size={20} strokeWidth={STROKE} aria-hidden /> Booking
              sesi
            </button>
            <p className="text-caption text-muted-foreground">
              Teks sudah menjelaskan fungsinya, jadi ikon diberi{" "}
              <code>aria-hidden</code>.
            </p>
          </article>
          <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <p className="text-small font-semibold text-ink">
              2. Ikon saja (butuh label)
            </p>
            <button
              type="button"
              aria-label="Buka filter"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-input text-ink hover:bg-muted"
            >
              <SlidersHorizontal size={20} strokeWidth={STROKE} aria-hidden />
            </button>
            <p className="text-caption text-muted-foreground">
              Tombol wajib punya <code>aria-label</code> dan area sentuh 44px.
            </p>
          </article>
          <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <p className="text-small font-semibold text-ink">
              3. Status (ikon + teks)
            </p>
            <p className="flex items-center gap-2 rounded-lg bg-success-subtle px-3 py-2 text-small text-ink">
              <CheckCircle2
                size={20}
                strokeWidth={STROKE}
                className="shrink-0 text-success"
                aria-hidden
              />
              Sesi berhasil dibooking
            </p>
            <p className="text-caption text-muted-foreground">
              Status tidak boleh hanya warna; selalu ada ikon dan teks.
            </p>
          </article>
        </div>
      </section>

      {/* Aturan */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-success">
            <Check size={18} strokeWidth={STROKE} aria-hidden /> Lakukan
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>
              Pakai satu keluarga ikon dan satu ketebalan garis ({STROKE}px)
            </li>
            <li>Beri nama aksesibel pada tombol yang hanya berisi ikon</li>
            <li>Sejajarkan ikon dengan teks (gap 8px untuk ukuran 20px)</li>
            <li>
              Gunakan ikon yang maknanya umum: pencarian, kalender, jam, bintang
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-destructive">
            <X size={18} strokeWidth={STROKE} aria-hidden /> Hindari
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-small text-ink">
            <li>
              Emoji sebagai ikon antarmuka (tampil beda di tiap perangkat)
            </li>
            <li>
              Mencampur ikon dari beberapa keluarga atau ketebalan berbeda
            </li>
            <li>Ikon Sorota Green sebagai satu-satunya penanda makna</li>
            <li>Ikon dengan makna samar tanpa teks pendamping</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
