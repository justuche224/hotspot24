"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Branch } from "@/lib/branches";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPublicFoodItems, getPublicCategories } from "@/actions";
import { toast } from "sonner";
import AddToCart from "./add-to-cart";
import formatPrice from "@/lib/price-formatter";
interface BranchMenuProps {
  branch: Branch;
}

interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  slug: string;
  categoryId: string;
  branchId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const fetchCategories = async (branchId: string): Promise<Category[]> => {
  const categories = await getPublicCategories(branchId);
  return categories;
};

const fetchFoodItems = async (branchId: string): Promise<FoodItem[]> => {
  const foodItemsData = await getPublicFoodItems(branchId);
  return foodItemsData
    .filter((item) => item.categoryId !== null && item.branchId !== null)
    .map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      description: item.description,
      slug: item.slug,
      categoryId: item.categoryId!,
      branchId: item.branchId!,
    }));
};

export default function BranchMenu({ branch }: BranchMenuProps) {
  const { items } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories", branch.id],
    queryFn: () => fetchCategories(branch.id),
  });

  const {
    data: foodItems = [],
    isLoading: foodItemsLoading,
    error: foodItemsError,
  } = useQuery({
    queryKey: ["foodItems", branch.id],
    queryFn: () => fetchFoodItems(branch.id),
  });

  const isLoading = categoriesLoading || foodItemsLoading;
  const error = categoriesError || foodItemsError;

  // Set first category as selected if available and none is currently selected
  useEffect(() => {
    if (categories.length > 0 && selectedCategory === "") {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch menu data:", error);
      toast.error("Failed to load menu");
    }
  }, [error]);

  const menuItems =
    categories.length > 0
      ? categories.map((category, index) => ({
          id: category.id,
          name: category.name,
          isActive:
            selectedCategory === category.id ||
            (selectedCategory === "" && index === 0),
        }))
      : [];

  const activeCategory = menuItems.find((item) => item.isActive);
  const branchCartItems = items.filter(
    (item) => item.branchSlug === branch.slug
  );
  const totalCartItems = branchCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Filter food items based on search query and selected category
  const filteredFoodItems = foodItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // const handleAddToCart = (foodItem: FoodItem) => {
  //   addItem({
  //     id: foodItem.slug,
  //     name: foodItem.name,
  //     price: foodItem.price,
  //     quantity: 1,
  //     image: foodItem.image,
  //     productSlug: foodItem.slug,
  //     branchSlug: branch.slug,
  //   });
  //   toast.success(`${foodItem.name} added to cart`);
  // };

  if (isLoading) {
    return (
      <section
        id="menu"
        className="min-h-screen flex items-center justify-center relative overflow-hidden text-gray-100"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="menu"
      className="min-h-screen space-y-8 relative overflow-hidden text-gray-100"
    >
      <div className="absolute -z-10 inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>
      <div className="absolute -z-10 top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-orange-900/8 to-transparent rounded-b-[4rem]" />
      <div className="absolute -z-10 top-10 right-[-10%] w-[40rem] h-[40rem] bg-gradient-to-bl from-red-900/6 to-transparent rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-[-20%] left-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-orange-900/5 to-transparent rounded-full blur-3xl" />

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight">
          Our Menu
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full glass-border-subtle focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-gray-100 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center px-4 py-3 glass-border-subtle rounded-full shadow-sm hover:border-orange-500/40 transition text-gray-100">
            <Filter className="mr-2 text-gray-300" />
            Filters
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCategory(String(item.id));
              }}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg ${
                item.isActive
                  ? "bg-orange-600 text-white scale-105"
                  : "glass-border-subtle text-gray-100 hover:border-orange-500/40"
              }`}
            >
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">
            {activeCategory?.name}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {filteredFoodItems.length} items available
            </span>
            {totalCartItems > 0 && (
              <Button
                asChild
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
              >
                <Link href={`/branches/${branch.slug}/cart`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Cart ({totalCartItems})
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredFoodItems.map((item) => (
            <motion.div
              key={item.id}
              // @ts-ignore - framer motion
              className="group rounded-2xl overflow-hidden glass-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-orange-500/30"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 glass-border-enhanced px-2 py-1 rounded-full text-sm font-medium text-gray-100 flex items-center">
                  ⭐ 4.5
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-lg text-gray-100 line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-col justify-between items-center gap-2">
                  <span className="text-xl font-bold text-gray-100 text-left">
                    {formatPrice(item.price)}
                  </span>
                  {/* <Button
                    onClick={() => handleAddToCart(item)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </Button> */}
                  <AddToCart
                    product={{
                      id: item.id,
                      branchSlug: branch.slug,
                      image: item.image,
                      name: item.name,
                      price: item.price,
                      productSlug: item.slug,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {branch.specialOffers && branch.specialOffers.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="text-3xl font-bold text-gray-100 tracking-tight">
            Special Offers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branch.specialOffers.map((offer, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden bg-gradient-to-r from-orange-800 to-red-900 p-6 text-gray-100 shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">{offer.title}</h4>
                <p className="mb-4">{offer.description}</p>
                <button className="glass-border-enhanced text-orange-400 px-6 py-2 rounded-lg font-medium hover:border-orange-500/50">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
