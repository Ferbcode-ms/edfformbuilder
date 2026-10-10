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
  metadataBase: new URL("https://edfformbuilders.pages.dev"),
  title: {
    default: "EDF Form Online — RBI 2026 Service & Software Export Declaration Generator",
    template: "%s | ExportForm",
  },
  description: "Generate your official Service & Software Export Declaration Form (EDF) online under RBI FEMA 23(R)/2026-RB. Free, private, client-side A4 PDF builder for Indian freelancers, agencies, and developers.",
  keywords: [
    "EDF form online",
    "EDF form for freelancers",
    "EDF form 2026",
    "Export Declaration Form India",
    "FEMA 23(R)/2026-RB",
    "service export declaration form",
    "software export declaration",
    "EDF vs SOFTEX",
    "foreign inward remittance document",
    "Section 2B details of export value of services",
    "FIRC EDF declaration",
    "Indian freelancer export form"
  ],
  authors: [{ name: "ExportForm", url: "https://edfformbuilders.pages.dev" }],
  creator: "ExportForm",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/logo.png" }
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "EDF Form Online — RBI 2026 Service & Software Export Declaration",
    description: "Generate your official Service & Software Export Declaration Form (EDF) online under RBI FEMA 23(R)/2026-RB. Free, private, client-side A4 PDF builder.",
    url: "https://edfformbuilders.pages.dev",
    siteName: "ExportForm",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ExportForm - Online EDF Form Generator",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDF Form Online — RBI 2026 Export Declaration Generator",
    description: "Private browser-based PDF generator for Indian freelancers receiving foreign inward remittances under FEMA 23(R)/2026-RB.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
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
