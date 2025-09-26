"use client"

import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { usePathname } from "next/navigation";

const PublicNav = () => {
  const pathname = usePathname();
  
  const iSAdminPage = pathname.includes("/admin");

  if(iSAdminPage){
    return null;
  }

  return (
    <header className="fixed top-0 z-[99] p-4 w-full">
      <nav className="container mx-auto max-w-4xl liquid-glass-header shadow flex items-center justify-between w-full px-5 md:px-20 py-2 rounded-full">
          <Link
            href={"/"}
            className="font-bold tracking-tigt flex items-center gap-1"
          >
            <ShoppingCart />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600">
              Hotpot 24
            </span>
          </Link>
        <div className="flex gap-1">
          <Button
            aria-label="Branches"
            className="hidden md:inline-block liquid-glass"
            asChild
            variant={"link"}
          >
            <Link href={"/branches"}>Branches</Link>
          </Button>
          <Button
            aria-label="About Us"
            className="hidden md:inline-block liquid-glass"
            asChild
            variant={"link"}
          >
            <Link href={"/about"}>About Us</Link>
          </Button>
          <Button
            aria-label="Contact"
            className="hidden md:inline-block liquid-glass"
            asChild
            variant={"link"}
          >
            <Link href={"/contact"}>Contact</Link>
          </Button>
        </div>
        <div className="gap-4 hidden md:flex">
          {/* <Button aria-label="Cart" size={"sm"} variant={"outline"} asChild>
            <Link href={"/branches"}>Browse Locations</Link>
          </Button> */}
          <Button aria-label="Order Now" size={"sm"} asChild>
            <Link href={"/branches"}>Order Now</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button aria-label="Menu" variant={"outline"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="md:hidden w-[100%] z-[100] liquid-glass-enhanced">
            <SheetHeader>
              <div className="flex justify-between">
                <SheetTitle>
                  <Button
                    aria-label="Home"
                    asChild
                    variant={"ghost"}
                    className="font-bold tracking-tigt flex gap-1"
                  >
                    <Link href={"/"}>
                      <ShoppingCart />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600">
                        Hotpot 24
                      </span>
                    </Link>
                  </Button>
                </SheetTitle>
              </div>
            </SheetHeader>
            <SheetDescription className="flex flex-col gap-2 px-10">
              <Button aria-label="Branches" asChild>
                <Link href={"/branches"}>Branches</Link>
              </Button>
              <Button aria-label="About Us" asChild>
                <Link href={"/about"}>About Us</Link>
              </Button>
              <Button aria-label="Order Now" size={"sm"} asChild>
                <Link href={"/branches"}>Order Now</Link>
              </Button>
              {/* <Separator /> */}
              {/* <div className="flex justify-between">
                <span>Theme</span>
                <ModeToggle />
              </div>
              <Separator /> */}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default PublicNav;
