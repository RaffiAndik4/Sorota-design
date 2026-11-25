import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../components/Logo";

type NavItem = { to: string; label: string; ready?: boolean };

const sections: { group: string; items: NavItem[] }[] = [
  {
    group: "Mulai",
    items: [{ to: "/design-system", label: "Overview", ready: true }],
  },
  {
    group: "Foundations",
    items: [
      { to: "/design-system/logo", label: "Logo", ready: true },
      { to: "/design-system/colors", label: "Colors", ready: true },
      { to: "/design-system/typography", label: "Typography", ready: true },
      { to: "/design-system/spacing", label: "Spacing & Layout", ready: true },
      {
        to: "/design-system/radius-shadow",
        label: "Radius, Border & Shadow",
        ready: true,
      },
      { to: "/design-system/icons", label: "Iconography", ready: true },
    ],
  },
  {
    group: "Komponen",
    items: [
      { to: "/design-system/components", label: "Components", ready: true },
      { to: "/design-system/patterns", label: "Patterns", ready: true },
    ],
  },
  {
    group: "Konten",
    items: [{ to: "/design-system/voice", label: "Voice & Tone", ready: true }],
  },
];

export default function DesignSystemLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-border bg-card md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-r md:border-b-0">
        <div className="flex items-center justify-between px-6 py-4 md:py-6">
          <div>
            <Logo height={22} />
            <p className="mt-1 text-sm text-muted-foreground">Design System</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="ds-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:bg-muted md:hidden"
          >
            {open ? (
              <X size={20} aria-hidden />
            ) : (
              <Menu size={20} aria-hidden />
            )}
          </button>
        </div>
        <nav
          id="ds-nav"
          className={`${open ? "flex" : "hidden"} flex-col gap-6 px-3 pb-6 md:flex`}
          aria-label="Navigasi design system"
        >
          {sections.map((s) => (
            <div key={s.group}>
              <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {s.group}
              </p>
              <ul className="flex flex-col gap-0.5">
                {s.items.map((item) => (
                  <li key={item.to}>
                    {item.ready ? (
                      <NavLink
                        to={item.to}
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            isActive
                              ? "bg-primary-subtle font-semibold text-primary-darker"
                              : "text-ink hover:bg-muted"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground">
                        {item.label}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                          segera
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="mx-auto w-full max-w-5xl px-6 py-10 md:px-12">
        <Outlet />
      </main>
    </div>
  );
}
