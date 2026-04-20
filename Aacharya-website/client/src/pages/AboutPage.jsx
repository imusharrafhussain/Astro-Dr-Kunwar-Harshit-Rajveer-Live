import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FiArrowRight, FiAward, FiBookOpen, FiHeart, FiStar,
    FiUsers, FiGlobe, FiShield, FiCheckCircle, FiZap,
    FiCalendar, FiX
} from 'react-icons/fi'
import useScrollReveal from '../hooks/useScrollReveal'
import harshitHeroImg from '../assets/harshitsirpodcast.webp'
import ishaDeolImg from '../assets/isha_deol.webp'
import bollywood1 from '../assets/bollywood1.webp'
import harshitsir1 from '../assets/harshitcard.webp'
import lovelife from '../assets/lovelife.webp'
import tusshar1 from '../assets/tusshar1.webp'
import career from '../assets/career.webp'
import spacevidUrl from '../assets/spacevid.compressed.mp4?url'
import health from '../assets/health.webp'
import education from '../assets/education.webp'
import './AboutPage.css'

/* ─── data ─── */
const timeline = [
    { title: 'Love', desc: 'Guidance to enhance relationships and attract the right partner.', image: lovelife },
    { title: 'Career', desc: 'Insights to help navigate professional paths and achieve success.', image: career },
    { title: 'Health', desc: 'Remedies to improve physical health and mental well-being effectively.', image: health },
    { title: 'Education', desc: 'Assistance in identifying strengths and achieving academic success effortlessly.', image: education },
]

/* Journey section background video — pick ONE:
   • Env (recommended for deploys): create `client/.env` with
     VITE_ABOUT_JOURNEY_VIDEO_URL=https://yoursite.com/path/video.mp4
   • Or host a file under `client/public/` (e.g. public/videos/journey.mp4) and use "/videos/journey.mp4"
   • Or replace the fallback string below */
const envJourneyVideo = (import.meta.env.VITE_ABOUT_JOURNEY_VIDEO_URL || '').trim()
const journeyBgVideo = /^(\/|https?:\/\/)/i.test(envJourneyVideo)
    ? envJourneyVideo
    : spacevidUrl

const expertise = [
    { icon: <FiStar />, title: 'Vedic Astrology', desc: 'Classical Jyotish using Parashari and Jaimini systems for precise life-path insights.', color: '#e8622a' },
    { icon: <FiBookOpen />, title: 'Numerology', desc: 'Pythagorean & Chaldean analysis to decode your destiny number and life path.', color: '#5D1916' },
    { icon: <FiHeart />, title: 'Vastu Shastra', desc: 'Energy optimisation for homes and offices to invite abundance and harmony.', color: '#D4AF37' },
    { icon: <FiAward />, title: 'Gemology', desc: 'Authentic Vedic gemstone prescriptions aligned with planetary remedies.', color: '#4a7c59' },
]

const stats = [
    { value: '15+', label: 'Years of Mastery', icon: <FiCalendar /> },
    { value: '35k+', label: 'Happy Clients Across The World', icon: <FiUsers /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <FiStar /> },
    { value: '177+', label: 'Countries Served', icon: <FiGlobe /> },
]

const heroTrustPills = [
    // { id: 'scripture', icon: <FiShield />, label: 'Scripture-Led Guidance' },
    // { id: 'years', icon: <FiCheckCircle />, label: '15+ Years of Practice' },
    // { id: 'global', icon: <FiGlobe />, label: 'Worldwide Consultations' },
]

const heroHighlights = [
    { value: 'Authentic', label: 'Classical Vedic methodology' },
    { value: 'Personal', label: 'Readings shaped around you' },
    { value: 'Actionable', label: 'Clarity you can use right away' },
]

const coreValues = [
    { icon: <FiCheckCircle />, title: 'Authenticity', desc: 'Rooted in classical Vedic texts — never generic, always personal.' },
    { icon: <FiHeart />, title: 'Compassion', desc: 'Every reading honours your unique story with empathy and care.' },
    { icon: <FiZap />, title: 'Precision', desc: 'Rigorous calculations backed by generations of scholarly tradition.' },
]

const servicesPopupItems = [
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

/* ─── Mosaic image items ─── */
const mosaicImages = [
    { cls: 'ap-mc--tl', src: bollywood1 },
    { cls: 'ap-mc--tr', src: harshitsir1 },
    { cls: 'ap-mc--bl', src: tusshar1 },
    { cls: 'ap-mc--br', src: ishaDeolImg },
]

function motionReduced() {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Parse stat strings like 15+, 35k+, 98%, 177+ for count-up */
function parseStatValue(raw) {
    let m = raw.match(/^(\d+)k\+$/i)
    if (m) return { target: parseInt(m[1], 10), fmt: (n) => `${n}k+` }
    m = raw.match(/^(\d+)\+$/)
    if (m) return { target: parseInt(m[1], 10), fmt: (n) => `${n}+` }
    m = raw.match(/^(\d+)%$/)
    if (m) return { target: parseInt(m[1], 10), fmt: (n) => `${n}%` }
    return null
}

function AnimatedStatValue({ raw, active, delayMs }) {
    const [text, setText] = useState(raw)

    useEffect(() => {
        const parsed = parseStatValue(raw)
        if (!active) return
        if (motionReduced() || !parsed) {
            setText(raw)
            return
        }
        setText(parsed.fmt(0))
        const id = window.setTimeout(() => {
            const dur = 1150
            const t0 = performance.now()
            const tick = (now) => {
                const p = Math.min(1, (now - t0) / dur)
                const eased = 1 - (1 - p) ** 3
                setText(parsed.fmt(Math.round(parsed.target * eased)))
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, delayMs)
        return () => clearTimeout(id)
    }, [active, raw, delayMs])

    return <span className="ap-stat-card__val-inner">{text}</span>
}

export default function AboutPage() {
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)

    const handleLearnMoreServices = () => {
        setIsServicesModalOpen(true)
    }

    /* ── scroll-reveal refs ── */
    const heroSection = useScrollReveal({ threshold: 0.08 })
    const mosaicSection = useScrollReveal({ threshold: 0.08 })
    const statsSection = useScrollReveal({ threshold: 0.1 })
    const introSection = useScrollReveal({ threshold: 0.1 })
    const expertiseSection = useScrollReveal({ threshold: 0.1 })
    const journeySection = useScrollReveal({ threshold: 0.1 })
    const ctaSection = useScrollReveal({ threshold: 0.1 })

    const journeyVideoRef = useRef(null)
    useEffect(() => {
        if (!journeySection.isVisible) return
        const v = journeyVideoRef.current
        if (!v) return
        const p = v.play()
        if (p !== undefined && typeof p.catch === 'function') p.catch(() => {})
    }, [journeySection.isVisible])

    useEffect(() => {
        if (!isServicesModalOpen) return undefined
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsServicesModalOpen(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isServicesModalOpen])

    return (
        <div className="about-page">

            {/* ════════════════════ HERO ════════════════════ */}
            <section
                className="ap-hero ap-hero--enhanced"
                aria-labelledby="ap-hero-h1"
                ref={heroSection.ref}
                onMouseMove={(e) => {
                    const el = e.currentTarget
                    const r = el.getBoundingClientRect()
                    el.style.setProperty('--ap-glow-x', `${((e.clientX - r.left) / r.width) * 100}%`)
                    el.style.setProperty('--ap-glow-y', `${((e.clientY - r.top) / r.height) * 100}%`)
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--ap-glow-x', '50%')
                    e.currentTarget.style.setProperty('--ap-glow-y', '42%')
                }}
            >
                <div className="ap-hero__pointer-glow" aria-hidden />
                <div className="ap-hero__mandala" aria-hidden />
                <div className="ap-blob ap-blob--orange" aria-hidden />
                <div className="ap-blob ap-blob--gold" aria-hidden />
                <div className="ap-blob ap-blob--maroon" aria-hidden />

                <div className="container ap-hero__inner">

                    {/* ── LEFT copy ── */}
                    <div className="ap-hero__copy">

                        <span
                            className={`ap-pill-badge sr-anim sr-anim--fade-up ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0s' }}
                        >
                            ✦ About Dr. Kunwar Harshit Rajveer
                        </span>

                        <h1
                            id="ap-hero-h1"
                            className={`ap-hero__title sr-anim sr-anim--fade-up ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.1s' }}
                        >
                            Dr. Kunwar Harshit<br />
                            <span className="ap-accent-text">Rajveer</span>
                        </h1>

                        <div
                            className={`ap-hero__leadline sr-anim sr-anim--fade-up ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.2s' }}
                        >
                            <span className="ap-accent-text">#1 Choice</span>
                            <span>For Astrology Guidance</span>
                        </div>

                        <p
                            className={`ap-hero__tagline sr-anim sr-anim--fade-blur ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.3s' }}
                        >
                            • Astro-Consultant for Leaders & Decision Makers <br />
                            • Vedic Life Consultant <br />
                            • Astro Coach & Life Strategist <br />
                            • Cosmic Intelligence Expert <br />
                            • Predictive Life Strategist <br />
                            • Personal Advisor to Business & Political Leaders
                        </p>

                        <div
                            className={`ap-hero__actions sr-anim sr-anim--fade-scale ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.5s' }}
                        >
                            <Link to="/book" className="ap-btn ap-btn--fire" id="ap-hero-start-btn">
                                Get Started <FiArrowRight />
                            </Link>
                            <Link to="/contact" className="ap-btn ap-btn--ghost">
                                Contact Us
                            </Link>
                        </div>

                        <div
                            className={`ap-hero__highlights sr-anim sr-anim--fade-up ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.58s' }}
                        >
                            {heroHighlights.map((item) => (
                                <div key={item.value} className="ap-hero__highlight">
                                    <strong>{item.value}</strong>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`ap-trust-row sr-anim sr-anim--fade-up ${heroSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.65s' }}
                        >
                            {heroTrustPills.map((pill) => (
                                <span key={pill.id} className="ap-trust-pill">
                                    {pill.icon}
                                    {pill.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT mosaic ── */}
                    <div
                        className="ap-hero__mosaic"
                        aria-hidden="true"
                        ref={mosaicSection.ref}
                    >
                        {mosaicImages.map(({ cls, src }, i) => (
                            <div
                                key={cls}
                                className={`ap-mc ${cls} sr-anim sr-anim--gallery ${mosaicSection.isVisible ? 'sr-anim--visible' : ''}`}
                                style={{ '--sr-delay': `${0.1 + i * 0.2}s` }}
                            >
                                <img src={src} alt="" loading="lazy" />
                            </div>
                        ))}

                        <div
                            className={`ap-float-bubble ap-float-bubble--tl sr-anim sr-anim--fade-up ${mosaicSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '0.9s' }}
                        >
                            <span className="ap-float-bubble__num">10k+</span>
                            <span className="ap-float-bubble__lbl">Clients Guided</span>
                        </div>

                        {/* <div
                            className={`ap-float-bubble ap-float-bubble--br sr-anim sr-anim--fade-up ${mosaicSection.isVisible ? 'sr-anim--visible' : ''}`}
                            style={{ '--sr-delay': '1.05s' }}
                        >
                            <span className="ap-float-bubble__icon">⭐</span>
                            <div>
                                <strong>4.9 / 5</strong>
                                <span>Avg Rating</span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="ap-hero__wave" aria-hidden>
                    {/* Static wave — must match .ap-stats top (#ffffff) to avoid seam */}
                    <svg
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        focusable="false"
                    >
                        {/* Gentle curve — keep y ≥ ~76 so the wave doesn’t bite into hero labels */}
                        <path
                            fill="#ffffff"
                            d="M0,82 C180,84 360,88 540,86 C720,84 900,80 1080,82 C1260,84 1350,82 1440,84 L1440,120 L0,120 Z"
                        />
                    </svg>
                </div>
            </section>

            {/* ════════════════════ STATS BAR ════════════════════ */}
            <section
                className={`ap-stats container sr-anim sr-anim--fade-up ${statsSection.isVisible ? 'sr-anim--visible' : ''}`}
                aria-label="Key statistics"
                ref={statsSection.ref}
            >
                {stats.map((s, i) => (
                    <article
                        key={s.label}
                        className={`ap-stat-card ${statsSection.isVisible ? 'ap-stat-card--revealed' : ''}`}
                        style={{ '--si': i }}
                    >
                        <span className="ap-stat-card__icon" aria-hidden>{s.icon}</span>
                        <span className="ap-stat-card__val">
                            <AnimatedStatValue
                                raw={s.value}
                                active={statsSection.isVisible}
                                delayMs={i * 100}
                            />
                        </span>
                        <span className="ap-stat-card__lbl">{s.label}</span>
                    </article>
                ))}
            </section>

            {/* ════════════════════ WHO WE ARE ════════════════════ */}
            <section
                className={`ap-intro sr-anim sr-anim--fade-up ${introSection.isVisible ? 'sr-anim--visible' : ''}`}
                aria-labelledby="ap-intro-h2"
                ref={introSection.ref}
            >
                <div className="container ap-intro__inner">

                    {/* Visual column */}
                    <div className="ap-intro__visual">
                        <div className="ap-portrait">
                            <div className="ap-portrait__halo" aria-hidden />
                            <div className="ap-portrait__body">
                                <img
                                    src={harshitHeroImg}
                                    alt="Dr. Kunwar Harshit Rajveer"
                                    className="ap-portrait__img"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Credential chips below portrait */}
                        <div className="ap-portrait__chips">
                            {['Celebrity Astrologer', '15+ Years', 'Vedic Scholar', 'Lal Kitab Specialist'].map(t => (
                                <span key={t} className="ap-portrait__chip">{t}</span>
                            ))}
                        </div>

                        {/* Core value mini cards */}
                        <div className="ap-value-cards">
                            {coreValues.map((v, i) => (
                                <div key={v.title} className="ap-value-card" style={{ '--vi': i }}>
                                    <div className="ap-value-card__icon">{v.icon}</div>
                                    <div>
                                        <strong>{v.title}</strong>
                                        <p>{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copy column */}
                    <div className="ap-intro__copy">
                        <span className="ap-eyebrow">✦ Who We Are</span>
                        <h2 id="ap-intro-h2" className="ap-section-title ap-intro__title">
                            Dedicated to <span className="ap-gold-gradient-text">Cosmic Truth</span>{' '}
                            <span className="ap-intro__ampersand">&amp;</span>{' '}
                            <span className="ap-intro__vedic-highlight">Vedic Science</span>
                        </h2>

                        <p className="ap-prose">
                        I, Dr. Kunwar Harshit Rajveer, walk a path illuminated by the universe itself. I attune myself to the silent language of the stars, decoding cosmic energies to guide souls toward alignment with their true purpose. My journey is not merely about providing answers, but about awakening the deeper truths that reside within every being—helping them rediscover their connection with the cosmos and their own inner light.
                        </p>
                        <p className="ap-prose">
                        I believe that every soul carries a unique cosmic blueprint, and through awareness and understanding, one can unlock their true potential. My journey is dedicated to illuminating that path—where destiny meets consciousness, and where inner clarity leads to outer transformation.
                        </p>

                        <blockquote className="ap-blockquote">
                            <span className="ap-blockquote__mark">"</span>
                            <p>
                                Every reading is rooted in authentic Vedic methodology — never automated
                                templates, always a personal dialogue with your celestial blueprint.
                            </p>
                        </blockquote>

                        <div className="ap-intro__cta-row">
                            <Link to="/book" className="ap-btn ap-btn--fire ap-btn--sm">
                                Book a Reading <FiArrowRight />
                            </Link>
                            <Link to="/services" className="ap-btn ap-btn--ghost ap-btn--sm">
                                Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════ EXPERTISE ════════════════════ */}
            <section
                className={`ap-expertise sr-anim sr-anim--fade-up ${expertiseSection.isVisible ? 'sr-anim--visible' : ''}`}
                aria-labelledby="ap-exp-h2"
                ref={expertiseSection.ref}
            >
                <div className="ap-expertise__ribbon" aria-hidden />
                <div className="container">
                    <div className="ap-section-header">
                        <span className="ap-eyebrow">✦ What We Offer</span>
                        <h2 id="ap-exp-h2" className="ap-section-title">
                            Areas of{' '}
                            <span className="ap-gold-gradient-text">Expertise</span>
                        </h2>
                        <p className="ap-section-sub">
                            Classical lineages, modern clarity — one integrated practice.
                        </p>
                    </div>

                    <div className="ap-exp-layout">
                        <div className="ap-exp-grid">
                            {expertise.map((e, i) => (
                                <article
                                    key={e.title}
                                    className="ap-exp-card"
                                    style={{ '--ei': i, '--ec': e.color }}
                                >
                                    <div className="ap-exp-card__glow" aria-hidden />
                                    <span className="ap-exp-card__index">{String(i + 1).padStart(2, '0')}</span>
                                    <div className="ap-exp-card__icon">{e.icon}</div>
                                    <h3 className="ap-exp-card__title">{e.title}</h3>
                                    <p className="ap-exp-card__desc">{e.desc}</p>
                                    <div className="ap-exp-card__bar" aria-hidden />
                                </article>
                            ))}
                        </div>
                        <div className="ap-exp-learnmore">
                            <button
                                type="button"
                                className="ap-exp-learnmore__btn"
                                onClick={handleLearnMoreServices}
                                aria-label="Learn more about services"
                            >
                                <FiArrowRight />
                            </button>
                            <span className="ap-exp-learnmore__text">explore our services</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════ JOURNEY ════════════════════ */}
            <section className="ap-journey" aria-labelledby="ap-journey-h2">
                <div className="ap-journey__video-bg" aria-hidden="true">
                    <video
                        ref={journeyVideoRef}
                        className="ap-journey__video"
                        src={journeyBgVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                </div>
                <div className="ap-journey__scrim" aria-hidden="true" />
                <div
                    className={`container ap-journey__inner sr-anim sr-anim--fade-up ${journeySection.isVisible ? 'sr-anim--visible' : ''}`}
                    ref={journeySection.ref}
                >
                    <div className="ap-section-header">
                        <span className="ap-eyebrow">✦ Our Story</span>
                        <h2 id="ap-journey-h2" className="ap-section-title">
                        Benefits<span className="ap-gold-gradient-text"></span>
                        </h2>
                        <p className="ap-section-sub">
                            Milestones along the path of learning and service.
                        </p>
                    </div>

                    <div className="ap-timeline">
                        <div className="ap-timeline__spine" aria-hidden />
                        {timeline.map((t, i) => (
                            <div
                                key={t.title}
                                className={`ap-tl-row ${i % 2 === 0 ? 'ap-tl-row--l' : 'ap-tl-row--r'}`}
                                style={{ '--ti': i }}
                            >
                                <div className="ap-tl-side ap-tl-side--media">
                                    <article className="ap-tl-card">
                                        <div
                                            className="ap-tl-card__frame"
                                            style={{ '--tl-image': `url(${t.image})` }}
                                        >
                                            <img
                                                className="ap-tl-card__img"
                                                src={t.image}
                                                alt={t.title}
                                                loading="lazy"
                                            />
                                        </div>
                                    </article>
                                </div>

                                <div className="ap-tl-row__dot" aria-hidden />

                                <div className="ap-tl-side ap-tl-side--content">
                                    <article className="ap-tl-copy">
                                        <h3 className="ap-tl-card__title">{t.title}</h3>
                                        <p className="ap-tl-card__desc">{t.desc}</p>
                                    </article>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════ CTA STRIP ════════════════════ */}
            <section
                className={`ap-cta sr-anim sr-anim--fade-up ${ctaSection.isVisible ? 'sr-anim--visible' : ''}`}
                aria-labelledby="ap-cta-h2"
                ref={ctaSection.ref}
            >
                <div className="ap-cta__stars" aria-hidden>
                    {[...Array(16)].map((_, i) => (
                        <span key={i} className="ap-cta__star" style={{ '--si': i }} />
                    ))}
                </div>
                <div className="container ap-cta__inner">
                    <div className="ap-cta__copy">
                        <span className="ap-eyebrow ap-eyebrow--light">✦ Begin Your Journey</span>
                        <h2 id="ap-cta-h2" className="ap-cta__title">
                            Begin Your Consultation Today
                        </h2>
                        <p className="ap-cta__sub">
                            Connect with a certified guide for a reading shaped by scripture — not software alone.
                        </p>
                    </div>
                    <div className="ap-cta__actions">
                        <Link to="/book" className="ap-btn ap-btn--gold" id="ap-cta-book-btn">
                            Book a Session <FiArrowRight />
                        </Link>
                        <Link to="/contact" className="ap-btn ap-btn--outline-white">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {isServicesModalOpen && (
                <div
                    className="ap-services-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Services list"
                    onClick={() => setIsServicesModalOpen(false)}
                >
                    <div className="ap-services-modal__backdrop" />
                    <div className="ap-services-modal__panel" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="ap-services-modal__close"
                            onClick={() => setIsServicesModalOpen(false)}
                            aria-label="Close services popup"
                        >
                            <FiX />
                        </button>
                        <h3 className="ap-services-modal__title">Explore Services</h3>
                        <p className="ap-services-modal__sub">Choose a service to continue.</p>
                        <div className="ap-services-modal__grid">
                            {servicesPopupItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="ap-services-modal__card"
                                    onClick={() => setIsServicesModalOpen(false)}
                                >
                                    <div className="ap-services-modal__img-wrap">
                                        <img src={item.image} alt={item.title} className="ap-services-modal__img" />
                                    </div>
                                    <div className="ap-services-modal__txt">
                                        <div className="ap-services-modal__card-title">{item.title}</div>
                                        <p className="ap-services-modal__card-desc">{item.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
