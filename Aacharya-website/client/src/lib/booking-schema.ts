import { z } from "zod";
import { addDays, startOfDay } from "date-fns";

export const detailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  address: z
    .string()
    .trim()
    .min(8, "Please share a complete address")
    .max(300, "Address is too long"),
  subject: z.string().trim().max(160, "Keep it under 160 characters").optional(),
});

export type DetailsValues = z.infer<typeof detailsSchema>;

/** All slots displayed (24h key + label). Morning/afternoon are locked. */
export const ALL_SLOTS = [
  { id: "10", label: "10:00 AM", period: "morning" },
  { id: "11", label: "11:00 AM", period: "morning" },
  { id: "12", label: "12:00 PM", period: "morning" },
  { id: "13", label: "01:00 PM", period: "afternoon" },
  { id: "14", label: "02:00 PM", period: "afternoon" },
  { id: "15", label: "03:00 PM", period: "afternoon" },
  { id: "16", label: "04:00 PM", period: "evening" },
  { id: "17", label: "05:00 PM", period: "evening" },
  { id: "18", label: "06:00 PM", period: "evening" },
  { id: "19", label: "07:00 PM", period: "evening" },
  { id: "20", label: "08:00 PM", period: "evening" },
] as const;

export const EVENING_IDS = ["16", "17", "18", "19", "20"] as const;
export const MORNING_AFTERNOON_IDS = ["10", "11", "12", "13", "14", "15"] as const;

export const MIN_BOOKING_OFFSET_DAYS = 3; // disable today + next 2 days

export function isDateDisabled(date: Date) {
  const earliest = startOfDay(addDays(new Date(), MIN_BOOKING_OFFSET_DAYS));
  return startOfDay(date) < earliest;
}

/** Deterministic pseudo-random per date — picks ONE evening slot to lock. */
function hashDate(date: Date) {
  const s = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function getLockedEveningId(date: Date): string {
  const idx = hashDate(date) % EVENING_IDS.length;
  return EVENING_IDS[idx];
}

/** Fake but stable scarcity counter for available evening slots (1–3 left). */
export function getSlotsLeft(date: Date, slotId: string): number {
  return (hashDate(date) + Number(slotId)) % 3 + 1;
}
