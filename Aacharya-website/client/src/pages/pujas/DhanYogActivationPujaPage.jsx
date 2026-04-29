import { useState, useEffect } from 'react'
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
  FiShield,
  FiHome,
  FiBriefcase,
  FiAward,
} from 'react-icons/fi'
import { GiSparkles, GiFlame, GiLotus, GiReceiveMoney } from 'react-icons/gi'
import heroImage from '../../Marriage/dhan yog.webp'
import pujaImage from '../../Marriage/dhan yog (2).webp'
import mandalaImage from '../../Marriage/dhan yog.webp'
import './LakshmiPraptiStyle.css'

const PUJA_ID = 'dhan-yog-activation-puja'
const PUJA_NAME = 'Dhan Yog Activation Puja'
const MANTRA = "Om Shreem Mahalakshmiyei Namaha"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
  {
    id: 'basic',
    name: 'Saral Dhan Yog Activation Puja',
    price: 5100,
    duration: '1.5 hours',
    features: ['Sankalp and core mantra path', 'Basic samagri and puja setup', 'Aarti and prasad blessing', 'Online participation support'],
  },
  {
    id: 'standard',
    name: 'Shubh Dhan Yog Activation Puja',
    price: 11100,
    duration: '3 hours',
    features: ['Everything in Saral package', 'Extended mantra japa', 'Havan with focused ahutis', 'Personalized intention sankalp', 'Prasad dispatch support'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Divya Dhan Yog Activation Puja Anushthan',
    price: 21100,
    duration: '5-6 hours',
    features: ['Complete Vedic anushthan', 'Advanced mantra and ritual sequence', 'Expanded havan process', 'Personalized chart-aware remedies', 'Priority pandit support'],
  },
]

const REASONS = [
  "Astrology enthusiasts who discover Dhan Yogas in their birth chart but are not experiencing financial abundance perform this puja to activate those sleeping wealth combinations.",
  "People undergoing powerful Dasha periods — Mahadasha of Jupiter, Venus, or Mercury — perform this puja to maximise the wealth-giving potential of these auspicious planetary periods.",
  "Individuals who feel chronically underpaid, financially stuck despite talent, or unable to accumulate savings perform this puja as a karmic wealth correction ritual.",
  "Wealth-conscious individuals performing Jyotish-guided remedies choose this puja to specifically strengthen the 2nd house, 11th house, and wealth-giving planets in their horoscope.",
  "Families wishing to break generational poverty patterns perform this puja as an ancestral healing and activation ritual, resetting the family's wealth karma for future generations.",
  "Individuals entering new financial ventures, investments, or wealth-building phases perform this puja to align their new financial chapter with their highest astrological wealth destiny."
]
const BENEFITS = [
  {
    "title": "Benefit 1",
    "desc": "Activates dormant Dhan Yogas in the birth chart, converting astrological potential into real-world financial abundance."
  },
  {
    "title": "Benefit 2",
    "desc": "Strengthens wealth planets (Jupiter, Venus, Mercury, Sun) and maximises their positive effects on income and assets."
  },
  {
    "title": "Benefit 3",
    "desc": "Creates a powerful energetic shift that attracts sudden unexpected wealth, windfalls, inheritances, and financial surprises."
  },
  {
    "title": "Benefit 4",
    "desc": "Neutralises malefic planetary influences (Rahu, Ketu, Saturn) that create financial destruction and unexpected losses."
  },
  {
    "title": "Benefit 5",
    "desc": "Opens multiple simultaneous income streams, creating diversified and unstoppable wealth from various directions."
  },
  {
    "title": "Benefit 6",
    "desc": "Permanently reprograms your subconscious wealth mindset, erasing poverty consciousness and installing divine abundance mentality."
  }
]
const PROCESS = [
  {
    "title": "Consult a Jyotish expert to identify specific Dh",
    "sub": "Consult a Jyotish expert to identify specific Dhan Yogas present in your birth chart before beginning the puja."
  },
  {
    "title": "Select the auspicious day aligned with your weal",
    "sub": "Select the auspicious day aligned with your wealth-giving planetary dasha or antar-dasha for maximum activation."
  },
  {
    "title": "Set up a golden cloth altar with a Shri Yantra (",
    "sub": "Set up a golden cloth altar with a Shri Yantra (Shri Chakra) as the central focal point of wealth activation."
  },
  {
    "title": "Place idols of Lord Kuber, Goddess Lakshmi, and",
    "sub": "Place idols of Lord Kuber, Goddess Lakshmi, and planet-specific deity based on your chart's strongest Dhan Yoga planet."
  },
  {
    "title": "Energise the Shri Yantra with panchamrit (milk,",
    "sub": "Energise the Shri Yantra with panchamrit (milk, honey, curd, ghee, and Ganga Jal) and chant its installation mantra."
  },
  {
    "title": "Perform planet-specific havan (fire ritual) with",
    "sub": "Perform planet-specific havan (fire ritual) with herbs, seeds, and ingredients corresponding to each wealth planet."
  },
  {
    "title": "Chant the Dhan Yoga activation mantra 1008 times",
    "sub": "'Om Shreem Mahalakshmiyei Namaha' with a japa mala."
  }
]

export default function DhanYogActivationPujaPage() {
  const [selectedPkg, setSelectedPkg] = useState('standard')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'male',
    dateOfBirth: '',
    timeOfBirth: '',
    gotra: '',
    fatherName: '',
    birthPlace: '',
    pinCode: '',
    pujaPurpose: '',
    fullAddress: '',
    nearestLandmark: '',
    sankalpPlace: '',
    date: '',
    time: '',
    message: '',
    agreeTerms: false,
  })

  const [availability, setAvailability] = useState(null)
  const [status, setStatus] = useState('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [bookedInfo, setBookedInfo] = useState(null)

  useEffect(() => {
    if (!form.date) { setAvailability(null); return }
    fetch(`${API_BASE}/api/puja-bookings/availability?pujaId=${PUJA_ID}&date=${form.date}`)
      .then(r => r.json())
      .then(data => setAvailability(data))
      .catch(() => setAvailability(null))
  }, [form.date])

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
    if (status !== 'idle') { setStatus('idle'); setStatusMsg('') }
  }

  const isTimeConflict = time => {
    if (!availability || !time) return false
    return availability.bookedTimeWindows?.some(({ start, end }) => {
      const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
      const chosen = toMin(time)
      return chosen >= toMin(start) && chosen < toMin(end)
    })
  }

  const getTimeHint = () => {
    if (!availability) return null
    if (!availability.available) return { type: 'error', msg: 'No puja slots available for this date. Please choose another date.' }
    if (form.time && isTimeConflict(form.time)) return { type: 'error', msg: 'This time is within a locked slot. Please choose a time outside locked windows.' }
    return { type: 'ok', msg: `${availability.remainingSlots} slot(s) remaining today.` }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setStatus('error'); setStatusMsg('Please fill all required fields.'); return
    }
    if (isTimeConflict(form.time)) {
      setStatus('error'); setStatusMsg('Your chosen time conflicts with an existing booking. Please pick another slot.'); return
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

  const hint = getTimeHint()
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="lp-page">
      <section className="lp-hero" id="top">
        <div className="lp-bg-gradient" />
        <img src={mandalaImage} alt="" className="lp-mandala lp-mandala-right" />
        <img src={mandalaImage} alt="" className="lp-mandala lp-mandala-left" />
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-content">
            <span className="lp-pill"><GiSparkles /> Vedic Wealth Ritual</span>
            <h1>Dhan Yog Activation <span>Puja</span></h1>
            {MANTRA ? (
              <p className="lp-mantra">{MANTRA}</p>
            ) : (
              <p className="lp-mantra" style={{ opacity: 0.7 }}>ॐ शुभं भवतु</p>
            )}
            <p className="lp-subtitle">Dhan Yog Activation Puja is one of the most advanced and personalised Vedic rituals available — it is based on the profound science of Jyotish (Vedic Astrology) and is designed to specifically activate the wealth-giving …</p>
            <div className="lp-cta-row">
              <a href="#booking" className="lp-btn lp-btn-primary">Book Your Puja</a>
              <a href="#packages" className="lp-btn lp-btn-outline">View Packages</a>
            </div>
            <div className="lp-proof-row">
              <div><FiCheck /> 5000+ Pujas Done</div>
              <div><FiCheck /> Verified Pandits</div>
              <div><FiCheck /> Live Streaming</div>
            </div>
          </div>
          <div className="lp-hero-art">
            <div className="lp-glow" />
            <img src={heroImage} alt="Dhan Yog Activation Puja" />
            <div className="lp-floating-card">
              <GiFlame />
              <div>
                <p>Next Auspicious Date</p>
                <strong>Friday - Pushya Nakshatra</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-about">
        <div className="lp-container lp-about-grid">
          <div className="lp-about-image-wrap">
            <img src={pujaImage} alt="Dhan Yog Activation Puja setup" className="lp-about-image" />
            <div className="lp-about-badge">Authentic Vedic Vidhi</div>
          </div>
          <div className="lp-about-copy">
            <p className="lp-label">What is this puja?</p>
            <h2>The Sacred Ritual of <span>Prosperity</span></h2>
            <p>Dhan Yog Activation Puja is one of the most advanced and personalised Vedic rituals available — it is based on the profound science of Jyotish (Vedic Astrology) and is designed to specifically activate the wealth-giving planetary combinations (Dhan Yogas) present in your individual birth chart. In Vedic astrology, Dhan Yoga is formed when the lords of the 1st, 2nd, 5th, 9th, and 11th houses form powerful associations — but having a Dhan Yoga in your chart does not automatically mean you will experience its full ben…</p>
            <p>Why devotees perform it: Astrology enthusiasts who discover Dhan Yogas in their birth chart but are not experiencing financial abundance perform this puja to activate those sleeping wealth combinations.</p>
            <div className="lp-about-stats">
              <div><strong>5000+</strong><span>Devotees Blessed</span></div>
              <div><strong>15+ yrs</strong><span>Pandit Experience</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-reasons">
        <div className="lp-container">
          <p className="lp-label center">Why perform it</p>
          <h2 className="lp-title center">The Reason Behind the Ritual</h2>
          <div className="lp-reason-grid">
            {REASONS.map(reason => (
              <div className="lp-reason-card" key={reason}><GiLotus /> {reason}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <p className="lp-label center">Divine Benefits</p>
          <h2 className="lp-title center">Blessings You Receive</h2>
          <div className="lp-benefit-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="lp-benefit-card">
                <div className="lp-benefit-icon">
                  {i % 6 === 0 ? <GiReceiveMoney /> : i % 6 === 1 ? <FiShield /> : i % 6 === 2 ? <FiHome /> : i % 6 === 3 ? <FiBriefcase /> : i % 6 === 4 ? <GiSparkles /> : <FiAward />}
                </div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-process">
        <div className="lp-container">
          <p className="lp-label center">Sacred Vidhi</p>
          <h2 className="lp-title center">The Puja Process</h2>
          <div className="lp-steps-grid">
            {PROCESS.map((s, i) => (
              <div key={s.title} className="lp-step-card" style={{ '--i': i }}>
                <div className="lp-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section" id="packages">
        <div className="lp-container">
          <p className="lp-label center">Puja Packages</p>
          <h2 className="lp-title center">Choose Your Anushthan</h2>
          <div className="lp-packages">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                className={`lp-package-card ${selectedPkg === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPkg(pkg.id)}
              >
                {pkg.popular && <div className="lp-popular-badge">Most Popular</div>}
                <h3>{pkg.name}</h3>
                <div className="lp-price">
                  <span className="lp-price-currency">₹</span>
                  <span className="lp-price-amount">{pkg.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="lp-duration"><FiClock /> {pkg.duration}</div>
                <ul className="lp-features">
                  {pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}
                </ul>
                <div className={`lp-select-btn ${selectedPkg === pkg.id ? 'active' : ''}`}>
                  {selectedPkg === pkg.id ? '✓ Selected' : 'Select Package'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-booking" id="booking">
        <div className="lp-container">
          <p className="lp-label center">Book Your Puja</p>
          <h2 className="lp-title center">Begin Your Journey to Prosperity</h2>

          {status === 'success' ? (
            <div className="lp-success-card">
              <div className="lp-success-icon"><FiCheck /></div>
              <h3>Puja Booked Successfully! 🙏</h3>
              <p>{statusMsg}</p>
              {bookedInfo && (
                <div className="lp-booking-summary">
                  <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                  <p><strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime} (slot locked)</p>
                  <p><strong>Status:</strong> {bookedInfo.status}</p>
                </div>
              )}
              <p className="lp-success-note">Our team will call you within 2 hours to confirm your slot and guide you through the virtual participation process.</p>
            </div>
          ) : (
            <form className="lp-form" onSubmit={handleSubmit}>
              <div className="lp-form-grid">
                                <div className="lp-form-group">
                                    <label><FiUser /> Full Name (Sankalp Person) *</label>
                                    <input name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiMail /> Email *</label>
                                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiPhone /> WhatsApp Number *</label>
                                    <input name="phone" type="tel" placeholder="10-digit number" value={form.phone} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label>Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="lp-form-group">
                                    <label>Date of Birth *</label>
                                    <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiClock /> Time of Birth *</label>
                                    <input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label>Gotra *</label>
                                    <input name="gotra" placeholder="Enter your gotra" value={form.gotra} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label>Father's Name *</label>
                                    <input name="fatherName" placeholder="Enter your father's name" value={form.fatherName} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiMapPin /> Birth Place *</label>
                                    <input name="birthPlace" placeholder="Birth place" value={form.birthPlace} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiCalendar /> Preferred Puja Date *</label>
                                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                                    {availability && (
                                        <div className={`lp-avail-badge ${availability.available ? 'ok' : 'full'}`}>
                                            {availability.available
                                                ? `${availability.remainingSlots}/${availability.totalSlots} slots available`
                                                : 'No slots available for this date'}
                                        </div>
                                    )}
                                </div>
                                <div className="lp-form-group">
                                    <label>Pin Code *</label>
                                    <input name="pinCode" placeholder="6-digit pin code" value={form.pinCode} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group">
                                    <label><FiClock /> Preferred Start Time *</label>
                                    <input name="time" type="time" value={form.time} onChange={handleChange} required min="05:00" max="19:00" step="1800" />
                                    {hint && (
                                        <div className={`lp-hint ${hint.type}`}>
                                            {hint.type === 'error' ? <FiAlertCircle /> : <FiCheck />} {hint.msg}
                                        </div>
                                    )}
                                    <p className="lp-time-note">Each booking locks a 5-hour window. Max 5 pujas per day.</p>
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label>Puja Purpose *</label>
                                    <textarea name="pujaPurpose" rows={2} placeholder="Describe the reason for this puja" value={form.pujaPurpose} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label>Full Address *</label>
                                    <textarea name="fullAddress" rows={2} placeholder="House number, street, locality" value={form.fullAddress} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label>Nearest Landmark *</label>
                                    <input name="nearestLandmark" placeholder="Nearest landmark" value={form.nearestLandmark} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label>Sankalp Place *</label>
                                    <input name="sankalpPlace" placeholder="Enter sankalp place" value={form.sankalpPlace} onChange={handleChange} required />
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label><FiMessageSquare /> Special Message / Wishes</label>
                                    <textarea name="message" rows={3} placeholder="Any extra information" value={form.message} onChange={handleChange} />
                                </div>
                                <div className="lp-form-group lp-full-width">
                                    <label style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                                        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required style={{ width:'auto', marginTop:'4px', flexShrink:0 }} />
                                        <span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span>
                                    </label>
                                </div>
                            </div>

                            <div className="lp-form-summary">
                <span>Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong></span>
                <span>Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong></span>
              </div>

              {status === 'error' && (
                <div className="lp-error-msg"><FiAlertCircle /> {statusMsg}</div>
              )}

              <button type="submit" className="lp-submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? <><FiLoader className="lp-spin" /> Processing...</> : '🪔 Confirm Puja Booking'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
