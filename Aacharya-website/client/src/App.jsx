import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import { AuthProvider } from './context/AuthContext'

import FloatingChatbot from './components/FloatingChatbot'

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

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <FloatingChatbot />
            <main>
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
                </Suspense>
            </main>

            <Footer />
        </AuthProvider>
    )
}

export default App
