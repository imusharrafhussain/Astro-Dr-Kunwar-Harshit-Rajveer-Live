import FestivalPujaLayout from './FestivalPujaLayout'
import './FestivalPujaLayout.css'
import heroImg from '../../assets/chhath puja.png'
import sideImg from '../../assets/chhath puja 2.png'
import ritualImg from '../../assets/puja/diyas-row.jpg'

const PACKAGES = [
  { id: 'basic', name: 'Chhath Basic', price: 2100, duration: '90 min', features: ['Surya arghya sankalp', 'Basic mantra paath', 'Essential samagri guidance', 'Aarti and blessings'] },
  { id: 'standard', name: 'Chhath Plus', price: 5100, duration: '3 hours', popular: true, features: ['Full vrat-vidhi support', 'Sunset and sunrise ritual guidance', 'Family wellbeing sankalp', 'Extended paath', 'Video support'] },
  { id: 'premium', name: 'Maha Chhath Anushthan', price: 11100, duration: 'Half day', features: ['Senior pandit support', 'Advanced Vedic recitations', 'Prosperity and child wellbeing sankalp', 'Detailed remedy notes', 'Prasad dispatch'] },
]

export default function ChhathPujaPage() {
  return (
    <FestivalPujaLayout
      pujaId="chhath-puja"
      pujaName="Chhath Puja"
      themeClass="festival-chhath"
      heroImage={heroImg}
      sideImage={sideImg}
      ritualImage={ritualImg}
      heroTagline="Sacred Solar Vrat"
      heroTitle="Chhath Puja"
      heroSubtitle="Offer devotion to Surya Dev for family wellbeing, long life, discipline, and deep spiritual purification."
      aboutTitle="What is Chhath Puja?"
      aboutParagraphs={[
        'Chhath is a strict and highly revered vrat dedicated to the Sun God, observed with purity, fasting, and water offerings.',
        'The puja is performed for health, children’s welfare, family prosperity, and fulfillment of heartfelt prayers.',
      ]}
      whyItems={[
        { title: 'Family Wellbeing', desc: 'Performed for children’s health, family protection, and long-term peace.' },
        { title: 'Spiritual Discipline', desc: 'The vrat strengthens willpower, devotion, and inner purity.' },
        { title: 'Wish Fulfillment', desc: 'Devotees undertake Chhath sankalp for major life intentions and blessings.' },
      ]}
      benefits={[
        { title: 'Health and Vitality', desc: 'Encourages discipline and prayer-led wellbeing for body and mind.' },
        { title: 'Emotional Strength', desc: 'Builds patience, calmness, and devotion through structured observance.' },
        { title: 'Prosperity Vibe', desc: 'Invites positivity, gratitude, and abundance into the household.' },
        { title: 'Protection', desc: 'Strengthens family energy against negativity and repeated setbacks.' },
        { title: 'Harmony', desc: 'Improves bonding, respect, and shared spiritual focus in family life.' },
        { title: 'Divine Connection', desc: 'Deepens connection with Surya consciousness and tradition.' },
      ]}
      processSteps={[
        { title: 'Sankalp', desc: 'Devotee details and intention are taken for the vrat.' },
        { title: 'Purification', desc: 'Shuddhi rituals and disciplined preparation are performed.' },
        { title: 'Evening Arghya', desc: 'Offering to the setting Sun with mantra and devotion.' },
        { title: 'Morning Arghya', desc: 'Final offering to rising Sun for completion of sankalp.' },
        { title: 'Aarti and Prasad', desc: 'Closing prayers and blessings distribution.' },
      ]}
      packages={PACKAGES}
    />
  )
}
