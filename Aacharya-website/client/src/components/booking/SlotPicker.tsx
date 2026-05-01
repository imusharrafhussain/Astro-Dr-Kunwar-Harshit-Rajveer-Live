import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Clock, Flame, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ALL_SLOTS,
  MORNING_AFTERNOON_IDS,
  getLockedEveningId,
  getSlotsLeft,
  isDateDisabled,
} from "@/lib/booking-schema";

export interface SlotSelection {
  date: Date;
  slotId: string;
  slotLabel: string;
}

interface Props {
  onConfirm: (selection: SlotSelection) => void;
}

export function SlotPicker({ onConfirm }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [slotId, setSlotId] = useState<string | undefined>();
  const [confirming, setConfirming] = useState(false);

  const lockedEvening = useMemo(
    () => (date ? getLockedEveningId(date) : null),
    [date]
  );

  const handleSlotClick = (id: string, locked: boolean) => {
    if (locked) {
      toast.error("This slot is already fully booked. Please choose another time.");
      return;
    }
    setSlotId(id);
  };

  const handleConfirm = async () => {
    if (!date || !slotId) return;
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 1200));
    setConfirming(false);
    const slot = ALL_SLOTS.find((s) => s.id === slotId)!;
    onConfirm({ date, slotId, slotLabel: slot.label });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* Demand banner */}
      <div className="rounded-xl border border-maroon/15 bg-maroon/5 px-4 py-3 text-sm text-maroon flex gap-2 items-start">
        <Flame className="h-4 w-4 mt-0.5 shrink-0" />
        <p>
          <span className="font-semibold">High demand:</span> all slots for the next 2 days are
          fully booked. Earliest availability shown below.
        </p>
      </div>

      {/* Date picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-maroon" /> Select a date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start h-12 rounded-xl text-left font-normal border-input",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "EEEE, MMM d, yyyy") : "Pick an available date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setSlotId(undefined);
              }}
              disabled={isDateDisabled}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Slot grid */}
      <AnimatePresence mode="wait">
        {date && (
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-maroon" /> Choose a time
              </label>
              <span className="text-xs text-muted-foreground">
                Only a few slots remain this week
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ALL_SLOTS.map((s) => {
                const isMorningLock = (MORNING_AFTERNOON_IDS as readonly string[]).includes(s.id);
                const isEveningLock = s.id === lockedEvening;
                const locked = isMorningLock || isEveningLock;
                const selected = slotId === s.id;
                const left = !locked ? getSlotsLeft(date, s.id) : 0;

                return (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileHover={!locked ? { scale: 1.03 } : undefined}
                    whileTap={!locked ? { scale: 0.97 } : undefined}
                    onClick={() => handleSlotClick(s.id, locked)}
                    className={cn(
                      "relative rounded-xl border px-3 py-3 text-sm font-medium transition-smooth text-left",
                      locked &&
                        "border-border bg-muted text-muted-foreground line-through cursor-not-allowed",
                      !locked &&
                        !selected &&
                        "border-input bg-card hover:border-gold hover:shadow-glow",
                      selected &&
                        "border-gold bg-gradient-gold text-maroon-deep shadow-glow"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.label}</span>
                      {locked && <Lock className="h-3 w-3" />}
                    </div>
                    <div className="text-[10px] mt-1 uppercase tracking-wide">
                      {locked ? (
                        "Booked"
                      ) : (
                        <span className={cn(selected ? "text-maroon-deep" : "text-maroon")}>
                          {left} left
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={handleConfirm}
        disabled={!date || !slotId || confirming}
        className="w-full h-12 rounded-xl bg-gradient-maroon text-primary-foreground font-semibold hover:shadow-glow hover:scale-[1.01] transition-smooth disabled:opacity-50"
      >
        {confirming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Securing your slot…
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </motion.div>
  );
}
