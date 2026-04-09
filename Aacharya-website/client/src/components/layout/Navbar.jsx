import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiPhone, FiVideo, FiUser } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import './Navbar.css'

import { useAuth } from '../../context/AuthContext'
import ComingSoonModal from '../ui/ComingSoonModal'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showComingSoon, setShowComingSoon] = useState(false)
    const { user, logout } = useAuth() || {}; // Handle potential null context if used outside provider (though unlikely here)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const servicesMegaItems = [
        {
            to: '/services/kundli-matching',
            title: 'Kundli Matching',
            description: 'Detailed horoscope matching for marriage to ensure harmony and compatibility between partners.',
            image: 'https://loremflickr.com/800/400/couple,wedding',
        },
        {
            to: '/services/janam-kundli',
            title: 'Janam Kundli',
            description: 'Complete birth chart analysis to understand your personality, life path, and future possibilities.',
            image: 'https://loremflickr.com/800/400/astrology,chart',
        },
        {
            to: '/services/vastu-consultation',
            title: 'Vastu Consultation',
            description: 'Optimize your living and workspace with ancient science of architecture for health, wealth, and prosperity.',
            image: 'https://loremflickr.com/800/400/home,architecture',
        },
        {
            to: '/services/palmistry',
            title: 'Palmistry',
            description: 'Uncover your destiny through the lines of your hands. A unique insight into your character and future.',
            image: 'https://loremflickr.com/800/400/hand,palm',
        },
        {
            to: '/services/face-reading',
            title: 'Face Reading',
            description: 'Analyze facial features to determine character, fate, and potential life outcomes.',
            image: 'https://loremflickr.com/800/400/face,portrait',
        },
    ]

    const horoscopeMegaItems = [
        {
            to: '/horoscope/daily',
            title: 'Daily Horoscope',
            description: 'Your celestial guidance for today—plan your day with the help of the stars.',
            image: 'https://loremflickr.com/800/400/constellation,stars',
        },
        {
            to: '/horoscope/weekly',
            title: 'Weekly Horoscope',
            description: 'Insights for the week ahead—know when to act and when to pause.',
            image: 'https://loremflickr.com/800/400/weekly,calendar,stars',
        },
        {
            to: '/horoscope/monthly',
            title: 'Monthly Horoscope',
            description: 'Your month at a glance—key dates and planetary movements affecting your sign.',
            image: 'https://loremflickr.com/800/400/moon,night,sky',
        },
        {
            to: '/horoscope/yearly',
            title: 'Yearly Horoscope',
            description: 'A transformation-focused overview covering career, finance, health, and relationships.',
            image: 'https://loremflickr.com/800/400/year,sky,stars',
        },
        {
            to: '/horoscope/zodiac-signs',
            title: 'Zodiac Signs',
            description: 'Unlock the mysteries of the 12 signs—traits, compatibility, and secrets.',
            image: 'https://loremflickr.com/800/400/zodiac,astrology,signs',
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
                        <div className="nav-dropdown-container">
                            <button type="button" className="nav-item nav-mega-trigger">
                                Services <FiChevronDown />
                            </button>
                            <div className="nav-dropdown-menu">
                                <div className="nav-mega-grid nav-mega-grid--services">
                                    {servicesMegaItems.map((item) => (
                                        <Link key={item.to} to={item.to} className="nav-mega-item">
                                            <div className="nav-mega-img-wrap">
                                                <img src={item.image} alt={item.title} className="nav-mega-img" />
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
                                                <img src={item.image} alt={item.title} className="nav-mega-img" />
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
