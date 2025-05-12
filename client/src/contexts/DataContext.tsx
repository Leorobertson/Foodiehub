import { createContext, useState, useContext, ReactNode } from "react";
import { 
  Recipe, 
  Recommendation,
  RecipeCategory
} from "../types";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

interface DataContextType {
  recipes: Recipe[];
  recommendations: Recommendation[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'date' | 'likes' | 'comments'>) => void;
  addRecommendation: (recommendation: Omit<Recommendation, 'id' | 'date' | 'likes' | 'comments'>) => void;
  likeRecipe: (id: string) => void;
  likeRecommendation: (id: string) => void;
  addComment: (id: string, type: 'recipe' | 'recommendation', text: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'date' | 'likes' | 'comments'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: uuidv4(),
      date: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const addRecommendation = (recommendation: Omit<Recommendation, 'id' | 'date' | 'likes' | 'comments'>) => {
    const newRecommendation: Recommendation = {
      ...recommendation,
      id: uuidv4(),
      date: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setRecommendations(prev => [newRecommendation, ...prev]);
  };

  const likeRecipe = (id: string) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
    ));
  };

  const likeRecommendation = (id: string) => {
    setRecommendations(prev => prev.map(recommendation => 
      recommendation.id === id ? { ...recommendation, likes: recommendation.likes + 1 } : recommendation
    ));
  };

  const addComment = (id: string, type: 'recipe' | 'recommendation', text: string) => {
    const newComment = {
      id: uuidv4(),
      author: "User", // In a real app, this would be the logged-in user
      text: text,
      date: new Date().toISOString()
    };

    if (type === 'recipe') {
      setRecipes(prev => prev.map(recipe => 
        recipe.id === id ? { 
          ...recipe, 
          comments: [...(recipe.comments || []), newComment] 
        } : recipe
      ));
    } else {
      setRecommendations(prev => prev.map(rec => 
        rec.id === id ? { 
          ...rec, 
          comments: [...(rec.comments || []), newComment] 
        } : rec
      ));
    }
  };

  return (
    <DataContext.Provider 
      value={{ 
        recipes, 
        recommendations, 
        addRecipe, 
        addRecommendation, 
        likeRecipe, 
        likeRecommendation,
        addComment
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
