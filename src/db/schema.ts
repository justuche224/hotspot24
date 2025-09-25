import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  index,
  boolean,
} from "drizzle-orm/pg-core";

export const order_status = [
  "pending",
  "processing",
  "completed",
  "cancelled",
  "delivered",
] as const;

export const user_roles = ["admin", "user"] as const;

export const branches = pgTable(
  "branches",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    address: text("address").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    description: text("description").notNull(),
    banner: text("banner"),
    whatsapp: text("whatsapp").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("branch_slug_unique").on(table.slug),
    index("branch_name_index").on(table.name),
    index("branch_phone_index").on(table.phone),
    index("branch_slug_index").on(table.slug),
  ]
);

export const categories = pgTable(
  "categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    branchId: text("branch_id").references(() => branches.id),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("category_slug_unique").on(table.slug),
    index("category_name_index").on(table.name),
    index("category_branch_id_index").on(table.branchId),
  ]
);

export const food_items = pgTable(
  "food_items",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    branchId: text("branch_id").references(() => branches.id),
    categoryId: text("category_id").references(() => categories.id),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("food_item_name_index").on(table.name),
    index("food_item_branch_id_index").on(table.branchId),
    index("food_item_category_id_index").on(table.categoryId),
    index("food_item_slug_index").on(table.slug),
  ]
);

export const orders = pgTable(
  "orders",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    branchId: text("branch_id").references(() => branches.id),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerAddress: text("customer_address").notNull(),
    totalAmount: integer("total_amount").notNull(),
    status: text("status").notNull().$type<(typeof order_status)[number]>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_branch_id_index").on(table.branchId),
    index("order_status_index").on(table.status),
  ]
);

export const order_items = pgTable(
  "order_items",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orderId: text("order_id").references(() => orders.id),
    foodItemId: text("food_item_id").references(() => food_items.id),
    branchId: text("branch_id").references(() => branches.id),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_item_order_id_index").on(table.orderId),
    index("order_item_food_item_id_index").on(table.foodItemId),
    index("order_item_branch_id_index").on(table.branchId),
  ]
);

export const branch_relations = relations(branches, ({ many }) => ({
  categories: many(categories),
  food_items: many(food_items),
  orders: many(orders),
  order_items: many(order_items),
}));

export const category_relations = relations(categories, ({ many }) => ({
  food_items: many(food_items),
}));

export const food_item_relations = relations(food_items, ({ one, many }) => ({
  branch: one(branches, {
    fields: [food_items.branchId],
    references: [branches.id],
  }),
  category: one(categories, {
    fields: [food_items.categoryId],
    references: [categories.id],
  }),
  order_items: many(order_items),
}));

export const orders_relations = relations(orders, ({ one, many }) => ({
  branch: one(branches, {
    fields: [orders.branchId],
    references: [branches.id],
  }),
  order_items: many(order_items),
}));

export const order_items_relations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.orderId],
    references: [orders.id],
  }),
  food_item: one(food_items, {
    fields: [order_items.foodItemId],
    references: [food_items.id],
  }),
}));

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").$type<(typeof user_roles)[number]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
