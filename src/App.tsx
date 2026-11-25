import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import AboutPage from './pages/about/AboutPage'
import BookingPage from './pages/booking/BookingPage'
import ColorsPage from './pages/design-system/ColorsPage'
import ComponentsPage from './pages/design-system/ComponentsPage'
import DesignSystemLayout from './pages/design-system/DesignSystemLayout'
import IconsPage from './pages/design-system/IconsPage'
import LogoPage from './pages/design-system/LogoPage'
import Overview from './pages/design-system/Overview'
import PatternsPage from './pages/design-system/PatternsPage'
import RadiusShadowPage from './pages/design-system/RadiusShadowPage'
import SpacingPage from './pages/design-system/SpacingPage'
import TypographyPage from './pages/design-system/TypographyPage'
import VoicePage from './pages/design-system/VoicePage'
import HelpPage from './pages/help/HelpPage'
import LandingPage from './pages/landing/LandingPage'
import MentorProfilePage from './pages/mentors/MentorProfilePage'
import MentorsPage from './pages/mentors/MentorsPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderDetailPage from './pages/orders/OrderDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="tentang" element={<AboutPage />} />
        <Route path="mentor" element={<MentorsPage />} />
        <Route path="mentor/:id" element={<MentorProfilePage />} />
        <Route path="mentor/:id/pesan" element={<BookingPage />} />
        <Route path="pesanan" element={<Navigate to="/mentor?tab=sesi" replace />} />
        <Route path="pesanan/:id" element={<OrderDetailPage />} />
        <Route path="bantuan" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/design-system" element={<DesignSystemLayout />}>
        <Route index element={<Overview />} />
        <Route path="logo" element={<LogoPage />} />
        <Route path="colors" element={<ColorsPage />} />
        <Route path="typography" element={<TypographyPage />} />
        <Route path="spacing" element={<SpacingPage />} />
        <Route path="radius-shadow" element={<RadiusShadowPage />} />
        <Route path="icons" element={<IconsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="patterns" element={<PatternsPage />} />
        <Route path="voice" element={<VoicePage />} />
      </Route>
    </Routes>
  )
}
