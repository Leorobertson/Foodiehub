import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star } from "lucide-react";
import { Recommendation } from "../types";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onLike: () => void;
}

export default function RecommendationCard({ recommendation, onLike }: RecommendationCardProps) {
  const { 
    restaurantName, 
    address, 
    review, 
    rating, 
    likes
  } = recommendation;

  // Generate star rating
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
    />
  ));

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{restaurantName}</h3>
          <div className="flex">
            {stars}
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{address}</span>
        </div>
        
        <p className="text-gray-600 mb-2">
          {review.length > 150 
            ? `${review.substring(0, 150)}...` 
            : review}
        </p>
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
          {new Date(recommendation.date).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}
