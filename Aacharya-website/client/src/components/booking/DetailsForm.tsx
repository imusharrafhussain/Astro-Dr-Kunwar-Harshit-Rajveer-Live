import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, User, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { detailsSchema, type DetailsValues } from "@/lib/booking-schema";

interface Props {
  defaultValues?: Partial<DetailsValues>;
  onSubmit: (values: DetailsValues) => void;
}

export function DetailsForm({ defaultValues, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
  });

  const submit = async (values: DetailsValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 850)); // intentional UX delay
    setSubmitting(false);
    onSubmit(values);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <Field
        id="fullName"
        label="Full Name"
        icon={<User className="h-4 w-4" />}
        error={errors.fullName?.message}
      >
        <Input id="fullName" placeholder="e.g. Riya Sharma" {...register("fullName")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="phone"
          label="Phone Number"
          icon={<Phone className="h-4 w-4" />}
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile"
            {...register("phone")}
          />
        </Field>
        <Field
          id="email"
          label="Email"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
        >
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        </Field>
      </div>

      <Field
        id="address"
        label="Address"
        icon={<MapPin className="h-4 w-4" />}
        error={errors.address?.message}
      >
        <Textarea
          id="address"
          rows={2}
          placeholder="House / Street / City"
          {...register("address")}
        />
      </Field>

      <Field
        id="subject"
        label="Subject of Consultation"
        optional
        icon={<Sparkles className="h-4 w-4" />}
        error={errors.subject?.message}
      >
        <Input
          id="subject"
          placeholder="e.g. Career, Marriage, Health…"
          {...register("subject")}
        />
      </Field>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-gold text-maroon-deep font-semibold h-12 rounded-xl shadow-card hover:shadow-glow hover:scale-[1.01] transition-smooth"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying details…
          </>
        ) : (
          <>Continue to Slot Selection</>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Limited slots available — secure yours now.
      </p>
    </motion.form>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-maroon">{icon}</span>
        {label}
        {optional && <span className="text-xs text-muted-foreground font-normal">(optional)</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
