import { BookingDialog } from '../components/booking/BookingDialog'
import './BookingPage.css'

export default function BookingPage() {
    return (
        <div className="booking-page page-wrapper">
            <div className="page-header">
                <h1>Book a <span className="gold-text">Consultation</span></h1>
                <p>Schedule your personalized session with our Vedic astrology experts.</p>
            </div>

            <section className="section">
                <div className="container booking-container">
                    <div className="booking-form-inline-container">
                        <BookingDialog inline={true} open={true} serviceLabel="Book a Consultation" />
                    </div>

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
