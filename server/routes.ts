import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMenuSchema, 
  insertRecipeSchema, 
  insertRecommendationSchema 
} from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for menus
  app.post("/api/menus", async (req, res) => {
    try {
      const validatedData = insertMenuSchema.parse(req.body);
      const menu = await storage.createMenu(validatedData);
      res.status(201).json(menu);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/menus", async (req, res) => {
    const menus = await storage.getMenus();
    res.json(menus);
  });

  app.get("/api/menus/:id", async (req, res) => {
    const menuId = parseInt(req.params.id);
    const menu = await storage.getMenu(menuId);
    
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    
    res.json(menu);
  });

  // API routes for recipes
  app.post("/api/recipes", async (req, res) => {
    try {
      const validatedData = insertRecipeSchema.parse(req.body);
      const recipe = await storage.createRecipe(validatedData);
      res.status(201).json(recipe);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/recipes", async (req, res) => {
    const category = req.query.category as string | undefined;
    const recipes = await storage.getRecipes(category);
    res.json(recipes);
  });

  app.post("/api/recipes/:id/like", async (req, res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = await storage.likeRecipe(recipeId);
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.json(recipe);
  });

  app.post("/api/recipes/:id/comment", async (req, res) => {
    const recipeId = parseInt(req.params.id);
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const recipe = await storage.addRecipeComment(recipeId, text);
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.json(recipe);
  });

  // API routes for recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const validatedData = insertRecommendationSchema.parse(req.body);
      const recommendation = await storage.createRecommendation(validatedData);
      res.status(201).json(recommendation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/recommendations", async (req, res) => {
    const recommendations = await storage.getRecommendations();
    res.json(recommendations);
  });

  app.post("/api/recommendations/:id/like", async (req, res) => {
    const recommendationId = parseInt(req.params.id);
    const recommendation = await storage.likeRecommendation(recommendationId);
    
    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    
    res.json(recommendation);
  });

  app.post("/api/recommendations/:id/comment", async (req, res) => {
    const recommendationId = parseInt(req.params.id);
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const recommendation = await storage.addRecommendationComment(recommendationId, text);
    
    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    
    res.json(recommendation);
  });

  // Community feed
  app.get("/api/feed", async (req, res) => {
    const feed = await storage.getFeed();
    res.json(feed);
  });

  const httpServer = createServer(app);
  return httpServer;
}
