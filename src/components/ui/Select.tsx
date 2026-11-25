import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type SelectOption<T extends string> = { value: T; label: string };

/**
 * Dropdown bergaya Sorota (pola listbox ARIA). Menggantikan <select> bawaan browser yang daftarnya
 * tidak bisa distyling. Keyboard: Panah atas/bawah, Home/End, Enter/Spasi memilih, Escape menutup.
 */
export default function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  className?: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const [active, setActive] = useState(selectedIndex);

  // Klik di luar menutup daftar
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(options.length - 1, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-full border bg-card pr-3.5 pl-4 text-small font-medium text-ink transition-[border-color,box-shadow] duration-200 ${
          open
            ? "border-primary-darker shadow-md"
            : "border-border hover:bg-muted"
        }`}
      >
        <span id={`${id}-value`} className="truncate">
          {options[selectedIndex].label}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.75}
          aria-hidden
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-lg"
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-small ${
                  i === active ? "bg-primary-subtle" : ""
                } ${selected ? "font-semibold text-ink" : "font-medium text-ink"}`}
              >
                {o.label}
                {selected && (
                  <Check
                    size={16}
                    strokeWidth={2.25}
                    aria-hidden
                    className="shrink-0 text-primary-darker"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
