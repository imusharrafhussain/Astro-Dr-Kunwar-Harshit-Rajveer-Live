import { useState, useEffect } from 'react'
import { GiLotus, GiSparkles, GiStairsGoal, GiHealthNormal, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/shani puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'shani-puja'
const PUJA_NAME = 'Shani (Saturn) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Shani Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Shani Chalisa', 'Personal Sankalp', 'Mustard Oil Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Sade Sati Nivaran',
        price: 2100,
        duration: '90 min',
        features: ['23,000x Shani Beej Mantra', 'Havan with Shami Wood', 'Iron/Sapphire Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Shani Dosha Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Shani Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiLotus />, title: 'Benefit 1', desc: 'Powerfully reduces the crushing effects of Sade Sati and Shani Dhaiya, restoring stability, hope, and forward momentum to deeply troubled lives. | साढ़े साती और शनि ढैया के कुचले देने वाले प्रभावों को शक्तिशाली रूप से कम करता है, गहराई से परेशान जीवन में स्थिरता, आशा और आगे की गति को बहाल करता है।' },
    { icon: <GiSparkles />, title: 'Benefit 2', desc: 'Clears karmic baggage and ancestral curses, liberating the soul from repeating painful patterns and opening a path to genuine spiritual freedom. | कर्म के बोझ और पैतृक श्रापों को साफ करता है, आत्मा को दर्दनाक पैटर्न दोहराने से मुक्त करता है और सच्ची आध्यात्मिक स्वतंत्रता का मार्ग खोलता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 3', desc: 'Accelerates long-delayed career success, grants professional recognition, and rewards disciplined effort with remarkable and lasting achievements. | लंबे समय से विलंबित करियर सफलता में तेजी लाता है, पेशेवर मान्यता प्रदान करता है और अनुशासित प्रयास को उल्लेखनीय और स्थायी उपलब्धियों से पुरस्कृत करता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 4', desc: 'Protects and heals chronic health conditions, bone disorders, joint pain, and long-standing physical ailments linked to Saturn\'s influence. | शनि के प्रभाव से जुड़ी पुरानी स्वास्थ्य स्थितियों, हड्डी विकारों, जोड़ों के दर्द और दीर्घकालिक शारीरिक बीमारियों से बचाता और ठीक करता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 5', desc: 'Builds extraordinary patience, iron discipline, and invincible perseverance — the ultimate foundations of enduring success and legendary character. | असाधारण धैर्य, लोहे जैसा अनुशासन और अजेय दृढ़ता बनाता है — स्थायी सफलता और दिग्गज चरित्र की परम नींव।' },
    { icon: <GiSparkles />, title: 'Benefit 6', desc: 'Grants karmic forgiveness, divine pardon for past mistakes, and a spiritually renewed slate for building a righteous and purposeful future life. | कर्म क्षमा, पिछली गलतियों के लिए दिव्य माफी और एक धर्मी और उद्देश्यपूर्ण भविष्य के जीवन के निर्माण के लिए आध्यात्मिक रूप से नवीनीकृत स्लेट प्रदान करता है।' }
]

export default function ShaniPujaPage() {
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
                    <h1>Shani (Saturn) Puja</h1>
                    <p>Saturn is the cosmic judge — the strict but fair dispenser of karma. Shani Puja is a profound ritual of surrender and discipline that transforms Saturn's harsh lessons into extraordinary life wisdom, turning obstacles into stepping stones and trials into triumphant destiny!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Shani (Saturn) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Shani Puja is a deeply transformative Vedic ritual dedicated to Shani Dev — the Planet Saturn — the most feared yet most respected planet in Vedic astrology. Saturn is the dispenser of justice, karma, and destiny. He rules discipline, hard work, longevity, service, humility, and the deep spiritual lessons of life.</p>
                                <p className="sp-hindi"><em>शनि पूजा एक गहराई से परिवर्तनकारी वैदिक अनुष्ठान है जो शनि देव को समर्पित है — शनि ग्रह — वैदिक ज्योतिष में सबसे भयभीत फिर भी सबसे सम्मानित ग्रह। शनि न्याय, कर्म और भाग्य का वितरक है। वह अनुशासन, कड़ी मेहनत, दीर्घायु, सेवा, विनम्रता और जीवन के गहरे आध्यात्मिक पाठों पर शासन करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Shani Dev is depicted as a dark-complexioned deity riding a crow or vulture, holding a sword, trident, and arrows — the embodiment of stern cosmic justice. He is believed to reward those who work with integrity and punish those who tread the path of dishonesty and laziness.</p>
                                <p className="sp-hindi"><em>शनि देव को एक काले रंग के देवता के रूप में चित्रित किया जाता है जो कौवे या गिद्ध पर सवार होते हैं, तलवार, त्रिशूल और तीर धारण करते हैं। ऐसा माना जाता है कि वे ईमानदारी से काम करने वालों को पुरस्कृत करते हैं और बेईमानी और आलस्य के रास्ते पर चलने वालों को दंडित करते हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering black sesame seeds (til), mustard oil, black flowers, blue sapphire items, iron articles, and dark-colored foods, while chanting Saturn's powerful mantras. Saturdays (Shanivar) are the most significant day for this ritual.</p>
                                <p className="sp-hindi"><em>साढ़े साती और शनि ढैया सबसे भयावह ज्योतिषीय अवधि हैं। शनि पूजा सबसे शक्तिशाली प्रतिकारक है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>SadeSati and Shani Dhaiya are the most dreaded astrological periods when Saturn transits over critical houses in the horoscope, causing severe hardships, delays, losses, and misfortune. Shani Puja is the most powerful antidote.</p>
                                <p className="sp-hindi"><em>ईमानदारी, विनम्रता और पूर्ण भक्ति के साथ शनि पूजा करने से भक्त ब्रह्मांडीय न्यायाधीश की कृपा जीतता है — कर्म ऋणों को ज्ञान में, कठिनाइयों को आशीर्वाद में और चुनौतियों को जीवन की सबसे बड़ी जीत में बदलता है!</em></p>
                    </div>
                    <p>By performing Shani Puja with sincerity, humility, and absolute devotion, the devotee wins the grace of the cosmic judge — transforming karmic debts into wisdom, hardships into blessings, and challenges into the greatest victories of their extraordinary life!</p>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Shani (Saturn) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To mitigate the devastating effects of Sade Sati and Shani Dhaiya — Saturn's most challenging transit periods — which cause career destruction, financial collapse, health crises, and severe personal suffering.</p>
                                <p className="sp-hindi"><em>साढ़े साती और शनि ढैया के विनाशकारी प्रभावों को कम करने के लिए — शनि की सबसे चुनौतीपूर्ण पारगमन अवधि — जो करियर विनाश, वित्तीय पतन, स्वास्थ्य संकट और गंभीर व्यक्तिगत पीड़ा का कारण बनती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To clear karmic debts, past-life negative patterns, and ancestral curses that Saturn reveals as painful obstacles, transforming these spiritual lessons into profound wisdom and personal liberation.</p>
                                <p className="sp-hindi"><em>कर्म ऋणों, पूर्व जीवन के नकारात्मक पैटर्न और पैतृक श्रापों को दूर करने के लिए जिन्हें शनि दर्दनाक बाधाओं के रूप में प्रकट करता है, इन आध्यात्मिक पाठों को गहन ज्ञान और व्यक्तिगत मुक्ति में बदलना।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🚀 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To accelerate career growth, professional recognition, and long-term success, as a well-placed Saturn rewards sustained hard work, discipline, and dedication with extraordinary rise, prestige, and achievement.</p>
                                <p className="sp-hindi"><em>करियर विकास, पेशेवर मान्यता और दीर्घकालिक सफलता में तेजी लाने के लिए, क्योंकि एक अच्छी तरह से स्थापित शनि निरंतर कड़ी मेहनत, अनुशासन और समर्पण को असाधारण उत्थान, प्रतिष्ठा और उपलब्धि से पुरस्कृत करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To protect against chronic illnesses, long-term diseases, and physical suffering associated with a malefic Saturn, especially disorders of joints, bones, nervous system, and chronic conditions.</p>
                                <p className="sp-hindi"><em>एक पापी शनि से जुड़ी पुरानी बीमारियों, दीर्घकालिक रोगों और शारीरिक पीड़ा से बचाने के लिए, विशेष रूप से जोड़ों, हड्डियों, तंत्रिका तंत्र के विकारों और पुरानी स्थितियों से।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🚀 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To develop deep patience, extraordinary perseverance, unbreakable discipline, and monk-like inner strength — the rarest and most powerful qualities that ultimately separate successful people from everyone else.</p>
                                <p className="sp-hindi"><em>गहरी धैर्य, असाधारण दृढ़ता, अटूट अनुशासन और भिक्षु जैसी आंतरिक शक्ति विकसित करने के लिए — सबसे दुर्लभ और सबसे शक्तिशाली गुण जो अंततः सफल लोगों को बाकी सभी से अलग करते हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>👑 Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To seek forgiveness and liberation from past mistakes, unethical actions, and accumulated negative karma, as Shani Puja is a powerful act of cosmic atonement that brings divine pardon and a fresh karmic slate.</p>
                                <p className="sp-hindi"><em>पिछली गलतियों, अनैतिक कार्यों और संचित नकारात्मक कर्म से क्षमा और मुक्ति पाने के लिए, क्योंकि शनि पूजा ब्रह्मांडीय प्रायश्चित का एक शक्तिशाली कार्य है जो दिव्य क्षमा और एक नई कर्म स्लेट लाता है।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Shani (Saturn) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake up early on Saturday (Shanivar), bathe before sunrise, and wear black, dark blue, or navy clothes for the ritual.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Set up a clean altar with an idol or image of Shani Dev under a peepal tree or in your home temple.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a sesame oil lamp (til ka diya) — NOT a ghee lamp — and dark incense such as loban or guggul.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer black sesame seeds, black flowers (black roses or blue flowers), iron articles, mustard oil, and black urad dal.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Chant the Shani Beej Mantra — "Om Praam Preem Praum Sah Shanaischaraay Namah" — 108 times with a black sesame or iron rosary.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Recite the Shani Stotram, Shani Chalisa, or the powerful Shani Kavach with deep humility and sincere devotion.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Perform aarti by circling a sesame oil lamp seven times before Shani Dev with complete reverence and surrender.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Donate black items — black blankets, black sesame, iron utensils, or black clothes — to the poor and needy.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Distribute black til ladoo or sesame sweets as prasad among family members with gratitude.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by feeding black crows or birds — an ancient act of Shani seva — and bow with absolute humility.' }
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
