import type { Metadata, Viewport } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["200", "300", "400", "500", "700", "900"],
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["200", "300", "400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#102B4B",
};

export const metadata: Metadata = {
  title: "ענב 360 — כפר סבא | קודם כל בית",
  description:
    'נכנסים בקיץ הקרוב לבית החדש שלכם בכפר סבא, ומשלמים בעוד שנה וחצי. דירות 5–6 חדרים החל מ-3.98 מיליון ש"ח.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${assistant.variable}`}
    >
      <body className="min-h-screen bg-navy font-sans text-white">{children}</body>
    </html>
  );
}
