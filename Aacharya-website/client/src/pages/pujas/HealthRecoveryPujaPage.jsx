import { useEffect, useState } from 'react'
import {
    FiAlertCircle,
    FiBookOpen,
    FiCalendar,
    FiCheck,
    FiClock,
    FiHeart,
    FiLoader,
    FiMail,
    FiMapPin,
    FiMessageSquare,
    FiPhone,
    FiShield,
    FiStar,
    FiSun,
    FiUser,
    FiUsers,
} from 'react-icons/fi'
import heroImage from '../../assets/health recovery pooja.jpg.jpeg'
import shivaImage from '../../assets/health recovery pooja 2.jpg.jpeg'
import havanImage from '../../assets/puja/havan-kund.png'
import './MahamrityunjayaPujaStyle.css'

const PUJA_ID = "health-recovery-puja"
const PUJA_NAME = "Health Recovery Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'saral',
        name: 'Saral Puja',
        sanskrit: 'सरल पूजा',
        price: 5100,
        duration: '3 Hours',
        pandits: '2 Pandits',
        chants: '11,000 Mantras',
        features: ['Core mantra japa', 'Shuddhi sankalp', 'Sacred havan', 'Live video of puja', 'Prasad dispatch'],
    },
    {
        id: 'vishesh',
        sanskrit: 'विशेष पूजा',
        name: 'Vishesh Puja',
        price: 11100,
        duration: '6 Hours',
        pandits: '4 Pandits',
        chants: '51,000 Mantras',
        features: ['Extended mantra anushthan', 'Personal sankalp with gotra', 'Detailed havan', 'Live HD video', 'Prasad + energized protection thread', 'Pandit guidance call'],
        popular: true,
    },
    {
        id: 'maha',
        name: 'Maha Puja',
        sanskrit: 'महा पूजा',
        price: 25100,
        duration: 'Full Day',
        pandits: '8 Pandits',
        chants: '1,25,000 Mantras',
        features: ['Sava lakh mantra completion', 'Advanced ritual sequence', 'Grand havan vidhi', 'Full ceremony recording', 'Premium prasad hamper', 'Post-puja follow-up guidance'],
    },
]

const BENEFITS = [
  { icon: <FiHeart />, title: "Accelerated Healing", desc: "Channels healing energy deep into the body and supports faster physical recovery." },
  { icon: <FiHeart />, title: "Mental Peace", desc: "Calms anxiety, emotional distress, and fear during difficult health phases." },
  { icon: <FiStar />, title: "Karmic Block Removal", desc: "Clears subtle karmic barriers that may be obstructing the healing process." },
  { icon: <FiSun />, title: "Graha Pacification", desc: "Neutralizes health-impacting effects of Saturn, Rahu, and Ketu influences." },
  { icon: <FiShield />, title: "Protective Aura", desc: "Creates a protective field that helps prevent repeated health crises." },
  { icon: <FiSun />, title: "Vitality Boost", desc: "Improves stamina, immunity, and overall life-force alignment." }
]

const REASONS = [
  "To seek divine blessings for serious illness and chronic diseases",
  "To balance harmful graha effects like afflicted Moon, Sun, or Saturn",
  "To cleanse karmic causes behind unexplained recurring health issues",
  "To strengthen pranic body and restore vitality across all energy layers",
  "To break hereditary health patterns and ancestral disease cycles",
  "To accelerate recovery after surgery or major medical episodes"
]

const STEPS = [
  {
    "n": "01",
    "title": "Sankalp & Intention",
    "text": "Priest and devotee declare healing intention with name and gotra."
  },
  {
    "n": "02",
    "title": "Sacred Space Preparation",
    "text": "Ritual field is prepared with flowers, herbs, and healing elements."
  },
  {
    "n": "03",
    "title": "Kalash & Ganesh Pujan",
    "text": "Kalash is consecrated and Ganesh invoked to remove healing obstacles."
  },
  {
    "n": "04",
    "title": "Dhanvantari Mantra Japa",
    "text": "Healing mantras are chanted with devotion to awaken restorative force."
  },
  {
    "n": "05",
    "title": "Herbal Healing Havan",
    "text": "Giloy, neem, turmeric, and sacred offerings are made into Agni."
  },
  {
    "n": "06",
    "title": "Aarti, Prasad & Sealing",
    "text": "Final aarti and blessings seal divine healing vibrations."
  }
]

export default function HealthRecoveryPujaPage() {
    const [selectedPkg, setSelectedPkg] = useState('vishesh')
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

    useEffect(() => {
        document.body.classList.add('mm-page-active')
        return () => {
            document.body.classList.remove('mm-page-active')
        }
    }, [])

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
        if (status !== 'idle') { setStatus('idle'); setStatusMsg('') }
    }

    const isTimeConflict = (time) => {
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
        <div className="mm-page">
            <div className="mm-topbar">ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् • Health & Protection Puja</div>

            <section className="mm-hero" style={{ '--mm-hero-image': `url(${heroImage})` }}>
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <p className="mm-badge">✦ Health & Protection Puja ✦</p>
                    <h1>Health Recovery Puja <span>Puja</span></h1>
                    <p className="mm-quote">Divine Healing for Body, Mind, and Life Force</p>
                    <p className="mm-subtitle">
                        A sacred Vedic healing ritual to invoke Lord Dhanvantari's grace for recovery from illness, renewed vitality, and holistic wellbeing.
                    </p>
                    <div className="mm-actions">
                        <a href="#booking" className="mm-btn mm-btn-gold">Book Your Puja</a>
                        <a href="#packages" className="mm-btn mm-btn-outline">View Packages</a>
                    </div>
                    <div className="mm-hero-meta">
                        <span><FiStar /> 10,000+ Pujas Performed</span>
                        <span><FiUsers /> Vedic Certified Pandits</span>
                        <span><FiBookOpen /> Live Video Darshan</span>
                    </div>
                </div>
            </section>

            <section className="mm-mantra">
                <h2>ॐ नमो भगवते वासुदेवाय धन्वंतरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय नमः॥</h2>
                <p>Salutations to Lord Dhanvantari, bearer of the nectar pot, remover of fear and destroyer of disease.</p>
            </section>

            <section className="mm-section">
                <div className="mm-container mm-about">
                    <div>
                        <p className="mm-label">Sacred Knowledge</p>
                        <h2>What is the Health Recovery Puja?</h2>
                        <p>
                            Health Recovery Puja is a sacred Vedic ritual performed to invoke divine healing energies for restoration of physical, mental, and spiritual wellbeing. It invokes Lord Dhanvantari, the divine physician, for deep healing grace.
                        </p>
                        <p>
                            According to Vedic wisdom, illness can arise from planetary imbalance, karmic burden, negative energies, or disrupted pranic flow. This puja works on all these layers through mantra, herbs, havan, and divine invocation.
                        </p>
                    </div>
                    <img src={shivaImage} alt="Sacred ritual symbolism" />
                </div>
            </section>

            <section className="mm-section mm-warm">
                <div className="mm-container">
                    <p className="mm-label center">The Calling</p>
                    <h2 className="center">Why Devotees Perform This Puja</h2>
                    <div className="mm-reasons">
                        {REASONS.map((reason, idx) => (
                            <div className="mm-reason-card" key={reason}>
                                <span>{idx + 1}</span>
                                <p>{reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mm-section">
                <div className="mm-container">
                    <p className="mm-label center">Divine Blessings</p>
                    <h2 className="center">Benefits of the Puja</h2>
                    <div className="mm-benefits">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className="mm-benefit-card">
                                <div className="mm-benefit-icon">{b.icon}</div>
                                <h4>{b.title}</h4>
                                <p>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mm-section mm-process" style={{ '--mm-process-image': `url(${havanImage})` }}>
                <div className="mm-process-overlay" />
                <div className="mm-container mm-process-content">
                    <p className="mm-label center">Sacred Vidhi</p>
                    <h2 className="center">The Process of the Puja</h2>
                    <div className="mm-steps">
                        {STEPS.map(step => (
                            <div key={step.n} className="mm-step-card">
                                <span>{step.n}</span>
                                <h4>{step.title}</h4>
                                <p>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mm-section mm-warm" id="packages">
                <div className="mm-container">
                    <p className="mm-label center">Choose Your Sankalp</p>
                    <h2 className="center">Puja Packages & Pricing</h2>
                    <div className="mm-packages">
                        {PACKAGES.map(pkg => (
                            <div
                                key={pkg.id}
                                className={`mm-package-card ${selectedPkg === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                                onClick={() => setSelectedPkg(pkg.id)}
                            >
                                {pkg.popular && <div className="mm-popular-badge">Most Chosen</div>}
                                <p className="mm-sanskrit">{pkg.sanskrit}</p>
                                <h3>{pkg.name}</h3>
                                <div className="mm-price">₹{pkg.price.toLocaleString('en-IN')}</div>
                                <div className="mm-package-meta">
                                    <span><FiUsers /> {pkg.pandits}</span>
                                    <span><FiClock /> {pkg.duration}</span>
                                    <span><FiBookOpen /> {pkg.chants}</span>
                                </div>
                                <ul className="mm-features">
                                    {pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}
                                </ul>
                                <div className={`mm-select-btn ${selectedPkg === pkg.id ? 'active' : ''}`}>
                                    {selectedPkg === pkg.id ? '✓ Selected' : 'Select Package'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mm-section" id="booking">
                <div className="mm-container">
                    <p className="mm-label center">Begin Your Sacred Journey</p>
                    <h2 className="center">Book Your Puja</h2>

                    {status === 'success' ? (
                        <div className="mm-success-card">
                            <div className="mm-success-icon"><FiCheck /></div>
                            <h3>Puja Booked Successfully! 🙏</h3>
                            <p>{statusMsg}</p>
                            {bookedInfo && (
                                <div className="mm-booking-summary">
                                    <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                                    <p><strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime} (slot locked)</p>
                                    <p><strong>Status:</strong> {bookedInfo.status}</p>
                                </div>
                            )}
                            <p className="mm-success-note">Our team will call you within 2 hours to confirm your slot and guide the ritual details.</p>
                        </div>
                    ) : (
                        <form className="mm-form" onSubmit={handleSubmit}>
                            <div className="mm-form-grid">
                                <div className="mm-form-group">
                                    <label><FiUser /> Full Name (Sankalp Person) *</label>
                                    <input name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiMail /> Email *</label>
                                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiPhone /> WhatsApp Number *</label>
                                    <input name="phone" type="tel" placeholder="10-digit number" value={form.phone} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label>Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mm-form-group">
                                    <label>Date of Birth *</label>
                                    <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiClock /> Time of Birth *</label>
                                    <input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label>Gotra *</label>
                                    <input name="gotra" placeholder="Enter your gotra" value={form.gotra} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label>Father's Name *</label>
                                    <input name="fatherName" placeholder="Enter your father's name" value={form.fatherName} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiMapPin /> Birth Place *</label>
                                    <input name="birthPlace" placeholder="Birth place" value={form.birthPlace} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiCalendar /> Preferred Puja Date *</label>
                                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                                    {availability && (
                                        <div className={`mm-avail-badge ${availability.available ? 'ok' : 'full'}`}>
                                            {availability.available
                                                ? `${availability.remainingSlots}/${availability.totalSlots} slots available`
                                                : 'No slots available for this date'}
                                        </div>
                                    )}
                                </div>
                                <div className="mm-form-group">
                                    <label>Pin Code *</label>
                                    <input name="pinCode" placeholder="6-digit pin code" value={form.pinCode} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group">
                                    <label><FiClock /> Preferred Start Time *</label>
                                    <input name="time" type="time" value={form.time} onChange={handleChange} required min="05:00" max="19:00" step="1800" />
                                    {hint && (
                                        <div className={`mm-hint ${hint.type}`}>
                                            {hint.type === 'error' ? <FiAlertCircle /> : <FiCheck />} {hint.msg}
                                        </div>
                                    )}
                                    <p className="mm-time-note">Each booking locks a 5-hour window. Max 5 pujas per day.</p>
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label>Puja Purpose *</label>
                                    <textarea name="pujaPurpose" rows={2} placeholder="Describe the reason for this puja" value={form.pujaPurpose} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label>Full Address *</label>
                                    <textarea name="fullAddress" rows={2} placeholder="House number, street, locality" value={form.fullAddress} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label>Nearest Landmark *</label>
                                    <input name="nearestLandmark" placeholder="Nearest landmark" value={form.nearestLandmark} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label>Sankalp Place *</label>
                                    <input name="sankalpPlace" placeholder="Enter sankalp place" value={form.sankalpPlace} onChange={handleChange} required />
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label><FiMessageSquare /> Special Message / Wishes</label>
                                    <textarea name="message" rows={3} placeholder="Any extra information" value={form.message} onChange={handleChange} />
                                </div>
                                <div className="mm-form-group mm-full-width">
                                    <label style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                                        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required style={{ width:'auto', marginTop:'4px', flexShrink:0 }} />
                                        <span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mm-form-summary">
                                <span>Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong></span>
                                <span>Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong></span>
                            </div>

                            {status === 'error' && (
                                <div className="mm-error-msg"><FiAlertCircle /> {statusMsg}</div>
                            )}

                            <button type="submit" className="mm-submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? <><FiLoader className="mm-spin" /> Processing...</> : '🪔 Confirm Puja Booking'}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <footer className="mm-footer">
                <p className="mm-footer-mantra">ॐ नमः शिवाय</p>
                <p>May divine healing grace restore your health and strength.</p>
                <small>© {new Date().getFullYear()} Sacred Pujas • Performed with devotion.</small>
            </footer>
        </div>
    )
}
