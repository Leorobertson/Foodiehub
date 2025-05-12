import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, Instagram, Twitch } from "lucide-react";
import CommunityFeed from "../components/CommunityFeed";
import { useData } from "../contexts/DataContext";

export default function Community() {
  const { recipes, recommendations } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'recipes' | 'recommendations'>('all');
  
  // Combine and sort recipes and recommendations by date
  const allItems = [
    ...recipes.map(recipe => ({
      type: 'recipe' as const,
      id: recipe.id,
      title: recipe.title,
      preview: recipe.description.length > 50 
        ? `${recipe.description.substring(0, 50)}...` 
        : recipe.description,
      photo: recipe.photo,
      date: recipe.date,
      likes: recipe.likes,
      comments: recipe.comments || [],
    })),
    ...recommendations.map(rec => ({
      type: 'recommendation' as const,
      id: rec.id,
      title: rec.restaurantName,
      preview: rec.review.length > 50 
        ? `${rec.review.substring(0, 50)}...` 
        : rec.review,
      photo: '', // No photo for recommendations
      date: rec.date,
      likes: rec.likes,
      comments: rec.comments || [],
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const recipeItems = allItems.filter(item => item.type === 'recipe');
  const recommendationItems = allItems.filter(item => item.type === 'recommendation');
  
  const activeItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'recipes' 
      ? recipeItems 
      : recommendationItems;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
      <p className="text-gray-600 mb-8">See the latest recipes and recommendations from our community</p>
      
      <Alert className="mb-8 bg-accent/20 border-accent">
        <AlertDescription className="flex items-center text-base">
          <span className="font-medium mr-1">Join the #QuickMenuChallenge!</span>
          Share your menu or recipe on Instagram or Twitch with the hashtag #QuickMenuChallenge
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <CommunityFeed items={activeItems} />
            </TabsContent>
            
            <TabsContent value="recipes" className="mt-0">
              <CommunityFeed items={activeItems} />
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-0">
              <CommunityFeed items={activeItems} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://instagram.com/QuickMenuApp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  <span>@QuickMenuApp</span>
                </a>
                <a 
                  href="https://tiktok.com/@QuickMenuApp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <Twitch className="h-5 w-5 mr-2" />
                  <span>@QuickMenuApp</span>
                </a>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Popular Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  #QuickMenuChallenge
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  #FoodieLife
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  #RestaurantReviews
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  #HomeChef
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MessageSquare className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Sarah</span> commented on
                    <span className="font-medium"> Pasta Primavera Recipe</span>
                  </p>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Mike</span> commented on
                    <span className="font-medium"> Bistro Nouveau Recommendation</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
