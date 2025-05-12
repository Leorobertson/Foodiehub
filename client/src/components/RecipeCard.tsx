import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Utensils } from "lucide-react";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  onLike: () => void;
}

export default function RecipeCard({ recipe, onLike }: RecipeCardProps) {
  const { 
    title, 
    description, 
    ingredients, 
    category, 
    photo, 
    likes 
  } = recipe;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative">
        {photo ? (
          <img 
            src={photo} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Utensils className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <Badge className="absolute top-3 right-3" variant="secondary">
          {category}
        </Badge>
      </div>
      
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">
          {description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </p>
        
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-700 mb-1">Ingredients:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {ingredients.slice(0, 3).map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
            {ingredients.length > 3 && (
              <li className="text-gray-500">+ {ingredients.length - 3} more</li>
            )}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 py-3 px-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className="text-gray-600 hover:text-red-500"
        >
          <Heart className={`h-4 w-4 mr-1 ${likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{likes}</span>
        </Button>
        <span className="text-xs text-gray-500">
          {new Date(recipe.date).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}
