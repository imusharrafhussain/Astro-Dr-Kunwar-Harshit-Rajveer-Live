import React, { useState } from 'react';
import '../App.css';
import ComingSoonModal from '../components/ui/ComingSoonModal';

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

const BookPujaPage = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

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
                        <div key={puja.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{puja.imageIcon}</div>
                            <h3 style={{ color: 'var(--maroon-primary)' }}>{puja.title}</h3>
                            <p style={{ flexGrow: 1, fontSize: '0.95rem', color: '#444' }}>
                                {puja.description}
                            </p>
                            <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold', margin: '0.5rem 0' }}>
                                Duration: {puja.duration}
                            </div>
                            <button className="btn btn-primary" onClick={() => setShowComingSoon(true)} style={{ marginTop: 'auto', width: '100%' }}>
                                Book Pandit
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </div>
    );
};

export default BookPujaPage;
