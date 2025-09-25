"use client"

import ContactSecton from "@/components/layout/ContactSection";
import HomeSlider from "@/components/layout/HomeSlider";
import BusinessInfo from "@/components/layout/BusinessInfo";
import AboutSection from "@/components/layout/AboutSection";
import ServicesSection from "@/components/layout/ServicesSection";
import Testimonials from "@/components/layout/testimonials";
import CTASection from "@/components/layout/cta-section";

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
    </>
  )
}
