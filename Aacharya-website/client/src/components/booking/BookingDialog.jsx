import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './BookingDialog.css';

// ─── Booking Schema (inline) ──────────────────────────────────────────
const ALL_SLOTS = [
  { id: '10', label: '10:00 AM', period: 'morning' },
  { id: '11', label: '11:00 AM', period: 'morning' },
  { id: '12', label: '12:00 PM', period: 'morning' },
  { id: '13', label: '01:00 PM', period: 'afternoon' },
  { id: '14', label: '02:00 PM', period: 'afternoon' },
  { id: '15', label: '03:00 PM', period: 'afternoon' },
  { id: '16', label: '04:00 PM', period: 'evening' },
  { id: '17', label: '05:00 PM', period: 'evening' },
  { id: '18', label: '06:00 PM', period: 'evening' },
  { id: '19', label: '07:00 PM', period: 'evening' },
  { id: '20', label: '08:00 PM', period: 'evening' },
];
const MORNING_AFTERNOON_IDS = ['10', '11', '12', '13', '14', '15'];
const EVENING_IDS = ['16', '17', '18', '19', '20'];
const MIN_OFFSET_DAYS = 3;

function hashDate(date) {
  const s = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return Math.abs(h);
}
function getLockedEveningId(date) {
  return EVENING_IDS[hashDate(date) % EVENING_IDS.length];
}
function getSlotsLeft(date, slotId) {
  return (hashDate(date) + Number(slotId)) % 3 + 1;
}
function isDateDisabled(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const earliest = new Date(today);
  earliest.setDate(today.getDate() + MIN_OFFSET_DAYS);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < earliest;
}
function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Mini Calendar Component ───────────────────────────────────────────
function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewing, setViewing] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + MIN_OFFSET_DAYS);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDay = new Date(viewing.year, viewing.month, 1).getDay();
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    setViewing(v => {
      const m = v.month === 0 ? 11 : v.month - 1;
      const y = v.month === 0 ? v.year - 1 : v.year;
      return { year: y, month: m };
    });
  };
  const nextMonth = () => {
    setViewing(v => {
      const m = v.month === 11 ? 0 : v.month + 1;
      const y = v.month === 11 ? v.year + 1 : v.year;
      return { year: y, month: m };
    });
  };

  return (
    <div className="bk-calendar">
      <div className="bk-cal-header">
        <button type="button" className="bk-cal-nav" onClick={prevMonth}>‹</button>
        <span className="bk-cal-title">{monthNames[viewing.month]} {viewing.year}</span>
        <button type="button" className="bk-cal-nav" onClick={nextMonth}>›</button>
      </div>
      <div className="bk-cal-grid">
        {dayNames.map(d => <div key={d} className="bk-cal-dayname">{d}</div>)}
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const cellDate = new Date(viewing.year, viewing.month, day);
          cellDate.setHours(0, 0, 0, 0);
          const disabled = isDateDisabled(cellDate);
          const isSelected = selected &&
            selected.getFullYear() === viewing.year &&
            selected.getMonth() === viewing.month &&
            selected.getDate() === day;
          const isToday = cellDate.getTime() === today.getTime();

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(new Date(viewing.year, viewing.month, day))}
              className={`bk-cal-day ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Details Form ──────────────────────────────────────────────
const SPECIAL_SERVICES = ["Talk to AstroHarshit Ji", "Get Live Consultation"];

const SERVICE_OPTIONS = [
  'Vedic Birth Chart Analysis',
  'Relationship & Compatibility Reading',
  'Career & Finance Forecast',
  'Numerology Life Path Reading',
  'Business Name Numerology',
  'Vastu Home Consultation',
  'Vastu Office & Commercial',
  'Gemstone Recommendation',
  'Spiritual Healing Session',
  'Puja & Ritual Guidance',
  'Business Consultation',
  'Love Report',
  'Health Consultation',
  'Career Consultation',
  'Marriage Consultation',
  'Education Consultation',
  'Finance Consultation',
  'Pregnancy Consultation',
  'Legal Consultation'
];

function DetailsForm({ defaultValues, onSubmit }) {
  const [values, setValues] = useState({
    fullName: defaultValues?.fullName || '',
    phone: defaultValues?.phone || '',
    email: defaultValues?.email || '',
    address: defaultValues?.address || '',
    service: defaultValues?.service || '',
    subject: defaultValues?.subject || '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const e = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 2)
      e.fullName = 'Please enter your full name';
    if (!/^[6-9]\d{9}$/.test(values.phone.trim()))
      e.phone = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = 'Enter a valid email address';
    if (!values.address.trim() || values.address.trim().length < 8)
      e.address = 'Please share a complete address';
    if (!values.service)
      e.service = 'Please select a service';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 850));
    setSubmitting(false);
    onSubmit(values);
  };

  const field = (id, label, icon, type = 'text', placeholder = '', optional = false) => (
    <div className="bk-field">
      <label className="bk-label" htmlFor={id}>
        <span className="bk-label-icon">{icon}</span>
        {label}
        {optional && <span className="bk-optional">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={values[id]}
        onChange={ev => setValues(v => ({ ...v, [id]: ev.target.value }))}
        className={`bk-input ${errors[id] ? 'error' : ''}`}
        maxLength={id === 'phone' ? 10 : undefined}
        inputMode={id === 'phone' ? 'numeric' : undefined}
      />
      {errors[id] && <p className="bk-error">{errors[id]}</p>}
    </div>
  );

  return (
    <form className="bk-form" onSubmit={handleSubmit}>
      {field('fullName', 'Full Name', '👤', 'text', 'e.g. Your Name')}
      <div className="bk-row-2">
        {field('phone', 'Phone Number', '📱', 'text', '10-digit mobile')}
        {field('email', 'Email', '✉️', 'email', 'you@example.com')}
      </div>
      <div className="bk-field">
        <label className="bk-label" htmlFor="address">
          <span className="bk-label-icon">📍</span> Address
        </label>
        <textarea
          id="address"
          rows={2}
          placeholder="House / Street / City"
          value={values.address}
          onChange={ev => setValues(v => ({ ...v, address: ev.target.value }))}
          className={`bk-input bk-textarea ${errors.address ? 'error' : ''}`}
        />
        {errors.address && <p className="bk-error">{errors.address}</p>}
      </div>
      
      {SPECIAL_SERVICES.includes(values.service) ? (
        <div className="bk-field">
          <label className="bk-label" htmlFor="service-fixed">
            <span className="bk-label-icon">🕉️</span> Service
          </label>
          <input
            id="service-fixed"
            type="text"
            value={values.service}
            readOnly
            className="bk-input bk-readonly"
          />
        </div>
      ) : (
        <div className="bk-field" ref={dropdownRef}>
          <label className="bk-label" htmlFor="service">
            <span className="bk-label-icon">🕉️</span> Select Service
          </label>
          <div 
            className={`bk-custom-select ${errors.service ? 'error' : ''} ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="bk-custom-select-value">
              {values.service || <span className="bk-placeholder">Choose a service...</span>}
            </div>
            <span className="bk-custom-select-arrow">▼</span>
            
            {isDropdownOpen && (
              <div className="bk-custom-select-dropdown">
                <div 
                  className={`bk-custom-select-option ${!values.service ? 'selected' : ''}`}
                  onClick={() => setValues(v => ({ ...v, service: '' }))}
                >
                  Choose a service...
                </div>
                {SERVICE_OPTIONS.map(s => (
                  <div 
                    key={s} 
                    className={`bk-custom-select-option ${values.service === s ? 'selected' : ''}`}
                    onClick={() => setValues(v => ({ ...v, service: s }))}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.service && <p className="bk-error">{errors.service}</p>}
        </div>
      )}

      {field('subject', 'Subject of Consultation', '✨', 'text', 'e.g. Career, Marriage, Health…', true)}

      <button type="submit" className="bk-btn-primary" disabled={submitting}>
        {submitting
          ? <><span className="bk-spinner" /> Verifying details…</>
          : 'Continue to Slot Selection →'}
      </button>
      <p className="bk-hint">Limited slots available — secure yours now.</p>
    </form>
  );
}

// ─── Step 2: Slot Picker ───────────────────────────────────────────────
function SlotPicker({ details, onConfirm }) {
  const [date, setDate] = useState(null);
  const [slotId, setSlotId] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState(null);

  const lockedEvening = date ? getLockedEveningId(date) : null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSlotClick = (id, locked) => {
    if (locked) {
      showToast('This slot is already fully booked. Please choose another time.');
      return;
    }
    setSlotId(id);
  };

  const handleConfirm = async () => {
    if (!date || !slotId) return;
    setConfirming(true);
    const slot = ALL_SLOTS.find(s => s.id === slotId);

    try {
      const payload = {
        name: details.fullName,
        email: details.email,
        phone: details.phone,
        address: details.address,
        service: details.service,
        subject: details.subject,
        preferredDate: date.toISOString(),
        preferredTime: slot.label,
      };

      let API_BASE = import.meta.env.VITE_API_URL || 'https://dr-kunwar-harshit-rajveer.onrender.com/api';
      API_BASE = API_BASE.replace(/\/$/, '');
      if (!API_BASE.endsWith('/api')) {
        API_BASE += '/api';
      }
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to book appointment. Please try again.');
      }
      
      onConfirm({ date, slotId, slotLabel: slot.label });
    } catch (err) {
      showToast(err.message || 'Error occurred while booking slot.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bk-form">
      {toast && <div className="bk-toast">{toast}</div>}

      <div className="bk-demand-banner">
        <span className="bk-fire">🔥</span>
        <p><strong>High demand:</strong> all slots for the next 2 days are fully booked. Earliest availability shown below.</p>
      </div>

      <div className="bk-field">
        <label className="bk-label">
          <span className="bk-label-icon">📅</span> Select a date
        </label>
        <MiniCalendar
          selected={date}
          onSelect={(d) => { setDate(d); setSlotId(null); }}
        />
      </div>

      {date && (
        <div className="bk-field bk-slots-section">
          <div className="bk-slots-header">
            <label className="bk-label">
              <span className="bk-label-icon">⏰</span> Choose a time
            </label>
            <span className="bk-scarcity">Only a few slots remain this week</span>
          </div>
          <div className="bk-slots-grid">
            {ALL_SLOTS.map(s => {
              const isMorningLock = MORNING_AFTERNOON_IDS.includes(s.id);
              const isEveningLock = s.id === lockedEvening;
              const locked = isMorningLock || isEveningLock;
              const selected = slotId === s.id;
              const left = !locked ? getSlotsLeft(date, s.id) : 0;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSlotClick(s.id, locked)}
                  className={`bk-slot ${locked ? 'locked' : ''} ${selected ? 'selected' : ''}`}
                >
                  <span className="bk-slot-time">{s.label}</span>
                  {locked && (
                    <span className="bk-slot-badge">
                      <span className="bk-lock-icon">🔒</span> Booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        className="bk-btn-maroon"
        disabled={!date || !slotId || confirming}
        onClick={handleConfirm}
      >
        {confirming
          ? <><span className="bk-spinner white" /> Securing your slot…</>
          : 'Confirm Booking'}
      </button>
    </div>
  );
}

// ─── Step 3: Confirmation ──────────────────────────────────────────────
function Confirmation({ details, selection, onBookAnother }) {
  return (
    <div className="bk-confirmation">
      <div className="bk-check-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="bk-conf-text">
        <h3 className="bk-conf-title">Consultation Booked!</h3>
        <p className="bk-conf-sub">
          Our team will contact you within <strong>2–4 hours</strong> for confirmation.
        </p>
      </div>

      <div className="bk-summary">
        <div className="bk-summary-row">
          <span className="bk-summary-label">👤 Name</span>
          <span className="bk-summary-value">{details.fullName}</span>
        </div>
        <div className="bk-summary-row">
          <span className="bk-summary-label">📅 Date</span>
          <span className="bk-summary-value">{formatDate(selection.date)}</span>
        </div>
        <div className="bk-summary-row">
          <span className="bk-summary-label">⏰ Time</span>
          <span className="bk-summary-value">{selection.slotLabel}</span>
        </div>
        <div className="bk-summary-row bk-summary-status">
          <span className="bk-summary-label">Status</span>
          <span className="bk-pending-badge">
            <span className="bk-pulse" />
            Pending
          </span>
        </div>
      </div>

      <button type="button" className="bk-btn-outline" onClick={onBookAnother}>
        Book another consultation
      </button>
    </div>
  );
}

// ─── Stepper ───────────────────────────────────────────────────────────
function Stepper({ step }) {
  const steps = [
    { id: 'details', label: '1 Details' },
    { id: 'slot', label: '2 Slot' },
    { id: 'done', label: '3 Confirm' },
  ];
  const activeIdx = steps.findIndex(s => s.id === step);
  return (
    <div className="bk-stepper">
      {steps.map((s, i) => (
        <div key={s.id} className={`bk-step ${i <= activeIdx ? 'active' : ''}`}>
          <div className="bk-step-dot">{i + 1}</div>
          <span className="bk-step-label">{s.label.split(' ').slice(1).join(' ')}</span>
          {i < steps.length - 1 && <div className={`bk-step-line ${i < activeIdx ? 'done' : ''}`} />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Dialog ───────────────────────────────────────────────────────
export function BookingDialog({ open, onOpenChange, serviceLabel, inline = false }) {
  const [step, setStep] = useState('details');
  const [details, setDetails] = useState(null);
  const [selection, setSelection] = useState(null);

  // Lock body scroll
  useEffect(() => {
    if (inline) return;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const t = setTimeout(() => {
        setStep('details');
        setDetails(null);
        setSelection(null);
      }, 300);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, inline]);

  const handleClose = useCallback(() => {
    if (!inline && onOpenChange) onOpenChange(false);
  }, [inline, onOpenChange]);

  // Close on Escape
  useEffect(() => {
    if (inline) return;
    const handler = (e) => { if (e.key === 'Escape' && open) handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, handleClose, inline]);

  const titles = {
    details: { title: serviceLabel || 'Book a Consultation', sub: 'Share your details — takes under a minute.' },
    slot: { title: 'Pick Your Slot', sub: 'Evening sessions only — limited availability.' },
    done: { title: "You're All Set!", sub: '' },
  };

  if (!inline && !open) return null;

  const content = (
    <div className={`bk-modal ${inline ? 'inline' : ''}`}>
      {/* Header */}
      <div className="bk-modal-header">
        <div className="bk-modal-header-top">
          <div>
            <h2 className="bk-modal-title">{titles[step].title}</h2>
            {titles[step].sub && (
              <p className="bk-modal-sub">{titles[step].sub}</p>
            )}
          </div>
          {!inline && (
            <button type="button" className="bk-close" onClick={handleClose} aria-label="Close">
              ✕
            </button>
          )}
        </div>
        {step !== 'done' && <Stepper step={step} />}
      </div>

      {/* Body */}
      <div className="bk-modal-body">
        {step === 'details' && (
          <DetailsForm
            key={serviceLabel || 'default'}
            defaultValues={details || (SPECIAL_SERVICES.includes(serviceLabel) ? { service: serviceLabel } : undefined)}
            onSubmit={(v) => { setDetails(v); setStep('slot'); }}
          />
        )}
        {step === 'slot' && (
          <SlotPicker
            details={details}
            onConfirm={(s) => { setSelection(s); setStep('done'); }}
          />
        )}
        {step === 'done' && details && selection && (
          <Confirmation
            details={details}
            selection={selection}
            onBookAnother={() => { setStep('details'); setSelection(null); }}
          />
        )}
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return createPortal(
    <div
      className={`bk-overlay ${open ? 'open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {content}
    </div>,
    document.body
  );
}
