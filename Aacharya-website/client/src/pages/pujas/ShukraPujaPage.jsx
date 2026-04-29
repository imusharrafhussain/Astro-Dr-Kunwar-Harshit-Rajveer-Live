import { useState, useEffect } from 'react'
import { GiHealthNormal, GiCoins, GiSparkles, GiShield, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/shukra puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'shukra-puja'
const PUJA_NAME = 'Shukra (Venus) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Shukra Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Shukra Kavach', 'Personal Sankalp', 'White Lotus Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Akarshan Puja',
        price: 2100,
        duration: '90 min',
        features: ['16,000x Shukra Beej Mantra', 'Havan with Ghee Ahuti', 'Diamond/Opal Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Shukra Aishwarya Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Shukra Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiHealthNormal />, title: 'Benefit 1', desc: 'Magnetizes deep, passionate love and romance, healing relationship wounds and attracting a soulmate connection filled with beauty and devotion. | गहरे, जुनूनी प्रेम और रोमांस को चुंबकीय बनाता है, संबंध के घावों को ठीक करता है और सुंदरता और भक्ति से भरे आत्मा साथी के संबंध को आकर्षित करता है।' },
    { icon: <GiCoins />, title: 'Benefit 2', desc: 'Attracts financial abundance, luxury, material prosperity, and the blessings of Goddess Lakshmi into daily life. | वित्तीय प्रचुरता, विलासिता, भौतिक समृद्धि और देवी लक्ष्मी के आशीर्वाद को दैनिक जीवन में आकर्षित करता है।' },
    { icon: <GiSparkles />, title: 'Benefit 3', desc: 'Awakens extraordinary artistic and creative talent, musical gifts, and an exceptional aesthetic sensibility that produces masterpieces. | असाधारण कलात्मक और रचनात्मक प्रतिभा, संगीत उपहार और एक असाधारण सौंदर्य संवेदनशीलता को जागृत करता है जो उत्कृष्ट कृतियाँ पैदा करती है।' },
    { icon: <GiSparkles />, title: 'Benefit 4', desc: 'Enhances personal beauty, charm, and magnetic attractiveness, making you irresistibly captivating and deeply admired wherever you go. | व्यक्तिगत सौंदर्य, आकर्षण और चुंबकीय आकर्षण को बढ़ाता है, आपको जहाँ भी जाएं अप्रतिरोध्य रूप से मनमोहक और गहराई से प्रशंसित बनाता है।' },
    { icon: <GiShield />, title: 'Benefit 5', desc: 'Removes Shukra Dosha, eliminating marriage delays and paving the way for a joyful, harmonious, and love-filled conjugal life. | शुक्र दोष को हटाता है, विवाह में देरी को समाप्त करता है और एक आनंदमय, सामंजस्यपूर्ण और प्रेम से भरे वैवाहिक जीवन का मार्ग प्रशस्त करता है।' },
    { icon: <GiSparkles />, title: 'Benefit 6', desc: 'Surrounds life with beauty, luxury, fine arts, pleasurable experiences, and the exquisite joys of an abundantly fulfilled existence. | जीवन को सुंदरता, विलासिता, ललित कला, आनंददायक अनुभवों और एक भरपूर पूर्ण अस्तित्व की उत्कृष्ट खुशियों से घेर देता है।' }
]

export default function ShukraPujaPage() {
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
                    <h1>Shukra (Venus) Puja</h1>
                    <p>Venus is the planet of love, beauty, and divine luxury. Shukra Puja is an enchanting ritual that awakens the Goddess of Beauty within your life — magnetizing love, attracting wealth, and surrounding you with art, romance, and the exquisite pleasures of existence!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Shukra (Venus) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Shukra Puja is an enchanting Vedic ritual dedicated to Shukra Dev — the Planet Venus — the most beautiful and beloved planet in the cosmic realm. Venus governs love, romance, beauty, art, music, luxury, wealth, relationships, sensual pleasures, and all things refined and exquisite in life.</p>
                                <p className="sp-hindi"><em>शुक्र पूजा एक मोहक वैदिक अनुष्ठान है जो शुक्र देव को समर्पित है — शुक्र ग्रह — ब्रह्मांडीय क्षेत्र में सबसे सुंदर और प्रिय ग्रह। शुक्र प्रेम, रोमांस, सौंदर्य, कला, संगीत, विलासिता, धन, रिश्तों और जीवन की सभी परिष्कृत और उत्कृष्ट चीजों को नियंत्रित करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Shukra Dev is the Guru of the Asuras — a brilliant, luminous deity of dazzling beauty who rides a crocodile (or white horse), holding lotus flowers. He is associated with diamonds, white silk, perfumes, creative arts, and the intoxicating power of beauty and desire.</p>
                                <p className="sp-hindi"><em>शुक्र देव असुरों के गुरु हैं — एक प्रतिभाशाली, चमकदार देवता जो अपनी अद्भुत सुंदरता के लिए प्रसिद्ध हैं, कमल के फूल धारण करते हैं। वे हीरे, सफेद रेशम, इत्र, रचनात्मक कलाओं और सौंदर्य और इच्छा की नशीली शक्ति से जुड़े हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering white and cream flowers, perfumes, white sweets, milk, rice, silver items, and saffron while chanting Venus's sacred mantras. Fridays (Shukravar) are the most blessed day for this ritual.</p>
                                <p className="sp-hindi"><em>इस पूजा में सफेद और क्रीम रंग के फूल, इत्र, सफेद मिठाई, दूध, चावल, चांदी की वस्तुएं और केसर चढ़ाना शामिल है। शुक्रवार इस अनुष्ठान के लिए सबसे धन्य दिन है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>When Venus is weak or afflicted, it manifests as troubled love life, failed marriages, financial struggles, lack of artistic talent, and diminished physical attractiveness and charm. Life loses its color, joy, and sparkle.</p>
                                <p className="sp-hindi"><em>जब शुक्र कमजोर या पीड़ित होता है, तो यह परेशान प्रेम जीवन, विफल विवाह, वित्तीय संघर्ष और कलात्मक प्रतिभा की कमी के रूप में प्रकट होता है। जीवन अपना रंग, आनंद और चमक खो देता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Shukra Puja reignites the divine spark of love and beauty in your life — blessing you with a magnetic personality, flourishing romance, artistic genius, material luxury, and the irresistible charm that makes life worth celebrating every single day!</p>
                                <p className="sp-hindi"><em>शुक्र पूजा आपके जीवन में प्रेम और सौंदर्य की दिव्य चिंगारी को फिर से जलाती है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Shukra (Venus) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>💍 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To attract true, deep, and lasting love into life, heal broken relationships, and reignite the spark of romance, passion, and intimate connection in existing partnerships and marriages.</p>
                                <p className="sp-hindi"><em>जीवन में सच्चे, गहरे और स्थायी प्रेम को आकर्षित करने, टूटे हुए रिश्तों को ठीक करने और मौजूदा साझेदारियों और विवाहों में रोमांस, जुनून और अंतरंग संबंध की चिंगारी को फिर से जलाने के लिए।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💰 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome financial blockages, attract material wealth, and invite the blessings of Goddess Lakshmi, as Venus shares a deep spiritual bond with the divine Goddess of wealth and prosperity.</p>
                                <p className="sp-hindi"><em>वित्तीय रुकावटों को दूर करने, भौतिक धन को आकर्षित करने और देवी लक्ष्मी के आशीर्वाद को आमंत्रित करने के लिए, क्योंकि शुक्र का धन और समृद्धि की दिव्य देवी के साथ गहरा आध्यात्मिक बंधन है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To develop and amplify extraordinary artistic talents, creative expression, musical abilities, and aesthetic sensibility, as Venus is the cosmic muse of all beautiful and creative human expression.</p>
                                <p className="sp-hindi"><em>असाधारण कलात्मक प्रतिभाओं, रचनात्मक अभिव्यक्ति, संगीत क्षमताओं और सौंदर्य संवेदनशीलता को विकसित करने और बढ़ाने के लिए, क्योंकि शुक्र सभी सुंदर और रचनात्मक मानव अभिव्यक्ति का ब्रह्मांडीय संग्रह है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To enhance personal beauty, physical attractiveness, magnetic charm, and a naturally captivating personality that draws love, admiration, and positive attention from the surrounding world.</p>
                                <p className="sp-hindi"><em>व्यक्तिगत सौंदर्य, शारीरिक आकर्षण, चुंबकीय करिश्मे और स्वाभाविक रूप से मनमोहक व्यक्तित्व को बढ़ाने के लिए जो आसपास की दुनिया से प्रेम, प्रशंसा और सकारात्मक ध्यान आकर्षित करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To resolve Shukra Dosha in the horoscope that causes marriage delays, relationship failures, and obstacles in experiencing love, luxury, and the joyful abundance of a fulfilled romantic life.</p>
                                <p className="sp-hindi"><em>कुंडली में शुक्र दोष को हल करने के लिए जो विवाह में देरी, संबंध विफलताओं और प्रेम, विलासिता और एक पूर्ण रोमांटिक जीवन का अनुभव करने में बाधाओं का कारण बनता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To attract luxurious material comforts, high-end lifestyle, beautiful surroundings, and all the exquisite pleasures that make life truly worth living, celebrating, and enjoying to the fullest.</p>
                                <p className="sp-hindi"><em>विलासितापूर्ण भौतिक सुख-सुविधाओं, उच्च-स्तरीय जीवन शैली, सुंदर परिवेश और सभी उत्कृष्ट आनंदों को आकर्षित करने के लिए जो जीवन को वास्तव में जीने, मनाने और पूरी तरह से आनंद लेने योग्य बनाते हैं।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Shukra (Venus) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake up on Friday (Shukravar), take a fragrant bath using rose water or sandalwood soap, and wear white or cream clothes.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Set up a beautiful altar with an idol or image of Shukra Dev on a white silk cloth decorated with flowers.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a white ghee lamp and rose or jasmine incense, filling the space with intoxicating, romantic fragrance.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer white flowers (white rose, jasmine, white lotus), perfume, silver ornaments, white sweets, milk, and saffron.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Place a natural diamond or white zircon near the idol to enhance Venus\'s divine loving energies.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Shukra Beej Mantra — "Om Draam Dreem Draum Sah Shukraay Namah" — 108 times with a white crystal rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Shukra Stotram or Shukra Kavach with deep love, beauty, and heartfelt devotion.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti by gracefully circling a camphor flame seven times before Shukra Dev.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Distribute white sweets (milk barfi, mishri) as prasad and donate white clothes or perfume to women.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by wearing perfume, embracing beauty, and offering silent gratitude for love and abundance in your life.' }
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
