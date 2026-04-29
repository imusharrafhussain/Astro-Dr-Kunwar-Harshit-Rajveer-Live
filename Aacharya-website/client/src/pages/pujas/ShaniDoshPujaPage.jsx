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
import heroImage from '../../assets/shani dosh pooja.jpg.jpeg'
import ritualImage from '../../assets/shani dosh pooja 2.jpg.jpeg'
import './KaalSarpDoshPujaStyle.css'

const PUJA_ID = "shani-dosh-puja"
const PUJA_NAME = "Shani Dosh Puja"
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CONTENT = {
  "file": "ShaniDoshPujaPage.jsx",
  "component": "ShaniDoshPujaPage",
  "id": "shani-dosh-puja",
  "name": "Shani Dosh Puja",
  "heroTitleMain": "Shani Dosh",
  "heroTitleAccent": "Puja",
  "quote": "Appease Saturn, and hardship transforms into unshakable strength.",
  "subtitle": "A deeply transformative Vedic puja to pacify Lord Saturn's karmic lessons of delay, loss, and struggle.",
  "colorClass": "shani",
  "icon": "⚫",
  "shortDesc": {
    "en": "A deeply transformative Vedic puja to pacify Lord Saturn — the cosmic taskmaster — whose intense karmic lessons manifest as delays, losses, hardships, and life-altering trials when malefic in the chart.",
    "hi": "एक गहरा परिवर्तनकारी वैदिक पूजा जो भगवान शनि — ब्रह्मांडीय कर्म-शिक्षक — को शांत करने के लिए है, जिनके तीव्र कर्म-पाठ कुंडली में अशुभ होने पर देरी, नुकसान, कठिनाइयां और जीवन-परिवर्तनकारी परीक्षाओं के रूप में प्रकट होते हैं।"
  },
  "whatIs": {
    "en": "Shani Dosh Puja is a sacred ritual of cosmic courage — a spiritual confrontation with Saturn, the most feared and most respected planet in all of Vedic astrology. Lord Shani is the karmic judge of the universe, the divine deliverer of consequences, the cold and calculated teacher who strips away illusions and demands absolute truth from every soul he touches.\n\nShani Dosh arises when Saturn is placed in an unfavorable position in one's horoscope — particularly during Sade Sati (the dreaded 7.5-year Saturn transit over the Moon), Dhaiya (2.5-year transit), or when Saturn afflicts key houses causing major life disruptions. The effects are unmistakable: sudden job loss, financial ruin, relationship breakdown, prolonged illness, public disgrace, or the terrifying feeling that life has simply stopped moving forward.\n\nBut Saturn is not the enemy. He is the greatest teacher — the one who dismantles what is false so that what is real can rise. Shani Dosh Puja is the devotee's sacred dialogue with this cosmic force — an act of acceptance, surrender, and devotion that transforms Saturn's harsh lessons into stepping stones of unshakeable strength, wisdom, and ultimate prosperity. Those who please Shani receive his most profound gift: unbreakable resilience and lasting success.",
    "hi": "शनि दोष पूजा ब्रह्मांडीय साहस का एक पवित्र अनुष्ठान है — शनि के साथ एक आध्यात्मिक सामना, जो संपूर्ण वैदिक ज्योतिष में सबसे भयभीत और सबसे सम्मानित ग्रह है। भगवान शनि ब्रह्मांड के कर्म न्यायाधीश हैं, परिणामों के दिव्य प्रदाता, ठंडे और सुविचारित शिक्षक जो भ्रम को तोड़ते हैं और हर आत्मा से पूर्ण सत्य मांगते हैं।\n\nशनि दोष तब उत्पन्न होता है जब शनि कुंडली में प्रतिकूल स्थिति में होता है — विशेषकर साढ़े साती (चंद्रमा पर शनि का 7.5 साल का भयंकर गोचर), ढैया (2.5 साल का गोचर), या जब शनि प्रमुख भावों को पीड़ित करता है। प्रभाव अचूक हैं: अचानक नौकरी जाना, वित्तीय बर्बादी, रिश्तों का टूटना, लंबी बीमारी।\n\nलेकिन शनि शत्रु नहीं है। वे सबसे महान शिक्षक हैं — जो असत्य को तोड़ते हैं ताकि सत्य उठ सके। शनि दोष पूजा इस ब्रह्मांडीय शक्ति के साथ भक्त का पवित्र संवाद है — स्वीकृति, समर्पण और भक्ति का एक कार्य जो शनि के कठोर पाठों को अटूट शक्ति, ज्ञान और स्थायी समृद्धि की सीढ़ियों में बदल देता है।"
  },
  "why": [
    {
      "en": "During the terrifying phase of Sade Sati or Dhaiya, when Saturn's shadow falls hard on life, this puja is the most effective spiritual remedy to reduce its devastating and relentless impact.",
      "hi": "साढ़े साती या ढैया के भयावह चरण के दौरान, जब शनि का साया जीवन पर कड़ी चोट करता है, तो यह पूजा इसके विनाशकारी प्रभाव को कम करने का सबसे प्रभावी आध्यात्मिक उपाय है।"
    },
    {
      "en": "Sudden job loss, financial collapse, reputation damage, and persistent career blockages are signals of Saturn's wrath that can be neutralized through sincere, heartfelt Shani worship and puja.",
      "hi": "अचानक नौकरी जाना, वित्तीय पतन, प्रतिष्ठा क्षति और लगातार कैरियर रुकावटें शनि के प्रकोप के संकेत हैं जिन्हें हार्दिक शनि पूजा के माध्यम से निष्क्रिय किया जा सकता है।"
    },
    {
      "en": "Chronic physical ailments, especially bone, joint, nerve, or skin diseases associated with Saturn's body dominion, are relieved through this puja's healing vibration and divine intervention.",
      "hi": "दीर्घकालिक शारीरिक बीमारियां, विशेषकर हड्डी, जोड़, तंत्रिका या त्वचा रोग जो शनि के शरीर-प्रभुत्व से जुड़े हैं, इस पूजा की उपचार कंपन से राहत पाते हैं।"
    },
    {
      "en": "When a person experiences public humiliation, false accusations, legal troubles, or social isolation, Shani Dosh Puja is performed to restore dignity, truth, and social standing through Saturn's justice.",
      "hi": "जब कोई व्यक्ति सार्वजनिक अपमान, झूठे आरोपों, कानूनी परेशानियों का सामना करता है, तो शनि दोष पूजा शनि के न्याय के माध्यम से गरिमा और सामाजिक स्थिति को बहाल करने के लिए की जाती है।"
    },
    {
      "en": "To convert Saturn's punishing energy into Saturn's rewarding energy — because a pleased Shani blesses with extraordinary discipline, wealth, and longevity that no other planetary deity can provide.",
      "hi": "शनि की दंडनीय ऊर्जा को पुरस्कृत ऊर्जा में बदलने के लिए — क्योंकि प्रसन्न शनि असाधारण अनुशासन, धन और दीर्घायु का आशीर्वाद देते हैं जो कोई अन्य ग्रह देवता नहीं दे सकता।"
    },
    {
      "en": "Saturn rules karma and justice — people perform this puja to clear past-life karmic debts faster, so that they don't have to suffer the full weight of Saturn's slow, grinding karmic repayment plan.",
      "hi": "शनि कर्म और न्याय पर शासन करते हैं — लोग पिछले जन्म के कर्म ऋणों को तेजी से साफ करने के लिए यह पूजा करते हैं, ताकि उन्हें शनि की धीमी कर्म-पुनर्भुगतान योजना का पूरा बोझ न उठाना पड़े।"
    }
  ],
  "benefits": [
    {
      "en": "Significantly reduces the severity of Sade Sati and Dhaiya phases, transforming the most challenging Saturn transit into a period of manageable growth.",
      "hi": "साढ़े साती और ढैया चरणों की गंभीरता को काफी कम करता है, शनि के सबसे चुनौतीपूर्ण गोचर को प्रबंधनीय विकास की अवधि में बदलता है।"
    },
    {
      "en": "Restores stalled career, blocked promotions, and professional setbacks by removing Saturn's restrictive energy from the path of progress and ambition.",
      "hi": "शनि की प्रतिबंधात्मक ऊर्जा को प्रगति के मार्ग से हटाकर रुके कैरियर, अवरुद्ध पदोन्नति और पेशेवर झटकों को बहाल करता है।"
    },
    {
      "en": "Heals Saturn-related physical ailments including joint pain, chronic fatigue, skin problems, and neurological issues through spiritual purification.",
      "hi": "आध्यात्मिक शुद्धिकरण के माध्यम से जोड़ों के दर्द, पुरानी थकान, त्वचा की समस्याओं और तंत्रिका संबंधी समस्याओं सहित शनि से संबंधित शारीरिक बीमारियों को ठीक करता है।"
    },
    {
      "en": "Accelerates karmic clearance, allowing the devotee to emerge from Saturn's lessons faster and with greater wisdom rather than prolonged suffering.",
      "hi": "कर्मिक निकासी को तेज करता है, जिससे भक्त को लंबे समय तक कष्ट भोगने के बजाय शनि के पाठों से तेजी और अधिक ज्ञान के साथ उभरने का अवसर मिलता है।"
    },
    {
      "en": "Attracts Saturn's most powerful blessings — extraordinary discipline, structured wealth-building, and a long, meaningful life filled with purposeful achievement.",
      "hi": "शनि के सबसे शक्तिशाली आशीर्वाद को आकर्षित करता है — असाधारण अनुशासन, संरचित धन-निर्माण और सार्थक उपलब्धि से भरा दीर्घ, अर्थपूर्ण जीवन।"
    },
    {
      "en": "Protects against enemies, false accusations, legal battles, and social disgrace by invoking Saturn's highest virtue — absolute cosmic justice and truth.",
      "hi": "शत्रुओं, झूठे आरोपों, कानूनी लड़ाइयों और सामाजिक अपमान से बचाता है, शनि के सर्वोच्च गुण — पूर्ण ब्रह्मांडीय न्याय और सत्य को आमंत्रित करके।"
    }
  ],
  "steps": [
    {
      "title": "Shani Yantra Installation",
      "desc": "A sacred Shani Yantra is consecrated and installed facing west — Saturn's direction — on a Saturday for maximum potency."
    },
    {
      "title": "Black Sesame Bath (Til Snan)",
      "desc": "The devotee bathes with black sesame-infused water to symbolically absorb Saturn's cleansing and purifying spiritual energy."
    },
    {
      "title": "Shani Stotra Recitation",
      "desc": "The Shani Stotra and Shani Kavach are recited with complete devotion to build a divine protective shield around the devotee."
    },
    {
      "title": "Navgraha Puja with Shani Focus",
      "desc": "All nine planets are worshipped, with special emphasis on Shani's blue sapphire-colored offerings and iron lamp lighting."
    },
    {
      "title": "Shani Beej Mantra Jaap",
      "desc": "The Beej Mantra 'Om Praam Preem Praum Sah Shanaischaraya Namah' is chanted 23,000 times for complete Shani appeasement."
    },
    {
      "title": "Shani Homa",
      "desc": "Sacred fire is offered with blue flowers, black sesame, iron filings, and mustard oil into the homa kund with Vedic chants."
    },
    {
      "title": "Shani Tailabhishek",
      "desc": "Mustard oil is poured over a Shani idol or Shami tree — Saturn's sacred tree — as his most beloved and cooling offering."
    },
    {
      "title": "Feeding the Needy",
      "desc": "Black urad dal, black sesame rice, and black cloth are distributed to the underprivileged as Shani's most powerful appeasement remedy."
    },
    {
      "title": "Saturn Temple Visit",
      "desc": "The puja concludes with a visit to a Shani temple on Saturday evening, lighting a sesame oil lamp and offering iron coins with reverence."
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

export default function ShaniDoshPujaPage() {
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
