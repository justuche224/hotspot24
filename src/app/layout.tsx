import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { AppContextProvider } from "../util/ContextProvider";
import { Toaster } from "react-hot-toast";
import PrelineScript from "@/util/PrelineScript";
import { UIProvider } from "@/util/UIProvider";
import PublicNav from "@/components/layout/nav";
import { ReactQueryProvider } from "@/providers/react-query-provider";

export const metadata: Metadata = {
  title: "Hotpot 24 - 24/7 Food Delivery in Lekki",
  description:
    "Fresh Nigerian cuisine delivered 24/7 in Lekki Phase 1 & Phase 2. Rice dishes, soups, grills, and authentic Lagos flavors. Fast WhatsApp ordering.",
  openGraph: {
    title: "Hotpot 24 - 24/7 Food Delivery in Lekki",
    description:
      "Fresh Nigerian cuisine delivered 24/7 in Lekki Phase 1 & Phase 2. Rice dishes, soups, grills, and authentic Lagos flavors. Fast WhatsApp ordering.",
    images: [
      {
        url: "/images/hotpot24-20250924-0002.jpg",
        width: 1920,
        height: 1280,
        alt: "Hotpot 24 - 24/7 Food Delivery in Lekki",
      },
    ],
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Hotpot 24",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotpot 24 - 24/7 Food Delivery in Lekki",
    description:
      "Fresh Nigerian cuisine delivered 24/7 in Lekki Phase 1 & Phase 2. Rice dishes, soups, grills, and authentic Lagos flavors. Fast WhatsApp ordering.",
    images: [
      {
        url: "/images/hotpot24-20250924-0002.jpg",
        width: 1920,
        height: 1280,
        alt: "Hotpot 24 - 24/7 Food Delivery in Lekki",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  keywords: [
    "Hotpot 24",
    "Hotpot 24 Lekki",
    "Food delivery Lekki",
    "24/7 food delivery",
    "Nigerian food delivery",
    "Lekki food delivery",
    "Lagos food delivery",
    "Rice dishes Lekki",
    "Soups and stews Lekki",
    "Grilled food Lekki",
    "Protein dishes Lekki",
    "Food specials Lekki",
    "Fresh Nigerian cuisine",
    "Authentic Lagos food",
    "Late night food Lekki",
    "Fast food delivery Lekki",
    "WhatsApp food ordering",
    "Home delivery Lekki",
    "Lekki Phase 1 food delivery",
    "Lekki Phase 2 food delivery",
    "Hotpot 24 Phase 1",
    "Hotpot 24 Phase 2",
    "Jollof rice delivery",
    "Nigerian rice dishes",
    "Grilled chicken Lekki",
    "Food delivery Nigeria",
    "Best food in Lekki",
    "Local food delivery",
    "Fresh ingredients Lekki",
    "Nigerian restaurant Lekki",
    "Food delivery service Lagos",
    "Quick food delivery",
    "Online food ordering Lekki",
    "Food delivery WhatsApp",
    "Lekki food service",
    "Nigerian food Lekki Phase 1",
    "Nigerian food Lekki Phase 2",
    "Hotpot restaurant Lekki",
    "Food delivery 24 hours",
    "Lekki food delivery service",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
  authors: [{ name: "Hotpot 24" }],
  creator: "Hotpot 24",
  publisher: "Hotpot 24",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins bg-[url('/assets/bg_dark.jpg')] bg-repeat bg-fixed">
        <UIProvider>
          <PublicNav />
          <main>
            <AppContextProvider>
              <Toaster />
              <ReactQueryProvider>{children}</ReactQueryProvider>
              <Footer />
            </AppContextProvider>
          </main>
        </UIProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
