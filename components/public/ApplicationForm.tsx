"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { captureUtm, HONEYPOT_STYLE } from "@/lib/utm";

const step1Schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
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
  grossMonthlyIncome: z.string().min(1),
  otherIncome: z.string().optional(),
  estimatedCreditScore: z.string().optional(),
});

const consentSchema = z.object({
  smsConsent: z.boolean(),
  emailConsent: z.boolean(),
  agreeToTerms: z.literal(true),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type ConsentData = z.infer<typeof consentSchema>;

export function ApplicationForm() {
  const t = useTranslations("Forms");
  const locale = useLocale() as "en" | "fr" | "ht";
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data & ConsentData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const STEPS = [t("appStepNamePersonal"), t("appStepNameProperty"), t("appStepNameEmployment"), t("appStepNameSubmit")];

  const loanTypeOptions = [
    { value: "conventional", label: t("appLoanConventional") },
    { value: "fha", label: t("appLoanFha") },
    { value: "va", label: t("appLoanVa") },
    { value: "usda", label: t("appLoanUsda") },
    { value: "jumbo", label: t("appLoanJumbo") },
    { value: "refinance", label: t("appLoanRefinance") },
    { value: "first_time_buyer", label: t("appLoanFirstTime") },
    { value: "other", label: t("appLoanOther") },
  ];

  const creditScoreOptions = [
    { value: "excellent", label: t("appCreditExcellent") },
    { value: "good", label: t("appCreditGood") },
    { value: "fair", label: t("appCreditFair") },
    { value: "poor", label: t("appCreditPoor") },
    { value: "unknown", label: t("appCreditUnknown") },
  ];

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
        throw new Error(err.error || t("errorGeneric"));
      }

      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("errorGeneric"));
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
              {t("appSuccessTitle")}
            </h2>
            <p className="text-[#6B6056] mb-6">
              {t("appSuccessBodyTemplate", { firstName: formData.firstName ?? "" })}
            </p>
            <p className="text-sm text-[#6B6056] mb-8">
              {t("appSuccessEmailHint", { email: formData.email ?? "" })}
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
            >
              {t("appSuccessBackHome")}
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
          {/* Honeypot */}
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
                {t("appStep1Title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("labelFirstName")} *</label>
                  <input {...step1Form.register("firstName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="John" />
                  {step1Form.formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{t("errorRequired")}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("labelLastName")} *</label>
                  <input {...step1Form.register("lastName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="Smith" />
                  {step1Form.formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{t("errorRequired")}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("labelEmail")} *</label>
                  <input {...step1Form.register("email")} type="email" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="john@example.com" />
                  {step1Form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{t("errorEmail")}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("labelPhone")} *</label>
                  <input {...step1Form.register("phone")} type="tel" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="(305) 555-1234" />
                  {step1Form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{t("errorRequired")}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelDob")}</label>
                  <input {...step1Form.register("dateOfBirth")} type="date" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  {t("appCtaNext")} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Property & Loan */}
          {currentStep === 1 && (
            <form onSubmit={step2Form.handleSubmit(handleStep2)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                {t("appStep2Title")}
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-2">{t("appLabelLoanType")} *</label>
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
                    {t("appLabelIsRefinance")}
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelPurchasePrice")}</label>
                    <input {...step2Form.register("purchasePrice")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="350000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelDownPayment")}</label>
                    <input {...step2Form.register("downPayment")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="35000" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelPropertyAddress")}</label>
                  <input {...step2Form.register("propertyAddress")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelCity")}</label>
                    <input {...step2Form.register("propertyCity")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelState")}</label>
                    <input {...step2Form.register("propertyState")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="FL" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelZip")}</label>
                    <input {...step2Form.register("propertyZip")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelPropertyType")}</label>
                    <select {...step2Form.register("propertyType")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">{t("appPropTypePlaceholder")}</option>
                      <option value="single_family">{t("appPropTypeSingleFamily")}</option>
                      <option value="condo">{t("appPropTypeCondo")}</option>
                      <option value="townhouse">{t("appPropTypeTownhouse")}</option>
                      <option value="multi_family">{t("appPropTypeMultiFamily")}</option>
                      <option value="manufactured">{t("appPropTypeManufactured")}</option>
                      <option value="other">{t("appPropTypeOther")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelPropertyUsage")}</label>
                    <select {...step2Form.register("propertyUsage")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">{t("appUsagePlaceholder")}</option>
                      <option value="primary_residence">{t("appUsagePrimary")}</option>
                      <option value="secondary_home">{t("appUsageSecondary")}</option>
                      <option value="investment_property">{t("appUsageInvestment")}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(0)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> {t("appCtaBack")}
                </button>
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  {t("appCtaNext")} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Employment */}
          {currentStep === 2 && (
            <form onSubmit={step3Form.handleSubmit(handleStep3)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                {t("appStep3Title")}
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] block mb-2">{t("appLabelEmploymentStatus")} *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: "employed", label: t("appEmpEmployed") },
                      { value: "self_employed", label: t("appEmpSelfEmployed") },
                      { value: "retired", label: t("appEmpRetired") },
                      { value: "other", label: t("appEmpOther") },
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
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelEmployer")}</label>
                    <input {...step3Form.register("employerName")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelJobTitle")}</label>
                    <input {...step3Form.register("jobTitle")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelYearsEmployed")}</label>
                    <input {...step3Form.register("yearsEmployed")} type="number" step={0.5} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelMonthlyIncome")} *</label>
                    <input {...step3Form.register("grossMonthlyIncome")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="7500" />
                    {step3Form.formState.errors.grossMonthlyIncome && <p className="text-red-500 text-xs mt-1">{t("errorRequired")}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelOtherIncome")}</label>
                    <input {...step3Form.register("otherIncome")} type="number" className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23]" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">{t("appLabelCreditScore")}</label>
                    <select {...step3Form.register("estimatedCreditScore")} className="w-full border border-[#E8E0D8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B1C23] bg-white">
                      <option value="">{t("appCreditPlaceholder")}</option>
                      {creditScoreOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(1)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> {t("appCtaBack")}
                </button>
                <button type="submit" className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors">
                  {t("appCtaNext")} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 3 && (
            <form onSubmit={consentForm.handleSubmit(handleFinalSubmit)}>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-cormorant)]">
                {t("appStep4Title")}
              </h2>

              <div className="bg-[#F8F6F3] rounded-xl p-5 mb-6 space-y-2 text-sm">
                <h3 className="font-semibold text-[#1A1A1A] mb-3">{t("appReviewSummary")}</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <div><span className="text-[#6B6056]">{t("appReviewName")}:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                  <div><span className="text-[#6B6056]">{t("appReviewEmail")}:</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-[#6B6056]">{t("appReviewPhone")}:</span> <span className="font-medium">{formData.phone}</span></div>
                  <div><span className="text-[#6B6056]">{t("appReviewLoanType")}:</span> <span className="font-medium capitalize">{formData.loanType?.replace("_", " ")}</span></div>
                  {formData.purchasePrice && <div><span className="text-[#6B6056]">{t("appReviewPurchasePrice")}:</span> <span className="font-medium">${Number(formData.purchasePrice).toLocaleString()}</span></div>}
                  {formData.grossMonthlyIncome && <div><span className="text-[#6B6056]">{t("appReviewIncome")}:</span> <span className="font-medium">${Number(formData.grossMonthlyIncome).toLocaleString()}</span></div>}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("emailConsent")} type="checkbox" id="emailConsent" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="emailConsent" className="text-sm text-[#6B6056]">
                    {t("appConsentEmail")}
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("smsConsent")} type="checkbox" id="smsConsent" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="smsConsent" className="text-sm text-[#6B6056]">
                    {t("appConsentSms")}
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input {...consentForm.register("agreeToTerms")} type="checkbox" id="agreeToTerms" className="accent-[#6B1C23] w-4 h-4 mt-0.5" />
                  <label htmlFor="agreeToTerms" className="text-sm text-[#6B6056]">
                    {t("appConsentTermsBody")}
                  </label>
                </div>
                {consentForm.formState.errors.agreeToTerms && (
                  <p className="text-red-500 text-xs">{t("appConsentTermsRequired")}</p>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(2)} className="flex items-center gap-2 border border-[#E8E0D8] text-[#1A1A1A] px-5 py-3 rounded-md text-sm font-medium transition-colors hover:border-[#6B1C23]">
                  <ArrowLeft className="w-4 h-4" /> {t("appCtaBack")}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {t("appCtaSubmitting")}</>
                  ) : (
                    <>{t("appCtaSubmit")} <ArrowRight className="w-4 h-4" /></>
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
