import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import heroKundliM from '../assets/heroKundliM.webp'
import './KundliMatchingPage.css'

/* ═══════════════════════════════════════════════
   SERVICE DATA — full detail + unique form fields
   ═══════════════════════════════════════════════ */
const services = [
  {
    id: 1,
    icon: '☯',
    title: 'Guna Milan Matching',
    desc: 'Determine compatibility through the Ashtakoota system and match details.',
    longDesc:
      'Guna Milan is the traditional Vedic compatibility system that evaluates 8 essential life aspects (Ashtakootas) between two horoscopes. Each koota carries different weightage, totalling 36 points. A score of 18+ is generally considered acceptable for marriage.',
    benefits: [
      '36-point Ashtakoota compatibility score',
      'Detailed analysis of all 8 Kootas',
      'Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot & Nadi check',
      'Personalized remedies for low scores',
    ],
    duration: '60 minutes',
    price: '₹1,100',
    formFields: [
      { label: "Boy's Full Name", name: 'boyName', type: 'text', placeholder: "Enter boy's name" },
      { label: "Girl's Full Name", name: 'girlName', type: 'text', placeholder: "Enter girl's name" },
      { label: "Boy's Date of Birth", name: 'boyDob', type: 'date' },
      { label: "Girl's Date of Birth", name: 'girlDob', type: 'date' },
      { label: "Boy's Birth Time", name: 'boyTime', type: 'time' },
      { label: "Girl's Birth Time", name: 'girlTime', type: 'time' },
      { label: "Boy's Birth Place", name: 'boyPlace', type: 'text', placeholder: 'City, State, Country' },
      { label: "Girl's Birth Place", name: 'girlPlace', type: 'text', placeholder: 'City, State, Country' },
      { label: 'Contact Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 2,
    icon: '🔱',
    title: 'Manglik Dosha Matching',
    desc: 'Analyze Manglik dosha impact on marriage, life, and remedies.',
    longDesc:
      'Manglik Dosha (also called Kuja Dosha) occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th or 12th house of the natal chart. This dosha can affect marital life significantly. Our expert astrologers analyse the strength of the dosha and provide remedies.',
    benefits: [
      'Check presence and strength of Manglik Dosha',
      'Analysis from Ascendant, Moon & Venus charts',
      'Dosha cancellation (Bhanga) conditions checked',
      'Effective Vedic remedies and rituals',
    ],
    duration: '45 minutes',
    price: '₹800',
    formFields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
      { label: 'Date of Birth', name: 'dob', type: 'date' },
      { label: 'Birth Time', name: 'birthTime', type: 'time' },
      { label: 'Birth Place', name: 'birthPlace', type: 'text', placeholder: 'City, State, Country' },
      { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
      { label: 'Marital Status', name: 'maritalStatus', type: 'select', options: ['Unmarried', 'Married', 'Divorced', 'Widowed'] },
      { label: "Partner's Name (if any)", name: 'partnerName', type: 'text', placeholder: "Partner's name (optional)" },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 3,
    icon: '🌿',
    title: 'Nadi Dosha Analysis',
    desc: 'Discover and correct the most severe dosha affecting marriage compatibility.',
    longDesc:
      'Nadi Dosha is one of the most critical doshas in Kundali matching. It occurs when both partners share the same Nadi (Adi, Madhya or Antya). This dosha is associated with health issues, progeny problems, and separation. Expert analysis can reveal Nadi Dosha exceptions and remedies.',
    benefits: [
      'Identify Adi, Madhya, or Antya Nadi conflict',
      'Check Nadi Dosha cancellation conditions',
      'Impact on health and progeny assessed',
      'Mantra and puja remedies prescribed',
    ],
    duration: '50 minutes',
    price: '₹900',
    formFields: [
      { label: "Boy's Full Name", name: 'boyName', type: 'text', placeholder: "Boy's name" },
      { label: "Girl's Full Name", name: 'girlName', type: 'text', placeholder: "Girl's name" },
      { label: "Boy's DOB", name: 'boyDob', type: 'date' },
      { label: "Girl's DOB", name: 'girlDob', type: 'date' },
      { label: "Boy's Nakshatra (if known)", name: 'boyNakshatra', type: 'text', placeholder: "e.g. Ashwini" },
      { label: "Girl's Nakshatra (if known)", name: 'girlNakshatra', type: 'text', placeholder: "e.g. Bharani" },
      { label: "Boy's Nadi", name: 'boyNadi', type: 'select', options: ['Unknown', 'Adi', 'Madhya', 'Antya'] },
      { label: "Girl's Nadi", name: 'girlNadi', type: 'select', options: ['Unknown', 'Adi', 'Madhya', 'Antya'] },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 4,
    icon: '💠',
    title: 'Bhakoot Matching',
    desc: 'Find your soulmate ties to a fiery pair and creating this matching.',
    longDesc:
      'Bhakoot Dosha is related to the Moon signs of the couple. Certain sign combinations (6-8, 5-9, 12-2 Bhakoot) are considered inauspicious and can bring financial difficulties, health issues, and separation. Our astrologers check Bhakoot compatibility and remedial measures.',
    benefits: [
      'Moon sign compatibility analysis',
      'Bhakoot Dosha identification (6-8, 5-9, 12-2)',
      'Financial and health compatibility check',
      'Remedies for unfavourable Bhakoot combinations',
    ],
    duration: '45 minutes',
    price: '₹850',
    formFields: [
      { label: "Boy's Full Name", name: 'boyName', type: 'text', placeholder: "Boy's name" },
      { label: "Girl's Full Name", name: 'girlName', type: 'text', placeholder: "Girl's name" },
      { label: "Boy's Rashi (Moon Sign)", name: 'boyRashi', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: "Girl's Rashi (Moon Sign)", name: 'girlRashi', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: "Boy's DOB", name: 'boyDob', type: 'date' },
      { label: "Girl's DOB", name: 'girlDob', type: 'date' },
      { label: "Boy's Birth Time", name: 'boyTime', type: 'time' },
      { label: "Girl's Birth Time", name: 'girlTime', type: 'time' },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 5,
    icon: '♈',
    title: 'Rashi Compatibility',
    desc: 'Discover compatibility based on the Sun and moon sign.',
    longDesc:
      'Rashi compatibility examines how two Moon signs interact on emotional, mental and social levels. Some Rashi combinations are naturally harmonious while others require more effort. This analysis gives a quick but insightful compatibility overview for couples.',
    benefits: [
      'Moon sign & Sun sign compatibility',
      'Emotional and mental wavelength matching',
      'Social and family compatibility',
      'Guidance on strengths and challenges',
    ],
    duration: '40 minutes',
    price: '₹700',
    formFields: [
      { label: 'Your Name', name: 'yourName', type: 'text', placeholder: 'Your full name' },
      { label: "Partner's Name", name: 'partnerName', type: 'text', placeholder: "Partner's name" },
      { label: 'Your Rashi', name: 'yourRashi', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: "Partner's Rashi", name: 'partnerRashi', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: 'Your Sun Sign', name: 'yourSun', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: "Partner's Sun Sign", name: 'partnerSun', type: 'select', options: ['Unknown', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 6,
    icon: '🪐',
    title: 'Graha Maitri',
    desc: 'Peaceful relationships based on planetary friendships.',
    longDesc:
      'Graha Maitri (planetary friendship) checks the mutual affinity between the lords of the Moon signs of both partners. This koota reveals the mental compatibility and mutual respect in the relationship, which is vital for long-term happiness.',
    benefits: [
      'Analysis of Moon sign lords\' friendship',
      'Mental compatibility and mutual understanding',
      'Respect and cooperation quotient',
      'Remedies to strengthen planetary bonds',
    ],
    duration: '45 minutes',
    price: '₹800',
    formFields: [
      { label: "Your Full Name", name: 'yourName', type: 'text', placeholder: 'Your name' },
      { label: "Partner's Full Name", name: 'partnerName', type: 'text', placeholder: "Partner's name" },
      { label: 'Your DOB', name: 'yourDob', type: 'date' },
      { label: "Partner's DOB", name: 'partnerDob', type: 'date' },
      { label: 'Your Birth Time', name: 'yourTime', type: 'time' },
      { label: "Partner's Birth Time", name: 'partnerTime', type: 'time' },
      { label: 'Your Birth Place', name: 'yourPlace', type: 'text', placeholder: 'City, State' },
      { label: "Partner's Birth Place", name: 'partnerPlace', type: 'text', placeholder: 'City, State' },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 7,
    icon: '✨',
    title: 'Gana Matri',
    desc: 'Balancing your relationship through planets and propositions.',
    longDesc:
      'Gana Matri checks the Gana (temperament) of both individuals — Deva (divine), Manushya (human), or Rakshasa (demonic). Compatible Ganas lead to harmonious temperaments while mismatched Ganas can lead to clashes. This analysis helps understand behavioural compatibility.',
    benefits: [
      'Determine Gana type: Deva, Manushya or Rakshasa',
      'Behavioural and temperament compatibility',
      'Understand lifestyle and value alignment',
      'Practical guidance for Gana mismatches',
    ],
    duration: '40 minutes',
    price: '₹750',
    formFields: [
      { label: "Boy's Full Name", name: 'boyName', type: 'text', placeholder: "Boy's name" },
      { label: "Girl's Full Name", name: 'girlName', type: 'text', placeholder: "Girl's name" },
      { label: "Boy's Nakshatra", name: 'boyNakshatra', type: 'text', placeholder: 'e.g. Rohini' },
      { label: "Girl's Nakshatra", name: 'girlNakshatra', type: 'text', placeholder: 'e.g. Hasta' },
      { label: "Boy's Gana", name: 'boyGana', type: 'select', options: ['Unknown', 'Deva', 'Manushya', 'Rakshasa'] },
      { label: "Girl's Gana", name: 'girlGana', type: 'select', options: ['Unknown', 'Deva', 'Manushya', 'Rakshasa'] },
      { label: "Boy's DOB", name: 'boyDob', type: 'date' },
      { label: "Girl's DOB", name: 'girlDob', type: 'date' },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
  {
    id: 8,
    icon: '🐂',
    title: 'Yoni Matching',
    desc: 'A deity component matching routes to pratetmatmer mind matches.',
    longDesc:
      'Yoni Matching checks the sexual and physical compatibility between partners based on their birth Nakshatra. Each Nakshatra is associated with a specific Yoni (animal symbol). This koota analysis reveals intimate compatibility and mutual attraction levels.',
    benefits: [
      'Physical and intimate compatibility score',
      'Nakshatra-based Yoni identification',
      'Friendly, neutral and enemy Yoni analysis',
      'Holistic compatibility report with remedies',
    ],
    duration: '40 minutes',
    price: '₹750',
    formFields: [
      { label: "Boy's Full Name", name: 'boyName', type: 'text', placeholder: "Boy's name" },
      { label: "Girl's Full Name", name: 'girlName', type: 'text', placeholder: "Girl's name" },
      { label: "Boy's Nakshatra", name: 'boyNakshatra', type: 'text', placeholder: 'e.g. Ashwini' },
      { label: "Girl's Nakshatra", name: 'girlNakshatra', type: 'text', placeholder: 'e.g. Bharani' },
      { label: "Boy's Yoni (if known)", name: 'boyYoni', type: 'text', placeholder: 'e.g. Horse' },
      { label: "Girl's Yoni (if known)", name: 'girlYoni', type: 'text', placeholder: 'e.g. Elephant' },
      { label: "Boy's DOB", name: 'boyDob', type: 'date' },
      { label: "Girl's DOB", name: 'girlDob', type: 'date' },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
    ],
  },
]

/* ── Other static data ── */
const testimonials = [
  { name: 'Maya Sharma', rating: 5, text: 'The Kundali matching service settled lifelong matters. Highly recommended!', avatar: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Arjun Patel', rating: 5, text: 'Excellent and accurate analysis by the astrologer. Patient and very helpful.', avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Priya Mehta', rating: 5, text: 'Very satisfied consultation. Content evidence truly made a difference in my life.', avatar: 'https://i.pravatar.cc/80?img=9' },
]

const trustPoints = [
  { icon: '🧘', title: 'Expert Astrologers', desc: 'Our team has 15+ years of experience in Vedic astrology and kundali matching.' },
  { icon: '📊', title: 'Accurate Calculations', desc: 'We use precise astronomical data for birth chart generation and compatibility.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your personal data is strictly confidential. 100% privacy guaranteed.' },
]

const RASHI_LIST = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
]

// Standard 27 Nakshatras (required full list)
const NAKSHATRA_LIST = [
  'Ashwini',
  'Bharani',
  'Krittika',
  'Rohini',
  'Mrigashira',
  'Ardra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Purva Phalguni',
  'Uttara Phalguni',
  'Hasta',
  'Chitra',
  'Swati',
  'Vishakha',
  'Anuradha',
  'Jyeshtha',
  'Moola',
  'Purva Ashadha',
  'Uttara Ashadha',
  'Shravana',
  'Dhanishta',
  'Shatabhisha',
  'Purva Bhadrapada',
  'Uttara Bhadrapada',
  'Revati',
]

// 1) VARNA (Max 1)
const varnaMap = {
  Aries: 'Kshatriya',
  Taurus: 'Vaishya',
  Gemini: 'Shudra',
  Cancer: 'Brahmin',
  Leo: 'Kshatriya',
  Virgo: 'Vaishya',
  Libra: 'Shudra',
  Scorpio: 'Brahmin',
  Sagittarius: 'Kshatriya',
  Capricorn: 'Vaishya',
  Aquarius: 'Shudra',
  Pisces: 'Brahmin',
}

// 2) VASHYA (Max 2)
const vashyaMap = {
  Aries: 'Chatushpada',
  Taurus: 'Chatushpada',
  Gemini: 'Manav',
  Cancer: 'Jalchar',
  Leo: 'Vanchar',
  Virgo: 'Manav',
  Libra: 'Manav',
  Scorpio: 'Jalchar',
  Sagittarius: 'Vanchar',
  Capricorn: 'Chatushpada',
  Aquarius: 'Manav',
  Pisces: 'Jalchar',
}

// 6) GANA (Max 6) — complete mapping (all covered)
const ganaMap = {
  Ashwini: 'Deva',
  Bharani: 'Manushya',
  Krittika: 'Rakshasa',
  Rohini: 'Manushya',
  Mrigashira: 'Deva',
  Ardra: 'Manushya',
  Punarvasu: 'Deva',
  Pushya: 'Deva',
  Ashlesha: 'Rakshasa',
  Magha: 'Rakshasa',
  'Purva Phalguni': 'Manushya',
  'Uttara Phalguni': 'Manushya',
  Hasta: 'Deva',
  Chitra: 'Rakshasa',
  Swati: 'Deva',
  Vishakha: 'Rakshasa',
  Anuradha: 'Deva',
  Jyeshtha: 'Rakshasa',
  Moola: 'Rakshasa',
  'Purva Ashadha': 'Manushya',
  'Uttara Ashadha': 'Manushya',
  Shravana: 'Deva',
  Dhanishta: 'Rakshasa',
  Shatabhisha: 'Rakshasa',
  'Purva Bhadrapada': 'Manushya',
  'Uttara Bhadrapada': 'Manushya',
  Revati: 'Deva',
}

// 8) NADI (Max 8) — complete mapping (all covered)
const nadiMap = {
  Ashwini: 'Aadi',
  Bharani: 'Madhya',
  Krittika: 'Antya',
  Rohini: 'Aadi',
  Mrigashira: 'Madhya',
  Ardra: 'Madhya',
  Punarvasu: 'Aadi',
  Pushya: 'Aadi',
  Ashlesha: 'Madhya',
  Magha: 'Aadi',
  'Purva Phalguni': 'Madhya',
  'Uttara Phalguni': 'Antya',
  Hasta: 'Aadi',
  Chitra: 'Madhya',
  Swati: 'Antya',
  Vishakha: 'Madhya',
  Anuradha: 'Antya',
  Jyeshtha: 'Madhya',
  Moola: 'Aadi',
  'Purva Ashadha': 'Madhya',
  'Uttara Ashadha': 'Antya',
  Shravana: 'Antya',
  Dhanishta: 'Madhya',
  Shatabhisha: 'Antya',
  'Purva Bhadrapada': 'Madhya',
  'Uttara Bhadrapada': 'Antya',
  Revati: 'Aadi',
}

// 7) BHAKOOT (Max 7) — good compatibility pairs (bidirectional)
const bhakootGoodPairs = [
  ['Aries', 'Leo'],
  ['Leo', 'Sagittarius'],
  ['Sagittarius', 'Aries'],
  ['Taurus', 'Virgo'],
  ['Virgo', 'Capricorn'],
  ['Gemini', 'Libra'],
  ['Libra', 'Aquarius'],
  ['Cancer', 'Scorpio'],
  ['Scorpio', 'Pisces'],
]

function isPairInList(a, b, pairs) {
  return pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
}

function safe(val, def) {
  return val !== undefined ? val : def
}

function getVarna(boyRashi, girlRashi) {
  return varnaMap[boyRashi] === varnaMap[girlRashi] ? 1 : 0
}

function getVashya(boyRashi, girlRashi) {
  return vashyaMap[boyRashi] === vashyaMap[girlRashi] ? 2 : 1
}

function getTara(boyNak, girlNak) {
  const b = NAKSHATRA_LIST.indexOf(boyNak)
  const g = NAKSHATRA_LIST.indexOf(girlNak)
  if (b === -1 || g === -1) return 2
  const diff = Math.abs(b - g)
  return diff % 9 === 0 ? 3 : 2
}

function getYoni(boyNak, girlNak) {
  return boyNak === girlNak ? 4 : 2
}

function getGraha(boyRashi, girlRashi) {
  if (boyRashi === girlRashi) return 5
  const friendly = [
    ['Aries', 'Leo'],
    ['Leo', 'Sagittarius'],
    ['Sagittarius', 'Aries'],
    ['Taurus', 'Virgo'],
    ['Virgo', 'Capricorn'],
    ['Gemini', 'Libra'],
    ['Libra', 'Aquarius'],
    ['Cancer', 'Scorpio'],
    ['Scorpio', 'Pisces'],
  ]
  return isPairInList(boyRashi, girlRashi, friendly) ? 5 : 3
}

function getGana(boyNak, girlNak) {
  const b = safe(ganaMap[boyNak], 'Manushya')
  const g = safe(ganaMap[girlNak], 'Manushya')
  return b === g ? 6 : 3
}

function getBhakoot(boyRashi, girlRashi) {
  return isPairInList(boyRashi, girlRashi, bhakootGoodPairs) ? 7 : 0
}

function getNadi(boyNak, girlNak) {
  const b = safe(nadiMap[boyNak], 'Madhya')
  const g = safe(nadiMap[girlNak], 'Madhya')
  return b === g ? 0 : 8
}

function taraPoints(boyNakshatra, girlNakshatra) {
  const bi = NAKSHATRA_LIST.indexOf(boyNakshatra)
  const gi = NAKSHATRA_LIST.indexOf(girlNakshatra)
  if (bi === -1 || gi === -1) return 2
  const diff = Math.abs(bi - gi)
  return diff % 9 === 0 ? 3 : 2
}

function resultLabel(total) {
  if (total >= 30) return '🌟 Excellent'
  if (total >= 20) return '😍 Good'
  if (total >= 18) return '😥 Average'
  return '🤕 Needs Guidance'
}

function calculateGunaMilan(boy, girl) {
  const boyRashi = boy?.rashi || ''
  const girlRashi = girl?.rashi || ''
  const boyNak = boy?.nakshatra || ''
  const girlNak = girl?.nakshatra || ''

  const boyVarna = varnaMap[boyRashi] || ''
  const girlVarna = varnaMap[girlRashi] || ''
  const varnaPts = boyRashi && girlRashi ? getVarna(boyRashi, girlRashi) : 0

  const boyVashya = vashyaMap[boyRashi] || ''
  const girlVashya = vashyaMap[girlRashi] || ''
  const vashyaPts = boyRashi && girlRashi ? getVashya(boyRashi, girlRashi) : 1

  const taraPts = getTara(boyNak, girlNak)

  // 4) YONI (Max 4) — prompt says "if same → 4 else → 2"
  // We derive yoni from nakshatra when available; otherwise blank/0.
  const boyYoni = boyNak
  const girlYoni = girlNak
  const yoniPts = boyNak && girlNak ? getYoni(boyNak, girlNak) : 2

  // 5) GRAHA MAITRI (Max 5)
  const grahaPts = boyRashi && girlRashi ? getGraha(boyRashi, girlRashi) : 3

  // 6) GANA (Max 6)
  const boyGana = safe(ganaMap[boyNak], 'Manushya')
  const girlGana = safe(ganaMap[girlNak], 'Manushya')
  const ganaPts = getGana(boyNak, girlNak)

  // 7) BHAKOOT (Max 7)
  const bhakootPts = boyRashi && girlRashi ? getBhakoot(boyRashi, girlRashi) : 0

  // 8) NADI (Max 8)
  const boyNadi = safe(nadiMap[boyNak], 'Madhya')
  const girlNadi = safe(nadiMap[girlNak], 'Madhya')
  const nadiPts = getNadi(boyNak, girlNak)

  const gunaData = [
    { koot: 'Varna', boy: boyVarna, girl: girlVarna, points: varnaPts, maxPoints: 1 },
    { koot: 'Vashya', boy: boyVashya, girl: girlVashya, points: vashyaPts, maxPoints: 2 },
    { koot: 'Tara', boy: boyNak, girl: girlNak, points: taraPts, maxPoints: 3 },
    { koot: 'Yoni', boy: boyYoni, girl: girlYoni, points: yoniPts, maxPoints: 4 },
    { koot: 'Graha Maitri', boy: boyRashi, girl: girlRashi, points: grahaPts, maxPoints: 5 },
    { koot: 'Gana', boy: boyGana, girl: girlGana, points: ganaPts, maxPoints: 6 },
    { koot: 'Bhakoot', boy: boyRashi, girl: girlRashi, points: bhakootPts, maxPoints: 7 },
    { koot: 'Nadi', boy: boyNadi, girl: girlNadi, points: nadiPts, maxPoints: 8 },
  ]

  return gunaData
}

function GunaMilanMatchingCard({ boyData, girlData, apiResult }) {
  // INPUT SYSTEM (per prompt)
  const [boy, setBoy] = useState(boyData || { rashi: 'Aries', nakshatra: 'Ashwini' })
  const [girl, setGirl] = useState(girlData || { rashi: 'Cancer', nakshatra: 'Pushya' })

  useEffect(() => {
    if (boyData) setBoy(boyData)
  }, [boyData])

  useEffect(() => {
    if (girlData) setGirl(girlData)
  }, [girlData])

  // Sync derived rashi/nakshatra from backend birth-detail calculation.
  useEffect(() => {
    if (apiResult?.boy?.rashi && apiResult?.boy?.nakshatra) {
      setBoy({ rashi: apiResult.boy.rashi, nakshatra: apiResult.boy.nakshatra })
    }
    if (apiResult?.girl?.rashi && apiResult?.girl?.nakshatra) {
      setGirl({ rashi: apiResult.girl.rashi, nakshatra: apiResult.girl.nakshatra })
    }
  }, [apiResult])

  const gunaData = useMemo(() => calculateGunaMilan(boy, girl), [boy, girl])
  const total = useMemo(() => gunaData.reduce((sum, item) => sum + (Number(item.points) || 0), 0), [gunaData])
  const label = useMemo(() => resultLabel(total), [total])

  return (
    <div className="km-guna-card">
      <h3 className="km-guna-title">Guna Milan Matching</h3>
      <p className="km-guna-sub">
        A kundali matching system that assigns a 36‑point compatibility
        system for couples based on the following eight kootas.
      </p>

      {/* Input controls (minimal, inside same card; no layout/class changes) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '1.2rem', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(232,201,126,0.9)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Boy</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(232,201,126,0.75)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Rashi</div>
              <select
                value={boy.rashi}
                onChange={(e) => setBoy((prev) => ({ ...prev, rashi: e.target.value }))}
                aria-label="Boy rashi"
                style={{ width: '100%', padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1.5px solid rgba(200, 160, 82, 0.28)', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              >
                {RASHI_LIST.map((r) => <option key={r} value={r} style={{ color: '#3a1a0a' }}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(232,201,126,0.75)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Nakshatra</div>
              <select
                value={boy.nakshatra}
                onChange={(e) => setBoy((prev) => ({ ...prev, nakshatra: e.target.value }))}
                aria-label="Boy nakshatra"
                style={{ width: '100%', padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1.5px solid rgba(200, 160, 82, 0.28)', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              >
                {NAKSHATRA_LIST.map((n) => <option key={n} value={n} style={{ color: '#3a1a0a' }}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(232,201,126,0.9)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Girl</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(232,201,126,0.75)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Rashi</div>
              <select
                value={girl.rashi}
                onChange={(e) => setGirl((prev) => ({ ...prev, rashi: e.target.value }))}
                aria-label="Girl rashi"
                style={{ width: '100%', padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1.5px solid rgba(200, 160, 82, 0.28)', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              >
                {RASHI_LIST.map((r) => <option key={r} value={r} style={{ color: '#3a1a0a' }}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(232,201,126,0.75)', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Nakshatra</div>
              <select
                value={girl.nakshatra}
                onChange={(e) => setGirl((prev) => ({ ...prev, nakshatra: e.target.value }))}
                aria-label="Girl nakshatra"
                style={{ width: '100%', padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1.5px solid rgba(200, 160, 82, 0.28)', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              >
                {NAKSHATRA_LIST.map((n) => <option key={n} value={n} style={{ color: '#3a1a0a' }}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <table className="km-guna-table">
        <thead>
          <tr><th>#</th><th>Koot</th><th>Boy</th><th>Girl</th><th>Points</th></tr>
        </thead>
        <tbody>
          {gunaData.map((row, i) => (
            <tr key={row.koot}>
              <td style={{ color: 'rgba(232,201,126,0.7)', fontWeight: 700 }}>{i + 1}</td>
              <td style={{ fontWeight: 600 }}>{row.koot}</td>
              <td>{row.boy || '—'}</td>
              <td>{row.girl || '—'}</td>
              <td style={{ textAlign: 'center', fontWeight: 700, color: '#e8c97e' }}>{row.points} / {row.maxPoints}</td>
            </tr>
          ))}
          <tr style={{ borderTop: '1px solid rgba(200,160,82,0.4)' }}>
            <td colSpan={4} style={{ fontWeight: 700, color: '#e8c97e', paddingTop: '0.7rem' }}>
             🔱 Total Score: {total} / 36 &nbsp;•&nbsp;<br /> {label} 
            </td>
            <td style={{ textAlign: 'center', fontWeight: 800, color: '#e8c97e', fontSize: '1rem', paddingTop: '0.7rem' }}>
              {total} / 36
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/contact" className="km-btn-solid km-guna-btn">Consult Our Astrologer( For 100% Accuracy⚡)</Link>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SERVICE DETAIL MODAL
   ═══════════════════════════════════════════════ */
function ServiceModal({ service, onClose, onGunaCalculated }) {
  const [step, setStep] = useState('info') // 'info' | 'form'
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Build initial form state from this service's fields
  useEffect(() => {
    const initial = {}
    service.formFields.forEach((f) => { initial[f.name] = '' })
    setFormData(initial)
  }, [service])

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const parseLatLon = (text) => {
    if (!text) return { latitude: undefined, longitude: undefined }
    const parts = String(text).split(',').map((s) => s.trim())
    if (parts.length < 2) return { latitude: undefined, longitude: undefined }
    const latitude = Number(parts[0])
    const longitude = Number(parts[1])
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) return { latitude, longitude }
    return { latitude: undefined, longitude: undefined }
  }

  const localDateTimeToISO = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return ''
    const d = new Date(`${dateStr}T${timeStr}`)
    if (Number.isNaN(d.getTime())) return ''
    return d.toISOString()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const isGunaMilan = service?.title?.toLowerCase().includes('guna milan')
      if (isGunaMilan && typeof onGunaCalculated === 'function') {
        const boyISO = localDateTimeToISO(formData.boyDob, formData.boyTime)
        const girlISO = localDateTimeToISO(formData.girlDob, formData.girlTime)

        const boyCoords = parseLatLon(formData.boyPlace)
        const girlCoords = parseLatLon(formData.girlPlace)

        if (boyISO && girlISO) {
          const { data } = await API.post('/guna-milan/calculate', {
            boy: { datetime: boyISO, ...boyCoords },
            girl: { datetime: girlISO, ...girlCoords },
          })
          if (data?.success && data?.data) {
            onGunaCalculated(data.data)
          }
        }
      }
    } catch {
      // Keep UI unchanged. Calculation is best-effort.
    }
    setSubmitted(true)
  }

  return (
    <div className="km-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="km-modal-card" role="dialog" aria-modal="true">

        {/* Close Button */}
        <button className="km-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header with icon */}
        <div className="km-modal-header">
          <div className="km-modal-icon">{service.icon}</div>
          <div>
            <h2 className="km-modal-title">{service.title}</h2>
            <p className="km-modal-meta">{service.duration} &nbsp;•&nbsp; {service.price}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="km-modal-tabs">
          <button
            className={`km-tab-btn ${step === 'info' ? 'km-tab-active' : ''}`}
            onClick={() => setStep('info')}
          >
            📖 Service Details
          </button>
          <button
            className={`km-tab-btn ${step === 'form' ? 'km-tab-active' : ''}`}
            onClick={() => setStep('form')}
          >
            📋 Book Consultation
          </button>
        </div>

        {/* ── INFO VIEW ── */}
        {step === 'info' && (
          <div className="km-modal-body">
            <p className="km-modal-long-desc">{service.longDesc}</p>

            <h4 className="km-modal-benefits-title">✦ What You'll Receive</h4>
            <ul className="km-modal-benefits">
              {service.benefits.map((b, i) => (
                <li key={i}>
                  <span className="km-check">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Contact Astrologer CTA */}
            <div className="km-modal-contact-cta">
              <div className="km-cta-icon">🧙</div>
              <div>
                <p className="km-cta-label">Need Personalized Guidance?</p>
                <p className="km-cta-sub">Talk directly to our expert astrologer for this service</p>
              </div>
              <Link to="/contact" className="km-btn-outline km-cta-link" onClick={onClose}>
                Contact Astrologer
              </Link>
            </div>

            <button
              className="km-btn-solid km-modal-cta-btn"
              onClick={() => setStep('form')}
            >
              Book This Service — {service.price} →
            </button>
          </div>
        )}

        {/* ── FORM VIEW ── */}
        {step === 'form' && (
          <div className="km-modal-body">
            {submitted ? (
              <div className="km-modal-success">
                <div className="km-success-icon">🎉</div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for booking <strong>{service.title}</strong>. Our astrologer will contact you within 24 hours.</p>
                <button className="km-btn-solid" onClick={onClose}>Close</button>
              </div>
            ) : (
              <>
                <p className="km-form-intro">
                  Fill in the details below for your <strong>{service.title}</strong> consultation.
                </p>
                <form className="km-modal-form" onSubmit={handleSubmit}>
                  <div className="km-modal-fields">
                    {service.formFields.map((field) => (
                      <div key={field.name} className="km-modal-field">
                        <label htmlFor={`modal-${field.name}`}>{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            id={`modal-${field.name}`}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>Select…</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`modal-${field.name}`}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="km-btn-solid km-modal-cta-btn">
                    Confirm Booking ✓
                  </button>
                </form>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function KundliMatchingPage() {
  const [activeModal, setActiveModal] = useState(null) // service object or null
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', service: 'Kundali Matching', date: '', time: '', message: '' })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeTrust, setActiveTrust] = useState(0)
  const [gunaApiResult, setGunaApiResult] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); alert('Booking confirmed! We will contact you shortly.') }

  return (
    <div className="km-page page-wrapper">

      {/* ── MODAL ── */}
      {activeModal && (
        <ServiceModal
          service={activeModal}
          onClose={() => setActiveModal(null)}
          onGunaCalculated={(result) => setGunaApiResult(result)}
        />
      )}

      {/* ── HERO ── */}
      <section className="km-hero">
        <div className="container km-hero-inner">
          <div className="km-hero-text">
            <div className="km-hero-badge">🔱 India's Most Trusted Vedic Astrologer</div>
            <h1 className="km-hero-title">
              Find Your <span>Perfect Match</span><br />with Kundali Matching
            </h1>
            <p className="km-hero-desc">
              Discover true compatibility through Vedic astrology. Our expert
              astrologers provide detailed kundali matching to help you find your
              ideal life partner guided by ancient wisdom.
            </p>
            <div className="km-hero-stats">
              <div className="km-hero-stat">
                <span className="km-hero-stat-num">10,000+</span>
                <span className="km-hero-stat-label">Consultations</span>
              </div>
              <div className="km-hero-stat">
                <span className="km-hero-stat-num">98%</span>
                <span className="km-hero-stat-label">Accuracy</span>
              </div>
              <div className="km-hero-stat">
                <span className="km-hero-stat-num">20+ Yrs</span>
                <span className="km-hero-stat-label">Experience</span>
              </div>
            </div>
            <div className="km-hero-btns">
              <Link to="/book" className="km-btn-solid">Start Matching</Link>
              <Link to="/contact" className="km-btn-outline">Consult Astrologer</Link>
            </div>
          </div>

          <div className="km-hero-visual" aria-hidden="true">
            <img
              src={heroKundliM}
              alt=""
              className="km-hero-kundli-img"
              width={960}
              height={960}
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ── DIAMOND DIVIDER ── */}
      <div className="km-divider"><span>◆</span></div>

      {/* ── SERVICES GRID ── */}
      <section className="km-services-section">
        <div className="container">
          <h2 className="km-section-title">Explore Our Kundali Matching Services</h2>
          <div className="km-services-grid">
            {services.map((svc) => (
              <div key={svc.id} className="km-service-card glass-panel">
                <div className="km-svc-icon">{svc.icon}</div>
                <h3 className="km-svc-title">{svc.title}</h3>
                <p className="km-svc-desc">{svc.desc}</p>
                <button
                  className="km-view-btn"
                  onClick={() => setActiveModal(svc)}
                  aria-label={`View details for ${svc.title}`}
                >
                  View Details <span>›</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUNA MILAN + TESTIMONIALS ── */}
      <section className="km-guna-section">
        <div className="container km-guna-inner">
          <GunaMilanMatchingCard apiResult={gunaApiResult} />

          <div className="km-testimonials">
            <h2 className="km-section-title" style={{ textAlign: 'center' }}>What Our Customers Say</h2>
            <div className="km-testimonial-cards">
              {testimonials.map((t, i) => (
                <div key={i} className={`km-testimonial-card ${i === activeTestimonial ? 'km-t-active' : ''}`}>
                  <img src={t.avatar} alt={t.name} className="km-avatar" />
                  <div>
                    <div className="km-t-name">{t.name}</div>
                    <div className="km-stars">{'★'.repeat(t.rating)}</div>
                    <p className="km-t-text">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="km-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`km-dot ${i === activeTestimonial ? 'km-dot-active' : ''}`} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM + WHY TRUST US ── */}
      <section className="km-bottom-section">
        <div className="container km-bottom-inner">
          <div className="km-form-card glass-panel">
            <h3 className="km-form-title">Consultation Form</h3>
            <form className="km-form" onSubmit={handleSubmit}>
              <div className="km-form-row">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="km-form-row km-form-row-split">
                <div>
                  <label>Service</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option>Kundali Matching</option>
                    <option>Guna Milan</option>
                    <option>Manglik Dosha</option>
                    <option>Nadi Dosha</option>
                    <option>Bhakoot Matching</option>
                    <option>Yoni Matching</option>
                    <option>Graha Maitri</option>
                    <option>Rashi Compatibility</option>
                    <option>Gana Matri</option>
                  </select>
                </div>
                <div>
                  <label>Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="km-form-row">
                <label>Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} required />
              </div>
              <div className="km-form-row">
                <label>Message</label>
                <textarea name="message" rows={3} placeholder="Your message..." value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="km-btn-solid km-form-submit">Confirm Booking</button>
            </form>
          </div>

          <div className="km-trust-section">
            <h2 className="km-section-title" style={{ textAlign: 'center' }}>Why Trust Us?</h2>
            <div className="km-trust-cards">
              {trustPoints.map((tp, i) => (
                <div key={i} className={`km-trust-card glass-panel ${i === activeTrust ? 'km-t-active' : ''}`}>
                  <div className="km-trust-icon">{tp.icon}</div>
                  <h4 className="km-trust-title">{tp.title}</h4>
                  <p className="km-trust-desc">{tp.desc}</p>
                </div>
              ))}
            </div>
            <div className="km-dots">
              {trustPoints.map((_, i) => (
                <button key={i} className={`km-dot ${i === activeTrust ? 'km-dot-active' : ''}`} onClick={() => setActiveTrust(i)} aria-label={`Trust point ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
