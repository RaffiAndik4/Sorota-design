import ClosingCta from '../../components/layout/ClosingCta'
import { usePageTitle } from '../../hooks/usePageTitle'
import FaqSection from './FaqSection'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import MentorsShowcase from './MentorsShowcase'
import PhoneShowcase from './PhoneShowcase'

export default function LandingPage() {
  usePageTitle('')
  return (
    <>
      <Hero />
      <PhoneShowcase />
      {/* Satu gradasi hijau lembut yang menyatukan Cara kerja dan Mentor */}
      <div className="bg-[radial-gradient(ellipse_70%_30%_at_50%_78%,color-mix(in_srgb,var(--primary-light)_28%,transparent),transparent_70%),linear-gradient(to_bottom,var(--background),var(--primary-subtle)_35%,color-mix(in_srgb,var(--primary-lighter)_55%,var(--primary-subtle))_75%,color-mix(in_srgb,var(--primary-lighter)_75%,var(--primary-subtle)))]">
        <HowItWorks />
        <MentorsShowcase />
      </div>
      <FaqSection />
      <div>
        <ClosingCta />
      </div>
    </>
  )
}
