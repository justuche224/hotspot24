"use client";

import AboutSection from "@/components/layout/AboutSection";
import BusinessInfo from "@/components/layout/BusinessInfo";
import ContactSecton from "@/components/layout/ContactSection";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <AboutSection className="h-[100svh]" />
      <BusinessInfo />
      <ContactSecton />
    </div>
  );
};

export default AboutPage;
