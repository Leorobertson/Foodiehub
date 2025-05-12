import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RecipeForm from "../components/RecipeForm";
import RecipeCard from "../components/RecipeCard";
import { useData } from "../contexts/DataContext";
import { RecipeCategory } from "../types";

export default function Recipes() {
  const { recipes, addRecipe, likeRecipe } = useData();
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<RecipeCategory | 'all'>('all');
  
  const filteredRecipes = activeCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeCategory);

  const handleTabChange = (value: string) => {
    setActiveCategory(value as RecipeCategory | 'all');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recipe Community</h1>
          <p className="text-gray-600">Share and discover delicious recipes from our community</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="mt-4 md:mt-0"
        >
          {showForm ? "Cancel" : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <div className="mb-12 p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Share Your Recipe</h2>
          <RecipeForm 
            onSubmit={(recipe) => {
              addRecipe(recipe);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="mb-8 flex-wrap">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="High Protein">High Protein</TabsTrigger>
          <TabsTrigger value="Sugarbomb">Sugarbomb</TabsTrigger>
          <TabsTrigger value="Low Carb">Low Carb</TabsTrigger>
          <TabsTrigger value="Weight Loss">Weight Loss</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <RecipeList recipes={filteredRecipes} onLike={likeRecipe} />
        </TabsContent>
        
        <TabsContent value="High Protein" className="mt-0">
          <RecipeList recipes={filteredRecipes} onLike={likeRecipe} />
        </TabsContent>
        
        <TabsContent value="Sugarbomb" className="mt-0">
          <RecipeList recipes={filteredRecipes} onLike={likeRecipe} />
        </TabsContent>
        
        <TabsContent value="Low Carb" className="mt-0">
          <RecipeList recipes={filteredRecipes} onLike={likeRecipe} />
        </TabsContent>
        
        <TabsContent value="Weight Loss" className="mt-0">
          <RecipeList recipes={filteredRecipes} onLike={likeRecipe} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecipeList({ recipes, onLike }: { 
  recipes: any[], 
  onLike: (id: string) => void 
}) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No recipes in this category yet.</p>
        <p className="text-gray-500">Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id}
          recipe={recipe}
          onLike={() => onLike(recipe.id)}
        />
      ))}
    </div>
  );
}
