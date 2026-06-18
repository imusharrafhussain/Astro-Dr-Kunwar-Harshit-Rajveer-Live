import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCompass, FiUsers, FiHeart, FiFileText, FiHash } from 'react-icons/fi';
import './ComingSoonWrapper.css';

const ComingSoonWrapper = ({ children, title }) => {
    const [showLinks, setShowLinks] = useState(false);

    return (
        <div className="coming-soon-container">
            {/* The actual content which will be blurred */}
            <div className="blurred-content">
                {children}
            </div>

            {/* The Overlay */}
            <div className="coming-soon-overlay-v2">
                <motion.div 
                    className="coming-soon-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="card-glass-effect"></div>
                    <div className="coming-soon-icon">
                        <FiClock className="pulse-animation" />
                    </div>
                    <h2 className="coming-soon-title">Coming Soon</h2>
                    <p className="coming-soon-subtitle">
                        We are currently building the <strong>{title}</strong> module to provide you with the best spiritual experience.
                    </p>
                    
                    <div className="interactive-elements" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                        <motion.div 
                            className={`notify-badge ${showLinks ? 'active' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowLinks(!showLinks)}
                        >
                            <FiCompass style={{ fontSize: '1.25rem' }} />
                            <span>{showLinks ? 'Close Options' : 'Explore Other Pages'}</span>
                        </motion.div>

                        <AnimatePresence>
                            {showLinks && (
                                <motion.div 
                                    className="explore-links-grid"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden', width: '100%' }}
                                >
                                    <Link to="/services/kundli-matching" className="explore-link-item">
                                        <FiHeart className="explore-icon" />
                                        <span>Kundli Matching</span>
                                    </Link>
                                    <Link to="/numerology" className="explore-link-item">
                                        <FiHash className="explore-icon" />
                                        <span>Numerology</span>
                                    </Link>
                                    <Link to="/reports" className="explore-link-item">
                                        <FiFileText className="explore-icon" />
                                        <span>Astro Reports</span>
                                    </Link>
                                    <Link to="/about" className="explore-link-item">
                                        <FiUsers className="explore-icon" />
                                        <span>About Us</span>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-label">Development Progress</div>
                        <div className="progress-track">
                            <motion.div 
                                className="progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                        <div className="progress-percentage">75%</div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="floating-elements">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="floating-orb"
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 10, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                width: `${10 + i * 5}px`,
                                height: `${10 + i * 5}px`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComingSoonWrapper;
