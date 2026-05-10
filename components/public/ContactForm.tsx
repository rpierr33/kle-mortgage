"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { captureUtm, HONEYPOT_STYLE } from "@/lib/utm";

const schema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, "Please provide more detail (at least 10 characters)"),
  smsConsent: z.boolean(),
  // Honeypot — must remain empty
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const locale = useLocale() as "en" | "fr" | "ht";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { smsConsent: false } });

  const onSubmit = async (data: FormData) => {
    try {
      const utm = captureUtm();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourceType: "contact_form",
          sourcePage: "/contact",
          locale,
          utm,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-[#E8E0D8] p-10 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
          Message Sent!
        </h3>
        <p className="text-[#6B6056]">
          We'll be in touch within 24 hours. Thank you for reaching out to KLE Mortgage.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-[#E8E0D8] p-8">
      {/* Honeypot — bots fill this, humans don't see it */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={HONEYPOT_STYLE}
      />
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
        Send Us a Message
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">First Name *</label>
          <input {...register("firstName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Last Name *</label>
          <input {...register("lastName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Email *</label>
          <input {...register("email")} type="email" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Phone</label>
          <input {...register("phone")} type="tel" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">I'm interested in...</label>
          <select {...register("interest")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
            <option value="">Select an option</option>
            <option value="buying">Buying a Home</option>
            <option value="refinancing">Refinancing</option>
            <option value="first-time">First-Time Buyer Programs</option>
            <option value="va">VA Loan</option>
            <option value="other">General Question</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Message *</label>
          <textarea {...register("message")} rows={4} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] resize-none" placeholder="Tell us about your situation or question..." />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input {...register("smsConsent")} type="checkbox" id="smsC" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
            <label htmlFor="smsC" className="text-sm text-[#6B6056]">
              I consent to receive SMS messages about my inquiry. Msg & data rates may apply.
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-8 py-3 rounded-md text-sm font-semibold transition-colors w-full sm:w-auto"
        >
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Message"}
        </button>
      </div>
    </form>
  );
}
