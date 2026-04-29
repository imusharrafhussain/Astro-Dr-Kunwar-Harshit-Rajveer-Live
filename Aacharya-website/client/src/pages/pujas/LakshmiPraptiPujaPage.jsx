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
    FiStar,
    FiShield,
    FiTrendingUp,
    FiHome,
    FiBriefcase,
    FiAward,
} from 'react-icons/fi'
import { GiSparkles, GiFlame, GiLotus, GiReceiveMoney, GiDiamonds } from 'react-icons/gi'
import heroImage from '../../Marriage/lakshhmi prapti.webp'
import pujaImage from '../../Marriage/lakshmi prapti.webp'
import mandalaImage from '../../Marriage/lakshhmi prapti.png 2.webp'
import './LakshmiPraptiStyle.css'

const PUJA_ID = 'lakshmi-prapti-puja'
const PUJA_NAME = 'Lakshmi Prapti Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Saral Lakshmi Puja',
        price: 2100,
        duration: '1.5 hours',
        features: ['Sankalp & Ganesh Pujan', 'Lakshmi Ashtottara (108 names)', 'Aarti & Prasad Distribution', 'Online live streaming'],
    },
    {
        id: 'standard',
        name: 'Shree Lakshmi Anushthan',
        price: 5100,
        duration: '3 hours',
        features: ['Everything in Saral Puja', 'Shree Suktam - 11 paath', 'Kanakdhara Stotra recitation', 'Havan with 108 ahutis', 'Yantra & blessed prasad couriered'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Mahalakshmi Maha Yagna',
        price: 11100,
        duration: '5-6 hours',
        features: ['Full Vedic Mahalakshmi Yagna', 'Shree Suktam - 1008 paath', 'Kuber Pujan + Kanakdhara Havan', 'Silver Lakshmi coin & energised yantra', 'Personal sankalp on your name & gotra'],
    },
]

const BENEFITS = [
    { icon: <GiReceiveMoney />, title: 'Wealth & Prosperity', desc: 'Invites steady inflow of money and financial abundance.' },
    { icon: <FiShield />, title: 'Removes Debts', desc: 'Helps clear financial obstacles, loans and money stagnation.' },
    { icon: <FiHome />, title: 'Harmony at Home', desc: 'Brings peace, positivity and Lakshmi grace into the household.' },
    { icon: <FiBriefcase />, title: 'Business Growth', desc: 'Boosts career, business expansion and new opportunities.' },
    { icon: <GiSparkles />, title: 'Spiritual Upliftment', desc: 'Purifies aura and aligns you with abundance vibrations.' },
    { icon: <FiAward />, title: 'Good Fortune', desc: 'Strengthens luck, success and overall well-being.' },
]

export default function LakshmiPraptiPujaPage() {
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
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [statusMsg, setStatusMsg] = useState('')
    const [bookedInfo, setBookedInfo] = useState(null)

    // Fetch availability whenever date changes
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
        if (form.time && isTimeConflict(form.time)) return { type: 'error', msg: `This time is within a locked slot. Please choose a time outside locked windows.` }
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
        <div className="lp-page">
            <section className="lp-hero" id="top">
                <div className="lp-bg-gradient" />
                <img src={mandalaImage} alt="" className="lp-mandala lp-mandala-right" />
                <img src={mandalaImage} alt="" className="lp-mandala lp-mandala-left" />
                <div className="lp-container lp-hero-grid">
                    <div className="lp-hero-content">
                        <span className="lp-pill"><GiSparkles /> Vedic Wealth Ritual</span>
                        <h1>Lakshmi Prapti <span>Puja</span></h1>
                        <p className="lp-mantra">om shreem hreem shreem kamale kamalalaye praseed praseed om shreem hreem shreem mahalakshmyai namah</p>
                        <p className="lp-subtitle">
                            Invite Goddess Mahalakshmi into your life through an authentic Vedic ritual
                            performed by experienced pandits for prosperity, abundance and peace.
                        </p>
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
                        <img src={heroImage} alt="Lakshmi Prapti Puja" />
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
                        <img src={pujaImage} alt="Lakshmi Puja setup" className="lp-about-image" />
                        <div className="lp-about-badge">Authentic Vedic Vidhi</div>
                    </div>
                    <div className="lp-about-copy">
                        <p className="lp-label">What is this puja?</p>
                        <h2>The Sacred Ritual of <span>Abundance</span></h2>
                        <p>Lakshmi Prapti Puja is one of the most powerful rituals in Sanatan Dharma performed to please Goddess Mahalakshmi, the giver of wealth, fortune and prosperity.</p>
                        <p>Through Shree Suktam chanting, Kanakdhara Stotra and sacred havan offerings, this puja removes financial obstacles and attracts long-term abundance.</p>
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
                        {[
                            'Overcome long-standing money problems and debts',
                            'Begin a new business or expand existing ventures',
                            'Attract new opportunities and career growth',
                            'Bring peace, harmony and positive energy at home',
                            'Fulfil long-pending wishes and material desires',
                            'Counter Vastu defects and negative planetary periods',
                        ].map((reason) => (
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
                                <div className="lp-benefit-icon">{b.icon}</div>
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
                        {[
                            { num: '01', title: 'Sankalp', sub: 'The devotee takes sacred vow with name, gotra & wish.' },
                            { num: '02', title: 'Ganesh & Kalash Pujan', sub: 'Lord Ganesha is invoked to remove all obstacles.' },
                            { num: '03', title: 'Lakshmi Avahan', sub: 'Goddess Lakshmi is invoked with Vedic mantras.' },
                            { num: '04', title: 'Shree Suktam Paath', sub: 'Powerful Vedic hymns are chanted for abundance.' },
                            { num: '05', title: 'Havan', sub: 'Sacred fire ritual with ghee, herbs & lotus seed offerings.' },
                            { num: '06', title: 'Aarti & Prasad', sub: 'Final blessings and prasad for the devotee.' },
                        ].map((s, i) => (
                            <div key={s.num} className="lp-step-card" style={{ '--i': i }}>
                                <div className="lp-step-num">{s.num}</div>
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
            <footer className="lp-footer">
                <div className="lp-container">
                    <div className="lp-footer-brand"><GiDiamonds /> Divya Anushthan</div>
                    <p>Om Shree Mahalakshmyai Namah</p>
                    <small>© {new Date().getFullYear()} Divya Anushthan - Authentic Vedic Pujas Worldwide</small>
                </div>
            </footer>
        </div>
    )
}
