import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import heroImage from '../../assets/grahan dosh pooja.jpg.jpeg'
import ritualImage from '../../assets/grahan dosh pooja 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = "grahan-dosh-puja"
const PUJA_NAME = "Grahan Dosh Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CONTENT = {
  "file": "GrahanDoshPujaPage.jsx",
  "component": "GrahanDoshPujaPage",
  "id": "grahan-dosh-puja",
  "name": "Grahan Dosh Puja",
  "heroTitleMain": "Grahan Dosh",
  "heroTitleAccent": "Puja",
  "quote": "When eclipse shadow lifts, inner light returns.",
  "subtitle": "A mystical Vedic ritual to dissolve Rahu-Ketu eclipse shadows over Sun and Moon in the birth chart.",
  "colorClass": "grahan",
  "icon": "🌑",
  "shortDesc": {
    "en": "A rare and mystical Vedic ritual performed to eliminate the shadow curse of Rahu and Ketu — the eclipse nodes — whose cosmic conjunction with the Sun or Moon creates profound darkness in a person's mind, destiny, and divine connection.",
    "hi": "एक दुर्लभ और रहस्यमय वैदिक अनुष्ठान जो राहु और केतु — ग्रहण ग्रहों — की छाया श्राप को समाप्त करने के लिए किया जाता है, जिनका सूर्य या चंद्रमा के साथ ब्रह्मांडीय संयोग व्यक्ति के मन, भाग्य और दिव्य संबंध में गहरा अंधकार पैदा करता है।"
  },
  "whatIs": {
    "en": "Grahan Dosh Puja is one of the most mysterious and powerful remedial rituals in Vedic astrology — performed to break the cosmic shadow cast by Rahu (North Node) and Ketu (South Node) when they conjunct or closely afflict the Sun or Moon in a person's natal chart. The word \"Grahan\" literally means eclipse, and an eclipse, in spiritual terms, represents the temporary but devastating darkening of one's inner light.\n\nWhen the Sun is eclipsed by Rahu or Ketu in the horoscope, it creates Surya Grahan Dosh — affecting the person's self-confidence, authority, father's health, government relations, and soul identity. When the Moon is afflicted, it creates Chandra Grahan Dosh — causing severe emotional instability, mental health challenges, disturbed sleep, anxiety, disconnection from one's mother, and a deep, inexplicable inner darkness.\n\nPeople with Grahan Dosh often feel as though a perpetual fog surrounds their life — clarity is elusive, success slips away at the last moment, and emotional peace feels permanently out of reach. The puja performed on solar or lunar eclipse days carries ten thousand times the spiritual potency of a normal day. Through this ritual, the shadow of Rahu and Ketu is ceremonially dissolved, the luminaries are restored to their divine brilliance, and the devotee reclaims their inner light.",
    "hi": "ग्रहण दोष पूजा वैदिक ज्योतिष में सबसे रहस्यमय और शक्तिशाली उपचारात्मक अनुष्ठानों में से एक है — जो राहु (उत्तरी नोड) और केतु (दक्षिणी नोड) द्वारा डाली गई ब्रह्मांडीय छाया को तोड़ने के लिए की जाती है। \"ग्रहण\" का शाब्दिक अर्थ ग्रहण है, और आध्यात्मिक दृष्टि से ग्रहण अपने आंतरिक प्रकाश के अस्थायी लेकिन विनाशकारी कालेपन का प्रतिनिधित्व करता है।\n\nजब सूर्य राहु या केतु से ग्रस्त होता है, तो सूर्य ग्रहण दोष बनता है — व्यक्ति का आत्मविश्वास, अधिकार, पिता का स्वास्थ्य और आत्मा की पहचान प्रभावित होती है। जब चंद्रमा पीड़ित होता है, तो चंद्र ग्रहण दोष बनता है — गंभीर भावनात्मक अस्थिरता, मानसिक स्वास्थ्य चुनौतियां, परेशान नींद, चिंता और गहरा अकारण अंतर्मन का अंधकार पैदा होता है।\n\nग्रहण दोष वाले लोग अक्सर महसूस करते हैं कि उनके जीवन के चारों ओर एक स्थायी धुंध है। सौर या चंद्र ग्रहण के दिन की गई पूजा सामान्य दिन की तुलना में दस हजार गुना आध्यात्मिक शक्ति रखती है।"
  },
  "why": [
    {
      "en": "Rahu and Ketu's eclipse over the Sun or Moon creates an unshakeable mental fog — perpetual confusion, self-doubt, and identity crisis that this puja dissolves through divine solar and lunar restoration.",
      "hi": "सूर्य या चंद्रमा पर राहु और केतु का ग्रहण एक अटूट मानसिक धुंध बनाता है — स्थायी भ्रम, आत्म-संदेह — जिसे यह पूजा दिव्य सूर्य-चंद्र पुनर्स्थापना के माध्यम से विघटित करती है।"
    },
    {
      "en": "People born during an actual solar or lunar eclipse carry this dosh from birth — and this puja is the specific, targeted remedy to neutralize the lifelong shadow of the eclipse they were born under.",
      "hi": "वास्तविक सूर्य या चंद्र ग्रहण के दौरान पैदा हुए लोग जन्म से यह दोष लेकर आते हैं — और यह पूजा उनके जन्म के ग्रहण की आजीवन छाया को निष्क्रिय करने का विशिष्ट उपाय है।"
    },
    {
      "en": "Chandra Grahan Dosh causes severe depression, phobias, and disconnection from reality. This puja heals the psychic wounds of the moon and restores emotional clarity, stability, and motherly warmth.",
      "hi": "चंद्र ग्रहण दोष गंभीर अवसाद, भय और वास्तविकता से वियोग का कारण बनता है। यह पूजा चंद्रमा के मानसिक घावों को ठीक करती है और भावनात्मक स्पष्टता और मातृ स्नेह को बहाल करती है।"
    },
    {
      "en": "Surya Grahan Dosh destroys confidence, authority, and the relationship with the father or government. This puja restores the solar light of self-worth, power, and divine recognition in the person's life.",
      "hi": "सूर्य ग्रहण दोष आत्मविश्वास, अधिकार और पिता या सरकार के साथ संबंध नष्ट करता है। यह पूजा व्यक्ति के जीवन में आत्म-मूल्य और दिव्य मान्यता के सौर प्रकाश को बहाल करती है।"
    },
    {
      "en": "Success that repeatedly comes close and then slips away, opportunities that vanish at the last moment, relationships that darken suddenly — all classic Grahan Dosh signs that this puja powerfully addresses.",
      "hi": "सफलता जो बार-बार करीब आती है और फिर फिसल जाती है, अवसर जो अंतिम क्षण में गायब होते हैं — ये सभी ग्रहण दोष के क्लासिक संकेत हैं जिन्हें यह पूजा शक्तिशाली ढंग से संबोधित करती है।"
    },
    {
      "en": "Eclipse days are cosmically charged windows of extraordinary spiritual power. Performing this puja on an actual Grahan day multiplies its healing power ten-thousandfold compared to any ordinary day.",
      "hi": "ग्रहण के दिन असाधारण आध्यात्मिक शक्ति की ब्रह्मांडीय रूप से आवेशित खिड़कियां हैं। वास्तविक ग्रहण दिन पर यह पूजा करना इसकी उपचार शक्ति को सामान्य दिन की तुलना में दस हजार गुना बढ़ा देता है।"
    }
  ],
  "benefits": [
    {
      "en": "Lifts the perpetual mental fog of Grahan Dosh, restoring sharp mental clarity, decisive confidence, and a radiant sense of personal identity and purpose.",
      "hi": "ग्रहण दोष की स्थायी मानसिक धुंध को उठाता है, तीव्र मानसिक स्पष्टता, निर्णायक आत्मविश्वास और व्यक्तिगत पहचान की दीप्तिमान भावना को बहाल करता है।"
    },
    {
      "en": "Heals deep emotional wounds, chronic depression, phobias, and psychological instability rooted in the eclipsed Moon's shadow over the mind.",
      "hi": "ग्रस्त चंद्रमा की मन पर छाया में निहित गहरे भावनात्मक घावों, पुरानी अवसाद, भय और मनोवैज्ञानिक अस्थिरता को ठीक करता है।"
    },
    {
      "en": "Restores blocked success, fame, and recognition by liberating the Sun from Rahu/Ketu's shadow and reigniting the person's solar power and authority.",
      "hi": "सूर्य को राहु/केतु की छाया से मुक्त करके और व्यक्ति की सौर शक्ति को पुनः प्रज्वलित करके अवरुद्ध सफलता, प्रसिद्धि और मान्यता को बहाल करता है।"
    },
    {
      "en": "Repairs the relationship with the father (Sun) and mother (Moon), healing family wounds and restoring love, respect, and emotional connection to these vital bonds.",
      "hi": "पिता (सूर्य) और माता (चंद्रमा) के साथ संबंध की मरम्मत करता है, पारिवारिक घावों को ठीक करता है और इन महत्वपूर्ण बंधनों में प्रेम और भावनात्मक संबंध को बहाल करता है।"
    },
    {
      "en": "Clears Rahu/Ketu karmic residue from past lives, breaking cycles of confusion, spiritual blindness, and self-destructive patterns carried across multiple incarnations.",
      "hi": "पिछले जन्मों से राहु/केतु कर्म अवशेषों को साफ करता है, कई जन्मों में किए जा रहे भ्रम, आध्यात्मिक अंधापन और आत्म-विनाशकारी पैटर्न के चक्रों को तोड़ता है।"
    },
    {
      "en": "Dramatically amplifies spiritual growth and intuitive powers — because once the eclipse lifts, the soul's connection to divine cosmic consciousness becomes brilliantly clear.",
      "hi": "आध्यात्मिक विकास और सहज शक्तियों को नाटकीय रूप से बढ़ाता है — क्योंकि ग्रहण के उठते ही आत्मा का दिव्य ब्रह्मांडीय चेतना से संबंध शानदार रूप से स्पष्ट हो जाता है।"
    }
  ],
  "steps": [
    {
      "title": "Pradosh Snan (Pre-dawn Bath)",
      "desc": "The devotee bathes before sunrise — ideally in a holy river — to purify the aura and create sacred receptivity to the ritual's power."
    },
    {
      "title": "Surya/Chandra Puja",
      "desc": "The Sun or Moon (depending on the type of Grahan Dosh) is worshipped with arghya (water offering), white flowers, and Vedic solar/lunar mantras."
    },
    {
      "title": "Rahu-Ketu Shanti Puja",
      "desc": "Rahu and Ketu are propitiated with blue and grey flowers, multi-colored cloth, and coal offerings to neutralize their shadowing eclipse energy."
    },
    {
      "title": "Mahamrityunjaya Jaap",
      "desc": "The Mahamrityunjaya Mantra is chanted 1,008 times to invoke Lord Shiva's divine protective light against the darkness of Grahan Dosh."
    },
    {
      "title": "Grahan Nivaran Homa",
      "desc": "A special homa is performed with mixed herbs, camphor, and ghee — the sacred fire symbolically consuming and dissolving the eclipse shadow."
    },
    {
      "title": "Navagraha Shanti",
      "desc": "All nine planets are collectively pacified with tailored offerings to create planetary harmony and remove conflict between luminaries and shadow planets."
    },
    {
      "title": "Surya/Chandra Yantra Energization",
      "desc": "A Surya or Chandra Yantra is energized and given to the devotee to wear or keep at the altar as a permanent anti-eclipse protective shield."
    },
    {
      "title": "Eclipse Day Optional Ritual",
      "desc": "If possible, the core rituals are performed during an actual solar or lunar eclipse for ten-thousand-fold amplification of the puja's healing potency."
    },
    {
      "title": "Visarjan and Prasad",
      "desc": "The ritual concludes by releasing offerings into flowing water at sunset, and white sweet rice (kheer) prasad is distributed to all present."
    }
  ]
}
const PACKAGES = [
  {
    "id": "saral",
    "name": "Saral Puja",
    "sanskrit": "सरल पूजा",
    "price": 5100,
    "duration": "2 Hours",
    "pandits": "1 Pandit",
    "chants": "Core Japa",
    "features": [
      "Basic samagri included",
      "Sankalp in your name",
      "Live video on request",
      "Prasad couriered"
    ]
  },
  {
    "id": "vishesh",
    "name": "Vishesh Puja",
    "sanskrit": "विशेष पूजा",
    "price": 11100,
    "duration": "4 Hours",
    "pandits": "3 Pandits",
    "chants": "Advanced Japa",
    "features": [
      "Premium samagri",
      "Detailed havan",
      "HD live streaming",
      "Personalized sankalp video",
      "Prasad + guidance"
    ],
    "popular": true
  },
  {
    "id": "maha",
    "name": "Maha Puja",
    "sanskrit": "महा पूजा",
    "price": 21100,
    "duration": "Full Day",
    "pandits": "5 Pandits",
    "chants": "Maha Anushthan",
    "features": [
      "Family sankalp",
      "Extended multi-ritual vidhi",
      "Grand havan sequence",
      "Premium prasad hamper",
      "Astrologer consultation"
    ]
  }
]

export default function GrahanDoshPujaPage() {
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
    const pkg = PACKAGES.find(x => x.id === selectedPkg)
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
    <div className={`ks-page ks-theme-${CONTENT.colorClass}`}>
      <section className="ks-hero" style={{ '--ks-hero-image': `url(${heroImage})` }}>
        <div className="ks-hero-overlay" />
        <div className="ks-hero-content">
          <p className="ks-badge">✦ Dosha Nivaran Series ✦</p>
          <h1>{CONTENT.heroTitleMain} <span>{CONTENT.heroTitleAccent}</span></h1>
          <p className="ks-quote">{CONTENT.quote}</p>
          <p className="ks-subtitle">{CONTENT.subtitle}</p>
          <div className="ks-actions">
            <a href="#booking" className="ks-btn ks-btn-gold">Book Your Sacred Puja <FiChevronRight /></a>
            <a href="#about" className="ks-btn ks-btn-outline">Learn the Significance</a>
          </div>
        </div>
      </section>

      <section id="about" className="ks-section">
        <div className="ks-container ks-about">
          <div className="ks-about-image"><img src={ritualImage} alt={`${PUJA_NAME} ritual`} /></div>
          <div>
            <p className="ks-label">Sacred Understanding</p>
            <h2>{CONTENT.name}</h2>
            <div className="ks-bilingual-card">
              <p className="ks-bilingual-en">{CONTENT.shortDesc.en}</p>
              <p className="ks-bilingual-hi">{CONTENT.shortDesc.hi}</p>
            </div>
            {CONTENT.whatIs.en.split('\n\n').map((enP, i) => (
              <div key={i} className="ks-bilingual-card">
                <p className="ks-bilingual-en">{enP}</p>
                <p className="ks-bilingual-hi">{CONTENT.whatIs.hi.split('\n\n')[i] || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section ks-dark">
        <div className="ks-container">
          <p className="ks-label center">The Calling</p>
          <h2 className="center">Why Devotees Perform This Puja</h2>
          <div className="ks-point-list">
            {CONTENT.why.map((w, i) => (
              <div key={i} className="ks-point-card">
                <span className="ks-point-num">{i + 1}</span>
                <div>
                  <p className="ks-point-en">{w.en}</p>
                  <p className="ks-point-hi">{w.hi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-container">
          <p className="ks-label center">Divine Benefits</p>
          <h2 className="center">Benefits of the Puja</h2>
          <div className="ks-point-list">
            {CONTENT.benefits.map((b, i) => (
              <div key={i} className="ks-point-card light">
                <span className="ks-point-num">{i + 1}</span>
                <div>
                  <p className="ks-point-en">{b.en}</p>
                  <p className="ks-point-hi">{b.hi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section ks-process">
        <div className="ks-container">
          <p className="ks-label center">Sacred Vidhi</p>
          <h2 className="center">Ritual Process — Step by Step</h2>
          <div className="ks-point-list">
            {CONTENT.steps.map((s, i) => (
              <div key={i} className="ks-point-card light">
                <span className="ks-point-num">{i + 1}</span>
                <div>
                  <p className="ks-point-en"><strong>{s.title}</strong> — {s.desc}</p>
                </div>
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
                <ul>{pkg.features.map((f, idx) => <li key={idx}><FiCheck /> {f}</li>)}</ul>
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
                <h3>Take the first step toward divine correction.</h3>
                <p>Our senior pandit ji will guide the right muhurat and complete ritual flow based on your dosha details.</p>
                <div className="ks-book-points">
                  <div><FiPhone /> +91 98XXX XXXXX</div>
                  <div><FiMapPin /> Online and temple-based options</div>
                  <div><FiClock /> Available 7 AM - 9 PM (All days)</div>
                  <div><FiUsers /> Experienced Vedic ritual team</div>
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
    </div>
  )
}
