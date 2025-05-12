import { useState } from "react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, PlusCircle, Image } from "lucide-react";
import { Recipe, RecipeCategory } from "../types";

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id' | 'date' | 'likes' | 'comments'>) => void;
}

export default function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState<RecipeCategory | ''>('');
  const [photo, setPhoto] = useState('');

  const handleIngredientsChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;
    
    // Filter out empty ingredients
    const filteredIngredients = ingredients.filter(item => item.trim() !== '');
    
    onSubmit({
      title,
      description,
      ingredients: filteredIngredients,
      instructions,
      category: category as RecipeCategory,
      photo
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setIngredients(['']);
    setInstructions('');
    setCategory('');
    setPhoto('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormItem>
            <FormLabel>Recipe Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Creamy Garlic Pasta" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="A short description of your recipe..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </FormControl>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Category</FormLabel>
            <Select 
              value={category} 
              onValueChange={setCategory}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High Protein">High Protein</SelectItem>
                <SelectItem value="Sugarbomb">Sugarbomb</SelectItem>
                <SelectItem value="Low Carb">Low Carb</SelectItem>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Photo</FormLabel>
            <div className="flex items-center space-x-4">
              {photo && (
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  <img 
                    src={photo} 
                    alt="Recipe" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        
        <div>
          <FormItem>
            <FormLabel>Ingredients</FormLabel>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <FormControl>
                    <Input 
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) => handleIngredientsChange(index, e.target.value)}
                    />
                  </FormControl>
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeIngredient(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Instructions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Step-by-step instructions..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Share Recipe
      </Button>
    </form>
  );
}
