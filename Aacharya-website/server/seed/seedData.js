require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
    {
        title: 'Vedic Birth Chart Analysis',
        slug: 'vedic-birth-chart-analysis',
        description: 'Gain deep insights into your personality, strengths, and life path through a comprehensive Vedic birth chart (Kundli) analysis. Our experts interpret planetary positions, houses, and dashas to reveal patterns that shape your destiny. This detailed reading covers career tendencies, relationship dynamics, health indicators, and spiritual growth potential based on ancient Jyotish principles.',
        shortDesc: 'Comprehensive Kundli reading revealing your personality, destiny, and life patterns through Vedic astrology.',
        icon: '🔮',
        category: 'Astrology',
        price: '₹2,100',
        duration: '60 minutes',
        featured: true,
        benefits: ['Detailed planetary analysis', 'Dasha predictions', 'Remedial measures', 'Life path guidance'],
    },
    {
        title: 'Relationship & Compatibility Reading',
        slug: 'relationship-compatibility-reading',
        description: 'Discover the cosmic chemistry between you and your partner. Our compatibility analysis examines both charts to identify areas of harmony and potential challenges. We provide actionable guidance for strengthening your bond, understanding communication styles, and navigating life transitions together. Ideal for couples planning marriage or seeking to deepen their connection.',
        shortDesc: 'Explore cosmic compatibility with your partner through dual-chart analysis and relationship insights.',
        icon: '💑',
        category: 'Astrology',
        price: '₹2,500',
        duration: '75 minutes',
        featured: true,
        benefits: ['Guna Milan scoring', 'Communication insights', 'Conflict resolution guidance', 'Timing for milestones'],
    },
    {
        title: 'Career & Finance Forecast',
        slug: 'career-finance-forecast',
        description: 'Align your professional journey with cosmic timing. Our career forecast identifies favorable periods for job changes, business launches, investments, and skill development. We analyze the 10th and 2nd houses, planetary transits, and dasha periods to provide a strategic roadmap for financial growth and professional fulfillment over the coming year.',
        shortDesc: 'Strategic career and financial guidance aligned with your planetary periods and transits.',
        icon: '💼',
        category: 'Astrology',
        price: '₹1,800',
        duration: '45 minutes',
        featured: false,
        benefits: ['Optimal timing for decisions', 'Investment guidance', 'Career change analysis', 'Wealth period identification'],
    },
    {
        title: 'Numerology Life Path Reading',
        slug: 'numerology-life-path-reading',
        description: 'Unlock the hidden power of numbers in your life. Our numerology reading calculates your Life Path, Expression, Soul Urge, and Destiny numbers to reveal your core purpose, innate talents, and hidden desires. Learn how numerical vibrations influence your daily decisions, relationships, and career choices for a more aligned and purposeful life.',
        shortDesc: 'Discover your core purpose and hidden talents through personalized numerological analysis.',
        icon: '🔢',
        category: 'Numerology',
        price: '₹1,500',
        duration: '45 minutes',
        featured: true,
        benefits: ['Life Path number analysis', 'Name vibration assessment', 'Lucky numbers & colors', 'Yearly cycle predictions'],
    },
    {
        title: 'Business Name Numerology',
        slug: 'business-name-numerology',
        description: 'Choose a business name that resonates with success. Our expert numerologist evaluates potential business names against your personal numbers and industry vibrations. We suggest modifications or alternatives that align with prosperity, growth, and brand recognition, ensuring your business identity vibrates at the frequency of abundance.',
        shortDesc: 'Optimize your business name for success using numerological alignment and vibration analysis.',
        icon: '🏢',
        category: 'Numerology',
        price: '₹2,000',
        duration: '30 minutes',
        featured: false,
        benefits: ['Name vibration scoring', 'Lucky date suggestions', 'Brand color guidance', 'Growth number alignment'],
    },
    {
        title: 'Vastu Home Consultation',
        slug: 'vastu-home-consultation',
        description: 'Transform your living space into a sanctuary of positive energy. Our Vastu consultation examines your home layout, room placements, and directional alignments to identify energy blockages and recommend corrections. From furniture placement to color schemes, we provide practical Vastu-compliant solutions that promote health, harmony, and prosperity without major renovations.',
        shortDesc: 'Harmonize your home energy with practical Vastu corrections for health, wealth, and happiness.',
        icon: '🏠',
        category: 'Vastu',
        price: '₹3,000',
        duration: '90 minutes',
        featured: true,
        benefits: ['Room-by-room analysis', 'Energy flow optimization', 'Remedy suggestions', 'Prosperity zone activation'],
    },
    {
        title: 'Vastu Office & Commercial',
        slug: 'vastu-office-commercial',
        description: 'Boost productivity and profitability in your workplace through Vastu alignment. We analyze your office layout, seating arrangements, entrance placement, and directional flow to optimize the work environment. Our recommendations cover everything from conference room positioning to cash counter placement, creating a space that attracts business success.',
        shortDesc: 'Optimize office energy for productivity, team harmony, and business success with Vastu principles.',
        icon: '🏗️',
        category: 'Vastu',
        price: '₹5,000',
        duration: '120 minutes',
        featured: false,
        benefits: ['Workspace layout design', 'Wealth corner activation', 'Team harmony optimization', 'Business growth alignment'],
    },
    {
        title: 'Gemstone Recommendation',
        slug: 'gemstone-recommendation',
        description: 'Harness the healing power of gemstones tailored to your birth chart. Our gemologist-astrologer analyzes your Kundli to identify which gems can strengthen weak planets, amplify beneficial energies, and mitigate challenging periods. We provide guidance on gem quality, carat weight, metal setting, wearing rituals, and the optimal day to begin wearing your prescribed stone.',
        shortDesc: 'Personalized gemstone prescriptions based on your birth chart for planetary harmony and well-being.',
        icon: '💎',
        category: 'Gemstone',
        price: '₹1,200',
        duration: '30 minutes',
        featured: false,
        benefits: ['Chart-based prescription', 'Quality guidance', 'Wearing ritual instructions', 'Alternative stone options'],
    },
    {
        title: 'Spiritual Healing Session',
        slug: 'spiritual-healing-session',
        description: 'Experience deep spiritual cleansing and energy realignment through our guided healing sessions. Combining Vedic mantras, meditation techniques, and energy work, our practitioners help you release negative patterns, heal emotional wounds, and reconnect with your higher self. Each session is customized to address your specific challenges and spiritual goals.',
        shortDesc: 'Personalized spiritual cleansing with Vedic mantras, meditation, and energy healing techniques.',
        icon: '🙏',
        category: 'Spiritual',
        price: '₹1,800',
        duration: '60 minutes',
        featured: false,
        benefits: ['Energy cleansing', 'Mantra prescription', 'Meditation guidance', 'Chakra balancing'],
    },
    {
        title: 'Puja & Ritual Guidance',
        slug: 'puja-ritual-guidance',
        description: 'Get expert guidance on performing specific pujas and rituals to address life challenges, celebrate auspicious occasions, or seek divine blessings. Our pandit provides detailed instructions including mantras, materials needed, auspicious timing (muhurat), and step-by-step procedures for both home-based and temple rituals aligned with your horoscope.',
        shortDesc: 'Expert puja guidance with mantras, muhurat selection, and step-by-step ritual instructions.',
        icon: '🕯️',
        category: 'Spiritual',
        price: '₹1,500',
        duration: '45 minutes',
        featured: false,
        benefits: ['Muhurat selection', 'Mantra guidance', 'Material list', 'Video call support'],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing
        await Service.deleteMany({});

        // Seed
        await Service.insertMany(services);
        console.log(`✅ ${services.length} services seeded`);

        console.log('🌱 Seed complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
};

seedDB();
