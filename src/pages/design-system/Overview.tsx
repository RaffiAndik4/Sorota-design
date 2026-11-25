const principles = [
  {
    title: "Ngerti dulu, baru solusi",
    body: "Setiap layar dimulai dari masalah pengguna, lalu mengarahkan ke satu langkah yang jelas.",
  },
  {
    title: "Kamu yang pilih",
    body: "Informasi mentor ditampilkan terbuka dan mudah dibandingkan, supaya pengguna yakin dengan pilihannya.",
  },
  {
    title: "Tenang & terpercaya",
    body: "Gaya soft/clean: ruang lega, netral dominan, hijau untuk aksi, kuning hanya satu per area.",
  },
];

export default function Overview() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-primary-darker">
          Design System v0.2
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-ink">
          Sorota Design System
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Acuan visual dan komponen untuk membangun web app Sorota, platform
          mentoring bisnis 1-on-1 untuk pengusaha muda Indonesia.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((p) => (
          <article
            key={p.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-base font-semibold text-ink">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl bg-primary-subtle p-6">
        <h2 className="text-base font-semibold text-primary-dark">
          Fondasi saat ini
        </h2>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-ink">
          <li>Font: Plus Jakarta Sans</li>
          <li>Gaya: soft/clean</li>
          <li>
            Warna: Sorota Green #23B83D + neutrals, highlight, semantic, gradasi
            hijau lembut
          </li>
          <li>
            Ukuran judul: Hero dan Section untuk landing, Display sampai Caption
            untuk halaman lain
          </li>
          <li>
            Navbar kaca yang bersembunyi saat scroll turun dan muncul saat
            scroll naik
          </li>
        </ul>
      </section>
    </div>
  );
}
