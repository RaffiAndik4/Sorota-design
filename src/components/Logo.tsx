type LogoProps = {
  /** primary = hijau di latar terang, white = putih di latar hijau/gelap */
  variant?: 'primary' | 'white'
  /** tinggi logo dalam px */
  height?: number
  className?: string
}

/**
 * Wordmark Sorota — Jano Sans Pro SemiBold, warna --primary (#23B83D).
 * File SVG berisi outline huruf (tidak butuh font terpasang): public/sorota-logo*.svg
 */
export default function Logo({ variant = 'primary', height = 24, className = '' }: LogoProps) {
  const src = variant === 'white' ? '/sorota-logo-white.svg' : '/sorota-logo.svg'
  return <img src={src} alt="Sorota" style={{ height, width: 'auto' }} className={className} />
}
