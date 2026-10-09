import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "EDF Form Online for Indian Freelancers | ExportForm",
  description: "Prepare your service export EDF online. A private browser-based PDF generator for Indian freelancers receiving foreign inward remittances.",
  keywords: ["EDF form", "Export Declaration Form", "Service Export India", "Freelance foreign payment", "SOFTEX alternative"],
  authors: [{ name: "ExportForm" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/logo.png' }
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "ExportForm — EDF Generator",
    description: "Private browser-based PDF generator for Indian freelancers receiving foreign inward remittances.",
    type: "website",
    locale: "en_IN",
    siteName: "ExportForm",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExportForm — EDF Generator",
    description: "Private browser-based PDF generator for Indian freelancers receiving foreign inward remittances.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
