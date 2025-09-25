import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotpot 24 - 24/7 Food Delivery in Lekki, Lagos",
    short_name: "Hotpot 24",
    description:
      "Fresh Nigerian cuisine delivered 24/7 in Lekki Phase 1 & Phase 2. Rice dishes, soups, grills, and authentic Lagos flavors. Fast WhatsApp ordering and home delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdfa",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    categories: ["food", "shopping", "lifestyle"],
    lang: "en",
    scope: "/",
    orientation: "portrait",
  };
}
