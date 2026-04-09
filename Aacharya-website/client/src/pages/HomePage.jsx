import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield, FiTrendingUp, FiCheck, FiStar, FiUser, FiGlobe } from 'react-icons/fi'
import { RiStarSFill, RiDoubleQuotesL } from 'react-icons/ri'
import ParticleTextEffect from '../components/ui/ParticleTextEffect'
import CobeGlobe from '../components/ui/CobeGlobe'
import harshitHeroImg from '../assets/harshit_hero.png'
import './HomePage.css'

export default function HomePage() {
    return (
        <div className="home-page">
            {/* ── 1. Hero Section ── */}
            <section className="hero-section">
                <div className="hero-container hero-container--full">
                    <div className="hero-content">
                        <div className="hero-badge animate-in">
                            <RiStarSFill /> AI-Powered Vedic Astrology
                        </div>
                        <div className="hero-particle-wrapper animate-in" style={{ animationDelay: '0.1s' }}>
                            <ParticleTextEffect
                                words={["Unlock Your", "Cosmic Path"]}
                                canvasWidth={600}
                                canvasHeight={120}
                                fontSize={65}
                                fontFamily="Cinzel"
                                pixelSteps={4}
                                drawAsPoints={true}
                                bgColor="transparent"
                            />
                            <h1 className="sr-only">
                                Unlock Your <span className="text-gradient">Cosmic Path</span>
                            </h1>
                        </div>
                        <div className="hero-particle-subtitle animate-in" style={{ animationDelay: '0.15s' }}>
                            <ParticleTextEffect
                                words={[
                                    "Career • Relationships",
                                    "Destiny • Clarity",
                                    "AI-Powered Vedic",
                                ]}
                                canvasWidth={550}
                                canvasHeight={60}
                                fontSize={22}
                                fontFamily="Inter"
                                pixelSteps={3}
                                drawAsPoints={true}
                                bgColor="transparent"
                            />
                        </div>
                        <p className="hero-subtitle animate-in" style={{ animationDelay: '0.2s' }}>
                            Gain instant clarity on your career, relationships, and destiny with
                            precision Vedic astrology readings powered by advanced AI.
                        </p>
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

            {/* ── 2. How It Works ── */}
            <section className="steps-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps-grid">
                        <div className="step-card glass-panel">
                            <div className="step-number">01</div>
                            <h3>Enter Details</h3>
                            <p>Share your birth date, time, and location to generate your unique chart.</p>
                        </div>
                        <div className="step-card glass-panel">
                            <div className="step-number">02</div>
                            <h3>AI Analysis</h3>
                            <p>Our AI analyzes planetary positions, dashas, and yogas instantly.</p>
                        </div>
                        <div className="step-card glass-panel">
                            <div className="step-number">03</div>
                            <h3>Get Guidance</h3>
                            <p>Receive a detailed, easy-to-understand report with actionable remedies.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Trust Section ── */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-item">
                            <FiUser className="trust-icon" />
                            <div className="trust-text">
                                <h4>10,000+</h4>
                                <p>Happy Users</p>
                            </div>
                        </div>
                        <div className="trust-item">
                            <FiShield className="trust-icon" />
                            <div className="trust-text">
                                <h4>Privacy First</h4>
                                <p>Data Not Stored</p>
                            </div>
                        </div>
                        <div className="trust-item">
                            <FiGlobe className="trust-icon" />
                            <div className="trust-text">
                                <h4>Vedic Accuracy</h4>
                                <p>Ancient Wisdom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Product Preview ── */}
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

            {/* ── 5. Pricing ── */}
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

            {/* ── 6. Final CTA ── */}
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
