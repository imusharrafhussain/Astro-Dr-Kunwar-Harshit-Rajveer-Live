import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './KundliMatchingPage.css'
import './ServiceShowcasePage.css'

function ServiceModal({ service, onClose }) {
  const [step, setStep] = useState('info')
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const initial = {}
    service.formFields.forEach((f) => {
      initial[f.name] = ''
    })
    setFormData(initial)
  }, [service])

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="km-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="km-modal-card" role="dialog" aria-modal="true">
        <button className="km-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="km-modal-header">
          <div className="km-modal-icon">{service.icon}</div>
          <div>
            <h2 className="km-modal-title">{service.title}</h2>
            <p className="km-modal-meta">{service.duration} &nbsp;•&nbsp; {service.price}</p>
          </div>
        </div>

        <div className="km-modal-tabs">
          <button className={`km-tab-btn ${step === 'info' ? 'km-tab-active' : ''}`} onClick={() => setStep('info')}>
            Service Details
          </button>
          <button className={`km-tab-btn ${step === 'form' ? 'km-tab-active' : ''}`} onClick={() => setStep('form')}>
            Book Consultation
          </button>
        </div>

        {step === 'info' && (
          <div className="km-modal-body">
            <p className="km-modal-long-desc">{service.longDesc}</p>
            <h4 className="km-modal-benefits-title">What You'll Receive</h4>
            <ul className="km-modal-benefits">
              {service.benefits.map((b) => (
                <li key={b}>
                  <span className="km-check">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="km-modal-contact-cta">
              <div className="km-cta-icon">🧙</div>
              <div>
                <p className="km-cta-label">Need personalized guidance?</p>
                <p className="km-cta-sub">Talk directly to our expert astrologer for this service</p>
              </div>
              <Link to="/contact" className="km-btn-outline km-cta-link" onClick={onClose}>
                Contact Astrologer
              </Link>
            </div>

            <button className="km-btn-solid km-modal-cta-btn" onClick={() => setStep('form')}>
              Book This Service — {service.price} →
            </button>
          </div>
        )}

        {step === 'form' && (
          <div className="km-modal-body">
            {submitted ? (
              <div className="km-modal-success">
                <div className="km-success-icon">🎉</div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for booking <strong>{service.title}</strong>. Our astrologer will contact you shortly.</p>
                <button className="km-btn-solid" onClick={onClose}>Close</button>
              </div>
            ) : (
              <>
                <p className="km-form-intro">
                  Fill in the details below for your <strong>{service.title}</strong> consultation.
                </p>
                <form className="km-modal-form" onSubmit={handleSubmit}>
                  <div className="km-modal-fields">
                    {service.formFields.map((field) => (
                      <div key={field.name} className="km-modal-field">
                        <label htmlFor={`modal-${field.name}`}>{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            id={`modal-${field.name}`}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>Select…</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`modal-${field.name}`}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="km-btn-solid km-modal-cta-btn">Confirm Booking</button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServiceShowcasePage({ config }) {
  const [activeModal, setActiveModal] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeTrust, setActiveTrust] = useState(0)
  const [search, setSearch] = useState('')
  const [durationFilter, setDurationFilter] = useState('all')
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', service: config.formDefaultService, date: '', time: '', message: '' })

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Booking confirmed! We will contact you shortly.')
  }

  const durationOptions = useMemo(
    () => ['all', ...Array.from(new Set(config.services.map((s) => s.duration)))],
    [config.services]
  )

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase()
    return config.services.filter((svc) => {
      const matchesSearch =
        !term ||
        svc.title.toLowerCase().includes(term) ||
        svc.desc.toLowerCase().includes(term) ||
        svc.benefits.some((b) => b.toLowerCase().includes(term))
      const matchesDuration = durationFilter === 'all' || svc.duration === durationFilter
      return matchesSearch && matchesDuration
    })
  }, [config.services, search, durationFilter])

  const processSteps = config.processSteps || []
  const faqs = config.faqs || []

  return (
    <div className={`km-page ss-page ss-page--${config.variant || 'default'} page-wrapper`}>
      {activeModal && <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />}

      <section className="km-hero">
        <div className="container km-hero-inner">
          <div className="km-hero-text">
            <div className="km-hero-badge">{config.heroBadge}</div>
            <h1 className="km-hero-title">
              {config.heroTitleLine1} <span>{config.heroTitleHighlight}</span><br />{config.heroTitleLine2}
            </h1>
            <p className="km-hero-desc">{config.heroDesc}</p>
            <div className="km-hero-stats">
              {config.heroStats.map((s) => (
                <div key={s.label} className="km-hero-stat">
                  <span className="km-hero-stat-num">{s.value}</span>
                  <span className="km-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="km-hero-btns">
              <Link to="/book" className="km-btn-solid">Book Consultation</Link>
              <Link to="/contact" className="km-btn-outline">Consult Astrologer</Link>
            </div>
          </div>

          <div className="km-hero-visual" aria-hidden="true">
            <img src={config.heroImage} alt="" className="km-hero-kundli-img" width={960} height={960} decoding="async" />
          </div>
        </div>
      </section>

      <div className="km-divider"><span>◆</span></div>

      <section className="km-services-section">
        <div className="container">
          <h2 className="km-section-title">{config.servicesTitle}</h2>
          <div className="ss-service-tools">
            <div className="ss-service-search">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by service name or benefit"
                aria-label="Search services"
              />
            </div>
            <div className="ss-service-filter">
              <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} aria-label="Filter by duration">
                {durationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d === 'all' ? 'All Durations' : d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="ss-service-count">{filteredServices.length} service{filteredServices.length === 1 ? '' : 's'} available</p>
          <div className="km-services-grid">
            {filteredServices.map((svc) => (
              <div key={svc.id} className="km-service-card glass-panel">
                <div className="km-svc-icon">{svc.icon}</div>
                <h3 className="km-svc-title">{svc.title}</h3>
                <p className="km-svc-desc">{svc.desc}</p>
                <div className="ss-svc-meta">
                  <span>{svc.duration}</span>
                  <span>{svc.price}</span>
                </div>
                <button className="km-view-btn" onClick={() => setActiveModal(svc)}>
                  View Details <span>›</span>
                </button>
              </div>
            ))}
          </div>
          {!filteredServices.length && (
            <div className="ss-no-results">
              <p>No service found for your search/filter.</p>
              <button type="button" className="km-btn-outline" onClick={() => { setSearch(''); setDurationFilter('all') }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {!!processSteps.length && (
        <section className="ss-process-section">
          <div className="container">
            <h2 className="km-section-title">How It Works</h2>
            <div className="ss-process-grid">
              {processSteps.map((step, i) => (
                <article key={step.title} className="ss-process-card glass-panel">
                  <span className="ss-process-index">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="km-guna-section">
        <div className="container km-guna-inner">
          <div className="km-guna-card">
            <h3 className="km-guna-title">{config.highlightTitle}</h3>
            <p className="km-guna-sub">{config.highlightDesc}</p>
            <ul className="km-modal-benefits">
              {config.highlightPoints.map((p) => (
                <li key={p}>
                  <span className="km-check">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="km-btn-solid km-guna-btn">Consult Our Astrologer</Link>
          </div>

          <div className="km-testimonials">
            <h2 className="km-section-title" style={{ textAlign: 'center' }}>What Our Customers Say</h2>
            <div className="km-testimonial-cards">
              {config.testimonials.map((t, i) => (
                <div key={t.name} className={`km-testimonial-card ${i === activeTestimonial ? 'km-t-active' : ''}`}>
                  <img src={t.avatar} alt={t.name} className="km-avatar" />
                  <div>
                    <div className="km-t-name">{t.name}</div>
                    <div className="km-stars">{'★'.repeat(t.rating)}</div>
                    <p className="km-t-text">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="km-dots">
              {config.testimonials.map((_, i) => (
                <button key={i} className={`km-dot ${i === activeTestimonial ? 'km-dot-active' : ''}`} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="km-bottom-section">
        <div className="container km-bottom-inner">
          <div className="km-form-card glass-panel">
            <h3 className="km-form-title">Consultation Form</h3>
            <form className="km-form" onSubmit={handleSubmit}>
              <div className="km-form-row">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="km-form-row km-form-row-split">
                <div>
                  <label>Service</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    {config.services.map((s) => <option key={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label>Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="km-form-row">
                <label>Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Message</label>
                <textarea name="message" rows={3} placeholder="Your message..." value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="km-btn-solid km-form-submit">Confirm Booking</button>
            </form>
          </div>

          <div className="km-trust-section">
            <h2 className="km-section-title" style={{ textAlign: 'center' }}>Why Trust Us?</h2>
            <div className="km-trust-cards">
              {config.trustPoints.map((tp, i) => (
                <div key={tp.title} className={`km-trust-card glass-panel ${i === activeTrust ? 'km-t-active' : ''}`}>
                  <div className="km-trust-icon">{tp.icon}</div>
                  <div>
                    <h4 className="km-trust-title">{tp.title}</h4>
                    <p className="km-trust-desc">{tp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="km-dots">
              {config.trustPoints.map((_, i) => (
                <button key={i} className={`km-dot ${i === activeTrust ? 'km-dot-active' : ''}`} onClick={() => setActiveTrust(i)} aria-label={`Trust point ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {!!faqs.length && (
        <section className="ss-faq-section">
          <div className="container">
            <h2 className="km-section-title">Frequently Asked Questions</h2>
            <div className="ss-faq-list">
              {faqs.map((faq, i) => (
                <article key={faq.q} className={`ss-faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button type="button" className="ss-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{faq.q}</span>
                    <span>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <p className="ss-faq-a">{faq.a}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
