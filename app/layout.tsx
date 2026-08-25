import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const title = "IMI — Information Management Institute";
const description =
  "IMI is your home for Data & Information Management certification, learning, practical tools and global professional community.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, siteName: "Information Management Institute", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <head>
        {/* Switzer is the IMI primary typeface (Fontshare). Barlow is the secondary. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
