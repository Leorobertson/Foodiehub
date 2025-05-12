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
import { Recommendation } from "../types";

interface RecommendationFormProps {
  onSubmit: (recommendation: Omit<Recommendation, 'id' | 'date' | 'likes' | 'comments'>) => void;
}

export default function RecommendationForm({ onSubmit }: RecommendationFormProps) {
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName || !address || !review || !rating) return;
    
    onSubmit({
      restaurantName,
      address,
      review,
      rating: parseInt(rating)
    });
    
    // Reset form
    setRestaurantName('');
    setAddress('');
    setReview('');
    setRating('');
  };

  const wordCount = review.trim().split(/\s+/).filter(Boolean).length;
  const isWordCountValid = wordCount >= 50 && wordCount <= 200;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormItem>
            <FormLabel>Restaurant Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., The Olive Garden" 
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
              />
            </FormControl>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., 123 Main St, New York, NY" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormControl>
          </FormItem>
          
          <FormItem className="mt-4">
            <FormLabel>Rating</FormLabel>
            <Select 
              value={rating} 
              onValueChange={setRating}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        
        <div>
          <FormItem>
            <FormLabel>
              Review 
              <span className={`ml-2 text-xs ${isWordCountValid ? 'text-green-600' : 'text-red-600'}`}>
                ({wordCount} words, needs 50-200)
              </span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Share your experience at this restaurant..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                required
              />
            </FormControl>
            {!isWordCountValid && (
              <FormMessage>
                Please write between 50 and 200 words for your review.
              </FormMessage>
            )}
          </FormItem>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={!isWordCountValid}>
        Submit Recommendation
      </Button>
    </form>
  );
}
