import { useState, useEffect } from 'react'
import { GiLotus, GiShield, GiSparkles, GiCoins, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/navgraha shanti puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'navgraha-shanti-puja'
const PUJA_NAME = 'Navgraha Shanti Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Navgraha Shanti path',
        price: 2100,
        duration: '60 min',
        features: ['Navgraha Stotra Chanting', 'Personal Sankalp', 'Nine Grains Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Navgraha Havan',
        price: 5100,
        duration: '2 hours',
        features: ['All 9 Beej Mantras Chanted', 'Havan with 9 Specific Woods', 'Navgraha Yantra Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Navgraha Mandal Havan',
        price: 11000,
        duration: '4 hours',
        features: ['Complete 9-Brahmin Chanting', 'Navgraha Mandal Sthapana', 'Live Individual Participation', 'Complete Astrological Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiLotus />, title: 'Benefit 1', desc: 'Creates total planetary harmony simultaneously, transforming the entire horoscope into a powerhouse of blessings, success, and divine grace. | एक साथ कुल ग्रह सद्भाव बनाता है, पूरी कुंडली को आशीर्वाद, सफलता और दिव्य कृपा के पावरहाउस में बदल देता है।' },
    { icon: <GiShield />, title: 'Benefit 2', desc: 'Provides maximum cosmic protection and blessings before major life events, ensuring auspicious outcomes and divine support. | प्रमुख जीवन घटनाओं से पहले अधिकतम ब्रह्मांडीय सुरक्षा और आशीर्वाद प्रदान करता है, शुभ परिणाम और दिव्य समर्थन सुनिश्चित करता है।' },
    { icon: <GiShield />, title: 'Benefit 3', desc: 'Neutralizes all major planetary doshas in one powerful ceremony, saving time, effort, and multiple individual puja rituals. | एक शक्तिशाली समारोह में सभी प्रमुख ग्रह दोषों को बेअसर करता है, समय, प्रयास और कई व्यक्तिगत पूजा अनुष्ठानों की बचत करता है।' },
    { icon: <GiSparkles />, title: 'Benefit 4', desc: 'Stops recurring misfortunes, family suffering, and mysterious setbacks, replacing patterns of loss with blessings and abundance. | बार-बार दुर्भाग्य, पारिवारिक पीड़ा और रहस्यमय असफलताओं को रोकता है, नुकसान के पैटर्न को आशीर्वाद और प्रचुरता से बदलता है।' },
    { icon: <GiCoins />, title: 'Benefit 5', desc: 'Accelerates success across all life areas simultaneously — career, wealth, relationships, health, and spiritual growth together. | एक साथ सभी जीवन क्षेत्रों में सफलता में तेजी लाता है — करियर, धन, रिश्ते, स्वास्थ्य और आध्यात्मिक विकास एक साथ।' },
    { icon: <GiShield />, title: 'Benefit 6', desc: 'Protects future generations from planetary afflictions, ensuring a blessed, prosperous, and divinely guided family legacy. | भविष्य की पीढ़ियों को ग्रह पीड़ाओं से बचाता है, एक आशीर्वाद प्राप्त, समृद्ध और दिव्य रूप से निर्देशित पारिवारिक विरासत सुनिश्चित करता है।' }
]

export default function NavgrahaShantiPujaPage() {
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
                    <h1>Navgraha Shanti Puja</h1>
                    <p>Nine planets. One supreme ritual. Navgraha Shanti Puja is the most powerful cosmic ceremony that simultaneously pacifies all nine celestial rulers — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — aligning your entire horoscope with the flow of divine grace!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Navgraha Shanti Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Navgraha Shanti Puja is the most comprehensive and awe-inspiring Vedic ritual in Hindu astrology — a grand cosmic ceremony that simultaneously honors, appeases, and energizes all nine planetary deities (Navagrahas) of the solar system. This is not just a puja — it is a complete planetary alignment ceremony that recalibrates your karmic blueprint.</p>
                                <p className="sp-hindi"><em>नवग्रह शांति पूजा हिंदू ज्योतिष में सबसे व्यापक और विस्मयकारी वैदिक अनुष्ठान है — एक भव्य ब्रह्मांडीय समारोह जो एक साथ सौरमंडल के सभी नौ ग्रह देवताओं को सम्मानित, शांत और ऊर्जावान करता है। यह केवल एक पूजा नहीं है — यह एक पूर्ण ग्रह संरेखण समारोह है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>The nine planets — Surya (Sun), Chandra (Moon), Mangal (Mars), Budh (Mercury), Guru (Jupiter), Shukra (Venus), Shani (Saturn), Rahu (North Node), and Ketu (South Node) — each govern different dimensions of human life. When they are all harmonized simultaneously, the result is a spectacular transformation of one's entire life journey.</p>
                                <p className="sp-hindi"><em>नौ ग्रह — सूर्य, चंद्रमा, मंगल, बुध, बृहस्पति, शुक्र, शनि, राहु और केतु — मानव जीवन के विभिन्न आयामों को नियंत्रित करते हैं। जब वे सभी एक साथ सुसंगत होते हैं, तो परिणाम किसी की पूरी जीवन यात्रा का एक शानदार परिवर्तन होता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This grand puja involves setting up nine separate altars or a unified Navgraha yantra, with specific offerings, colors, flowers, grains, and mantras for each planet — a cosmic feast of colors and divine energy. Vedic priests chant thousands of mantras in a precisely orchestrated sequence that takes hours to complete.</p>
                                <p className="sp-hindi"><em>इस भव्य पूजा में नौ अलग-अलग वेदियां या एक एकीकृत नवग्रह यंत्र स्थापित करना शामिल है, प्रत्येक ग्रह के लिए विशिष्ट चढ़ावे, रंग, फूल, अनाज और मंत्रों के साथ। वैदिक पुजारी हजारों मंत्रों का जाप सटीक रूप से व्यवस्थित अनुक्रम में करते हैं जिसे पूरा होने में घंटों लगते हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Navgraha Shanti Puja is performed during major life transitions, before important ceremonies like marriages or business launches, during planetary conjunctions, and after experiencing repeated failures, losses, or health crises.</p>
                                <p className="sp-hindi"><em>नवग्रह शांति पूजा प्रमुख जीवन परिवर्तनों के दौरान, विवाह या व्यापार लॉन्च जैसे महत्वपूर्ण समारोहों से पहले और बार-बार असफलताओं के बाद की जाती है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This is the ultimate cosmic reset button — one ritual that corrects your entire destiny, balances your karma, and opens the floodgates of divine grace from all nine celestial rulers simultaneously!</p>
                                <p className="sp-hindi"><em>यह परम ब्रह्मांडीय रीसेट बटन है — एक अनुष्ठान जो आपकी पूरी नियति को सुधारता है, आपके कर्म को संतुलित करता है और सभी नौ आकाशीय शासकों की दिव्य कृपा के द्वार एक साथ खोलता है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Navgraha Shanti Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To achieve total planetary harmony and balance all nine Grahas simultaneously, creating a completely harmonized horoscope that supports success, happiness, health, and divine grace in every single life area.</p>
                                <p className="sp-hindi"><em>कुल ग्रह सद्भाव प्राप्त करने और एक साथ सभी नौ ग्रहों को संतुलित करने के लिए, एक पूरी तरह से सुसंगत कुंडली बनाना जो जीवन के हर एक क्षेत्र में सफलता, खुशी, स्वास्थ्य और दिव्य कृपा का समर्थन करती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💰 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To perform before major life milestones such as marriage ceremonies, new business launches, house warming rituals, childbirth, and auspicious new beginnings requiring maximum celestial blessings and divine support.</p>
                                <p className="sp-hindi"><em>विवाह समारोह, नए व्यापार लॉन्च, गृह प्रवेश अनुष्ठान, प्रसव और अधिकतम आकाशीय आशीर्वाद और दिव्य समर्थन की आवश्यकता वाले शुभ नई शुरुआत जैसे प्रमुख जीवन मील के पत्थर से पहले प्रदर्शन करने के लिए।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To powerfully counteract multiple planetary doshas — Mangal Dosha, Shani Dosha, Kaal Sarp Dosha, Guru Chandal Yoga — all at once in a single grand ceremony, rather than multiple individual planet-specific pujas.</p>
                                <p className="sp-hindi"><em>एकाधिक ग्रह दोषों — मंगल दोष, शनि दोष, काल सर्प दोष, गुरु चांडाल योग — को एक बार में एक भव्य समारोह में शक्तिशाली रूप से प्रतिकार करने के लिए, बजाय कई व्यक्तिगत ग्रह-विशिष्ट पूजाओं के।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To perform during planetary conjunctions, eclipses, and rare astrological events when multiple planets afflict the horoscope simultaneously, creating an urgent need for comprehensive cosmic recalibration and divine intervention.</p>
                                <p className="sp-hindi"><em>ग्रह संयोजन, ग्रहण और दुर्लभ ज्योतिषीय घटनाओं के दौरान प्रदर्शन करने के लिए जब कई ग्रह एक साथ कुंडली को पीड़ित करते हैं, व्यापक ब्रह्मांडीय पुनर्अंशांकन और दिव्य हस्तक्षेप की तत्काल आवश्यकता पैदा करते हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To protect the family from repeated misfortunes, health crises, financial catastrophes, relationship breakdowns, and mysterious suffering that seem to defy all earthly explanation and conventional remedial measures.</p>
                                <p className="sp-hindi"><em>परिवार को बार-बार दुर्भाग्य, स्वास्थ्य संकट, वित्तीय तबाही, संबंध टूटने और रहस्यमय पीड़ा से बचाने के लिए जो सभी सांसारिक व्याख्या और पारंपरिक उपचारात्मक उपायों को चुनौती देती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To make a profound offering of cosmic gratitude, celebrate divine blessings received, and proactively ensure continued planetary goodwill, prosperity, and protection for the family's future generations.</p>
                                <p className="sp-hindi"><em>ब्रह्मांडीय कृतज्ञता की एक गहरी पेशकश करने, प्राप्त दिव्य आशीर्वाद का जश्न मनाने और परिवार की भविष्य की पीढ़ियों के लिए निरंतर ग्रह सद्भावना, समृद्धि और सुरक्षा को सक्रिय रूप से सुनिश्चित करने के लिए।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Navgraha Shanti Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Choose an auspicious day (Sunday is ideal) and consult a Vedic priest for the most favorable muhurta (auspicious time).' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Purify the space with Ganga jal (holy water) and set up nine separate altars representing each of the nine planets.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Place the Navgraha Yantra at the center of the ceremony and arrange nine colored cloths (red, white, red, green, yellow, white/cream, black, dark blue, and grey) for each planet.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Prepare nine separate sets of offerings — each planet receives its specific flowers, grains, fruits, and symbolic items.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Begin with a Ganesh Puja and Kalash Sthapana to create a pure, protected, and divinely charged ritual space.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'The chief priest performs Navgraha Avahan (invocation of all nine planetary deities) with individual Beej Mantras chanted for each.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Conduct individual Havan (sacred fire rituals) for each of the nine planets with their respective specific havan samagri offerings.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Chant each planet\'s Beej Mantra 108 times in sequence: Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Perform grand collective aarti for all nine planets simultaneously, offering flowers and bowing to the entire cosmic assembly.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude with Navgraha Stotra recitation, donation of nine specific items to nine different people, and a shared prasad feast.' }
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
