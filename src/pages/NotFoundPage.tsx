import { Link } from 'react-router-dom'
import PageIntro from '../components/layout/PageIntro'
import { buttonClasses } from '../components/ui/buttonStyles'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Halaman tidak ditemukan')
  return (
    <PageIntro title="Halaman tidak ditemukan" intro="Alamat yang kamu buka tidak ada atau sudah dipindahkan.">
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/" className={buttonClasses('primary', 'md')}>
          Ke beranda
        </Link>
        <Link to="/mentor" className={buttonClasses('secondary', 'md')}>
          Cari mentor
        </Link>
      </div>
    </PageIntro>
  )
}
