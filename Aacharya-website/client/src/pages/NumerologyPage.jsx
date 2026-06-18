import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import '../App.css';
import './NumerologyPage.css';
import destiny from '../assets/destiny_number.webp';
import lifePath from '../assets/life_path_number.webp';
import soulUrge from '../assets/soul_number.webp';
import personality from '../assets/personality_number.webp';
import birthday from '../assets/birthday_number.webp';
import maturity from '../assets/Maturity_number.webp';
import numerologyBg from '../assets/numerologyBg.webp';

/* ────────────────────────────────────────────────
   Data — each number gets a real Unsplash image
──────────────────────────────────────────────── */
const numerologyNumbers = [
    {
        num: '1',
        title: 'Life Path Number',
        icon: '☀️',
        imageUrl: lifePath,
        imageCaption: 'Your destined road',
        desc: 'The core of your personality. Derived from your date of birth, it reveals your innate traits, natural talents, and the road you are destined to walk. People with this as their primary number are natural leaders — driven, independent, and pioneering.',
    },
    {
        num: '2',
        title: 'Destiny Number',
        icon: '🌑',
        imageUrl: destiny,
        imageCaption: 'Purpose written in the stars',
        desc: 'Derived from your full birth name, it uncovers the deeper purpose of your life and the opportunities you must embrace. It governs your ultimate potential, directing your life towards a specific spiritual and material mission.',
    },
    {
        num: '3',
        title: 'Soul Urge Number',
        icon: '💫',
        imageUrl: soulUrge,
        imageCaption: 'The voice of your heart',
        desc: 'The deepest desire of your heart. Calculated from the vowels in your full birth name, it reveals what truly drives you from within — your motivations, passions, inner cravings, and what makes your soul feel fulfilled.',
    },
    {
        num: '4',
        title: 'Personality Number',
        icon: '🔮',
        imageUrl: personality,
        imageCaption: 'How the world sees you',
        desc: 'The first impression you leave on others. Calculated from the consonants of your name, it reveals how the world perceives you before knowing the real you — your outer personality, appearance, and social energy.',
    },
    {
        num: '5',
        title: 'Birthday Number',
        icon: '🎂',
        imageUrl: birthday,
        imageCaption: 'Your cosmic gift at birth',
        desc: 'A special gift from the cosmos encoded in the day you were born. It represents a unique talent or natural ability that sets you apart from everyone around you — a distinct skill that comes naturally and effortlessly.',
    },
    {
        num: '6',
        title: 'Maturity Number',
        icon: '🌿',
        imageUrl: maturity,
        imageCaption: 'Wisdom of later years',
        desc: 'What you are growing into. Emerging in mid-life, this number reveals the wisdom, mastery and elevated consciousness you will access in the second half of life — a blueprint for your mature, true self.',
    },
];

const benefits = [
    { icon: '🪐', label: 'Career & Finance Clarity', text: 'Discover which years are powerfully aligned for financial growth and business decisions.' },
    { icon: '❤️', label: 'Love & Relationships', text: 'Find your most compatible partners and understand recurring relationship patterns.' },
    { icon: '🧘', label: 'Health & Well-being', text: 'Learn which numbers govern your health cycles so you can plan holistically.' },
    { icon: '⚡', label: 'Personal Year Prediction', text: 'Know what energy governs your current year – and how to harness it for maximum success.' },
];

const ribbonLines = [
    'Discover Your Lucky Number',
    'Unlock Your Hidden Traits',
    'Your Future Starts Here',
];

function HeroScrambleLine({ text }) {
    const [out, setOut] = useState(text)

    useEffect(() => {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
        if (reduceMotion) {
            setOut(text)
            return undefined
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
        const onlyLetters = /[A-Za-z]/

        let tick = 0
        const id = setInterval(() => {
            tick += 1
            setOut(
                text.replace(/[A-Za-z]/g, (m) => {
                    const seed = (m.charCodeAt(0) + tick * 17) % chars.length
                    return chars[seed]
                })
            )
        }, 95)

        return () => clearInterval(id)
    }, [text])

    return <span className="np-hero-scramble">{out}</span>
}

function PremiumRibbon({ activeLine, onClick }) {
    return (
        <div
            className="np-ribbon"
            role="button"
            tabIndex={0}
            aria-label="Unlock your numerology by filling the form"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick?.()
                }
            }}
        >
            <span className="np-ribbon__fold" aria-hidden="true" />
            <p className="np-ribbon__main">Enter Your Name &amp; DOB to</p>
            <div className="np-ribbon__dynamic" aria-live="polite">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeLine}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                        {activeLine}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────
   Inline styles for the two-panel carousel
──────────────────────────────────────────────── */
// Responsive CSS classes are now used via NumerologyPage.css

/* ────────────────────────────────────────────────
   Main Page Component
──────────────────────────────────────────────── */
const NumerologyPage = () => {
    const navigate = useNavigate();
    const [activeIdx, setActiveIdx] = useState(0);
    const active = numerologyNumbers[activeIdx];
    const [form, setForm] = useState({ name: '', dob: '', phone: '' });
    const [formErrors, setFormErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [showTeaser, setShowTeaser] = useState(false);
    const [countdown, setCountdown] = useState(300);
    const [compatibility, setCompatibility] = useState({ yourName: '', yourDob: '', partnerName: '', partnerDob: '' });
    const [compatibilityTeaser, setCompatibilityTeaser] = useState(false);
    const [spinNumber, setSpinNumber] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [ribbonLineIdx, setRibbonLineIdx] = useState(0);
    const loadingMessages = ['Analyzing your personality...', 'Decoding hidden patterns...', 'Aligning cosmic energies...'];
    const [loadingIdx, setLoadingIdx] = useState(0);
    const [heroLifePath, setHeroLifePath] = useState(7);

    const lifePath = useMemo(() => {
        if (!form.dob) return '7';
        const digits = form.dob.replace(/\D/g, '');
        const sum = digits.split('').reduce((a, d) => a + Number(d), 0);
        const reduced = sum % 9 || 9;
        return String(reduced);
    }, [form.dob]);

    const fmtTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    useEffect(() => {
        if (!showLoader) return undefined;
        const id = setInterval(() => {
            setLoadingIdx((prev) => (prev + 1) % loadingMessages.length);
        }, 850);
        return () => clearInterval(id);
    }, [showLoader]);

    useEffect(() => {
        if (!showTeaser) return undefined;
        const id = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, [showTeaser]);

    useEffect(() => {
        const id = setInterval(() => {
            setRibbonLineIdx((prev) => (prev + 1) % ribbonLines.length);
        }, 2600);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        let n = 9
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
        const delay = reduceMotion ? 600 : 200

        const id = setInterval(() => {
            setHeroLifePath(n)
            n -= 1
            if (n < 0) n = 9
        }, delay)

        return () => clearInterval(id)
    }, [])

    const validateMainForm = () => {
        const nextErrors = {};
        if (!form.name.trim()) nextErrors.name = 'Name is required';
        if (!form.dob) nextErrors.dob = 'Date of birth is required';
        if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
        const digits = form.phone.replace(/\D/g, '');
        if (digits.length && digits.length !== 10) nextErrors.phone = 'Enter a valid 10-digit phone number';
        setFormErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleDecode = (e) => {
        e.preventDefault();
        if (!validateMainForm()) return;
        setShowLoader(true);
        setShowTeaser(false);
        setTimeout(() => {
            setShowLoader(false);
            setShowTeaser(true);
        }, 2600);
    };

    const handleCompatibilitySubmit = (e) => {
        e.preventDefault();
        if (!compatibility.yourName || !compatibility.yourDob || !compatibility.partnerName || !compatibility.partnerDob) return;
        setCompatibilityTeaser(true);
    };

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setSpinNumber(null);
        setTimeout(() => {
            setSpinNumber(Math.floor(Math.random() * 9) + 1);
            setIsSpinning(false);
        }, 1500);
    };

    const scrollToFunnel = () => {
        document.getElementById('np-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const heroSymbols = Array.from({ length: 42 }).map((_, i) => (
        i % 3 === 0 ? String((i % 9) + 1) : String.fromCharCode(65 + (i % 26))
    ));

    return (
        <div className="page-wrapper">
            {showLoader && (
                <div className="np-loader" role="status" aria-live="polite">
                    <div className="np-loader__inner">
                        <div className="np-ring" />
                        <p className="np-loader__text">{loadingMessages[loadingIdx]}</p>
                    </div>
                </div>
            )}

            {/* ── Hero Banner ── */}
            <div className="numerology-header np-hero">
                <div className="np-hero__numbers" aria-hidden="true">
                    {heroSymbols.map((symbol, i) => (
                        <span
                            key={`hero-symbol-${i}`}
                            className="np-hero__number"
                            style={{
                                top: `${6 + ((i * 13) % 82)}%`,
                                left: `${4 + ((i * 17) % 90)}%`,
                                fontSize: `${0.82 + (i % 5) * 0.18}rem`,
                                animationDelay: `${(i % 9) * 0.45}s`,
                            }}
                        >
                            {symbol}
                        </span>
                    ))}
                </div>
                <div className="np-hero__container">
                    <div className="np-hero__left">
                        <p className="np-hero__kicker">Ancient Vedic Numerology</p>
                        <h1>Your Numbers Know More About You Than You Do</h1>
                        <p className="np-hero__sub">
                            Hidden patterns in your name and birth date are waiting to be revealed
                        </p>
                        <button type="button" className="np-hero__cta" onClick={scrollToFunnel}>
                            Reveal My Numbers
                        </button>
                        <p className="np-hero__trust">Takes less than 30 seconds</p>
                    </div>
                    <div className="np-hero__right">
                        <div
                            className="np-hero__right-bg"
                            aria-hidden="true"
                            style={{ backgroundImage: `url(${numerologyBg})` }}
                        />
                        <div className="np-hero-card">
                            <p className="np-hero-card__title" aria-live="polite">
                                Life Path Number: {heroLifePath}
                            </p>
                            <p className="np-hero-card__text">
                                <HeroScrambleLine text="You have a rare intuitive abil**** and a strong inner awaren****" />
                            </p>
                            <div className="np-hero-card__foot">
                                <span>🔒</span>
                                <span>Unlock Full Insight</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="np-form" className="np-funnel-section">
                <div className="container">
                    <div className="np-funnel-shell">
                        <div className="np-form-card">
                            <PremiumRibbon
                                activeLine={ribbonLines[ribbonLineIdx]}
                                onClick={() => document.getElementById('np-name')?.focus()}
                            />
                            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Your Numbers Know More About You Than You Do</h2>
                            <form className="np-form-grid" onSubmit={handleDecode}>
                                <label className="np-field">
                                    <input
                                        type="text"
                                        id="np-name"
                                        value={form.name}
                                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                        placeholder=" "
                                    />
                                    <span>Full Name</span>
                                    {formErrors.name && <small>{formErrors.name}</small>}
                                </label>
                                <label className="np-field">
                                    <input
                                        type="date"
                                        id="np-dob"
                                        value={form.dob}
                                        onChange={(e) => setForm((prev) => ({ ...prev, dob: e.target.value }))}
                                        placeholder=" "
                                    />
                                    <span>Date of Birth</span>
                                    {formErrors.dob && <small>{formErrors.dob}</small>}
                                </label>
                                <label className="np-field">
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        id="np-phone"
                                        value={form.phone}
                                        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                                        placeholder=" "
                                    />
                                    <span>Phone Number</span>
                                    {formErrors.phone && <small>{formErrors.phone}</small>}
                                </label>
                                <button type="submit" className="np-decode-btn">Decode My Numbers</button>
                            </form>
                        </div>

                        {showTeaser && (
                            <>
                                <div className="np-results-card">
                                    <div className="np-timer">Limited-time unlock offer <strong>{fmtTime(countdown)}</strong></div>
                                    <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>Your Partial Numerology Reveal</h2>
                                    <div className="np-teaser-grid">
                                        <div className="np-teaser-item">
                                            <h3>Life Path Number</h3>
                                            <div className="np-main-number">{lifePath}</div>
                                            <p>You are highly intui**** and possess a rare spiri**** ability that influences major decisions in your life.</p>
                                        </div>
                                        <div className="np-teaser-item">
                                            <h3>Destiny Number</h3>
                                            <p className="np-partial">Your destiny indicates leadership with an unfinished karmic lesson in relati**** and self-tru****.</p>
                                        </div>
                                        <div className="np-teaser-item np-locked">
                                            <h3>Soul Urge Number 🔒</h3>
                                            <p>Fully locked. Unlock to reveal your emotional blueprint.</p>
                                        </div>
                                        <div className="np-teaser-item np-locked">
                                            <h3>Personality Number 🔒</h3>
                                            <p>Fully locked. Unlock to reveal how people truly perceive you.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="np-hook">
                                    <p>98% people never discover this about themselves.</p>
                                    <p>Your numbers reveal a hidden trait that drives your biggest life choices.</p>
                                    <p>This insight could change your future decisions.</p>
                                </div>

                                <div className="np-visuals">
                                    <div className="np-chart np-blur">Personality Radar Chart</div>
                                    <div className="np-chart np-blur">Energy Bar Graph</div>
                                    <div className="np-chart np-blur">Life Timeline</div>
                                </div>

                                <div className="np-unlock-card">
                                    <h3>Unlock Your Full Personalized Report</h3>
                                    <ul>
                                        <li>Career insights</li>
                                        <li>Love compatibility</li>
                                        <li>Hidden strengths</li>
                                        <li>Life predictions</li>
                                    </ul>
                                    <div className="np-price"><span>₹199</span> ₹99</div>
                                    <button type="button" className="np-unlock-btn" onClick={() => navigate('/reports/order/life-journey')}>Unlock Now</button>
                                    <p>Personalized based on your input — not generic</p>
                                </div>

                                <div className="np-funnel-bottom">
                                    <div className="np-compat-card">
                                        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Compatibility Checker</h2>
                                        <form className="np-compat-grid" onSubmit={handleCompatibilitySubmit}>
                                            <input type="text" placeholder="Your Name" value={compatibility.yourName} onChange={(e) => setCompatibility((p) => ({ ...p, yourName: e.target.value }))} />
                                            <input type="date" value={compatibility.yourDob} onChange={(e) => setCompatibility((p) => ({ ...p, yourDob: e.target.value }))} />
                                            <input type="text" placeholder="Partner Name" value={compatibility.partnerName} onChange={(e) => setCompatibility((p) => ({ ...p, partnerName: e.target.value }))} />
                                            <input type="date" value={compatibility.partnerDob} onChange={(e) => setCompatibility((p) => ({ ...p, partnerDob: e.target.value }))} />
                                            <button type="submit" className="np-unlock-btn">Check Compatibility</button>
                                        </form>
                                        {compatibilityTeaser && (
                                            <div className="np-compat-teaser">
                                                <p>Strong emotional connection detected ❤️</p>
                                                <p>But a hidden challenge exists...</p>
                                                <button type="button" className="np-unlock-btn" onClick={() => navigate('/reports/order/kundali-matching')}>Unlock Full Compatibility</button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="np-spin-card">
                                        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Spin Your Destiny</h2>
                                        <div className={`np-wheel ${isSpinning ? 'is-spinning' : ''}`}>{spinNumber ?? '?'}</div>
                                        <button type="button" className="np-unlock-btn" onClick={handleSpin}>Spin Your Destiny</button>
                                        {spinNumber && (
                                            <p className="np-spin-result">You unlocked number {spinNumber}. A powerful shift is near... full meaning is locked 🔒</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── What Is Numerology — Two Panel ── */}
            <section className="np-info-section">
                <div className="np-info-wrapper">

                    {/* Title */}
                    <div className="np-heading-group">
                        <h2 className="section-title">What Is Numerology?</h2>
                        <p className="np-heading-sub">
                            Numerology is a 5,000-year-old Vedic science that decodes the hidden language of the universe. Click any number type to explore its meaning.
                        </p>
                    </div>

                    {/* Two-panel row */}
                    <div className="np-two-panel-row">

                        {/* ── LEFT: Image + overlapping card ── */}
                        <div className="np-left-panel">
                            {/* Image */}
                            <div className="np-img-wrap">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={active.imageUrl}
                                        src={active.imageUrl}
                                        alt={active.title}
                                        className="np-img-full"
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Overlapping info card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.title}
                                    className="np-info-card"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.38, ease: 'easeOut' }}
                                >
                                    <span className="np-info-card-num">Number {active.num}</span>
                                    <span className="np-info-card-icon">{active.icon}</span>
                                    <h3 className="np-info-card-title">{active.title}</h3>
                                    <p className="np-info-card-desc">{active.desc}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── RIGHT: Clickable list ── */}
                        <div className="np-right-panel">
                            {numerologyNumbers.map((item, idx) => (
                                <div
                                    key={item.num}
                                    className={`np-list-item ${idx === activeIdx ? 'is-active' : ''}`}
                                    onClick={() => setActiveIdx(idx)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => e.key === 'Enter' && setActiveIdx(idx)}
                                    aria-pressed={idx === activeIdx}
                                >
                                    <span className="np-list-icon">{item.icon}</span>
                                    <span className="np-list-label">{item.title}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="np-benefits-section">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center', display: 'block' }}>
                        What a Professional Reading Reveals
                    </h2>
                    <div className="np-benefits-grid">
                        {benefits.map((b) => (
                            <div key={b.label} className="glass-panel np-benefit-card">
                                <div className="np-benefit-icon">{b.icon}</div>
                                <h3 className="np-benefit-label">{b.label}</h3>
                                <p className="np-benefit-text">{b.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Specialist ── */}
            <section className="np-specialist-section">
                <div className="container">
                    <div className="np-specialist-grid">
                        <div className="np-specialist-content">
                            <h2>Why Consult a Specialist?</h2>
                            <p className="np-specialist-text">
                                Free online calculators give generic results. A live consultation with our Vedic Numerology specialist provides a deeply personalised, interactive reading that accounts for your complete numerological chart — not just one number.
                            </p>
                            <ul className="np-specialist-list">
                                {[
                                    'Complete 6-number Chart Analysis',
                                    'Past, Present & Future Year Cycles',
                                    'Lucky Dates, Colours & Gemstones',
                                    'Name Correction Advice',
                                    'Live Q&A session with the Astrologer',
                                ].map((pt) => (
                                    <li key={pt} className="np-specialist-item">
                                        <span>✦</span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-panel np-testimonial-card">
                            <div className="np-quote-mark">❝</div>
                            <p className="np-testimonial-text">
                                "I was skeptical, but the numerology session with the specialist changed my perspective completely. The life path reading was eerily accurate — I finally understood why I keep attracting certain patterns in life."
                            </p>
                            <div className="np-author">
                                <div className="np-author-avatar">P</div>
                                <div>
                                    <strong className="np-author-name">Priya Sharma</strong>
                                    <span className="np-author-meta">Delhi, India ⭐⭐⭐⭐⭐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="np-cta-banner">
                <div className="container">
                    <span className="np-cta-icon">🔮</span>
                    <h2 className="np-cta-title">
                        Ready to Discover Your Numbers?
                    </h2>
                    <p className="np-cta-sub">
                        Book a live, personalised Numerology session with our expert Vedic Astrologer. Get your complete chart decoded — instantly.
                    </p>

                    <div className="np-cta-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                        <motion.button
                            className="np-interactive-consult-btn"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/book')}
                        >
                            <span className="np-btn-sparkle">✨</span>
                            Get Paid Consultation <br />
                            <span className="np-btn-sparkle">✨</span>
                        </motion.button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default NumerologyPage;
