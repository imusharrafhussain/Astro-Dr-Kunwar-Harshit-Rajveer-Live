import FestivalPujaLayout from './FestivalPujaLayout'
import './FestivalPujaLayout.css'
import heroImg from '../../assets/karwa chauth pooja.jpg.jpeg'
import sideImg from '../../assets/karwa chauth pooja 2.jpg.jpeg'
import ritualImg from '../../assets/puja/puja-samagri.jpg'

const PACKAGES = [
  { id: 'basic', name: 'Karwa Basic', price: 2100, duration: '75 min', features: ['Karwa sankalp', 'Basic vrat katha paath', 'Traditional aarti', 'Blessing mantra'] },
  { id: 'standard', name: 'Karwa Plus', price: 5100, duration: '2.5 hours', popular: true, features: ['Complete katha and puja vidhi', 'Chandra arghya guidance', 'Marital harmony sankalp', 'Family blessing ritual', 'Video support'] },
  { id: 'premium', name: 'Maha Karwa Seva', price: 11100, duration: 'Half day', features: ['Senior pandit team', 'Extended couple blessing rituals', 'Special suhag protection sankalp', 'Auspicious remedy guidance', 'Prasad dispatch'] },
]

export default function KarwaChauthPujaPage() {
  return (
    <FestivalPujaLayout
      pujaId="karwa-chauth-puja"
      pujaName="Karwa Chauth Puja"
      themeClass="festival-karwa"
      heroImage={heroImg}
      sideImage={sideImg}
      ritualImage={ritualImg}
      heroTagline="Sacred Marital Vrat"
      heroTitle="Karwa Chauth Puja"
      heroSubtitle="Perform traditional Karwa Chauth puja for marital harmony, long life blessings, and emotional bonding."
      aboutTitle="What is Karwa Chauth Puja?"
      aboutParagraphs={[
        'Karwa Chauth is a revered vrat where prayers are offered for the wellbeing and longevity of one’s spouse.',
        'The puja includes sankalp, katha paath, aarti, and moon offering rituals as per tradition.',
      ]}
      whyItems={[
        { title: 'Marital Harmony', desc: 'Performed to strengthen trust, respect, and emotional connection between partners.' },
        { title: 'Long Life Blessings', desc: 'Devotees seek divine blessings for spouse wellbeing and protection.' },
        { title: 'Family Stability', desc: 'The ritual supports peace, care, and positive energy in married life.' },
      ]}
      benefits={[
        { title: 'Emotional Closeness', desc: 'Improves understanding and warmth within the relationship.' },
        { title: 'Protective Blessings', desc: 'Invokes divine care for health, safety, and stability.' },
        { title: 'Auspicious Married Life', desc: 'Enhances positivity and grace in long-term companionship.' },
        { title: 'Peace at Home', desc: 'Encourages calm family atmosphere and fewer recurring conflicts.' },
        { title: 'Spiritual Merit', desc: 'Vrat observance strengthens devotion and inner discipline.' },
        { title: 'Confidence in Bond', desc: 'Reinforces mutual faith and emotional security in marriage.' },
      ]}
      processSteps={[
        { title: 'Sankalp', desc: 'Name, gotra, and prayer intention are offered.' },
        { title: 'Gauri-Ganesh Invocation', desc: 'Auspicious deities are invoked before main ritual.' },
        { title: 'Karwa Katha Paath', desc: 'Traditional vrat story and mantra recitation are performed.' },
        { title: 'Aarti and Chandra Arghya', desc: 'Moon offering ritual and final devotional closure.' },
        { title: 'Blessing Distribution', desc: 'Prayers completed with blessing mantra and prasad.' },
      ]}
      packages={PACKAGES}
    />
  )
}
