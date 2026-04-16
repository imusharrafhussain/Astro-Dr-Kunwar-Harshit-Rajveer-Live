import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiPhone, FiVideo, FiUser } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import megaKundliMatching from '../../assets/mega_kundli_matching.png'
import megaJanamKundli from '../../assets/mega_janam_kundli.png'
import megaVastuConsultation from '../../assets/mega_vastu_consultation.png'
import megaPalmistry from '../../assets/mega_palmistry.png'
import megaFaceReading from '../../assets/mega_face_reading.png'
import megaHoroscopeDaily from '../../assets/mega_horoscope_daily.png'
import megaHoroscopeWeekly from '../../assets/mega_horoscope_weekly.png'
import megaHoroscopeMonthly from '../../assets/mega_horoscope_monthly.png'
import megaHoroscopeYearly from '../../assets/mega_horoscope_yearly.png'
import megaHoroscopeZodiac from '../../assets/mega_horoscope_zodiac.png'
import './Navbar.css'

import { useAuth } from '../../context/AuthContext'
import ComingSoonModal from '../ui/ComingSoonModal'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showComingSoon, setShowComingSoon] = useState(false)
    const [isServicesOpen, setIsServicesOpen] = useState(false)
    const servicesButtonRef = useRef(null)
    const location = useLocation()
    const { user, logout } = useAuth() || {}; // Handle potential null context if used outside provider (though unlikely here)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const openServicesDropdown = () => {
            setIsServicesOpen(true)
            requestAnimationFrame(() => servicesButtonRef.current?.focus())
        }

        window.addEventListener('open-services-dropdown', openServicesDropdown)
        return () => window.removeEventListener('open-services-dropdown', openServicesDropdown)
    }, [])

    useEffect(() => {
        setIsServicesOpen(false)
    }, [location.pathname, location.search])

    const servicesMegaItems = [
        {
            to: '/services/kundli-matching',
            title: 'Kundli Matching',
            description: 'Detailed horoscope matching for marriage to ensure harmony and compatibility between partners.',
            image: megaKundliMatching,
        },
        {
            to: '/services/janam-kundli',
            title: 'Janam Kundli',
            description: 'Complete birth chart analysis to understand your personality, life path, and future possibilities.',
            image: megaJanamKundli,
        },
        {
            to: '/services/vastu-consultation',
            title: 'Vastu Consultation',
            description: 'Optimize your living and workspace with ancient science of architecture for health, wealth, and prosperity.',
            image: megaVastuConsultation,
        },
        {
            to: '/services/palmistry',
            title: 'Palmistry',
            description: 'Uncover your destiny through the lines of your hands. A unique insight into your character and future.',
            image: megaPalmistry,
        },
        {
            to: '/services/face-reading',
            title: 'Face Reading',
            description: 'Analyze facial features to determine character, fate, and potential life outcomes.',
            image: megaFaceReading,
        },
    ]

    const horoscopeMegaItems = [
        {
            to: '/horoscope/daily',
            title: 'Daily Horoscope',
            description: 'Your celestial guidance for today—plan your day with the help of the stars.',
            image: megaHoroscopeDaily,
        },
        {
            to: '/horoscope/weekly',
            title: 'Weekly Horoscope',
            description: 'Insights for the week ahead—know when to act and when to pause.',
            image: megaHoroscopeWeekly,
        },
        {
            to: '/horoscope/monthly',
            title: 'Monthly Horoscope',
            description: 'Your month at a glance—key dates and planetary movements affecting your sign.',
            image: megaHoroscopeMonthly,
        },
        {
            to: '/horoscope/yearly',
            title: 'Yearly Horoscope',
            description: 'A transformation-focused overview covering career, finance, health, and relationships.',
            image: megaHoroscopeYearly,
        },
        {
            to: '/horoscope/zodiac-signs',
            title: 'Zodiac Signs',
            description: 'Unlock the mysteries of the 12 signs—traits, compatibility, and secrets.',
            image: megaHoroscopeZodiac,
        },
    ]

    return (
        <>
        <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
            {/* Top Bar: White - Brand & Actions */}
            <div className="header-top">
                <div className="header-top-content header-layout-grid" style={{ padding: '0 5px' }}>
                    <div className="brand grid-left">
                        <Link to="/" className="brand-name" style={{ textDecoration: 'none' }}>
                            Dr Kunwar Harshit Rajveer
                        </Link>
                    </div>

                    {/* Center Navigation Items */}
                    <nav className="top-nav-items grid-center" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1vw, 1.5rem)' }}>
                        <div
                            className={`nav-dropdown-container ${isServicesOpen ? 'is-open' : ''}`}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <button
                                ref={servicesButtonRef}
                                type="button"
                                className="nav-item nav-mega-trigger"
                                aria-expanded={isServicesOpen}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onClick={() => setIsServicesOpen((prev) => !prev)}
                            >
                                Services <FiChevronDown />
                            </button>
                            <div className="nav-dropdown-menu">
                                <div className="nav-mega-grid nav-mega-grid--services">
                                    {servicesMegaItems.map((item) => (
                                        <Link key={item.to} to={item.to} className="nav-mega-item">
                                            <div className="nav-mega-img-wrap">
                                                <img src={item.image} alt={item.title} className="nav-mega-img" loading="lazy" decoding="async" />
                                            </div>
                                            <div className="nav-mega-text">
                                                <div className="nav-mega-title">{item.title}</div>
                                                <div className="nav-mega-desc">{item.description}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="nav-dropdown-container">
                            <button type="button" className="nav-item nav-mega-trigger">
                                Horoscope <FiChevronDown />
                            </button>
                            <div className="nav-dropdown-menu">
                                <div className="nav-mega-grid nav-mega-grid--horoscope">
                                    {horoscopeMegaItems.map((item) => (
                                        <Link key={item.to} to={item.to} className="nav-mega-item">
                                            <div className="nav-mega-img-wrap">
                                                <img src={item.image} alt={item.title} className="nav-mega-img" loading="lazy" decoding="async" />
                                            </div>
                                            <div className="nav-mega-text">
                                                <div className="nav-mega-title">{item.title}</div>
                                                <div className="nav-mega-desc">{item.description}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link to="/panchang" className="nav-item">Daily Panchang</Link>
                        <Link to="/numerology" className="nav-item">Numerology</Link>
                        <Link to="/reports" className="nav-item">Reports</Link>
                        <Link to="/blog" className="nav-item">Blog</Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="header-actions grid-right">
                        <div className="header-buttons" style={{ display: 'flex', gap: 'clamp(0.4rem, 0.6vw, 0.8rem)' }}>
                            <button className="btn-pill" onClick={() => setShowComingSoon(true)}><FiPhone /> Talk to AstroHarshit Ji</button>
                            <button className="btn-pill" onClick={() => setShowComingSoon(true)}><FiVideo /> Get Live Consultation</button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Maroon - Main Navigation */}
            <div className={`header-bottom ${isOpen ? 'active' : ''}`}>
                <nav className="main-nav header-layout-grid" style={{ padding: '0 5px', width: '100%' }}>
                    {/* Left Side */}
                    <div className="bottom-nav-left grid-left align-left-anchor">
                        <NavLink to="/" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}><FiUser className="home-icon" /> Home</NavLink>
                    </div>

                    {/* Center Navigation */}
                    <div className="bottom-nav-center grid-center align-center-anchor">
                        <NavLink to="/learning" className="main-link" onClick={() => setIsOpen(false)}>Digital Learning</NavLink>
                        <NavLink to="/mandir" className="main-link" onClick={() => setIsOpen(false)}>Digital Mandir</NavLink>
                        <NavLink to="/mart" className="main-link" onClick={() => setIsOpen(false)}>Digital Mart</NavLink>
                        <NavLink to="/about" className="main-link" onClick={() => setIsOpen(false)}>About Us</NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="bottom-nav-right grid-right align-right-anchor" style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <NavLink to="/book-puja" className="book-puja-btn btn-type1" onClick={() => setIsOpen(false)}>
                            <span className="btn-txt">Book Puja</span>
                        </NavLink>
                        <NavLink to="/contact" className="main-link" onClick={() => setIsOpen(false)}>Contact Us</NavLink>
                        {user ? (
                            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.9)' }}>
                                <span style={{ fontWeight: 'bold' }}>Hello, {user.name}</span>
                                <button onClick={logout} className="btn-pill outline" style={{ color: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(255, 255, 255, 0.5)' }}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <button className="btn-pill outline" style={{ color: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(255, 255, 255, 0.5)' }}><FiUser /> Login</button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>

        {/* Mobile/Tablet bottom navigation */}
        <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
            <NavLink to="/" end className={({ isActive }) => `mobile-tab-link ${isActive ? 'active' : ''}`}>
                Home
            </NavLink>
            <NavLink to="/learning" className={({ isActive }) => `mobile-tab-link ${isActive ? 'active' : ''}`}>
                Digital Learning
            </NavLink>
            <NavLink to="/mandir" className={({ isActive }) => `mobile-tab-link ${isActive ? 'active' : ''}`}>
                Digital Mandir
            </NavLink>
            <NavLink to="/mart" className={({ isActive }) => `mobile-tab-link ${isActive ? 'active' : ''}`}>
                Digital Mart
            </NavLink>
            <NavLink to="/book-puja" className={({ isActive }) => `mobile-tab-link ${isActive ? 'active' : ''}`}>
                Book Puja
            </NavLink>
        </nav>

        <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </>
    )
}
