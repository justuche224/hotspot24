import SectionHeader from "@/components/layout/SectionHeader";
import ServicesSection from "@/components/layout/ServicesSection";
import BranchesPage from "./branches";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="space-y-10 pt-24">
      <SectionHeader
        header={"Our Branches"}
        description={
          "We have branches in different locations across Lagos, Nigeria. You can find us in Lekki, Victoria Island, Ikoyi, Ajah, and Badore."
        }
      />
      <BranchesPage />
      <ServicesSection />
    </div>
  );
};

export default ServicesPage;
