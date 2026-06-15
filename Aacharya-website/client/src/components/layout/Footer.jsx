import { Link } from 'react-router-dom'
import { FiInstagram, FiYoutube, FiLinkedin, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* ── Column 1: About ── */}
                    <div className="footer-col footer-col--about">
                        <h3 className="footer-col-title">Astro Dr. Kunwar Harshit Rajveer</h3>
                        <p className="footer-about-text">
                            Preserving and promoting authentic Vedic wisdom with modern AI-powered insights.
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/astrobharatai" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
                            <a href="https://www.youtube.com/@AstroBharatAI" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
                            <a href="#" aria-label="X (formerly Twitter)"><FaXTwitter /></a>
                            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
                        </div>
                    </div>

                    {/* ── Column 2: Quick Links ── */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Quick Links</h3>
                        <ul className="footer-nav-list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* ── Column 3: Services ── */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Services</h3>
                        <ul className="footer-nav-list">
                            <li><Link to="/janam-kundli">Janam Kundali</Link></li>
                            <li><Link to="/kundli-matching">Kundli Matching</Link></li>
                            <li><Link to="/palmistry">Palmistry</Link></li>
                            <li><Link to="/vastu">Vastu Shastra</Link></li>
                            <li><Link to="/face-reading">Face Reading</Link></li>
                        </ul>
                    </div>

                    {/* ── Column 4: Contact ── */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Contact</h3>
                        <ul className="footer-contact-list">
                            <li>
                                <FiMapPin className="footer-contact-icon" />
                                <span>1/344, near Kathauta Chauraha Road, Vinamra Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
                            </li>
                            <li>
                                <FiMail className="footer-contact-icon" />
                                <a href="mailto:drkuwarharshitrajveer1@gmail.com">drkuwarharshitrajveer1@gmail.com</a>
                            </li>
                            <li>
                                <FiPhone className="footer-contact-icon" />
                                <a href="tel:+917068883996">+91 7068883996</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ── Bottom bar ── */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Astro Dr. Kunwar Harshit Rajveer. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
