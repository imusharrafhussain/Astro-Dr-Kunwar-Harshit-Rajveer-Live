import React, { useState } from 'react';
import '../App.css';
import ComingSoonModal from '../components/ui/ComingSoonModal';
import ComingSoonWrapper from '../components/ui/ComingSoonWrapper';

const MandirPage = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

    return (
        <ComingSoonWrapper title="Digital Mandir">
            <div className="page-wrapper">
                <div className="page-header">
                    <h1>Digital Mandir</h1>
                    <p>Perform daily rituals and darshan from anywhere</p>
                </div>

                <section className="container">
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕉️</div>
                            <h2>Live Darshan</h2>
                            <p>Watch live aarti from major temples across India.</p>
                            <button className="btn btn-primary" onClick={() => setShowComingSoon(true)}>Watch Now</button>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <h2 className="section-title">Todays Chants</h2>
                        <div className="glass-panel" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '1rem' }}>
                                "Om Bhur Bhuva Swaha, Tat Savitur Varenyam<br />
                                Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat"
                            </p>
                            <p className="text-gold">Gayatri Mantra - For Wisdom and Enlightenment</p>
                        </div>
                    </div>
                </section>

                <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
            </div>
        </ComingSoonWrapper>
    );
};

export default MandirPage;
