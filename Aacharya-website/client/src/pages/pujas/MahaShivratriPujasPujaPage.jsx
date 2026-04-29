import { useEffect, useState } from "react";
import { Award, Check, Flame, HeartHandshake, ShieldCheck, Sparkles, Moon, Users, Flower2 } from "lucide-react";
import { FiUser, FiPhone, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import "./MahaShivratriFestivalStyle.css";
import heroImg from "../../assets/puja/shiva-hero.jpg";
import ritualImg from "../../assets/puja/shiva-ritual.jpg";
import samagriImg from "../../assets/puja/shiva-samagri.jpg";

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    tag: "Sacred Start",
    price: 2100,
    features: [
      "1 verified pandit",
      "Rudrabhishek (60 mins)",
      "108 Om Namah Shivaya jaap",
      "Sankalp in your name and gotra",
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
      "Rudrabhishek + Laghu Havan",
      "1008 Mahamrityunjaya jaap",
      "Family sankalp and blessings",
      "Live video of complete puja",
      "Prasad courier",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tag: "Maha Seva",
    price: 11100,
    features: [
      "4 senior Vedic pandits",
      "Maha Rudrabhishek and Havan",
      "11 mala Mahamrityunjaya chant",
      "Bhasma and Bilva special offering",
      "HD recording + consultation",
      "Rudraksha and prasad courier",
    ],
  },
];

const REASONS = [
  { icon: Moon, title: "Powerful Night", text: "Maha Shivratri is considered the most spiritually charged night for Shiva upasana." },
  { icon: ShieldCheck, title: "Protection", text: "Seek protection from fear, negativity, and life obstacles through sacred mantras." },
  { icon: HeartHandshake, title: "Family Harmony", text: "Pray for health, peace, and unity in family and marriage." },
  { icon: Sparkles, title: "Spiritual Growth", text: "Deepen meditation and inner transformation through Vedic rituals." },
];

const BENEFITS = [
  { title: "Karma Shuddhi", text: "Rudrabhishek helps cleanse accumulated karmic burden." },
  { title: "Health & Longevity", text: "Mahamrityunjaya mantra is chanted for healing and long life." },
  { title: "Mental Peace", text: "Shiva sadhana reduces stress and creates inner calm." },
  { title: "Career Stability", text: "Blessings are sought for focus, growth, and removal of delays." },
  { title: "Marital Balance", text: "Auspicious for marital harmony and emotional bonding." },
  { title: "Divine Grace", text: "Invokes Shiva kripa for overall spiritual and material balance." },
];

const PROCESS = [
  { n: "01", title: "Sankalp", text: "Pandit takes your name, gotra, and puja intention." },
  { n: "02", title: "Ganesh & Kalash Sthapana", text: "Ritual begins with Vighnaharta invocation and kalash setup." },
  { n: "03", title: "Rudrabhishek", text: "Shivling abhishek with milk, curd, honey, ghee, and Gangajal." },
  { n: "04", title: "Bilva Archana", text: "Sacred Bilva leaves offered with Shiva mantras." },
  { n: "05", title: "Mahamrityunjaya Jaap", text: "Dedicated mantra chanting for health, peace, and protection." },
  { n: "06", title: "Aarti & Ashirwad", text: "Final aarti, prasad, and blessing for your family." },
];

export default function MahaShivratriPujasPujaPage() {
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
    document.body.classList.add("shiv-page-active");
    return () => document.body.classList.remove("shiv-page-active");
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const today = new Date().toISOString().split("T")[0];

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
    <div className="shiv-page">
      <section className="shiv-hero">
        <div className="shiv-hero-bg">
          <img src={heroImg} alt="Maha Shivratri Puja with Lord Shiva" />
          <div className="shiv-hero-overlay" />
          <div className="shiv-moon-glow" aria-hidden="true" />
        </div>

        <div className="shiv-container shiv-hero-inner">
          <div className="shiv-pill">
            <Sparkles size={16} /> <span>Maha Shivratri • Night of Shiva</span>
          </div>
          <p className="shiv-mantra">om namah shivaya</p>
          <h1 className="shiv-h1">
            Maha Shivratri <span>Puja</span>
          </h1>
          <p className="shiv-hero-p">
            Perform authentic Vedic Maha Shivratri puja for protection, peace, and spiritual upliftment under the guidance of verified pandits.
          </p>
          <div className="shiv-hero-actions">
            <button type="button" className="shiv-btn shiv-btn-gold" onClick={scrollToBooking}>
              Book This Puja Now
            </button>
            <a className="shiv-link" href="#about">
              Learn the ritual
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="shiv-section shiv-about">
        <div className="shiv-container shiv-grid-2">
          <div className="shiv-img-wrap">
            <img src={ritualImg} alt="Rudrabhishek ritual for Maha Shivratri" className="shiv-img" loading="lazy" />
          </div>
          <div>
            <div className="shiv-section-heading shiv-left">
              <div className="shiv-eyebrow">About Maha Shivratri</div>
              <h2 className="shiv-h2">
                Actual significance of <span className="shiv-gold-text">Maha Shivratri Puja</span>
              </h2>
            </div>
            <div className="shiv-copy">
              <p>
                Maha Shivratri is one of the most sacred festivals dedicated to Lord Shiva. It symbolizes spiritual awakening, discipline, and surrender to the divine.
              </p>
              <p>
                Devotees observe vrat, perform night vigil, and offer Rudrabhishek to seek freedom from fear, inner negativity, and karmic burden.
              </p>
              <p>
                This puja is especially performed for health, protection, family harmony, and progress in life while staying aligned with dharma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shiv-section shiv-reasons">
        <div className="shiv-container">
          <div className="shiv-section-heading">
            <div className="shiv-eyebrow">Why This Puja</div>
            <h2 className="shiv-h2">Why devotees perform Maha Shivratri Puja</h2>
          </div>
          <div className="shiv-reasons-grid">
            {REASONS.map((item) => (
              <div key={item.title} className="shiv-reason-card">
                <div className="shiv-reason-icon">
                  <item.icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shiv-section shiv-benefits">
        <div className="shiv-container">
          <div className="shiv-section-heading">
            <div className="shiv-eyebrow">Blessings</div>
            <h2 className="shiv-h2">
              Key benefits of <span className="shiv-gold-text">Maha Shivratri</span>
            </h2>
          </div>
          <div className="shiv-benefit-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="shiv-benefit">
                <div className="shiv-check">
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

      <section className="shiv-section shiv-process">
        <div className="shiv-container">
          <div className="shiv-section-heading">
            <div className="shiv-eyebrow shiv-eyebrow-light">Ritual Process</div>
            <h2 className="shiv-h2 shiv-light">
              Step-by-step <span className="shiv-gold-text">Puja Vidhi</span>
            </h2>
          </div>
          <div className="shiv-process-grid">
            <div>
              {PROCESS.map((step) => (
                <div key={step.n} className="shiv-step">
                  <div className="shiv-step-n">{step.n}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="shiv-samagri-card">
              <img src={samagriImg} alt="Maha Shivratri puja samagri setup" loading="lazy" />
              <div className="shiv-samagri-chip">
                <Flame size={18} /> <span>Authentic Samagri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shiv-section shiv-packages">
        <div className="shiv-container">
          <div className="shiv-section-heading">
            <div className="shiv-eyebrow">Packages</div>
            <h2 className="shiv-h2">
              Choose your <span className="shiv-gold-text">Puja Seva</span>
            </h2>
          </div>
          <div className="shiv-pack-grid">
            {PACKAGES.map((p) => (
              <div key={p.id} className={`shiv-pack ${p.featured ? "featured" : ""}`} onClick={() => setSelectedPkg(p.id)} role="button" tabIndex={0}>
                {p.featured && <div className="shiv-chip">Most Chosen</div>}
                <div className="shiv-center">
                  <p className="shiv-pack-tag">{p.tag}</p>
                  <h3 className="shiv-pack-name">{p.name}</h3>
                  <div className="shiv-pack-price">
                    <span>Rs</span>
                    <span>{p.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="shiv-divider" />
                <ul className="shiv-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={2.5} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className={`shiv-btn ${p.featured ? "shiv-btn-gold" : "shiv-btn-dark"}`} onClick={scrollToBooking}>
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="shiv-section shiv-booking">
        <div className="shiv-container">
          <div className="shiv-section-heading">
            <div className="shiv-eyebrow">Book Now</div>
            <h2 className="shiv-h2">
              Reserve your <span className="shiv-gold-text">Maha Shivratri Puja</span>
            </h2>
          </div>
          <div className="shiv-book-card">
            {done ? (
              <div className="shiv-success">
                <div className="shiv-check" style={{ margin: "0 auto 10px" }}>
                  <FiCheck size={18} />
                </div>
                <h3>Booking Submitted Successfully</h3>
                <p>Our support team will call you shortly to confirm your selected package and slot.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="shiv-form-grid">
                  <div className="shiv-form-group">
                    <label>
                      <FiUser /> Full Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="shiv-form-group">
                    <label>
                      <FiPhone /> Phone *
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98XXXXXXXX" required />
                  </div>
                  <div className="shiv-form-group">
                    <label>
                      <FiMapPin /> Address / City
                    </label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="City / Town" />
                  </div>
                  <div className="shiv-form-group">
                    <label>Gotra (optional)</label>
                    <input name="gotra" value={form.gotra} onChange={handleChange} placeholder="e.g. Kashyap" />
                  </div>
                  <div className="shiv-form-group">
                    <label>
                      <FiCalendar /> Puja Date *
                    </label>
                    <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="shiv-form-group">
                    <label>
                      <FiClock /> Preferred Time *
                    </label>
                    <input name="time" type="time" value={form.time} onChange={handleChange} required />
                  </div>
                  <div className="shiv-form-group shiv-full">
                    <label>
                      <FiMessageSquare /> Sankalp / Special Message
                    </label>
                    <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Share your puja intention..." />
                  </div>
                  <div className="shiv-form-group shiv-full">
                    <label>Selected Package</label>
                    <input value={PACKAGES.find((p) => p.id === selectedPkg)?.name || ""} readOnly />
                  </div>
                </div>
                <button type="submit" className="shiv-btn shiv-btn-gold" style={{ width: "100%", marginTop: 14 }}>
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="shiv-footer">
        <div className="shiv-container">
          <div className="shiv-footer-grid">
            <div className="shiv-footer-card">
              <div className="shiv-footer-badge">
                <ShieldCheck size={30} />
              </div>
              <h3>Verified Pandits</h3>
              <p>Experienced Vedic pandits trained in Shiva rituals and mantras.</p>
            </div>
            <div className="shiv-footer-card">
              <div className="shiv-footer-badge">
                <Users size={30} />
              </div>
              <h3>10,000+ Families</h3>
              <p>Trusted by devotees across India for authentic puja experiences.</p>
            </div>
            <div className="shiv-footer-card">
              <div className="shiv-footer-badge">
                <Award size={30} />
              </div>
              <h3>100% Traditional</h3>
              <p>No shortcuts - rituals are performed strictly per Vedic vidhi.</p>
            </div>
          </div>
          <div className="shiv-footer-bottom">
            <p>har har mahadev</p>
            <small>may Lord Shiva bless all beings</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

