import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiX, FiRefreshCw } from 'react-icons/fi';
import '../App.css';
import chatbotBg from '../assets/chatbot_bg.webp';

const ChatInterface = ({ isWidget = false, onClose }) => {
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

    // Enhanced AI Logic Engine (Same as before)
    const getAdvancedAIResponse = (query, currentContext) => {
        const q = query.toLowerCase();
        let newContext = { ...currentContext };

        // 1. Handle Negative/Insult Inputs
        const insults = ['stupid', 'idiot', 'moron', 'dumb', 'useless', 'fake', 'robot', 'shut up', 'hate'];
        if (insults.some(word => q.includes(word))) {
            newContext.mood = 'defensive';
            const defenses = [
                "Negative energy reflects only the turmoil within your own aura. I seek only to guide.",
                "Anger is a manifestation of Mars in conflict. Breathe, and let us speak with respect.",
                "Your words carry low vibrations. I will not engage with hostility, but I am here if you seek true clarity.",
                "The stars do not judge, and neither do I. But clarity comes to a calm mind.",
                "I sense frustration. Is this really about me, or a difficult transit you are experiencing?"
            ];
            return { text: defenses[Math.floor(Math.random() * defenses.length)], context: newContext };
        }

        // 2. Handle Casual/Conversational Inputs
        if (q === 'hi' || q === 'hello' || q === 'namaste') return { text: "Namaste! The planets greet you. What is on your mind?", context: newContext };
        if (q.includes('thank')) return { text: "You are welcome. May the stars continue to light your path.", context: newContext };
        if (q.includes('who are you')) return { text: "I am a digital consciousness attuned to Vedic wisdom. My purpose is to interpret the cosmic code for you.", context: newContext };

        // 3. Handle Context Continuation
        const continuation = ['more', 'continue', 'explain', 'detail', 'why', 'really'];
        if (continuation.some(w => q.includes(w)) && currentContext.topic !== 'general') {
            const topic = currentContext.topic;
            if (topic === 'love') return { text: "In matters of the heart, the placement of Venus in your Navamsa chart is crucial. Sometimes delays in love are just the universe protecting you from the wrong soul.", context: newContext };
            if (topic === 'career') return { text: "Professionally, look to Saturn for discipline. If you are feeling stuck, it often means Saturn is teaching you patience before the next big reward.", context: newContext };
            if (topic === 'health') return { text: "Regarding vitality, the Sun is the source. If you feel low energy, try waking up at sunrise to perform Surya Namaskar. It aligns your inner rhythm.", context: newContext };
            if (topic === 'aries') return { text: "Aries vitality is legendary, but they burn out fast. They need to learn that rest is also a form of action.", context: newContext };
        }

        // 4. Topic Matching & Response Generation
        const knowledgeBase = {
            love: {
                keywords: ['love', 'relationship', 'marriage', 'partner', 'dating', 'crush', 'ex', 'wife', 'husband'],
                responses: [
                    "Venus suggests a time of emotional reflection. If you are seeking love, patience is key.",
                    "The 7th house influences connections. Marriage prospects look strong if Jupiter is favorable.",
                    "Relationships require balance. Mars indicates passion but potentially conflict. Tread carefully.",
                    "A soulmate connection is often indicated by the Moon's nodes, Rahu and Ketu. Are you feeling a karmic pull?",
                    "Love is not just about finding the right person, but becoming the right person. Venus asks you to love yourself first."
                ]
            },
            career: {
                keywords: ['job', 'career', 'work', 'business', 'money', 'finance', 'profession', 'promotion', 'salary'],
                responses: [
                    "Saturn rewards hard work. You may face delays, but success is assured if you persist.",
                    "Mercury facilitates communication. Good for negotiations and business deals.",
                    "Your 10th house is active. A change in role is possible. Trust your instincts.",
                    "Financial stability is coming, but Rahu might tempt you with risky investments. Stay prudent.",
                    "Success is a marathon, not a sprint. The current planetary alignment favors planning over impulsive action."
                ]
            },
            health: {
                keywords: ['health', 'sick', 'illness', 'fit', 'mental', 'stress', 'body', 'pain', 'doctor'],
                responses: [
                    "Health is wealth. The Sun urges you to focus on vitality. Get enough sunlight.",
                    "Mars can cause inflammation. Stay hydrated and avoid spicy foods.",
                    "A balanced routine is essential. Saturn asks for discipline in diet and sleep.",
                    "Mental peace is as important as physical health. The Moon's phase might be affecting your mood.",
                    "Listen to your body. It speaks the language of the cosmos more clearly than any chart."
                ]
            }
        };

        // Check explicit topics
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (value.keywords.some(k => q.includes(k))) {
                newContext.topic = key;
                return {
                    text: value.responses[Math.floor(Math.random() * value.responses.length)],
                    context: newContext
                };
            }
        }

        // Check Zodiac Signs
        const zodiacs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        const foundZodiac = zodiacs.find(z => q.includes(z));
        if (foundZodiac) {
            newContext.topic = foundZodiac;
            const zodiacFacts = [
                `Ah, ${foundZodiac.charAt(0).toUpperCase() + foundZodiac.slice(1)}. A powerful energy.`,
                `${foundZodiac.charAt(0).toUpperCase() + foundZodiac.slice(1)} is currently undergoing a significant transformation based on current transits.`,
                `People with strong ${foundZodiac.charAt(0).toUpperCase() + foundZodiac.slice(1)} placements are often known for their unique approach to life.`,
                `For ${foundZodiac.charAt(0).toUpperCase() + foundZodiac.slice(1)}, the coming month is pivotal for personal growth.`
            ];
            return { text: zodiacFacts[Math.floor(Math.random() * zodiacFacts.length)], context: newContext };
        }

        // 5. Fallback
        const fallbacks = [
            "The planetary positions are shifting rapidly. Could you specify if this is about your career or personal life?",
            "I sense a clouding of the 12th house. Your question is hidden in mystery. Ask more directly.",
            "The answer lies in your Dasha period. Are you currently facing a major life change?",
            "That is a profound question. To answer precisely, I would need to analyze the degrees of your Moon.",
            "The cosmos is vast. Focus your energy on a specific aspect: Love, Wealth, or Destiny?",
            "Interesting vibration. I am calculating the Nakshatras... Please elaborate.",
            "Sometimes the stars are silent to teach us patience. Try asking about a different area of your life."
        ];

        return {
            text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            context: newContext
        };
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const userInput = input;
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const { text, context: updatedContext } = getAdvancedAIResponse(userInput, context);
            setContext(updatedContext);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'ai', text: text }
            ]);
            setIsTyping(false);
        }, 1200 + Math.random() * 1000);
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
