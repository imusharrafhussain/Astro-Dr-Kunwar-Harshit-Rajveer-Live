import React from 'react';
import './HeroFloatingBadges.css';
import { 
    FiVideo, 
    FiHeart, 
    FiBriefcase, 
    FiUsers, 
    FiFileText, 
    FiActivity, 
    FiDollarSign, 
    FiBookOpen, 
    FiSmile, 
    FiShield, 
    FiTrendingUp 
} from 'react-icons/fi';

const badges = [
    { text: 'Get Live Consultation', icon: <FiVideo />, color1: '#8b0000', color2: '#4a0404' },
    { text: 'Love Report', icon: <FiHeart />, color1: '#a52a2a', color2: '#5c1616' },
    { text: 'Career', icon: <FiBriefcase />, color1: '#4b0082', color2: '#2a004f' },
    { text: 'Marriage', icon: <FiUsers />, color1: '#800080', color2: '#4a004a' },
    { text: 'Birth Report', icon: <FiFileText />, color1: '#d2691e', color2: '#8b4513' },
    { text: 'Health', icon: <FiActivity />, color1: '#2e8b57', color2: '#1a4d30' },
    { text: 'Finance', icon: <FiDollarSign />, color1: '#006400', color2: '#003300' },
    { text: 'Education', icon: <FiBookOpen />, color1: '#4682b4', color2: '#23415a' },
    { text: 'Pregnancy', icon: <FiSmile />, color1: '#db7093', color2: '#8a4057' },
    { text: 'Legal', icon: <FiShield />, color1: '#708090', color2: '#3d464d' },
    { text: 'Business', icon: <FiTrendingUp />, color1: '#b8860b', color2: '#6e5006' },
];

const HeroFloatingBadges = () => {
    return (
        <div className="hero-floating-badges-container">
            <div className="hero-floating-badges-track">
                {/* First set of badges */}
                <div className="hero-floating-badges-set">
                    {badges.map((badge, idx) => (
                        <div key={`badge-a-${idx}`} className="floating-badge-wrapper">
                            <div className="floating-badge">
                                <div className="floating-badge-bg" style={{
                                    background: `linear-gradient(135deg, ${badge.color1} 0%, ${badge.color2} 100%)`
                                }}></div>
                                <div className="floating-badge-content">
                                    <span className="badge-icon">{badge.icon}</span>
                                    <span className="badge-text">{badge.text}</span>
                                </div>
                                {/* Sparkle elements */}
                                <div className="badge-sparkle top-right">✨</div>
                                <div className="badge-sparkle bottom-left">✨</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Duplicate set for seamless vertical marquee */}
                <div className="hero-floating-badges-set" aria-hidden="true">
                    {badges.map((badge, idx) => (
                        <div key={`badge-b-${idx}`} className="floating-badge-wrapper">
                            <div className="floating-badge">
                                <div className="floating-badge-bg" style={{
                                    background: `linear-gradient(135deg, ${badge.color1} 0%, ${badge.color2} 100%)`
                                }}></div>
                                <div className="floating-badge-content">
                                    <span className="badge-icon">{badge.icon}</span>
                                    <span className="badge-text">{badge.text}</span>
                                </div>
                                <div className="badge-sparkle top-right">✨</div>
                                <div className="badge-sparkle bottom-left">✨</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroFloatingBadges;
