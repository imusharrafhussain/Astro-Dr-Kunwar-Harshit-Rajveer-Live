import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { FiArrowRight, FiSearch, FiClock, FiTag, FiCheckCircle, FiStar, FiCalendar, FiChevronDown } from 'react-icons/fi'
import './ServicesPage.css'

// Image Imports
import palmistryHero from '../assets/serbg1.png'
import liveConsultationImg from '../assets/card_live_consultation_updated.webp'
import faceReadingImg from '../assets/card_face_reading_updated.webp'
import palmistryImg from '../assets/card_palmistry_updated.webp'
import numerologyImg from '../assets/numerology_course.webp'
import vastuImg from '../assets/vastuconsultation.webp'
import kundliImg from '../assets/janamkundali.webp'
import matchingImg from '../assets/kundlimatching report.webp'
import pujaImg from '../assets/all_puja_bg.webp'

const categories = [
    { id: 'all', label: 'All Services', icon: '✨' },
    { id: 'astrology', label: 'Astrology', icon: '🔮' },
    { id: 'numerology', label: 'Numerology', icon: '🔢' },
    { id: 'vastu', label: 'Vastu Shastra', icon: '🏠' },
    { id: 'special', label: 'Specialized', icon: '🔱' }
]

const servicesData = [
    {
        id: '1',
        slug: 'janam-kundli',
        title: 'Vedic Kundli Reading',
        category: 'astrology',
        shortDesc: 'Deep dive into your birth chart to unlock your destiny, strengths, and life purpose.',
        longDesc: 'Our comprehensive Kundli analysis provides precise insights into your personality, career path, health, and major life events based on ancient Vedic principles.',
        image: kundliImg,
        price: '₹2,100',
        duration: '60 min',
        featured: true,
        tags: ['Birth Chart', 'Life Path', 'Remedies']
    },
    {
        id: '2',
        slug: 'kundli-matching',
        title: 'Love & Marriage Matching',
        category: 'astrology',
        shortDesc: 'Ensure cosmic harmony with detailed Guna Milan and relationship compatibility analysis.',
        longDesc: 'Beyond simple score matching, we analyze emotional stability, financial growth, and family harmony between partners to ensure a blissful marital journey.',
        image: matchingImg,
        price: '₹2,500',
        duration: '75 min',
        featured: true,
        tags: ['Relationships', 'Compatibility', 'Marriage']
    },
    {
        id: '3',
        slug: 'vastu-consultation',
        title: 'Strategic Vastu Audit',
        category: 'vastu',
        shortDesc: 'Harmonize your living or workspace to attract wealth, peace, and prosperity.',
        longDesc: 'Expert Vastu analysis for homes and offices focusing on energy flow, spatial geometry, and practical corrections without structural demolition.',
        image: vastuImg,
        price: '₹5,000',
        duration: '90 min',
        featured: true,
        tags: ['Home', 'Office', 'Prosperity']
    },
    {
        id: '4',
        slug: 'numerology',
        title: 'Advanced Numerology',
        category: 'numerology',
        shortDesc: 'Discover the power of numbers in your name and birth date to align with success.',
        longDesc: 'Scientific name correction and number analysis to remove obstacles and enhance your personal vibration for better opportunities and growth.',
        image: numerologyImg,
        price: '₹1,500',
        duration: '45 min',
        featured: false,
        tags: ['Name Correction', 'Lucky Numbers']
    },
    {
        id: '5',
        slug: 'palmistry',
        title: 'Palmistry Insight',
        category: 'special',
        shortDesc: 'Your destiny is in your hands. Accurate reading of lines and mounts for life guidance.',
        longDesc: 'Detailed hand analysis revealing your character traits, health indicators, and future possibilities written in the map of your palms.',
        image: palmistryImg,
        price: '₹1,800',
        duration: '45 min',
        featured: false,
        tags: ['Hand Reading', 'Fate Line']
    },
    {
        id: '6',
        slug: 'face-reading',
        title: 'Expert Face Reading',
        category: 'special',
        shortDesc: 'Unlock the secrets of your personality and future through Samudrik Shastra.',
        longDesc: 'Ancient face reading techniques to decode your inner nature, hidden talents, and current life phase through facial features and expressions.',
        image: faceReadingImg,
        price: '₹1,800',
        duration: '30 min',
        featured: false,
        tags: ['Samudrik Shastra', 'Personality']
    },
    {
        id: '7',
        slug: 'live-consultation',
        title: '1-on-1 VIP Consultation',
        category: 'special',
        shortDesc: 'Private session with Dr. Kunwar Harshit Rajveer for high-stakes life decisions.',
        longDesc: 'Personalized premium session for entrepreneurs and leaders needing precise timing and strategic guidance for business, wealth, and family.',
        image: liveConsultationImg,
        price: '₹11,000',
        duration: '45 min',
        featured: true,
        tags: ['VIP', 'Strategic', 'Confidential']
    },
    {
        id: '8',
        slug: 'puja-guidance',
        title: 'Remedial Puja Guidance',
        category: 'special',
        shortDesc: 'Personalized spiritual remedies and ritual procedures for planetary peace.',
        longDesc: 'Scientific guidance on Vedic pujas, mantra chanting, and specific rituals tailored to resolve your current planetary afflictions or doshas.',
        image: pujaImg,
        price: '₹1,500',
        duration: '30 min',
        featured: false,
        tags: ['Remedies', 'Mantras', 'Spiritual']
    }
]

const FloatingOrbs = () => (
    <div className="mystical-orbs">
        <motion.div className="orb orb-1" animate={{ y: [0, -40, 0], opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="orb orb-2" animate={{ y: [0, 50, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="orb orb-3" animate={{ x: [0, 30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
    </div>
)

const FloatingSymbols = () => {
    const symbols = [
        { sym: '♈', top: '15%', left: '10%' },
        { sym: '♌', top: '25%', left: '85%' },
        { sym: '🕉️', top: '75%', left: '15%' },
        { sym: '♐', top: '65%', left: '80%' },
        { sym: '♓', top: '45%', left: '90%' },
        { sym: '♊', top: '85%', left: '40%' },
    ]
    return (
        <div className="floating-symbols-container">
            {symbols.map((item, i) => (
                <motion.div
                    key={i}
                    className="floating-symbol"
                    style={{ top: item.top, left: item.left }}
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 20, -20, 0]
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {item.sym}
                </motion.div>
            ))}
        </div>
    )
}

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const { scrollY } = useScroll()

    const y1 = useTransform(scrollY, [0, 1000], [0, 300])
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0])

    // Mouse Parallax Effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    const rotateX = useTransform(springY, [-500, 500], [8, -8])
    const rotateY = useTransform(springX, [-500, 500], [-8, 8])

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const moveX = clientX - window.innerWidth / 2
        const moveY = clientY - window.innerHeight / 2
        mouseX.set(moveX)
        mouseY.set(moveY)
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    }

    const fadeUpItem = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const filteredServices = useMemo(() => {
        return servicesData.filter(s => {
            const matchesCat = activeCategory === 'all' || s.category === activeCategory
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCat && matchesSearch
        })
    }, [activeCategory, searchQuery])

    return (
        <div className="services-page-v3">
            {/* --- Hero Section --- */}
            <section className="services-hero-v3" onMouseMove={handleMouseMove}>
                <div className="hero-bg-overlay-v3" />
                <motion.div
                    className="hero-bg-image-v3"
                    style={{ backgroundImage: `url(${palmistryHero})`, y: y1 }}
                />
                <div className="hero-mandala-bg" />
                <div className="hero-mandala-inner" />
                <FloatingOrbs />
                <FloatingSymbols />

                <div className="container hero-content-v3">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="hero-text-wrap-v3"
                        style={{ opacity: opacityHero, rotateX, rotateY, transformPerspective: 1000 }}
                    >
                        <motion.span
                            variants={fadeUpItem}
                            className="hero-kicker-v3"
                        >
                            <FiStar className="kicker-icon" /> Divine Guidance & Vedic Wisdom
                        </motion.span>
                        <motion.h1 variants={fadeUpItem} className="hero-title-v3">
                            Sacred <span className="text-gradient-gold">Astrology</span> & <br />
                            Vedic <span className="text-gradient-gold">Solutions</span>
                        </motion.h1>
                        <motion.p variants={fadeUpItem} className="hero-description-v3">
                            Unlock the mysteries of your life path with India's most trusted
                            Vedic consultations. Precision-guided insights for career,
                            relationships, and prosperity.
                        </motion.p>

                        <motion.div
                            variants={fadeUpItem}
                            className="hero-search-bar-v3"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiSearch className="search-icon-v3" />
                            <input
                                type="text"
                                placeholder="Search for a service (e.g. Kundli, Vastu...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="scroll-indicator-wrap"
                >
                    <div className="mouse-icon">
                        <div className="mouse-wheel"></div>
                    </div>
                    <span>Explore</span>
                    <FiChevronDown className="scroll-arrow" />
                </motion.div>

                <div className="hero-bottom-gradient"></div>
            </section>

            {/* --- Filter Section --- */}
            <section className={`filter-section-v3 ${scrolled ? 'is-sticky' : ''}`}>
                <div className="container">
                    <div className="filter-wrapper-v3">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`cat-pill-v3 ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {activeCategory === cat.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="cat-pill-active-bg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="cat-icon-v3">{cat.icon}</span>
                                <span className="cat-label-v3">{cat.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Grid Section --- */}
            <section className="services-grid-section-v3">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="section-intro-v3"
                    >
                        <h2 className="section-title-v3">Explore Our Expert Consultations</h2>
                        <p className="section-subtitle-v3">Choose from our curated range of Vedic services designed to bring clarity and balance to your life.</p>
                    </motion.div>

                    <motion.div layout className="services-grid-v3">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((svc, index) => (
                                <motion.div
                                    key={svc.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    className={`service-card-v3 ${svc.featured ? 'is-featured' : ''}`}
                                    onHoverStart={() => setHoveredCard(svc.id)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                >
                                    <div className="card-image-wrap-v3">
                                        <motion.img
                                            src={svc.image}
                                            alt={svc.title}
                                            className="card-img-v3"
                                            loading="lazy"
                                            animate={{ scale: hoveredCard === svc.id ? 1.08 : 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                        <div className="card-overlay-v3" />
                                        {svc.featured && (
                                            <div className="featured-badge-v3">
                                                <FiStar className="spin-slow" /> Highly Requested
                                            </div>
                                        )}
                                        <div className="card-price-tag-v3">{svc.price}</div>
                                        <div className="card-shine-effect" />
                                    </div>

                                    <div className="card-body-v3">
                                        <div className="card-meta-v3">
                                            <span className="meta-item-v3"><FiClock /> {svc.duration}</span>
                                            <span className="meta-item-v3"><FiTag /> {svc.category}</span>
                                        </div>
                                        <h3 className="card-title-v3">{svc.title}</h3>
                                        <p className="card-desc-v3">{svc.shortDesc}</p>

                                        <div className="card-tags-v3">
                                            {svc.tags.map(t => <span key={t} className="card-tag-v3">#{t}</span>)}
                                        </div>

                                        <div className="card-footer-v3">
                                            <Link to={`/services/${svc.slug}`} className="btn-learn-v3">
                                                Discover Details <motion.span animate={{ x: hoveredCard === svc.id ? 5 : 0 }}><FiArrowRight /></motion.span>
                                            </Link>
                                            <Link to="/book" className="btn-book-sm-v3">
                                                <FiCalendar /> Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredServices.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="no-results-v3"
                        >
                            <div className="no-results-icon">🔭</div>
                            <h3>No sacred services found</h3>
                            <p>Try adjusting your search or filter categories to reveal your path.</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-reset-v3"
                                onClick={() => { setActiveCategory('all'); setSearchQuery('') }}
                            >
                                Reset All Filters
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="services-footer-cta-v3">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="cta-glass-box-v3"
                    >
                        <div className="cta-glow-bg"></div>
                        <div className="cta-content-v3">
                            <h2>Not sure which service is right for you?</h2>
                            <p>Our expert team can help you choose the most relevant consultation based on your current life challenges.</p>
                            <div className="cta-actions-v3">
                                <Link to="/contact" className="btn-primary-v3">Talk to an Expert</Link>
                                <a href="https://wa.me/917068883996?text=Hello%20Guruji" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-v3">WhatsApp Us</a>
                            </div>
                        </div>
                        <div className="cta-features-v3">
                            <motion.div whileHover={{ x: 10 }} className="cta-feat-item-v3">
                                <div className="feat-icon-wrap"><FiCheckCircle /></div>
                                <span>100% Confidentiality</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="cta-feat-item-v3">
                                <div className="feat-icon-wrap"><FiCheckCircle /></div>
                                <span>Certified Expert Astrologers</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="cta-feat-item-v3">
                                <div className="feat-icon-wrap"><FiCheckCircle /></div>
                                <span>Practical & Tested Remedies</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
