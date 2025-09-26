"use client";
import Map from "../common/Map";
import { SectionProps } from "@/types/SectionProps";
import ContactUsForm from "../common/form/ContactUsForm";

const ContactSecton = ({ className }: SectionProps) => {
  return (
    <section id="contact" className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
        <div className="flex flex-col justify-center items-center gap-5 p-4 md:p-0">
          <div className="w-full h-64 md:h-96">
            <Map />
          </div>
        </div>
        <div className="container py-8 md:py-20 px-4 md:px-0 max-w-4xl">
          <div className="text-center mb-6 md:mb-10">
            <h1 className="mb-2 text-2xl md:text-4xl">Contact Us</h1>
            <p className="text-gray-400">
              We&apos;d love to talk about how we can help you.
            </p>
          </div>
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSecton;
