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
import heroImage from '../../assets/pitra dosh pooja.jpg.jpeg'
import ritualImage from '../../assets/pitra dosh pooja 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = "pitra-dosh-puja"
const PUJA_NAME = "Pitra Dosh Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CONTENT = {
  "file": "PitraDoshPujaPage.jsx",
  "component": "PitraDoshPujaPage",
  "id": "pitra-dosh-puja",
  "name": "Pitra Dosh Puja",
  "heroTitleMain": "Pitra Dosh",
  "heroTitleAccent": "Puja",
  "quote": "Heal the ancestral line, and destiny begins to flow.",
  "subtitle": "A sacred Vedic ritual to honor and pacify ancestral souls whose unresolved karma may still affect the family lineage.",
  "colorClass": "pitra",
  "icon": "🌕",
  "shortDesc": {
    "en": "A sacred Vedic ritual to honor and pacify ancestral souls whose unfulfilled desires or improper last rites continue to create obstacles in the lives of their descendants.",
    "hi": "एक पवित्र वैदिक अनुष्ठान जो उन पूर्वज आत्माओं को सम्मान और शांति देने के लिए किया जाता है जिनकी अधूरी इच्छाएं या अनुचित अंतिम संस्कार उनके वंशजों के जीवन में बाधाएं उत्पन्न करती हैं।"
  },
  "whatIs": {
    "en": "Pitra Dosh Puja is one of the most powerful ancestral healing rituals in Vedic astrology and spirituality. The word \"Pitra\" means ancestors or forefathers, and \"Dosh\" means a flaw or cosmic affliction. When a horoscope carries Pitra Dosh — typically indicated by the Sun, Saturn, or Rahu in the 9th house — it signals that the souls of one's ancestors have not attained peace. Perhaps their last rites were not properly performed, their final wishes remained unfulfilled, or they departed this world in suffering or trauma.\n\nThis unresolved ancestral karma creates a ripple effect across generations — manifesting as persistent financial struggles, health crises, failed relationships, repeated miscarriages, delayed marriages, or inexplicable misfortune that shadows the family like a dark cloud. The effects of Pitra Dosh are not a punishment but a cosmic whisper — a call from the soul realm asking for acknowledgment, remembrance, and liberation.\n\nPerformed especially during Pitru Paksha, Amavasya, or Mahalaya, this puja involves prayers, tarpan (water offerings), pind daan, and Brahmin bhojan — rituals that build a luminous bridge between the world of the living and the realm of departed souls, bringing divine peace to both.",
    "hi": "पित्र दोष पूजा वैदिक ज्योतिष और अध्यात्म की सबसे शक्तिशाली पूर्वज उपचार विधियों में से एक है। \"पित्र\" का अर्थ है पूर्वज और \"दोष\" का अर्थ है ब्रह्मांडीय पीड़ा। जब कुंडली में पित्र दोष होता है — जो सूर्य, शनि या राहु की नवम भाव में स्थिति से संकेतित होता है — यह दर्शाता है कि पूर्वजों की आत्माओं को शांति नहीं मिली। शायद उनका अंतिम संस्कार ठीक से नहीं हुआ, अंतिम इच्छाएं अधूरी रह गईं, या वे पीड़ा में इस लोक से विदा हुए।\n\nयह अनसुलझा पूर्वज कर्म पीढ़ियों तक प्रभाव डालता है — स्थायी आर्थिक संघर्ष, स्वास्थ्य संकट, असफल रिश्ते, बार-बार गर्भपात, विवाह में देरी के रूप में प्रकट होता है। पित्र दोष के प्रभाव कोई दंड नहीं, बल्कि एक ब्रह्मांडीय पुकार हैं — आत्मा लोक से स्वीकृति, स्मरण और मुक्ति की मांग।\n\nपितृ पक्ष, अमावस्या या महालय पर विशेष रूप से की जाने वाली इस पूजा में तर्पण, पिंड दान और ब्राह्मण भोजन शामिल हैं — ऐसे अनुष्ठान जो जीवित लोगों और दिवंगत आत्माओं के बीच एक दिव्य सेतु बनाते हैं और दोनों को शांति प्रदान करते हैं।"
  },
  "why": [
    {
      "en": "To free the family lineage from the curse of unsettled ancestral souls who departed without proper last rites, causing repeated patterns of misfortune and suffering across multiple generations.",
      "hi": "उन अशांत पूर्वज आत्माओं के श्राप से परिवार की वंशावली को मुक्त करने के लिए जो उचित अंतिम संस्कार के बिना गए और जिनके कारण पीढ़ियों में दुर्भाग्य के पैटर्न बनते हैं।"
    },
    {
      "en": "To address unexplained misfortunes, chronic illnesses, and financial blockages that persist despite sincere efforts, which may deeply stem from unresolved ancestral karma affecting descendants.",
      "hi": "अकारण दुर्भाग्य, दीर्घकालिक बीमारी और वित्तीय रुकावटों को दूर करने के लिए जो ईमानदार प्रयासों के बावजूद बनी रहती हैं और अनसुलझे पूर्वज कर्म से उत्पन्न होती हैं।"
    },
    {
      "en": "To seek blessings and divine protection from forefathers, ensuring their positive energy flows into the family, bringing prosperity, health, and harmony into the lives of all living members.",
      "hi": "पूर्वजों से आशीर्वाद और दिव्य सुरक्षा प्राप्त करने के लिए, यह सुनिश्चित करने के लिए कि उनकी सकारात्मक ऊर्जा परिवार में प्रवाहित हो और सभी जीवित सदस्यों के जीवन में समृद्धि लाए।"
    },
    {
      "en": "When children fall ill repeatedly, marriages face constant delay, or pregnancies fail — this puja is performed to neutralize the hidden ancestral influences quietly working against the family.",
      "hi": "जब परिवार के बच्चे बार-बार बीमार पड़ते हैं, विवाह में देरी होती है या गर्भावस्था असफल होती है — तो परिवार के विरुद्ध काम कर रहे छिपे पूर्वज प्रभावों को निष्क्रिय करने के लिए यह पूजा की जाती है।"
    },
    {
      "en": "To perform the sacred duty of tarpan and pind daan for ancestors who missed proper rituals, helping their wandering souls attain liberation and ascend toward the higher realms of existence.",
      "hi": "उन पूर्वजों के लिए तर्पण और पिंड दान का पवित्र कर्तव्य निभाने के लिए जिन्हें उचित अनुष्ठान नहीं मिले, ताकि उनकी भटकती आत्माएं मुक्ति प्राप्त करें और उच्च लोकों की ओर बढ़ें।"
    },
    {
      "en": "On sacred occasions like Pitru Paksha, this puja maintains a living bond with ancestors, expressing gratitude for the life, wisdom, and cosmic legacy they so lovingly passed down to us.",
      "hi": "पितृ पक्ष जैसे पवित्र अवसरों पर, यह पूजा पूर्वजों के साथ जीवंत बंधन बनाए रखती है और उनके द्वारा दिए गए जीवन, ज्ञान और ब्रह्मांडीय विरासत के लिए कृतज्ञता व्यक्त करती है।"
    }
  ],
  "benefits": [
    {
      "en": "Removes generational curses and persistent misfortunes that have been haunting the family for multiple generations without any apparent cause.",
      "hi": "पीढ़ीगत श्रापों और स्थायी दुर्भाग्य को दूर करता है जो बिना किसी स्पष्ट कारण के कई पीढ़ियों से परिवार को परेशान कर रहे हैं।"
    },
    {
      "en": "Brings peace to departed souls, creating a harmonious flow of positive ancestral energy and divine blessings into the family's present life.",
      "hi": "दिवंगत आत्माओं को शांति देता है और परिवार के वर्तमान जीवन में सकारात्मक पूर्वज ऊर्जा और दिव्य आशीर्वाद का सामंजस्यपूर्ण प्रवाह बनाता है।"
    },
    {
      "en": "Resolves long-standing obstacles in marriage, career, and financial growth that conventional methods fail to permanently solve for the family.",
      "hi": "विवाह, कैरियर और वित्तीय विकास में दीर्घकालिक बाधाओं को हल करता है जिन्हें पारंपरिक तरीके स्थायी रूप से हल करने में विफल रहते हैं।"
    },
    {
      "en": "Improves health and vitality of family members, especially children, who may unknowingly be suffering under heavy ancestral karmic debts.",
      "hi": "परिवार के सदस्यों, विशेषकर बच्चों के स्वास्थ्य और जीवन शक्ति में सुधार करता है जो अनजाने में पूर्वज कर्म ऋण के कारण पीड़ित हो सकते हैं।"
    },
    {
      "en": "Restores mental peace and emotional stability to family members plagued by anxiety, depression, or unexplainable restlessness without any clear reason.",
      "hi": "बिना किसी स्पष्ट कारण के चिंता, अवसाद या अकारण बेचैनी से पीड़ित परिवार के सदस्यों को मानसिक शांति और भावनात्मक स्थिरता देता है।"
    },
    {
      "en": "Opens the path toward spiritual growth and liberation for both the living descendants and the souls of beloved departed ancestors simultaneously.",
      "hi": "जीवित वंशजों और दिवंगत प्रिय पूर्वजों की आत्माओं दोनों के लिए एक साथ आध्यात्मिक विकास और मुक्ति का मार्ग खोलता है।"
    }
  ],
  "steps": [
    {
      "title": "Sankalp (Sacred Vow)",
      "desc": "The devotee takes a formal vow before the deity, declaring intent and naming the lineage of ancestors being honored."
    },
    {
      "title": "Kalash Sthapana",
      "desc": "A sacred copper or clay pot filled with holy water, mango leaves, and coconut is installed as a divine cosmic witness."
    },
    {
      "title": "Ganesh Puja",
      "desc": "Lord Ganesha is invoked first to remove all obstacles and bless the ritual with success, auspiciousness, and divine acceptance."
    },
    {
      "title": "Navgraha Puja",
      "desc": "All nine planets are worshipped to calm negative planetary energies that may be intensifying the Pitra Dosh in the horoscope."
    },
    {
      "title": "Pitra Puja & Tarpan",
      "desc": "Sacred water with sesame seeds and flowers is offered to ancestors with Vedic mantras, calling their souls with love and reverence."
    },
    {
      "title": "Pind Daan",
      "desc": "Rice balls called pindas are offered as symbolic nourishment to the ancestors, helping their souls attain eternal peace and liberation."
    },
    {
      "title": "Homam (Sacred Fire)",
      "desc": "Ghee, sesame seeds, and medicinal herbs are offered into the sacred fire with powerful Vedic chants to purify ancestral karma."
    },
    {
      "title": "Brahmin Bhojan",
      "desc": "Learned Brahmin priests are honored with a sacred meal and dakshina on behalf of the ancestors as an act of divine service."
    },
    {
      "title": "Visarjan (Immersion)",
      "desc": "The ritual concludes with offerings immersed in a holy river, symbolizing the final liberation and ascension of ancestral souls."
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

export default function PitraDoshPujaPage() {
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
