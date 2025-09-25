"use server";

import db from "@/db";
import {
  branches,
  categories,
  food_items,
  orders,
  order_items,
  order_status,
} from "@/db/schema";
import { uploadFile } from "@/lib/upload";
import { slugify } from "@/lib/slugify";
import { serverAuth } from "@/lib/server-auth";
import { eq, and, desc, sql } from "drizzle-orm";

// ADMIN ACTIONS

export const createBranch = async (formData: FormData) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;
  const address = formData.get("address") as string | null;
  const phone = formData.get("phone") as string | null;
  const email = formData.get("email") as string | null;
  const description = formData.get("description") as string | null;
  const banner = formData.get("banner");
  const whatsapp = formData.get("whatsapp") as string | null;

  if (!name || !address || !phone || !email || !description || !whatsapp)
    throw new Error("All fields are required");

  let bannerUrl = null;

  if (banner && banner instanceof File) {
    bannerUrl = await uploadFile(banner, "banner");
  }

  await db.insert(branches).values({
    name: name as string,
    slug: slugify(name as string),
    address: address as string,
    phone: phone as string,
    email: email as string,
    description: description as string,
    banner: bannerUrl,
    whatsapp: whatsapp as string,
  });

  return "Branch created successfully";
};

export const updateBranch = async (branchId: string, formData: FormData) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;
  const address = formData.get("address") as string | null;
  const phone = formData.get("phone") as string | null;
  const email = formData.get("email") as string | null;
  const description = formData.get("description") as string | null;
  const banner = formData.get("banner");
  const whatsapp = formData.get("whatsapp") as string | null;

  if (!name || !address || !phone || !email || !description || !whatsapp)
    throw new Error("All fields are required");

  let bannerUrl = null;

  if (banner && banner instanceof File) {
    bannerUrl = await uploadFile(banner, "banner");
  }

  const updateData: Partial<typeof branches.$inferInsert> = {
    name: name as string,
    address: address as string,
    phone: phone as string,
    email: email as string,
    description: description as string,
    whatsapp: whatsapp as string,
    updatedAt: new Date(),
  };

  if (bannerUrl) {
    updateData.banner = bannerUrl;
  }

  await db.update(branches).set(updateData).where(eq(branches.id, branchId));

  return "Branch updated successfully";
};

export const deleteBranch = async (branchId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  await db.delete(branches).where(eq(branches.id, branchId));

  return "Branch deleted successfully";
};

export const getBranches = async () => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const result = await db
    .select()
    .from(branches)
    .orderBy(desc(branches.createdAt));

  return { success: true, data: result };
};

// CATEGORY ADMIN ACTIONS
export const createCategory = async (branchId: string, formData: FormData) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;

  if (!name) throw new Error("Category name is required");

  await db.insert(categories).values({
    branchId: branchId,
    name: name as string,
    slug: slugify(name as string),
  });

  return "Category created successfully";
};

export const updateCategory = async (
  categoryId: string,
  formData: FormData
) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;

  if (!name) throw new Error("Category name is required");

  await db
    .update(categories)
    .set({
      name: name as string,
      slug: slugify(name as string),
      updatedAt: new Date(),
    })
    .where(eq(categories.id, categoryId));

  return "Category updated successfully";
};

export const deleteCategory = async (categoryId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  await db.delete(categories).where(eq(categories.id, categoryId));

  return "Category deleted successfully";
};

export const getCategories = async (branchId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.branchId, branchId))
    .orderBy(desc(categories.createdAt));

  return result;
};

export const getCategoryById = async (categoryId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId));

  if (!category) throw new Error("Category not found");

  return category;
};

// FOOD ITEM ADMIN ACTIONS
export const createFoodItem = async (
  branchId: string,
  categoryId: string,
  formData: FormData
) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const image = formData.get("image");
  const price = formData.get("price") as string | null;

  if (!name || !description || !image || !price) {
    console.log("name", name);
    console.log("description", description);
    console.log("image", typeof image);
    console.log("price", price);
    console.log("branchId", branchId);
    console.log("categoryId", categoryId);
    throw new Error("All fields are required");
  }

  if (!(image instanceof File)) throw new Error("Invalid image file");

  const imageUrl = await uploadFile(image, "food-item");

  await db.insert(food_items).values({
    branchId: branchId,
    categoryId: categoryId,
    name: name as string,
    slug: slugify(name as string),
    description: description as string,
    image: imageUrl,
    price: parseInt(price as string),
  });

  return "Food item created successfully";
};

export const updateFoodItem = async (
  foodItemId: string,
  formData: FormData
) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const image = formData.get("image");
  const price = formData.get("price") as string | null;

  if (!name || !description || !price)
    throw new Error("All fields are required");

  const updateData: Partial<typeof food_items.$inferInsert> = {
    name: name as string,
    slug: slugify(name as string),
    description: description as string,
    price: parseInt(price as string),
    updatedAt: new Date(),
  };

  if (image && image instanceof File) {
    updateData.image = await uploadFile(image, "food-item");
  }

  await db
    .update(food_items)
    .set(updateData)
    .where(eq(food_items.id, foodItemId));

  return "Food item updated successfully";
};

export const deleteFoodItem = async (foodItemId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  await db.delete(food_items).where(eq(food_items.id, foodItemId));

  return "Food item deleted successfully";
};

export const getFoodItems = async (branchId: string, categoryId?: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  let whereClause;
  if (categoryId) {
    whereClause = and(
      eq(food_items.branchId, branchId),
      eq(food_items.categoryId, categoryId)
    );
  } else {
    whereClause = eq(food_items.branchId, branchId);
  }

  const result = await db
    .select()
    .from(food_items)
    .where(whereClause)
    .orderBy(desc(food_items.createdAt));

  return result;
};

export const getFoodItemById = async (foodItemId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const [foodItem] = await db
    .select()
    .from(food_items)
    .where(eq(food_items.id, foodItemId));

  if (!foodItem) throw new Error("Food item not found");

  return foodItem;
};

export const getFoodItemsCount = async (branchId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(food_items)
    .where(eq(food_items.branchId, branchId));

  return result[0]?.count || 0;
};

// ORDER ADMIN ACTIONS
export const getAllOrders = async (branchId?: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  let whereClause;
  if (branchId) {
    whereClause = eq(orders.branchId, branchId);
  }

  const result = await db
    .select()
    .from(orders)
    .where(whereClause)
    .orderBy(desc(orders.createdAt));

  return result;
};

export const updateOrderStatus = async (
  orderId: string,
  status: (typeof order_status)[number]
) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  if (!order_status.includes(status)) {
    throw new Error("Invalid status");
  }

  await db
    .update(orders)
    .set({
      status: status,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return "Order status updated successfully";
};

export const getOrderDetails = async (orderId: string) => {
  const user = await serverAuth();

  if (!user) throw new Error("Unauthorized");
  if (user.role !== "admin") throw new Error("Unauthorized");

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");

  const orderItems = await db
    .select({
      id: order_items.id,
      orderId: order_items.orderId,
      foodItemId: order_items.foodItemId,
      branchId: order_items.branchId,
      quantity: order_items.quantity,
      price: order_items.price,
      createdAt: order_items.createdAt,
      updatedAt: order_items.updatedAt,
      foodItemName: food_items.name,
      foodItemImage: food_items.image,
    })
    .from(order_items)
    .leftJoin(food_items, eq(order_items.foodItemId, food_items.id))
    .where(eq(order_items.orderId, orderId));

  return { order, orderItems };
};

// PUBLIC ACTIONS

export const getPublicBranches = async () => {
  const result = await db
    .select({
      id: branches.id,
      name: branches.name,
      slug: branches.slug,
      address: branches.address,
      phone: branches.phone,
      email: branches.email,
      description: branches.description,
      banner: branches.banner,
      whatsapp: branches.whatsapp,
      createdAt: branches.createdAt,
    })
    .from(branches)
    .orderBy(desc(branches.createdAt));

  return result;
};

export const getBranchBySlug = async (slug: string) => {
  const [branch] = await db
    .select()
    .from(branches)
    .where(eq(branches.slug, slug));

  if (!branch) throw new Error("Branch not found");

  return branch;
};

export const getPublicCategories = async (branchId: string) => {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.branchId, branchId))
    .orderBy(desc(categories.createdAt));

  return result;
};

export const getPublicFoodItems = async (
  branchId: string,
  categoryId?: string
) => {
  let whereClause;
  if (categoryId) {
    whereClause = and(
      eq(food_items.branchId, branchId),
      eq(food_items.categoryId, categoryId)
    );
  } else {
    whereClause = eq(food_items.branchId, branchId);
  }

  const result = await db
    .select()
    .from(food_items)
    .where(whereClause)
    .orderBy(desc(food_items.createdAt));

  return result;
};

export const getFoodItemBySlug = async (branchId: string, slug: string) => {
  const [foodItem] = await db
    .select()
    .from(food_items)
    .where(and(eq(food_items.branchId, branchId), eq(food_items.slug, slug)));

  if (!foodItem) throw new Error("Food item not found");

  return foodItem;
};

export const createOrder = async (formData: FormData) => {
  const branchId = formData.get("branchId") as string | null;
  const customerName = formData.get("customerName") as string | null;
  const customerPhone = formData.get("customerPhone") as string | null;
  const customerAddress = formData.get("customerAddress") as string | null;
  const items = formData.get("items") as string | null; // JSON string of items

  if (
    !branchId ||
    !customerName ||
    !customerPhone ||
    !customerAddress ||
    !items
  ) {
    throw new Error("All fields are required");
  }

  try {
    const parsedItems = JSON.parse(items as string);

    // Calculate total amount
    let totalAmount = 0;
    for (const item of parsedItems) {
      const [foodItem] = await db
        .select()
        .from(food_items)
        .where(eq(food_items.id, item.foodItemId));

      if (!foodItem) throw new Error("Invalid food item");
      totalAmount += foodItem.price * item.quantity;
    }

    // Create order
    const [order] = await db
      .insert(orders)
      .values({
        branchId: branchId as string,
        customerName: customerName as string,
        customerPhone: customerPhone as string,
        customerAddress: customerAddress as string,
        totalAmount: totalAmount,
        status: "pending",
      })
      .returning();

    // Create order items
    for (const item of parsedItems) {
      const [foodItem] = await db
        .select()
        .from(food_items)
        .where(eq(food_items.id, item.foodItemId));

      await db.insert(order_items).values({
        orderId: order.id,
        foodItemId: item.foodItemId,
        branchId: branchId as string,
        quantity: item.quantity,
        price: foodItem.price,
      });
    }

    return {
      success: "Order created successfully",
      data: { orderId: order.id },
    };
  } catch {
    throw new Error("Invalid items data");
  }
};

export const getOrderStatus = async (orderId: string) => {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");

  const orderItems = await db
    .select()
    .from(order_items)
    .where(eq(order_items.orderId, orderId));

  return { order, orderItems };
};

export const getOrdersByPhone = async (phone: string) => {
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.customerPhone, phone))
    .orderBy(desc(orders.createdAt));

  return result;
};
