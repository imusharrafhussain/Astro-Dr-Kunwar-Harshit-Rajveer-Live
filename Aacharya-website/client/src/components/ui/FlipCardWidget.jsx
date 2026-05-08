import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FlipCardWidget.css';

const flipContents = [
    {
        title: "Daily Horoscope",
        desc: "Check what the stars say about your day.",
        link: "/horoscope",
        icon: "🌟",
        bg: "#FFF3E0"
    },
    {
        title: "Live Consultation",
        desc: "Talk to Dr. Kunwar Harshit Rajveer now.",
        link: "/book",
        icon: "📞",
        bg: "#FFEBEE"
    },
    {
        title: "Kundli Matching",
        desc: "Find your perfect match with Vedic astrology.",
        link: "/services/kundli-matching",
        icon: "💑",
        bg: "#E0F7FA"
    },
    {
        title: "Face Reading",
        desc: "Unlock secrets written on your face.",
        link: "/services/face-reading",
        icon: "👁️",
        bg: "#E8EAF6"
    }
];

const FlipCardWidget = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % flipContents.length);
        }, 5000); // Flip every 5 seconds

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
                    style={{ background: flipContents[index].bg }}
                >
                    <Link to={flipContents[index].link} className="flip-card-content">
                        <div className="flip-card-icon">{flipContents[index].icon}</div>
                        <div className="flip-card-text">
                            <h4>{flipContents[index].title}</h4>
                            <p>{flipContents[index].desc}</p>
                        </div>
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FlipCardWidget;
