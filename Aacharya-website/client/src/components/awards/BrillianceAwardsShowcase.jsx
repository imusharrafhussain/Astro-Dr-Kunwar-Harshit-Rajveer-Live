import React from 'react';
import './BrillianceAwardsShowcase.css';

// Import images
import awardMainImg from '../../assets/award_real_daisy.webp';
import awardSoloImg from '../../assets/award_real_solo.webp';
import awardPosterImg from '../../assets/award_real_poster.webp';

const BrillianceAwardsShowcase = () => {
    return (
        <section className="brilliance-showcase">
            <div className="brilliance-showcase__particles"></div>
            
            <div className="brilliance-showcase__container">
                {/* Header Area */}
                <header className="brilliance-showcase__header">
                    <h2 className="brilliance-showcase__title">
                        Honored at International Brilliance Awards Summit 2024
                    </h2>
                    <p className="brilliance-showcase__subtitle">
                        Recognized alongside <strong>global leaders</strong>, celebrities, and influential personalities for <strong>exceptional</strong> contributions.
                    </p>
                </header>

                <div className="brilliance-showcase__frame">
                    {/* Uniform Grid Layout: single row cards */}
                    <div className="brilliance-showcase__grid">
                        <article className="brilliance-card">
                            <div className="brilliance-card__media">
                                <img src={awardMainImg} alt="With Daisy Shah at International Brilliance Awards" className="brilliance-card__img" />
                            </div>
                            <div className="brilliance-card__content">
                                <span className="brilliance-card__meta">Celebrity Guest</span>
                                <h3 className="brilliance-card__title">With Daisy Shah</h3>
                                <span className="brilliance-card__highlight">Best Astro Coach &amp; Vedic Astrologer Award</span>
                            </div>
                        </article>

                        <article className="brilliance-card">
                            <div className="brilliance-card__media">
                                <img src={awardSoloImg} alt="Award portrait with certificate and trophy" className="brilliance-card__img" />
                            </div>
                            <div className="brilliance-card__content">
                                <span className="brilliance-card__meta">Excellence in Spiritual Leadership</span>
                                <h3 className="brilliance-card__title">Award Portrait</h3>
                                <span className="brilliance-card__highlight">International Brilliance Awards</span>
                            </div>
                        </article>

                        <article className="brilliance-card">
                            <div className="brilliance-card__media">
                                <img src={awardPosterImg} alt="International Brilliance Awards invitation poster" className="brilliance-card__img" />
                            </div>
                            <div className="brilliance-card__content">
                                <span className="brilliance-card__meta">Event Invitation</span>
                                <h3 className="brilliance-card__title">IBA 2024</h3>
                                <span className="brilliance-card__highlight">Delhi, India</span>
                            </div>
                        </article>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BrillianceAwardsShowcase;
