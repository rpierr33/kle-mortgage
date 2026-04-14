import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/kle-logo.png"
                alt="KLE Mortgage Financing"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <p className="font-bold text-white font-[family-name:var(--font-playfair)]">
                  KLE Mortgage
                </p>
                <p className="text-xs text-gray-400">Financing, LLC</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Helping families achieve the dream of homeownership with expert
              guidance and personalized mortgage solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#6B1C23] flex items-center justify-center transition-colors text-white text-xs font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#6B1C23] flex items-center justify-center transition-colors text-white text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Loan Programs */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Loan Programs
            </h3>
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
                    className="text-sm text-gray-400 hover:text-[#C9A345] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
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
                    className="text-sm text-gray-400 hover:text-[#C9A345] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+14045551234"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#C9A345] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                  (404) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@klemortgage.com"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#C9A345] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                  info@klemortgage.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-[#C9A345] flex-shrink-0 mt-0.5" />
                  <span>
                    Atlanta, GA
                    <br />
                    Licensed in GA, FL, TX
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/apply"
                className="inline-block bg-[#6B1C23] hover:bg-[#4A1218] text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
              >
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <div className="text-center md:text-left">
              <p>
                &copy; {currentYear} KLE Mortgage Financing, LLC. All rights reserved. NMLS #123456
              </p>
              <p className="mt-1">
                Equal Housing Lender. Licensed in GA, FL, TX. This is not a commitment to lend.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                Terms of Use
              </Link>
              <Link href="/faq" className="hover:text-gray-300 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
