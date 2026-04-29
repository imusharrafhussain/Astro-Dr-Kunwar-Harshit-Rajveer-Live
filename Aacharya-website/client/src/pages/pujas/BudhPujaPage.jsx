import { useState, useEffect } from 'react'
import { GiSoundWaves, GiBrain, GiCoins, GiBookAura, GiCrown, GiHealthNormal, GiSunrise } from 'react-icons/gi'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import heroImage from '../../assets/budh graha puja.png';
import './GenericPujaPage.css'

const PUJA_ID = 'budh-puja'
const PUJA_NAME = 'Budh (Mercury) Puja'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PACKAGES = [
    {
        id: 'basic',
        name: 'Budh Shanti',
        price: 1100,
        duration: '45 min',
        features: ['Vishnu Sahasranama', 'Personal Sankalp', 'Green Gram Offering', 'Prasad dispatch'],
        
    },
    {
        id: 'standard',
        name: 'Vishesh Vidyaprapti Puja',
        price: 2100,
        duration: '90 min',
        features: ['10,000x Budh Beej Mantra', 'Havan with Durva Grass', 'Emerald/Onyx Energization', 'Video recording'],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Maha Budh Vyapar Havan',
        price: 5100,
        duration: '3 hours',
        features: ['Complete Navgraha Shanti', 'Budh Yantra Sthapana', 'Live Individual Participation', 'Post-Puja Consultation'],
        
    },
]

const BENEFITS = [
    { icon: <GiSoundWaves />, title: 'Benefit 1', desc: 'Dramatically improves communication, eloquence, and public speaking, making you a naturally persuasive and charismatic speaker in every situation. | संचार, वाकपटुता और सार्वजनिक बोलने में नाटकीय रूप से सुधार करता है, आपको हर स्थिति में स्वाभाविक रूप से प्रेरक और करिश्माई वक्ता बनाता है।' },
    { icon: <GiBrain />, title: 'Benefit 2', desc: 'Sharpens memory, boosts concentration, and enhances academic excellence, making competitive exam success much more achievable and consistent. | स्मृति को तेज करता है, एकाग्रता बढ़ाता है और शैक्षणिक उत्कृष्टता को बढ़ाता है, प्रतिस्पर्धी परीक्षा की सफलता को कहीं अधिक प्राप्त करने योग्य और सुसंगत बनाता है।' },
    { icon: <GiCoins />, title: 'Benefit 3', desc: 'Attracts massive business success, financial growth, and sharp entrepreneurial instincts, blessing merchants and traders with remarkable prosperity. | भारी व्यापार सफलता, वित्तीय विकास और तीव्र उद्यमशीलता प्रवृत्ति को आकर्षित करता है, व्यापारियों और व्यवसायियों को उल्लेखनीय समृद्धि का आशीर्वाद देता है।' },
    { icon: <GiBookAura />, title: 'Benefit 4', desc: 'Resolves learning difficulties in children, unlocking their natural intelligence, curiosity, and extraordinary potential for exceptional academic achievement. | बच्चों में सीखने की कठिनाइयों को हल करता है, उनकी प्राकृतिक बुद्धि, जिज्ञासा और असाधारण शैक्षणिक उपलब्धि की अद्भुत क्षमता को अनलॉक करता है।' },
    { icon: <GiCrown />, title: 'Benefit 5', desc: 'Grants extraordinary writing and creative expression skills, opening powerful platforms for authors, bloggers, journalists, and content creators to shine. | असाधारण लेखन और रचनात्मक अभिव्यक्ति कौशल प्रदान करता है, लेखकों, ब्लॉगर्स, पत्रकारों और सामग्री निर्माताओं के लिए शक्तिशाली मंच खोलता है।' },
    { icon: <GiHealthNormal />, title: 'Benefit 6', desc: 'Heals skin disorders, nervous system issues, and restores mental clarity, bringing radiant health and deep inner calm to the devoted practitioner. | त्वचा संबंधी विकारों, तंत्रिका तंत्र की समस्याओं को ठीक करता है और मानसिक स्पष्टता को बहाल करता है, समर्पित साधक को दीप्तिमान स्वास्थ्य और गहरी आंतरिक शांति लाता है।' }
]

export default function BudhPujaPage() {
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
                    <h1>Budh (Mercury) Puja</h1>
                    <p>Mercury is the prince of intellect — witty, quick, and brilliantly sharp. Budh Puja is a transformative ritual that supercharges your communication skills, analytical intelligence, and business acumen, making you the sharpest and most articulate person in any room!</p>
                    <a href="#booking" className="sp-hero-cta">Book Your Puja</a>
                </div>
            </section>

            {/* ── What is Surya Puja ── */}
            <section className="sp-section sp-about">
                <div className="sp-container">
                    <div className="sp-label">Ancient Vedic Ritual</div>
                    <h2>What is Budh (Mercury) Puja?</h2>
                    <div className="sp-translation-wrapper">
                    <p>Budh Puja is an illuminating Vedic ritual dedicated to Budh Dev — the Planet Mercury — known as the prince and swift messenger of the celestial court. Mercury governs intellect, communication, education, mathematics, commerce, writing, logic, and razor-sharp analytical thinking.</p>
                                <p className="sp-hindi"><em>बुध पूजा एक प्रकाशमान वैदिक अनुष्ठान है जो बुध देव को समर्पित है — बुध ग्रह — जिन्हें खगोलीय दरबार के राजकुमार और तेज दूत के रूप में जाना जाता है। बुध बुद्धि, संचार, शिक्षा, गणित, वाणिज्य, लेखन, तर्क और विश्लेषणात्मक सोच को नियंत्रित करता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Budh Dev is depicted as a young, charming deity with a green complexion, seated on a lion, holding a sword and a shield — the divine embodiment of swift intelligence and sparkling wit. He is the patron deity of businessmen, writers, orators, scientists, astrologers, and students.</p>
                                <p className="sp-hindi"><em>बुध देव को हरे रंग के एक युवा, आकर्षक देवता के रूप में चित्रित किया जाता है, जो शेर पर बैठे हैं, तलवार और ढाल धारण करते हैं — तीव्र बुद्धि और चमकती चतुराई के दिव्य अवतार। वे व्यापारियों, लेखकों, वक्ताओं, वैज्ञानिकों और छात्रों के संरक्षक देवता हैं।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>This puja involves offering green items — green mung dal, green vegetables, green clothes, and emerald-colored flowers — along with chanting Mercury's powerful Vedic mantras. The ritual is most auspicious on Wednesdays (Budhvar).</p>
                                <p className="sp-hindi"><em>इस पूजा में हरी वस्तुएं — हरी मूंग दाल, हरी सब्जियां, हरे कपड़े और पन्ना रंग के फूल — चढ़ाना शामिल है। यह अनुष्ठान बुधवार को सबसे शुभ होता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>When Mercury is weak or afflicted in a horoscope, it causes learning disabilities, speech disorders, memory lapses, business failures, and severe communication difficulties. A debilitated Mercury can derail even the brightest minds.</p>
                                <p className="sp-hindi"><em>जब बुध जन्म कुंडली में कमजोर या पीड़ित होता है, तो यह सीखने में अक्षमता, भाषण विकार, स्मृति क्षति, व्यापार विफलताओं और संचार में गंभीर कठिनाइयों का कारण बनता है।</em></p>
                    </div>
                    <div className="sp-translation-wrapper">
                    <p>Budh Puja acts as a cosmic brain-booster — sharpening your mind, clarifying your speech, and unlocking doors of academic, professional, and financial success. This ritual ignites the spark of pure genius within you, transforming you into the brilliant, quick-witted, and endlessly articulate individual you were born to be!</p>
                                <p className="sp-hindi"><em>बुध पूजा एक ब्रह्मांडीय मस्तिष्क-बूस्टर के रूप में कार्य करती है — आपके मन को तेज करती है, आपके भाषण को स्पष्ट करती है, और शैक्षणिक, पेशेवर और वित्तीय सफलता के द्वार खोलती है!</em></p>
                    </div>
                </div>
            </section>

            {/* ── Why Perform ── */}
            <section className="sp-section sp-why">
                <div className="sp-container">
                    <div className="sp-label">Purpose & Significance</div>
                    <h2>Why Do People Perform Budh (Mercury) Puja?</h2>
                    <div className="sp-why-grid">
                        <div className="sp-why-card">
                            <h4>🗣️ Reason 1</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome speech disorders, stammering, and communication difficulties caused by a weak Mercury, and to become a naturally eloquent, persuasive, and powerfully expressive communicator in all areas of life.</p>
                                <p className="sp-hindi"><em>कमजोर बुध के कारण होने वाले भाषण विकारों, हकलाने और संचार कठिनाइयों को दूर करने के लिए, और जीवन के सभी क्षेत्रों में स्वाभाविक रूप से वाक्पटु, प्रेरक और शक्तिशाली रूप से अभिव्यंजक संचारक बनने के लिए।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🚀 Reason 2</h4>
                            <div className="sp-translation-wrapper">
                            <p>To sharpen intellectual abilities, enhance memory retention, and excel in academic studies, competitive examinations, and research-based careers, as Mercury governs all forms of knowledge and scholarly achievement.</p>
                                <p className="sp-hindi"><em>बौद्धिक क्षमताओं को तेज करने, स्मृति प्रतिधारण बढ़ाने और शैक्षणिक अध्ययन, प्रतिस्पर्धी परीक्षाओं और अनुसंधान-आधारित करियर में उत्कृष्टता प्राप्त करने के लिए, क्योंकि बुध ज्ञान के सभी रूपों को नियंत्रित करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>💰 Reason 3</h4>
                            <div className="sp-translation-wrapper">
                            <p>To attract extraordinary business success, financial prosperity, and sharp trading instincts, as Mercury is the planet of commerce, trade, accounting, and all mercantile and entrepreneurial activity.</p>
                                <p className="sp-hindi"><em>असाधारण व्यापार सफलता, वित्तीय समृद्धि और तीव्र व्यापारिक प्रवृत्तियों को आकर्षित करने के लिए, क्योंकि बुध वाणिज्य, व्यापार, लेखांकन और सभी उद्यमशीलता गतिविधि का ग्रह है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>📚 Reason 4</h4>
                            <div className="sp-translation-wrapper">
                            <p>To overcome learning disabilities, concentration issues, and educational setbacks in children, as a blessed Mercury dramatically improves the ability to learn, comprehend, and creatively apply knowledge across all subjects.</p>
                                <p className="sp-hindi"><em>बच्चों में सीखने की अक्षमताओं, एकाग्रता की समस्याओं और शैक्षणिक असफलताओं को दूर करने के लिए, क्योंकि एक आशीर्वाद प्राप्त बुध सभी विषयों में ज्ञान सीखने, समझने और लागू करने की क्षमता में नाटकीय रूप से सुधार करता है।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>🗣️ Reason 5</h4>
                            <div className="sp-translation-wrapper">
                            <p>To develop exceptional writing, journalism, and content creation skills, as Mercury rules all written communication and blesses devotees with the power to craft words that captivate, persuade, and inspire audiences.</p>
                                <p className="sp-hindi"><em>असाधारण लेखन, पत्रकारिता और सामग्री निर्माण कौशल विकसित करने के लिए, क्योंकि बुध सभी लिखित संचार को नियंत्रित करता है और भक्तों को ऐसे शब्द गढ़ने की शक्ति देता है जो दर्शकों को आकर्षित, प्रेरित और प्रेरित करते हैं।</em></p>
                            </div>
                        </div>
                        <div className="sp-why-card">
                            <h4>❤️‍🩹 Reason 6</h4>
                            <div className="sp-translation-wrapper">
                            <p>To heal skin diseases, nervous system disorders, and anxiety conditions associated with Mercury, restoring nervous energy balance, mental clarity, and radiant skin health that reflects inner luminosity.</p>
                                <p className="sp-hindi"><em>बुध से जुड़े त्वचा रोगों, तंत्रिका तंत्र विकारों और चिंता की स्थितियों को ठीक करने के लिए, तंत्रिका ऊर्जा संतुलन, मानसिक स्पष्टता और आंतरिक चमक को दर्शाने वाले दीप्तिमान त्वचा स्वास्थ्य को बहाल करना।</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sp-section sp-benefits">
                <div className="sp-container">
                    <div className="sp-label">Divine Blessings</div>
                    <h2>Benefits of Budh (Mercury) Puja</h2>
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
                            { num: 1, icon: '🌅', title: 'Step 1', sub: 'Wake up early on Wednesday (Budhvar) and take a purifying bath, wearing green or yellow clothes.' },
                            { num: 2, icon: '🛕', title: 'Step 2', sub: 'Set up a clean altar with an idol or image of Budh Dev on a bright green cloth.' },
                            { num: 3, icon: '🪔', title: 'Step 3', sub: 'Light a ghee lamp and sandalwood incense to create a sacred, intellectually charged atmosphere.' },
                            { num: 4, icon: '🌺', title: 'Step 4', sub: 'Offer green flowers, green mung dal, green fruits (banana, green grapes), and green-colored sweets to the deity.' },
                            { num: 5, icon: '✨', title: 'Step 5', sub: 'Place a copper or gold coin beside the idol; keep an emerald stone nearby for energization if available.' },
                            { num: 6, icon: '📿', title: 'Step 6', sub: 'Chant the Budh Beej Mantra — "Om Braam Breem Braum Sah Budhay Namah" — 108 times with a green glass rosary.' },
                            { num: 7, icon: '📖', title: 'Step 7', sub: 'Recite the Budh Stotram or Budh Kavach with full mental focus and sparkling intellectual clarity.' },
                            { num: 8, icon: '🔔', title: 'Step 8', sub: 'Perform aarti by circling a camphor flame seven times before Budh Dev with a sharp, focused mind.' },
                            { num: 9, icon: '🤲', title: 'Step 9', sub: 'Donate green vegetables, mung dal, or green clothes to the needy as an act of Budh-seva.' },
                            { num: 10, icon: '🙏', title: 'Step 10', sub: 'End by meditating for 10 minutes, visualizing emerald green light filling your mind with boundless wisdom.' }
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
