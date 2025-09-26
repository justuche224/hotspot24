"use client";

import { FaceBookIcon } from "@/icons/FaceBookIcon";
import { InstaIcon } from "@/icons/InstaIcon";
import { LocationIcon } from "@/icons/LocationIcon";
import { MailIcon } from "@/icons/MailIcon";
import { PhoneIcon } from "@/icons/PhoneIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const iSAdminPage = pathname.includes("/admin");

  if (iSAdminPage) {
    return null;
  }

  return (
    <footer className="bg-gray-950 pt-8 md:pt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 mb-6 px-6 md:px-10 lg:px-48">
        <div className="col-span-full lg:col-span-1">
          <Link
            href="/"
            className="text-primary text-xl md:text-2xl font-josefin"
          >
            Hotpot24
          </Link>
          <div className="mt-4 md:mt-6 flex gap-4 md:gap-6">
            <TwitterIcon className={"w-6"} />
            <FaceBookIcon className={"w-6"} />
            <InstaIcon className={"w-6"} />
          </div>
        </div>

        <div>
          <h4 className="uppercase text-sm md:text-base">About Us</h4>
          <p className="mt-6 text-gray-400">
            Passionate about delivering unforgettable experiences with every
            savory dish we deliver.
          </p>
        </div>

        <div>
          <h4 className="uppercase text-sm md:text-base">Opening Hours</h4>
          <p className="mt-6 text-gray-400">Monday - Sunday</p>
          <p className="mt-2 text-gray-400">24/7</p>
        </div>

        <div>
          <h4 className="uppercase text-sm md:text-base">Services</h4>
          <div className="mt-6 grid space-y-2 text-gray-400">
            <p>
              <Link
                className="inline-flex gap-x-2 hover:text-gray-200"
                href="/branches"
              >
                Online Ordering
              </Link>
            </p>
            <p>
              <Link
                className="inline-flex gap-x-2 hover:text-gray-200"
                href="/branches"
              >
                Catering
              </Link>
            </p>
            <p>
              <Link
                className="inline-flex gap-x-2 hover:text-gray-200"
                href="/branches"
              >
                Specialty dishes
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-sm md:text-base">Have a question?</h4>
          <div className="mt-6 text-gray-400">
            <ul className="space-y-3">
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="flex-shrink-0">
                  <LocationIcon className={"w-6"} />
                </span>
                <span className="text-sm sm:text-base">
                  BIDA CLOSE, PLOT 9019 LAKOWE LEKKI PHASE 2
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="flex-shrink-0">
                  <LocationIcon className={"w-6"} />
                </span>
                <span className="text-sm sm:text-base">
                  NO. 12 BABAJIDE OKUNBI AVENUE, THERA ANNEX ESTATE, SANGOTEDO
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="flex-shrink-0">
                  <PhoneIcon className={"w-6"} />
                </span>
                <span className="text-sm sm:text-base">+234 707 893 7275</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="flex-shrink-0">
                  <MailIcon className={"w-6"} />
                </span>
                <span className="text-sm sm:text-base">info@hotpot24.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-700 text-center">
        <p className="mt-4 text-gray-400">
          Copyright &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
