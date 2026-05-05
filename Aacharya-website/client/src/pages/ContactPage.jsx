import { FiMail, FiSend, FiMapPin, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../api/axios'
import useFormValidation from '../hooks/useFormValidation'
import { notifyAdmin } from '../utils/notifyAdmin'
import './ContactPage.css'

export default function ContactPage() {
    const {
        values,
        errors,
        isSubmitting,
        setIsSubmitting,
        handleChange,
        validate,
        resetForm,
    } = useFormValidation(
        { name: '', email: '', subject: '', message: '' },
        {
            name: { required: true, requiredMsg: 'Please enter your name' },
            email: { required: true, email: true },
            subject: { required: true, minLength: 3, requiredMsg: 'Please enter a subject' },
            message: { required: true, minLength: 10, requiredMsg: 'Please enter your message' },
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        try {
            await API.post('/contact', values)
            toast.success('Message sent! We will get back to you soon.')
            // Notify admin via Web3Forms (browser-side, independent of backend SMTP)
            notifyAdmin({
                subject: `New Contact Message: ${values.subject}`,
                fields: {
                    Name: values.name,
                    Email: values.email,
                    Subject: values.subject,
                    Message: values.message,
                },
            })
            resetForm()
        } catch (err) {
            const errorMessage =
                err?.response?.data?.error ||
                err?.response?.data?.errors?.[0]?.message ||
                'Failed to send message. Please try again.'
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="contact-page page-wrapper">
            <div className="container">
                <div className="contact-header text-center fade-in-up">
                    <h1 className="section-title">Get in Touch</h1>
                    <p className="section-subtitle">
                        Have questions about our services or your reading? We're here to help.
                        <br />We typically respond within 24 hours.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info glass-panel fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3>Contact Information</h3>
                        <p className="text-muted">Reach out to us directly or fill out the form.</p>

                        <div className="info-item">
                            <div className="info-icon"><FiMail /></div>
                            <div>
                                <h4>Email Us</h4>
                                <a href="mailto:hello@astrobharat.ai">hello@astrobharat.ai</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon"><FiPhone /></div>
                            <div>
                                <h4>Call Us</h4>
                                <a href="tel:+919876543210">+91 98765 43210</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon"><FiMapPin /></div>
                            <div>
                                <h4>Location</h4>
                                <p>New Delhi, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-container glass-panel fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="form-error">{errors.name}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                    placeholder="What is your query about?"
                                />
                                {errors.subject && <p className="form-error">{errors.subject}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">How can we help?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your query..."
                                    rows="5"
                                ></textarea>
                                {errors.message && <p className="form-error">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary width-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : <><FiSend /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
