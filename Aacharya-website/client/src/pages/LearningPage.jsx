import React, { useState } from 'react';
import '../App.css';
import vedicImg from '../assets/vedic_astrology_course.webp';
import nakshatraImg from '../assets/nakshatras_course.webp';
import tarotImg from '../assets/tarot_course.webp';
import palmistryImg from '../assets/palmistry_course.webp';
import vastuImg from '../assets/vastu_course.webp';
import numerologyImg from '../assets/numerology_course.webp';
import ComingSoonModal from '../components/ui/ComingSoonModal';

const LearningPage = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

    const courses = [
        { id: 1, title: "Introduction to Vedic Astrology", level: "Beginner", lessons: 12, students: 1540, image: vedicImg },
        { id: 2, title: "Mastering the Nakshatras", level: "Intermediate", lessons: 8, students: 850, image: nakshatraImg },
        { id: 3, title: "Tarot Card Reading Fundamentals", level: "Beginner", lessons: 10, students: 1200, image: tarotImg },
        { id: 4, title: "Palmistry: The Art of Hand Reading", level: "All Levels", lessons: 15, students: 980, image: palmistryImg },
        { id: 5, title: "Advanced Vastu Shastra", level: "Advanced", lessons: 20, students: 450, image: vastuImg },
        { id: 6, title: "Numerology for Success", level: "Beginner", lessons: 6, students: 2100, image: numerologyImg }
    ];

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Digital Learning</h1>
                <p>Expand your cosmic knowledge with our expert-led courses</p>
            </div>

            <section className="container">
                <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {courses.map(course => (
                        <div key={course.id} className="glass-panel" style={{ overflow: 'hidden' }}>
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <span style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-dark)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{course.level}</span>
                                <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '1.25rem' }}>{course.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    <span>{course.lessons} Lessons</span>
                                    <span>{course.students} Students</span>
                                </div>
                                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowComingSoon(true)}>Start Learning</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </div>
    );
};

export default LearningPage;
