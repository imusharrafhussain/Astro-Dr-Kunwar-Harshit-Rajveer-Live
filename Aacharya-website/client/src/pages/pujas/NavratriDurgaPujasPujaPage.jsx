import FestivalPujaLayout from './FestivalPujaLayout'
import './FestivalPujaLayout.css'
import heroImg from '../../assets/navratri puja 2.png'
import sideImg from '../../assets/navratri puja.png'
import ritualImg from '../../assets/puja/pandit-ritual.png'

const PACKAGES = [
  { id: 'basic', name: 'Shakti Basic', price: 2100, duration: '90 min', features: ['Personal sankalp', 'Durga mantra paath', 'Basic samagri', 'Aarti and prasad'] },
  { id: 'standard', name: 'Shakti Plus', price: 5100, duration: '3 hours', popular: true, features: ['Complete Saptashati paath', 'Havan ritual', 'Family sankalp', 'Video recording', 'Prasad dispatch'] },
  { id: 'premium', name: 'Maha Durga Anushthan', price: 11000, duration: 'Full day', features: ['Senior pandit team', 'Extended havan', 'Kanya pujan', 'Special prosperity sankalp', 'Post-puja guidance'] },
]

export default function NavratriDurgaPujasPujaPage() {
  return (
    <FestivalPujaLayout
      pujaId="navratri-durga-pujas-puja"
      pujaName="Navratri & Durga Pujas"
      themeClass="festival-navratri"
      heroImage={heroImg}
      sideImage={sideImg}
      ritualImage={ritualImg}
      heroTagline="Shakti Utsav"
      heroTitle="Navratri Durga Puja"
      heroSubtitle="Invoke Maa Durga for protection, courage, prosperity, and family harmony through authentic Vedic worship."
      aboutTitle="What is Navratri Durga Puja?"
      aboutParagraphs={[
        'Navratri Durga Puja is a sacred nine-night worship of divine feminine energy, performed to remove obstacles and restore inner strength.',
        'The puja includes sankalp, Durga mantra recitation, havan, and aarti for spiritual protection and material progress.',
      ]}
      whyItems={[
        { title: 'Remove Negativity', desc: 'Devotees perform this puja to cleanse heavy energies from home and personal life.' },
        { title: 'Gain Strength', desc: 'Maa Durga worship builds confidence and courage during difficult phases.' },
        { title: 'Family Protection', desc: 'It is done for health, safety, and divine shielding of loved ones.' },
      ]}
      benefits={[
        { title: 'Prosperity', desc: 'Supports financial growth and abundance in household and career.' },
        { title: 'Inner Peace', desc: 'Reduces stress and emotional instability through devotional discipline.' },
        { title: 'Success', desc: 'Helps remove blockages and supports progress in key goals.' },
        { title: 'Spiritual Growth', desc: 'Deepens connection with Devi consciousness and sacred tradition.' },
        { title: 'Better Decisions', desc: 'Improves mental clarity during important life and business choices.' },
        { title: 'Auspicious Home Vibe', desc: 'Invites positive energy and balance within the family environment.' },
      ]}
      processSteps={[
        { title: 'Sankalp', desc: 'Name, gotra, and intention are offered before Maa Durga.' },
        { title: 'Kalash Sthapana', desc: 'Sacred kalash is installed to invoke divine presence.' },
        { title: 'Durga Paath', desc: 'Shastric mantra recitation is performed for blessings.' },
        { title: 'Havan', desc: 'Agni ritual with ahutis for purification and protection.' },
        { title: 'Aarti and Prasad', desc: 'Completion with aarti and blessing distribution.' },
      ]}
      packages={PACKAGES}
    />
  )
}
