"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  {
    label: "Loan Programs",
    href: "/loan-programs",
    children: [
      { label: "Conventional Loans", href: "/loan-programs/conventional" },
      { label: "FHA Loans", href: "/loan-programs/fha" },
      { label: "VA Loans", href: "/loan-programs/va" },
      { label: "USDA Loans", href: "/loan-programs/usda" },
      { label: "Jumbo Loans", href: "/loan-programs/jumbo" },
      { label: "Refinancing", href: "/loan-programs/refinance" },
    ],
  },
  { label: "Calculator", href: "/calculator" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#E8E0D8]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/kle-logo.png"
              alt="KLE Mortgage Financing"
              width={52}
              height={52}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#6B1C23] leading-tight font-[family-name:var(--font-playfair)]">
                KLE Mortgage
              </p>
              <p className="text-xs text-[#6B6056]">Financing, LLC</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    scrolled
                      ? "text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F0EBE3]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-[#E8E0D8] py-1 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F8F6F3] hover:text-[#6B1C23] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+14045551234"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                scrolled ? "text-[#6B1C23]" : "text-white/90 hover:text-white"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              (404) 555-1234
            </a>
            <Link
              href="/apply"
              className="bg-[#6B1C23] hover:bg-[#4A1218] text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled
                ? "text-[#1A1A1A] hover:bg-[#F0EBE3]"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8E0D8] shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F8F6F3] rounded-md transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 border-l-2 border-[#E8E0D8] pl-3 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-xs text-[#6B6056] hover:text-[#6B1C23] rounded-md transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 pb-1 border-t border-[#E8E0D8] flex flex-col gap-2">
              <a
                href="tel:+14045551234"
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#6B1C23]"
              >
                <Phone className="w-4 h-4" />
                (404) 555-1234
              </a>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="bg-[#6B1C23] text-white px-5 py-3 rounded-md text-sm font-semibold text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
