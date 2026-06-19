import { useState, useEffect, useRef } from 'react'
import { 
    FiShield, 
    FiDatabase, 
    FiEye, 
    FiShare2, 
    FiMessageSquare, 
    FiClock, 
    FiLock, 
    FiUserCheck, 
    FiFileText, 
    FiLink, 
    FiRefreshCw, 
    FiMail, 
    FiSearch, 
    FiCopy, 
    FiCheck,
    FiInfo,
    FiArrowRight
} from 'react-icons/fi'
import './PrivacyPage.css'

export default function PrivacyPage() {
    const [activeMode, setActiveMode] = useState('full') // 'full' or 'tldr'
    const [searchQuery, setSearchQuery] = useState('')
    const [activeSectionId, setActiveSectionId] = useState('info-collect')
    const [copied, setCopied] = useState(false)
    const [scrollPercent, setScrollPercent] = useState(0)

    const sections = [
        {
            id: 'info-collect',
            title: '1. Information We Collect',
            icon: <FiDatabase />,
            tldr: 'We collect your birth details (date, time, place), name, phone, and email when you fill out forms. We do NOT use Google Analytics or collect payment details directly on the site.',
            full: [
                'We collect information in the following ways:',
                '<strong>a) Information you provide directly:</strong> When you fill out a consultation request, kundli, or course enquiry form on our Website, we may collect: Full name, Date, time, and place of birth (required for astrological analysis), Gender, Phone number / WhatsApp number, Email address, The nature of your query or area of concern (e.g., career, marriage, health), and any other details you choose to share with us in the form or during a call.',
                'We do not currently use Google Analytics or similar third-party tracking/advertising tools on this Website. If this changes in the future, we will update this Policy accordingly.',
                '<strong>b) Information shared during consultation calls:</strong> Since consultations are conducted over phone/WhatsApp call rather than through the Website itself, any additional personal information you choose to share with Dr. Kunwar Harshit Rajveer during that call (for the purpose of the consultation) is also covered by this Policy.',
                'We do <strong>not</strong> collect any payment card, UPI, or bank account details through the Website. Payment is arranged directly with you over the call, and a payment QR code is shared manually for you to complete payment through your own UPI/payment app. We do not have access to or store your card, bank, or UPI credentials.'
            ]
        },
        {
            id: 'info-use',
            title: '2. How We Use Your Information',
            icon: <FiEye />,
            tldr: 'Your details are strictly used to schedule, prepare, and conduct your Vedic consultations or reports. We never repurpose your birth details for marketing.',
            full: [
                'We use the information collected to:',
                '• Contact you in response to your consultation, kundli, or course enquiry form.',
                '• Schedule and confirm your consultation slot over call/WhatsApp.',
                '• Discuss consultation fees and share payment QR codes for the booked slot.',
                '• Conduct the astrology, numerology, or Vastu consultation itself.',
                '• Prepare any personalized report or analysis you have requested.',
                '• Respond to your questions or follow-up queries.',
                '• Improve our Website and services.',
                'We do not use your birth details, contact information, or consultation history for any purpose unrelated to providing you the service you requested, unless you separately agree (for example, to receive updates about new courses or offers).'
            ]
        },
        {
            id: 'info-share',
            title: '3. How Your Information Is Shared',
            icon: <FiShare2 />,
            tldr: 'We do not sell, rent, or trade your data. It is only accessible to Dr. Kunwar Harshit Rajveer, essential team members, or legal authorities when required.',
            full: [
                'We do <strong>not</strong> sell, rent, or trade your personal information to third parties.',
                'Your information may be accessed by:',
                '• Dr. Kunwar Harshit Rajveer and any staff/assistants directly involved in handling enquiries and conducting consultations.',
                '• Service providers that help operate the Website or process enquiries, such as our website hosting provider, form/email service, and WhatsApp Business (used solely to receive and respond to your enquiry).',
                '• Authorities, if required to comply with a legal obligation, court order, or government request.',
                'These service providers only receive the minimum information necessary to perform their function and are not permitted to use your data for their own purposes.'
            ]
        },
        {
            id: 'consent',
            title: '4. Communication Consent',
            icon: <FiMessageSquare />,
            tldr: 'By submitting forms, you agree to be contacted via call, SMS, or WhatsApp to schedule your consultation. You can opt out at any time.',
            full: [
                'By submitting a consultation, kundli, or course enquiry form, you consent to being contacted by us via phone call, SMS, and/or WhatsApp at the number you provide, for the purpose of discussing and scheduling your consultation, sharing payment details, and following up on your request.',
                'You may withdraw this consent at any time by informing us, after which we will stop contacting you except where necessary to complete a consultation already booked.'
            ]
        },
        {
            id: 'retention',
            title: '5. Data Retention',
            icon: <FiClock />,
            tldr: 'We only keep your data as long as needed to deliver your consultation, respond to follow-ups, or comply with legal rules.',
            full: [
                'We retain your personal information only for as long as necessary to provide the requested consultation/service, respond to follow-up queries, and meet any legal, accounting, or record-keeping obligations.',
                'You may request deletion of your information at any time (see Section 7 below), subject to any records we are legally required to keep.'
            ]
        },
        {
            id: 'security',
            title: '6. Data Security',
            icon: <FiLock />,
            tldr: 'We use industry-standard measures to protect your digital and astrological files, though no method is 100% secure.',
            full: [
                'We take reasonable administrative and technical measures to protect your personal information from unauthorized access, alteration, or disclosure.',
                'However, no method of transmission over the internet or phone networks is 100% secure, and we cannot guarantee absolute security.'
            ]
        },
        {
            id: 'rights',
            title: '7. Your Rights',
            icon: <FiUserCheck />,
            tldr: 'You have the right to request a copy of your records, correct mistakes, or delete your birth and contact details at any time.',
            full: [
                'Depending on your location, you may have the right to:',
                '• Request a copy of the personal information we hold about you.',
                '• Ask us to correct inaccurate information.',
                '• Ask us to delete your information, subject to legal/record-keeping requirements.',
                '• Withdraw consent to be contacted.',
                'To exercise any of these rights, please email us at <strong>drkuwarharshitrajveer1@gmail.com</strong>. We will respond within a reasonable time.'
            ]
        },
        {
            id: 'children',
            title: "8. Children's Privacy",
            icon: <FiFileText />,
            tldr: 'Services are for adults 18+. Minors need parental consent. If we collect minor details without consent, we delete them promptly.',
            full: [
                'Our services are intended for individuals who are 18 years of age or older, or for minors with the involvement and consent of a parent or guardian.',
                'We do not knowingly collect personal information directly from children without such consent.',
                'If you believe a child has submitted information to us without appropriate parental consent, please contact us so we can delete it.'
            ]
        },
        {
            id: 'disclaimer',
            title: '9. Astrological Guidance Disclaimer',
            icon: <FiInfo />,
            tldr: 'Astrology, numerology, and Vastu are for guidance and information purposes only. They do NOT replace professional legal, medical, or financial advice.',
            full: [
                'Astrology, numerology, and Vastu consultations are offered for informational and guidance purposes based on traditional Vedic principles.',
                'They are not a substitute for professional medical, legal, financial, or psychological advice.',
                'Any decisions you make based on a consultation are made at your own discretion.'
            ]
        },
        {
            id: 'links',
            title: '10. Third-Party Links',
            icon: <FiLink />,
            tldr: 'Our website has links to social networks or payment apps. Their privacy policies are independent of ours.',
            full: [
                'Our Website may contain links to third-party websites (such as social media or payment apps).',
                'We are not responsible for the privacy practices of those third parties, and we encourage you to review their respective privacy policies.'
            ]
        },
        {
            id: 'changes',
            title: '11. Changes to This Policy',
            icon: <FiRefreshCw />,
            tldr: 'We update this policy from time to time. The "Last Updated" date shows the latest version. Check back periodically.',
            full: [
                'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons.',
                'The "Last Updated" date at the top of this page will reflect the most recent revision. We encourage you to review this page periodically.'
            ]
        },
        {
            id: 'contact',
            title: '12. Contact Us',
            icon: <FiMail />,
            tldr: 'Queries? Email Dr. Kunwar Harshit Rajveer at drkuwarharshitrajveer1@gmail.com or contact our Lucknow office.',
            full: [
                'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact:',
                '<strong>Dr. Kunwar Harshit Rajveer</strong><br />Lucknow, Uttar Pradesh, India<br />Email: drkuwarharshitrajveer1@gmail.com<br />Website: astrodrkunwarharshit.com'
            ]
        }
    ]

    // Scroll progress listener
    useEffect(() => {
        const handleScrollProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100
                setScrollPercent(progress)
            }
        }
        window.addEventListener('scroll', handleScrollProgress)
        return () => window.removeEventListener('scroll', handleScrollProgress)
    }, [])

    // Filter sections based on search query
    const filteredSections = sections.filter(sec => 
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.tldr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.full.some(para => para.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    // ScrollSpy observer
    useEffect(() => {
        if (activeMode !== 'full' || searchQuery !== '') return

        const observerOptions = {
            root: null,
            rootMargin: '-120px 0px -55% 0px',
            threshold: 0
        }

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, observerOptions)
        
        sections.forEach(sec => {
            const el = document.getElementById(sec.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [activeMode, searchQuery])

    // Scroll to section
    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            const offset = 120 // Header height offset
            const elementPosition = el.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            })
            setActiveSectionId(id)
        }
    }

    // Toggle view mode
    const handleModeChange = (mode) => {
        setActiveMode(mode)
        // Scroll slightly below hero
        setTimeout(() => {
            const el = document.querySelector('.privacy-controls')
            if (el) {
                const position = el.getBoundingClientRect().top + window.scrollY
                window.scrollTo({ top: position - 20, behavior: 'smooth' })
            }
        }, 50)
    }

    // Copy request template
    const handleCopyTemplate = () => {
        const template = `Subject: Data Privacy Request - astrodrkunwarharshit.com

Dear Dr. Kunwar Harshit Rajveer,

I am writing to request a copy of the personal information you hold about me or to request that my personal information be corrected or deleted from your records.

My Details:
Name: [Your Name]
WhatsApp / Phone Number: [Your Number]
Type of Request: [Access / Deletion / Correction]

Thank you,
[Your Name]`

        navigator.clipboard.writeText(template).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    // Highlight text matching query
    const highlightText = (text) => {
        if (!searchQuery) return <span dangerouslySetInnerHTML={{ __html: text }} />
        
        const regex = new RegExp(`(${searchQuery})`, 'gi')
        const cleanText = text.replace(/<[^>]*>/g, '')
        const parts = cleanText.split(regex)
        
        return (
            <span>
                {parts.map((part, i) => 
                    regex.test(part) ? (
                        <mark key={i} className="privacy-highlight">{part}</mark>
                    ) : (
                        <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                    )
                )}
            </span>
        )
    }

    return (
        <div className="privacy-page page-wrapper">
            {/* ── Cosmic Hero ── */}
            <section className="privacy-hero">
                <div className="privacy-hero__inner">
                    <h1>Privacy Policy</h1>
                    <p>Learn how we handle, protect, and respect your personal and astrological information with total confidentiality.</p>
                    <div className="privacy-hero__meta">
                        <FiShield /> Last Updated: June 19, 2026
                    </div>
                </div>

                {/* Rotating SVG Zodiac wheel background */}
                <div className="privacy-hero__zodiac-bg">
                    <svg viewBox="0 0 200 200" className="privacy-hero__zodiac-svg">
                        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" />
                        <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.15" />
                        <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" />
                        {[...Array(12)].map((_, i) => {
                            const angle = (i * 30 * Math.PI) / 180
                            const x1 = 100 + 55 * Math.cos(angle)
                            const y1 = 100 + 55 * Math.sin(angle)
                            const x2 = 100 + 95 * Math.cos(angle)
                            const y2 = 100 + 95 * Math.sin(angle)
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" />
                        })}
                        <circle cx="45" cy="55" r="1.5" fill="currentColor" className="star-blink-1" />
                        <circle cx="155" cy="65" r="1.2" fill="currentColor" className="star-blink-2" />
                        <circle cx="75" cy="145" r="2" fill="currentColor" className="star-blink-3" />
                        <circle cx="125" cy="35" r="1" fill="currentColor" className="star-blink-1" />
                    </svg>
                </div>
            </section>

            {/* ── Sticky Controls Bar ── */}
            <div className="privacy-controls">
                <div className="privacy-progress-bar" style={{ width: `${scrollPercent}%` }} />
                <div className="privacy-controls__inner">
                    <div className="privacy-toggle">
                        <button 
                            className={`privacy-toggle__btn ${activeMode === 'full' ? 'privacy-toggle__btn--active' : ''}`}
                            onClick={() => handleModeChange('full')}
                        >
                            <FiFileText /> Full Legal Details
                        </button>
                        <button 
                            className={`privacy-toggle__btn ${activeMode === 'tldr' ? 'privacy-toggle__btn--active' : ''}`}
                            onClick={() => handleModeChange('tldr')}
                        >
                            <FiCheck /> Quick Summary
                        </button>
                    </div>

                    <div className="privacy-search">
                        <input 
                            type="text" 
                            className="privacy-search__input" 
                            placeholder="Search privacy topics..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FiSearch className="privacy-search__icon" />
                    </div>
                </div>
            </div>

            {/* ── Content Container ── */}
            <div className={`privacy-container ${activeMode === 'tldr' ? 'privacy-container--full-width' : ''}`}>
                
                {/* ── TOC Sidebar (Full Mode Only) ── */}
                {activeMode === 'full' && (
                    <aside className="privacy-toc">
                        <h4 className="privacy-toc__title">Policy Chapters</h4>
                        <nav className="privacy-toc__list">
                            {filteredSections.map(sec => (
                                <button 
                                    key={sec.id}
                                    className={`privacy-toc__link ${activeSectionId === sec.id ? 'privacy-toc__link--active' : ''}`}
                                    onClick={() => scrollToSection(sec.id)}
                                >
                                    {sec.title}
                                </button>
                            ))}
                        </nav>
                    </aside>
                )}

                {/* ── Main Content ── */}
                <main className="privacy-main">
                    
                    {/* TL;DR Cards Grid */}
                    {activeMode === 'tldr' && (
                        <div className="privacy-tldr-grid">
                            {filteredSections.map((sec, index) => (
                                <article 
                                    key={sec.id} 
                                    className="privacy-tldr-card"
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    <div className="privacy-tldr-card__header">
                                        <span className="privacy-tldr-card__icon">{sec.icon}</span>
                                        <h3>{sec.title}</h3>
                                    </div>
                                    <p>{highlightText(sec.tldr)}</p>
                                    <button 
                                        type="button" 
                                        className="privacy-tldr-card__read-btn"
                                        onClick={() => {
                                            setActiveMode('full');
                                            setTimeout(() => scrollToSection(sec.id), 50);
                                        }}
                                    >
                                        Read Details <FiArrowRight />
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Full Text Sections */}
                    {activeMode === 'full' && (
                        <div className="privacy-content">
                            {filteredSections.length > 0 ? (
                                filteredSections.map(sec => (
                                    <section key={sec.id} id={sec.id} className="privacy-section">
                                        <div className="privacy-section__header">
                                            <span className="privacy-section__icon">{sec.icon}</span>
                                            <h2>{sec.title}</h2>
                                        </div>
                                        {sec.full.map((para, i) => {
                                            if (para.startsWith('•')) {
                                                return <p key={i} style={{ paddingLeft: '1.25rem' }}>{highlightText(para)}</p>
                                            }
                                            return <p key={i}>{highlightText(para)}</p>
                                        })}
                                    </section>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--text-muted)' }}>
                                    <FiInfo size={40} style={{ margin: '0 auto 1.2rem', display: 'block', color: 'var(--gold-primary)' }} />
                                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '0.6rem' }}>No Matching Sections</h3>
                                    <p>Try searching for terms like "birth details", "payment", or "consent".</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
