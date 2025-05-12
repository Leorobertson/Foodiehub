// Menu Builder Types
export interface MenuItem {
  name: string;
  price: string;
  photo: string;
  video?: string;
  mediaType?: 'image' | 'video';
}

export interface MenuData {
  businessName: string;
  address: string;
  logo: string;
  items: MenuItem[];
  photoSize: 'small' | 'medium' | 'large';
  photoShape: 'square' | 'rounded' | 'circle';
  backgroundColor: string;
}

// Media Types
export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  thumbnailUrl?: string;
}

// Recipe Types
export type RecipeCategory = 'High Protein' | 'Sugarbomb' | 'Low Carb' | 'Weight Loss';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  category: RecipeCategory;
  photo: string;
  date: string;
  likes: number;
  comments?: { id: string; author: string; text: string; date: string }[];
}

// Recommendation Types
export interface Recommendation {
  id: string;
  restaurantName: string;
  address: string;
  review: string;
  rating: number;
  date: string;
  likes: number;
  comments?: { id: string; author: string; text: string; date: string }[];
}
