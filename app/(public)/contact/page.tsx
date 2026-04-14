import type { Metadata } from "next";
import { ContactForm } from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with KLE Mortgage Financing. We're here to answer your questions and help you find the right home loan.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
              Contact Us
            </h1>
            <p className="text-xl text-white/80">
              Have questions? Ready to get started? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#6B1C23] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#6B6056] mb-0.5">Phone</p>
                      <a href="tel:+14045551234" className="font-semibold text-[#1A1A1A] hover:text-[#6B1C23]">
                        (404) 555-1234
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#6B1C23] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#6B6056] mb-0.5">Email</p>
                      <a href="mailto:info@klemortgage.com" className="font-semibold text-[#1A1A1A] hover:text-[#6B1C23]">
                        info@klemortgage.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#6B1C23] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#6B6056] mb-0.5">Location</p>
                      <p className="font-semibold text-[#1A1A1A]">Atlanta, GA</p>
                      <p className="text-sm text-[#6B6056]">Licensed in GA, FL, TX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#6B1C23] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#6B6056] mb-0.5">Office Hours</p>
                      <p className="font-semibold text-[#1A1A1A]">Mon–Fri: 8AM – 7PM</p>
                      <p className="text-sm text-[#6B6056]">Sat: 9AM – 4PM ET</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#6B1C23] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3 font-[family-name:var(--font-playfair)]">Ready to Apply?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Skip the inquiry and go straight to your application. Get pre-approved in 24 hours.
                </p>
                <a
                  href="/apply"
                  className="block bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-5 py-3 rounded-md text-sm font-semibold text-center transition-colors"
                >
                  Start Application
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
