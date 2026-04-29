import { useState, useEffect } from 'react'
import { GiCoins, GiStairsGoal, GiHealthNormal, GiSparkles, GiLotus, GiCrown, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/guru puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'guru-puja'
const PUJA_NAME = 'Guru (Jupiter) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Guru Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Brihaspati Stotram', 'Personal Sankalp', 'Yellow Flower Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Brihaspati Puja',
        price: 2100,
        duration: '90 min',
        features: ['16,000x Guru Beej Mantra', 'Havan with Peepal Wood', 'Yellow Sapphire/Topaz Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Guru Kripa Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Guru Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiCoins />, title: 'Benefit 1', desc: 'Floods life with divine grace, abundance, prosperity, and golden opportunities, transforming financial scarcity into overflowing wealth and success. | जीवन को दिव्य कृपा, प्रचुरता, समृद्धि और सुनहरे अवसरों से भर देता है, वित्तीय कमी को अतिप्रवाहित धन और सफलता में बदल देता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 2', desc: 'Clears obstacles in higher education, grants academic brilliance, and opens doors to prestigious universities and distinguished careers. | उच्च शिक्षा में बाधाओं को दूर करता है, शैक्षणिक प्रतिभा प्रदान करता है और प्रतिष्ठित विश्वविद्यालयों और विशिष्ट करियर के द्वार खोलता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 3', desc: 'Blesses couples with the gift of children, ensures safe pregnancies, and promotes the health, intelligence, and wellbeing of offspring. | जोड़ों को संतान का उपहार देता है, सुरक्षित गर्भधारण सुनिश्चित करता है और संतान के स्वास्थ्य, बुद्धि और भलाई को बढ़ावा देता है।' },
    { icon: <GiSparkles />, title: 'Benefit 4', desc: 'Deepens spirituality, sharpens wisdom, and establishes an unshakeable connection with God, filling life with divine purpose and meaning. | आध्यात्मिकता को गहरा करता है, ज्ञान को तेज करता है और भगवान के साथ एक अटूट संबंध स्थापित करता है, जीवन को दिव्य उद्देश्य से भरता है।' },
    { icon: <GiLotus />, title: 'Benefit 5', desc: 'Attracts a wise, virtuous life partner and blesses the marriage with lifelong harmony, mutual respect, and spiritual fulfillment. | एक बुद्धिमान, गुणवान जीवन साथी को आकर्षित करता है और विवाह को आजीवन सामंजस्य, पारस्परिक सम्मान और आध्यात्मिक पूर्णता का आशीर्वाद देता है।' },
    { icon: <GiCrown />, title: 'Benefit 6', desc: 'Resolves legal disputes and government problems, restoring divine justice, social prestige, and the grace of powerful authority figures. | कानूनी विवादों और सरकारी समस्याओं को हल करता है, दिव्य न्याय, सामाजिक प्रतिष्ठा और शक्तिशाली अधिकारियों की कृपा को बहाल करता है।' }
]

export default function GuruPujaPage() {
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
                    <h1>Guru (Jupiter) Puja</h1>
                    <p>Jupiter is the greatest benefic in the cosmos — wise, generous, and infinitely abundant. Guru Puja is a divine ritual that opens the celestial treasury of wisdom, prosperity, and blessings, inviting divine grace to rain down upon every corner of your life!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Guru (Jupiter) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Guru Puja is a magnificent Vedic ritual dedicated to Brihaspati Dev — the Planet Jupiter — the most powerful benefic force in Vedic astrology and the divine preceptor (Guru) of the gods themselves. Jupiter governs wisdom, knowledge, spirituality, children, higher education, wealth, dharma, and the grace of divine blessings.</p>
                                <p className="sp-hindi"><em>गुरु पूजा एक भव्य वैदिक अनुष्ठान है जो बृहस्पति देव को समर्पित है — बृहस्पति ग्रह — वैदिक ज्योतिष में सबसे शक्तिशाली शुभ बल और स्वयं देवताओं के दिव्य आचार्य (गुरु)। बृहस्पति ज्ञान, विद्या, आध्यात्मिकता, संतान, उच्च शिक्षा, धन, धर्म और दिव्य आशीर्वाद की कृपा को नियंत्रित करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Guru Dev is depicted as a golden-yellow deity, noble and expansive, radiating the warm glow of divine wisdom and celestial abundance. He is the Devguru — teacher of all gods — and his blessings are considered the most powerful form of divine protection and prosperity available to humanity.</p>
                                <p className="sp-hindi"><em>गुरु देव को एक सुनहरे-पीले देवता के रूप में चित्रित किया जाता है, महान और विस्तृत, दिव्य ज्ञान और स्वर्गीय प्रचुरता की गर्म चमक विकीर्ण करते हैं। वे देवगुरु हैं — सभी देवताओं के शिक्षक — और उनके आशीर्वाद को मानवता के लिए उपलब्ध दिव्य सुरक्षा और समृद्धि का सबसे शक्तिशाली रूप माना जाता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering yellow items — yellow flowers, yellow sweets (besan ladoo), yellow fruits (bananas), yellow turmeric, chana dal, and saffron — while chanting Jupiter's sacred Vedic mantras. Thursdays (Guruvaar) are the most auspicious day for this ritual.</p>
                                <p className="sp-hindi"><em>इस पूजा में पीली वस्तुएं — पीले फूल, पीली मिठाई, पीले फल, हल्दी, चना दाल और केसर — चढ़ाना शामिल है। गुरुवार इस अनुष्ठान के लिए सबसे शुभ दिन है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>A weak Jupiter in a birth chart causes lack of wisdom, failed education, childlessness, spiritual disconnection, financial struggles, and loss of divine grace. People feel lost, without purpose, and spiritually empty.</p>
                                <p className="sp-hindi"><em>जन्म कुंडली में कमजोर बृहस्पति ज्ञान की कमी, शिक्षा में विफलता, संतानहीनता, आध्यात्मिक वियोग और वित्तीय संघर्ष का कारण बनता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Guru Puja brings an extraordinary flood of divine blessings — transforming poverty into prosperity, confusion into clarity, and disconnection into deep spiritual awakening. It is the puja that brings God's grace directly into your life!</p>
                                <p className="sp-hindi"><em>गुरु पूजा दिव्य आशीर्वाद की एक असाधारण बाढ़ लाती है — गरीबी को समृद्धि में, भ्रम को स्पष्टता में और वियोग को गहरे आध्यात्मिक जागरण में बदलती है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Guru (Jupiter) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>✨ Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To attract divine blessings, prosperity, and abundance into life, as Jupiter is the planet of grace, generosity, and infinite divine gifts that transform an ordinary life into an extraordinary blessed one.</p>
                                <p className="sp-hindi"><em>जीवन में दिव्य आशीर्वाद, समृद्धि और प्रचुरता को आकर्षित करने के लिए, क्योंकि बृहस्पति कृपा, उदारता और अनंत दिव्य उपहारों का ग्रह है जो एक साधारण जीवन को असाधारण आशीर्वाद वाले जीवन में बदल देता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🚀 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome struggles in higher education, academic advancement, and professional growth, as Jupiter governs all forms of higher learning, university education, and the attainment of wisdom through scholarly pursuit.</p>
                                <p className="sp-hindi"><em>उच्च शिक्षा, शैक्षणिक उन्नति और पेशेवर विकास में संघर्षों को दूर करने के लिए, क्योंकि बृहस्पति उच्च शिक्षा, विश्वविद्यालय शिक्षा और विद्वानों के अध्ययन के सभी रूपों को नियंत्रित करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>👶 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To resolve issues related to children — delays in childbirth, complications during pregnancy, and children's wellbeing — as Jupiter is the prime significator of children, progeny, and family happiness.</p>
                                <p className="sp-hindi"><em>बच्चों से संबंधित मुद्दों को हल करने के लिए — प्रसव में देरी, गर्भावस्था के दौरान जटिलताएं, और बच्चों की भलाई — क्योंकि बृहस्पति बच्चों, संतान और पारिवारिक खुशी का प्रमुख कारक है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To accelerate spiritual growth, deepen meditation practices, and establish a profound, unbreakable connection with the divine, as Jupiter rules over all spiritual pursuits and the path of dharma and moksha.</p>
                                <p className="sp-hindi"><em>आध्यात्मिक विकास में तेजी लाने, ध्यान प्रथाओं को गहरा करने और दिव्य के साथ एक गहरा, अटूट संबंध स्थापित करने के लिए, क्योंकि बृहस्पति सभी आध्यात्मिक प्रयासों और धर्म और मोक्ष के मार्ग पर शासन करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💍 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To enhance marriage prospects, attract a virtuous and wise life partner, and to bless the marital union with wisdom, mutual respect, spiritual harmony, and lifelong happiness and togetherness.</p>
                                <p className="sp-hindi"><em>विवाह की संभावनाओं को बढ़ाने, एक गुणवान और बुद्धिमान जीवन साथी को आकर्षित करने, और वैवाहिक मिलन को ज्ञान, पारस्परिक सम्मान, आध्यात्मिक सामंजस्य और आजीवन खुशी और एकजुटता का आशीर्वाद देने के लिए।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To resolve legal disputes, government-related problems, and obstacles caused by Guru Dosha, restoring divine justice, social honor, and the grace of authorities and powerful institutions in one's life.</p>
                                <p className="sp-hindi"><em>गुरु दोष के कारण होने वाले कानूनी विवादों, सरकार संबंधी समस्याओं और बाधाओं को हल करने के लिए, दिव्य न्याय, सामाजिक सम्मान और अधिकारियों की कृपा को बहाल करना।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Guru (Jupiter) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake up early on Thursday (Guruvaar) and take a purifying bath, wearing yellow clothes as an offering to Guru Dev.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Set up a clean altar with an idol or image of Brihaspati Dev or Lord Vishnu on a yellow silk cloth.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a ghee lamp and sandalwood or jasmine incense, filling the space with sacred, expansive energy.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer yellow flowers (marigold, yellow rose), chana dal, banana, yellow sweets, turmeric, and saffron.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Place a yellow sapphire or topaz stone near the idol for energization and activation of Jupiter\'s energy.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Guru Beej Mantra — "Om Graam Greem Graum Sah Guruve Namah" — 108 times with a yellow sandalwood rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Brihaspati Stotram, Guru Kavach, or Vishnu Sahasranama with heartfelt devotion and gratitude.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti by circling a camphor flame seven times before Guru Dev with complete reverence.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Distribute yellow sweets (besan ladoo) as prasad and donate chana dal or yellow clothes to Brahmins.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by seeking the blessings of your own Guru or teacher, honoring the sacred Guru-Shishya tradition.' }
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
