import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RecommendationForm from "../components/RecommendationForm";
import RecommendationCard from "../components/RecommendationCard";
import { useData } from "../contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";

export default function Recommendations() {
  const { recommendations, addRecommendation, likeRecommendation } = useData();
  const [showForm, setShowForm] = useState(false);
  
  // Sort recommendations by rating (highest first)
  const sortedRecommendations = [...recommendations].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Restaurant Recommendations</h1>
          <p className="text-gray-600">Discover and share your favorite restaurants</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="mt-4 md:mt-0"
        >
          {showForm ? "Cancel" : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recommendation
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <div className="mb-12 p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Recommend a Restaurant</h2>
          <RecommendationForm 
            onSubmit={(recommendation) => {
              addRecommendation(recommendation);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {sortedRecommendations.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg mb-2">No recommendations yet</p>
            <p className="text-gray-500">Be the first to recommend a restaurant!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedRecommendations.map((recommendation) => (
            <RecommendationCard 
              key={recommendation.id}
              recommendation={recommendation}
              onLike={() => likeRecommendation(recommendation.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
