import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/content";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Hope, Dignity & Opportunity`,
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "Heart of Life Line Care Foundation improves lives through healthcare, education, youth and women empowerment, humanitarian aid, and community development in Nigeria.",
  keywords: [
    "Heart of Life Line Care Foundation",
    "HLLCAF",
    "NGO Nigeria",
    "Ado Ekiti",
    "healthcare outreach",
    "education",
    "women empowerment",
  ],
  openGraph: {
    title: SITE.name,
    description:
      "Compassionate healthcare, education, and empowerment for vulnerable communities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
