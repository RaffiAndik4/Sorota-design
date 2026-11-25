import { Link } from "react-router-dom";
import { initials } from "../../lib/format";
import { Badge } from "./Badge";
import Rating from "./Rating";
import { buttonClasses } from "./buttonStyles";

const gradients = [
  "from-primary-lighter to-primary-light",
  "from-amber-100 to-highlight-light",
  "from-info-subtle to-[#bfd3f7]",
  "from-primary-subtle to-primary-lighter",
  "from-success-subtle to-primary-light",
  "from-muted to-input",
];

/** Kartu mentor bergaya referensi: area foto besar di atas. Foto asli menggantikan placeholder bila sudah ada (prop photo). */
export default function MentorPhotoCard({
  name,
  headline,
  category,
  topics,
  price,
  href,
  bookHref,
  tone = 0,
  photo,
  photoPos = "50% 30%",
  rating,
  reviews,
}: {
  name: string;
  headline: string;
  category: string;
  topics: string[];
  price: string;
  href: string;
  bookHref: string;
  tone?: number;
  photo?: string;
  photoPos?: string;
  rating?: number;
  reviews?: number;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,translate] duration-200 hover:shadow-lg motion-safe:hover:-translate-y-0.5">
      <Link
        to={href}
        aria-label={`Lihat profil ${name}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        {photo ? (
          <img
            src={photo}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: photoPos }}
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className={`flex size-full items-center justify-center bg-linear-to-br ${gradients[tone % gradients.length]}`}
          >
            <span className="text-[56px] font-semibold tracking-tight text-ink/70 transition-transform duration-300 motion-safe:group-hover:scale-105">
              {initials(name)}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3">
          <Badge tone="neutral">{category}</Badge>
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-h3 text-ink">{name}</h3>
          <p className="mt-0.5 line-clamp-2 text-small text-muted-foreground">
            {headline}
          </p>
        </div>
        {rating !== undefined && <Rating value={rating} count={reviews} />}
        <ul className="flex flex-wrap gap-2" aria-label="Topik">
          {topics.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-small whitespace-nowrap text-ink">
              <span className="text-h3">{price}</span>{" "}
              <span className="text-muted-foreground">/ sesi</span>
            </p>
            <Link
              to={href}
              aria-label={`Lihat profil ${name}`}
              className="inline-flex min-h-11 items-center rounded px-1 text-caption font-medium text-muted-foreground underline-offset-4 hover:text-ink hover:underline sm:min-h-8"
            >
              Lihat profil
            </Link>
          </div>
          <Link
            to={bookHref}
            aria-label={`Booking sesi dengan ${name}`}
            className={`${buttonClasses("primary", "md")} mt-3 w-full`}
          >
            Booking sesi
          </Link>
        </div>
      </div>
    </article>
  );
}
