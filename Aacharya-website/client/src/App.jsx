import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'

import { AuthProvider } from './context/AuthContext'

import FloatingChatbot from './components/FloatingChatbot'

import ErrorBoundary from './components/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const KundliMatchingPage = lazy(() => import('./pages/KundliMatchingPage'))
const JanamKundliPage = lazy(() => import('./pages/JanamKundliPage'))
const VastuConsultationPage = lazy(() => import('./pages/VastuConsultationPage'))
const PalmistryPage = lazy(() => import('./pages/PalmistryPage'))
const FaceReadingPage = lazy(() => import('./pages/FaceReadingPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const ReportOrderPage = lazy(() => import('./pages/ReportOrderPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const HoroscopePage = lazy(() => import('./pages/HoroscopePage'))
const PanchangPage = lazy(() => import('./pages/PanchangPage'))
const NumerologyPage = lazy(() => import('./pages/NumerologyPage'))
const AIAstrologersPage = lazy(() => import('./pages/AIAstrologersPage'))
const LearningPage = lazy(() => import('./pages/LearningPage'))
const MandirPage = lazy(() => import('./pages/MandirPage'))
const MartPage = lazy(() => import('./pages/MartPage'))
const BookPujaPage = lazy(() => import('./pages/BookPujaPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))

// Puja Pages - Planet Pujas
const SuryaPujaPage = lazy(() => import('./pages/SuryaPujaPage'))
const ChandraPujaPage = lazy(() => import('./pages/pujas/ChandraPujaPage'))
const MangalPujaPage = lazy(() => import('./pages/pujas/MangalPujaPage'))
const BudhPujaPage = lazy(() => import('./pages/pujas/BudhPujaPage'))
const GuruPujaPage = lazy(() => import('./pages/pujas/GuruPujaPage'))
const ShukraPujaPage = lazy(() => import('./pages/pujas/ShukraPujaPage'))
const ShaniPujaPage = lazy(() => import('./pages/pujas/ShaniPujaPage'))
const RahuPujaPage = lazy(() => import('./pages/pujas/RahuPujaPage'))
const KetuPujaPage = lazy(() => import('./pages/pujas/KetuPujaPage'))
const NavgrahaShantiPujaPage = lazy(() => import('./pages/pujas/NavgrahaShantiPujaPage'))
// Puja Pages - Zodiac Pujas
const MeshPujaPage = lazy(() => import('./pages/pujas/MeshPujaPage'))
const VrishabhPujaPage = lazy(() => import('./pages/pujas/VrishabhPujaPage'))
const MithunPujaPage = lazy(() => import('./pages/pujas/MithunPujaPage'))
const KarkPujaPage = lazy(() => import('./pages/pujas/KarkPujaPage'))
const SinghPujaPage = lazy(() => import('./pages/pujas/SinghPujaPage'))
const KanyaPujaPage = lazy(() => import('./pages/pujas/KanyaPujaPage'))
const TulaPujaPage = lazy(() => import('./pages/pujas/TulaPujaPage'))
const VrishchikPujaPage = lazy(() => import('./pages/pujas/VrishchikPujaPage'))
const DhanuPujaPage = lazy(() => import('./pages/pujas/DhanuPujaPage'))
const MakarPujaPage = lazy(() => import('./pages/pujas/MakarPujaPage'))
const KumbhPujaPage = lazy(() => import('./pages/pujas/KumbhPujaPage'))
const MeenPujaPage = lazy(() => import('./pages/pujas/MeenPujaPage'))
// Puja Pages - Wealth Pujas
const LakshmiPraptiPujaPage = lazy(() => import('./pages/pujas/LakshmiPraptiPujaPage'))
const LakshmiKuberaPujaPage = lazy(() => import('./pages/pujas/LakshmiKuberaPujaPage'))
const GaneshPujaPage = lazy(() => import('./pages/pujas/GaneshPujaPage'))
const BusinessGrowthPujaPage = lazy(() => import('./pages/pujas/BusinessGrowthPujaPage'))
const CareerJobSuccessPujaPage = lazy(() => import('./pages/pujas/CareerJobSuccessPujaPage'))
const DhanYogActivationPujaPage = lazy(() => import('./pages/pujas/DhanYogActivationPujaPage'))
const FinancialStabilityPujaPage = lazy(() => import('./pages/pujas/FinancialStabilityPujaPage'))
// Puja Pages - Relationship Pujas
const VivahPujaPage = lazy(() => import('./pages/pujas/VivahPujaPage'))
const LoveMarriagePujaPage = lazy(() => import('./pages/pujas/LoveMarriagePujaPage'))
const RelationshipHealingPujaPage = lazy(() => import('./pages/pujas/RelationshipHealingPujaPage'))
const CompatibilityPujaPage = lazy(() => import('./pages/pujas/CompatibilityPujaPage'))
const BreakupRecoveryPujaPage = lazy(() => import('./pages/pujas/BreakupRecoveryPujaPage'))
const DelayInMarriagePujaPage = lazy(() => import('./pages/pujas/DelayInMarriagePujaPage'))
// Puja Pages - Health Pujas
const MahamrityunjayaPujaPage = lazy(() => import('./pages/pujas/MahamrityunjayaPujaPage'))
const HealthRecoveryPujaPage = lazy(() => import('./pages/pujas/HealthRecoveryPujaPage'))
const NazarDoshRemovalPujaPage = lazy(() => import('./pages/pujas/NazarDoshRemovalPujaPage'))
const ProtectionEnergyShieldPujaPage = lazy(() => import('./pages/pujas/ProtectionEnergyShieldPujaPage'))
const NegativeEnergyRemovalPujaPage = lazy(() => import('./pages/pujas/NegativeEnergyRemovalPujaPage'))
// Puja Pages - Dosha Pujas
const KaalSarpDoshPujaPage = lazy(() => import('./pages/pujas/KaalSarpDoshPujaPage'))
const PitraDoshPujaPage = lazy(() => import('./pages/pujas/PitraDoshPujaPage'))
const MangalDoshPujaPage = lazy(() => import('./pages/pujas/MangalDoshPujaPage'))
const ShaniDoshPujaPage = lazy(() => import('./pages/pujas/ShaniDoshPujaPage'))
const GrahanDoshPujaPage = lazy(() => import('./pages/pujas/GrahanDoshPujaPage'))
const VastuDoshPujaPage = lazy(() => import('./pages/pujas/VastuDoshPujaPage'))
// Puja Pages - Festival Pujas
const DiwaliPujasPujaPage = lazy(() => import('./pages/pujas/DiwaliPujasPujaPage'))
const GaneshChaturthiPujasPujaPage = lazy(() => import('./pages/pujas/GaneshChaturthiPujasPujaPage'))
const NavratriDurgaPujasPujaPage = lazy(() => import('./pages/pujas/NavratriDurgaPujasPujaPage'))
const MakarSankrantiPongalPujaPage = lazy(() => import('./pages/pujas/MakarSankrantiPongalPujaPage'))
const ChhathPujaPage = lazy(() => import('./pages/pujas/ChhathPujaPage'))
const MahaShivratriPujasPujaPage = lazy(() => import('./pages/pujas/MahaShivratriPujasPujaPage'))
const SaraswatiPujaPage = lazy(() => import('./pages/pujas/SaraswatiPujaPage'))
const KarwaChauthPujaPage = lazy(() => import('./pages/pujas/KarwaChauthPujaPage'))

function App() {
    useEffect(() => {
        // Track unique visitor: use localStorage so the same browser
        // counts as 1 visitor regardless of how many times they visit.
        const STORAGE_KEY = 'ahVisitorId';
        let visitorId = localStorage.getItem(STORAGE_KEY);
        if (!visitorId) {
            // First time ever on this browser — generate a unique ID and track
            visitorId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
            localStorage.setItem(STORAGE_KEY, visitorId);
            let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            API_BASE = API_BASE.replace(/\/$/, '');
            if (!API_BASE.endsWith('/api')) API_BASE += '/api';
            fetch(`${API_BASE}/analytics/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'visitor' })
            }).catch(console.error);
        }
        // If visitorId already exists → user has been here before → do NOT count again
    }, []);

    return (
        <AuthProvider>
            <ScrollToTop />
            <Navbar />
            <FloatingChatbot />
            <main>
                <ErrorBoundary>
                    <Suspense fallback={null}>
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
                        <Route path="/book-puja" element={<BookPujaPage />} />
                        {/* Puja Pages - Planet Pujas */}
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
                        {/* Puja Pages - Zodiac Pujas */}
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
                        {/* Puja Pages - Wealth Pujas */}
                        <Route path="/puja/lakshmi-prapti-puja" element={<LakshmiPraptiPujaPage />} />
                        <Route path="/puja/lakshmi-kubera-puja" element={<LakshmiKuberaPujaPage />} />
                        <Route path="/puja/ganesh-puja" element={<GaneshPujaPage />} />
                        <Route path="/puja/business-growth-puja" element={<BusinessGrowthPujaPage />} />
                        <Route path="/puja/career-job-success-puja" element={<CareerJobSuccessPujaPage />} />
                        <Route path="/puja/dhan-yog-activation-puja" element={<DhanYogActivationPujaPage />} />
                        <Route path="/puja/financial-stability-puja" element={<FinancialStabilityPujaPage />} />
                        {/* Puja Pages - Relationship Pujas */}
                        <Route path="/puja/vivah-puja" element={<VivahPujaPage />} />
                        <Route path="/puja/love-marriage-puja" element={<LoveMarriagePujaPage />} />
                        <Route path="/puja/relationship-healing-puja" element={<RelationshipHealingPujaPage />} />
                        <Route path="/puja/compatibility-puja" element={<CompatibilityPujaPage />} />
                        <Route path="/puja/breakup-recovery-puja" element={<BreakupRecoveryPujaPage />} />
                        <Route path="/puja/delay-in-marriage-puja" element={<DelayInMarriagePujaPage />} />
                        {/* Puja Pages - Health Pujas */}
                        <Route path="/puja/mahamrityunjaya-puja" element={<MahamrityunjayaPujaPage />} />
                        <Route path="/puja/health-recovery-puja" element={<HealthRecoveryPujaPage />} />
                        <Route path="/puja/nazar-dosh-removal-puja" element={<NazarDoshRemovalPujaPage />} />
                        <Route path="/puja/protection-energy-shield-puja" element={<ProtectionEnergyShieldPujaPage />} />
                        <Route path="/puja/negative-energy-removal-puja" element={<NegativeEnergyRemovalPujaPage />} />
                        {/* Puja Pages - Dosha Pujas */}
                        <Route path="/puja/kaal-sarp-dosh-puja" element={<KaalSarpDoshPujaPage />} />
                        <Route path="/puja/pitra-dosh-puja" element={<PitraDoshPujaPage />} />
                        <Route path="/puja/mangal-dosh-puja" element={<MangalDoshPujaPage />} />
                        <Route path="/puja/shani-dosh-puja" element={<ShaniDoshPujaPage />} />
                        <Route path="/puja/grahan-dosh-puja" element={<GrahanDoshPujaPage />} />
                        <Route path="/puja/vastu-dosh-puja" element={<VastuDoshPujaPage />} />
                        {/* Puja Pages - Festival Pujas */}
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
                        <Route path="/thank-you" element={<ThankYouPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>

            <Footer />
        </AuthProvider>
    )
}

export default App
