import React, { useState } from 'react';
import { isDateDisabled, MIN_OFFSET_DAYS } from './bookingUtils';
import './BookingDialog.css';

export default function MiniCalendar({ selected, onSelect }) {
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
          let isSelected = false;
          if (selected) {
              const [y, m, dstr] = selected.split('-');
              isSelected = (Number(y) === viewing.year && Number(m) - 1 === viewing.month && Number(dstr) === day);
          }
          const isToday = cellDate.getTime() === today.getTime();

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => {
                  if (!disabled) {
                      const mStr = String(viewing.month + 1).padStart(2, '0');
                      const dStr = String(day).padStart(2, '0');
                      onSelect(`${viewing.year}-${mStr}-${dStr}`);
                  }
              }}
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
