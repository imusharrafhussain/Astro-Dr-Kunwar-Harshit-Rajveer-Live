import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiX, FiRefreshCw } from 'react-icons/fi';
import '../App.css';
import chatbotBg from '../assets/chatbot_bg.webp';

const ChatInterface = ({ isWidget = false, onClose }) => {
    const navigate = useNavigate();
    const initialWelcomeText = 'Namaste! I am AI Baba. How can I guide you today?';
    const initialContext = { topic: 'general', mood: 'neutral' };
    const brownGradient = 'linear-gradient(135deg, #8B5E3C 0%, #5D3A1A 100%)';

    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: initialWelcomeText }
    ]);
    // ...
    {
        isWidget && (
            <div style={{
                padding: '1rem',
                background: 'var(--primary-maroon)',
                color: 'var(--primary-cream)',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontWeight: 'bold' }}>AI Baba</span>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    <FiX size={20} />
                </button>
            </div>
        )
    }
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [context, setContext] = useState(initialContext);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        
        const userInput = input;
        setInput('');
        setIsTyping(true);

        try {
            // Prepare history for API (excluding the current user message to avoid duplicate if needed, 
            // but we want the API to see the full history. We'll send what we have so far)
            const history = messages.map(msg => ({
                sender: msg.sender,
                text: msg.text
            }));

            // Determine API URL based on environment
            let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            apiUrl = apiUrl.replace(/\/$/, '');
            if (!apiUrl.endsWith('/api')) {
                apiUrl += '/api';
            }
            
            const response = await fetch(`${apiUrl}/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userInput,
                    history: history
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch response');
            }

            let replyText = data.reply;
            const hasRedirectAction = replyText.includes('[ACTION:REDIRECT_CONTACT]');
            
            // Clean the text if it contains the action tag
            if (hasRedirectAction) {
                replyText = replyText.replace('[ACTION:REDIRECT_CONTACT]', '').trim();
            }

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'ai', text: replyText }
            ]);

            // If redirect action detected, wait 3 seconds then redirect
            if (hasRedirectAction) {
                setTimeout(() => {
                    if (onClose) onClose(); // Close widget if applicable
                    navigate('/contact');
                }, 3000);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'ai', text: 'I am sorry, the cosmic connection is currently weak. Please try again later.' }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const startNewConversation = () => {
        setMessages([{ id: Date.now(), sender: 'ai', text: initialWelcomeText }]);
        setInput('');
        setIsTyping(false);
        setContext(initialContext);
    };

    return (
        <div className={`chat-interface ${isWidget ? 'widget-mode' : 'full-mode'}`} style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: isWidget ? '#D7D7D7' : 'transparent',
            backgroundImage: isWidget ? `url(${chatbotBg})` : 'none',
            backgroundSize: isWidget ? 'cover' : 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {isWidget && (
                <div style={{
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {/* Title with background only as wide as the text */}
                    <span style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #5D1916 0%, #8B2422 100%)',
                        color: '#F5E6C8',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(93,25,22,0.35)',
                    }}>AI Harshit</span>

                    {/* New conversation (aligned to the right) */}
                    <button
                        onClick={startNewConversation}
                        type="button"
                        style={{
                            background: brownGradient,
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            borderRadius: '999px',
                            padding: '6px 12px',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 3px 10px rgba(93,58,26,0.35)',
                        }}
                        aria-label="Start new conversation"
                    >
                        <FiRefreshCw size={16} />
                        <span style={{ fontSize: '0.9rem' }}>New</span>
                    </button>
                </div>
            )}

            <div className="chat-window" style={{
                flex: 1,
                minHeight: 0,          /* critical: lets flex child shrink below content size */
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                background: isWidget ? 'transparent' : '#D7D7D7'
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        /* AI: warm ivory cream | User: deep maroon */
                        background: msg.sender === 'user'
                            ? 'linear-gradient(135deg, #5D1916 0%, #8B2422 100%)'
                            : '#FFF8F0',
                        color: msg.sender === 'user' ? '#F5E6C8' : '#3a1a1a',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        borderBottomRightRadius: msg.sender === 'user' ? '2px' : '1rem',
                        borderBottomLeftRadius: msg.sender === 'ai' ? '2px' : '1rem',
                        fontSize: '0.88rem',
                        lineHeight: '1.5',
                        boxShadow: msg.sender === 'user'
                            ? '0 2px 8px rgba(93,25,22,0.35)'
                            : '0 1px 4px rgba(0,0,0,0.12)',
                        border: msg.sender === 'ai' ? '1px solid rgba(212,175,55,0.25)' : 'none',
                    }}>
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div style={{
                        alignSelf: 'flex-start',
                        background: '#FFF8F0',
                        border: '1px solid rgba(212,175,55,0.25)',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '1rem',
                        borderBottomLeftRadius: '2px',
                        fontSize: '0.8rem',
                        color: '#8B5E3C',
                        fontStyle: 'italic',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}>
                        Consulting stars...
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} style={{
                padding: '1rem',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                gap: '0.5rem',
                background: 'transparent',
                borderBottomLeftRadius: isWidget ? '12px' : '0',
                borderBottomRightRadius: isWidget ? '12px' : '0'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask guidance..."
                    style={{
                        flex: 1,
                        padding: '0.8rem',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
                <button type="submit" style={{
                    borderRadius: '50%',
                    width: '46px',
                    height: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    background: brownGradient,
                    border: 'none',
                    boxShadow: '0 3px 10px rgba(93,58,26,0.45)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    color: '#fff',
                    flexShrink: 0,
                }}>
                    <FiSend size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
