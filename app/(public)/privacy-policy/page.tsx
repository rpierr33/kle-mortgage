import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "KLE Mortgage Financing Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-28 pb-20 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 font-[family-name:var(--font-playfair)]">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-8 sm:p-12 prose prose-slate max-w-none">
          <p className="text-[#6B6056]"><strong>Last updated:</strong> January 1, 2024</p>
          <p>KLE Mortgage Financing, LLC (&quot;KLE,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-playfair)]">Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Personal identification information (name, email, phone, address)</li>
            <li>Financial information necessary to process your loan application</li>
            <li>Employment and income information</li>
            <li>Property information</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-playfair)]">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your mortgage application</li>
            <li>Communicate with you about your loan</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-playfair)]">Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with credit bureaus, appraisers, title companies, and other parties necessary to complete your mortgage transaction, as permitted by law.</p>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-playfair)]">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at: <a href="mailto:privacy@klemortgage.com" className="text-[#6B1C23]">privacy@klemortgage.com</a></p>
        </div>
      </div>
    </section>
  );
}
