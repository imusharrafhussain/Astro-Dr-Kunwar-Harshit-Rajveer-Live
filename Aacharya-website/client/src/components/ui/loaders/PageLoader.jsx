import React from 'react';
import './PageLoader.css';

const PageLoader = () => {
  return (
    <div className="page-loader-container">
      <div className="loader-content">
        <div className="astrology-loader">
          <div className="inner-ring"></div>
          <div className="outer-ring"></div>
          <div className="center-sun"></div>
          <div className="zodiac-dots">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="zodiac-dot" style={{ '--i': i }}></div>
            ))}
          </div>
        </div>
        <h2 className="loader-text">Loading Cosmic Guidance...</h2>
      </div>
    </div>
  );
};

export default PageLoader;
