import loveReportImg from '../assets/lovereport.webp'
import lifeJourneyImg from '../assets/lifejourney.webp'
import numberAnalysisImg from '../assets/numberanalysis.png'
import govtJobImg from '../assets/govtjob.webp'
import lifeChangingReportImg from '../assets/lifechangingreport.webp'
import wealthReportImg from '../assets/wealth&report.webp'
import kundaliMatchingImg from '../assets/kundlimatching report.webp'
import mahaComboImg from '../assets/maha combo.webp'

export const REPORTS_CATALOG = [
    {
        id: 'love-relationship',
        shortTitle: 'Love Report',
        title: 'Love Report',
        desc: 'Detailed insight into relationship compatibility, emotional bonding, and future love potential.',
        price: '₹499',
        image: loveReportImg,
        iconKey: 'heart',
    },
    {
        id: 'life-journey',
        shortTitle: 'Life Journey',
        title: 'Life Journey Report',
        desc: 'A complete roadmap of important life phases, karmic patterns, and personal growth cycles.',
        price: '₹799',
        image: lifeJourneyImg,
        iconKey: 'briefcase',
    },
    {
        id: 'name-number-analysis',
        shortTitle: 'Name Number',
        title: 'Name Number Analysis Report',
        desc: 'Numerology-based analysis of your name and numbers to improve luck, success, and balance.',
        price: '₹999',
        image: numberAnalysisImg,
        iconKey: 'dollar',
    },
    {
        id: 'government-job',
        shortTitle: 'Govt Job',
        title: 'Government Job Report',
        desc: 'Focused report for competitive exam timing, job opportunity periods, and career stability factors.',
        price: '₹1199',
        image: govtJobImg,
        iconKey: 'sun',
    },
    {
        id: 'life-changing',
        shortTitle: 'Life Change',
        title: 'Life Changing Report',
        desc: 'Transformative guidance for major life decisions, obstacles, and breakthrough opportunities.',
        price: '₹1399',
        image: lifeChangingReportImg,
        iconKey: 'compass',
    },
    {
        id: 'wealth-report',
        shortTitle: 'Wealth',
        title: 'Wealth Report',
        desc: 'Comprehensive wealth forecast including income growth, savings potential, and prosperity remedies.',
        price: '₹899',
        image: wealthReportImg,
        iconKey: 'moon',
    },
    {
        id: 'kundali-matching',
        shortTitle: 'Kundali Match',
        title: 'Kundali Matching Report',
        desc: 'Vedic compatibility analysis with guna score, dosha checks, and relationship harmony insights.',
        price: '₹1499',
        image: kundaliMatchingImg,
        iconKey: 'users',
    },
    {
        id: 'maha-combo',
        shortTitle: 'Maha Combo',
        title: 'Maha Combo Report',
        desc: 'All-in-one premium report combining love, career, wealth, and life guidance in one detailed package.',
        price: '₹1799',
        image: mahaComboImg,
        iconKey: 'trending',
    },
]

export const HERO_FLOATING_IDS = ['love-relationship', 'life-journey', 'name-number-analysis', 'government-job']

export function getReportById(id) {
    return REPORTS_CATALOG.find((r) => r.id === id)
}
