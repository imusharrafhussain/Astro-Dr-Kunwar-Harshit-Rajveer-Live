export const ALL_SLOTS = [
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

export const MORNING_AFTERNOON_IDS = ['10', '11', '12', '13', '14', '15'];
export const EVENING_IDS = ['16', '17', '18', '19', '20'];
export const MIN_OFFSET_DAYS = 3;

export function hashDate(date) {
  const s = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return Math.abs(h);
}

export function getLockedEveningId(date) {
  return EVENING_IDS[hashDate(date) % EVENING_IDS.length];
}

export function getSlotsLeft(date, slotId) {
  return (hashDate(date) + Number(slotId)) % 3 + 1;
}

export function isDateDisabled(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const earliest = new Date(today);
  earliest.setDate(today.getDate() + MIN_OFFSET_DAYS);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < earliest;
}
