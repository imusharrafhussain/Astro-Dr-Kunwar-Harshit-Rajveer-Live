import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Briefcase, Users, Shield, Sparkles, Flame, Check, Loader2, AlertCircle } from 'lucide-react';

import heroImg   from '../../Marriage/aries.webp';
import yantraImg from '../../Marriage/aries (2).webp';
import havanImg  from '../../Marriage/aries (3).webp';
import './MeshPujaStyle.css';

const PUJA_ID   = 'mesh-puja';
const PUJA_NAME = 'Mesh (Aries) Puja';
const API_BASE  = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* ─── Data ──────────────────────────────────────────────────────────── */
const pkgList = [
  {
    id:        'saral',
    name:      'Saral',
    subtitle:  'Essential Aries Puja',
    priceText: '₹ 5,100',
    price:     5100,
    pandits:   1,
    japa:      '11,000 mantras',
    duration:  '3 hours',
    features:  [
      '1 Vedic pandit at Ujjain',
      '11,000 Mangal Beej Mantra japa',
      'Sankalpa in your name & gotra',
      'Havan with red sandalwood samidha',
      'Live video recording sent to you',
      'Prasad couriered within 7 days',
    ],
    featured: false,
  },
  {
    id:        'vishesh',
    name:      'Vishesh',
    subtitle:  'Recommended for Manglik Dosha',
    priceText: '₹ 11,100',
    price:     11100,
    pandits:   3,
    japa:      '51,000 mantras',
    duration:  'Full day (8 hours)',
    features:  [
      '3 senior Vedic pandits at Trimbakeshwar',
      '51,000 mantra japa with japa-mala',
      'Mangal Kavach paath & Mangal Stotram',
      'Extended havan with 11 samagri offerings',
      'Live HD streaming on private link',
      'Energised Mangal Yantra & red coral mala',
      'Prasad, kumkum & abhishek jal couriered',
    ],
    featured: true,
  },
  {
    id:        'maharaja',
    name:      'Maharaja',
    subtitle:  'Complete Mangal Shanti Anushthan',
    priceText: '₹ 25,100',
    price:     25100,
    pandits:   5,
    japa:      '1,25,000 mantras',
    duration:  '3-day anushthan',
    features:  [
      '5 senior pandits across 3 days at Varanasi',
      '1,25,000 mantra japa over 3 days',
      'Daily Rudrabhishek with Mangal mantras',
      'Poorna-ahuti havan with 21 samagris',
      'Navagraha shanti & Kumara puja included',
      '1080p multi-camera live broadcast',
      'Energised gold-plated Mangal Yantra',
      'Red coral ring (jyotish ratna), prasad hamper',
      '30-min personal jyotish consultation',
    ],
    featured: false,
  },
];

const benefits = [
  { Icon: Shield,   title: 'Pacifies Mangal Dosha',    desc: 'Neutralises the malefic effects of Mars in the 1st, 4th, 7th, 8th, and 12th houses, easing manglik afflictions.' },
  { Icon: Heart,    title: 'Removes Marital Delays',   desc: 'Clears karmic obstructions that delay marriage and brings harmony into existing relationships.' },
  { Icon: Briefcase,title: 'Career & Courage',         desc: 'Awakens initiative, leadership, and the warrior-spirit needed to break stagnation in profession and business.' },
  { Icon: Users,    title: 'Restores Family Peace',    desc: 'Calms the fire of unwarranted anger, sibling discord, and disputes within the household.' },
  { Icon: Flame,    title: 'Health & Vitality',        desc: 'Soothes Mars-governed ailments — blood disorders, inflammation, accidents, and chronic fatigue.' },
  { Icon: Sparkles, title: 'Spiritual Protection',     desc: 'Forms a kavach of divine grace that shields you from negative influences and untimely setbacks.' },
];

const steps = [
  { n: '01', title: 'Sankalpa',              desc: 'The pandit-ji takes your gotra, name, and intention before the deity, formally consecrating the puja in your name.' },
  { n: '02', title: 'Kalash Sthapana',       desc: 'A sacred copper kalash filled with holy water, mango leaves, coconut, and red flowers is established as the seat of divinity.' },
  { n: '03', title: 'Ganesh & Navagraha',    desc: 'Lord Ganesha is invoked first to remove obstacles, followed by veneration of all nine planets to balance their cosmic energies.' },
  { n: '04', title: 'Mangal Mantra Japa',    desc: '10,000 – 1,00,000 repetitions of the Mangal Beej Mantra and Mangal Stotram, chanted with japa-mala by trained Vedic priests.' },
  { n: '05', title: 'Havan',                 desc: 'Sacred fire is consecrated; offerings of khadira samidha, red sandalwood, ghee, and masoor dal are made with each mantra.' },
  { n: '06', title: 'Aarti & Pushpanjali',   desc: 'Camphor aarti and floral offerings are presented to Lord Mangal as the rite reaches its devotional crescendo.' },
  { n: '07', title: 'Prasad & Daan',         desc: 'Blessed prasad, red coral mala, and yantra are couriered to your doorstep along with the sankalpa video recording.' },
];

const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const fadeLeft= { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
const fadeRight={ hidden: { opacity: 0, x: 24  }, show: { opacity: 1, x: 0 } };

/* ─── Main Component ────────────────────────────────────────────────── */
export default function MeshPujaPage() {
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

      {/* ══════════ HERO ══════════ */}
      <section className="mp-hero">
        <div className="mp-hero__bg">
          <img src={heroImg} alt="Brass diya with marigolds" />
          <div className="mp-hero__overlay-l" />
          <div className="mp-hero__overlay-b" />
        </div>
        <div className="mp-hero__content">
          <div className="mp-hero__inner">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration:0.8 }}>
              <div className="mp-hero__badge">Authentic Vedic Rituals</div>
              <h1 className="mp-serif mp-hero__title">
                Awaken Courage.<br />
                <span className="mp-hero__title-accent">Pacify Mars.</span>
              </h1>
              <p className="mp-hero__desc mp-sans">
                A sacred, scripture-aligned Aries Puja performed by traditional Vedic priests for natives of Mesha Rashi. Resolve Mangal Dosha, overcome career blocks, and invite harmony.
              </p>
              <div className="mp-hero__btns">
                <button className="mp-btn mp-btn--primary" onClick={() => scroll('book')}>Book Your Puja</button>
                <button className="mp-btn mp-btn--outline" onClick={() => scroll('about')}>Understand the Ritual</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="mp-section" style={{ background:'hsl(40,40%,98%)' }}>
        <div className="mp-container">
          <div className="mp-about__grid">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.8 }} className="mp-about__img-wrap">
              <div className="mp-about__img-glow" />
              <img src={yantraImg} alt="Mangal Yantra" className="mp-about__img" />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }}>
              <span className="mp-eyebrow">The Sacred Sankalpa</span>
              <h2 className="mp-section-title">
                What is the<br /><span style={{ fontStyle:'italic' }}>Aries Puja?</span>
              </h2>
              <p className="mp-about__sanskrit">ॐ अं अंगारकाय नमः</p>
              <p className="mp-about__transliteration">Om Aṁ Aṅgārakāya Namaḥ — Salutations to Lord Mangal</p>
              <div className="mp-about__body mp-sans">
                <p>The Aries Puja is a sacred Vedic ritual performed for natives born under <span className="mp-hl">Mesha Rashi (Aries moon sign)</span> and for those whose birth chart shows affliction of <span className="mp-hl">Mangal (Mars)</span>, the ruling planet of Aries.</p>
                <p>Conducted by traditional pandits at the holiest sites — Ujjain, Trimbakeshwar, and Varanasi — this puja invokes <span className="mp-hl">Lord Mangal</span>, <span className="mp-hl">Lord Kartikeya</span>, and <span className="mp-hl">Lord Ram</span> through prescribed mantras, havan, and offerings of red sandalwood, masoor dal, and red flowers.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ BENEFITS ══════════ */}
      <section id="benefits" className="mp-section mp-section--muted" style={{ position:'relative' }}>
        <div className="mp-dot-bg" />
        <div className="mp-container" style={{ position:'relative' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Why Devotees Perform It</span>
            <h2 className="mp-section-title">Blessings the Puja Bestows</h2>
            <p className="mp-section-sub">Performed with shraddha and shastric precision, the Aries Puja transforms hardship into harmony — across body, mind, household, and destiny.</p>
          </motion.div>
          <div className="mp-benefits__grid">
            {benefits.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.08 }} className="mp-benefit-card">
                <div className="mp-benefit-icon"><Icon size={28} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section id="process" className="mp-section" style={{ background:'hsl(40,40%,98%)' }}>
        <div className="mp-container">
          <div className="mp-process__grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-process__sticky">
              <span className="mp-eyebrow">The Ritual</span>
              <h2 className="mp-section-title">Seven Steps of<br /><span style={{ fontStyle:'italic' }}>Devotion</span></h2>
              <p className="mp-section-sub" style={{ marginBottom:'2rem' }}>
                Every Aries Puja we conduct strictly follows the Brihat Parashara Hora and Mangal Kavach paddhatis — without abridgement, without shortcuts.
              </p>
              <div className="mp-process__havan">
                <img src={havanImg} alt="Havan kund with rising flames" />
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

      {/* ══════════ PACKAGES ══════════ */}
      <section id="packages" className="mp-section mp-section--muted">
        <div className="mp-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Puja Packages</span>
            <h2 className="mp-section-title">Choose Your Anushthan</h2>
            <p className="mp-section-sub">Every package is conducted with full shastric authenticity. Choose the depth of sankalpa that aligns with your circumstance.</p>
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
                <button
                  className={`mp-btn mp-btn--full ${p.featured?'mp-btn--primary':'mp-btn--accent'}`}
                  onClick={() => { setSelectedPkg(p.id); scroll('book'); }}
                >
                  Book {p.name} Puja
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BOOKING FORM ══════════ */}
      <section id="book" className="mp-section" style={{ background:'hsl(40,40%,98%)', position:'relative' }}>
        <div className="mp-glow-blob" />
        <div className="mp-container" style={{ position:'relative' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ duration:0.7 }} className="mp-text-center mp-max-2xl mp-mb-16">
            <span className="mp-eyebrow">Book Your Puja</span>
            <h2 className="mp-section-title">Begin Your Sankalpa</h2>
            <p className="mp-section-sub">Share your details below. Our pandit-ji will confirm your slot and finalize the muhurat within 24 hours.</p>
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
                    <button className="mp-btn mp-btn--outline" style={{ marginTop:'2rem' }}
                      onClick={() => { setForm({
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
                      {status==='loading'
                        ? <><Loader2 size={18} className="mp-spin" style={{ marginRight:8 }} /> Processing...</>
                        : '🙏 Confirm Puja Booking'}
                    </button>
                    <p className="mp-note">
                      By booking, you agree to our pandit-ji contacting you to confirm muhurat. Each booking locks a 5-hour window. Max 5 pujas per day.
                    </p>

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
