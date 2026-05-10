import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import FloatingContactBar from "@/components/shared/FloatingContactBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
