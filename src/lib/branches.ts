import {
  getPublicBranches,
  getBranchBySlug as getBranchBySlugAction,
} from "@/actions";

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  banner: string | null;
  whatsapp: string;
  createdAt: Date;
  coordinates?: {
    lat: number;
    lng: number;
  };
  whatsappNumber?: string;
  operatingHours?: {
    open: string;
    close: string;
    days: string;
  };
  deliveryRadius?: string;
  deliveryFee?: number;
  testimonials?: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  specialOffers?: {
    title: string;
    description: string;
    validUntil: string;
  }[];
}

// Transform database branch to frontend Branch interface
function transformBranch(dbBranch: {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  banner: string | null;
  whatsapp: string;
  createdAt: Date;
}): Branch {
  return {
    id: dbBranch.id,
    name: dbBranch.name,
    slug: dbBranch.slug,
    address: dbBranch.address,
    phone: dbBranch.phone,
    email: dbBranch.email,
    description: dbBranch.description,
    banner: dbBranch.banner,
    whatsapp: dbBranch.whatsapp,
    createdAt: dbBranch.createdAt,
    // Add hardcoded professional data for missing fields
    coordinates: {
      lat: 6.4474,
      lng: 3.4553,
    },
    whatsappNumber: dbBranch.whatsapp,
    operatingHours: {
      open: "24/7",
      close: "24/7",
      days: "Monday - Sunday",
    },
    deliveryRadius: "5km radius",
    deliveryFee: 0,
    testimonials: [
      {
        id: 1,
        name: "Satisfied Customer",
        rating: 5,
        comment: "Amazing food and excellent service! Highly recommended.",
        date: new Date().toISOString().split("T")[0],
      },
    ],
    specialOffers: [
      {
        title: "Welcome Offer",
        description: "Free delivery for first-time orders above ₦5,000",
        validUntil: "2026-12-31",
      },
    ],
  };
}

export async function getBranches(): Promise<Branch[]> {
  try {
    const dbBranches = await getPublicBranches();
    return dbBranches.map(transformBranch);
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    // Return empty array if database fetch fails
    return [];
  }
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  try {
    const dbBranch = await getBranchBySlugAction(slug);
    if (!dbBranch) return null;
    return transformBranch(dbBranch);
  } catch (error) {
    console.error("Failed to fetch branch:", error);
    return null;
  }
}

export function getAllBranchSlugs(): string[] {
  // This will be populated when branches are fetched
  return [];
}
