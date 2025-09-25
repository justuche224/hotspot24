"use client"

import ContactSecton from "@/components/layout/ContactSection";
import HomeSlider from "@/components/layout/HomeSlider";
import BusinessInfo from "@/components/layout/BusinessInfo";
import AboutSection from "@/components/layout/AboutSection";
import ServicesSection from "@/components/layout/ServicesSection";
import Testimonials from "@/components/layout/testimonials";
import CTASection from "@/components/layout/cta-section";
import Script from "next/script";

export const dynamic = "force-static";

const pageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": process.env.NEXT_PUBLIC_APP_URL,
  name: "Hotpot 24 - 24/7 Food Delivery in Lekki",
  description:
    "Fresh Nigerian cuisine delivered 24/7 in Lekki Phase 1 & Phase 2. Rice dishes, soups, grills, and authentic Lagos flavors.",
  url: process.env.NEXT_PUBLIC_APP_URL,
  mainEntity: {
    "@type": "Organization",
    name: "Hotpot 24",
    url: process.env.NEXT_PUBLIC_APP_URL,
    sameAs: [
      "https://twitter.com/hotpot24",
      "https://www.youtube.com/@hotpot24",
      "https://instagram.com/hotpot24",
      "https://threads.com/hotpot24",
    ],
  },
};


export default function Home() {
  return (
    <>
      <HomeSlider />
      <BusinessInfo />
      <AboutSection />
      <ServicesSection />
      <CTASection/>
      <Testimonials/>
      <ContactSecton className="pt-12" />
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
