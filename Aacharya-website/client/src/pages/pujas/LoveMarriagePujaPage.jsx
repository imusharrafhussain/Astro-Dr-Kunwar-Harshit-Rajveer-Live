import { useState, useEffect } from 'react'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../Marriage/love marriage.webp'
import processImage from '../../Marriage/love marriage (2).webp'
import mandalaImage from '../../Marriage/love marriage.webp'
import './VivahPujaStyle.css'

const PUJA_ID = 'love-marriage-puja'
const PUJA_NAME = 'Love Marriage Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
  {
    id: 'basic',
    name: 'Saral Love Marriage Puja',
    price: 5100,
    duration: '1.5 hour ceremony',
    features: ['1 Vedic Pandit', 'Basic samagri included', 'Online or in-person', 'Digital sankalp report'],
  },
  {
    id: 'standard',
    name: 'Shubh Love Marriage Puja',
    price: 11100,
    duration: '3 hour ceremony',
    features: ['2 experienced Pandits', 'Premium samagri & havan', 'Kundali analysis + dosha nivaran', 'Prasad delivery'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Divya Love Marriage Puja Mahotsav',
    price: 21100,
    duration: 'Full-day ceremony',
    features: ['4 senior Vedic Pandits', 'Grand complete setup', 'Navagraha + dosha shanti', 'Live streaming for family', 'Post-puja consultation'],
  },
]

const BENEFITS = [
  {
    "icon": "💖",
    "title": "Stronger Bond",
    "desc": "Improves trust, communication, and emotional security between partners."
  },
  {
    "icon": "🕯",
    "title": "Obstacle Removal",
    "desc": "Pacifies doshas and unseen blocks delaying union and commitment."
  },
  {
    "icon": "👨‍👩‍👧‍👦",
    "title": "Family Harmony",
    "desc": "Encourages acceptance, respect, and support from both families."
  },
  {
    "icon": "🛡",
    "title": "Protection",
    "desc": "Creates a protective spiritual shield around the relationship."
  },
  {
    "icon": "📿",
    "title": "Karmic Healing",
    "desc": "Helps dissolve repeated patterns from past relationship pain."
  },
  {
    "icon": "✨",
    "title": "Auspicious Marriage Path",
    "desc": "Opens smooth pathways toward a sacred and stable married life."
  }
]
const STEPS = [
  {
    "n": "01",
    "title": "Sankalp for Union",
    "text": "Names and intentions of both partners are offered before Agni."
  },
  {
    "n": "02",
    "title": "Ganesh & Gauri Pujan",
    "text": "Invoking removal of obstacles and blessings of divine feminine grace."
  },
  {
    "n": "03",
    "title": "Graha Shanti",
    "text": "Pacifying planets causing delay, fear, or resistance in relationship matters."
  },
  {
    "n": "04",
    "title": "Prem Samriddhi Mantra Japa",
    "text": "Focused mantra chanting for emotional stability and sacred commitment."
  },
  {
    "n": "05",
    "title": "Havan & Ahuti",
    "text": "Fire offerings for harmonizing families and attracting marriage yoga."
  },
  {
    "n": "06",
    "title": "Ashirwad & Raksha",
    "text": "Final blessings and protection for a joyful marriage journey."
  }
]
const TESTIMONIALS = [
  {
    "name": "Ritika & Aman",
    "city": "Jaipur",
    "text": "This puja helped us gain confidence and family support for our marriage."
  },
  {
    "name": "Neha",
    "city": "Pune",
    "text": "After the puja, communication improved and constant fights stopped."
  },
  {
    "name": "Karan & Isha",
    "city": "Ahmedabad",
    "text": "The process felt powerful and gave us emotional stability and hope."
  }
]

const FAQS = [
  { q: 'Can this puja be done online?', a: 'Yes. Our pandits perform the ritual with authentic vidhi through live video and share prasad instructions.' },
  { q: 'Do I need kundali details?', a: 'Birth details are recommended for personalized sankalp and targeted mantra remedies.' },
  { q: 'How soon can I book?', a: 'You can choose the next available date and our team confirms muhurat as per ritual requirements.' },
  { q: 'Will I receive guidance after puja?', a: 'Yes, we share practical post-puja guidance and simple follow-up remedies.' },
]

const WHY_PERFORM = [
  "To remove obstacles caused by Mangal, Rahu, or Shani influence in the relationship chart.",
  "To attract family acceptance and peaceful communication between both households.",
  "To reduce repeated conflicts and stabilize emotional compatibility between partners.",
  "To protect the relationship from jealousy, negativity, and outside interference.",
  "To support timely marriage discussions and commitment decisions.",
  "To strengthen trust, loyalty, and long-term emotional alignment."
]

export default function LoveMarriagePujaPage() {
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
    if (form.time && isTimeConflict(form.time)) return { type: 'error', msg: 'This time is within a locked slot. Please choose another time.' }
    return { type: 'ok', msg: `${availability.remainingSlots} slot(s) remaining today.` }
  }

  const handleSubmit = async (e) => {
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
    <div className="vp-page">
      <header className="vp-header">
        <div className="vp-container vp-nav">
          <a href="#top" className="vp-brand">🕉 Prem Vivah Sankalp</a>
          <div className="vp-links">
            <a href="#about">About</a>
            <a href="#benefits">Benefits</a>
            <a href="#process">Process</a>
            <a href="#packages">Packages</a>
            <a href="#book">Book</a>
          </div>
          <a href="#book" className="vp-nav-btn">Book Puja</a>
        </div>
      </header>

      <section className="vp-hero" id="top">
        <img src={heroImage} alt="Love Marriage Puja" className="vp-hero-bg" />
        <div className="vp-hero-overlay" />
        <img src={mandalaImage} alt="" className="vp-mandala vp-mandala-right" />
        <img src={mandalaImage} alt="" className="vp-mandala vp-mandala-left" />
        <div className="vp-container vp-hero-content">
          <p className="vp-dev">Prem Vivah Sankalp</p>
          <h1>Love Marriage Puja</h1>
          <p className="vp-tagline">Sacred blessings to unite two hearts with family acceptance, harmony, and divine grace.</p>
          <div className="vp-hero-actions">
            <a href="#book" className="vp-btn vp-btn-primary">Book Your Puja</a>
            <a href="#about" className="vp-btn vp-btn-outline">Learn More</a>
          </div>
        </div>
      </section>

      <section id="about" className="vp-section vp-soft">
        <div className="vp-container vp-about-grid">
          <div>
            <p className="vp-label">About the Puja</p>
            <h2>What is Love Marriage Puja?</h2>
            <p>Love Marriage Puja is a Vedic ritual performed to remove relationship obstacles, calm planetary afflictions, and bless the union of two individuals who wish to marry by choice.</p>
            <p>It is commonly performed when couples face delay, resistance, misunderstanding, or astrological incompatibility despite strong mutual commitment.</p>
            <ul className="vp-list">
              {WHY_PERFORM.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <img src={processImage} alt="Puja process" className="vp-about-image" />
        </div>
      </section>

      <section className="vp-section vp-why">
        <div className="vp-container">
          <p className="vp-label center">Purpose & Significance</p>
          <h2 className="center">Why People Perform Love Marriage Puja</h2>
          <div className="vp-why-grid">
            {WHY_PERFORM.map((reason) => (
              <div key={reason} className="vp-why-card">
                <span>✦</span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-section" id="benefits">
        <div className="vp-container">
          <p className="vp-label center">Divine Benefits</p>
          <h2 className="center">Blessings of Love Marriage Puja</h2>
          <div className="vp-benefits">
            {BENEFITS.map((b) => (
              <div className="vp-card" key={b.title}>
                <div className="vp-emoji">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-section vp-soft" id="process">
        <div className="vp-container">
          <p className="vp-label center">Sacred Steps</p>
          <h2 className="center">The Puja Process</h2>
          <div className="vp-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="vp-step-card">
                <span>{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-section vp-soft" id="packages">
        <div className="vp-container">
          <p className="vp-label center">Puja Packages</p>
          <h2 className="center">Choose Your Sankalp</h2>
          <div className="vp-packages">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className={`vp-package ${pkg.popular ? 'popular' : ''}`} onClick={() => setSelectedPkg(pkg.id)}>
                {pkg.popular && <div className="vp-pop">Most Chosen</div>}
                <h3>{pkg.name}</h3>
                <div className="vp-price">₹{pkg.price.toLocaleString('en-IN')}</div>
                <p className="vp-duration">{pkg.duration}</p>
                <ul>
                  {pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}
                </ul>
                <button className="vp-select">{selectedPkg === pkg.id ? '✓ Selected' : 'Select Package'}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-section">
        <div className="vp-container">
          <p className="vp-label center">Devotee Voices</p>
          <h2 className="center">Blessed Experiences</h2>
          <div className="vp-testimonials">
            {TESTIMONIALS.map((t) => (
              <div className="vp-card" key={t.name}>
                <p className="vp-stars">★★★★★</p>
                <p className="vp-quote">"{t.text}"</p>
                <h3>{t.name}</h3>
                <p className="vp-city">{t.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-section" id="book">
        <div className="vp-container vp-book">
          <p className="vp-label center">Reserve Your Date</p>
          <h2 className="center">Book Your Love Marriage Puja</h2>
          {status === 'success' ? (
            <div className="vp-success">
              <div className="vp-success-icon"><FiCheck /></div>
              <h3>Puja Booked Successfully!</h3>
              <p>{statusMsg}</p>
              {bookedInfo && (
                <div className="vp-booking-summary">
                  <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                  <p><strong>Time:</strong> {bookedInfo.startTime} - {bookedInfo.endTime}</p>
                </div>
              )}
            </div>
          ) : (
            <form className="vp-form" onSubmit={handleSubmit}>
              <div className="vp-grid">
                                <label><FiUser /> Full Name (Sankalp Person) *<input name="name" value={form.name} onChange={handleChange} required /></label>
                                <label><FiPhone /> WhatsApp Number *<input name="phone" type="tel" value={form.phone} onChange={handleChange} required /></label>
                                <label><FiMail /> Email *<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
                                <label>Gender *<select name="gender" value={form.gender} onChange={handleChange} required><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
                                <label>Date of Birth *<input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required /></label>
                                <label><FiClock /> Time of Birth *<input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required /></label>
                                <label>Gotra *<input name="gotra" value={form.gotra} onChange={handleChange} required /></label>
                                <label>Father's Name *<input name="fatherName" value={form.fatherName} onChange={handleChange} required /></label>
                                <label><FiMapPin /> Birth Place *<input name="birthPlace" value={form.birthPlace} onChange={handleChange} required /></label>
                                <label><FiCalendar /> Puja Date *<input name="date" type="date" min={today} value={form.date} onChange={handleChange} required /></label>
                                <label>Pin Code *<input name="pinCode" value={form.pinCode} onChange={handleChange} required /></label>
                                <label><FiClock /> Start Time *<input name="time" type="time" min="05:00" max="19:00" step="1800" value={form.time} onChange={handleChange} required /></label>
                                <label className="full">Puja Purpose *<textarea name="pujaPurpose" rows={2} value={form.pujaPurpose} onChange={handleChange} required /></label>
                                <label className="full">Full Address *<textarea name="fullAddress" rows={2} value={form.fullAddress} onChange={handleChange} required /></label>
                                <label className="full">Nearest Landmark *<input name="nearestLandmark" value={form.nearestLandmark} onChange={handleChange} required /></label>
                                <label className="full">Sankalp Place *<input name="sankalpPlace" value={form.sankalpPlace} onChange={handleChange} required /></label>
                                <label className="full"><FiMessageSquare /> Message<textarea name="message" rows={3} value={form.message} onChange={handleChange} /></label>
                                <label className="full" style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}><input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required style={{ width:'auto', marginTop:'4px', flexShrink:0 }} /><span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span></label>
                            </div>
                            {availability && <p className={`vp-hint ${availability.available ? 'ok' : 'err'}`}>{availability.available ? `${availability.remainingSlots}/${availability.totalSlots} slots available` : 'No slots available for this date'}</p>}
              {hint && <p className={`vp-hint ${hint.type === 'ok' ? 'ok' : 'err'}`}>{hint.msg}</p>}
              {status === 'error' && <div className="vp-error"><FiAlertCircle /> {statusMsg}</div>}
              <div className="vp-summary">Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong> | Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong></div>
              <button type="submit" className="vp-submit" disabled={status === 'loading'}>
                {status === 'loading' ? <><FiLoader className="spin" /> Processing...</> : '🪔 Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="vp-section vp-soft">
        <div className="vp-container vp-faq">
          <p className="vp-label center">Curiosities</p>
          <h2 className="center">Frequently Asked</h2>
          <div className="vp-faq-list">
            {FAQS.map((f) => (
              <div className="vp-card" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="vp-footer">
        <div className="vp-container">
          <p className="vp-footer-line">Om Shantih Shantih Shantih</p>
          <h3>Prem Vivah Sankalp</h3>
          <p>Authentic Vedic ceremonies performed by learned pandits, rooted in scripture and tradition.</p>
          <small>© {new Date().getFullYear()} Prem Vivah Sankalp. All blessings reserved.</small>
        </div>
      </footer>
    </div>
  )
}
