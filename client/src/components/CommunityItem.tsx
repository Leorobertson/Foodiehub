import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageSquare, 
  Share2,
  Utensils,
  BookOpen,
  SendHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface CommunityItemProps {
  item: {
    type: 'recipe' | 'recommendation';
    id: string;
    title: string;
    preview: string;
    photo?: string;
    date: string;
    likes: number;
    comments: Comment[];
  };
  onLike: () => void;
  onAddComment: (text: string) => void;
}

export default function CommunityItem({ item, onLike, onAddComment }: CommunityItemProps) {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const { 
    type, 
    title, 
    preview, 
    photo, 
    date, 
    likes,
    comments
  } = item;

  const handleShare = () => {
    // This would normally share to social media
    toast({
      title: "Share to social media",
      description: `Sharing ${type}: ${title}`,
      duration: 3000,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    onAddComment(comment);
    setComment('');
  };

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className="bg-primary/10 text-primary">
              {type === 'recipe' ? 'R' : 'RE'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <div className="flex items-center text-gray-500 text-xs">
              <span>{new Date(date).toLocaleDateString()}</span>
              <span className="mx-1">•</span>
              <Badge variant="outline" className="text-xs font-normal">
                {type === 'recipe' ? 'Recipe' : 'Recommendation'}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">{preview}</p>
        </div>
        
        {photo && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img 
              src={photo} 
              alt={title} 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              className="text-gray-600 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 mr-1 ${likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{comments.length}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-600"
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span>Share</span>
            </Button>
          </div>
          
          <div>
            {type === 'recipe' ? (
              <BookOpen className="h-5 w-5 text-primary" />
            ) : (
              <Utensils className="h-5 w-5 text-primary" />
            )}
          </div>
        </div>
      </CardContent>
      
      {showComments && (
        <CardFooter className="flex flex-col border-t pt-4 px-6">
          {comments.length > 0 ? (
            <div className="w-full space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {comment.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-4">No comments yet. Be the first to comment!</p>
          )}
          
          <form onSubmit={handleAddComment} className="w-full flex">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button type="submit" size="sm" disabled={!comment.trim()}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}
