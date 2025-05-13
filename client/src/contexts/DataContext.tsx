import { createContext, useState, useContext, ReactNode } from "react";
import { 
  Recipe, 
  Recommendation,
  RecipeCategory
} from "../types";
import { v4 as uuidv4 } from "uuid";

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

// Sample recipe data
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Quick Vegetable Stir Fry",
    description: "A healthy and delicious stir fry ready in minutes!",
    ingredients: ["1 bell pepper", "1 carrot", "1 cup broccoli", "2 tbsp soy sauce", "1 tbsp oil"],
    instructions: "Cut vegetables into bite-sized pieces. Heat oil in a pan. Add vegetables and stir fry for 5 minutes. Add soy sauce and cook for another 2 minutes.",
    category: "Low Carb",
    photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-05-10T14:48:00.000Z",
    likes: 42,
    comments: [
      { id: "c1", author: "foodie123", text: "Tried this and loved it!", date: "2023-05-11T10:15:00.000Z" },
      { id: "c2", author: "healthyeater", text: "Added some chicken for extra protein!", date: "2023-05-12T08:30:00.000Z" }
    ]
  },
  {
    id: "2",
    title: "Protein Packed Smoothie Bowl",
    description: "Start your day with this energizing smoothie bowl!",
    ingredients: ["1 banana", "1 cup berries", "1 scoop protein powder", "1/2 cup almond milk", "Toppings: granola, nuts, seeds"],
    instructions: "Blend banana, berries, protein powder, and almond milk until smooth. Pour into a bowl and add toppings.",
    category: "High Protein",
    photo: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    date: "2023-05-08T09:30:00.000Z",
    likes: 28,
    comments: [
      { id: "c3", author: "gymrat", text: "Perfect post-workout meal!", date: "2023-05-09T12:20:00.000Z" }
    ]
  },
  {
    id: "3",
    title: "Spicy Grilled Chicken Tacos",
    description: "Flavorful tacos with a kick for your next dinner!",
    ingredients: ["2 chicken breasts", "2 tbsp taco seasoning", "8 small tortillas", "Toppings: avocado, salsa, lime"],
    instructions: "Season chicken with taco seasoning. Grill until fully cooked. Slice and serve in tortillas with toppings.",
    category: "High Protein",
    photo: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
    date: "2023-05-05T18:15:00.000Z",
    likes: 56,
    comments: [
      { id: "c4", author: "tacofan", text: "These were amazing! Added some hot sauce for extra spice.", date: "2023-05-06T20:45:00.000Z" },
      { id: "c5", author: "homecook", text: "My family loved these!", date: "2023-05-07T19:10:00.000Z" }
    ]
  }
];

// Sample recommendation data
const sampleRecommendations: Recommendation[] = [
  {
    id: "1",
    restaurantName: "Green Garden",
    address: "123 Veggie Lane, Healthy City",
    review: "Amazing vegetarian restaurant with fresh ingredients and innovative dishes. The atmosphere is cozy and staff are friendly.",
    rating: 4.5,
    date: "2023-05-12T15:30:00.000Z",
    likes: 18,
    comments: [
      { id: "r1", author: "plantbased", text: "Their mushroom burger is to die for!", date: "2023-05-13T09:45:00.000Z" }
    ]
  },
  {
    id: "2",
    restaurantName: "Protein Palace",
    address: "456 Fitness Avenue, Strong Town",
    review: "Great place for fitness enthusiasts! All meals include macro information and they have a variety of high-protein options.",
    rating: 4.2,
    date: "2023-05-09T12:00:00.000Z",
    likes: 24,
    comments: [
      { id: "r2", author: "musclebuilder", text: "I eat here after every workout!", date: "2023-05-10T16:20:00.000Z" },
      { id: "r3", author: "trainer101", text: "I recommend this to all my clients.", date: "2023-05-11T14:15:00.000Z" }
    ]
  },
  {
    id: "3",
    restaurantName: "Sweet Treats",
    address: "789 Dessert Road, Indulgence City",
    review: "Best dessert place in town! Everything is made fresh daily and their chocolate lava cake is incredible.",
    rating: 4.8,
    date: "2023-05-07T19:45:00.000Z",
    likes: 35,
    comments: [
      { id: "r4", author: "sweettooth", text: "I dream about their cheesecake!", date: "2023-05-08T20:30:00.000Z" }
    ]
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(sampleRecommendations);

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
