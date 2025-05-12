import CommunityItem from "./CommunityItem";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { useData } from "../contexts/DataContext";

interface FeedItem {
  type: 'recipe' | 'recommendation';
  id: string;
  title: string;
  preview: string;
  photo?: string;
  date: string;
  likes: number;
  comments: { id: string; author: string; text: string; date: string }[];
}

interface CommunityFeedProps {
  items: FeedItem[];
}

export default function CommunityFeed({ items }: CommunityFeedProps) {
  const { likeRecipe, likeRecommendation, addComment } = useData();

  const handleLike = (id: string, type: 'recipe' | 'recommendation') => {
    if (type === 'recipe') {
      likeRecipe(id);
    } else {
      likeRecommendation(id);
    }
  };

  const handleAddComment = (id: string, type: 'recipe' | 'recommendation', text: string) => {
    addComment(id, type, text);
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">No posts to show</p>
          <p className="text-gray-500">Community items will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CommunityItem 
          key={`${item.type}-${item.id}`}
          item={item}
          onLike={() => handleLike(item.id, item.type)}
          onAddComment={(text) => handleAddComment(item.id, item.type, text)}
        />
      ))}
    </div>
  );
}
