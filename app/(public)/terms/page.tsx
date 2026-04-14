import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "KLE Mortgage Financing Terms of Use — the rules for using our website and services.",
};

export default function TermsPage() {
  return (
    <section className="pt-28 pb-20 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 font-[family-name:var(--font-cormorant)]">
          Terms of Use
        </h1>
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-8 sm:p-12 space-y-6 text-[#6B6056] leading-relaxed">
          <p className="text-sm"><strong className="text-[#1A1A1A]">Last updated:</strong> January 1, 2024</p>
          <p>By accessing or using the KLE Mortgage Financing website, you agree to these Terms of Use. Please read them carefully.</p>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">Not a Commitment to Lend</h2>
            <p>Nothing on this website constitutes a commitment to lend. All loan applications are subject to credit approval, property appraisal, and verification of information. Rates and programs are subject to change without notice.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">Calculator Disclaimer</h2>
            <p>The mortgage calculator on this website provides estimates only. Actual payments will vary based on your specific loan terms, taxes, insurance, and other factors. Consult a loan officer for accurate figures.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">Equal Housing Lender</h2>
            <p>KLE Mortgage Financing, LLC is an equal opportunity lender. We comply with all applicable fair lending laws and do not discriminate on the basis of race, color, national origin, religion, sex, familial status, or disability.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">Licensing</h2>
            <p>KLE Mortgage Financing, LLC NMLS #123456. Licensed to conduct mortgage business in Georgia, Florida, and Texas. NMLS Consumer Access: <a href="https://www.nmlsconsumeraccess.org" className="text-[#6B1C23] underline" target="_blank" rel="noopener noreferrer">nmlsconsumeraccess.org</a></p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">Contact</h2>
            <p>Questions about these terms: <a href="mailto:legal@klemortgage.com" className="text-[#6B1C23]">legal@klemortgage.com</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
