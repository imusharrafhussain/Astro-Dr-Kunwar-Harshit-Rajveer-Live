import { useState, useEffect } from 'react'
import { GiLotus, GiShield, GiStairsGoal, GiHealthNormal, GiCoins, GiBreakingChain, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/rahu puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'rahu-puja'
const PUJA_NAME = 'Rahu Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Rahu Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Rahu Kavach', 'Personal Sankalp', 'Blue Flower Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Chhaya Dosh Puja',
        price: 2100,
        duration: '90 min',
        features: ['18,000x Rahu Beej Mantra', 'Havan with Durva Ahuti', 'Hessonite Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Rahu Kripa Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Rahu Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiLotus />, title: 'Benefit 1', desc: 'Neutralizes Rahu Mahadasha effects, restoring stability, clarity, and positive momentum after sudden devastating life reversals. | राहु महादशा के प्रभावों को बेअसर करता है, अचानक विनाशकारी जीवन उलटफेर के बाद स्थिरता, स्पष्टता और सकारात्मक गति को बहाल करता है।' },
    { icon: <GiShield />, title: 'Benefit 2', desc: 'Removes Kaal Sarp Dosha, liberating life from ancestral curses and clearing the path to genuine progress and fulfillment. | काल सर्प दोष को हटाता है, पैतृक श्रापों से जीवन को मुक्त करता है और वास्तविक प्रगति और पूर्णता का मार्ग साफ करता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 3', desc: 'Unlocks sudden fame, viral success, political power, and meteoric rise in media, technology, and unconventional career fields. | अचानक प्रसिद्धि, वायरल सफलता, राजनीतिक शक्ति और मीडिया, प्रौद्योगिकी और अपरंपरागत करियर क्षेत्रों में उल्का जैसे उत्थान को अनलॉक करता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 4', desc: 'Heals mysterious illnesses, mental health issues, and unexplained suffering that resist conventional diagnosis and medical treatment. | रहस्यमय बीमारियों, मानसिक स्वास्थ्य समस्याओं और अस्पष्टीकृत पीड़ा को ठीक करता है जो पारंपरिक निदान और चिकित्सा उपचार का विरोध करती हैं।' },
    { icon: <GiCoins />, title: 'Benefit 5', desc: 'Supercharges foreign connections, overseas business success, international recognition, and powerful diplomatic relationships. | विदेशी संबंधों, विदेशी व्यापार सफलता, अंतरराष्ट्रीय मान्यता और शक्तिशाली राजनयिक संबंधों को सुपरचार्ज करता है।' },
    { icon: <GiBreakingChain />, title: 'Benefit 6', desc: 'Breaks toxic addictions, compulsive illusions, and destructive obsessions, replacing chaos with focused ambition and inner clarity. | विषाक्त व्यसनों, बाध्यकारी भ्रमों और विनाशकारी जुनून को तोड़ता है, अराजकता को केंद्रित महत्वाकांक्षा और आंतरिक स्पष्टता से बदलता है।' }
]

export default function RahuPujaPage() {
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
        <div className="sp-page">

            {/* ── Hero ── */}
            <section
                className="sp-hero"
                style={{ 
                    '--sp-hero-image': `url(${heroImage})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
                aria-label="Surya Puja — pandit offering arghya at sunrise by the river"
            >
                <div className="sp-hero-overlay">
                    <div className="sp-hero-badge"><GiSunrise /> Planet Puja</div>
                    <h1>Rahu Puja</h1>
                    <p>Rahu is the dragon's head — mysterious, powerful, and obsessive. Rahu Puja is a daring ritual that tames this enigmatic shadow planet, transforming its chaotic, unpredictable energy into meteoric rise, extraordinary ambition, and unstoppable worldly success!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Rahu Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Rahu Puja is a powerful and esoteric Vedic ritual dedicated to Rahu — the North Node of the Moon — one of the two shadow planets (Chaya Grahas) that hold extraordinary power over human fate and karmic destiny. Unlike other planets, Rahu has no physical body — he is the severed head of the demon Svarbhanu, eternally reaching to consume the Sun and Moon, causing eclipses.</p>
                                <p className="sp-hindi"><em>राहु पूजा एक शक्तिशाली और गूढ़ वैदिक अनुष्ठान है जो राहु को समर्पित है — चंद्रमा का उत्तरी नोड — दो छाया ग्रहों (छाया ग्रहों) में से एक जो मानव भाग्य और कर्म नियति पर असाधारण शक्ति रखते हैं। अन्य ग्रहों के विपरीत, राहु का कोई भौतिक शरीर नहीं है — वह राक्षस स्वरभानु का कटा हुआ सिर है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Rahu governs ambition, obsession, illusion (Maya), foreign connections, unconventional paths, technology, politics, and sudden dramatic reversals of fortune. He can make a beggar a king overnight — or a king a beggar just as fast.</p>
                                <p className="sp-hindi"><em>राहु महत्वाकांक्षा, जुनून, भ्रम (माया), विदेशी संबंध, अपरंपरागत रास्ते, प्रौद्योगिकी, राजनीति और भाग्य के अचानक नाटकीय उलटफेर को नियंत्रित करता है। वह रातोरात एक भिखारी को राजा बना सकता है — या उतनी ही तेजी से राजा को भिखारी।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering blue or black flowers, coconut, blue clothes, camphor, and sometimes smoky incense, while chanting Rahu's powerful mantras. Wednesday and Saturday are considered favorable days for Rahu puja.</p>
                                <p className="sp-hindi"><em>यह पूजा नीले या काले फूल, नारियल, नीले कपड़े, कपूर और धुएँ की ладán चढ़ाना और राहु के शक्तिशाली मंत्रों का जाप करना शामिल है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>An afflicted Rahu causes confusion, delusion, unexpected disasters, sudden health crises, addiction, and a life filled with chaos and uncertainty. Rahu-related problems are among the most mysterious and difficult to diagnose.</p>
                                <p className="sp-hindi"><em>एक पीड़ित राहु भ्रम, भ्रांति, अप्रत्याशित आपदाओं, अचानक स्वास्थ्य संकट और अव्यवस्था से भरे जीवन का कारण बनता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Rahu Puja channels the tremendous power of this shadow planet positively — granting fame, political power, technological breakthroughs, foreign success, and the ability to achieve extraordinary goals through unconventional and brilliant means!</p>
                                <p className="sp-hindi"><em>राहु पूजा इस छाया ग्रह की जबरदस्त शक्ति को सकारात्मक रूप से चैनल करती है — प्रसिद्धि, राजनीतिक शक्ति, प्रौद्योगिकी सफलता और विदेश में सफलता प्रदान करती है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Rahu Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To neutralize the devastating effects of Rahu Mahadasha and Antardasha, which bring sudden catastrophic reversals, mysterious illnesses, mental confusion, and unpredictable chaos into every sphere of life.</p>
                                <p className="sp-hindi"><em>राहु महादशा और अंतर्दशा के विनाशकारी प्रभावों को बेअसर करने के लिए, जो जीवन के हर क्षेत्र में अचानक विनाशकारी उलटफेर, रहस्यमय बीमारियां, मानसिक भ्रम और अप्रत्याशित अराजकता लाती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome Kaal Sarp Dosha — one of the most feared astrological combinations — formed when all planets are hemmed between Rahu and Ketu, causing lifelong hardships, blocked progress, and recurring ancestral suffering.</p>
                                <p className="sp-hindi"><em>काल सर्प दोष को दूर करने के लिए — सबसे भयभीत ज्योतिषीय संयोजनों में से एक — जो तब बनता है जब सभी ग्रह राहु और केतु के बीच फंसे होते हैं, जीवन भर कठिनाइयां, अवरुद्ध प्रगति और बार-बार पैतृक पीड़ा का कारण बनते हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🚀 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To harness Rahu's extraordinary power for meteoric rise in politics, media, technology, and unconventional fields, as a benefic Rahu grants sudden fame, viral success, and unprecedented social and political influence.</p>
                                <p className="sp-hindi"><em>राजनीति, मीडिया, प्रौद्योगिकी और अपरंपरागत क्षेत्रों में उल्का जैसे उत्थान के लिए राहु की असाधारण शक्ति का उपयोग करने के लिए, क्योंकि एक शुभ राहु अचानक प्रसिद्धि, वायरल सफलता और अभूतपूर्व सामाजिक और राजनीतिक प्रभाव प्रदान करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To protect against mysterious and undiagnosed illnesses, mental health disorders, phobias, psychic attacks, and unexplainable suffering that conventional medicine and logic struggle to address and treat.</p>
                                <p className="sp-hindi"><em>रहस्यमय और अनिर्धारित बीमारियों, मानसिक स्वास्थ्य विकारों, फोबिया, मानसिक हमलों और अस्पष्टीकृत पीड़ा से बचाने के लिए जिन्हें पारंपरिक चिकित्सा और तर्क संबोधित करने और उपचार करने के लिए संघर्ष करते हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💰 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To succeed in foreign lands, international business, diplomatic relations, and overseas careers, as Rahu is the planet of foreign connections, distant horizons, and exotic opportunities beyond one's homeland.</p>
                                <p className="sp-hindi"><em>विदेशी भूमि, अंतरराष्ट्रीय व्यापार, राजनयिक संबंधों और विदेशी करियर में सफल होने के लिए, क्योंकि राहु विदेशी संबंधों, दूरस्थ क्षितिजों और अपनी मातृभूमि से परे विदेशी अवसरों का ग्रह है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>⛓️ Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To cut through life's deepest illusions, toxic addictions, compulsive patterns, and destructive obsessions fueled by Rahu, and to channel this planet's immense magnetic force toward spiritual evolution and worldly mastery.</p>
                                <p className="sp-hindi"><em>जीवन के सबसे गहरे भ्रमों, विषाक्त व्यसनों, बाध्यकारी पैटर्न और राहु द्वारा ईंधन वाले विनाशकारी जुनून को काटने के लिए, और इस ग्रह की विशाल चुंबकीय शक्ति को आध्यात्मिक विकास और सांसारिक महारत की ओर चैनल करना।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Rahu Puja</h2>
                    <div className="sp-benefits-grid">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className="sp-benefit-card">
                                <div className="sp-benefit-icon">{b.icon}</div>
                                <h4>{b.title}</h4>
                                {b.desc.includes('|') ? (
                                    <div className="sp-translation-wrapper" style={{ flexDirection: 'column', gap: '0.6rem', marginBottom: 0 }}>
                                        <p>{b.desc.split('|')[0].trim()}</p>
                                        <p className="sp-hindi"><em>{b.desc.split('|')[1].trim()}</em></p>
                                    </div>
                                ) : (
                                    <p>{b.desc}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Process ── */}
            <section className="sp-section sp-process">
                <div className="sp-container">
                    <div className="sp-label">How It Works</div>
                    <h2>Puja Process</h2>
                    <div className="sp-stairs">
                        {[
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Perform Rahu Puja ideally on Wednesday or Saturday during Rahu Kaal (the 90-minute inauspicious Rahu period).' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Take a purifying bath and wear dark blue, black, or smoky grey clothes for the ritual.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Set up a dark altar with an idol or symbol of Rahu — typically a dark stone or iron serpent image.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Light a camphor lamp and loban or gugal incense, creating a powerful, purifying, and protective atmosphere.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Offer blue or black flowers, coconut, blue cloth, til (sesame), lead or iron articles, and dark-colored fruits.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Rahu Beej Mantra — "Om Bhraam Bhreem Bhraum Sah Rahave Namah" — 108 times with a dark crystal rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Rahu Stotram, Rahu Kavach, or the Durga Saptashati chapter associated with shadow planet pacification.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti using a camphor flame seven times before Rahu\'s idol with complete reverence and fearless focus.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Donate blue or black clothes, sesame, blankets, or coal to the needy as an act of karmic cleansing.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by lighting camphor outdoors at a crossing (chauraha) as a symbolic offering to Rahu\'s cosmic shadow energy.' }
                        ].map((s, i) => (
                            <div key={s.num} className="sp-stair" style={{ '--i': i }}>
                                <div className="sp-stair-num">{s.num}</div>
                                <div className="sp-stair-icon">{s.icon}</div>
                                <div className="sp-stair-text">
                                    <span className="sp-stair-title">{s.title}</span>
                                    <span className="sp-stair-sub">{s.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pricing ── */}
            <section className="sp-section sp-pricing" id="booking">
                <div className="sp-container">
                    <div className="sp-label">Choose Your Package</div>
                    <h2>Puja Packages & Pricing</h2>
                    <div className="sp-packages">
                        {PACKAGES.map(pkg => (
                            <div
                                key={pkg.id}
                                className={`sp-package-card ${selectedPkg === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                                onClick={() => setSelectedPkg(pkg.id)}
                            >
                                {pkg.popular && <div className="sp-popular-badge">Most Popular</div>}
                                <h3>{pkg.name}</h3>
                                <div className="sp-price">
                                    <span className="sp-price-currency">₹</span>
                                    <span className="sp-price-amount">{pkg.price.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="sp-duration">⏱ {pkg.duration}</div>
                                <ul className="sp-features">
                                    {pkg.features.map((f, i) => <li key={i}><FiCheck /> {f}</li>)}
                                </ul>
                                <div className={`sp-select-btn ${selectedPkg === pkg.id ? 'active' : ''}`}>
                                    {selectedPkg === pkg.id ? '✓ Selected' : 'Select Package'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Booking Form ── */}
            <section className="sp-section sp-booking-section">
                <div className="sp-container">
                    <div className="sp-label">Book Your Slot</div>
                    <h2>Fill Booking Details</h2>

                    {status === 'success' ? (
                        <div className="sp-success-card">
                            <div className="sp-success-icon"><FiCheck /></div>
                            <h3>Puja Booked Successfully! 🙏</h3>
                            <p>{statusMsg}</p>
                            {bookedInfo && (
                                <div className="sp-booking-summary">
                                    <p><strong>Date:</strong> {bookedInfo.bookingDate}</p>
                                    <p><strong>Time:</strong> {bookedInfo.startTime} – {bookedInfo.endTime} (slot locked)</p>
                                    <p><strong>Status:</strong> {bookedInfo.status}</p>
                                </div>
                            )}
                            <p className="sp-success-note">Our team will call you within 2 hours to confirm your slot and guide you through the virtual participation process.</p>
                        </div>
                    ) : (
                        <form className="sp-form" onSubmit={handleSubmit}>
                            <div className="sp-form-grid">
                                <div className="sp-form-group">
                                    <label><FiUser /> Full Name (Sankalp Person) *</label>
                                    <input name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiMail /> Email *</label>
                                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiPhone /> WhatsApp Number *</label>
                                    <input name="phone" type="tel" placeholder="10-digit number" value={form.phone} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label>Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="sp-form-group">
                                    <label>Date of Birth *</label>
                                    <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiClock /> Time of Birth *</label>
                                    <input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label>Gotra *</label>
                                    <input name="gotra" placeholder="Enter your gotra" value={form.gotra} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label>Father's Name *</label>
                                    <input name="fatherName" placeholder="Enter your father's name" value={form.fatherName} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiMapPin /> Birth Place *</label>
                                    <input name="birthPlace" placeholder="Birth place" value={form.birthPlace} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiCalendar /> Preferred Puja Date *</label>
                                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                                    {availability && (
                                        <div className={`sp-avail-badge ${availability.available ? 'ok' : 'full'}`}>
                                            {availability.available
                                                ? `${availability.remainingSlots}/${availability.totalSlots} slots available`
                                                : 'No slots available for this date'}
                                        </div>
                                    )}
                                </div>
                                <div className="sp-form-group">
                                    <label>Pin Code *</label>
                                    <input name="pinCode" placeholder="6-digit pin code" value={form.pinCode} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label><FiClock /> Preferred Start Time *</label>
                                    <input name="time" type="time" value={form.time} onChange={handleChange} required min="05:00" max="19:00" step="1800" />
                                    {hint && (
                                        <div className={`sp-hint ${hint.type}`}>
                                            {hint.type === 'error' ? <FiAlertCircle /> : <FiCheck />} {hint.msg}
                                        </div>
                                    )}
                                    <p className="sp-time-note">Each booking locks a 5-hour window. Max 5 pujas per day.</p>
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label>Puja Purpose *</label>
                                    <textarea name="pujaPurpose" rows={2} placeholder="Describe the reason for this puja" value={form.pujaPurpose} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label>Full Address *</label>
                                    <textarea name="fullAddress" rows={2} placeholder="House number, street, locality" value={form.fullAddress} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label>Nearest Landmark *</label>
                                    <input name="nearestLandmark" placeholder="Nearest landmark" value={form.nearestLandmark} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label>Sankalp Place *</label>
                                    <input name="sankalpPlace" placeholder="Enter sankalp place" value={form.sankalpPlace} onChange={handleChange} required />
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label><FiMessageSquare /> Special Message / Wishes</label>
                                    <textarea name="message" rows={3} placeholder="Any extra information" value={form.message} onChange={handleChange} />
                                </div>
                                <div className="sp-form-group sp-full-width">
                                    <label style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                                        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required style={{ width:'auto', marginTop:'4px', flexShrink:0 }} />
                                        <span>I agree to the Terms and Conditions and understand all puja bookings are non-refundable. *</span>
                                    </label>
                                </div>
                            </div>

                            <div className="sp-form-summary">
                                <span>Selected: <strong>{PACKAGES.find(p => p.id === selectedPkg)?.name}</strong></span>
                                <span>Amount: <strong>₹{PACKAGES.find(p => p.id === selectedPkg)?.price.toLocaleString('en-IN')}</strong></span>
                            </div>

                            {status === 'error' && (
                                <div className="sp-error-msg"><FiAlertCircle /> {statusMsg}</div>
                            )}

                            <button type="submit" className="sp-submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? <><FiLoader className="sp-spin" /> Processing...</> : '🙏 Confirm Puja Booking'}
                            </button>
                        </form>
                    )}
                </div>
            </section>

        </div>
    )
}
