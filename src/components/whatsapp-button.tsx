"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Branch } from "@/lib/branches";

interface WhatsAppButtonProps {
  branch?: Branch;
  phoneNumber?: string;
  message: string;
  buttonText?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

export default function WhatsAppButton({
  branch,
  phoneNumber,
  message,
  buttonText = "WhatsApp",
  size,
  variant = "outline",
  className = "bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-100 rounded-xl",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    let whatsappNumber: string;

    if (branch) {
      whatsappNumber = branch.whatsappNumber || branch.whatsapp;
    } else if (phoneNumber) {
      whatsappNumber = phoneNumber;
    } else {
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleWhatsAppClick}
    >
      <Phone className="h-4 w-4" />
      {buttonText && <span className="ml-2">{buttonText}</span>}
    </Button>
  );
}
