import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiShield, FiUsers, FiCheckCircle } from 'react-icons/fi'
import reportsHeroBg from '../assets/reportshero.webp'
import harshitSirBgr from '../assets/harshitsirbgr.webp'
import ReportIcon from '../components/reports/ReportIcon'
import { REPORTS_CATALOG, HERO_FLOATING_IDS, getReportById } from '../data/reportsCatalog'
import './ReportsPage.css'

const heroFloatingReports = HERO_FLOATING_IDS.map((id) => getReportById(id)).filter(Boolean)
const reportsGrid = REPORTS_CATALOG

const whyChoose = [
    { title: 'Accurate Vedic Calculations', icon: <FiCheckCircle /> },
    { title: 'Personalized Insights', icon: <FiStar /> },
    { title: 'Trusted by 10K+ Clients', icon: <FiUsers /> },
    { title: 'Expert Guidance Included', icon: <FiShield /> },
]

export default function ReportsPage() {
    const gridRef = useRef(null)
    const [activeReport, setActiveReport] = useState(null)

    const handleExplore = () => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const closeReportModal = () => setActiveReport(null)

    useEffect(() => {
        if (!activeReport) return undefined

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleEsc = (event) => {
            if (event.key === 'Escape') closeReportModal()
        }

        window.addEventListener('keydown', handleEsc)
        return () => {
            window.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = previousOverflow
        }
    }, [activeReport])

    return (
        <div className="reports-page">
            <section
                className="section rp-hero"
                style={{
                    '--rp-hero-bg': `url(${reportsHeroBg})`,
                    '--rp-hero-person': `url(${harshitSirBgr})`,
                }}
            >
                <div className="container rp-hero__inner">
                    <div className="rp-hero__left">
                        <p className="rp-kicker">Premium Vedic Reports</p>
                        <h1>Discover Your Personalized Astrology Reports</h1>
                        <p className="rp-hero__sub">
                            Accurate insights for love, career, finance, and life guidance
                        </p>
                        <div className="rp-hero__actions">
                            <button type="button" className="rp-btn rp-btn--primary" onClick={handleExplore}>
                                Explore Reports <FiArrowRight />
                            </button>
                            <Link to="/contact" className="rp-btn rp-btn--secondary">
                                Talk to Expert
                            </Link>
                        </div>
                    </div>
                    <div className="rp-hero__right">
                        {heroFloatingReports.map((item, i) => (
                            <article key={item.id} className="rp-float-card" style={{ '--fi': i }}>
                                <div className="rp-float-card__media">
                                    <img src={item.image} alt={item.title} className="rp-float-card__img" />
                                    <span className="rp-float-card__icon">
                                        <ReportIcon iconKey={item.iconKey} />
                                    </span>
                                </div>
                                <h3>{item.shortTitle || item.title}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" ref={gridRef}>
                <div className="container">
                    <div className="rp-section-head">
                        <h2>Premium Astrology Reports</h2>
                        <p>Choose the report that best matches your present questions and future goals.</p>
                    </div>
                    <div className="rp-grid">
                        {reportsGrid.map((report) => (
                            <article
                                key={report.id}
                                className="rp-report-card"
                                role="button"
                                tabIndex={0}
                                onClick={() => setActiveReport(report)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        setActiveReport(report)
                                    }
                                }}
                            >
                                <div className="rp-report-card__media">
                                    <img src={report.image} alt={report.title} className="rp-report-card__img" />
                                    <span className="rp-report-card__badge">
                                        <ReportIcon iconKey={report.iconKey} />
                                    </span>
                                </div>
                                <h3>{report.title}</h3>
                                <p>{report.desc}</p>
                                <div className="rp-report-card__foot">
                                    <span className="rp-price">{report.price}</span>
                                    <button
                                        type="button"
                                        className="rp-small-btn"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveReport(report)
                                        }}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {activeReport && (
                <div
                    className="rp-report-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="rp-report-modal-title"
                >
                    <button
                        type="button"
                        className="rp-report-modal__backdrop"
                        aria-label="Close report details"
                        onClick={closeReportModal}
                    />
                    <div className="rp-report-modal__panel">
                        <button
                            type="button"
                            className="rp-report-modal__close"
                            aria-label="Close"
                            onClick={closeReportModal}
                        >
                            ×
                        </button>
                        <div className="rp-report-modal__media">
                            <img src={activeReport.image} alt={activeReport.title} className="rp-report-modal__img" />
                            <span className="rp-report-modal__badge">
                                <ReportIcon iconKey={activeReport.iconKey} />
                            </span>
                        </div>
                        <h3 id="rp-report-modal-title">{activeReport.title}</h3>
                        <p>{activeReport.desc}</p>
                        <ul className="rp-report-modal__points">
                            <li>Personalized chart analysis by experienced astrologers</li>
                            <li>Actionable remedies and practical timeline guidance</li>
                            <li>Delivered in clear, easy-to-understand format</li>
                        </ul>
                        <div className="rp-report-modal__foot">
                            <span className="rp-price">{activeReport.price}</span>
                            <Link
                                to={`/reports/order/${activeReport.id}`}
                                className="rp-btn rp-btn--primary"
                                onClick={closeReportModal}
                            >
                                Buy Now <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <section className="section rp-carousel-wrap">
                <div className="container">
                    <div className="rp-section-head rp-carousel-head">
                        <h2>Famous Reports</h2>
                    </div>
                    <div className="rp-carousel">
                        <div className="rp-carousel__track">
                            {[...reportsGrid, ...reportsGrid].map((item, i) => (
                                <article key={`${item.id}-${i}`} className="rp-carousel-card">
                                    <div className="rp-carousel-card__media">
                                        <img src={item.image} alt={item.title} className="rp-carousel-card__img" />
                                        <span className="rp-carousel-card__badge">
                                            <ReportIcon iconKey={item.iconKey} />
                                        </span>
                                    </div>
                                    <h4>{item.title}</h4>
                                    <div className="rp-carousel-card__foot">
                                        <span className="rp-price">{item.price}</span>
                                        <Link to={`/reports/order/${item.id}`} className="rp-small-btn">
                                            Buy Now
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="rp-section-head">
                        <h2>Why Choose Our Reports</h2>
                        <p>Designed to be spiritually grounded, practical, and personally relevant.</p>
                    </div>
                    <div className="rp-features">
                        {whyChoose.map((f) => (
                            <article key={f.title} className="rp-feature">
                                <span className="rp-feature__icon">{f.icon}</span>
                                <h3>{f.title}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section rp-cta">
                <div className="container rp-cta__inner">
                    <h2>Unlock Your Future Today</h2>
                    <Link to="/contact" className="rp-btn rp-btn--cta">
                        Get Your Report Now <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    )
}
