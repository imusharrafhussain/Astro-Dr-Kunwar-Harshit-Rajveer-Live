import { useEffect, useState } from "react";
import { Award, Check, BookOpen, Brain, Music, PenTool, Sparkles, ShieldCheck, Users, Flower2 } from "lucide-react";
import { FiUser, FiPhone, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import "./SaraswatiFestivalStyle.css";
import heroImg from "../../assets/puja/saraswati-hero.jpg";
import samagriImg from "../../assets/puja/puja-samagri.jpg";

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    tag: "Vidya Aarambh",
    price: 2100,
    features: [
      "1 verified pandit",
      "Saraswati avahan puja",
      "108 Saraswati mantra jaap",
      "Pustak and pen blessing",
      "Digital prasad photo",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tag: "Most Chosen",
    price: 5100,
    featured: true,
    features: [
      "2 verified pandits",
      "Complete Saraswati puja vidhi",
      "1008 mantra jaap",
      "Family sankalp and aarti",
      "Live video of full puja",
      "Prasad courier",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tag: "Maha Vidya Seva",
    price: 11100,
    features: [
      "4 senior pandits",
      "Extended puja + havan",
      "Special vidya and buddhi sankalp",
      "Yantra energization",
      "HD recording + guidance call",
      "Blessed yantra and prasad courier",
    ],
  },
];

const REASONS = [
  { icon: BookOpen, title: "Academic Success", text: "Performed for exam preparation, admissions, and better concentration." },
  { icon: Brain, title: "Clarity & Memory", text: "Seek blessings for stronger memory, focus, and wise decision making." },
  { icon: Music, title: "Arts & Creativity", text: "Ideal for musicians, writers, speakers, and creative professionals." },
  { icon: PenTool, title: "New Learning Start", text: "Best for beginning studies, courses, or a new intellectual journey." },
];

const BENEFITS = [
  { title: "Improved Concentration", text: "Helps students and professionals maintain focused attention." },
  { title: "Speech & Communication", text: "Traditionally done for clarity in speech and confidence in expression." },
  { title: "Wisdom in Decisions", text: "Invokes sattvic thinking and better judgment in life and career." },
  { title: "Creative Excellence", text: "Supports growth in music, writing, teaching, and artistic work." },
  { title: "Calm Learning Mindset", text: "Reduces stress and anxiety around performance and exams." },
  { title: "Auspicious New Beginnings", text: "Strongly recommended during Vasant Panchami and vidyarambh." },
];

const PROCESS = [
  { n: "01", title: "Sankalp", text: "Pandit takes your name, gotra, and prayer intention." },
  { n: "02", title: "Ganesh & Kalash Sthapana", text: "Puja begins with auspicious invocation and kalash setup." },
  { n: "03", title: "Saraswati Avahan", text: "Goddess Saraswati is invoked with Vedic mantras and offerings." },
  { n: "04", title: "Vidya Mantra Jaap", text: "Dedicated mantra chanting for wisdom, focus, and success." },
  { n: "05", title: "Pustak / Kalam Puja", text: "Books, pens, and instruments are blessed for learning growth." },
  { n: "06", title: "Aarti & Ashirwad", text: "Final aarti and blessings for lifelong knowledge and progress." },
];

export default function SaraswatiPujaPage() {
  const [selectedPkg, setSelectedPkg] = useState("standard");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    gotra: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    document.body.classList.add("sw-page-active");
    return () => document.body.classList.remove("sw-page-active");
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields.");
      return;
    }
    setDone(true);
    toast.success("Booking received. Our team will contact you shortly.");
  };

  const scrollToBooking = () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sw-page">
      <section className="sw-hero">
        <div className="sw-hero-bg">
          <img src={heroImg} alt="Saraswati Puja with Devi Saraswati symbolism" />
          <div className="sw-hero-overlay" />
          <div className="sw-halo" aria-hidden="true" />
        </div>

        <div className="sw-container sw-hero-inner">
          <div className="sw-pill">
            <Sparkles size={16} /> <span>Vasant Panchami • Vidya Blessings</span>
          </div>
          <p className="sw-mantra">om aim saraswatyai namah</p>
          <h1 className="sw-h1">
            Saraswati <span>Puja</span>
          </h1>
          <p className="sw-hero-p">
            Invoke Maa Saraswati for knowledge, memory, communication, and success in studies, arts, and career.
          </p>
          <div className="sw-hero-actions">
            <button type="button" className="sw-btn sw-btn-gold" onClick={scrollToBooking}>
              Book This Puja Now
            </button>
            <a className="sw-link" href="#about">
              Learn the ritual
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="sw-section sw-about">
        <div className="sw-container sw-grid-2">
          <div>
            <div className="sw-section-heading sw-left">
              <div className="sw-eyebrow">About Saraswati Puja</div>
              <h2 className="sw-h2">
                Correct spiritual meaning of <span className="sw-gold-text">Saraswati Puja</span>
              </h2>
            </div>
            <div className="sw-copy">
              <p>
                Saraswati Puja is dedicated to Maa Saraswati, the goddess of knowledge, speech, wisdom, music, and fine arts.
              </p>
              <p>
                It is traditionally performed on Vasant Panchami and during important academic or creative milestones to seek excellence in learning.
              </p>
              <p>
                Students, teachers, artists, and professionals perform this puja for clarity of mind, success in studies, and graceful expression.
              </p>
            </div>
          </div>
          <div className="sw-img-wrap">
            <img src={samagriImg} alt="Saraswati puja samagri with books and sacred offerings" className="sw-img" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sw-section sw-reasons">
        <div className="sw-container">
          <div className="sw-section-heading">
            <div className="sw-eyebrow">Why This Puja</div>
            <h2 className="sw-h2">Why families and students perform Saraswati Puja</h2>
          </div>
          <div className="sw-reasons-grid">
            {REASONS.map((item) => (
              <div key={item.title} className="sw-reason-card">
                <div className="sw-reason-icon">
                  <item.icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sw-section sw-benefits">
        <div className="sw-container">
          <div className="sw-section-heading">
            <div className="sw-eyebrow">Blessings</div>
            <h2 className="sw-h2">
              Benefits of <span className="sw-gold-text">Maa Saraswati</span> worship
            </h2>
          </div>
          <div className="sw-benefit-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="sw-benefit">
                <div className="sw-check">
                  <Check size={18} strokeWidth={3} />
                </div>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sw-section sw-process">
        <div className="sw-container">
          <div className="sw-section-heading">
            <div className="sw-eyebrow sw-eyebrow-light">Ritual Process</div>
            <h2 className="sw-h2 sw-light">
              Step-by-step <span className="sw-gold-text">Saraswati Puja Vidhi</span>
            </h2>
          </div>
          <div className="sw-process-grid">
            <div>
              {PROCESS.map((step) => (
                <div key={step.n} className="sw-step">
                  <div className="sw-step-n">{step.n}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sw-highlight-card">
              <div className="sw-highlight-badge">
                <Flower2 size={18} /> <span>Vidya Sankalp</span>
              </div>
              <p>
                During the puja, books, notebooks, pens, and musical instruments are blessed for growth in education and creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sw-section sw-packages">
        <div className="sw-container">
          <div className="sw-section-heading">
            <div className="sw-eyebrow">Packages</div>
            <h2 className="sw-h2">
              Choose your <span className="sw-gold-text">Saraswati Seva</span>
            </h2>
          </div>
          <div className="sw-pack-grid">
            {PACKAGES.map((p) => (
              <div key={p.id} className={`sw-pack ${p.featured ? "featured" : ""}`} onClick={() => setSelectedPkg(p.id)} role="button" tabIndex={0}>
                {p.featured && <div className="sw-chip">Most Chosen</div>}
                <div className="sw-center">
                  <p className="sw-pack-tag">{p.tag}</p>
                  <h3 className="sw-pack-name">{p.name}</h3>
                  <div className="sw-pack-price">
                    <span>Rs</span>
                    <span>{p.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="sw-divider" />
                <ul className="sw-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={2.5} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className={`sw-btn ${p.featured ? "sw-btn-gold" : "sw-btn-maroon"}`} onClick={scrollToBooking}>
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="sw-section sw-booking">
        <div className="sw-container">
          <div className="sw-section-heading">
            <div className="sw-eyebrow">Book Now</div>
            <h2 className="sw-h2">
              Reserve your <span className="sw-gold-text">Saraswati Puja</span>
            </h2>
          </div>
          <div className="sw-book-card">
            {done ? (
              <div className="sw-success">
                <div className="sw-check" style={{ margin: "0 auto 10px" }}>
                  <FiCheck size={18} />
                </div>
                <h3>Booking Submitted Successfully</h3>
                <p>Our team will contact you shortly to confirm your package and slot.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="sw-form-grid">
                  <div className="sw-form-group">
                    <label>
                      <FiUser /> Full Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="sw-form-group">
                    <label>
                      <FiPhone /> Phone *
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98XXXXXXXX" required />
                  </div>
                  <div className="sw-form-group">
                    <label>
                      <FiMapPin /> Address / City
                    </label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="City / Town" />
                  </div>
                  <div className="sw-form-group">
                    <label>Gotra (optional)</label>
                    <input name="gotra" value={form.gotra} onChange={handleChange} placeholder="e.g. Kashyap" />
                  </div>
                  <div className="sw-form-group">
                    <label>
                      <FiCalendar /> Puja Date *
                    </label>
                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="sw-form-group">
                    <label>
                      <FiClock /> Preferred Time *
                    </label>
                    <input name="time" type="time" value={form.time} onChange={handleChange} required />
                  </div>
                  <div className="sw-form-group sw-full">
                    <label>
                      <FiMessageSquare /> Sankalp / Special Message
                    </label>
                    <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Share your learning or exam intention..." />
                  </div>
                  <div className="sw-form-group sw-full">
                    <label>Selected Package</label>
                    <input value={PACKAGES.find((p) => p.id === selectedPkg)?.name || ""} readOnly />
                  </div>
                </div>
                <button type="submit" className="sw-btn sw-btn-gold" style={{ width: "100%", marginTop: 14 }}>
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="sw-footer">
        <div className="sw-container">
          <div className="sw-footer-grid">
            <div className="sw-footer-card">
              <div className="sw-footer-badge">
                <ShieldCheck size={30} />
              </div>
              <h3>Verified Pandits</h3>
              <p>Experienced in authentic Saraswati puja and vidya rituals.</p>
            </div>
            <div className="sw-footer-card">
              <div className="sw-footer-badge">
                <Users size={30} />
              </div>
              <h3>10,000+ Families</h3>
              <p>Trusted across India for sacred and meaningful puja services.</p>
            </div>
            <div className="sw-footer-card">
              <div className="sw-footer-badge">
                <Award size={30} />
              </div>
              <h3>100% Vedic</h3>
              <p>Rituals performed as per tradition with no shortcuts.</p>
            </div>
          </div>
          <div className="sw-footer-bottom">
            <p>jai maa saraswati</p>
            <small>may wisdom guide every step</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
