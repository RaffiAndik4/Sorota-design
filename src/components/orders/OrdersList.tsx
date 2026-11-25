import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { buttonClasses } from "../ui/buttonStyles";
import StatusBadge from "../ui/StatusBadge";
import { getMentor } from "../../data/mentors";
import { formatDate } from "../../lib/format";
import { useOrders } from "../../lib/ordersStore";

/** Daftar booking sesi ("Sesi saya"): tabel di layar sedang ke atas, kartu di HP. */
export default function OrdersList() {
  const orders = useOrders();

  return (
    <div aria-label="Sesi saya">
      <p className="rounded-xl border border-dashed border-input px-4 py-3 text-small text-muted-foreground">
        Prototipe: pesanan disimpan di perangkat ini dan berisi data contoh.
        Tanpa akun, kamu juga bisa membuka pesanan lewat link yang dikirim ke
        emailmu.
      </p>

      {orders.length === 0 ? (
        <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-3 py-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-subtle text-primary-darker">
            <ClipboardList size={28} strokeWidth={1.75} aria-hidden />
          </div>
          <h2 className="text-h3 text-ink">Belum ada pesanan</h2>
          <p className="text-small text-muted-foreground">
            Pilih mentor yang paling nyambung sama masalah bisnismu, lalu
            booking sesi pertamamu.
          </p>
          <Link
            to="/mentor"
            className={`${buttonClasses("primary", "md")} mt-2`}
          >
            Cari mentor
          </Link>
        </div>
      ) : (
        <>
          {/* Tabel di layar sedang ke atas */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
            <table className="w-full text-left text-small">
              <caption className="sr-only">
                Daftar booking sesi mentoring
              </caption>
              <thead className="border-b border-border bg-muted/60 text-caption text-muted-foreground">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Mentor
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Tanggal booking
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => {
                  const m = getMentor(o.mentorId);
                  return (
                    <tr
                      key={o.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={m?.name ?? "?"}
                            size={44}
                            tone={m?.index ?? 0}
                            src={m?.photo}
                            pos={m?.photoPos}
                          />
                          <div>
                            <p className="text-body font-semibold text-ink">
                              {m?.name}
                            </p>
                            <p className="text-muted-foreground">
                              {m?.headline}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-ink">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/pesanan/${o.id}`}
                          className={buttonClasses("secondary", "md")}
                          aria-label={`Lihat detail pesanan ${m?.name}`}
                        >
                          Lihat detail
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Kartu di HP */}
          <ul className="mt-6 flex flex-col gap-4 md:hidden">
            {orders.map((o) => {
              const m = getMentor(o.mentorId);
              return (
                <li
                  key={o.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={m?.name ?? "?"}
                      size={44}
                      tone={m?.index ?? 0}
                      src={m?.photo}
                      pos={m?.photoPos}
                    />
                    <div className="min-w-0">
                      <p className="text-body font-semibold text-ink">
                        {m?.name}
                      </p>
                      <p className="text-small text-muted-foreground">
                        {m?.headline}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <StatusBadge status={o.status} />
                    <p className="text-small text-muted-foreground">
                      {formatDate(o.createdAt)}
                    </p>
                  </div>
                  <Link
                    to={`/pesanan/${o.id}`}
                    className={`${buttonClasses("secondary", "md")} mt-4 w-full`}
                  >
                    Lihat detail
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
