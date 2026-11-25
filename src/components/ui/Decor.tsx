/** Hiasan garis: bintang empat sudut dan lingkaran kecil. Dekoratif saja, disembunyikan dari pembaca layar. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`text-ink ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
    </svg>
  );
}

export function Ring({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block rounded-full border-[1.5px] border-ink ${className}`}
    />
  );
}
