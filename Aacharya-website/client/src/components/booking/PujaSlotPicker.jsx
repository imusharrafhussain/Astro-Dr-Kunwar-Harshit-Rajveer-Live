import React, { useState } from 'react';
import { ALL_SLOTS, MORNING_AFTERNOON_IDS, getLockedEveningId } from './bookingUtils';
import MiniCalendar from './MiniCalendar';
import './BookingDialog.css'; // Inherit styles from BookingDialog

export default function PujaSlotPicker({ form, setForm }) {
  const [toast, setToast] = useState(null);

  const dateObj = form.date ? new Date(form.date) : null;
  const lockedEvening = dateObj ? getLockedEveningId(dateObj) : null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleDateSelect = (dStr) => {
    setForm(prev => ({ ...prev, date: dStr, time: '' }));
  };

  const handleSlotClick = (s, locked) => {
    if (locked) {
      showToast('This slot is already fully booked. Please choose another time.');
      return;
    }
    // Set form.time (e.g. '10:00')
    setForm(prev => ({ ...prev, time: `${s.id}:00` }));
  };

  let selectedSlotId = null;
  if (form.time) {
      selectedSlotId = form.time.split(':')[0];
  }

  return (
    <div className="bk-form" style={{ gridColumn: '1 / -1', width: '100%' }}>
      {/* Hidden inputs to preserve native validation */}
      <input type="hidden" name="date" value={form.date || ''} required />
      <input type="hidden" name="time" value={form.time || ''} required />

      {toast && <div className="bk-toast">{toast}</div>}

      <div className="bk-demand-banner">
        <span className="bk-fire">🔥</span>
        <p><strong>High demand:</strong> all slots for the next 2 days are fully booked. Earliest availability shown below.</p>
      </div>

      <div className="bk-field">
        <label className="bk-label" style={{ marginBottom: '10px', display: 'block' }}>
          <span className="bk-label-icon">📅</span> Select a Date
        </label>
        <MiniCalendar
          selected={form.date}
          onSelect={handleDateSelect}
        />
      </div>

      {form.date && (
        <div className="bk-field bk-slots-section" style={{ marginTop: '20px' }}>
          <div className="bk-slots-header">
            <label className="bk-label">
              <span className="bk-label-icon">⏰</span> Choose a Time
            </label>
            <span className="bk-scarcity">Only a few slots remain this week</span>
          </div>
          <div className="bk-slots-grid">
            {ALL_SLOTS.map(s => {
              const isMorningLock = MORNING_AFTERNOON_IDS.includes(s.id);
              const isEveningLock = s.id === lockedEvening;
              const locked = isMorningLock || isEveningLock;
              const selected = selectedSlotId === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSlotClick(s, locked)}
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
    </div>
  );
}
