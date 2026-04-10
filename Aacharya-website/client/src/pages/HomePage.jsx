import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield, FiCheck, FiStar } from 'react-icons/fi'
import CobeGlobe from '../components/ui/CobeGlobe'
import harshitHeroImg from '../assets/harshit_hero.png'
import ajaiBhambiImg from '../assets/ajai_bhambi.png'
import deepakKapoorImg from '../assets/deepak_kapoor.png'
import gdVashistImg from '../assets/gd_vashist.png'
import hemantBaruaImg from '../assets/hemant_barua.png'
import induPrakashImg from '../assets/indu_prakash.png'
import knRaoImg from '../assets/kn_rao.png'
import premSharmaImg from '../assets/prem_sharma.png'
import sandeepKocharImg from '../assets/sandeep_kochar.png'
import sanjayJumaaniImg from '../assets/sanjay_jumaani.png'
import sohiniShastriImg from '../assets/sohini_shastri.png'
import './HomePage.css'

export default function HomePage() {
    const heroProofFaces = [ajaiBhambiImg, deepakKapoorImg, gdVashistImg, hemantBaruaImg, induPrakashImg]

    const proofItems = [
        { image: ajaiBhambiImg, caption: 'With Industry CEOs at Global Leadership Summit' },
        { image: deepakKapoorImg, caption: 'Invited Speaker at National Governance Forum' },
        { image: gdVashistImg, caption: 'Awarded Best Astrologer 2023 (Public Recognition)' },
        { image: hemantBaruaImg, caption: 'Private Strategy Session with Startup Founders' },
        { image: induPrakashImg, caption: 'VIP Consultation Circle for Policy Advisors' },
        { image: knRaoImg, caption: 'Mentoring Next-Gen Business Leaders' },
        { image: premSharmaImg, caption: 'Exclusive Wealth Guidance Roundtable' },
        { image: sandeepKocharImg, caption: 'Invited Address at Entrepreneurship Conclave' },
        { image: sanjayJumaaniImg, caption: 'Featured Guest at Premium Investor Event' },
        { image: sohiniShastriImg, caption: 'High-Profile Consultation Panel Appearance' },
    ]

    const popularServices = [
        {
            title: 'Career & Business',
            subtitle: 'Growth, promotions & major decisions',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            badge: '🔥 Most Booked',
        },
        {
            title: 'Love & Relationships',
            subtitle: 'Marriage, compatibility & conflicts',
            image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80',
            badge: '❤️ High Demand',
        },
        {
            title: 'Wealth & Finance',
            subtitle: 'Investments, income & financial stability',
            image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
            badge: '💰 Top Choice',
        },
        {
            title: 'Kundli Analysis',
            subtitle: 'Detailed life predictions & guidance',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Kundli Matching',
            subtitle: 'Compatibility & marriage timing',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Problems & Remedies',
            subtitle: 'Dosha, delays & life obstacles',
            image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Foreign Opportunities',
            subtitle: 'Travel, job & settlement abroad',
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Spiritual Guidance',
            subtitle: 'Inner peace & life direction',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        },
    ]

    const videoProofItems = [
        {
            image: ajaiBhambiImg,
            title: 'Event Stage Highlights',
            subtitle: 'SPIRITUAL GROWTH SERIES',
        },
        {
            image: premSharmaImg,
            title: 'VIP Strategy Discussion',
            subtitle: 'EXCLUSIVE INTERVIEW',
        },
        {
            image: sohiniShastriImg,
            title: 'Panel Session Insights',
            subtitle: 'SPECIAL EPISODE',
        },
        {
            image: deepakKapoorImg,
            title: 'Leadership Forum Clip',
            subtitle: 'PUBLIC TALK FEATURE',
        },
        {
            image: sandeepKocharImg,
            title: 'Investor Roundtable',
            subtitle: 'PODCAST MOMENTS',
        },
    ]

    const focusFeatures = [
        'Career & Business',
        'LOVE & RELATIONSHIPS',
        'MARRIAGE & KUNDLI MATCHING',
        'WEALTH & FINANCE',
        'KUNDLI / BIRTH CHART ANALYSIS',
        'PROBLEMS & REMEDIES',
        'FOREIGN TRAVEL & Opportunities',
        'SPIRITUAL & LIFE GUIDANCE',
        'CHILD & FAMILY',
        'PROPERTY & ASSETS',
        'MUHURAT (TIMING SERVICES)',
        'NUMEROLOGY & NAME CORRECTION',
        'HEALTH & WELL-BEING',
    ]

    const [focusStartIndex, setFocusStartIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setFocusStartIndex((prev) => (prev + 2) % focusFeatures.length)
        }, 1000)

        return () => clearInterval(timer)
    }, [focusFeatures.length])

    const visibleFocusFeatures = Array.from({ length: 2 }, (_, i) =>
        focusFeatures[(focusStartIndex + i) % focusFeatures.length]
    )

    return (
        <div className="home-page">
            {/* ── 1. Hero Section ── */}
            <section className="hero-section">
                <div className="hero-container hero-container--full">
                    <div className="hero-content">
                        <div className="hero-badge animate-in">
                            <span aria-hidden="true">🔱</span> India&apos;s Most Trusted Vedic Astrologers
                        </div>
                        <h1 className="hero-solid-title animate-in" style={{ animationDelay: '0.1s' }}>
                            Unlock Your <span className="text-gradient">Cosmic Path</span>
                        </h1>
                        <div className="hero-focus-block animate-in" style={{ animationDelay: '0.15s' }}>
                            <span className="hero-focus-label">Focus:</span>
                            <div className="hero-focus-line" aria-label="Key focus areas">
                                {visibleFocusFeatures.map((feature) => (
                                    <span key={`${focusStartIndex}-${feature}`} className="hero-focus-item">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="hero-message animate-in" style={{ animationDelay: '0.2s' }}>
                            <p className="hero-message-lead">
                                India&apos;s Most Trusted Vedic Astrologer for Life &amp; Business Decisions
                            </p>
                            <p className="hero-message-body">
                                Gain clarity on your career, relationships &amp; future with precise astrology
                                insights.
                            </p>
                        </div>
                        <p className="hero-authority animate-in" style={{ animationDelay: '0.24s' }}>
                            Trusted by 500+ Business Leaders, Celebrities & Government Officials
                        </p>
                        <div className="hero-proof-faces animate-in" style={{ animationDelay: '0.28s' }}>
                            {heroProofFaces.map((face, idx) => (
                                <img key={idx} src={face} alt="" className="hero-proof-face" />
                            ))}
                        </div>
                        <div className="hero-actions animate-in" style={{ animationDelay: '0.3s' }}>
                            <Link to="/book" className="btn btn-primary">
                                Get Your Reading <FiArrowRight />
                            </Link>
                            <Link to="/reports" className="btn btn-secondary">
                                View Sample Report
                            </Link>
                        </div>
                        <p className="hero-note animate-in" style={{ animationDelay: '0.4s' }}>
                            <FiStar className="text-gold" /> No birth time? We can help rectify it.
                        </p>
                    </div>

                    <div className="hero-right-visual animate-in" style={{ animationDelay: '0.5s' }}>
                        <img
                            src={harshitHeroImg}
                            alt="Harshit Rajveer"
                            className="hero-right-image"
                            draggable={false}
                        />
                    </div>
                </div>
            </section>

            {/* ── 2. Social Proof Wall ── */}
            <section className="authority-wall-section">
                <div className="container">
                    <div className="authority-top-row">
                        <h2 className="section-title authority-title">Authority & Social Proof</h2>
                    </div>
                    <div className="authority-featured">
                        <div className="authority-featured-image-wrap">
                            <img src={harshitHeroImg} alt="Featured authority moment" className="authority-featured-image" />
                        </div>
                        <div className="authority-featured-content">
                            <h3>A Trusted Advisor to High-Impact Decision Makers</h3>
                            <p>
                                From boardrooms to public stages, Dr. Harshit provides strategic Vedic guidance
                                to leaders handling high-stakes decisions in business, governance, and personal growth.
                            </p>
                            <ul className="authority-checklist">
                                <li><FiCheck className="text-gold" /> Strategic consultations for entrepreneurs and CXOs</li>
                                <li><FiCheck className="text-gold" /> Invited speaker at premium leadership events</li>
                                <li><FiCheck className="text-gold" /> Recognized for practical, action-focused guidance</li>
                            </ul>
                        </div>
                    </div>

                    <div className="proof-grid">
                        {proofItems.map((item, idx) => (
                            <div className="proof-item" key={idx}>
                                <img src={item.image} alt={item.caption} className="proof-image" />
                                <p className="proof-caption">{item.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. Featured Moments ── */}
            <section className="featured-moments-section">
                <div className="container">
                    <h2 className="section-title">Featured Moments</h2>

                    <div className="featured-story-row">
                        <img src={deepakKapoorImg} alt="Trusted by top entrepreneurs" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Trusted by India’s Top Entrepreneurs</h3>
                            <p>
                                Guided founders and investors on expansion timing, partnerships, and key financial decisions
                                through practical Vedic intelligence.
                            </p>
                        </div>
                    </div>

                    <div className="featured-story-row reverse">
                        <img src={sandeepKocharImg} alt="Government and public platform presence" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Invited on Public and Policy Platforms</h3>
                            <p>
                                Invited to share predictive frameworks and remedial insights in forums where clarity,
                                trust, and responsibility matter most.
                            </p>
                        </div>
                    </div>

                    <div className="featured-story-row">
                        <img src={knRaoImg} alt="Personalized guidance stories" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Personalized Guidance with Measurable Outcomes</h3>
                            <p>
                                Every consultation is tailored to individual timelines, helping clients convert uncertainty
                                into structured action plans.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Media & Awards ── */}
            <section className="media-awards-section">
                <div className="container">
                    <h2 className="section-title">Media & Awards</h2>
                    <div className="media-logo-row">
                        <div className="media-logo">Business Times</div>
                        <div className="media-logo">National TV</div>
                        <div className="media-logo">Leadership Summit</div>
                        <div className="media-logo">Astrology Awards</div>
                        <div className="media-logo">Entrepreneur Forum</div>
                    </div>
                </div>
            </section>

            {/* ── 5. Popular Astrology Services ── */}
            <section className="exclusivity-section">
                <div className="container">
                    <h2 className="section-title">Popular Astrology Services</h2>
                    <div className="services-grid">
                        {popularServices.map((service) => (
                            <article
                                key={service.title}
                                className="service-card"
                                style={{ backgroundImage: `url(${service.image})` }}
                            >
                                {service.badge && <span className="service-badge">{service.badge}</span>}
                                <div className="service-overlay" />
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.subtitle}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. Video Proof ── */}
            <section className="video-proof-section">
                <div className="container">
                    <h2 className="section-title video-proof-title">
                        Explore our <span>podcast</span>
                    </h2>
                    <div className="video-proof-grid">
                        {videoProofItems.map((item, idx) => (
                            <div className="video-proof-card" key={`${item.title}-${idx}`}>
                                <img src={item.image} alt={`${item.title} thumbnail`} className="video-proof-thumb" />
                                <div className="video-proof-watch">◉ WATCH NOW</div>
                                <div className="video-proof-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                    <button type="button" className="video-proof-btn">Watch Episode</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Legacy Section Restored: Moving Globe + Insights ── */}
            <section className="preview-section">
                <div className="container">
                    <div className="preview-layout">
                        <div className="preview-content">
                            <h2 className="text-left">Crystal Clear Insights</h2>
                            <p>Most astrology reports are confusing. Ours are designed for clarity.</p>
                            <ul className="benefits-list">
                                <li><FiCheck className="text-gold" /> <strong>Plain English:</strong> No complex jargon without explanation.</li>
                                <li><FiCheck className="text-gold" /> <strong>Actionable Remedies:</strong> Simple rituals and gemstones.</li>
                                <li><FiCheck className="text-gold" /> <strong>5-Year Forecast:</strong> Know what's coming next.</li>
                            </ul>
                            <Link to="/reports" className="btn btn-primary">
                                See Detailed Features
                            </Link>
                        </div>
                        <div className="preview-visual preview-globe">
                            <CobeGlobe />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. Pricing ── */}
            <section className="pricing-section">
                <div className="container">
                    <h2 className="pricing-title-top section-title section-title--pricing">Simple Pricing</h2>
                    <div className="pricing-grid">
                        <div className="pricing-card glass-panel">
                            <h3>Basic Report</h3>
                            <div className="price">₹499</div>
                            <ul className="features-list">
                                <li><FiCheck /> Birth Chart Analysis</li>
                                <li><FiCheck /> Personality Insights</li>
                                <li><FiCheck /> Basic Remedies</li>
                            </ul>
                            <Link to="/book" className="btn btn-secondary width-full">Choose Basic</Link>
                        </div>
                        <div className="pricing-card glass-panel popular">
                            <div className="popular-tag">Most Popular</div>
                            <h3>Premium Guidance</h3>
                            <div className="price">₹999</div>
                            <ul className="features-list">
                                <li><FiCheck /> <strong>Everything in Basic</strong></li>
                                <li><FiCheck /> 5-Year Life Predictions</li>
                                <li><FiCheck /> Career & Love Analysis</li>
                                <li><FiCheck /> Detailed Gemstone Report</li>
                                <li><FiCheck /> Ask 3 Specific Questions</li>
                            </ul>
                            <Link to="/book" className="btn btn-primary width-full">Get Premium</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. Final CTA ── */}
            <section className="final-cta-section">
                <div className="container text-center">
                    <h2 className="cta-title">Start Your Cosmic Journey</h2>
                    <p className="cta-subtitle">
                        Don't leave your destiny to chance. Get the guidance you need today.
                    </p>
                    <Link to="/book" className="btn btn-primary btn-large">
                        Get Your Reading Now
                    </Link>
                    <p className="cta-guarantee">
                        <FiShield size={14} /> 100% Satisfaction Guarantee
                    </p>
                </div>
            </section>
        </div>
    )
}
