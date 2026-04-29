import { useEffect, useMemo, useState } from 'react'
import { FiAlertCircle, FiCalendar, FiCheck, FiClock, FiLoader, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiUser } from 'react-icons/fi'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function FestivalPujaLayout({
  pujaId,
  pujaName,
  themeClass,
  heroImage,
  sideImage,
  ritualImage,
  heroTagline,
  heroTitle,
  heroSubtitle,
  aboutTitle,
  aboutParagraphs,
  whyItems,
  benefits,
  processSteps,
  packages,
}) {
  const [selectedPkg, setSelectedPkg] = useState(packages.find((p) => p.popular)?.id || packages[0]?.id)
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
    fetch(`${API_BASE}/api/puja-bookings/availability?pujaId=${pujaId}&date=${form.date}`)
      .then((r) => r.json())
      .then((data) => setAvailability(data))
      .catch(() => setAvailability(null))
  }, [form.date, pujaId])

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (status !== 'idle') {
      setStatus('idle')
      setStatusMsg('')
    }
  }

  const isConflict = (time) => {
    if (!availability || !time) return false
    const toMin = (t) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    }
    return availability.bookedTimeWindows?.some(({ start, end }) => {
      const selected = toMin(time)
      return selected >= toMin(start) && selected < toMin(end)
    })
  }

  const hint = useMemo(() => {
    if (!availability) return null
    if (!availability.available) return { type: 'error', msg: 'No slots available on this date. Please choose another date.' }
    if (form.time && isConflict(form.time)) return { type: 'error', msg: 'Selected time is already locked. Choose a different slot.' }
    return { type: 'ok', msg: `${availability.remainingSlots} slot(s) available.` }
  }, [availability, form.time])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setStatus('error')
      setStatusMsg('Please fill all required fields.')
      return
    }
    if (!form.dateOfBirth || !form.timeOfBirth || !form.gotra || !form.fatherName || !form.birthPlace || !form.pinCode || !form.pujaPurpose || !form.fullAddress || !form.nearestLandmark || !form.sankalpPlace) {
      setStatus('error')
      setStatusMsg('Please fill all required booking details.')
      return
    }
    if (!form.agreeTerms) {
      setStatus('error')
      setStatusMsg('Please accept terms and conditions to continue.')
      return
    }
    if (isConflict(form.time)) {
      setStatus('error')
      setStatusMsg('Time conflicts with an existing booking.')
      return
    }

    const pkg = packages.find((p) => p.id === selectedPkg)
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/puja-bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pujaId,
          pujaName,
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
      setStatusMsg(data.message || 'Booking created successfully.')
      setBookedInfo(data.booking || null)
    } catch (err) {
      setStatus('error')
      setStatusMsg(err.message)
    }
  }

  return (
    <div className={`festival-page ${themeClass}`}>
      <section className="festival-hero" style={{ '--festival-hero-image': `url(${heroImage})` }}>
        <div className="festival-hero-overlay" />
        <div className="festival-container festival-hero-content">
          <span className="festival-kicker">{heroTagline}</span>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <a href="#festival-booking" className="festival-btn festival-btn-primary">Book Your Puja</a>
        </div>
      </section>

      <section className="festival-section">
        <div className="festival-container festival-about-grid">
          <div>
            <h2>{aboutTitle}</h2>
            {aboutParagraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
          <div className="festival-image-card">
            <img src={sideImage} alt={`${pujaName} ritual`} />
          </div>
        </div>
      </section>

      <section className="festival-section festival-muted">
        <div className="festival-container">
          <h2>Why People Perform This Puja</h2>
          <div className="festival-grid festival-grid-3">
            {whyItems.map((item) => (
              <article key={item.title} className="festival-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="festival-section">
        <div className="festival-container">
          <h2>Benefits</h2>
          <div className="festival-grid festival-grid-3">
            {benefits.map((item) => (
              <article key={item.title} className="festival-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="festival-section festival-muted">
        <div className="festival-container festival-process-grid">
          <div>
            <h2>Puja Process</h2>
            <div className="festival-process-list">
              {processSteps.map((step, index) => (
                <div key={step.title} className="festival-process-step">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="festival-image-card">
            <img src={ritualImage} alt={`${pujaName} process`} />
          </div>
        </div>
      </section>

      <section className="festival-section">
        <div className="festival-container">
          <h2>Packages</h2>
          <div className="festival-grid festival-grid-3">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className={`festival-package ${selectedPkg === pkg.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedPkg(pkg.id)}
              >
                {pkg.popular && <span className="festival-popular">Most Popular</span>}
                <h3>{pkg.name}</h3>
                <p className="festival-price">Rs {pkg.price.toLocaleString('en-IN')}</p>
                <p className="festival-duration">{pkg.duration}</p>
                <ul>
                  {pkg.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="festival-section festival-muted" id="festival-booking">
        <div className="festival-container">
          <h2>Book Your Puja</h2>
          <div className="festival-book-card">
            {status === 'success' ? (
              <div className="festival-success">
                <h3>Booking Confirmed</h3>
                <p>{statusMsg}</p>
                {bookedInfo && (
                  <>
                    <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                    <p><strong>Time:</strong> {bookedInfo.startTime} - {bookedInfo.endTime}</p>
                  </>
                )}
              </div>
            ) : (
              <form className="festival-form" onSubmit={handleSubmit}>
                <div className="festival-form-grid">
                  <label><FiUser /> Full Name (Sankalp Person) *<input name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} required /></label>
                  <label><FiMail /> Email *<input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required /></label>
                  <label><FiPhone /> WhatsApp Number *<input name="phone" placeholder="10-digit number" value={form.phone} onChange={handleChange} required /></label>
                  <label>Gender *<select name="gender" value={form.gender} onChange={handleChange} required><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
                  <label>Date of Birth *<input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required /></label>
                  <label><FiClock /> Time of Birth *<input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required /></label>
                  <label>Gotra *<input name="gotra" placeholder="Enter your gotra" value={form.gotra} onChange={handleChange} required /></label>
                  <label>Father&apos;s Name *<input name="fatherName" placeholder="Enter your father's name" value={form.fatherName} onChange={handleChange} required /></label>
                  <label><FiMapPin /> Birth Place *<input name="birthPlace" placeholder="Search and select your location" value={form.birthPlace} onChange={handleChange} required /></label>
                  <label><FiCalendar /> Preferred Puja Date *<input name="date" type="date" min={today} value={form.date} onChange={handleChange} required /></label>
                  <label>Pin Code *<input name="pinCode" placeholder="6-digit pin code" value={form.pinCode} onChange={handleChange} required /></label>
                  <label><FiClock /> Preferred Time *<input name="time" type="time" value={form.time} onChange={handleChange} required min="05:00" max="19:00" step="1800" /></label>
                  <label className="full">Puja Purpose *<textarea name="pujaPurpose" rows={2} placeholder="Describe the reason for this puja" value={form.pujaPurpose} onChange={handleChange} required /></label>
                  <label className="full">Full Address *<textarea name="fullAddress" rows={2} placeholder="House number, street, locality" value={form.fullAddress} onChange={handleChange} required /></label>
                  <label className="full">Nearest Landmark *<input name="nearestLandmark" placeholder="Nearest landmark" value={form.nearestLandmark} onChange={handleChange} required /></label>
                  <label className="full">Sankalp Place *<input name="sankalpPlace" placeholder="Enter sankalp place" value={form.sankalpPlace} onChange={handleChange} required /></label>
                  <label className="full"><FiMessageSquare /> Additional Notes<textarea name="message" rows={3} placeholder="Any extra information" value={form.message} onChange={handleChange} /></label>
                  <label className="full festival-checkbox">
                    <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required />
                    <span>I agree to the Terms and Conditions and understand that all puja bookings are non-refundable. *</span>
                  </label>
                </div>
                {hint && <p className={`festival-hint ${hint.type}`}>{hint.type === 'error' ? <FiAlertCircle /> : <FiCheck />}{hint.msg}</p>}
                {status === 'error' && <p className="festival-hint error"><FiAlertCircle />{statusMsg}</p>}
                <p className="festival-summary">Selected Package: <strong>{packages.find((p) => p.id === selectedPkg)?.name}</strong></p>
                <button className="festival-btn festival-btn-primary" type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? <><FiLoader className="spin" /> Processing...</> : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
