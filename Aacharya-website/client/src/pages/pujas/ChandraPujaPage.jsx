import { useState, useEffect } from 'react'
import { GiLotus, GiBrain, GiHealthNormal, GiStairsGoal, GiShield, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/chandra puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'chandra-puja'
const PUJA_NAME = 'Chandra (Moon) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Shanti Puja',
        price: 1100,
        duration: '45 min',
        features: ['Chandra Mantra Chanting', 'Personal Sankalp', 'White Flowers Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Sommaar Puja',
        price: 2100,
        duration: '90 min',
        features: ['10,000x Chandra Beej Mantra', 'Havan with Milk Ahuti', 'Silver Item Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Chandra Purnima Puja',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Chandra Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiLotus />, title: 'Benefit 1', desc: 'Brings profound mental peace and emotional stability, effectively calming chronic anxiety, mood swings, and depression for a joyful, balanced life. | गहरी मानसिक शांति और भावनात्मक स्थिरता लाता है, पुरानी चिंता, मूड स्विंग और अवसाद को प्रभावी ढंग से शांत करके एक आनंदमय, संतुलित जीवन देता है।' },
    { icon: <GiBrain />, title: 'Benefit 2', desc: 'Sharpens memory, enhances focus, and strengthens the mind, making academic studies and intellectual pursuits significantly more productive and successful. | स्मृति को तेज करता है, ध्यान बढ़ाता है और मन को मजबूत करता है, शैक्षणिक अध्ययन और बौद्धिक प्रयासों को काफी अधिक उत्पादक और सफल बनाता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 3', desc: 'Heals fractured mother-child bonds, restoring unconditional love, warmth, and deep understanding within family relationships and domestic life. | टूटे हुए माँ-बच्चे के बंधनों को ठीक करता है, पारिवारिक रिश्तों और घरेलू जीवन में बिना शर्त प्यार, गर्मजोशी और गहरी समझ को बहाल करता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 4', desc: 'Cures insomnia and sleep disorders, blessing the devotee with deep, restorative, and peaceful sleep every single night. | अनिद्रा और नींद संबंधी विकारों को ठीक करता है, भक्त को हर रात गहरी, पुनर्स्थापनात्मक और शांतिपूर्ण नींद का आशीर्वाद देता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 5', desc: 'Unlocks powerful creative talents, artistic gifts, and heightened intuition, opening extraordinary doors of success in creative and artistic careers. | शक्तिशाली रचनात्मक प्रतिभाओं, कलात्मक उपहारों और उन्नत अंतर्ज्ञान को अनलॉक करता है, रचनात्मक और कलात्मक करियर में सफलता के असाधारण द्वार खोलता है।' },
    { icon: <GiShield />, title: 'Benefit 6', desc: 'Removes Chandra Dosha, attracting blissful marital harmony, emotional fulfillment, and lasting happiness in all personal relationships. | चंद्र दोष को हटाता है, सभी व्यक्तिगत संबंधों में परमानंदमय वैवाहिक सामंजस्य, भावनात्मक पूर्णता और स्थायी खुशी को आकर्षित करता है।' }
]

export default function ChandraPujaPage() {
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
                    <h1>Chandra (Moon) Puja</h1>
                    <p>The Moon rules the mind, emotions, and the subconscious. Chandra Puja is a mystical lunar ritual that invites the calming silver light of Chandra Dev into your life — washing away anxiety, restoring peace, and awakening your deepest intuition.</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Chandra (Moon) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Chandra Puja is a sacred Vedic ritual dedicated to Chandra Dev — the Moon God — who governs the mind, emotions, intuition, and the subconscious realm of human existence. In Vedic astrology, the Moon is considered the queen of all nine planets, wielding unparalleled influence over our psychological wellbeing, creativity, and relationships.</p>
                                <p className="sp-hindi"><em>चंद्र पूजा एक पवित्र वैदिक अनुष्ठान है जो चंद्र देव को समर्पित है — चंद्रमा भगवान — जो मानव अस्तित्व के मन, भावनाओं, अंतर्ज्ञान और अवचेतन क्षेत्र को नियंत्रित करते हैं। वैदिक ज्योतिष में, चंद्रमा को सभी नौ ग्रहों की रानी माना जाता है, जो हमारी मनोवैज्ञानिक भलाई, रचनात्मकता और संबंधों पर अद्वितीय प्रभाव डालती है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Chandra Dev is depicted riding a magnificent silver chariot pulled by ten white horses, holding a lotus flower in his hand — an image of serene power and divine grace. He is closely associated with water, tides, feminine energy, and the eternal cycle of nature.</p>
                                <p className="sp-hindi"><em>चंद्र देव को दस सफेद घोड़ों द्वारा खींचे जाने वाले एक भव्य चांदी के रथ पर सवार, हाथ में कमल का फूल लिए हुए चित्रित किया जाता है। वे जल, ज्वार, स्त्री ऊर्जा और प्रकृति के शाश्वत चक्र से निकटता से जुड़े हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves chanting powerful Vedic mantras, offering white flowers, milk, rice pudding (kheer), and sandalwood paste to honor this cosmic luminary. The ritual is most potent on Mondays (Somvar), Purnima (Full Moon), and Amavasya (New Moon).</p>
                                <p className="sp-hindi"><em>इस पूजा में शक्तिशाली वैदिक मंत्रों का जाप, सफेद फूल, दूध, खीर और चंदन का लेप अर्पित करना शामिल है। यह अनुष्ठान सोमवार, पूर्णिमा और अमावस्या पर सबसे शक्तिशाली होता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>When the Moon is weak or afflicted in a birth chart, it manifests as mental distress, depression, sleeplessness, emotional outbursts, and strained maternal bonds. Performing Chandra Puja with devotion neutralizes these negative effects and transforms lunar energy into a powerful shield of peace, clarity, and emotional strength.</p>
                                <p className="sp-hindi"><em>जब किसी की जन्म कुंडली में चंद्रमा कमजोर या पीड़ित होता है, तो यह मानसिक पीड़ा, अवसाद, अनिद्रा, भावनात्मक विस्फोट और माँ के साथ तनावपूर्ण संबंध के रूप में प्रकट होता है। भक्ति के साथ चंद्र पूजा करने से इन नकारात्मक प्रभावों को बेअसर किया जाता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This ritual is your gateway to a calmer mind, deeper sleep, and a heart overflowing with compassion!</p>
                                <p className="sp-hindi"><em>यह अनुष्ठान एक शांत मन, गहरी नींद और करुणा से भरे हृदय का आपका प्रवेश द्वार है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Chandra (Moon) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>💍 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To calm an afflicted Moon in the horoscope that causes anxiety, depression, and emotional turbulence, restoring lasting mental peace and psychological harmony into everyday life and relationships.</p>
                                <p className="sp-hindi"><em>कुंडली में पीड़ित चंद्रमा को शांत करने के लिए जो चिंता, अवसाद और भावनात्मक उथल-पुथल पैदा करता है, रोजमर्रा की जिंदगी और रिश्तों में स्थायी मानसिक शांति और मनोवैज्ञानिक सामंजस्य बहाल करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💍 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To strengthen the bond with one's mother, heal maternal relationships, and attract unconditional love, as the Moon symbolizes the divine feminine, nurturing energy, and the mother principle in Vedic astrology.</p>
                                <p className="sp-hindi"><em>माँ के साथ बंधन को मजबूत करने, मातृ संबंधों को ठीक करने और बिना शर्त प्यार को आकर्षित करने के लिए, क्योंकि चंद्रमा वैदिक ज्योतिष में दिव्य स्त्रीत्व, पोषण ऊर्जा और माँ के सिद्धांत का प्रतीक है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome chronic insomnia, disturbed sleep patterns, and restless nights caused by a troubled Moon, as this puja pacifies the lunar vibrations and restores naturally deep, rejuvenating sleep cycles.</p>
                                <p className="sp-hindi"><em>पीड़ित चंद्रमा के कारण होने वाली पुरानी अनिद्रा, परेशान नींद के पैटर्न और बेचैन रातों को दूर करने के लिए, क्योंकि यह पूजा चंद्र कंपन को शांत करती है और स्वाभाविक रूप से गहरी, स्फूर्तिदायक नींद के चक्रों को बहाल करती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧘 Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To awaken and amplify psychic intuition, artistic creativity, and empathetic sensitivity, as a blessed Moon sharpens the mind's eye and grants extraordinary imaginative powers and profound emotional intelligence.</p>
                                <p className="sp-hindi"><em>मानसिक अंतर्ज्ञान, कलात्मक रचनात्मकता और सहानुभूतिपूर्ण संवेदनशीलता को जगाने और बढ़ाने के लिए, क्योंकि एक आशीर्वाद प्राप्त चंद्रमा मन की आंख को तेज करता है और असाधारण कल्पनाशील शक्तियां और गहरी भावनात्मक बुद्धिमत्ता प्रदान करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To remove Chandra Dosha from the birth chart, which creates recurring obstacles in marriage, career stability, mental peace, and financial growth, enabling a harmonious, prosperous, and fulfilling life journey.</p>
                                <p className="sp-hindi"><em>जन्म कुंडली से चंद्र दोष को हटाने के लिए, जो विवाह, करियर स्थिरता, मानसिक शांति और वित्तीय विकास में बार-बार बाधाएं पैदा करता है, जिससे एक सामंजस्यपूर्ण, समृद्ध और पूर्ण जीवन यात्रा संभव होती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To gain emotional resilience and inner strength to face life's hardships with grace, transforming grief and sorrow into wisdom, and developing an unshakeable compassionate heart and serene spirit.</p>
                                <p className="sp-hindi"><em>भावनात्मक लचीलापन और जीवन की कठिनाइयों का अनुग्रह के साथ सामना करने की आंतरिक शक्ति प्राप्त करने के लिए, दुःख और शोक को ज्ञान में बदलने और एक अटल दयालु हृदय और शांत आत्मा विकसित करने के लिए।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Chandra (Moon) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake before sunrise on Monday or Purnima and take a purifying bath to cleanse body and aura.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Wear white clothes and set up a clean altar with a silver idol or image of Chandra Dev on a white cloth.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a ghee lamp and white sandalwood incense to consecrate and energize the sacred space.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer white flowers (jasmine, white rose), kheer, milk, raw rice, and white sweets to the deity.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Apply sandalwood paste (chandan) and white tilak on the idol, focusing completely on Chandra Dev.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Beej Mantra — "Om Shraam Shreem Shraum Sah Chandramasay Namah" — 108 times with a crystal rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Chandra Stotram or Chandra Kavach with pure devotion and one-pointed concentration.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti by circling a camphor flame clockwise before Chandra Dev seven times with gratitude.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Distribute kheer or white sweets as prasad among family members and seek their loving blessings.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by meditating under moonlight, absorbing its silver, healing, divine energy deep into your being.' }
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
