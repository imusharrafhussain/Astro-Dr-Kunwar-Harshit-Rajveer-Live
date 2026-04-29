import { useMemo } from 'react'
import toast from 'react-hot-toast'
import API from '../api/axios'
import useFormValidation from '../hooks/useFormValidation'
import '../App.css'
import './BookingPage.css'

const pujas = [
    {
        id: 1,
        title: "Satyanarayan Puja",
        description: "Bring peace, prosperity, and happiness to your home and family.",
        imageIcon: "🌺",
        duration: "2-3 Hours"
    },
    {
        id: 2,
        title: "Rudrabhishek Puja",
        description: "Invoke the blessings of Lord Shiva for health, wealth, and success.",
        imageIcon: "🔱",
        duration: "3-4 Hours"
    },
    {
        id: 3,
        title: "Navagraha Shanti Puja",
        description: "Pacify the nine planets and reduce negative astrological influences.",
        imageIcon: "🪐",
        duration: "4-5 Hours"
    },
    {
        id: 4,
        title: "Maha Mrityunjaya Jaap",
        description: "For long life, healing, and overcoming severe illnesses or fears.",
        imageIcon: "📿",
        duration: "5-7 Days"
    },
    {
        id: 5,
        title: "Kaal Sarp Dosh Nivaran",
        description: "Remedy for Kaal Sarp Dosh in your Kundli for a hurdle-free life.",
        imageIcon: "🐍",
        duration: "1 Day"
    },
    {
        id: 6,
        title: "Mangal Dosh Nivaran",
        description: "Alleviates issues in marriage and brings intense relationship harmony.",
        imageIcon: "🔥",
        duration: "1 Day"
    }
];

const timeSlots = [
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
]

const BookPujaPage = () => {
    const { values, errors, isSubmitting, setIsSubmitting, handleChange, validate, resetForm, setValues } = useFormValidation(
        { name: '', email: '', phone: '', service: '', preferredDate: '', preferredTime: '', message: '' },
        {
            name: { required: true, requiredMsg: 'Please enter your name' },
            email: { required: true, email: true },
            phone: { required: true, phone: true },
            service: { required: true, requiredMsg: 'Please select a puja' },
            preferredDate: { required: true, requiredMsg: 'Please select a date' },
            preferredTime: { required: true, requiredMsg: 'Please select a time' },
        }
    )

    const handleSelectPuja = (pujaTitle) => {
        setValues((prev) => ({ ...prev, service: pujaTitle }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        try {
            await API.post('/appointments', values)
            toast.success('Puja booking confirmed! We will contact you shortly.')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.error || 'Booking failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const minDate = useMemo(() => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
    }, [])

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Book Puja</h1>
                <p>Perform authentic Vedic rituals with experienced Pandits from the comfort of your home.</p>
            </div>

            <section className="container" style={{ margin: '3rem auto' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {pujas.map((puja) => (
                        <div key={puja.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.3s ease', cursor: 'pointer', border: values.service === puja.title ? '2px solid var(--gold-primary)' : '2px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{puja.imageIcon}</div>
                            <h3 style={{ color: 'var(--maroon-primary)' }}>{puja.title}</h3>
                            <p style={{ flexGrow: 1, fontSize: '0.95rem', color: '#444' }}>
                                {puja.description}
                            </p>
                            <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold', margin: '0.5rem 0' }}>
                                Duration: {puja.duration}
                            </div>
                            <button className="btn btn-primary" onClick={() => handleSelectPuja(puja.title)} style={{ marginTop: 'auto', width: '100%' }}>
                                {values.service === puja.title ? 'Selected' : 'Select Puja'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="container booking-container">
                    <form className="glass-card booking-form" onSubmit={handleSubmit}>
                        <h2>Book Your Puja</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input className="form-input" name="name" value={values.name} onChange={handleChange} placeholder="Enter your full name" />
                                {errors.name && <p className="form-error">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input className="form-input" name="email" type="email" value={values.email} onChange={handleChange} placeholder="your@email.com" />
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <input className="form-input" name="phone" value={values.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                                {errors.phone && <p className="form-error">{errors.phone}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Selected Puja *</label>
                                <select className="form-select" name="service" value={values.service} onChange={handleChange}>
                                    <option value="">Choose a puja...</option>
                                    {pujas.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
                                </select>
                                {errors.service && <p className="form-error">{errors.service}</p>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Preferred Date *</label>
                                <input className="form-input" name="preferredDate" type="date" value={values.preferredDate} onChange={handleChange} min={minDate} />
                                {errors.preferredDate && <p className="form-error">{errors.preferredDate}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Preferred Time *</label>
                                <select className="form-select" name="preferredTime" value={values.preferredTime} onChange={handleChange}>
                                    <option value="">Choose a time...</option>
                                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.preferredTime && <p className="form-error">{errors.preferredTime}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Message</label>
                            <textarea className="form-textarea" name="message" value={values.message} onChange={handleChange} placeholder="Share sankalp details, location, or any specific requirements..." />
                        </div>

                        <button type="submit" className="btn btn-primary booking-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Confirm Puja Booking'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default BookPujaPage
