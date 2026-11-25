import {
  ChefHat,
  LayoutGrid,
  Lightbulb,
  Megaphone,
  Scale,
  Search,
  SearchX,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useId, useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import OrdersList from "../../components/orders/OrdersList";
import Select from "../../components/ui/Select";
import MentorPhotoCard from "../../components/ui/MentorPhotoCard";
import {
  activeCategories,
  categoryLabel,
  inCategory,
  mentors,
} from "../../data/mentors";
import { usePageTitle } from "../../hooks/usePageTitle";
import {
  searchWords,
  usePrefersReducedMotion,
  useTypewriter,
} from "../../hooks/useTypewriter";
import { rupiah } from "../../lib/format";
import { useOrders } from "../../lib/ordersStore";

// Warna dekoratif per kategori (ikon 700 di atas latar 100 = kontras aman; terpilih: latar 700 + ikon putih)
const categoryTone: Record<string, { idle: string; on: string }> = {
  semua: {
    idle: "bg-primary-subtle text-primary-darker",
    on: "bg-primary-darker text-white",
  },
  keuangan: { idle: "bg-blue-100 text-blue-700", on: "bg-blue-700 text-white" },
  pemasaran: {
    idle: "bg-amber-100 text-amber-700",
    on: "bg-amber-700 text-white",
  },
  menu: { idle: "bg-rose-100 text-rose-700", on: "bg-rose-700 text-white" },
  operasional: {
    idle: "bg-violet-100 text-violet-700",
    on: "bg-violet-700 text-white",
  },
  legalitas: {
    idle: "bg-teal-100 text-teal-700",
    on: "bg-teal-700 text-white",
  },
  strategi: {
    idle: "bg-orange-100 text-orange-700",
    on: "bg-orange-700 text-white",
  },
};

const categoryIcons: Record<string, LucideIcon> = {
  semua: LayoutGrid,
  keuangan: Wallet,
  pemasaran: Megaphone,
  menu: UtensilsCrossed,
  operasional: ChefHat,
  legalitas: Scale,
  strategi: Lightbulb,
};

// Panel langkah di hero (sama dengan "Cara kerja" di beranda)
const steps = [
  { title: "Pilih mentor", body: "Cari sesuai topik masalahmu" },
  { title: "Booking sesi", body: "Pilih jadwal, tanpa daftar akun" },
  { title: "Sesi via Google Meet", body: "Link dikirim ke emailmu" },
];

type Sort = "rekomendasi" | "termurah" | "termahal";

export default function MentorsPage() {
  const [params, setParams] = useSearchParams();
  const tabSesi = params.get("tab") === "sesi";
  usePageTitle(tabSesi ? "Sesi saya" : "Daftar Mentor");
  const kebutuhan = params.get("kebutuhan") ?? "semua";
  const cari = params.get("cari") ?? "";
  const [q, setQ] = useState(cari);
  const [sort, setSort] = useState<Sort>("rekomendasi");
  const searchId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const typed = useTypewriter(searchWords, q === "" && !reduceMotion);
  const typedShown = reduceMotion ? searchWords[0] : typed;
  const orders = useOrders();

  const update = (next: { kebutuhan?: string; cari?: string }) => {
    const p = new URLSearchParams(params);
    const k = next.kebutuhan ?? kebutuhan;
    const c = next.cari ?? cari;
    if (k && k !== "semua") p.set("kebutuhan", k);
    else p.delete("kebutuhan");
    if (c.trim()) p.set("cari", c.trim());
    else p.delete("cari");
    setParams(p, { replace: true });
  };

  const shown = useMemo(() => {
    const term = cari.trim().toLowerCase();
    const list = mentors.filter((m) => {
      if (kebutuhan !== "semua" && !inCategory(m, kebutuhan)) return false;
      if (!term) return true;
      return [m.name, m.headline, m.summary, ...m.topics, ...m.sectors]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
    if (sort === "termurah") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "termahal") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [kebutuhan, cari, sort]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    update({ cari: q });
  };

  const reset = () => {
    setQ("");
    setParams({}, { replace: true });
  };

  return (
    <>
      {/* Hero ringkas: bingkai putih bergaris di atas latar gradasi hijau, supaya mentor langsung terlihat di layar pertama. */}
      <section className="relative bg-background">
        <div className="relative bg-linear-to-b from-primary-lighter via-primary-light/60 to-primary-lighter px-4 pt-28 pb-14 sm:px-6 md:pb-16">
          <div className="relative mx-auto max-w-6xl rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-7">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_380px] lg:gap-12">
              <div>
                <h1 className="text-h1 text-balance text-ink">
                  Pilih mentor yang{" "}
                  <span className="text-primary-darker">paling ngerti</span>{" "}
                  bisnismu.
                </h1>
                <p className="mt-2 max-w-xl text-small text-muted-foreground md:text-body">
                  Lihat profil mentor, lalu booking sesi 1-on-1 yang private.
                  Kamu yang memilih.
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label="Keunggulan"
                >
                  {[
                    "Sesi private 1-on-1",
                    "Via Google Meet",
                    "Bayar per sesi",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-primary-lighter bg-primary-subtle px-3 py-1 text-caption font-medium text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="sr-only">3 langkah mudah</h2>
                <ol className="relative flex flex-col gap-5">
                  {/* Garis vertikal menyambung dari pusat nomor 1 ke pusat nomor terakhir */}
                  <span
                    aria-hidden
                    className="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-primary-lighter"
                  />
                  {steps.map(({ title, body }, i) => (
                    <li key={title} className="relative flex items-start gap-4">
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-darker text-small font-semibold text-white ring-4 ring-card">
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-small font-semibold text-ink">
                          {title}
                        </p>
                        <p className="mt-0.5 text-caption text-muted-foreground">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          {/* Tepi bawah pita bergelombang, sama seperti halaman Tentang */}
          <svg
            aria-hidden
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="absolute inset-x-0 -bottom-px h-8 w-full text-background md:h-12"
            fill="currentColor"
          >
            <path d="M0 40c240-34 480-34 720-8s480 20 720-12v40H0Z" />
          </svg>
        </div>
      </section>

      <section aria-label="Eksplor mentor" className="px-4 pt-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Tab: Eksplor / Sesi Saya */}
          <nav
            aria-label="Bagian mentor"
            className="flex gap-6 border-b border-border"
          >
            <Link
              to="/mentor"
              aria-current={tabSesi ? undefined : "page"}
              className={`-mb-px inline-flex min-h-11 items-center border-b-2 px-1 text-body ${
                tabSesi
                  ? "border-transparent font-medium text-muted-foreground hover:text-ink"
                  : "border-primary-darker font-semibold text-ink"
              }`}
            >
              Eksplor
            </Link>
            <Link
              to="/mentor?tab=sesi"
              aria-current={tabSesi ? "page" : undefined}
              className={`-mb-px inline-flex min-h-11 items-center gap-2 border-b-2 px-1 text-body ${
                tabSesi
                  ? "border-primary-darker font-semibold text-ink"
                  : "border-transparent font-medium text-muted-foreground hover:text-ink"
              }`}
            >
              Sesi saya
              {orders.length > 0 && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-caption font-semibold text-ink">
                  {orders.length}
                </span>
              )}
            </Link>
          </nav>

          {tabSesi ? (
            <div className="mt-6">
              <OrdersList />
            </div>
          ) : (
            <>
              {/* Pencarian + urutan */}
              <div className="mt-4">
                <form
                  role="search"
                  onSubmit={onSearch}
                  className="flex w-full min-w-0 items-center gap-2 rounded-full border border-input bg-card pl-5 transition-[border-color,box-shadow] duration-200 focus-within:border-primary-darker focus-within:shadow-md"
                >
                  <Search
                    size={20}
                    strokeWidth={1.75}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <label htmlFor={searchId} className="sr-only">
                    Cari nama atau keahlian mentor
                  </label>
                  <div className="group relative min-w-0 flex-1">
                    <input
                      id={searchId}
                      type="search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      autoComplete="off"
                      className="min-h-12 w-full bg-transparent text-body text-ink outline-none"
                    />
                    {q === "" && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-body text-muted-foreground"
                      >
                        <span className="hidden sm:inline">
                          Cari mentor untuk&nbsp;
                        </span>
                        <span className="text-ink">{typedShown}</span>
                        <span className="ml-0.5 h-5 w-px animate-pulse bg-ink group-focus-within:hidden motion-reduce:animate-none" />
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="m-1 inline-flex min-h-10 shrink-0 items-center rounded-full bg-highlight px-6 text-small font-semibold text-ink transition-colors duration-200 hover:bg-highlight-light"
                  >
                    Cari
                  </button>
                </form>
              </div>

              {/* Kategori: satu baris ramping (bisa digeser di HP) */}
              <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div
                  role="group"
                  aria-label="Filter kebutuhan usaha"
                  className="min-w-0 overflow-x-auto pb-1"
                >
                  <ul className="flex w-max min-w-full gap-2 lg:w-auto lg:flex-wrap">
                    {[{ id: "semua", label: "Semua" }, ...activeCategories].map(
                      (c) => {
                        const Icon = categoryIcons[c.id];
                        const on = kebutuhan === c.id;
                        return (
                          <li key={c.id}>
                            <button
                              type="button"
                              aria-pressed={on}
                              onClick={() => update({ kebutuhan: c.id })}
                              className={`inline-flex min-h-11 items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-small font-medium whitespace-nowrap text-ink transition-colors duration-200 ${
                                on
                                  ? "border-primary-darker bg-primary-subtle"
                                  : "border-border bg-card hover:bg-muted"
                              }`}
                            >
                              <span
                                className={`flex size-7 items-center justify-center rounded-full ${on ? categoryTone[c.id].on : categoryTone[c.id].idle}`}
                              >
                                <Icon
                                  size={15}
                                  strokeWidth={1.75}
                                  aria-hidden
                                />
                              </span>
                              {c.label}
                            </button>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
                <Select
                  label="Urutkan mentor"
                  value={sort}
                  onChange={setSort}
                  className="shrink-0 lg:w-60"
                  options={[
                    { value: "rekomendasi", label: "Urut: Rekomendasi" },
                    { value: "termurah", label: "Urut: Harga terendah" },
                    { value: "termahal", label: "Urut: Harga tertinggi" },
                  ]}
                />
              </div>

              <p
                className="mt-4 text-small text-muted-foreground"
                aria-live="polite"
              >
                Menampilkan {shown.length} mentor
                {cari.trim() && <> untuk &ldquo;{cari.trim()}&rdquo;</>}
              </p>

              {shown.length > 0 ? (
                <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {shown.map((m) => (
                    <li key={m.id}>
                      <MentorPhotoCard
                        name={m.name}
                        headline={m.headline}
                        category={categoryLabel(m.category)}
                        topics={m.topics.slice(0, 2)}
                        price={rupiah(m.price)}
                        href={`/mentor/${m.id}`}
                        bookHref={`/mentor/${m.id}/pesan`}
                        tone={m.index}
                        photo={m.photo}
                        photoPos={m.photoPos}
                        rating={m.rating}
                        reviews={m.reviews}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-3 py-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary-subtle text-primary-darker">
                    <SearchX size={28} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h2 className="text-h3 text-ink">
                    Belum ada mentor yang cocok
                  </h2>
                  <p className="text-small text-muted-foreground">
                    Coba kata kunci lain atau hapus filternya untuk melihat
                    semua mentor.
                  </p>
                  <Button variant="secondary" className="mt-2" onClick={reset}>
                    Hapus filter
                  </Button>
                </div>
              )}

              <p className="mt-10 text-caption text-muted-foreground">
                Data mentor dan harga disalin dari desain Sorota. Detail dua
                mentor terakhir masih perlu dilengkapi.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
