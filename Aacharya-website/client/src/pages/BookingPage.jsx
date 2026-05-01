import toast from 'react-hot-toast'
import useFormValidation from '../hooks/useFormValidation'
import API from '../api/axios'
import './BookingPage.css'

const serviceOptions = [
    'Vedic Birth Chart Analysis',
    'Relationship & Compatibility Reading',
    'Career & Finance Forecast',
    'Numerology Life Path Reading',
    'Business Name Numerology',
    'Vastu Home Consultation',
    'Vastu Office & Commercial',
    'Gemstone Recommendation',
    'Spiritual Healing Session',
    'Puja & Ritual Guidance',
    'Business Consultation',
    'Love Report',
    'Health Consultation',
    'Career Consultation',
    'Marriage Consultation',
    'Education Consultation',
    'Finance Consultation',
    'Pregnancy Consultation',
    'Legal Consultation'
]

export default function BookingPage() {
    const { values, errors, isSubmitting, setIsSubmitting, handleChange, validate, resetForm } = useFormValidation(
        { service: '' },
        {
            service: { required: true, requiredMsg: 'Please select a service' },
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        try {
            await API.post('/appointments', values)
            toast.success('Booking confirmed! We will contact you shortly.')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.error || 'Booking failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="booking-page page-wrapper">
            <div className="page-header">
                <h1>Book a <span className="gold-text">Consultation</span></h1>
                <p>Schedule your personalized session with our Vedic astrology experts.</p>
            </div>

            <section className="section">
                <div className="container booking-container">
                    <form className="glass-card booking-form" onSubmit={handleSubmit}>
                        <h2>Your Details</h2>

                        <div className="form-group">
                            <label className="form-label">Select Service *</label>
                            <select className="form-select" name="service" value={values.service} onChange={handleChange}>
                                <option value="">Choose a service...</option>
                                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.service && <p className="form-error">{errors.service}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary booking-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </form>

                    <div className="booking-info">
                        <div className="glass-card info-card">
                            <h3>📞 How It Works</h3>
                            <ol className="how-it-works">
                                <li><strong>Book</strong> — Fill the form and pick your slot</li>
                                <li><strong>Confirm</strong> — We confirm within 24 hours via email</li>
                                <li><strong>Connect</strong> — Join via phone or video call at your scheduled time</li>
                                <li><strong>Receive</strong> — Get your recorded session summary and remedies</li>
                            </ol>
                        </div>
                        <div className="glass-card info-card">
                            <h3>💡 Tips for Your Session</h3>
                            <ul className="tips-list">
                                <li>Have your exact birth date, time, and place ready</li>
                                <li>Write down 2-3 specific questions beforehand</li>
                                <li>Find a quiet space for the consultation</li>
                                <li>Keep a notebook for remedies and action items</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
