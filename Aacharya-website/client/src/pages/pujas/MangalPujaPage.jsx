import { useState, useEffect } from 'react'
import { GiShield, GiMuscularTorso, GiHealthNormal, GiHouseKeys, GiStairsGoal, GiCrown, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/mangal puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'mangal-puja'
const PUJA_NAME = 'Mangal (Mars) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Mangal Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Rin-Mochan Stotra', 'Personal Sankalp', 'Red Flower Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Kuja Dosha Puja',
        price: 2100,
        duration: '90 min',
        features: ['10,000x Mangal Beej Mantra', 'Havan with Red Lentil Ahuti', 'Coral/Copper Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Bhaum Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Mangal & Navgraha Shanti', 'Mangal Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiShield />, title: 'Benefit 1', desc: 'Eliminates Mangal Dosha, clearing the path to a happy marriage, compatible partnership, and lasting marital bliss and harmony. | मंगल दोष को समाप्त करता है, सुखी विवाह, अनुकूल साझेदारी और स्थायी वैवाहिक आनंद और सामंजस्य का मार्ग प्रशस्त करता है।' },
    { icon: <GiMuscularTorso />, title: 'Benefit 2', desc: 'Ignites fearless courage, warrior-like determination, and unstoppable confidence to achieve ambitious goals and conquer life\'s every challenge. | निडर साहस, योद्धा-जैसा दृढ़ संकल्प और महत्वाकांक्षी लक्ष्यों को प्राप्त करने और जीवन की हर चुनौती को जीतने के लिए अजेय आत्मविश्वास को प्रज्वलित करता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 3', desc: 'Protects against accidents, surgical risks, blood disorders, and physical injuries, maintaining excellent health and bodily vitality throughout life. | दुर्घटनाओं, शल्य चिकित्सा जोखिमों, रक्त विकारों और शारीरिक चोटों से बचाता है, पूरे जीवन में उत्कृष्ट स्वास्थ्य और शारीरिक जीवन शक्ति बनाए रखता है।' },
    { icon: <GiHouseKeys />, title: 'Benefit 4', desc: 'Resolves property disputes, land conflicts, and real estate issues, bringing swift clarity, decisive victory, and justice in legal matters. | संपत्ति विवादों, भूमि संघर्षों और रियल एस्टेट मुद्दों को हल करता है, कानूनी मामलों में त्वरित स्पष्टता, निर्णायक जीत और न्याय लाता है।' },
    { icon: <GiStairsGoal />, title: 'Benefit 5', desc: 'Boosts athletic prowess, stamina, competitive performance, and dynamic leadership skills for outstanding success in sports and professional career. | एथलेटिक कौशल, सहनशक्ति, प्रतिस्पर्धी प्रदर्शन और गतिशील नेतृत्व कौशल को बढ़ाता है, खेल और पेशेवर करियर में उत्कृष्ट सफलता के लिए।' },
    { icon: <GiCrown />, title: 'Benefit 6', desc: 'Channels excessive anger and aggression into productive discipline, focused energy, and commanding leadership, brilliantly transforming weakness into strength. | अत्यधिक क्रोध और आक्रामकता को उत्पादक अनुशासन, केंद्रित ऊर्जा और प्रभावशाली नेतृत्व में चैनल करता है, कमजोरी को शानदार रूप से ताकत में बदलता है।' }
]

export default function MangalPujaPage() {
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
                    <h1>Mangal (Mars) Puja</h1>
                    <p>Mars is the warrior planet — fierce, energetic, and unstoppable. Mangal Puja is a blazing ritual that channels the red fire of Mars to ignite your courage, smash your fears, defeat your enemies, and fuel your ambitions with the power of a thousand warriors!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Mangal (Mars) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Mangal Puja is a dynamic Vedic ritual dedicated to Mangal Dev — the God of Mars — one of the most powerful and fiery planets in the solar system. Known as the Commander-in-Chief (Senapati) of all nine planets, Mars governs courage, physical strength, aggression, ambition, landed property, and military might.</p>
                                <p className="sp-hindi"><em>मंगल पूजा एक गतिशील वैदिक अनुष्ठान है जो मंगल देव को समर्पित है — मंगल के देवता — सौरमंडल के सबसे शक्तिशाली और उग्र ग्रहों में से एक। सभी नौ ग्रहों के सेनापति के रूप में जाने जाने वाले, मंगल साहस, शारीरिक शक्ति, आक्रामकता, महत्वाकांक्षा, भूमि संपत्ति और सैन्य शक्ति को नियंत्रित करते हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Mangal Dev is depicted as a red-complexioned deity riding a ram (mesha), holding weapons and radiating fierce warrior energy — the divine embodiment of valor, action, and the relentless will to conquer. He is the patron of soldiers, athletes, surgeons, police officers, and leaders.</p>
                                <p className="sp-hindi"><em>मंगल देव को एक लाल रंग के देवता के रूप में चित्रित किया जाता है जो मेढ़े पर सवार होते हैं, हथियार धारण करते हैं और उग्र योद्धा ऊर्जा विकीर्ण करते हैं। वे सैनिकों, एथलीटों, सर्जनों, पुलिस अधिकारियों और नेताओं के संरक्षक हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja is performed to pacify an angry Mars or to strengthen a weak one in the birth chart. A malefic Mars causes Mangal Dosha (also called Manglik Dosha), which creates severe challenges in marriage, explosive conflicts, accidents, blood-related disorders, and financial instability.</p>
                                <p className="sp-hindi"><em>यह पूजा जन्म कुंडली में क्रोधित मंगल को शांत करने या कमजोर मंगल को मजबूत करने के लिए की जाती है। एक पापी मंगल मंगल दोष पैदा करता है, जो विवाह में गंभीर चुनौतियाँ, विस्फोटक संघर्ष, दुर्घटनाएँ, रक्त संबंधी विकार और वित्तीय अस्थिरता का कारण बनता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Through chanting of Mars mantras, offering red flowers, red lentils (masoor dal), red sweets, and kumkum, the devotee establishes a divine connection with the fiery energy of Mars. The ritual is most powerful on Tuesdays (Mangalvar).</p>
                                <p className="sp-hindi"><em>मंगल मंत्रों का जाप, लाल फूल, मसूर दाल, लाल मिठाई और कुमकुम चढ़ाने के माध्यम से, भक्त मंगल की उग्र ऊर्जा के साथ एक दिव्य संबंध स्थापित करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja transforms the destructive fire of an afflicted Mars into the creative fire of a champion — someone who conquers life with courage, discipline, and an indomitable warrior spirit!</p>
                                <p className="sp-hindi"><em>यह पूजा पीड़ित मंगल की विनाशकारी अग्नि को एक चैंपियन की रचनात्मक अग्नि में बदल देती है — जो साहस, अनुशासन और अदम्य योद्धा भावना के साथ जीवन को जीतता है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Mangal (Mars) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>🧿 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To neutralize Mangal Dosha (Manglik Dosha) in the horoscope, which creates severe delays in marriage, explosive relationship conflicts, and to attract a harmonious, loving, and deeply compatible life partner.</p>
                                <p className="sp-hindi"><em>कुंडली में मंगल दोष को बेअसर करने के लिए, जो विवाह में गंभीर देरी, विस्फोटक संबंध संघर्ष पैदा करता है, और एक सामंजस्यपूर्ण, प्रेमपूर्ण और गहराई से अनुकूल जीवन साथी को आकर्षित करने के लिए।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>👑 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To ignite raw courage, fearlessness, and an unstoppable warrior spirit, enabling you to face life's greatest challenges, fierce competition, and powerful adversaries without retreating or surrendering an inch.</p>
                                <p className="sp-hindi"><em>कच्चे साहस, निडरता और एक अजेय योद्धा भावना को प्रज्वलित करने के लिए, जिससे आप बिना एक इंच पीछे हटे जीवन की सबसे बड़ी चुनौतियों, भयंकर प्रतिस्पर्धा और शक्तिशाली विरोधियों का सामना कर सकें।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To prevent accidents, injuries, surgeries, and blood-related health disorders caused by an afflicted Mars, protecting the physical body and ensuring vitality, strength, and robust health throughout entire life.</p>
                                <p className="sp-hindi"><em>पीड़ित मंगल के कारण होने वाली दुर्घटनाओं, चोटों, सर्जरी और रक्त संबंधी विकारों को रोकने के लिए, शारीरिक शरीर की रक्षा करना और पूरे जीवन में जीवन शक्ति, शक्ति और मजबूत स्वास्थ्य सुनिश्चित करना।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To protect and secure property, land, and real estate interests, as Mars is the natural significator of land, and a weak Mars causes property disputes, dangerous legal battles, and devastating financial losses.</p>
                                <p className="sp-hindi"><em>संपत्ति, भूमि और रियल एस्टेट हितों की रक्षा और सुरक्षा के लिए, क्योंकि मंगल भूमि का प्राकृतिक कारक है, और एक कमजोर मंगल संपत्ति विवाद, खतरनाक कानूनी लड़ाइयों और विनाशकारी वित्तीय नुकसान का कारण बनता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To enhance athletic performance, physical endurance, competitive drive, and leadership abilities, as a strong Mars blesses individuals with exceptional stamina, competitive edge, and the indomitable spirit of a born champion.</p>
                                <p className="sp-hindi"><em>एथलेटिक प्रदर्शन, शारीरिक सहनशक्ति, प्रतिस्पर्धी ड्राइव और नेतृत्व क्षमताओं को बढ़ाने के लिए, क्योंकि एक मजबूत मंगल असाधारण सहनशक्ति, प्रतिस्पर्धी बढ़त और एक जन्मजात चैंपियन की अदम्य भावना का आशीर्वाद देता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To channel excessive anger, impulsiveness, and aggression caused by a highly charged Mars productively into discipline, focused action, and outstanding leadership excellence that creates positive impact.</p>
                                <p className="sp-hindi"><em>अत्यधिक मजबूत मंगल के कारण होने वाले अत्यधिक क्रोध, आवेग और आक्रामकता को उत्पादक रूप से अनुशासन, केंद्रित क्रिया और उत्कृष्ट नेतृत्व में चैनल करने के लिए जो सकारात्मक प्रभाव पैदा करे।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Mangal (Mars) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake up early on Tuesday (Mangalvar) and bathe, wearing red or orange clothes for the ritual.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Set up a clean altar with an idol or image of Mangal Dev or Lord Hanuman (Mars\'s presiding deity) on a red cloth.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a ghee lamp and red sandalwood incense, filling the space with powerful, energizing warrior vibrations.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer red flowers (red roses, hibiscus), red lentils (masoor dal), red sweets, and kumkum to the deity.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Place a copper vessel filled with water and a red coral stone near the idol for activation.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Mangal Beej Mantra — "Om Kraam Kreem Kraum Sah Bhaumay Namah" — 108 times with a red coral rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Mangal Stotram or Hanuman Chalisa with intense devotion, courage, and full concentration.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti by circling a camphor flame clockwise before the deity seven times with warrior\'s conviction.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Distribute red sweets (motichoor ladoo) as prasad and donate red lentils to the needy as seva.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude with a silent vow of courage — affirm your warrior spirit and express heartfelt gratitude to Mangal Dev.' }
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
