import { useEffect, useState } from 'react'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { CheckCircle2, Sprout, TrendingUp, BookOpen, HeartHandshake, Shield, Award, Users, Star, Flame } from 'lucide-react'
import heroImage from '../../assets/puja/hero-ganesh.png'
import murtiImage from '../../assets/puja/ganesha-murti.png'
import ritualImage from '../../assets/puja/pandit-ritual.png'
import './GaneshChaturthiFestivalStyle.css'

const PUJA_ID = 'ganesh-chaturthi-pujas-puja'
const PUJA_NAME = 'Ganesh Chaturthi Pujas'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const REASONS = [
  { title: 'Starting a New Chapter', desc: 'Seek blessings before a new job, home, or marriage.' },
  { title: 'Removing Obstacles', desc: 'Clear unseen hurdles from your career or business path.' },
  { title: 'Family Harmony', desc: 'Invite peace, understanding, and joy into your household.' },
  { title: 'Divine Protection', desc: "Shield your loved ones with Lord Ganesha's benevolent aura." },
]

const BENEFITS = [
  { title: 'Obstacle Removal', icon: Sprout },
  { title: 'Career & Business', icon: TrendingUp },
  { title: 'Academic Success', icon: BookOpen },
  { title: 'Peace & Harmony', icon: HeartHandshake },
  { title: 'Divine Protection', icon: Shield },
  { title: 'Prosperity', icon: Award },
]

const STEPS = [
  { title: 'Sankalpa', desc: 'Setting the sacred intention for your family.' },
  { title: 'Ganesh Sthapana', desc: 'Respectful installation of Lord Ganesha.' },
  { title: 'Shodashopachara', desc: '16 traditional offerings including flowers and modak.' },
  { title: 'Atharvashirsha Path', desc: 'Powerful chanting of ancient Vedic mantras.' },
  { title: 'Aarti & Prasad', desc: 'Final prayers and distribution of blessed offerings.' },
]

const PACKAGES = [
  { id: 'basic', name: 'Basic', price: 2999, features: ['1 Pandit', '1.5 Hours Duration', 'Standard Samagri', 'Basic Aarti'] },
  { id: 'standard', name: 'Standard', price: 5999, features: ['2 Pandits', '3 Hours Duration', 'Complete Samagri Included', 'Full Vidhi', 'Atharvashirsha Path'], popular: true },
  { id: 'premium', name: 'Premium', price: 11999, features: ['3 Pandits', 'Full Day (6 Hours)', 'Premium Samagri', 'Live Video Streaming', 'Prasad Delivery'] },
]

const TRUST = [
  { title: '500+', subtitle: 'Verified Pandits', icon: Users },
  { title: '10,000+', subtitle: 'Successful Pujas', icon: Flame },
  { title: '100%', subtitle: 'Authentic Rituals', icon: Award },
]

const REVIEWS = [
  { name: 'Rahul Sharma', text: 'The pandit ji was very knowledgeable and explained everything beautifully. It felt truly divine.' },
  { name: 'Priya Desai', text: 'Booking was seamless. The samagri provided was of premium quality. Highly recommend their services.' },
  { name: 'Amit Patel', text: 'A deeply spiritual experience for our family. Everything was organized perfectly without any hassle.' },
]

export default function GaneshChaturthiPujasPujaPage() {
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

  const hint = (() => {
    if (!availability) return null
    if (!availability.available) return { type: 'error', msg: 'No puja slots available for this date. Please choose another date.' }
    if (form.time && isTimeConflict(form.time)) return { type: 'error', msg: 'This time is within a locked slot. Please choose a time outside locked windows.' }
    return { type: 'ok', msg: `${availability.remainingSlots} slot(s) remaining today.` }
  })()

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
  const Divider = () => (
    <div className="gc-divider-wrap">
      <div className="gc-divider-line" />
      <Flame className="gc-divider-icon" />
      <div className="gc-divider-line" />
    </div>
  )

  return (
    <div className="gc-page">
      <section className="gc-hero">
        <img src={heroImage} alt="Lord Ganesha Aarti" className="gc-hero-img" />
        <div className="gc-hero-overlay" />
        <div className="gc-hero-content">
          <div className="gc-badge">Authentic Vedic Rituals</div>
          <h1>Ganesh Chaturthi <span>Puja</span></h1>
          <p>Remove obstacles and invite success with Lord Ganesha's blessings. Authentic pujas performed by verified pandits at your home.</p>
          <button onClick={scrollToBooking} className="gc-btn-primary">Book This Puja Now</button>
        </div>
      </section>

      <section className="gc-section gc-about">
        <div className="gc-container gc-two-col">
          <div>
            <h2>The Remover of <span>Obstacles</span></h2>
            <p>Lord Ganesha, revered as Vighnaharta, clears the path of hurdles and blesses new beginnings. This authentic puja invokes His divine presence into your home, filling your space with warmth, peace, and auspicious energy.</p>
            <p>Whether you are stepping into a new chapter of life, seeking harmony in your family, or praying for success, this traditional ceremony connects you deeply to the divine source of wisdom and prosperity.</p>
          </div>
          <img src={murtiImage} alt="Beautiful Ganesha Murti" className="gc-img-card" />
        </div>
      </section>
      <Divider />

      <section className="gc-section gc-reasons">
        <div className="gc-container">
          <h2 className="gc-center">Why Perform This Puja?</h2>
          <p className="gc-sub gc-center">Countless families invite Lord Ganesha into their homes for profound reasons.</p>
          <div className="gc-grid gc-grid-2">
            {REASONS.map((reason, i) => (
              <div key={i} className="gc-card">
                <div className="gc-icon-wrap">
                  <CheckCircle2 className="gc-icon" />
                </div>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />

      <section className="gc-section">
        <div className="gc-container">
          <h2 className="gc-center">Divine Blessings</h2>
          <div className="gc-grid gc-grid-3">
            {BENEFITS.map((b, i) => (
              <div key={i} className="gc-benefit">
                <div className="gc-benefit-icon-wrap">
                  <b.icon className="gc-benefit-icon" />
                </div>
                <div>{b.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />

      <section className="gc-section gc-process">
        <div className="gc-container gc-two-col">
          <div>
            <h2>The Sacred Process</h2>
            {STEPS.map((step, i) => (
              <div key={i} className="gc-step">
                <div className="gc-step-num">{i + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <img src={ritualImage} alt="Pandit Ritual" className="gc-img-card" />
        </div>
      </section>
      <Divider />

      <section className="gc-section">
        <div className="gc-container">
          <h2>Choose Your Puja Package</h2>
          <div className="gc-grid gc-grid-3">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className={`gc-package ${pkg.popular ? 'popular' : ''}`}>
                {pkg.popular && <div className="gc-popular">Most Popular</div>}
                <h3>{pkg.name}</h3>
                <div className="gc-price">₹{pkg.price.toLocaleString('en-IN')}</div>
                <ul>{pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}</ul>
                <button className="gc-btn-outline" onClick={() => { setSelectedPkg(pkg.id); scrollToBooking() }}>Select {pkg.name}</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />

      <section id="booking" className="gc-section gc-booking">
        <div className="gc-container gc-book-card">
          <h2>Reserve Your Puja</h2>
          {status === 'success' ? (
            <div className="gc-success">
              <FiCheck />
              <h3>Puja Booked Successfully! 🙏</h3>
              <p>{statusMsg}</p>
              {bookedInfo && <p><strong>{bookedInfo.bookingDate}</strong> • {bookedInfo.startTime} - {bookedInfo.endTime}</p>}
            </div>
          ) : (
            <form className="gc-form" onSubmit={handleSubmit}>
              <div className="gc-form-grid">
                <label><FiUser /> Full Name<input name="name" value={form.name} onChange={handleChange} required /></label>
                <label><FiMail /> Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
                <label><FiPhone /> Phone<input name="phone" value={form.phone} onChange={handleChange} required /></label>
                <label><FiMapPin /> City / Location<input name="address" value={form.address} onChange={handleChange} /></label>
                <label><FiCalendar /> Date<input name="date" type="date" min={today} value={form.date} onChange={handleChange} required /></label>
                <label><FiClock /> Time<input name="time" type="time" value={form.time} onChange={handleChange} min="05:00" max="19:00" step="1800" required /></label>
                <label className="gc-full">Selected Package<input value={PACKAGES.find(p => p.id === selectedPkg)?.name || ''} readOnly /></label>
                <label className="gc-full"><FiMessageSquare /> Message<textarea name="message" rows={3} value={form.message} onChange={handleChange} /></label>
              </div>
              {hint && <p className={`gc-hint ${hint.type}`}>{hint.msg}</p>}
              {status === 'error' && <p className="gc-hint error"><FiAlertCircle /> {statusMsg}</p>}
              <button type="submit" className="gc-btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? <><FiLoader className="gc-spin" /> Processing...</> : 'Confirm My Booking'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="gc-section gc-trust">
        <div className="gc-container">
          <div className="gc-grid gc-grid-3 gc-trust-grid">
            {TRUST.map((t, i) => (
              <div key={i} className="gc-trust-card">
                <t.icon className="gc-trust-icon" />
                <div className="gc-trust-title">{t.title}</div>
                <div className="gc-trust-sub">{t.subtitle}</div>
              </div>
            ))}
          </div>
          <div className="gc-grid gc-grid-3 gc-review-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="gc-review-card">
                <div className="gc-stars">{[...Array(5)].map((_, j) => <Star key={j} className="gc-star" />)}</div>
                <p>"{r.text}"</p>
                <h4>{r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="gc-footer">
        <h2>Ganesh Puja Seva</h2>
        <p>Bringing authentic Vedic rituals to your doorstep with devotion and purity.</p>
        <small>© {new Date().getFullYear()} Ganesh Puja Seva. All rights reserved.</small>
      </footer>
    </div>
  )
}
