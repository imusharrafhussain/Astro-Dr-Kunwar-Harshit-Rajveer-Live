import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DetailsForm } from "./DetailsForm";
import { SlotPicker, type SlotSelection } from "./SlotPicker";
import { Confirmation } from "./Confirmation";
import type { DetailsValues } from "@/lib/booking-schema";

type Step = "details" | "slot" | "done";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceLabel: string;
}

export function BookingDialog({ open, onOpenChange, serviceLabel }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<DetailsValues | null>(null);
  const [selection, setSelection] = useState<SlotSelection | null>(null);

  // Reset on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("details");
        setDetails(null);
        setSelection(null);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const titles: Record<Step, { title: string; sub: string }> = {
    details: {
      title: serviceLabel,
      sub: "Share your details — takes under a minute.",
    },
    slot: {
      title: "Pick Your Slot",
      sub: "Evening sessions only — limited availability.",
    },
    done: { title: "You're all set", sub: "" },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden bg-card">
        <div className="bg-gradient-maroon px-6 pt-6 pb-5 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-gold-light">
              {titles[step].title}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/75 text-sm">
              {titles[step].sub}
            </DialogDescription>
          </DialogHeader>
          {step !== "done" && <Stepper step={step} />}
        </div>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {step === "details" && (
            <DetailsForm
              defaultValues={details ?? undefined}
              onSubmit={(v) => {
                setDetails(v);
                setStep("slot");
              }}
            />
          )}
          {step === "slot" && (
            <SlotPicker
              onConfirm={(s) => {
                setSelection(s);
                setStep("done");
              }}
            />
          )}
          {step === "done" && details && selection && (
            <Confirmation
              details={details}
              selection={selection}
              onBookAnother={() => {
                setStep("details");
                setSelection(null);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "slot", label: "Slot" },
  ];
  const activeIdx = steps.findIndex((s) => s.id === step);
  return (
    <div className="mt-4 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "h-1.5 flex-1 rounded-full transition-smooth",
              i <= activeIdx ? "bg-gradient-gold" : "bg-primary-foreground/15"
            )}
          />
        </div>
      ))}
      <span className="text-xs text-gold-light/90 font-medium ml-2">
        {activeIdx + 1}/{steps.length}
      </span>
    </div>
  );
}
