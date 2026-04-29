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
import heroImage from '../../assets/mangal dosh pooja.jpg.jpeg'
import ritualImage from '../../assets/mangal dosh pooja 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = "mangal-dosh-puja"
const PUJA_NAME = "Mangal Dosh Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CONTENT = {
  "file": "MangalDoshPujaPage.jsx",
  "component": "MangalDoshPujaPage",
  "id": "mangal-dosh-puja",
  "name": "Mangal Dosh Puja",
  "heroTitleMain": "Mangal Dosh",
  "heroTitleAccent": "Puja",
  "quote": "Transform Mars' fire from conflict into divine strength.",
  "subtitle": "A powerful Vedic ritual to neutralize the aggressive influence of Mars in marriage, health, and relationships.",
  "colorClass": "mangal",
  "icon": "🔴",
  "shortDesc": {
    "en": "A powerful Vedic ritual performed to neutralize the fiery and aggressive influence of Mars (Mangal) in the horoscope, which creates turmoil in marriage, health, and relationships.",
    "hi": "एक शक्तिशाली वैदिक अनुष्ठान जो कुंडली में मंगल (Mars) के उग्र और आक्रामक प्रभाव को निष्क्रिय करने के लिए किया जाता है, जो विवाह, स्वास्थ्य और रिश्तों में उथल-पुथल पैदा करता है।"
  },
  "whatIs": {
    "en": "Mangal Dosh Puja is a profound Vedic ritual dedicated to appeasing the fiery and warrior planet Mars — known as Mangal in Vedic astrology. When Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house of a person's horoscope, it creates what is known as Mangal Dosh, Kuja Dosh, or Manglik Dosh — one of the most feared and widely discussed astrological afflictions in Indian tradition.\n\nMars, the planet of fire, aggression, energy, and war, when ill-placed becomes a volatile force that disrupts marital harmony, increases temperament and impulsiveness, causes accidents, and creates perpetual friction in personal relationships. A Manglik person is said to carry a powerful martial energy that, if unbalanced, can harm their partner's health or longevity.\n\nThis puja is a cosmic reset — a sacred act of channeling Mars' raw, wild energy into a constructive divine force. Through mantras, homa, and prayers at sacred Mangal temples like Ujjain's Mangalnath, the energy of Mars is transformed from destructive fire into the fire of courage, leadership, and victory. Once performed, devotees report dramatic improvements in their relationships, temperament, and overall fortune — as if a fire that once burned them now lights their way.",
    "hi": "मंगल दोष पूजा एक गहन वैदिक अनुष्ठान है जो अग्नि और योद्धा ग्रह मंगल को शांत करने के लिए समर्पित है। जब मंगल किसी की कुंडली के 1, 2, 4, 7, 8 या 12वें भाव में स्थित होता है, तो यह मंगल दोष, कुज दोष या मांगलिक दोष बनाता है — भारतीय परंपरा में सबसे भयभीत और व्यापक रूप से चर्चित ज्योतिषीय पीड़ाओं में से एक।\n\nमंगल — अग्नि, आक्रामकता, ऊर्जा और युद्ध का ग्रह — जब अशुभ स्थिति में होता है तो वैवाहिक सौहार्द को बाधित करता है, स्वभाव में उग्रता और आवेग बढ़ाता है, दुर्घटनाएं कराता है और व्यक्तिगत रिश्तों में निरंतर तनाव पैदा करता है। मांगलिक व्यक्ति एक शक्तिशाली मार्शल ऊर्जा वहन करता है जो असंतुलित होने पर अपने साथी के स्वास्थ्य या दीर्घायु को प्रभावित कर सकती है।\n\nयह पूजा एक ब्रह्मांडीय रीसेट है — मंगल की कच्ची, जंगली ऊर्जा को एक रचनात्मक दिव्य शक्ति में बदलने का पवित्र कार्य। मंत्रों, होम और उज्जैन के मंगलनाथ जैसे पवित्र मंगल मंदिरों में प्रार्थनाओं के माध्यम से, मंगल की ऊर्जा विनाशकारी अग्नि से साहस, नेतृत्व और विजय की अग्नि में परिवर्तित हो जाती है।"
  },
  "why": [
    {
      "en": "Mangal Dosh creates intense friction in marriages — couples fight constantly, relationships break repeatedly, and compatibility seems impossible. This puja brings divine peace to the marital bond.",
      "hi": "मंगल दोष विवाहों में तीव्र घर्षण पैदा करता है — दंपत्ति लगातार लड़ते हैं, रिश्ते बार-बार टूटते हैं। यह पूजा वैवाहिक बंधन में दिव्य शांति लाती है।"
    },
    {
      "en": "People with Mangal Dosh face frequent accidents, surgeries, and sudden health crises. The puja is performed to reduce Mars' aggressive physical manifestation and protect the body from harm.",
      "hi": "मंगल दोष वाले लोगों को बार-बार दुर्घटनाएं, सर्जरी और अचानक स्वास्थ्य संकट का सामना करना पड़ता है। यह पूजा शरीर को नुकसान से बचाने के लिए की जाती है।"
    },
    {
      "en": "A Manglik individual is traditionally not advised to marry a non-Manglik without this puja, as the imbalance in Mars energy is believed to affect the health and longevity of the partner.",
      "hi": "परंपरागत रूप से मांगलिक व्यक्ति को इस पूजा के बिना गैर-मांगलिक से विवाह की सलाह नहीं दी जाती, क्योंकि मंगल ऊर्जा का असंतुलन साथी के स्वास्थ्य को प्रभावित कर सकता है।"
    },
    {
      "en": "Individuals with Mangal Dosh often have uncontrollable anger, rash decision-making, and impulsive behavior. The puja calms this fiery energy and improves emotional intelligence and patience.",
      "hi": "मंगल दोष वाले व्यक्तियों में अक्सर अनियंत्रित क्रोध और आवेगपूर्ण व्यवहार होता है। यह पूजा इस उग्र ऊर्जा को शांत करती है और भावनात्मक बुद्धिमत्ता में सुधार करती है।"
    },
    {
      "en": "Property disputes, legal troubles, and real estate losses are common Mangal Dosh effects. This puja is done to protect one's land, property, and professional reputation from Mars' destructive influence.",
      "hi": "संपत्ति विवाद, कानूनी परेशानी और अचल संपत्ति में नुकसान सामान्य मंगल दोष प्रभाव हैं। यह पूजा भूमि और पेशेवर प्रतिष्ठा को मंगल के विनाशकारी प्रभाव से बचाने के लिए की जाती है।"
    },
    {
      "en": "To transform Mars' raw aggressive energy into the divine fire of courage, ambition, and leadership — so that the Manglik person can use this powerful planetary force as a strength, not a curse.",
      "hi": "मंगल की कच्ची आक्रामक ऊर्जा को साहस, महत्वाकांक्षा और नेतृत्व की दिव्य अग्नि में बदलने के लिए — ताकि मांगलिक व्यक्ति इस शक्तिशाली ग्रहीय बल को श्राप नहीं, शक्ति के रूप में उपयोग कर सके।"
    }
  ],
  "benefits": [
    {
      "en": "Harmonizes marital relationships by cooling the aggressive Mars energy that causes conflict, mistrust, and emotional distance between partners.",
      "hi": "उस आक्रामक मंगल ऊर्जा को शीतल करके वैवाहिक संबंधों में सामंजस्य स्थापित करता है जो भागीदारों के बीच संघर्ष और भावनात्मक दूरी पैदा करती है।"
    },
    {
      "en": "Reduces the frequency of accidents, injuries, and sudden health emergencies by calming the hyper-active martian planetary vibration in the horoscope.",
      "hi": "कुंडली में अति सक्रिय मार्शल ग्रहीय कंपन को शांत करके दुर्घटनाओं, चोटों और अचानक स्वास्थ्य आपात स्थितियों की आवृत्ति को कम करता है।"
    },
    {
      "en": "Removes the traditional 'Manglik' barrier to marriage, making it spiritually safe and auspicious to wed even a non-Manglik partner.",
      "hi": "विवाह में पारंपरिक 'मांगलिक' बाधा को दूर करता है और गैर-मांगलिक साथी से विवाह को आध्यात्मिक रूप से सुरक्षित और शुभ बनाता है।"
    },
    {
      "en": "Transforms fiery temper and impulsiveness into focused willpower, competitive strength, and dynamic leadership qualities beneficial for career success.",
      "hi": "उग्र स्वभाव और आवेग को केंद्रित इच्छाशक्ति, प्रतिस्पर्धी शक्ति और कैरियर सफलता के लिए गतिशील नेतृत्व गुणों में बदलता है।"
    },
    {
      "en": "Protects property, land, and real estate interests from disputes, encroachments, and unexpected financial losses linked to Mars' malefic influence.",
      "hi": "संपत्ति, भूमि और अचल संपत्ति हितों को मंगल के अशुभ प्रभाव से जुड़े विवादों और अप्रत्याशित वित्तीय नुकसान से बचाता है।"
    },
    {
      "en": "Boosts courage, willpower, and physical vitality — turning the Manglik's greatest planetary challenge into their most powerful cosmic advantage.",
      "hi": "साहस, इच्छाशक्ति और शारीरिक जीवन शक्ति को बढ़ाता है — मांगलिक की सबसे बड़ी ग्रहीय चुनौती को उनके सबसे शक्तिशाली ब्रह्मांडीय लाभ में बदलता है।"
    }
  ],
  "steps": [
    {
      "title": "Mangal Yantra Sthapana",
      "desc": "A sacred Mars Yantra is installed and energized at the altar to create a powerful focal point for Martian divine energy."
    },
    {
      "title": "Ganesh Puja",
      "desc": "Lord Ganesha is worshipped first with red flowers and modak to bless the ritual and remove all planetary obstacles from the path."
    },
    {
      "title": "Mangal Graha Puja",
      "desc": "Planet Mars is invoked with red coral, red sandalwood, red flowers, and ghee lamp while chanting 108 names of Mangal Deva."
    },
    {
      "title": "Hanuman Puja",
      "desc": "Lord Hanuman — the divine controller of Mars — is worshipped with sindoor, jasmine oil, and powerful Hanuman Chalisa recitation."
    },
    {
      "title": "Mangal Mantra Jaap",
      "desc": "The sacred Mangal Beej Mantra 'Om Kraam Kreem Kraum Sah Bhaumaya Namah' is chanted 10,000 times for complete Martian appeasement."
    },
    {
      "title": "Kuja Dosh Nivaran Homa",
      "desc": "A sacred fire ritual is performed with red flowers, sesame seeds, and copper offerings while chanting Navgraha mantras into the Agni."
    },
    {
      "title": "Copper Vessel Offering",
      "desc": "Jaggery, red lentils (masoor dal), and red cloth are offered into flowing water as Mars' favorite symbolic offerings."
    },
    {
      "title": "Mangalnath Darshan",
      "desc": "If possible, the devotee visits a Mangal temple (Ujjain's Mangalnath is ideal) on a Tuesday for a spiritually potent conclusion."
    },
    {
      "title": "Prasad Distribution",
      "desc": "Sweet red-colored prasad is distributed to all, and the devotee ties a red thread on the wrist as a protective Mangal shield."
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

export default function MangalDoshPujaPage() {
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
