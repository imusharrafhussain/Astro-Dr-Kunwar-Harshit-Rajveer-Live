import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import KundliMatchingPage from './pages/KundliMatchingPage'
import JanamKundliPage from './pages/JanamKundliPage'
import VastuConsultationPage from './pages/VastuConsultationPage'
import PalmistryPage from './pages/PalmistryPage'
import FaceReadingPage from './pages/FaceReadingPage'
import BookingPage from './pages/BookingPage'
import ReportsPage from './pages/ReportsPage'
import ReportOrderPage from './pages/ReportOrderPage'
import BlogPage from './pages/BlogPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

import { AuthProvider } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HoroscopePage from './pages/HoroscopePage'
import PanchangPage from './pages/PanchangPage'
import NumerologyPage from './pages/NumerologyPage'

import AIAstrologersPage from './pages/AIAstrologersPage'
import LearningPage from './pages/LearningPage'
import MandirPage from './pages/MandirPage'
import MartPage from './pages/MartPage'
import SuryaPujaPage from './pages/SuryaPujaPage'
import ChandraPujaPage from './pages/pujas/ChandraPujaPage';
import MangalPujaPage from './pages/pujas/MangalPujaPage';
import BudhPujaPage from './pages/pujas/BudhPujaPage';
import GuruPujaPage from './pages/pujas/GuruPujaPage';
import ShukraPujaPage from './pages/pujas/ShukraPujaPage';
import ShaniPujaPage from './pages/pujas/ShaniPujaPage';
import RahuPujaPage from './pages/pujas/RahuPujaPage';
import KetuPujaPage from './pages/pujas/KetuPujaPage';
import NavgrahaShantiPujaPage from './pages/pujas/NavgrahaShantiPujaPage';
import MeshPujaPage from './pages/pujas/MeshPujaPage';
import VrishabhPujaPage from './pages/pujas/VrishabhPujaPage';
import MithunPujaPage from './pages/pujas/MithunPujaPage';
import KarkPujaPage from './pages/pujas/KarkPujaPage';
import SinghPujaPage from './pages/pujas/SinghPujaPage';
import KanyaPujaPage from './pages/pujas/KanyaPujaPage';
import TulaPujaPage from './pages/pujas/TulaPujaPage';
import VrishchikPujaPage from './pages/pujas/VrishchikPujaPage';
import DhanuPujaPage from './pages/pujas/DhanuPujaPage';
import MakarPujaPage from './pages/pujas/MakarPujaPage';
import KumbhPujaPage from './pages/pujas/KumbhPujaPage';
import MeenPujaPage from './pages/pujas/MeenPujaPage';
import LakshmiPraptiPujaPage from './pages/pujas/LakshmiPraptiPujaPage';
import LakshmiKuberaPujaPage from './pages/pujas/LakshmiKuberaPujaPage';
import GaneshPujaPage from './pages/pujas/GaneshPujaPage';
import BusinessGrowthPujaPage from './pages/pujas/BusinessGrowthPujaPage';
import CareerJobSuccessPujaPage from './pages/pujas/CareerJobSuccessPujaPage';
import DhanYogActivationPujaPage from './pages/pujas/DhanYogActivationPujaPage';
import FinancialStabilityPujaPage from './pages/pujas/FinancialStabilityPujaPage';
import VivahPujaPage from './pages/pujas/VivahPujaPage';
import LoveMarriagePujaPage from './pages/pujas/LoveMarriagePujaPage';
import RelationshipHealingPujaPage from './pages/pujas/RelationshipHealingPujaPage';
import CompatibilityPujaPage from './pages/pujas/CompatibilityPujaPage';
import BreakupRecoveryPujaPage from './pages/pujas/BreakupRecoveryPujaPage';
import DelayInMarriagePujaPage from './pages/pujas/DelayInMarriagePujaPage';
import MahamrityunjayaPujaPage from './pages/pujas/MahamrityunjayaPujaPage';
import HealthRecoveryPujaPage from './pages/pujas/HealthRecoveryPujaPage';
import NazarDoshRemovalPujaPage from './pages/pujas/NazarDoshRemovalPujaPage';
import ProtectionEnergyShieldPujaPage from './pages/pujas/ProtectionEnergyShieldPujaPage';
import NegativeEnergyRemovalPujaPage from './pages/pujas/NegativeEnergyRemovalPujaPage';
import KaalSarpDoshPujaPage from './pages/pujas/KaalSarpDoshPujaPage';
import PitraDoshPujaPage from './pages/pujas/PitraDoshPujaPage';
import MangalDoshPujaPage from './pages/pujas/MangalDoshPujaPage';
import ShaniDoshPujaPage from './pages/pujas/ShaniDoshPujaPage';
import GrahanDoshPujaPage from './pages/pujas/GrahanDoshPujaPage';
import VastuDoshPujaPage from './pages/pujas/VastuDoshPujaPage';
import DiwaliPujasPujaPage from './pages/pujas/DiwaliPujasPujaPage';
import GaneshChaturthiPujasPujaPage from './pages/pujas/GaneshChaturthiPujasPujaPage';
import NavratriDurgaPujasPujaPage from './pages/pujas/NavratriDurgaPujasPujaPage';
import MakarSankrantiPongalPujaPage from './pages/pujas/MakarSankrantiPongalPujaPage';
import ChhathPujaPage from './pages/pujas/ChhathPujaPage';
import MahaShivratriPujasPujaPage from './pages/pujas/MahaShivratriPujasPujaPage';
import SaraswatiPujaPage from './pages/pujas/SaraswatiPujaPage';
import KarwaChauthPujaPage from './pages/pujas/KarwaChauthPujaPage';
import './pages/pujas/PujaResponsiveOverrides.css'
import './ResponsiveFix.css'

import FloatingChatbot from './components/FloatingChatbot'

function App() {
    const { pathname } = useLocation()
    const standalonePujaRoutes = new Set([
    ])
    const isStandalonePuja = standalonePujaRoutes.has(pathname)

    return (
        <AuthProvider>
            {!isStandalonePuja && <Navbar />}
            {!isStandalonePuja && <FloatingChatbot />}
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/kundli-matching" element={<KundliMatchingPage />} />
                    <Route path="/services/janam-kundli" element={<JanamKundliPage />} />
                    <Route path="/services/vastu-consultation" element={<VastuConsultationPage />} />
                    <Route path="/services/palmistry" element={<PalmistryPage />} />
                    <Route path="/services/face-reading" element={<FaceReadingPage />} />
                    <Route path="/services/:slug" element={<ServiceDetailPage />} />
                    <Route path="/horoscope/:type" element={<HoroscopePage />} />
                    <Route path="/panchang" element={<PanchangPage />} />
                    <Route path="/numerology" element={<NumerologyPage />} />
                    <Route path="/ai-astrologers" element={<AIAstrologersPage />} />
                    <Route path="/learning" element={<LearningPage />} />
                    <Route path="/mandir" element={<MandirPage />} />
                    <Route path="/mart" element={<MartPage />} />
                    <Route path="/puja/surya-puja" element={<SuryaPujaPage />} />
              <Route path="/puja/chandra-puja" element={<ChandraPujaPage />} />
              <Route path="/puja/mangal-puja" element={<MangalPujaPage />} />
              <Route path="/puja/budh-puja" element={<BudhPujaPage />} />
              <Route path="/puja/guru-puja" element={<GuruPujaPage />} />
              <Route path="/puja/shukra-puja" element={<ShukraPujaPage />} />
              <Route path="/puja/shani-puja" element={<ShaniPujaPage />} />
              <Route path="/puja/rahu-puja" element={<RahuPujaPage />} />
              <Route path="/puja/ketu-puja" element={<KetuPujaPage />} />
              <Route path="/puja/navgraha-shanti-puja" element={<NavgrahaShantiPujaPage />} />
              <Route path="/puja/mesh-puja" element={<MeshPujaPage />} />
              <Route path="/puja/vrishabh-puja" element={<VrishabhPujaPage />} />
              <Route path="/puja/mithun-puja" element={<MithunPujaPage />} />
              <Route path="/puja/kark-puja" element={<KarkPujaPage />} />
              <Route path="/puja/singh-puja" element={<SinghPujaPage />} />
              <Route path="/puja/kanya-puja" element={<KanyaPujaPage />} />
              <Route path="/puja/tula-puja" element={<TulaPujaPage />} />
              <Route path="/puja/vrishchik-puja" element={<VrishchikPujaPage />} />
              <Route path="/puja/dhanu-puja" element={<DhanuPujaPage />} />
              <Route path="/puja/makar-puja" element={<MakarPujaPage />} />
              <Route path="/puja/kumbh-puja" element={<KumbhPujaPage />} />
              <Route path="/puja/meen-puja" element={<MeenPujaPage />} />
              <Route path="/puja/lakshmi-prapti-puja" element={<LakshmiPraptiPujaPage />} />
              <Route path="/puja/lakshmi-kubera-puja" element={<LakshmiKuberaPujaPage />} />
              <Route path="/puja/ganesh-puja" element={<GaneshPujaPage />} />
              <Route path="/puja/business-growth-puja" element={<BusinessGrowthPujaPage />} />
              <Route path="/puja/career-job-success-puja" element={<CareerJobSuccessPujaPage />} />
              <Route path="/puja/dhan-yog-activation-puja" element={<DhanYogActivationPujaPage />} />
              <Route path="/puja/financial-stability-puja" element={<FinancialStabilityPujaPage />} />
              <Route path="/puja/vivah-puja" element={<VivahPujaPage />} />
              <Route path="/puja/love-marriage-puja" element={<LoveMarriagePujaPage />} />
              <Route path="/puja/relationship-healing-puja" element={<RelationshipHealingPujaPage />} />
              <Route path="/puja/compatibility-puja" element={<CompatibilityPujaPage />} />
              <Route path="/puja/breakup-recovery-puja" element={<BreakupRecoveryPujaPage />} />
              <Route path="/puja/delay-in-marriage-puja" element={<DelayInMarriagePujaPage />} />
              <Route path="/puja/mahamrityunjaya-puja" element={<MahamrityunjayaPujaPage />} />
              <Route path="/puja/health-recovery-puja" element={<HealthRecoveryPujaPage />} />
              <Route path="/puja/nazar-dosh-removal-puja" element={<NazarDoshRemovalPujaPage />} />
              <Route path="/puja/protection-energy-shield-puja" element={<ProtectionEnergyShieldPujaPage />} />
              <Route path="/puja/negative-energy-removal-puja" element={<NegativeEnergyRemovalPujaPage />} />
              <Route path="/puja/kaal-sarp-dosh-puja" element={<KaalSarpDoshPujaPage />} />
              <Route path="/puja/pitra-dosh-puja" element={<PitraDoshPujaPage />} />
              <Route path="/puja/mangal-dosh-puja" element={<MangalDoshPujaPage />} />
              <Route path="/puja/shani-dosh-puja" element={<ShaniDoshPujaPage />} />
              <Route path="/puja/grahan-dosh-puja" element={<GrahanDoshPujaPage />} />
              <Route path="/puja/vastu-dosh-puja" element={<VastuDoshPujaPage />} />
              <Route path="/puja/diwali-pujas-puja" element={<DiwaliPujasPujaPage />} />
              <Route path="/puja/ganesh-chaturthi-pujas-puja" element={<GaneshChaturthiPujasPujaPage />} />
              <Route path="/puja/navratri-durga-pujas-puja" element={<NavratriDurgaPujasPujaPage />} />
              <Route path="/puja/makar-sankranti-pongal-puja" element={<MakarSankrantiPongalPujaPage />} />
              <Route path="/puja/chhath-puja" element={<ChhathPujaPage />} />
              <Route path="/puja/maha-shivratri-pujas-puja" element={<MahaShivratriPujasPujaPage />} />
              <Route path="/puja/saraswati-puja" element={<SaraswatiPujaPage />} />
              <Route path="/puja/karwa-chauth-puja" element={<KarwaChauthPujaPage />} />
                    <Route path="/book" element={<BookingPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/reports/order/:reportId" element={<ReportOrderPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            {!isStandalonePuja && <Footer />}
        </AuthProvider>
    )
}

export default App
