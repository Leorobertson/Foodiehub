import { 
  users, type User, type InsertUser,
  menus, type Menu, type InsertMenu,
  recipes, type Recipe, type InsertRecipe,
  recommendations, type Recommendation, type InsertRecommendation
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu operations
  getMenu(id: number): Promise<Menu | undefined>;
  getMenus(): Promise<Menu[]>;
  createMenu(menu: InsertMenu): Promise<Menu>;
  
  // Recipe operations
  getRecipe(id: number): Promise<Recipe | undefined>;
  getRecipes(category?: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  likeRecipe(id: number): Promise<Recipe | undefined>;
  addRecipeComment(id: number, text: string): Promise<Recipe | undefined>;
  
  // Recommendation operations
  getRecommendation(id: number): Promise<Recommendation | undefined>;
  getRecommendations(): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  likeRecommendation(id: number): Promise<Recommendation | undefined>;
  addRecommendationComment(id: number, text: string): Promise<Recommendation | undefined>;
  
  // Feed operation
  getFeed(): Promise<(Recipe | Recommendation)[]>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private menus: Map<number, Menu>;
  private recipes: Map<number, Recipe>;
  private recommendations: Map<number, Recommendation>;
  
  private userCurrentId: number;
  private menuCurrentId: number;
  private recipeCurrentId: number;
  private recommendationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.menus = new Map();
    this.recipes = new Map();
    this.recommendations = new Map();
    
    this.userCurrentId = 1;
    this.menuCurrentId = 1;
    this.recipeCurrentId = 1;
    this.recommendationCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Menu operations
  async getMenu(id: number): Promise<Menu | undefined> {
    return this.menus.get(id);
  }
  
  async getMenus(): Promise<Menu[]> {
    return Array.from(this.menus.values());
  }
  
  async createMenu(insertMenu: InsertMenu): Promise<Menu> {
    const id = this.menuCurrentId++;
    const created_at = new Date();
    const menu: Menu = { ...insertMenu, id, created_at };
    this.menus.set(id, menu);
    return menu;
  }
  
  // Recipe operations
  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }
  
  async getRecipes(category?: string): Promise<Recipe[]> {
    const allRecipes = Array.from(this.recipes.values());
    if (!category) return allRecipes;
    return allRecipes.filter(recipe => recipe.category === category);
  }
  
  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.recipeCurrentId++;
    const created_at = new Date();
    const likes = 0;
    const comments = [];
    const recipe: Recipe = { ...insertRecipe, id, created_at, likes, comments };
    this.recipes.set(id, recipe);
    return recipe;
  }
  
  async likeRecipe(id: number): Promise<Recipe | undefined> {
    const recipe = this.recipes.get(id);
    if (!recipe) return undefined;
    
    const updatedRecipe = { ...recipe, likes: recipe.likes + 1 };
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }
  
  async addRecipeComment(id: number, text: string): Promise<Recipe | undefined> {
    const recipe = this.recipes.get(id);
    if (!recipe) return undefined;
    
    const newComment = {
      id: Date.now().toString(),
      author: "User", // In a real app, this would be the logged-in user
      text,
      date: new Date()
    };
    
    const currentComments = recipe.comments || [];
    const updatedRecipe = { 
      ...recipe, 
      comments: [...currentComments, newComment] 
    };
    
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }
  
  // Recommendation operations
  async getRecommendation(id: number): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }
  
  async getRecommendations(): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values())
      .sort((a, b) => b.rating - a.rating);
  }
  
  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = this.recommendationCurrentId++;
    const created_at = new Date();
    const likes = 0;
    const comments = [];
    const recommendation: Recommendation = { 
      ...insertRecommendation, 
      id, 
      created_at, 
      likes, 
      comments 
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
  
  async likeRecommendation(id: number): Promise<Recommendation | undefined> {
    const recommendation = this.recommendations.get(id);
    if (!recommendation) return undefined;
    
    const updatedRecommendation = { ...recommendation, likes: recommendation.likes + 1 };
    this.recommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }
  
  async addRecommendationComment(id: number, text: string): Promise<Recommendation | undefined> {
    const recommendation = this.recommendations.get(id);
    if (!recommendation) return undefined;
    
    const newComment = {
      id: Date.now().toString(),
      author: "User", // In a real app, this would be the logged-in user
      text,
      date: new Date()
    };
    
    const currentComments = recommendation.comments || [];
    const updatedRecommendation = { 
      ...recommendation, 
      comments: [...currentComments, newComment] 
    };
    
    this.recommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }
  
  // Feed operation
  async getFeed(): Promise<(Recipe | Recommendation)[]> {
    const allRecipes = Array.from(this.recipes.values());
    const allRecommendations = Array.from(this.recommendations.values());
    
    const combinedFeed = [...allRecipes, ...allRecommendations];
    
    // Sort by created_at, newest first
    return combinedFeed.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }
}

export const storage = new MemStorage();
