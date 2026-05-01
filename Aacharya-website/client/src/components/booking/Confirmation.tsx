import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import type { DetailsValues } from "@/lib/booking-schema";
import type { SlotSelection } from "./SlotPicker";

interface Props {
  details: DetailsValues;
  selection: SlotSelection;
  onBookAnother: () => void;
}

export function Confirmation({ details, selection, onBookAnother }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center space-y-5 py-2"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold shadow-glow"
      >
        <CheckCircle2 className="h-9 w-9 text-maroon-deep" strokeWidth={2.5} />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-2xl font-display text-maroon">Consultation Booked</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Our team will contact you within <span className="font-semibold text-foreground">2–4 hours</span> for confirmation.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4 text-left text-sm space-y-2.5">
        <Row icon={<User className="h-4 w-4" />} label="Name" value={details.fullName} />
        <Row
          icon={<Calendar className="h-4 w-4" />}
          label="Date"
          value={format(selection.date, "EEEE, MMM d, yyyy")}
        />
        <Row icon={<Clock className="h-4 w-4" />} label="Time" value={selection.slotLabel} />
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Status</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark animate-pulse" />
            Pending
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onBookAnother}
        className="rounded-xl border-maroon/30 text-maroon hover:bg-maroon hover:text-primary-foreground transition-smooth"
      >
        Book another consultation
      </Button>
    </motion.div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className="text-maroon">{icon}</span>
        {label}
      </span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
