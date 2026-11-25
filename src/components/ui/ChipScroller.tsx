import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Baris chip yang bisa digeser di HP: bleed sampai tepi layar, scrollbar disembunyikan, tepi memudar
 * sebagai petunjuk masih ada isi, chip terpilih otomatis digulir ke tengah. Di layar besar chip membungkus ke baris baru.
 */
export default function ChipScroller({
  label,
  watch,
  children,
}: {
  label: string;
  watch: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const el = ref.current;
    const on = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !on || el.scrollWidth <= el.clientWidth) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: on.offsetLeft - (el.clientWidth - on.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [watch]);

  const fade = `linear-gradient(to right, ${edge.start ? "#000" : "transparent"}, #000 28px, #000 calc(100% - 28px), ${edge.end ? "#000" : "transparent"})`;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      onScroll={measure}
      className="-mx-4 -my-1 min-w-0 snap-x overflow-x-auto py-1 [scrollbar-width:none] sm:-mx-8 lg:mx-0 lg:my-0 lg:snap-none lg:overflow-visible lg:py-0 max-lg:[-webkit-mask-image:var(--fade)] max-lg:[mask-image:var(--fade)] [&::-webkit-scrollbar]:hidden"
      style={{ "--fade": fade } as CSSProperties}
    >
      {children}
    </div>
  );
}
