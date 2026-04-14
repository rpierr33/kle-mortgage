import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KLE Mortgage Financing, LLC | Home Loans Made Simple",
    template: "%s | KLE Mortgage Financing",
  },
  description:
    "KLE Mortgage Financing, LLC helps families achieve homeownership with conventional, FHA, VA, USDA, and jumbo loan solutions. Licensed mortgage broker.",
  keywords: [
    "mortgage",
    "home loan",
    "FHA loan",
    "VA loan",
    "USDA loan",
    "conventional loan",
    "mortgage broker",
    "refinance",
    "KLE Mortgage",
  ],
  openGraph: {
    title: "KLE Mortgage Financing, LLC",
    description: "Home Loans Made Simple. Expert mortgage guidance for every homebuyer.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
