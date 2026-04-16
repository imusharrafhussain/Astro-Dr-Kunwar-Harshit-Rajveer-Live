import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import '../App.css';
import './NumerologyPage.css';
import numerologyBg from '../assets/numerologyBg.png';

/* ────────────────────────────────────────────────
   Data — each number gets a real Unsplash image
──────────────────────────────────────────────── */
const numerologyNumbers = [
    {
        num: '1',
        title: 'Life Path Number',
        icon: '☀️',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Your destined road',
        desc: 'The core of your personality. Derived from your date of birth, it reveals your innate traits, natural talents, and the road you are destined to walk. People with this as their primary number are natural leaders — driven, independent, and pioneering.',
    },
    {
        num: '2',
        title: 'Destiny Number',
        icon: '🌑',
        imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Purpose written in the stars',
        desc: 'Derived from your full birth name, it uncovers the deeper purpose of your life and the opportunities you must embrace. It governs your ultimate potential, directing your life towards a specific spiritual and material mission.',
    },
    {
        num: '3',
        title: 'Soul Urge Number',
        icon: '💫',
        imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'The voice of your heart',
        desc: 'The deepest desire of your heart. Calculated from the vowels in your full birth name, it reveals what truly drives you from within — your motivations, passions, inner cravings, and what makes your soul feel fulfilled.',
    },
    {
        num: '4',
        title: 'Personality Number',
        icon: '🔮',
        imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'How the world sees you',
        desc: 'The first impression you leave on others. Calculated from the consonants of your name, it reveals how the world perceives you before knowing the real you — your outer personality, appearance, and social energy.',
    },
    {
        num: '5',
        title: 'Birthday Number',
        icon: '🎂',
        imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Your cosmic gift at birth',
        desc: 'A special gift from the cosmos encoded in the day you were born. It represents a unique talent or natural ability that sets you apart from everyone around you — a distinct skill that comes naturally and effortlessly.',
    },
    {
        num: '6',
        title: 'Maturity Number',
        icon: '🌿',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
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
const S = {
    section: {
        background: 'var(--bg-cosmic)',
        padding: '5rem 0',
    },
    wrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    twoPanel: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
    },
    /* Left 75% panel */
    left: {
        flex: '0 0 73%',
        position: 'relative',
    },
    imgWrap: {
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#1a0a09',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    card: {
        position: 'absolute',
        bottom: '1.5rem',
        right: '-1rem',
        width: 'min(460px, 65%)',
        background: 'rgba(30,10,9,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: '18px',
        padding: '1.75rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        border: '1px solid rgba(212,175,55,0.2)',
    },
    cardNum: {
        display: 'inline-block',
        background: 'var(--gold-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '0.35rem',
    },
    cardIcon: {
        fontSize: '2rem',
        marginBottom: '0.5rem',
        display: 'block',
    },
    cardTitle: {
        fontFamily: 'var(--font-heading)',
        fontSize: '1.35rem',
        color: '#fff',
        marginBottom: '0.6rem',
    },
    cardDesc: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: '0.88rem',
        lineHeight: '1.7',
        margin: 0,
    },
    /* Right 25% panel */
    right: {
        flex: '0 0 24%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
    },
    listItem: (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.9rem 1.1rem',
        cursor: 'pointer',
        background: isActive ? 'var(--bg-maroon)' : 'var(--bg-card)',
        borderLeft: isActive ? '4px solid var(--gold-primary)' : '4px solid transparent',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid var(--border-subtle)',
    }),
    listIcon: (isActive) => ({
        fontSize: '1.15rem',
        flexShrink: 0,
        filter: isActive ? 'drop-shadow(0 0 4px rgba(212,175,55,0.6))' : 'none',
    }),
    listLabel: (isActive) => ({
        fontSize: '0.82rem',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        color: isActive ? '#fff' : 'var(--text-heading)',
        letterSpacing: '0.02em',
    }),
};

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
            <section style={S.section}>
                <div style={S.wrapper}>

                    {/* Title */}
                    <div style={S.heading}>
                        <h2 className="section-title">What Is Numerology?</h2>
                        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                            Numerology is a 5,000-year-old Vedic science that decodes the hidden language of the universe. Click any number type to explore its meaning.
                        </p>
                    </div>

                    {/* Two-panel row */}
                    <div style={S.twoPanel}>

                        {/* ── LEFT: Image + overlapping card ── */}
                        <div style={S.left}>
                            {/* Image */}
                            <div style={S.imgWrap}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={active.imageUrl}
                                        src={active.imageUrl}
                                        alt={active.title}
                                        style={S.img}
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
                                    style={S.card}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.38, ease: 'easeOut' }}
                                >
                                    <span style={S.cardNum}>Number {active.num}</span>
                                    <span style={S.cardIcon}>{active.icon}</span>
                                    <h3 style={S.cardTitle}>{active.title}</h3>
                                    <p style={S.cardDesc}>{active.desc}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── RIGHT: Clickable list ── */}
                        <div style={S.right}>
                            {numerologyNumbers.map((item, idx) => (
                                <div
                                    key={item.num}
                                    style={S.listItem(idx === activeIdx)}
                                    onClick={() => setActiveIdx(idx)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => e.key === 'Enter' && setActiveIdx(idx)}
                                    aria-pressed={idx === activeIdx}
                                >
                                    <span style={S.listIcon(idx === activeIdx)}>{item.icon}</span>
                                    <span style={S.listLabel(idx === activeIdx)}>{item.title}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section>
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center', display: 'block' }}>
                        What a Professional Reading Reveals
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {benefits.map((b) => (
                            <div key={b.label} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>{b.label}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>{b.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Specialist ── */}
            <section style={{ background: 'var(--bg-cosmic)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="grid-cols-2">
                        <div>
                            <h2 style={{ color: 'var(--text-heading)', marginBottom: '1rem' }}>Why Consult a Specialist?</h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                                Free online calculators give generic results. A live consultation with our Vedic Numerology specialist provides a deeply personalised, interactive reading that accounts for your complete numerological chart — not just one number.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    'Complete 6-number Chart Analysis',
                                    'Past, Present & Future Year Cycles',
                                    'Lucky Dates, Colours & Gemstones',
                                    'Name Correction Advice',
                                    'Live Q&A session with the Astrologer',
                                ].map((pt) => (
                                    <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontWeight: 500 }}>
                                        <span style={{ color: 'var(--gold-dark)', fontSize: '1.1rem' }}>✦</span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid var(--gold-primary)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❝</div>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-main)', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem' }}>
                                "I was skeptical, but the numerology session with the specialist changed my perspective completely. The life path reading was eerily accurate — I finally understood why I keep attracting certain patterns in life."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--maroon-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>P</div>
                                <div>
                                    <strong style={{ display: 'block', color: 'var(--text-heading)' }}>Priya Sharma</strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Delhi, India ⭐⭐⭐⭐⭐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section style={{ background: 'var(--maroon-gradient)', padding: '5rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔮</div>
                    <h2 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
                        Ready to Discover Your Numbers?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: '1.75' }}>
                        Log in and book a live, personalised Numerology session with our expert Vedic Astrologer. Get your complete chart decoded — instantly.
                    </p>

                    <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--gold-primary)', borderRadius: 'var(--radius-md)', padding: '1.25rem 2.5rem', marginBottom: '2rem' }}>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Consultation Fee</div>
                        <div style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 700, lineHeight: 1 }}>₹ 299</div>
                        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginTop: '0.25rem' }}>One-on-One · Live Session · Specialist Astrologer</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="btn btn-primary"
                            style={{ fontSize: '1.1rem', padding: '0.9em 2.75em', minWidth: '280px', borderRadius: 'var(--radius-sm)' }}
                            onClick={() => navigate('/login')}
                        >
                            🔐 Login &amp; Consult a Specialist
                        </button>
                        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                            New here?{' '}
                            <span style={{ color: 'var(--gold-light)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
                                Create a free account
                            </span>{' '}in seconds.
                        </span>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default NumerologyPage;
