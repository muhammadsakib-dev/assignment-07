// Complete Layout: layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Marquee from "./components/shared/Marquee";
import Footer from "./components/shared/Footer";

// Font Configuration
const HindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

// Matadata Configuration
export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${HindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-white">
          <Header />
          <Navbar />
          <Marquee />
        </nav>
        <div className="grow bg-base-300">
          {children}
        </div>
        <footer className="bg-white">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
