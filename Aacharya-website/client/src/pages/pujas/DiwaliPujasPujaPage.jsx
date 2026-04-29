import { useEffect, useMemo, useState } from 'react'
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi'
import './DiwaliFestivalPujaStyle.css'
import heroImg from '../../assets/puja/hero-lakshmi.jpg'
import diyasRow from '../../assets/puja/diyas-row.jpg'
import samagriImg from '../../assets/puja/samagri.jpg'
import panditImg from '../../assets/puja/pandit.jpg'

const PUJA_ID = 'diwali-lakshmi-puja'
const PUJA_NAME = 'Diwali Lakshmi Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const REASONS = [
  { title: 'Wealth & Prosperity', text: 'Invite Goddess Lakshmi to bless your home with abundance and financial growth.' },
  { title: 'Harmony at Home', text: 'Cleanse negative energy and fill your space with peace, warmth, and positivity.' },
  { title: 'Family Wellbeing', text: 'Strengthen bonds and surround your loved ones with divine protection.' },
  { title: 'New Beginnings', text: 'Mark Diwali with auspicious rituals that set the tone for the year ahead.' },
]

const BENEFITS = [
  { title: 'Divine Blessings', text: 'Receive direct grace of Maa Lakshmi and Lord Ganesha.' },
  { title: 'Financial Growth', text: 'Open pathways for wealth, success and new opportunities.' },
  { title: 'Protection', text: 'Shield your home from negativity and evil influences.' },
  { title: 'Inner Peace', text: 'Experience calm, clarity and spiritual fulfilment.' },
  { title: 'Positive Energy', text: 'Purify your living space with sacred mantras and havan.' },
  { title: 'Lasting Prosperity', text: 'Sow seeds of fortune that grow throughout the year.' },
]

const STEPS = [
  { n: '01', title: 'Sankalp', text: 'Pandit ji begins with the sacred vow, taking your name and gotra for personalised intention.' },
  { n: '02', title: 'Ganesh Pujan', text: 'Worship of Lord Ganesha to remove all obstacles before invoking Maa Lakshmi.' },
  { n: '03', title: 'Kalash Sthapana', text: 'A holy kalash is established to invite divine presence into your home.' },
  { n: '04', title: 'Lakshmi Avahan', text: 'Goddess Lakshmi is invoked through Vedic mantras and shodashopachara.' },
  { n: '05', title: 'Aarti & Havan', text: 'Sacred fire ritual and aarti to seal blessings of wealth and prosperity.' },
  { n: '06', title: 'Prasad & Ashirvad', text: 'Distribution of prasad and personal blessings for every family member.' },
]

const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2100,
    tagline: 'Essential Blessings',
    popular: false,
    features: ['1 Verified Pandit', '60 minute Puja', 'Standard Samagri Kit', 'Live Sankalp', 'Digital Prasad Photo'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 5100,
    tagline: 'Most Chosen',
    popular: true,
    features: ['2 Verified Pandits', '2 hour Puja with Havan', 'Premium Samagri Kit', 'Personalised Sankalp', 'Aarti & Mantra Recital', 'Prasad delivered home'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 11100,
    tagline: 'Royal Experience',
    popular: false,
    features: ['4 Vedic Pandits', 'Full ceremony with Havan', 'Royal Silver Samagri Kit', '108 Lakshmi Mantra Jaap', 'Live HD Streaming', 'Silver coin & Yantra gift', 'Prasad + Ganga jal home delivery'],
  },
]

export default function DiwaliPujasPujaPage() {
  const [selectedPkg, setSelectedPkg] = useState('standard')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gotra: '',
    date: '',
    time: '',
    message: '',
  })
  const [availability, setAvailability] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState('')
  const [bookedInfo, setBookedInfo] = useState(null)

  useEffect(() => {
    document.body.classList.add('dw-page-active')
    return () => document.body.classList.remove('dw-page-active')
  }, [])

  useEffect(() => {
    if (!form.date) {
      setAvailability(null)
      return
    }
    fetch(`${API_BASE}/api/puja-bookings/availability?pujaId=${PUJA_ID}&date=${form.date}`)
      .then(r => r.json())
      .then(data => setAvailability(data))
      .catch(() => setAvailability(null))
  }, [form.date])

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
    if (status !== 'idle') {
      setStatus('idle')
      setStatusMsg('')
    }
  }

  const isTimeConflict = time => {
    if (!availability || !time) return false
    return availability.bookedTimeWindows?.some(({ start, end }) => {
      const toMin = t => {
        const [h, m] = t.split(':').map(Number)
        return h * 60 + m
      }
      const chosen = toMin(time)
      return chosen >= toMin(start) && chosen < toMin(end)
    })
  }

  const timeHint = useMemo(() => {
    if (!availability) return null
    if (!availability.available) return { type: 'error', msg: 'No puja slots available for this date. Please choose another date.' }
    if (form.time && isTimeConflict(form.time)) return { type: 'error', msg: 'This time is within a locked slot. Please choose a time outside locked windows.' }
    return { type: 'ok', msg: `${availability.remainingSlots} slot(s) remaining today.` }
  }, [availability, form.time])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setStatus('error')
      setStatusMsg('Please fill all required fields.')
      return
    }
    if (isTimeConflict(form.time)) {
      setStatus('error')
      setStatusMsg('Your chosen time conflicts with an existing booking. Please pick another slot.')
      return
    }

    const pkg = PACKAGES.find(p => p.id === selectedPkg)
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/puja-bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pujaId: PUJA_ID,
          pujaName: PUJA_NAME,
          name: form.name,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          timeOfBirth: form.timeOfBirth,
          gotra: form.gotra,
          fatherName: form.fatherName,
          birthPlace: form.birthPlace,
          pinCode: form.pinCode,
          pujaPurpose: form.pujaPurpose,
          fullAddress: form.fullAddress,
          nearestLandmark: form.nearestLandmark,
          sankalpPlace: form.sankalpPlace,
          bookingDate: form.date,
          startTime: form.time,
          package: selectedPkg,
          amount: pkg?.price || 0,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed.')
      setStatus('success')
      setStatusMsg(data.message)
      setBookedInfo(data.booking)
    } catch (err) {
      setStatus('error')
      setStatusMsg(err.message)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const scrollToBooking = () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="dw-page">
      {/* HERO */}
      <section className="dw-hero" aria-label="Diwali Lakshmi Puja Hero">
        <div className="dw-hero-bg">
          <img src={heroImg} alt="Goddess Lakshmi puja with pandit and family during Diwali" className="dw-hero-img" />
          <div className="dw-hero-overlay" />
          <div className="dw-hero-overlay-2" />
        </div>

        <div className="dw-sparkles" aria-hidden="true" />
        <div className="dw-aura" aria-hidden="true" />

        <div className="dw-container dw-hero-inner">
          <div className="dw-hero-badge">Diwali Special 2025</div>
          <h1 className="dw-hero-title">
            <span>Diwali</span>
            <span className="dw-hero-title-accent">Lakshmi Puja</span>
          </h1>
          <p className="dw-hero-quote">"Invite wealth, prosperity, and divine blessings into your home this Diwali."</p>

          <div className="dw-hero-cta">
            <button type="button" className="dw-btn dw-btn-primary" onClick={scrollToBooking}>
              Book This Puja Now
            </button>
            <button type="button" className="dw-link" onClick={scrollToAbout}>
              Learn More
            </button>
          </div>

          <div className="dw-trust-strip" aria-label="Trust Indicators">
            <span>Verified Pandits</span>
            <span className="dw-dot">•</span>
            <span>1000+ Pujas</span>
            <span className="dw-dot">•</span>
            <span>100% Authentic</span>
          </div>
        </div>
      </section>

      {/* WHAT IS THIS PUJA */}
      <section id="about" className="dw-section dw-about">
        <div className="dw-container dw-about-inner">
          <div className="dw-divider">
            <span className="dw-divider-line" />
            <span className="dw-divider-label">The Sacred Tradition</span>
            <span className="dw-divider-line" />
          </div>

          <h2 className="dw-h2">
            What is <span className="dw-gold">Lakshmi Puja</span>?
          </h2>
          <p className="dw-lead">
            On the night of Diwali, families across India light diyas, draw rangolis and welcome
            <span className="dw-strong"> Goddess Lakshmi</span> — the giver of wealth, prosperity and well-being — into their homes.
            Performed alongside <span className="dw-strong">Lord Ganesha</span>, the remover of obstacles, this puja is a heartfelt invitation for
            abundance, harmony and divine grace to settle in your life for the year ahead.
          </p>
          <p className="dw-muted-italic">
            A tradition passed through generations — performed today by trusted Vedic pandits at your home.
          </p>
        </div>
      </section>

      {/* WHY PEOPLE PERFORM */}
      <section className="dw-section dw-why">
        <div className="dw-why-dots" aria-hidden="true" />
        <div className="dw-container">
          <div className="dw-center">
            <div className="dw-divider">
              <span className="dw-divider-line" />
              <span className="dw-divider-label">The Reason</span>
              <span className="dw-divider-line" />
            </div>
            <h2 className="dw-h2">Why families perform this puja</h2>
            <p className="dw-sub">More than ritual — it is a moment of intention, gratitude and renewal.</p>
          </div>

          <div className="dw-grid dw-grid-2">
            {REASONS.map((r, i) => (
              <div key={i} className="dw-card dw-reason-card">
                <div className="dw-card-orb" aria-hidden="true" />
                <div className="dw-reason-icon" aria-hidden="true" />
                <div>
                  <h3 className="dw-h3">{r.title}</h3>
                  <p className="dw-p">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="dw-section dw-benefits">
        <div className="dw-benefits-bg" style={{ backgroundImage: `url(${diyasRow})` }} aria-hidden="true" />
        <div className="dw-container">
          <div className="dw-center">
            <div className="dw-divider dw-divider-invert">
              <span className="dw-divider-line" />
              <span className="dw-divider-label">The Blessings</span>
              <span className="dw-divider-line" />
            </div>
            <h2 className="dw-h2 dw-invert">
              Benefits of <span className="dw-shimmer">Lakshmi Puja</span>
            </h2>
            <p className="dw-sub dw-sub-invert">Spiritual grace and tangible transformation in your everyday life.</p>
          </div>

          <div className="dw-grid dw-grid-3">
            {BENEFITS.map((b, i) => (
              <div key={i} className="dw-benefit-card">
                <div className="dw-benefit-icon" aria-hidden="true" />
                <h3 className="dw-h3 dw-h3-invert">{b.title}</h3>
                <p className="dw-p dw-p-invert">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="dw-section dw-process">
        <div className="dw-container">
          <div className="dw-process-grid">
            <div className="dw-process-image-wrap">
              <div className="dw-process-glow" aria-hidden="true" />
              <img src={samagriImg} alt="Authentic puja samagri arranged on brass thali" className="dw-process-img" loading="lazy" />
              <div className="dw-process-badge">
                <p className="dw-process-badge-kicker">Authentic</p>
                <p className="dw-process-badge-title">Samagri Kit</p>
                <p className="dw-process-badge-sub">Sourced from Varanasi</p>
              </div>
            </div>

            <div>
              <div className="dw-divider">
                <span className="dw-divider-line" />
                <span className="dw-divider-label">The Process</span>
                <span className="dw-divider-line" />
              </div>
              <h2 className="dw-h2">
                Performed with <span className="dw-gold">authenticity</span>
              </h2>
              <p className="dw-sub">A six-step Vedic ceremony, conducted exactly as the shastras prescribe.</p>

              <div className="dw-steps">
                {STEPS.map((s, i) => (
                  <div key={i} className="dw-step">
                    <div className="dw-step-n">{s.n}</div>
                    <div className="dw-step-line">
                      <div className="dw-step-content">
                        <h3 className="dw-step-title">{s.title}</h3>
                        <p className="dw-step-text">{s.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="dw-section dw-packages">
        <div className="dw-container">
          <div className="dw-center">
            <div className="dw-divider">
              <span className="dw-divider-line" />
              <span className="dw-divider-label">Choose Your Puja</span>
              <span className="dw-divider-line" />
            </div>
            <h2 className="dw-h2">
              Packages crafted for <span className="dw-gold">every devotee</span>
            </h2>
            <p className="dw-sub">Transparent pricing. No hidden costs. Authentic from start to finish.</p>
          </div>

          <div className="dw-grid dw-grid-3 dw-pack-grid">
            {PACKAGES.map(p => (
              <div
                key={p.id}
                className={`dw-pack-card ${p.popular ? 'is-popular' : ''} ${selectedPkg === p.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedPkg(p.id)}
                role="button"
                tabIndex={0}
              >
                {p.popular && <div className="dw-pack-chip">Most Chosen</div>}
                <p className={`dw-pack-tagline ${p.popular ? 'invert' : ''}`}>{p.tagline}</p>
                <h3 className={`dw-pack-name ${p.popular ? 'invert' : ''}`}>{p.name}</h3>
                <div className="dw-pack-price">
                  <span className={`dw-pack-currency ${p.popular ? 'invert' : ''}`}>₹</span>
                  <span className={`dw-pack-amount ${p.popular ? 'invert' : ''}`}>{p.price.toLocaleString('en-IN')}</span>
                </div>
                <div className={`dw-pack-divider ${p.popular ? 'invert' : ''}`} />
                <ul className={`dw-pack-features ${p.popular ? 'invert' : ''}`}>
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <FiCheck />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className={`dw-btn dw-btn-package ${p.popular ? 'is-gold' : ''}`} onClick={scrollToBooking}>
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="dw-section dw-booking">
        <div className="dw-container dw-book-grid">
          <div className="dw-book-info">
            <div className="dw-divider dw-divider-invert">
              <span className="dw-divider-line" />
              <span className="dw-divider-label">Book Now</span>
              <span className="dw-divider-line" />
            </div>
            <h2 className="dw-h2 dw-invert">
              Reserve your <span className="dw-shimmer">divine</span> moment
            </h2>
            <p className="dw-sub dw-sub-invert">Slots fill quickly during Diwali. Confirm your puja with a verified pandit today.</p>

            <div className="dw-book-image-wrap">
              <img src={panditImg} alt="Verified Vedic pandit performing havan" className="dw-book-img" loading="lazy" />
            </div>
          </div>

          <div className="dw-book-card">
            {status === 'success' ? (
              <div className="dw-success">
                <div className="dw-success-icon">
                  <FiCheck />
                </div>
                <h3>Puja Booked Successfully! 🙏</h3>
                <p>{statusMsg}</p>
                {bookedInfo && (
                  <div className="dw-booking-summary">
                    <p>
                      <strong>Date:</strong> {bookedInfo.bookingDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime} (slot locked)
                    </p>
                    <p>
                      <strong>Status:</strong> {bookedInfo.status}
                    </p>
                  </div>
                )}
                <p className="dw-success-note">Our team will call you within 2 hours to confirm your slot and guide you through the virtual participation process.</p>
              </div>
            ) : (
              <form className="dw-form" onSubmit={handleSubmit}>
                <div className="dw-form-grid">
                  <div className="dw-form-group">
                    <label>
                      <FiUser /> Full Name *
                    </label>
                    <input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="dw-form-group">
                    <label>
                      <FiMail /> Email Address *
                    </label>
                    <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="dw-form-group">
                    <label>
                      <FiPhone /> Phone Number *
                    </label>
                    <input name="phone" type="tel" placeholder="+91 98xxxxxxxx" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="dw-form-group">
                    <label>
                      <FiMapPin /> Address / City
                    </label>
                    <input name="address" placeholder="City, area" value={form.address} onChange={handleChange} />
                  </div>
                  <div className="dw-form-group">
                    <label>Gotra (optional)</label>
                    <input name="gotra" placeholder="e.g. Kashyap" value={form.gotra} onChange={handleChange} />
                  </div>
                  <div className="dw-form-group">
                    <label>
                      <FiCalendar /> Puja Date *
                    </label>
                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                    {availability && (
                      <div className={`dw-avail ${availability.available ? 'ok' : 'full'}`}>
                        {availability.available ? `${availability.remainingSlots}/${availability.totalSlots} slots available` : 'No slots available for this date'}
                      </div>
                    )}
                  </div>
                  <div className="dw-form-group">
                    <label>
                      <FiClock /> Preferred Start Time *
                    </label>
                    <input name="time" type="time" value={form.time} onChange={handleChange} required min="05:00" max="19:00" step="1800" />
                    {timeHint && (
                      <div className={`dw-hint ${timeHint.type}`}>
                        {timeHint.type === 'error' ? <FiAlertCircle /> : <FiCheck />} {timeHint.msg}
                      </div>
                    )}
                    <p className="dw-time-note">⚠ Each booking locks a 5-hour window. Max 5 pujas per day.</p>
                  </div>
                  <div className="dw-form-group dw-full">
                    <label>
                      <FiMessageSquare /> Special Message / Wishes
                    </label>
                    <textarea name="message" rows={3} placeholder="Share your intention for this puja..." value={form.message} onChange={handleChange} />
                  </div>
                </div>

                <div className="dw-form-summary">
                  <span>
                    Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong>
                  </span>
                  <span>
                    Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong>
                  </span>
                </div>

                {status === 'error' && (
                  <div className="dw-error">
                    <FiAlertCircle /> {statusMsg}
                  </div>
                )}

                <button type="submit" className="dw-btn dw-btn-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="dw-spin" /> Processing...
                    </>
                  ) : (
                    '🪔 Confirm Puja Booking'
                  )}
                </button>
                <p className="dw-form-footnote">Our team will call you within 30 minutes to confirm.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="dw-footer">
        <div className="dw-container dw-center">
          <div className="dw-footer-hi">शुभ दीपावली</div>
          <p className="dw-footer-copy">© {new Date().getFullYear()} Divine Pujas — Performed with devotion, delivered with trust.</p>
        </div>
      </footer>
    </div>
  )
}
