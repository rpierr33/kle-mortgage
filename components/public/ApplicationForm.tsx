"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { captureUtm, HONEYPOT_STYLE } from "@/lib/utm";

const step1Schema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  dateOfBirth: z.string().optional(),
});

const step2Schema = z.object({
  loanType: z.enum(["conventional", "fha", "va", "usda", "jumbo", "refinance", "first_time_buyer", "other"]),
  isRefinance: z.boolean(),
  purchasePrice: z.string().optional(),
  downPayment: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyCity: z.string().optional(),
  propertyState: z.string().optional(),
  propertyZip: z.string().optional(),
  propertyType: z.string().optional(),
  propertyUsage: z.string().optional(),
});

const step3Schema = z.object({
  employmentStatus: z.enum(["employed", "self_employed", "retired", "other"]),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  yearsEmployed: z.string().optional(),
  grossMonthlyIncome: z.string().min(1, "Income is required"),
  otherIncome: z.string().optional(),
  estimatedCreditScore: z.string().optional(),
});

const consentSchema = z.object({
  smsConsent: z.boolean(),
  emailConsent: z.boolean(),
  agreeToTerms: z.literal(true).refine((v) => v === true, { message: "You must agree to terms" }),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type ConsentData = z.infer<typeof consentSchema>;

const STEPS = ["Personal Info", "Property & Loan", "Employment & Income", "Submit"];

const loanTypeOptions = [
  { value: "conventional", label: "Conventional" },
  { value: "fha", label: "FHA" },
  { value: "va", label: "VA" },
  { value: "usda", label: "USDA" },
  { value: "jumbo", label: "Jumbo" },
  { value: "refinance", label: "Refinancing" },
  { value: "first_time_buyer", label: "First-Time Buyer" },
  { value: "other", label: "Not Sure" },
];

const creditScoreOptions = [
  { value: "excellent", label: "Excellent (740+)" },
  { value: "good", label: "Good (680–739)" },
  { value: "fair", label: "Fair (620–679)" },
  { value: "poor", label: "Below 620" },
  { value: "unknown", label: "I don't know" },
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data & ConsentData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const locale = useLocale() as "en" | "fr" | "ht";

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: formData });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { loanType: "conventional", isRefinance: false, ...formData } });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: { employmentStatus: "employed", ...formData } });
  const consentForm = useForm<ConsentData>({ resolver: zodResolver(consentSchema), defaultValues: { smsConsent: false, emailConsent: true } });

  const handleStep1 = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(1);
  };

  const handleStep2 = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep3 = (data: Step3Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleFinalSubmit = async (data: ConsentData) => {
    setSubmitting(true);
    const utm = captureUtm();
    const payload = { ...formData, ...data, locale, utm, website: honeypot };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl border border-[#E8E0D8] p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 font-[family-name:var(--font-cormorant)]">
              Application Submitted!
            </h2>
            <p className="text-[#6B6056] mb-6">
              Thank you, {formData.firstName}! We've received your application
              and a loan officer will contact you within 24 hours.
            </p>
            <p className="text-sm text-[#6B6056] mb-8">
              Check your email at <strong>{formData.email}</strong> for a confirmation.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#F8F6F3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className={`flex flex-col items-center ${idx < STEPS.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    idx < currentStep
                      ? "bg-green-600 text-white"
                      : idx === currentStep
                      ? "bg-[#6B1C23] text-white"
                      : "bg-white border-2 border-[#E8E0D8] text-[#6B6056]"
                  }`}
                >
                  {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${idx === currentStep ? "text-[#6B1C23] font-semibold" : "text-[#6B6056]"}`}>
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${idx < currentStep ? "bg-green-600" : "bg-[#E8E0D8]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D8] p-8">
          {/* Honeypot — bots fill this, humans don't see it */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            name="website"
            style={HONEYPOT_STYLE}
          />
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">First Name *</label>
                  <input {...step1Form.register("firstName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="John" />
                  {step1Form.formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Last Name *</label>
                  <input {...step1Form.register("lastName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="Smith" />
                  {step1Form.formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.lastName.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Email Address *</label>
                  <input {...step1Form.register("email")} type="email" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="john@example.com" />
                  {step1Form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Phone Number *</label>
                  <input {...step1Form.register("phone")} type="tel" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="(404) 555-1234" />
                  {step1Form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Date of Birth</label>
                  <input {...step1Form.register("dateOfBirth")} type="date" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Property & Loan */}
          {currentStep === 1 && (
            <form onSubmit={step2Form.handleSubmit(handleStep2)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                Property & Loan Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-2">Loan Type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {loanTypeOptions.map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input {...step2Form.register("loanType")} type="radio" value={opt.value} className="sr-only" />
                        <div className={`border rounded-md px-3 py-2.5 text-sm text-center transition-colors ${step2Form.watch("loanType") === opt.value ? "bg-[#6B1C23] text-white border-[#6B1C23]" : "bg-white text-[#1A1A1A] border-[#E8E0D8] hover:border-[#6B1C23]"}`}>
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input {...step2Form.register("isRefinance")} type="checkbox" id="refinance" className="accent-[#6B1C23] w-4 h-4" />
                  <label htmlFor="refinance" className="text-sm text-[#1A1A1A]">
                    This is a refinance (I already own this property)
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Purchase Price / Home Value</label>
                    <input {...step2Form.register("purchasePrice")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="350000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Down Payment ($)</label>
                    <input {...step2Form.register("downPayment")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="35000" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Property Address</label>
                  <input {...step2Form.register("propertyAddress")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">City</label>
                    <input {...step2Form.register("propertyCity")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">State</label>
                    <input {...step2Form.register("propertyState")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="FL" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">ZIP</label>
                    <input {...step2Form.register("propertyZip")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Property Type</label>
                    <select {...step2Form.register("propertyType")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">Select...</option>
                      <option value="single_family">Single Family</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="multi_family">Multi-Family</option>
                      <option value="manufactured">Manufactured</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Property Usage</label>
                    <select {...step2Form.register("propertyUsage")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">Select...</option>
                      <option value="primary_residence">Primary Residence</option>
                      <option value="secondary_home">Secondary Home</option>
                      <option value="investment_property">Investment Property</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(0)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Employment */}
          {currentStep === 2 && (
            <form onSubmit={step3Form.handleSubmit(handleStep3)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                Employment & Income
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-2">Employment Status *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: "employed", label: "Employed" },
                      { value: "self_employed", label: "Self-Employed" },
                      { value: "retired", label: "Retired" },
                      { value: "other", label: "Other" },
                    ].map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input {...step3Form.register("employmentStatus")} type="radio" value={opt.value} className="sr-only" />
                        <div className={`border rounded-md px-3 py-2.5 text-sm text-center transition-colors ${step3Form.watch("employmentStatus") === opt.value ? "bg-[#6B1C23] text-white border-[#6B1C23]" : "bg-white text-[#1A1A1A] border-[#E8E0D8] hover:border-[#6B1C23]"}`}>
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Employer / Company Name</label>
                    <input {...step3Form.register("employerName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Job Title</label>
                    <input {...step3Form.register("jobTitle")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Years at Current Job</label>
                    <input {...step3Form.register("yearsEmployed")} type="number" step={0.5} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Gross Monthly Income ($) *</label>
                    <input {...step3Form.register("grossMonthlyIncome")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="7500" />
                    {step3Form.formState.errors.grossMonthlyIncome && <p className="text-red-500 text-xs mt-1">{step3Form.formState.errors.grossMonthlyIncome.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Other Monthly Income ($)</label>
                    <input {...step3Form.register("otherIncome")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Estimated Credit Score</label>
                    <select {...step3Form.register("estimatedCreditScore")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">Select range...</option>
                      {creditScoreOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(1)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 3 && (
            <form onSubmit={consentForm.handleSubmit(handleFinalSubmit)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                Review & Submit
              </h2>

              {/* Summary */}
              <div className="bg-[#F8F6F3] rounded-xl p-5 mb-6 space-y-2 text-sm">
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Application Summary</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <div><span className="text-[#6B6056]">Name:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                  <div><span className="text-[#6B6056]">Email:</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-[#6B6056]">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                  <div><span className="text-[#6B6056]">Loan Type:</span> <span className="font-medium capitalize">{formData.loanType?.replace("_", " ")}</span></div>
                  {formData.purchasePrice && <div><span className="text-[#6B6056]">Purchase Price:</span> <span className="font-medium">${Number(formData.purchasePrice).toLocaleString()}</span></div>}
                  {formData.grossMonthlyIncome && <div><span className="text-[#6B6056]">Monthly Income:</span> <span className="font-medium">${Number(formData.grossMonthlyIncome).toLocaleString()}</span></div>}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("emailConsent")} type="checkbox" id="emailConsent" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="emailConsent" className="text-sm text-[#6B6056]">
                    I consent to receive email communications about my application.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("smsConsent")} type="checkbox" id="smsConsent" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="smsConsent" className="text-sm text-[#6B6056]">
                    I consent to receive SMS text messages about my application. Msg & data rates may apply.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("agreeToTerms")} type="checkbox" id="agreeToTerms" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="agreeToTerms" className="text-sm text-[#6B6056]">
                    I agree to the{" "}
                    <a href="/terms" className="text-[#6B1C23] underline" target="_blank">Terms of Use</a>
                    {" "}and{" "}
                    <a href="/privacy-policy" className="text-[#6B1C23] underline" target="_blank">Privacy Policy</a>.
                    I understand this is not a commitment to lend. *
                  </label>
                </div>
                {consentForm.formState.errors.agreeToTerms && (
                  <p className="text-red-500 text-xs">{consentForm.formState.errors.agreeToTerms.message}</p>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(2)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
