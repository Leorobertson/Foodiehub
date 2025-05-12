import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Menu table
export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  address: text("address").notNull(),
  logo: text("logo"),
  items: jsonb("items").notNull(),
  photoSize: text("photo_size").notNull(),
  photoShape: text("photo_shape").notNull(),
  backgroundColor: text("background_color").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Recipe table
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  ingredients: jsonb("ingredients").notNull(),
  instructions: text("instructions"),
  category: text("category").notNull(),
  photo: text("photo"),
  userId: integer("user_id").notNull(),
  likes: integer("likes").default(0).notNull(),
  comments: jsonb("comments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Recommendation table
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  restaurantName: text("restaurant_name").notNull(),
  address: text("address").notNull(),
  review: text("review").notNull(),
  rating: integer("rating").notNull(),
  userId: integer("user_id").notNull(),
  likes: integer("likes").default(0).notNull(),
  comments: jsonb("comments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User table from the existing schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert Schemas
export const insertMenuSchema = createInsertSchema(menus).omit({ id: true });
export const insertRecipeSchema = createInsertSchema(recipes).omit({ id: true, likes: true, comments: true });
export const insertRecommendationSchema = createInsertSchema(recommendations).omit({ id: true, likes: true, comments: true });
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertMenu = z.infer<typeof insertMenuSchema>;
export type Menu = typeof menus.$inferSelect;

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;

export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
