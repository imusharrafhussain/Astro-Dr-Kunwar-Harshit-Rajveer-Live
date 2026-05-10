import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FlipCardWidget.css';

const flipContents = [
    {
        title: "Daily Horoscope",
        desc: "Check what the stars say about your day.",
        tip: "Lucky Color: Gold",
        link: "/horoscope",
        icon: "✨",
        bg: "#f2c94c",
        variant: "ring"
    },
    {
        title: "Live Consultation",
        desc: "Talk to Dr. Kunwar Harshit Rajveer now.",
        tip: "Direct Guidance",
        link: "/book",
        icon: "🔮",
        bg: "#e74c3c",
        variant: "pulse"
    },
    {
        title: "Kundli Matching",
        desc: "Find your perfect match with Vedic astrology.",
        tip: "36 Guna Test",
        link: "/services/kundli-matching",
        icon: "💖",
        bg: "#3498db",
        variant: "orbit"
    },
    {
        title: "Face Reading",
        desc: "Unlock secrets written on your face.",
        tip: "Samudrik Shastra",
        link: "/services/face-reading",
        icon: "🎭",
        bg: "#9b59b6",
        variant: "grid"
    },
    {
        title: "Career Path",
        desc: "Find the right profession for your planets.",
        tip: "10th House Analysis",
        link: "/services/career",
        icon: "💼",
        bg: "#27ae60",
        variant: "ring"
    },
    {
        title: "Vastu Shastra",
        desc: "Balance the energy of your living space.",
        tip: "North-East Flow",
        link: "/services/vastu-consultation",
        icon: "🔱",
        bg: "#e67e22",
        variant: "pulse"
    },
    {
        title: "Numerology",
        desc: "Your birth date holds your life's code.",
        tip: "Destiny Number",
        link: "/services/numerology",
        icon: "🔢",
        bg: "#f1c40f",
        variant: "orbit"
    },
    {
        title: "Gemstones",
        desc: "Find the perfect stone for your planets.",
        tip: "Energized Stones",
        link: "/services/gemstone-consultation",
        icon: "💍",
        bg: "#c0392b",
        variant: "grid"
    },
    {
        title: "Marriage Timing",
        desc: "When will you meet your soulmate?",
        tip: "D-9 Chart Secrets",
        link: "/services/marriage",
        icon: "🔔",
        bg: "#fd79a8",
        variant: "ring"
    },
    {
        title: "Financial Growth",
        desc: "Unlock the Lakshmi Yoga in your chart.",
        tip: "Wealth Remedies",
        link: "/services/finance",
        icon: "💰",
        bg: "#00b894",
        variant: "pulse"
    },
    {
        title: "Foreign Travel",
        desc: "Are your stars calling you overseas?",
        tip: "Visa & PR Success",
        link: "/services/travel",
        icon: "✈️",
        bg: "#0984e3",
        variant: "orbit"
    },
    {
        title: "Health Remedies",
        desc: "Spiritual healing for chronic issues.",
        tip: "Vedic Lifestyle",
        link: "/services/health",
        icon: "🌿",
        bg: "#6c5ce7",
        variant: "grid"
    }
];

const FlipCardWidget = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % flipContents.length);
        }, 4000); // Flip every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flip-card-widget">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="flip-card-inner"
                    style={{ '--card-accent': flipContents[index].bg }}
                >
                    <div className={`card-astrology-bg bg-variant-${flipContents[index].variant}`}>
                        <div className="zodiac-ring"></div>
                        <div className="twinkle-stars"></div>
                        <div className="cosmic-dust"></div>
                    </div>
                    <Link to={flipContents[index].link} className="flip-card-content">
                        <div className="flip-card-icon">{flipContents[index].icon}</div>
                        <div className="flip-card-text">
                            <h4>{flipContents[index].title}</h4>
                            <p>{flipContents[index].desc}</p>
                            {flipContents[index].tip && <span className="flip-card-tip">{flipContents[index].tip}</span>}
                        </div>
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FlipCardWidget;
