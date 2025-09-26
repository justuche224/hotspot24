import { ClockIcon } from "@/icons/ClockIcon";
import { FaceBookIcon } from "@/icons/FaceBookIcon";
import { InstaIcon } from "@/icons/InstaIcon";
import { LocationIcon } from "@/icons/LocationIcon";
import { PhoneIcon } from "@/icons/PhoneIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";
import { SectionProps } from "@/types/SectionProps";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const BusinessInfo = ({ className }: SectionProps) => {
  return (
    <section className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 py-8 bg-dark">
          <div className="flex justify-center gap-4 md:gap-16">
            <div className="flex gap-4 items-center">
              <PhoneIcon className={"w-10 fill-primary"} />
              <div className="text-center">
                <p className="md:text-lg text-sm font-semibold">
                  +234 707 893 7275
                </p>
                <p className="text-gray-400">Call us now!</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <LocationIcon className={"w-10 stroke-primary"} />
              <div className="text-center">
                <p className="md:text-lg text-sm font-semibold">
                  BIDA CLOSE, PLOT 9019
                </p>
                <p className="text-gray-400">LAKOWE LEKKI PHASE 2</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <ClockIcon className={"w-10 stroke-primary"} />
              <div className="text-center">
                <p className="md:text-lg text-sm font-semibold">Open 24/7</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black py-8 text-center flex flex-row justify-center items-center gap-4 md:gap-0">
          <Button
            as={Link}
            href="https://twitter.com"
            className="bg-transparent"
            startContent={<TwitterIcon className={"w-8 fill-white"} />}
          />
          <Button
            as={Link}
            href="https://facebook.com"
            className="bg-transparent"
            startContent={<FaceBookIcon className={"w-8 fill-white"} />}
          />
          <Button
            as={Link}
            href="https://instagram.com"
            className="bg-transparent"
            startContent={<InstaIcon className={"w-8 stroke-white"} />}
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;
