import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import chatbotIdle from '../assets/chatbot_idle.webp';
import chatbotActive from '../assets/chatbot_active.webp';
import chatbotBg from '../assets/chatbot_bg.webp';

// Button area height (img 80px + label ~20px + gap ~10px + margin ~10px)
const BTN_AREA = 120;

const getPhoneHeight = () => {
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 640;
    
    // Calculate offsets based on responsive positions
    // Desktop: bottom (48) + button (120) + gap (16) + frame border (10)
    // Tablet: bottom (24) + button (120) + gap (16) + frame border (10)
    // Mobile: bottom (12) + button (100) + gap (8) + frame border (10)
    
    let offset = 48 + 120 + 16 + 10;
    let maxHeight = 520;
    
    if (isMobile) {
        offset = 12 + 100 + 8 + 10;
        maxHeight = 460;
    } else if (isTablet) {
        offset = 24 + 120 + 16 + 10;
        maxHeight = 480;
    }
    
    return Math.min(maxHeight, window.innerHeight - offset);
};

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [phoneHeight, setPhoneHeight] = useState(getPhoneHeight);

    useEffect(() => {
        const onResize = () => setPhoneHeight(getPhoneHeight());
        window.addEventListener('resize', onResize);
        // Initial call to ensure correct height on mount
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const toggleChat = () => setIsOpen(prev => !prev);

    return (
        <>
            {/* ── Responsive styles ── */}
            <style>{`
                .ai-chatbot-root {
                    position: fixed;
                    bottom: 48px;
                    right: 40px;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 1rem;
                }

                /* Phone frame shell */
                .ai-phone-frame {
                    position: relative;
                    margin-bottom: 10px;
                    animation: chatSlideUp 0.3s ease-out;
                    width: 290px;
                    background: #111;
                    border-radius: 32px;
                    border: 5px solid #111;
                    box-shadow: none;
                    padding: 0;
                    overflow: hidden;
                }

                /* Phone screen area */
                .ai-phone-screen {
                    position: relative;
                    background: #D7D7D7 url(${chatbotBg}) center / cover no-repeat;
                    /* height set via JS inline style for dynamic accuracy */
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* Chat scroll area — flex fills remaining height */
                .ai-chat-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding-top: 42px;
                    overflow: hidden;
                    min-height: 0;
                }

                /* Floating button */
                .ai-chatbot-btn {
                    width: 90px;
                    min-height: 90px;
                    border-radius: 0;
                    border: none;
                    background: transparent;
                    padding: 0;
                    cursor: pointer;
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1001;
                    gap: 5px;
                }
                .ai-chatbot-btn img {
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                    transition: opacity 0.2s ease-in-out;
                    display: block;
                }

                /* ── Tablet (641px – 1024px) ── */
                @media (max-width: 1024px) and (min-width: 641px) {
                    .ai-chatbot-root {
                        bottom: 24px;
                        right: 16px;
                    }
                    .ai-phone-frame {
                        width: 265px;
                    }
                    .ai-phone-screen {
                        height: min(480px, calc(100dvh - 110px));
                    }
                }

                /* ── Mobile (≤640px) — stay bottom-right, just shrink frame ── */
                @media (max-width: 640px) {
                    .ai-chatbot-root {
                        bottom: 12px;
                        right: 12px;
                    }
                    .ai-phone-frame {
                        width: 260px;
                        border-radius: 26px;
                    }
                    .ai-phone-screen {
                        height: min(460px, calc(100dvh - 100px));
                    }
                    .ai-chatbot-btn {
                        width: 72px;
                        min-height: 72px;
                    }
                    .ai-chatbot-btn img {
                        width: 62px;
                        height: 62px;
                    }
                }

                /* ── Very small phones (≤380px) ── */
                @media (max-width: 380px) {
                    .ai-phone-frame {
                        width: 230px;
                        border-radius: 22px;
                    }
                    .ai-phone-screen {
                        height: min(420px, calc(100dvh - 100px));
                    }
                }

                /* From Uiverse.io by satyamchaudharydev — compacted under launcher */
                .loading {
                    --speed-of-animation: 0.9s;
                    --gap: 6px;
                    --first-color: #4c86f9;
                    --second-color: #49a84c;
                    --third-color: #f6bb02;
                    --fourth-color: #f6bb02;
                    --fifth-color: #2196f3;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    gap: 4px;
                    height: 14px;
                    margin-top: 4px;
                }

                .loading span {
                    width: 3px;
                    height: 10px;
                    background: var(--first-color);
                    animation: scale var(--speed-of-animation) ease-in-out infinite;
                    border-radius: 999px;
                }

                .loading span:nth-child(2) {
                    background: var(--second-color);
                    animation-delay: -0.8s;
                }

                .loading span:nth-child(3) {
                    background: var(--third-color);
                    animation-delay: -0.7s;
                }

                .loading span:nth-child(4) {
                    background: var(--fourth-color);
                    animation-delay: -0.6s;
                }

                .loading span:nth-child(5) {
                    background: var(--fifth-color);
                    animation-delay: -0.5s;
                }

                @keyframes scale {
                    0%, 40%, 100% {
                        transform: scaleY(0.2);
                    }

                    20% {
                        transform: scaleY(1);
                    }
                }

                @keyframes chatSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="ai-chatbot-root">

                {/* ── Phone Frame ── */}
                {isOpen && (
                    <div className="ai-phone-frame">

                        {/* Side buttons */}
                        <span style={{
                            position: 'absolute', right: '-9px', top: '80px',
                            width: '5px', height: '32px',
                            background: '#333', borderRadius: '3px', zIndex: 5,
                        }} />
                        <span style={{
                            position: 'absolute', left: '-9px', top: '90px',
                            width: '5px', height: '22px',
                            background: '#333', borderRadius: '3px', zIndex: 5,
                        }} />
                        <span style={{
                            position: 'absolute', left: '-9px', top: '124px',
                            width: '5px', height: '34px',
                            background: '#333', borderRadius: '3px', zIndex: 5,
                        }} />

                        {/* Screen */}
                        <div className="ai-phone-screen" style={{ height: `${phoneHeight}px` }}>

                            {/* Dynamic Island overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '8px', left: 0, right: 0,
                                zIndex: 20,
                                pointerEvents: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <div style={{
                                    background: '#000',
                                    width: '90px', height: '26px',
                                    borderRadius: '999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '7px',
                                    padding: '0 12px',
                                    boxShadow: '0 1px 8px rgba(0,0,0,0.55)',
                                }}>
                                    <div style={{
                                        width: '7px', height: '7px',
                                        borderRadius: '50%',
                                        background: '#1a1236',
                                        border: '1.5px solid #2a2050',
                                        boxShadow: 'inset 0 0 3px rgba(80,60,200,0.4)',
                                    }} />
                                    <div style={{
                                        width: '9px', height: '9px',
                                        borderRadius: '50%',
                                        background: '#0d0d14',
                                        border: '2px solid #1a1a2e',
                                        boxShadow: '0 0 0 1px #333, inset 0 0 4px rgba(60,80,200,0.5)',
                                    }} />
                                </div>
                            </div>

                            {/* Chat area */}
                            <div className="ai-chat-content">
                                <ChatInterface isWidget={true} onClose={toggleChat} />
                            </div>

                        </div>
                    </div>
                )}

                {/* ── Floating Button ── */}
                <button
                    className="ai-chatbot-btn"
                    onClick={toggleChat}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        filter: isHovered
                            ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.4))'
                            : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
                        transform: isOpen
                            ? 'scale(0.9)'
                            : isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <img
                        src={(isOpen || isHovered) ? chatbotActive : chatbotIdle}
                        alt="Chat with AI Baba"
                        draggable={false}
                    />
                    <div className="loading" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

            </div>
        </>
    );
};

export default FloatingChatbot;
