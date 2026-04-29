import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiPhone, FiVideo, FiUser, FiSearch, FiChevronRight } from 'react-icons/fi'
import { GiSunrise, GiMoon, GiMaceHead, GiBookAura, GiScrollUnfurled, GiLotusFlower, GiCrowDive, GiCobra, GiSnake, GiCircleSparks, GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces, GiBarefoot, GiCoins, GiElephantHead, GiTargetPrize, GiGoldNuggets, GiScales, GiLoveMystery, GiLovers, GiHeartBeats, GiScrollQuill, GiHealing, GiHourglass, GiTrident, GiEvilEyes, GiShield, GiVortex, GiSnakeSpiral, GiCandleLight, GiFireBowl, GiRaven, GiEclipse, GiHouse, GiCandleFlame, GiElephant, GiSun, GiSunRadiations, GiMusicalScore } from 'react-icons/gi'
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
import planetPujaBg from '../../assets/planet_puja_bg.webp'
import zodiacPujaBg from '../../assets/zodiac_puja_bg.webp'
import wealthPujaBg from '../../assets/wealth_puja_bg.webp'
import relationshipPujaBg from '../../assets/relationship_puja_bg.webp'
import healthPujaBg from '../../assets/health_puja_bg.webp'
import doshaPujaBg from '../../assets/dosha_puja_bg.webp'
import specialPujaBg from '../../assets/special_puja_bg.webp'
import allPujaBg from '../../assets/all_puja_bg.webp'
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
    
    // Puja Mega Dropdown State
    const [isPujaOpen, setIsPujaOpen] = useState(false)
    const [pujaCategory, setPujaCategory] = useState("all")
    const [pujaSearch, setPujaSearch] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Preload all puja background images on mount for instant category switching
    useEffect(() => {
        const bgImages = [allPujaBg, planetPujaBg, zodiacPujaBg, wealthPujaBg, relationshipPujaBg, healthPujaBg, doshaPujaBg, specialPujaBg]
        bgImages.forEach(src => {
            const img = new Image()
            img.src = src
        })
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

    const pujaCategories = [
        { id: 'all', name: 'All Categories' },
        { id: 'planet', name: 'Planet (Graha) Pujas' },
        { id: 'zodiac', name: 'Zodiac (Rashi) Pujas' },
        { id: 'wealth', name: 'Wealth & Career Pujas' },
        { id: 'relationship', name: 'Relationship & Marriage Pujas' },
        { id: 'health', name: 'Health & Protection Pujas' },
        { id: 'dosha', name: 'Dosha Nivaran' },
        { id: 'special', name: 'Special / Festival Pujas' }
    ];

    const mockPujas = [
        // Planet (Graha) Pujas
        { id: 1, title: "Surya (Sun) Puja", category: "planet", slug: "surya-puja", icon: <GiSunrise />, desc: "Gain success and vitality." },
        { id: 2, title: "Chandra (Moon) Puja", category: "planet", slug: "chandra-puja", icon: <GiMoon />, desc: "For emotional balance." },
        { id: 3, title: "Mangal (Mars) Puja", category: "planet", slug: "mangal-puja", icon: <GiMaceHead />, desc: "Enhance courage and strength." },
        { id: 4, title: "Budh (Mercury) Puja", category: "planet", slug: "budh-puja", icon: <GiBookAura />, desc: "Boost intellect and speech." },
        { id: 5, title: "Guru (Jupiter) Puja", category: "planet", slug: "guru-puja", icon: <GiScrollUnfurled />, desc: "Attract wisdom and luck." },
        { id: 6, title: "Shukra (Venus) Puja", category: "planet", slug: "shukra-puja", icon: <GiLotusFlower />, desc: "For luxury and romance." },
        { id: 7, title: "Shani (Saturn) Puja", category: "planet", slug: "shani-puja", icon: <GiCrowDive />, desc: "Overcome hurdles and karma." },
        { id: 8, title: "Rahu Puja", category: "planet", slug: "rahu-puja", icon: <GiCobra />, desc: "Pacify sudden disruptions." },
        { id: 9, title: "Ketu Puja", category: "planet", slug: "ketu-puja", icon: <GiSnake />, desc: "For spiritual growth." },
        { id: 10, title: "Navgraha Shanti Puja", category: "planet", slug: "navgraha-shanti-puja", icon: <GiCircleSparks />, desc: "Pacify the nine planets." },

        // Zodiac (Rashi) Pujas
        { id: 11, title: "Mesh (Aries) Puja", category: "zodiac", slug: "mesh-puja", icon: <GiAries />, desc: "Aries alignment correction." },
        { id: 12, title: "Vrishabh (Taurus) Puja", category: "zodiac", slug: "vrishabh-puja", icon: <GiTaurus />, desc: "Taurus specific rituals." },
        { id: 13, title: "Mithun (Gemini) Puja", category: "zodiac", slug: "mithun-puja", icon: <GiGemini />, desc: "Gemini specific rituals." },
        { id: 14, title: "Kark (Cancer) Puja", category: "zodiac", slug: "kark-puja", icon: <GiCancer />, desc: "Cancer harmony puja." },
        { id: 15, title: "Singh (Leo) Puja", category: "zodiac", slug: "singh-puja", icon: <GiLeo />, desc: "Leo specific rituals." },
        { id: 16, title: "Kanya (Virgo) Puja", category: "zodiac", slug: "kanya-puja", icon: <GiVirgo />, desc: "Virgo specific alignment." },
        { id: 17, title: "Tula (Libra) Puja", category: "zodiac", slug: "tula-puja", icon: <GiLibra />, desc: "Libra specific harmony." },
        { id: 18, title: "Vrishchik (Scorpio) Puja", category: "zodiac", slug: "vrishchik-puja", icon: <GiScorpio />, desc: "Scorpio specific rituals." },
        { id: 19, title: "Dhanu (Sagittarius) Puja", category: "zodiac", slug: "dhanu-puja", icon: <GiSagittarius />, desc: "Sagittarius alignment." },
        { id: 20, title: "Makar (Capricorn) Puja", category: "zodiac", slug: "makar-puja", icon: <GiCapricorn />, desc: "Capricorn specific harmony." },
        { id: 21, title: "Kumbh (Aquarius) Puja", category: "zodiac", slug: "kumbh-puja", icon: <GiAquarius />, desc: "Aquarius specific rituals." },
        { id: 22, title: "Meen (Pisces) Puja", category: "zodiac", slug: "meen-puja", icon: <GiPisces />, desc: "Pisces alignment correction." },

        // Wealth & Career Pujas
        { id: 23, title: "Lakshmi Prapti Puja", category: "wealth", slug: "lakshmi-prapti-puja", icon: <GiBarefoot />, desc: "Attract unending prosperity." },
        { id: 24, title: "Lakshmi Kubera Puja", category: "wealth", slug: "lakshmi-kubera-puja", icon: <GiCoins />, desc: "Magnetize material wealth." },
        { id: 25, title: "Ganesh Puja", category: "wealth", slug: "ganesh-puja", icon: <GiElephantHead />, desc: "For success & obstacle removal." },
        { id: 26, title: "Business Growth Puja", category: "wealth", slug: "business-growth-puja", icon: <GiTargetPrize />, desc: "Accelerate business success." },
        { id: 27, title: "Career / Job Success Puja", category: "wealth", slug: "career-job-success-puja", icon: <GiTargetPrize />, desc: "Achieve professional milestones." },
        { id: 28, title: "Dhan Yog Activation Puja", category: "wealth", slug: "dhan-yog-activation-puja", icon: <GiGoldNuggets />, desc: "Activate wealth combinations." },
        { id: 29, title: "Financial Stability Puja", category: "wealth", slug: "financial-stability-puja", icon: <GiScales />, desc: "Ensure steady income flow." },

        // Relationship & Marriage Pujas
        { id: 30, title: "Vivah (Marriage) Puja", category: "relationship", slug: "vivah-puja", icon: <GiLoveMystery />, desc: "Blessings for a holy union." },
        { id: 31, title: "Love Marriage Puja", category: "relationship", slug: "love-marriage-puja", icon: <GiLovers />, desc: "Remove marriage obstacles." },
        { id: 32, title: "Relationship Healing Puja", category: "relationship", slug: "relationship-healing-puja", icon: <GiHeartBeats />, desc: "Restore emotional bonds." },
        { id: 33, title: "Compatibility (Kundli Milan) Puja", category: "relationship", slug: "compatibility-puja", icon: <GiScrollQuill />, desc: "Harmonize astrological charts." },
        { id: 34, title: "Breakup Recovery Puja", category: "relationship", slug: "breakup-recovery-puja", icon: <GiHealing />, desc: "Inner peace and moving on." },
        { id: 35, title: "Delay in Marriage Puja", category: "relationship", slug: "delay-in-marriage-puja", icon: <GiHourglass />, desc: "Speed up the marriage process." },

        // Health & Protection Pujas
        { id: 36, title: "Mahamrityunjaya Puja", category: "health", slug: "mahamrityunjaya-puja", icon: <GiTrident />, desc: "For ultimate health & longevity." },
        { id: 37, title: "Health Recovery Puja", category: "health", slug: "health-recovery-puja", icon: <GiHealing />, desc: "Speedy recovery from illness." },
        { id: 38, title: "Nazar Dosh (Evil Eye) Removal Puja", category: "health", slug: "nazar-dosh-removal-puja", icon: <GiEvilEyes />, desc: "Cleanse negative influences." },
        { id: 39, title: "Protection / Energy Shield Puja", category: "health", slug: "protection-energy-shield-puja", icon: <GiShield />, desc: "Secure aura from harm." },
        { id: 40, title: "Negative Energy Removal Puja", category: "health", slug: "negative-energy-removal-puja", icon: <GiVortex />, desc: "Purify mind, body & surroundings." },

        // Dosha Nivaran
        { id: 41, title: "Kaal Sarp Dosh Puja", category: "dosha", slug: "kaal-sarp-dosh-puja", icon: <GiSnakeSpiral />, desc: "Remove Kaal Sarp obstacles." },
        { id: 42, title: "Pitra Dosh Puja", category: "dosha", slug: "pitra-dosh-puja", icon: <GiCandleLight />, desc: "Blessings from ancestors." },
        { id: 43, title: "Mangal Dosh Puja", category: "dosha", slug: "mangal-dosh-puja", icon: <GiFireBowl />, desc: "Nullify Mars negative effects." },
        { id: 44, title: "Shani Dosh Puja", category: "dosha", slug: "shani-dosh-puja", icon: <GiRaven />, desc: "Resolve Saturn karmic delays." },
        { id: 45, title: "Grahan Dosh Puja", category: "dosha", slug: "grahan-dosh-puja", icon: <GiEclipse />, desc: "Cure eclipse-born flaws." },
        { id: 46, title: "Vastu Dosh Puja", category: "dosha", slug: "vastu-dosh-puja", icon: <GiHouse />, desc: "Correct home energy imbalances." },
        
        // Special / Festival Pujas
        { id: 47, title: "Diwali Pujas", category: "special", slug: "diwali-pujas-puja", icon: <GiCandleFlame />, desc: "Prosperity & light celebrations." },
        { id: 48, title: "Ganesh Chaturthi Pujas", category: "special", slug: "ganesh-chaturthi-pujas-puja", icon: <GiElephant />, desc: "Welcoming Lord Ganesha." },
        { id: 49, title: "Navratri & Durga Pujas", category: "special", slug: "navratri-durga-pujas-puja", icon: <GiTrident />, desc: "Awaken divine feminine power." },
        { id: 50, title: "Makar Sankranti / Pongal", category: "special", slug: "makar-sankranti-pongal-puja", icon: <GiSun />, desc: "Harvest blessings and growth." },
        { id: 51, title: "Chhath Puja", category: "special", slug: "chhath-puja", icon: <GiSunRadiations />, desc: "Honoring the Sun God." },
        { id: 52, title: "Maha Shivratri Pujas", category: "special", slug: "maha-shivratri-pujas-puja", icon: <GiTrident />, desc: "Night of Lord Shiva." },
        { id: 53, title: "Saraswati Puja", category: "special", slug: "saraswati-puja", icon: <GiMusicalScore />, desc: "Wisdom, arts, & learning." },
        { id: 54, title: "Karwa Chauth Puja", category: "special", slug: "karwa-chauth-puja", icon: <GiMoon />, desc: "For longevity of spouse." }
    ];

    const filteredPujas = mockPujas.filter(puja => {
        const matchCat = pujaCategory === 'all' || puja.category === pujaCategory;
        const matchSearch = puja.title.toLowerCase().includes(pujaSearch.toLowerCase()) || puja.desc.toLowerCase().includes(pujaSearch.toLowerCase());
        return matchCat && matchSearch;
    });

    const getDynamicBgStyle = () => {
        let bgImage = null;
        switch (pujaCategory) {
            case 'all': bgImage = allPujaBg; break;
            case 'planet': bgImage = planetPujaBg; break;
            case 'zodiac': bgImage = zodiacPujaBg; break;
            case 'wealth': bgImage = wealthPujaBg; break;
            case 'relationship': bgImage = relationshipPujaBg; break;
            case 'health': bgImage = healthPujaBg; break;
            case 'dosha': bgImage = doshaPujaBg; break;
            case 'special': bgImage = specialPujaBg; break;
            default: break;
        }

        if (bgImage) {
            return {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 0.4s ease-in-out'
            };
        }
        return { transition: 'background-image 0.4s ease-in-out' };
    };

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
                                className={`nav-item nav-mega-trigger ${location.pathname.startsWith('/services') ? 'active' : ''}`}
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
                            <button type="button" className={`nav-item nav-mega-trigger ${location.pathname.startsWith('/horoscope') ? 'active' : ''}`}>
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

                        <NavLink to="/panchang" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Daily Panchang</NavLink>
                        <NavLink to="/numerology" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Numerology</NavLink>
                        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Reports</NavLink>
                        <NavLink to="/blog" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Blog</NavLink>
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
                        <NavLink to="/learning" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Digital Learning</NavLink>
                        <NavLink to="/mandir" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Digital Mandir</NavLink>
                        <NavLink to="/mart" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Digital Mart</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>About Us</NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="bottom-nav-right grid-right align-right-anchor" style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <div 
                            className={`nav-dropdown-container ${isPujaOpen ? 'is-open' : ''}`}
                            onMouseLeave={() => setIsPujaOpen(false)}
                            style={{ height: 'auto' }}
                        >
                            <button
                                type="button"
                                className="book-puja-btn btn-type1"
                                onClick={() => setIsPujaOpen((prev) => !prev)}
                                onMouseEnter={() => setIsPujaOpen(true)}
                            >
                                <span className="btn-txt">Book Puja</span>
                            </button>
                            <div className="nav-dropdown-menu pu-dropdown-override" onClick={(e) => e.stopPropagation()}>
                                <div className="puja-mega-dropdown" style={getDynamicBgStyle()}>
                                    <div className="puja-mega-sidebar">
                                        {pujaCategories.map(cat => (
                                            <button 
                                                key={cat.id}
                                                className={`puja-mega-cat-btn ${pujaCategory === cat.id ? 'active' : ''}`}
                                                onClick={() => setPujaCategory(cat.id)}
                                            >
                                                {cat.name}
                                                {pujaCategory === cat.id && <FiChevronRight style={{ color: 'var(--gold-primary)' }} />}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="puja-mega-content">
                                        <div className="puja-mega-search">
                                            <FiSearch color="#aaa" />
                                            <input 
                                                type="text" 
                                                placeholder="Search Pujas..." 
                                                value={pujaSearch}
                                                onChange={(e) => setPujaSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="puja-mega-grid-items">
                                            {filteredPujas.map(puja => (
                                                <Link 
                                                    to={`/puja/${puja.slug}`} 
                                                    key={puja.id} 
                                                    className="puja-mega-item-card"
                                                    onClick={() => { setIsPujaOpen(false); setIsOpen(false); }}
                                                >
                                                    <div className="puja-mega-item-icon">{puja.icon}</div>
                                                    <div className="puja-mega-item-details">
                                                        <h4>{puja.title}</h4>
                                                        <p>{puja.desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            {filteredPujas.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>No Pujas Found.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NavLink to="/contact" className={({ isActive }) => `main-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
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
            <button
                className={`mobile-tab-link ${isPujaOpen ? 'active' : ''}`}
                onClick={() => {
                    setIsOpen(true)
                    setIsPujaOpen((prev) => !prev)
                }}
            >
                Book Puja
            </button>
        </nav>

        <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </>
    )
}
