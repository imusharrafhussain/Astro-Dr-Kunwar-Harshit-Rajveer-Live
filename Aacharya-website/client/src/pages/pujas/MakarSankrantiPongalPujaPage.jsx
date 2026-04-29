import FestivalPujaLayout from './FestivalPujaLayout'
import './FestivalPujaLayout.css'
import heroImg from '../../assets/makkar sakranti.png'
import sideImg from '../../assets/makkar sakranti 2.png'
import ritualImg from '../../assets/puja/pandit-ritual.png'

const PACKAGES = [
  { id: 'basic', name: 'Sankranti Basic', price: 2100, duration: '75 min', features: ['Surya sankalp', 'Til-gud offering', 'Basic havan', 'Prasad blessing'] },
  { id: 'standard', name: 'Sankranti Plus', price: 5100, duration: '2.5 hours', popular: true, features: ['Complete Surya puja', 'Pongal gratitude ritual', 'Family prosperity sankalp', 'Havan with grains', 'Video recording'] },
  { id: 'premium', name: 'Maha Sankranti Anushthan', price: 11100, duration: 'Half day', features: ['Senior pandit team', 'Extended Vedic chanting', 'Harvest prosperity rituals', 'Remedy guidance', 'Prasad courier'] },
]

export default function MakarSankrantiPongalPujaPage() {
  return (
    <FestivalPujaLayout
      pujaId="makar-sankranti-pongal-puja"
      pujaName="Makar Sankranti / Pongal"
      themeClass="festival-makar"
      heroImage={heroImg}
      sideImage={sideImg}
      ritualImage={ritualImg}
      heroTagline="Harvest & Solar Festival"
      heroTitle="Makar Sankranti / Pongal Puja"
      heroSubtitle="Celebrate Surya transition with sacred gratitude rituals for health, growth, prosperity, and family peace."
      aboutTitle="What is Makar Sankranti / Pongal Puja?"
      aboutParagraphs={[
        'This puja marks the auspicious transition of the Sun into Capricorn and the beginning of Uttarayan.',
        'It is performed to honor Surya Dev and to invite abundance, strong health, and successful new beginnings.',
      ]}
      whyItems={[
        { title: 'Solar Blessings', desc: 'People perform this puja to receive Surya grace for vitality and confidence.' },
        { title: 'Harvest Gratitude', desc: 'It expresses thanks for food, livelihood, and seasonal abundance.' },
        { title: 'Auspicious Start', desc: 'Devotees begin new plans in this period for stronger outcomes.' },
      ]}
      benefits={[
        { title: 'Career Momentum', desc: 'Supports promotions, business movement, and public recognition.' },
        { title: 'Financial Stability', desc: 'Brings steadier cash flow and reduction in recurring money stress.' },
        { title: 'Energy and Health', desc: 'Encourages physical strength, immunity, and optimistic mindset.' },
        { title: 'Family Harmony', desc: 'Improves unity, gratitude, and mutual support among family members.' },
        { title: 'Positive Home Energy', desc: 'Removes stagnation and creates a more auspicious home vibe.' },
        { title: 'Spiritual Balance', desc: 'Aligns life rhythm with discipline, devotion, and gratitude.' },
      ]}
      processSteps={[
        { title: 'Sankalp', desc: 'Intention and devotee details are offered before Surya Dev.' },
        { title: 'Kalash and Invocation', desc: 'Sacred setup and solar mantra invocation are performed.' },
        { title: 'Offering Rituals', desc: 'Til, jaggery, grains, and seasonal offerings are made with mantras.' },
        { title: 'Havan', desc: 'Fire ritual for purification and prosperity activation.' },
        { title: 'Aarti and Blessings', desc: 'Completion with aarti and prasad for the family.' },
      ]}
      packages={PACKAGES}
    />
  )
}
