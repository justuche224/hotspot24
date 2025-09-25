"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar className="font-semibold bg-dark py-3 ">
      <NavbarBrand>
        <Link href="/" className="text-primary text-2xl font-josefin">
          Pizza Fiesta
        </Link>
      </NavbarBrand>
      <NavbarContent className="gap-8" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/" aria-current="page" className="hover:text-primary">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/menu"}>
          <Link href="/menu" className="hover:text-primary">
            Menu
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/contact"}>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href="/branches">
          <Button
            color="primary"
            className="font-semibold rounded-full px-6 py-2 text-dark"
          >
            Branches
          </Button>
        </Link>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
