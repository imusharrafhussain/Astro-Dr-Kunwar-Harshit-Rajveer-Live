import React from 'react';
import '../App.css';
import ComingSoonWrapper from '../components/ui/ComingSoonWrapper';

const PanchangPage = () => {
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <ComingSoonWrapper title="Daily Panchang">
            <div className="page-wrapper">
                <div className="page-header">
                    <h1>Daily Panchang</h1>
                    <p>auspicious times and cosmic alignments for {today}</p>
                </div>

                <section className="container">
                    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                        <div className="text-center" style={{ marginBottom: '2rem' }}>
                            <h2 className="text-gold">{today}</h2>
                            <p>Location: New Delhi, India</p>
                        </div>

                        <div className="grid-cols-2">
                            <div className="info-item">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Tithi</h3>
                                <p>Shukla Paksha Dashami</p>
                            </div>
                            <div className="info-item">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Nakshatra</h3>
                                <p>Rohini (upto 04:15 PM)</p>
                            </div>
                            <div className="info-item">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Yoga</h3>
                                <p>Indra</p>
                            </div>
                            <div className="info-item">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Karana</h3>
                                <p>Taitila</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-md)' }}>
                            <h3 className="text-center" style={{ marginBottom: '1rem' }}>Auspicious Timings (Shubh Muhurat)</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
                                <span>Abhijit Muhurat</span>
                                <span>11:58 AM - 12:42 PM</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
                                <span>Amrit Kalam</span>
                                <span>02:30 PM - 04:00 PM</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,0,0,0.05)', borderRadius: 'var(--radius-md)' }}>
                            <h3 className="text-center" style={{ marginBottom: '1rem', color: '#d32f2f' }}>Inauspicious Timings (Rahukaal)</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span>Rahu Kaal</span>
                                <span>04:30 PM - 06:00 PM</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span>Yamaganda</span>
                                <span>12:00 PM - 01:30 PM</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </ComingSoonWrapper>
    );
};

export default PanchangPage;
