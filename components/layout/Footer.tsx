import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0608] text-white relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A0B] to-[#0A0406] pointer-events-none" />

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image
                src="/kle-logo.png"
                alt="KLE Mortgage Financing"
                width={52}
                height={52}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="font-bold text-white font-[family-name:var(--font-playfair)] text-base">
                  KLE Mortgage
                </p>
                <p className="text-xs text-[#A89588]">Financing, LLC</p>
              </div>
            </Link>

            {/* Gold accent */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full mb-4" />

            <p className="text-sm text-[#A89588] leading-relaxed mb-6">
              Helping families achieve the dream of homeownership with expert
              guidance and personalized mortgage solutions.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/[0.07] hover:bg-[#6B1C23] border border-white/10 hover:border-[#6B1C23] flex items-center justify-center transition-all duration-200 text-white text-xs font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/[0.07] hover:bg-[#6B1C23] border border-white/10 hover:border-[#6B1C23] flex items-center justify-center transition-all duration-200 text-white text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Loan Programs */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-0.5 bg-[#C9A345] rounded-full" />
              <h3 className="font-semibold text-white text-xs uppercase tracking-[0.12em]">
                Loan Programs
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: "Conventional Loans", href: "/loan-programs/conventional" },
                { label: "FHA Loans", href: "/loan-programs/fha" },
                { label: "VA Loans", href: "/loan-programs/va" },
                { label: "USDA Loans", href: "/loan-programs/usda" },
                { label: "Jumbo Loans", href: "/loan-programs/jumbo" },
                { label: "Refinancing", href: "/loan-programs/refinance" },
                { label: "First-Time Buyer", href: "/loan-programs/first-time-buyer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A89588] hover:text-[#C9A345] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-0.5 bg-[#C9A345] rounded-full" />
              <h3 className="font-semibold text-white text-xs uppercase tracking-[0.12em]">
                Company
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Team", href: "/about#team" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Resources", href: "/resources" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
                { label: "Apply Now", href: "/apply" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A89588] hover:text-[#C9A345] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-0.5 bg-[#C9A345] rounded-full" />
              <h3 className="font-semibold text-white text-xs uppercase tracking-[0.12em]">
                Contact Us
              </h3>
            </div>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:+13057052030"
                  className="flex items-center gap-2.5 text-sm text-[#A89588] hover:text-[#C9A345] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                  +1 (305) 705-2030
                </a>
              </li>
              <li>
                <a
                  href="mailto:Info@klemortgage.com"
                  className="flex items-center gap-2.5 text-sm text-[#A89588] hover:text-[#C9A345] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                  Info@klemortgage.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-[#A89588]">
                  <MapPin className="w-4 h-4 text-[#C9A345] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    909 N Miami Beach Blvd, Suite 301A
                    <br />
                    North Miami Beach, FL 33162
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/apply"
                className="inline-block bg-[#6B1C23] hover:bg-[#8A2530] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-[0_2px_12px_rgba(107,28,35,0.4)]"
              >
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#6B6056]">
            <div className="text-center md:text-left">
              <p>
                &copy; {currentYear} KLE Mortgage Financing, LLC. All rights reserved. NMLS #123456
              </p>
              <p className="mt-1 text-[#504040]">
                Equal Housing Lender. Licensed in GA, FL, TX. This is not a commitment to lend.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="hover:text-[#A89588] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#A89588] transition-colors">
                Terms of Use
              </Link>
              <Link href="/faq" className="hover:text-[#A89588] transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
