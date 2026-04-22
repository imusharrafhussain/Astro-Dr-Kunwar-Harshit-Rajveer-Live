import faceHeroImage from '../assets/facereadingBg.png'
import ServiceShowcasePage from './ServiceShowcasePage'

const config = {
  variant: 'face',
  heroBadge: '🧠 Face Reading Insights',
  heroTitleLine1: 'Decode Character - ',
  heroTitleHighlight: 'Face Reading',
  heroTitleLine2: 'with Ancient Wisdom',
  heroDesc: 'Understand personality tendencies, behavioral patterns, and opportunity indicators by analyzing facial structure and expressions.',
  heroImage: faceHeroImage,
  heroStats: [
    { value: '5,500+', label: 'Profiles Read' },
    { value: '100%', label: 'Helpful Insights' },
    { value: '15+ Yrs', label: 'Face Reading Experience' },
  ],
  heroBenefits: {
    title: 'Benefits of Face Reading',
    items: [
      { emoji: '🎯', text: 'Clarity on strengths & blind spots' },
      { emoji: '🧠', text: 'Better decision-making patterns' },
      { emoji: '📈', text: 'Career direction & leadership fit' },
      { emoji: '💞', text: 'Relationship communication insights' },
      { emoji: '🛡️', text: 'Stress triggers & emotional tendencies' },
    ],
  },
  servicesTitle: 'Explore Our Face Reading Services',
  formDefaultService: 'Complete Face Profile Reading',
  highlightTitle: 'What Face Reading Tells You',
  highlightDesc: 'Face reading studies forehead, eyes, nose, lips, jawline, and expression patterns to identify inner tendencies and life momentum.',
  highlightPoints: [
    'Personality and temperament insights',
    'Career and leadership tendencies',
    'Relationship behavior analysis',
    'Decision-making and stress pattern cues',
  ],
  services: [
    {
      id: 1,
      icon: '👤',
      title: 'Complete Face Profile Reading',
      desc: 'Comprehensive analysis of facial zones and personality indicators.',
      longDesc: 'A full face reading consultation covering facial symmetry, zones, expression habits, and interpretation for life behavior and potential.',
      benefits: ['Forehead, eyes, nose, lips, jaw assessment', 'Temperament and communication style', 'Strength and risk traits', 'Balanced action recommendations'],
      duration: '45 minutes',
      price: '₹999',
      formFields: [
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91XXXXXXXXXX' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
        { label: 'Primary Concern', name: 'focus', type: 'text', placeholder: 'Career/Relations/Personality/etc.' },
      ],
    },
    {
      id: 2,
      icon: '💼',
      title: 'Career Potential Face Reading',
      desc: 'Identify role fit, authority style, and professional growth signs.',
      longDesc: 'Targeted face reading to understand leadership style, decision-making approach, and long-term career suitability.',
      benefits: ['Leadership and authority traits', 'Role suitability indicators', 'Workplace behavior strengths', 'Growth acceleration guidance'],
      duration: '35 minutes',
      price: '₹799',
      formFields: [
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'Current Profession', name: 'profession', type: 'text', placeholder: 'Profession/role' },
        { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91XXXXXXXXXX' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      ],
    },
    {
      id: 3,
      icon: '❤️',
      title: 'Relationship Face Reading',
      desc: 'Understand emotional compatibility and communication tendencies.',
      longDesc: 'Specialized reading for emotional patterns, attachment style, conflict response, and relational strengths.',
      benefits: ['Emotional response patterns', 'Communication style analysis', 'Conflict and compatibility indicators', 'Relationship improvement suggestions'],
      duration: '40 minutes',
      price: '₹899',
      formFields: [
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'Relationship Status', name: 'status', type: 'select', options: ['Single', 'Committed', 'Married'] },
        { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91XXXXXXXXXX' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      ],
    },
    {
      id: 4,
      icon: '🧿',
      title: 'Corrective Guidance Session',
      desc: 'Practical changes for improving confidence and life outcomes.',
      longDesc: 'Receive focused guidance based on face reading markers to improve mindset, communication, and personal energy.',
      benefits: ['Behavior correction focus areas', 'Confidence and communication upgrades', 'Personal energy balancing tips', 'Simple daily improvement routine'],
      duration: '30 minutes',
      price: '₹699',
      formFields: [
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'Main Challenge', name: 'challenge', type: 'text', placeholder: 'Your current challenge' },
        { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91XXXXXXXXXX' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      ],
    },
  ],
  processSteps: [
    { title: 'Consultation Goal', desc: 'You share what you want to understand: personality, career, or relationship behavior.' },
    { title: 'Feature Mapping', desc: 'We analyze facial zones like forehead, eyes, nose, lips, and jawline markers.' },
    { title: 'Behavior Insights', desc: 'You receive clear insights on communication style, confidence, and decision patterns.' },
    { title: 'Personal Action Plan', desc: 'Practical recommendations are provided for better interpersonal and professional outcomes.' },
  ],
  faqs: [
    { q: 'Is face reading scientific or spiritual?', a: 'It is a traditional interpretive system based on observation patterns and behavioral indicators.' },
    { q: 'Can face reading predict exact future events?', a: 'It indicates tendencies and probabilities, not rigid fixed outcomes.' },
    { q: 'How should I prepare for a face reading consultation?', a: 'Keep your key concerns ready and provide clear profile details for a focused reading.' },
  ],
  testimonials: [
    { name: 'Ishita R', rating: 5, text: 'Face reading explained my behavior patterns perfectly.', avatar: '' },
    { name: 'Dev P', rating: 5, text: 'Clear career insights and practical steps to improve.', avatar: '' },
    { name: 'Mona K', rating: 5, text: 'Very unique and helpful consultation style.', avatar: '' },
  ],
  trustPoints: [
    { icon: '🔍', title: 'Structured Analysis', desc: 'Systematic facial zone reading with practical interpretation.' },
    { icon: '🧭', title: 'Actionable Advice', desc: 'Clear next steps to improve communication and life outcomes.' },
    { icon: '🔐', title: 'Private Sessions', desc: 'Your personal profile and consultation remain confidential.' },
  ],
}

export default function FaceReadingPage() {
  return <ServiceShowcasePage config={config} />
}
