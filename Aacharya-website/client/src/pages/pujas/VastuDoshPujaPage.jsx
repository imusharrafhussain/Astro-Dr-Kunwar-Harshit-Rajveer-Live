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
import heroImage from '../../assets/vastu dosh pooja.jpg.jpeg'
import ritualImage from '../../assets/vastu dosh pooja 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = "vastu-dosh-puja"
const PUJA_NAME = "Vastu Dosh Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CONTENT = {
  "file": "VastuDoshPujaPage.jsx",
  "component": "VastuDoshPujaPage",
  "id": "vastu-dosh-puja",
  "name": "Vastu Dosh Puja",
  "heroTitleMain": "Vastu Dosh",
  "heroTitleAccent": "Puja",
  "quote": "When space is healed, life begins to flow in harmony.",
  "subtitle": "A sacred Vedic architectural cleansing to rebalance five elements and restore prosperity, peace, and protection.",
  "colorClass": "vastu",
  "icon": "🏛️",
  "shortDesc": {
    "en": "A sacred architectural healing ritual of Vedic science that purifies and rebalances the five elemental energies within a home or property, transforming spaces of discord and stagnation into vibrant temples of prosperity and harmony.",
    "hi": "वैदिक विज्ञान का एक पवित्र वास्तुकला उपचार अनुष्ठान जो घर या संपत्ति के भीतर पांच तात्विक ऊर्जाओं को शुद्ध और पुनर्संतुलित करता है, कलह और ठहराव के स्थानों को समृद्धि और सद्भाव के जीवंत मंदिरों में बदलता है।"
  },
  "whatIs": {
    "en": "Vastu Dosh Puja is the sacred science of healing your living space — a profound ritual rooted in Vastu Shastra, the ancient Indian architectural wisdom that teaches how cosmic energies flow through our built environments. Just as the human body requires healthy circulation of energy (prana), every home, office, or property requires a balanced flow of the five elements — Earth, Water, Fire, Air, and Space — to support the wellbeing, prosperity, and happiness of those who inhabit it.\n\nWhen a building is constructed with incorrect directional placements, blocked or imbalanced elemental zones, structural defects, or simply inherits the negative energy of previous occupants, it develops what is known as Vastu Dosh. The effects are strikingly personal: families in Vastu-defective homes report constant quarreling, financial drainage, chronic illness, disturbed sleep, failed businesses, and an oppressive heaviness that makes the home feel like a trap rather than a sanctuary.\n\nVastu Dosh Puja is the spiritual surgeon's answer — a ceremonial deep cleanse that removes accumulated negative energies, harmonizes the five elements, invokes protective divine presences into every corner of the space, and reprograms the home's energy field to radiate prosperity, love, and divine abundance. After this puja, residents consistently report that their home feels lighter, their relationships become warmer, and opportunities begin flowing again as if the universe has reopened its doors.",
    "hi": "वास्तु दोष पूजा आपके रहने की जगह को ठीक करने का पवित्र विज्ञान है — एक गहन अनुष्ठान जो वास्तु शास्त्र में निहित है, वह प्राचीन भारतीय वास्तुकला ज्ञान जो सिखाता है कि ब्रह्मांडीय ऊर्जाएं हमारे निर्मित वातावरण से कैसे प्रवाहित होती हैं। जैसे मानव शरीर को ऊर्जा (प्राण) के स्वस्थ संचलन की आवश्यकता है, वैसे ही प्रत्येक घर, कार्यालय को पांच तत्वों — पृथ्वी, जल, अग्नि, वायु और आकाश — के संतुलित प्रवाह की आवश्यकता है।\n\nजब एक इमारत गलत दिशा-स्थापनाओं के साथ बनाई जाती है, या पिछले निवासियों की नकारात्मक ऊर्जा विरासत में मिलती है, तो वास्तु दोष विकसित होता है। प्रभाव आश्चर्यजनक रूप से व्यक्तिगत होते हैं: वास्तु-दोषयुक्त घरों में परिवार लगातार झगड़ते हैं, वित्तीय नुकसान होता है, बीमारियां रहती हैं।\n\nवास्तु दोष पूजा इस समस्या का आध्यात्मिक शल्य-चिकित्सक का उत्तर है — एक औपचारिक गहरी सफाई जो नकारात्मक ऊर्जाओं को हटाती है, पांच तत्वों को सामंजस्य बनाती है, और घर के ऊर्जा क्षेत्र को समृद्धि, प्रेम और दिव्य प्रचुरता विकिरण करने के लिए पुनः प्रोग्राम करती है।"
  },
  "why": [
    {
      "en": "When a family experiences constant arguing, unexplained tension, and emotional distance despite loving intentions, it signals Vastu imbalance — and this puja restores the home's energetic harmony and peace.",
      "hi": "जब एक परिवार प्रेमपूर्ण इरादों के बावजूद लगातार बहस, अकारण तनाव और भावनात्मक दूरी का अनुभव करता है, तो यह वास्तु असंतुलन का संकेत है — और यह पूजा घर की ऊर्जावान सद्भावना को बहाल करती है।"
    },
    {
      "en": "Businesses operating from Vastu-defective spaces face customer loss, cash flow problems, and partnership disputes. This puja restructures the commercial space's energy to attract prosperity and growth.",
      "hi": "वास्तु-दोषयुक्त स्थानों से संचालित व्यवसायों को ग्राहक हानि और नकदी प्रवाह समस्याओं का सामना करना पड़ता है। यह पूजा व्यावसायिक स्थान की ऊर्जा को पुनर्संरचित करती है।"
    },
    {
      "en": "Family members in Vastu-defective homes suffer from insomnia, chronic illness, and low immunity. The puja purifies the elemental energies that directly impact health and biological vitality of residents.",
      "hi": "वास्तु-दोषयुक्त घरों में परिवार के सदस्य अनिद्रा, पुरानी बीमारी से पीड़ित होते हैं। यह पूजा तात्विक ऊर्जाओं को शुद्ध करती है जो निवासियों के स्वास्थ्य को सीधे प्रभावित करती हैं।"
    },
    {
      "en": "When structural changes to correct Vastu defects are impossible (in rented or ancient properties), this puja serves as the most effective non-structural spiritual remedy to neutralize the architectural flaws.",
      "hi": "जब वास्तु दोषों को सुधारने के लिए संरचनात्मक परिवर्तन असंभव हों (किराए या प्राचीन संपत्तियों में), तो यह पूजा वास्तुकला दोषों को निष्क्रिय करने के लिए सबसे प्रभावी गैर-संरचनात्मक उपाय है।"
    },
    {
      "en": "Moving into a new home or opening a new office — this puja is performed to spiritually consecrate the space, remove any negative residual energy from previous occupants and establish divine protection.",
      "hi": "नए घर में जाते समय या नया कार्यालय खोलते समय — यह पूजा स्थान को आध्यात्मिक रूप से पवित्र करने, पिछले निवासियों की नकारात्मक ऊर्जा को हटाने और दिव्य सुरक्षा स्थापित करने के लिए की जाती है।"
    },
    {
      "en": "Properties near cremation grounds, hospitals, or with negative historical events embedded in the land carry heavy energetic residue. Vastu Dosh Puja is performed to spiritually cleanse and reset the property's energy.",
      "hi": "श्मशान, अस्पतालों के पास की संपत्तियां या भूमि में निहित नकारात्मक ऐतिहासिक घटनाओं वाली संपत्तियां भारी ऊर्जावान अवशेष रखती हैं। वास्तु दोष पूजा संपत्ति की ऊर्जा को शुद्ध और रीसेट करती है।"
    }
  ],
  "benefits": [
    {
      "en": "Transforms the home's atmosphere from heavy and oppressive to light, welcoming, and filled with genuine warmth, positivity, and divine protective energy.",
      "hi": "घर के वातावरण को भारी और दमनकारी से हल्का, स्वागत योग्य और वास्तविक गर्मजोशी, सकारात्मकता और दिव्य सुरक्षात्मक ऊर्जा से भरे में बदलता है।"
    },
    {
      "en": "Dramatically improves financial flow — blocked income, stalled investments, and repeated business losses begin to reverse as elemental energies are realigned and harmonized.",
      "hi": "वित्तीय प्रवाह में नाटकीय रूप से सुधार करता है — अवरुद्ध आय, रुके निवेश और बार-बार व्यापारिक नुकसान उलटने लगते हैं क्योंकि तात्विक ऊर्जाएं पुनः संरेखित होती हैं।"
    },
    {
      "en": "Resolves chronic family conflicts and relationship tensions, replacing discord with understanding, patience, and a deeply harmonious family environment that nurtures everyone's growth.",
      "hi": "पुराने पारिवारिक संघर्षों और रिश्तों के तनाव को हल करता है, कलह को समझ, धैर्य और गहराई से सामंजस्यपूर्ण पारिवारिक वातावरण से बदलता है।"
    },
    {
      "en": "Significantly improves sleep quality, energy levels, and overall physical health of all residents by purifying the elemental energies that the human body interacts with daily.",
      "hi": "दैनिक रूप से मानव शरीर के साथ बातचीत करने वाली तात्विक ऊर्जाओं को शुद्ध करके सभी निवासियों की नींद की गुणवत्ता, ऊर्जा स्तर और समग्र शारीरिक स्वास्थ्य में महत्वपूर्ण सुधार करता है।"
    },
    {
      "en": "Protects the property and residents from accidents, theft, fire, natural disasters, and negative external energies by establishing a powerful divine energy shield around the entire premises.",
      "hi": "पूरे परिसर के चारों ओर एक शक्तिशाली दिव्य ऊर्जा ढाल स्थापित करके संपत्ति और निवासियों को दुर्घटनाओं, चोरी, आग, प्राकृतिक आपदाओं से बचाता है।"
    },
    {
      "en": "Activates the home's prosperity zones — the north for wealth, northeast for wisdom, east for health — drawing cosmic abundance directly into the family's physical living space.",
      "hi": "घर के समृद्धि क्षेत्रों को सक्रिय करता है — उत्तर धन के लिए, उत्तर-पूर्व ज्ञान के लिए, पूर्व स्वास्थ्य के लिए — ब्रह्मांडीय प्रचुरता को सीधे परिवार के भौतिक रहने की जगह में खींचता है।"
    }
  ],
  "steps": [
    {
      "title": "Vastu Purush Puja",
      "desc": "The Vastu Purush — the divine cosmic being residing within the property — is invoked and worshipped with offerings of five grains and sacred flowers."
    },
    {
      "title": "Panchabhoota Sthapana",
      "desc": "The five elements (Earth, Water, Fire, Air, Space) are ceremonially represented and balanced in their correct directional positions within the property."
    },
    {
      "title": "Ganesh Puja at Main Entrance",
      "desc": "Lord Ganesha is worshipped at the main entrance door as the guardian of thresholds — removing negative energies that enter through the primary gateway."
    },
    {
      "title": "Navgraha Puja in Center",
      "desc": "All nine planets are worshipped at the Brahmasthana (center) of the property, the energetic heart of the entire space, to harmonize cosmic energies."
    },
    {
      "title": "Sacred Smoke Purification (Dhoop)",
      "desc": "The entire property is purified room by room with sacred Vastu herbs, guggul resin, camphor, and cow dung smoke to cleanse negative energetic residue."
    },
    {
      "title": "Vastu Homa",
      "desc": "A sacred fire ritual is performed at the northeast corner — the most sacred Vastu direction — with offerings of ghee, sesame, and healing wood."
    },
    {
      "title": "Vastu Yantra Installation",
      "desc": "A powerful Vastu Yantra is energized and installed at the Brahmasthana or main entrance to permanently stabilize and protect the property's energy field."
    },
    {
      "title": "Holy Water Sprinkling (Jal Chhidakav)",
      "desc": "Ganga jal, turmeric water, and rose water are sprinkled in every room and corner, symbolically washing away all negative impressions from the space."
    },
    {
      "title": "Griha Pravesh Ritual",
      "desc": "The puja concludes with a mini Griha Pravesh ceremony — lighting the home's sacred lamp and offering the first meal cooked in a now-purified, blessed space."
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

export default function VastuDoshPujaPage() {
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
