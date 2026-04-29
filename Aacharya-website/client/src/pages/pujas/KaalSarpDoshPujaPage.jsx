import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiHeart,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import heroImage from '../../assets/kaal sharp dosh.jpg.jpeg'
import ritualImage from '../../assets/kal sharp dosh 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = 'kaal-sarp-dosh-puja'
const PUJA_NAME = 'Kaal Sarp Dosh Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const BENEFITS = [
  { icon: <FiShield />, title: 'Removes Karmic Obstacles', desc: 'Dissolves the serpent grip of past-life karma blocking your path.' },
  { icon: <FiTrendingUp />, title: 'Career & Financial Growth', desc: 'Opens doors of prosperity, promotions and stalled ventures.' },
  { icon: <FiHeart />, title: 'Marital Harmony', desc: 'Heals delays in marriage and brings peace into relationships.' },
  { icon: <FiUsers />, title: 'Progeny & Family Peace', desc: 'Blesses couples seeking children and restores family balance.' },
  { icon: <FiHeart />, title: 'Health & Mental Calm', desc: 'Relieves chronic illness, nightmares and unexplained anxiety.' },
  { icon: <FiStar />, title: 'Spiritual Awakening', desc: 'Aligns your soul with divine energies and awakens inner wisdom.' },
]

const REASONS = [
  'Repeated failures despite hard work',
  'Sudden financial losses or long stagnation',
  'Delay in marriage or progeny',
  'Recurring dreams of snakes',
  'Unexplained health issues in family',
  'Conflicts and heaviness at home',
]

const STEPS = [
  { n: '01', title: 'Sankalpa & Purification', text: 'The yajman takes a sacred vow with Ganga jal, invoking pure intention before the deities.' },
  { n: '02', title: 'Ganesh & Navagraha Pujan', text: 'Worship of Lord Ganesha and the nine planets to remove obstacles and balance cosmic energies.' },
  { n: '03', title: 'Naga Devata Invocation', text: 'Sacred mantras invoke Lord Shiva and the twelve serpent deities - Anant, Vasuki, Takshak and others.' },
  { n: '04', title: 'Rudra Abhishek', text: 'Holy abhishek of Lord Shiva with milk, honey, ghee and panchamrit chanting Mahamrityunjaya mantra.' },
  { n: '05', title: 'Silver Naga Visarjan', text: 'Silver serpent idols are immersed in holy waters, releasing the dosha from your janma kundali.' },
  { n: '06', title: 'Aarti & Ashirwad', text: 'Final aarti, prasad distribution and divine blessings sealed by the pandit on your behalf.' },
]

const PACKAGES = [
  {
    id: 'saral',
    name: 'Saral Puja',
    sanskrit: 'सरल पूजा',
    price: 5100,
    duration: '2 Hours',
    pandits: '1 Pandit',
    chants: 'Core Japa',
    features: ['Basic samagri included', 'Sankalp in your name', 'Live video on request', 'Prasad couriered'],
  },
  {
    id: 'trimbak',
    name: 'Trimbakeshwar Puja',
    sanskrit: 'विशेष पूजा',
    price: 11100,
    duration: '4 Hours',
    pandits: '3 Pandits',
    chants: 'Advanced Japa',
    features: ['Complete premium samagri', 'Rudra Abhishek included', 'HD live streaming', 'Silver Naga + Rudraksha prasad', 'Personalized sankalp video'],
    popular: true,
  },
  {
    id: 'maha',
    name: 'Vishesh Maha Puja',
    sanskrit: 'महा पूजा',
    price: 21100,
    duration: 'Full Day',
    pandits: '5 Pandits',
    chants: 'Maha Anushthan',
    features: ['Family sankalp up to 6 members', 'Rudra + Navagraha + Kalsarp', '108 Naga Visarjan', 'Premium prasad hamper', 'Astrologer consultation'],
  },
]

export default function KaalSarpDoshPujaPage() {
  const [selectedPkg, setSelectedPkg] = useState('trimbak')
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
    <div className="ks-page">
      <section className="ks-hero" style={{ '--ks-hero-image': `url(${heroImage})` }}>
        <div className="ks-hero-overlay" />
        <div className="ks-hero-content">
          <p className="ks-badge">✦ Dosha Nivaran Series ✦</p>
          <h1>Kal Sarp Dosh <span>Nivaran Puja</span></h1>
          <p className="ks-quote">When the serpent of karma coils around your destiny, ancient Vedic wisdom holds the key to your liberation.</p>
          <p className="ks-subtitle">Reclaim your path. Heal your bloodline. Awaken your blessings.</p>
          <div className="ks-actions">
            <a href="#booking" className="ks-btn ks-btn-gold">Book Your Sacred Puja <FiChevronRight /></a>
            <a href="#about" className="ks-btn ks-btn-outline">Learn the Significance</a>
          </div>
          <div className="ks-meta">
            <span><FiCheck /> 25+ Years Vedic Lineage</span>
            <span><FiCheck /> Trimbakeshwar Pandits</span>
            <span><FiCheck /> 50,000+ Pujas Performed</span>
          </div>
        </div>
      </section>

      <section id="about" className="ks-section">
        <div className="ks-container ks-about">
          <div className="ks-about-image"><img src={ritualImage} alt="Sacred Kal Sarp ritual process" /></div>
          <div>
            <p className="ks-label">Sacred Understanding</p>
            <h2>What is Kal Sarp Dosh?</h2>
            <p>In the sacred science of Vedic Jyotish, Kal Sarp Dosh arises when all seven planets are bound between Rahu and Ketu, forming a cosmic coil around your soul&apos;s journey.</p>
            <p>The ancient sages described this dosh as a karmic imprint carried from previous births. Through sacred fire, Vedic mantra chanting, and worship of the twelve Naga devatas, this knot dissolves and the soul walks free.</p>
          </div>
        </div>
      </section>

      <section className="ks-section ks-dark">
        <div className="ks-container">
          <p className="ks-label center">The Calling</p>
          <h2 className="center">Why Devotees Perform This Puja</h2>
          <div className="ks-reasons">
            {REASONS.map((reason, idx) => (
              <div className="ks-reason-card" key={reason}>
                <span>{idx + 1}</span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
          <p className="ks-why-quote">When you cannot find the door, the sacred fire reveals it.</p>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-container">
          <p className="ks-label center">Divine Benefits</p>
          <h2 className="center">Benefits of the Puja</h2>
          <div className="ks-benefits">
            {BENEFITS.map((b, i) => (
              <div className="ks-benefit-card" key={i}>
                <div className="ks-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section ks-process">
        <div className="ks-container">
          <p className="ks-label center">Sacred Vidhi</p>
          <h2 className="center">The Process</h2>
          <div className="ks-steps">
            {STEPS.map(step => (
              <div className="ks-step-card" key={step.n}>
                <span>{step.n}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="ks-section">
        <div className="ks-container">
          <p className="ks-label center">Choose Your Sankalp</p>
          <h2 className="center">Puja Packages</h2>
          <div className="ks-packages">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className={`ks-package ${selectedPkg === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`} onClick={() => setSelectedPkg(pkg.id)}>
                {pkg.popular && <div className="ks-pop">Most Chosen</div>}
                <p className="ks-sanskrit">{pkg.sanskrit}</p>
                <h3>{pkg.name}</h3>
                <div className="ks-price">₹{pkg.price.toLocaleString('en-IN')}</div>
                <div className="ks-package-meta">
                  <span><FiUsers /> {pkg.pandits}</span>
                  <span><FiClock /> {pkg.duration}</span>
                  <span><FiBookOpen /> {pkg.chants}</span>
                </div>
                <ul>{pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}</ul>
                <button className="ks-select">{selectedPkg === pkg.id ? '✓ Selected' : 'Select Package'}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="ks-section ks-book">
        <div className="ks-container">
          <p className="ks-label center">Book Your Sacred Date</p>
          <h2 className="center">Confirm Your Puja</h2>
          {status === 'success' ? (
            <div className="ks-success">
              <div className="ks-success-icon"><FiCheck /></div>
              <h3>Puja Booked Successfully! 🙏</h3>
              <p>{statusMsg}</p>
              {bookedInfo && (
                <div className="ks-summary-card">
                  <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                  <p><strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime}</p>
                  <p><strong>Status:</strong> {bookedInfo.status}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="ks-book-grid">
              <div className="ks-book-info">
                <p className="ks-book-chip"><FiCalendar /> Sacred Date Guidance</p>
                <h3>Take the first step toward your liberation.</h3>
                <p>Share your details and our senior pandit ji will personally call you within 2 hours to confirm muhurat and guide every step.</p>
                <div className="ks-book-points">
                  <div><FiPhone /> +91 98XXX XXXXX</div>
                  <div><FiMapPin /> Trimbakeshwar, Nashik, Maharashtra</div>
                  <div><FiClock /> Available 7 AM - 9 PM (All days)</div>
                  <div><FiUsers /> 50,000+ devotees served</div>
                </div>
              </div>
              <form className="ks-form" onSubmit={handleSubmit}>
                <h4>Booking Form</h4>
                <div className="ks-grid">
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
                  <label className="full"><FiMessageSquare /> Your Concern<textarea name="message" rows={3} value={form.message} onChange={handleChange} /></label>
                  <label className="full" style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}><input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required style={{ width:'auto', marginTop:'4px', flexShrink:0 }} /><span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span></label>
                </div>
                {availability && <p className={`ks-hint ${availability.available ? 'ok' : 'err'}`}>{availability.available ? `${availability.remainingSlots}/${availability.totalSlots} slots available` : 'No slots available for this date'}</p>}
                {hint && <p className={`ks-hint ${hint.type === 'ok' ? 'ok' : 'err'}`}>{hint.msg}</p>}
                {status === 'error' && <div className="ks-error"><FiAlertCircle /> {statusMsg}</div>}
                <div className="ks-summary">Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong> | Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong></div>
                <button type="submit" className="ks-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? <><FiLoader className="spin" /> Processing...</> : '🪔 Confirm My Booking'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <footer className="ks-footer">
        <p className="ks-footer-mantra">ॐ नमः शिवाय</p>
        <p>Performed with devotion at Trimbakeshwar Jyotirlinga.</p>
      </footer>
    </div>
  )
}
