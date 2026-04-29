import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Briefcase, Users, Shield, Sparkles, Flame, Check, Loader2, AlertCircle } from 'lucide-react';

import heroImg from '../../Marriage/cancer.webp';
import yantraImg from '../../Marriage/cancer (2).webp';
import havanImg from '../../Marriage/cancer (3).webp';
import './MeshPujaStyle.css';

const PUJA_ID   = 'kark-puja';
const PUJA_NAME = 'Kark (Cancer) Puja';
const API_BASE  = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const pkgList = [
  {
    id:        'saral',
    name:      'Saral',
    subtitle:  'Essential Kark Puja',
    priceText: '₹ 5,100',
    price:     5100,
    pandits:   1,
    japa:      '11,000 mantras',
    duration:  '3 hours',
    features:  [
      '1 Vedic pandit',
      'Personal sankalp in your name & gotra',
      'Core mantra japa & offerings',
      'Aarti & prasad dispatch',
      'Video recording (where available)',
    ],
    featured: false,
  },
  {
    id:        'vishesh',
    name:      'Vishesh',
    subtitle:  'Recommended for strong remedies',
    priceText: '₹ 11,100',
    price:     11100,
    pandits:   3,
    japa:      '51,000 mantras',
    duration:  'Full day (8 hours)',
    features:  [
      '3 senior Vedic pandits',
      'Extended mantra japa',
      'Focused havan with multiple offerings',
      'Private live streaming link',
      'Energised yantra & prasad couriered',
    ],
    featured: true,
  },
  {
    id:        'maharaja',
    name:      'Maharaja',
    subtitle:  'Complete Anushthan',
    priceText: '₹ 25,100',
    price:     25100,
    pandits:   5,
    japa:      '1,25,000 mantras',
    duration:  '3-day anushthan',
    features:  [
      '5 senior pandits across 3 days',
      'High-count mantra sadhana',
      'Poorna-ahuti havan',
      'Multi-camera live broadcast',
      'Prasad hamper + consultation',
    ],
    featured: false,
  },
];

const benefits = [
  {
    "icon": Shield,
    "title": "Brings profound emotional healing",
    "desc": "Brings profound emotional healing, inner peace, and mental stability, ending destructive cycles of anxiety, depression, and emotional turbulence permanently. Strengthens the relationship with mother and maternal ﬁgures, healing wounds and lling that sacred bond with unconditional love. Dramatically improves sleep quality, eliminating insomnia and nightmares, replacing them with peaceful, prophetic, and deeply restorative dreams. Awakens and ampliﬁes psychic intuition, prophetic abilities, and spiritual sensitivity, transforming the native into a truly gifted seer."
  },
  {
    "icon": Heart,
    "title": "Enhances memory",
    "desc": "Enhances memory, imagination, creativity, and emotional intelligence, blessing the native with exceptional artistic and empathetic abilities."
  },
  {
    "icon": Briefcase,
    "title": "Supports fertility",
    "desc": "Supports fertility, pregnancy health, and safe childbirth by invoking the Moon's powerful nurturing and protective maternal energy."
  }
]
;

const steps = [
  {
    "n": "01",
    "title": "light and Chandra Dev is at",
    "desc": "light and Chandra Dev is at his absolute mightiest."
  },
  {
    "n": "02",
    "title": "ﬁeld with the Moon's divine frequency.",
    "desc": "ﬁeld with the Moon's divine frequency."
  },
  {
    "n": "03",
    "title": "lunar blessings and divine grace.",
    "desc": "lunar blessings and divine grace."
  },
  {
    "n": "04",
    "title": "and a silver bowl ﬁlled with",
    "desc": "and a silver bowl ﬁlled with raw milk."
  },
  {
    "n": "05",
    "title": "within and invite Lord Shiva's boundless",
    "desc": "within and invite Lord Shiva's boundless lunar blessings."
  },
  {
    "n": "06",
    "title": "Moon's silver light entering your heart",
    "desc": "Moon's silver light entering your heart and healing everything it touches."
  },
  {
    "n": "07",
    "title": "shadow of darkness clouding your emotional",
    "desc": "shadow of darkness clouding your emotional world."
  },
  {
    "n": "08",
    "title": "absolute favorite oﬀering.",
    "desc": "absolute favorite oﬀering."
  },
  {
    "n": "09",
    "title": "receives your prayers and answers them",
    "desc": "receives your prayers and answers them from the cosmos."
  }
];
const whyPoints = [
  "People perform Karka Rashi Puja to soothe the turbulent Moon energy, ending cycles of extreme mood swings, emotional distress, depression, and restoring lasting mental peace and calm.",
  "This puja strengthens the bond between a native and their mother, healing strained maternal relationships and attracting abundant motherly love, guidance, protection, and blessings into their life.",
  "People seeking to enhance psychic abilities, prophetic dreams, and spiritual intuition perform this puja to fully activate the Moon's powerful mystical and psychic dimensions within themselves.",
  "Individuals facing sleeplessness, nightmares, or disturbed dreams perform this puja to harness the Moon's calming energy and restore deep, restful, dream-ﬁlled, rejuvenating sleep every night.",
  "When Chandra is aﬄicted by Rahu, Ketu, or Saturn in the natal chart, this puja is performed to dissolve the Chandra Dosha and neutralize its deeply troubling eﬀects.",
  "New mothers, pregnant women, and those seeking fertility blessings perform this puja as Chandra governs the womb, fertility, and child-rearing, and can bless with divine conception and safe delivery."
];

const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const fadeLeft= { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
const fadeRight={ hidden: { opacity: 0, x: 24  }, show: { opacity: 1, x: 0 } };

export default function KarkPujaPage() {
  const [selectedPkg, setSelectedPkg] = useState('vishesh');
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
  const [availability, setAvail]      = useState(null);
  const [status, setStatus]           = useState('idle'); // idle | loading | success | error
  const [statusMsg, setMsg]           = useState('');
  const [bookedInfo, setBooked]       = useState(null);

  useEffect(() => {
    if (!form.date) { setAvail(null); return; }
    fetch(`${API_BASE}/api/puja-bookings/availability?pujaId=${PUJA_ID}&date=${form.date}`)
      .then(r => r.json()).then(setAvail).catch(() => setAvail(null));
  }, [form.date]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    if (status !== 'idle') { setStatus('idle'); setMsg(''); }
  };

  const isConflict = time => {
    if (!availability || !time) return false;
    const toMin = t => { const [h,m]=t.split(':').map(Number); return h*60+m; };
    return availability.bookedTimeWindows?.some(({start,end}) => {
      const c = toMin(time);
      return c >= toMin(start) && c < toMin(end);
    });
  };

  const timeHint = () => {
    if (!availability) return null;
    if (!availability.available) return { ok:false, msg:'No slots available for this date.' };
    if (form.time && isConflict(form.time)) return { ok:false, msg:'Time conflicts with a locked slot.' };
    return { ok:true, msg:`${availability.remainingSlots} slot(s) remaining today.` };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setStatus('error'); setStatusMsg('Please fill all required fields.'); return;
    }
    if (!form.dateOfBirth || !form.timeOfBirth || !form.gotra || !form.fatherName || !form.birthPlace || !form.pinCode || !form.pujaPurpose || !form.fullAddress || !form.nearestLandmark || !form.sankalpPlace) {
      setStatus('error'); setStatusMsg('Please fill all required booking details.'); return;
    }
    if (!form.agreeTerms) {
      setStatus('error'); setStatusMsg('Please accept terms and conditions to continue.'); return;
    }
    if (isConflict(form.time)) {
      setStatus('error'); setMsg('Your time conflicts with an existing booking.'); return;
    }
    const pkg = pkgList.find(p => p.id===selectedPkg);
    setStatus('loading');
    try {
      const res  = await fetch(`${API_BASE}/api/puja-bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          pujaId:PUJA_ID, pujaName:PUJA_NAME,
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
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||'Booking failed.');
      setStatus('success'); setMsg(data.message); setBooked(data.booking);
    } catch(err) { setStatus('error'); setMsg(err.message); }
  };

  const today = new Date().toISOString().split('T')[0];
  const hint  = timeHint();
  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <div className="mesh-puja-theme">
      <section className="mp-hero">
        <div className="mp-hero__bg">
          <img src={heroImg} alt="Kark (Cancer) Puja hero" />
          <div className="mp-hero__overlay-l" />
          <div className="mp-hero__overlay-b" />
        </div>
        <div className="mp-hero__content">
          <div className="mp-hero__inner">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration:0.8 }}>
              <div className="mp-hero__badge">Authentic Vedic Rituals</div>
              <h1 className="mp-serif mp-hero__title">
                Awaken Cancer.<br />
                <span className="mp-hero__title-accent">Align Kark.</span>
              </h1>
              <p className="mp-hero__desc mp-sans">
                Karka Rashi Puja is a deeply soulful V edic ritual performed for those born under the Cancer zodiac sign. Governed by the mystical Moon (Chandra) — the planet of emotions, intuition, and mother energy — this puja invokes Lord Shiva and Chandra Dev, bringing pr…
              </p>
              <div className="mp-hero__btns">
                <button className="mp-btn mp-btn--primary" onClick={() => scroll('book')}>Book Your Puja</button>
                <button className="mp-btn mp-btn--outline" onClick={() => scroll('about')}>Understand the Ritual</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="mp-section" style={{ background:'hsl(40,40%,98%)' }}>
        <div className="mp-container">
          <div className="mp-about__grid">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.8 }} className="mp-about__img-wrap">
              <div className="mp-about__img-glow" />
              <img src={yantraImg} alt="Yantra" className="mp-about__img" />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }}>
              <span className="mp-eyebrow">The Sacred Sankalpa</span>
              <h2 className="mp-section-title">
                What is the<br /><span style={{ fontStyle:'italic' }}>Kark Puja?</span>
              </h2>
              <div className="mp-about__body mp-sans">
                <p>Karka Rashi Puja is a deeply soulful V edic ritual performed for those born under the Cancer zodiac sign. Governed by the mystical Moon (Chandra) — the planet of emotions, intuition, and mother energy — this puja invokes Lord Shiva and Chandra Dev, bringing profound emotional healing, mental peace, maternal blessings, and the divine gift of heightened intuitive powers.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="benefits" className="mp-section mp-section--muted" style={{ position:'relative' }}>
        <div className="mp-dot-bg" />
        <div className="mp-container" style={{ position:'relative' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Why Devotees Perform It</span>
            <h2 className="mp-section-title">Blessings the Puja Bestows</h2>
            <p className="mp-section-sub">People perform Karka Rashi Puja to soothe the turbulent Moon energy, ending cycles of extreme mood swings, emotional distress, depression, and restoring lasting mental peace and calm.</p>
          </motion.div>

          {whyPoints.length > 0 && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1rem', marginBottom:'2.25rem' }}>
              {whyPoints.map((w, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.05 }} className="mp-benefit-card">
                  <h3 style={{ marginTop: 0 }}>Why #{i + 1}</h3>
                  <p style={{ marginBottom: 0 }}>{w}</p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mp-benefits__grid">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.08 }} className="mp-benefit-card">
                <div className="mp-benefit-icon"><Icon size={28} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mp-section" style={{ background:'hsl(40,40%,98%)' }}>
        <div className="mp-container">
          <div className="mp-process__grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-process__sticky">
              <span className="mp-eyebrow">The Ritual</span>
              <h2 className="mp-section-title">Steps of<br /><span style={{ fontStyle:'italic' }}>Devotion</span></h2>
              <p className="mp-section-sub" style={{ marginBottom:'2rem' }}>light and Chandra Dev is at his absolute mightiest.</p>
              <div className="mp-process__havan">
                <img src={havanImg} alt="Havan kund" />
              </div>
            </motion.div>
            <div className="mp-step-list">
              {steps.map((s, i) => (
                <motion.div key={s.n} variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.06 }} className="mp-step">
                  <div className="mp-step__num">{s.n}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mp-section mp-section--muted">
        <div className="mp-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Puja Packages</span>
            <h2 className="mp-section-title">Choose Your Anushthan</h2>
            <p className="mp-section-sub">Select the depth of sankalpa that matches your intention. All packages follow authentic Vedic vidhi.</p>
          </motion.div>
          <div className="mp-pkg-grid">
            {pkgList.map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1 }} className={`mp-pkg-card${p.featured?' mp-pkg-card--featured':''}`}>
                {p.featured && <div className="mp-pkg-badge">Most Chosen</div>}
                <div className="mp-pkg-name mp-serif">{p.name}</div>
                <div className="mp-pkg-subtitle">{p.subtitle}</div>
                <div className="mp-pkg-price-block">
                  <div className="mp-pkg-price mp-serif">{p.priceText}</div>
                  <div className="mp-pkg-meta">
                    <span>{p.pandits} pandit{p.pandits>1?'s':''}</span><span>·</span>
                    <span>{p.japa}</span><span>·</span><span>{p.duration}</span>
                  </div>
                </div>
                <ul className="mp-pkg-features">
                  {p.features.map(f => (
                    <li key={f}><Check size={14} strokeWidth={2.5} /> <span>{f}</span></li>
                  ))}
                </ul>
                <button className={`mp-btn mp-btn--full ${p.featured?'mp-btn--primary':'mp-btn--accent'}`} onClick={() => { setSelectedPkg(p.id); scroll('book'); }}>
                  Book {p.name} Puja
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="mp-section" style={{ background:'hsl(40,40%,98%)', position:'relative' }}>
        <div className="mp-glow-blob" />
        <div className="mp-container" style={{ position:'relative' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Book Your Puja</span>
            <h2 className="mp-section-title">Begin Your Sankalpa</h2>
            <p className="mp-section-sub">Share your details below. Our pandit-ji will confirm your slot and finalize the muhurat.</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}>
            <div className="mp-booking-card">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} className="mp-success">
                    <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:200, delay:0.1 }} className="mp-success__icon">
                      <Check size={40} strokeWidth={3} />
                    </motion.div>
                    <h3 className="mp-success__title mp-serif">Puja Booked Successfully!</h3>
                    <p className="mp-section-sub">{statusMsg}</p>
                    {bookedInfo && (
                      <div className="mp-success__summary mp-sans">
                        <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                        <p><strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime}</p>
                        <p><strong>Status:</strong> {bookedInfo.status}</p>
                      </div>
                    )}
                    <p className="mp-success__shubh">शुभं भवतु</p>
                    <button className="mp-btn mp-btn--outline" style={{ marginTop:'2rem' }} onClick={() => { setForm({
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
                      }); setStatus('idle'); }}>
                      Make Another Booking
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity:1 }} exit={{ opacity:0 }} className="mp-form">
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="name">Full Name (Sankalp Person) *</label>
                        <input className="mp-input" id="name" name="name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="phone">WhatsApp Number *</label>
                        <input className="mp-input" id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="email">Email *</label>
                        <input className="mp-input" id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="gender">Gender *</label>
                        <select className="mp-input" id="gender" name="gender" value={form.gender} onChange={handleChange} required>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="dateOfBirth">Date of Birth *</label>
                        <input className="mp-input" id="dateOfBirth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="timeOfBirth">Time of Birth *</label>
                        <input className="mp-input" id="timeOfBirth" name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="gotra">Gotra *</label>
                        <input className="mp-input" id="gotra" name="gotra" value={form.gotra} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="fatherName">Father's Name *</label>
                        <input className="mp-input" id="fatherName" name="fatherName" value={form.fatherName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="birthPlace">Birth Place *</label>
                        <input className="mp-input" id="birthPlace" name="birthPlace" value={form.birthPlace} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="pinCode">Pin Code *</label>
                        <input className="mp-input" id="pinCode" name="pinCode" value={form.pinCode} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mp-form-group">
                      <label className="mp-label" htmlFor="pujaPurpose">Puja Purpose *</label>
                      <textarea className="mp-textarea" id="pujaPurpose" name="pujaPurpose" rows={2} value={form.pujaPurpose} onChange={handleChange} required />
                    </div>
                    <div className="mp-form-group">
                      <label className="mp-label" htmlFor="fullAddress">Full Address *</label>
                      <textarea className="mp-textarea" id="fullAddress" name="fullAddress" rows={2} value={form.fullAddress} onChange={handleChange} required />
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="nearestLandmark">Nearest Landmark *</label>
                        <input className="mp-input" id="nearestLandmark" name="nearestLandmark" value={form.nearestLandmark} onChange={handleChange} required />
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="sankalpPlace">Sankalp Place *</label>
                        <input className="mp-input" id="sankalpPlace" name="sankalpPlace" value={form.sankalpPlace} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mp-form-row">
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="date">Puja Date *</label>
                        <input className="mp-input" id="date" name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                        {availability && (
                          <p className={`mp-avail ${availability.available ? 'mp-avail--ok' : 'mp-avail--full'}`}>
                            {availability.available
                              ? `${availability.remainingSlots}/${availability.totalSlots} slots available`
                              : 'No slots available on this date'}
                          </p>
                        )}
                      </div>
                      <div className="mp-form-group">
                        <label className="mp-label" htmlFor="time">Start Time *</label>
                        <input className="mp-input" id="time" name="time" type="time" min="05:00" max="19:00" step="1800" value={form.time} onChange={handleChange} required />
                        {hint && (
                          <p className={`mp-hint ${hint.ok ? 'mp-hint--ok' : 'mp-hint--err'}`}>
                            {hint.ok ? <Check size={12}/> : <AlertCircle size={12}/>} {hint.msg}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mp-form-group">
                      <label className="mp-label">Selected Package</label>
                      <div className="mp-pkg-picker">
                        {pkgList.map(p => (
                          <button type="button" key={p.id}
                            onClick={() => setSelectedPkg(p.id)}
                            className={`mp-pkg-pick-btn${selectedPkg===p.id?' mp-pkg-pick-btn--active':''}`}>
                            <div className="mp-pkg-pick-name mp-serif">{p.name}</div>
                            <div className="mp-pkg-pick-price">{p.priceText}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mp-form-group">
                      <label className="mp-label" htmlFor="message">Additional Notes</label>
                      <textarea className="mp-textarea" id="message" name="message" rows={3} value={form.message} onChange={handleChange} />
                    </div>
                    <div className="mp-form-group">
                      <label className="mp-label" htmlFor="agreeTerms" style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                        <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={form.agreeTerms} onChange={handleChange} required style={{ marginTop:'4px' }} />
                        <span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span>
                      </label>
                    </div>

                    {status==='error' && (
                      <div className="mp-error-banner">
                        <AlertCircle size={16} style={{ flexShrink:0, marginTop:2 }} />
                        <span>{statusMsg}</span>
                      </div>
                    )}

                    <button type="submit" disabled={status==='loading'} className="mp-btn mp-btn--primary mp-btn--full" style={{ paddingTop:'1rem', paddingBottom:'1rem', fontSize:'1.05rem' }}>
                      {status==='loading' ? <><Loader2 size={18} className="mp-spin" style={{ marginRight:8 }} /> Processing...</> : '🙏 Confirm Puja Booking'}
                    </button>
                    <p className="mp-note">By booking, you agree to our team contacting you to confirm muhurat. Each booking locks a 5-hour window. Max 5 pujas per day.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
