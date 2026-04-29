import { useState, useEffect } from 'react'
import { GiSparkles, GiShield, GiBookAura, GiHealthNormal, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/ketu puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'ketu-puja'
const PUJA_NAME = 'Ketu Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Ketu Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Ketu Kavach', 'Personal Sankalp', 'Ash/Grey Color Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Moksha Karaka Puja',
        price: 2100,
        duration: '90 min',
        features: ['17,000x Ketu Beej Mantra', 'Havan with Kusha Grass', 'Cat\'s Eye Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Ketu Kripa Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Ketu Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiSparkles />, title: 'Benefit 1', desc: 'Pacifies Ketu Mahadasha, eliminating sudden losses, social alienation, and purposelessness, restoring direction and meaning to life. | केतु महादशा को शांत करता है, अचानक नुकसान, सामाजिक अलगाव और उद्देश्यहीनता को समाप्त करता है, जीवन में दिशा और अर्थ को बहाल करता है।' },
    { icon: <GiShield />, title: 'Benefit 2', desc: 'Removes Kaal Sarp Dosha, breaking the karmic serpent\'s hold and opening life to genuine progress, joy, and lasting fulfillment. | काल सर्प दोष को हटाता है, कर्म सर्प की पकड़ को तोड़ता है और जीवन को वास्तविक प्रगति, आनंद और स्थायी पूर्णता के लिए खोलता है।' },
    { icon: <GiBookAura />, title: 'Benefit 3', desc: 'Awakens extraordinary psychic gifts, occult knowledge, prophetic vision, and mystical abilities that reveal hidden spiritual truths. | असाधारण मानसिक उपहारों, गूढ़ ज्ञान, भविष्यसूचक दृष्टि और रहस्यमय क्षमताओं को जागृत करता है जो छिपे हुए आध्यात्मिक सत्यों को प्रकट करती हैं।' },
    { icon: <GiSparkles />, title: 'Benefit 4', desc: 'Dramatically deepens meditation practice, spiritual awareness, and accelerates the journey toward ultimate liberation and enlightenment. | ध्यान अभ्यास, आध्यात्मिक जागरूकता को नाटकीय रूप से गहरा करता है और अंतिम मुक्ति और ज्ञान की यात्रा में तेजी लाता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 5', desc: 'Heals mysterious chronic illnesses, karmic diseases, and deep psychosomatic conditions resistant to conventional medical treatment. | रहस्यमय पुरानी बीमारियों, कर्म रोगों और पारंपरिक चिकित्सा उपचार के प्रति प्रतिरोधी गहरी मनोदैहिक स्थितियों को ठीक करता है।' },
    { icon: <GiSparkles />, title: 'Benefit 6', desc: 'Cultivates profound spiritual freedom, ego dissolution, and the liberating realization of one\'s own infinite, immortal, and eternal soul. | गहरी आध्यात्मिक स्वतंत्रता, अहंकार विघटन और अपनी अनंत, अमर और शाश्वत आत्मा की मुक्तिदायक अनुभूति को विकसित करता है।' }
]

export default function KetuPujaPage() {
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
                    <h1>Ketu Puja</h1>
                    <p>Ketu is the dragon's tail — the planet of liberation, detachment, and otherworldly wisdom. Ketu Puja is a mystical gateway ritual that severs karmic chains, awakens hidden psychic powers, and propels the soul toward the ultimate destination: spiritual liberation and moksha!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Ketu Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Ketu Puja is a deeply mystical and spiritually potent Vedic ritual dedicated to Ketu — the South Node of the Moon — the second shadow planet (Chaya Graha) and the mysterious headless demon body of Svarbhanu. While Rahu represents insatiable worldly desire, Ketu represents the exact opposite — detachment, spirituality, liberation, and past-life wisdom.</p>
                                <p className="sp-hindi"><em>केतु पूजा एक गहराई से रहस्यमय और आध्यात्मिक रूप से शक्तिशाली वैदिक अनुष्ठान है जो केतु को समर्पित है — चंद्रमा का दक्षिणी नोड — दूसरा छाया ग्रह और स्वरभानु का रहस्यमय बिना सिर का राक्षस शरीर। जबकि राहु अतृप्त सांसारिक इच्छा का प्रतिनिधित्व करता है, केतु इसके बिल्कुल विपरीत का प्रतिनिधित्व करता है — वैराग्य, आध्यात्मिकता, मुक्ति और पूर्व जीवन का ज्ञान।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Ketu governs moksha (spiritual liberation), psychic abilities, deep meditation, occult knowledge, mysticism, sudden events, and the dissolution of the ego. He is the great liberator who cuts through the illusions of the material world to reveal the eternal truth beneath.</p>
                                <p className="sp-hindi"><em>केतु मोक्ष (आध्यात्मिक मुक्ति), मानसिक क्षमताओं, गहरे ध्यान, गूढ़ ज्ञान, रहस्यवाद, अचानक घटनाओं और अहंकार के विघटन को नियंत्रित करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering multicolored or variegated flowers, sesame, dog-related charities, grey or smoky items, and lead articles, while chanting Ketu's sacred mantras. Tuesdays and Saturdays are most favorable for Ketu worship.</p>
                                <p className="sp-hindi"><em>यह पूजा बहुरंगी फूल, तिल, कुत्ते से संबंधित दान, धुएँ के रंग की वस्तुएं और सीसे की वस्तुएं चढ़ाना और केतु के पवित्र मंत्रों का जाप करना शामिल है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>A malefic Ketu causes confusion, lack of direction, inexplicable fears, social alienation, chronic diseases, sudden losses, and a persistent feeling of purposelessness.</p>
                                <p className="sp-hindi"><em>एक पापी केतु भ्रम, दिशाहीनता, अस्पष्टीकृत भय, सामाजिक अलगाव और उद्देश्यहीनता की लगातार भावना का कारण बनता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Ketu Puja transforms this planet's energy into a blazing torch of spiritual illumination — igniting your psychic gifts, deepening meditation, awakening past-life knowledge, and ultimately setting your soul free from the endless cycle of birth and death!</p>
                                <p className="sp-hindi"><em>केतु पूजा इस ग्रह की ऊर्जा को आध्यात्मिक प्रकाश की एक जलती हुई मशाल में बदल देती है — आपके मानसिक उपहारों को प्रज्वलित करती है, ध्यान को गहरा करती है और आत्मा को जन्म और मृत्यु के अनंत चक्र से मुक्त करती है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Ketu Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To pacify Ketu Mahadasha and its deeply disorienting effects including sudden losses, social alienation, inexplicable health problems, and a crushing sense of meaninglessness, purposelessness, and spiritual emptiness.</p>
                                <p className="sp-hindi"><em>केतु महादशा और इसके गहराई से भटकाने वाले प्रभावों को शांत करने के लिए जिसमें अचानक नुकसान, सामाजिक अलगाव, अस्पष्टीकृत स्वास्थ्य समस्याएं और अर्थहीनता, उद्देश्यहीनता और आध्यात्मिक खालीपन की कुचलने वाली भावना शामिल है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🧿 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To remove Kaal Sarp Dosha alongside Rahu, freeing the individual from the serpentine grip of karmic debt, ancestral patterns, and the relentless wheel of past-life suffering that blocks present-life flourishing.</p>
                                <p className="sp-hindi"><em>राहु के साथ काल सर्प दोष को हटाने के लिए, व्यक्ति को कर्म ऋण, पैतृक पैटर्न और पूर्व जीवन की पीड़ा के अजगर जैसी पकड़ से मुक्त करना जो वर्तमान जीवन के फलने-फूलने को अवरुद्ध करती है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To awaken dormant psychic abilities, clairvoyant perception, prophetic dreams, and deep occult knowledge, as Ketu is the master of all hidden, esoteric, and mystical wisdom beyond normal human perception.</p>
                                <p className="sp-hindi"><em>निष्क्रिय मानसिक क्षमताओं, दूरदर्शी धारणा, भविष्यसूचक सपनों और गहरे गूढ़ ज्ञान को जागृत करने के लिए, क्योंकि केतु सामान्य मानव धारणा से परे सभी छिपे, गूढ़ और रहस्यमय ज्ञान का स्वामी है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To accelerate the spiritual journey, deepen meditation, achieve higher states of consciousness, and ultimately progress toward moksha — the supreme liberation of the soul from the eternal cycle of rebirth.</p>
                                <p className="sp-hindi"><em>आध्यात्मिक यात्रा में तेजी लाने, ध्यान को गहरा करने, चेतना की उच्च अवस्थाओं को प्राप्त करने और अंततः मोक्ष की ओर प्रगति करने के लिए — पुनर्जन्म के शाश्वत चक्र से आत्मा की सर्वोच्च मुक्ति।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To heal inexplicable chronic ailments, mysterious karmic diseases, skin disorders, and deep psychosomatic conditions that baffle physicians and defy conventional medical explanation and treatment approaches.</p>
                                <p className="sp-hindi"><em>अस्पष्टीकृत पुरानी बीमारियों, रहस्यमय कर्म रोगों, त्वचा विकारों और गहरी मनोदैहिक स्थितियों को ठीक करने के लिए जो चिकित्सकों को हैरान करती हैं और पारंपरिक चिकित्सा व्याख्या और उपचार दृष्टिकोण को चुनौती देती हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>✨ Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To develop profound spiritual detachment, freedom from ego-driven desires, and the extraordinary inner freedom that comes from realizing the true, eternal, limitless nature of one's own immortal soul.</p>
                                <p className="sp-hindi"><em>गहरा आध्यात्मिक वैराग्य, अहंकार-संचालित इच्छाओं से स्वतंत्रता, और असाधारण आंतरिक स्वतंत्रता विकसित करने के लिए जो किसी की अपनी अमर आत्मा की सच्ची, शाश्वत, असीमित प्रकृति को महसूस करने से आती है।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Ketu Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Perform Ketu Puja on Tuesday or Saturday, ideally at twilight or dusk — the mystical in-between time.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Take a purifying bath and wear dark grey, brown, or saffron clothes — colors that honor Ketu\'s ethereal nature.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Set up an altar with Ketu\'s symbol — a headless figure, a grey stone, or an image of Lord Ganesha (Ketu\'s deity).' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Light incense made of loban, camphor, or dhoop — creating a thick, purifying, protective smoke.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Offer multicolored or grey flowers, sesame seeds, coconut, grey cloth, and lead or copper articles.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Ketu Beej Mantra — "Om Straam Streem Straum Sah Ketave Namah" — 108 times with a grey or cat\'s eye rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Ketu Stotram, Ketu Kavach, or meditate on the Ganesha mantra with deep inner silence.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti with a camphor lamp seven times, focusing your mind on liberation, detachment, and spiritual light.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Feed stray dogs (Ketu\'s animal) and donate grey blankets or food to the needy as a form of Ketu-seva.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'Conclude by sitting in 20-minute silent meditation, visualizing silvery light dissolving all karmic bonds and ego.' }
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
