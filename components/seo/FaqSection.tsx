import { FaqJsonLd } from "./JsonLd";

type FaqItem = { question: string; answer: string };

export function FaqSection({
  label,
  items,
  variant = "light",
}: {
  label: string;
  items: FaqItem[];
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      className={`py-20 md:py-24 ${isDark ? "bg-[#0D0608]" : "bg-white"}`}
      aria-labelledby="faq-heading"
    >
      <FaqJsonLd items={items} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          id="faq-heading"
          className={`font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] font-bold text-center mb-12 ${
            isDark ? "text-white" : "text-[#1A1A1A]"
          }`}
        >
          {label}
        </h2>
        <div className="space-y-6">
          {items.map((item, i) => (
            <details
              key={i}
              className={`group rounded-xl border p-6 transition-colors ${
                isDark
                  ? "bg-[#1A0A0D] border-white/10 hover:border-[#C9A345]/30"
                  : "bg-[#FAF8F5] border-[#E8E0D8] hover:border-[#C9A345]/30"
              }`}
              {...(i === 0 ? { open: true } : {})}
            >
              <summary
                className={`cursor-pointer list-none flex items-start justify-between gap-4 font-[family-name:var(--font-cormorant)] text-lg font-semibold ${
                  isDark ? "text-white" : "text-[#1A1A1A]"
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="text-[#C9A345] text-2xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p
                className={`mt-4 leading-relaxed ${
                  isDark ? "text-white/70" : "text-[#374151]"
                }`}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
