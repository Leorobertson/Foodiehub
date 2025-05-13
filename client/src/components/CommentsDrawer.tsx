import { useState, useRef, useEffect } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send, X } from "lucide-react";
import { getRandomUsername } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export default function CommentsDrawer({
  isOpen,
  onClose,
  videoId,
  comments,
  onAddComment,
  onLikeComment
}: CommentsDrawerProps) {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Scroll to bottom when new comments are added
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      return;
    }
    
    onAddComment(commentText);
    setCommentText("");
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the video",
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[80vh] sm:max-w-lg sm:mx-auto rounded-t-xl">
        <SheetHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-center flex-grow">{formatNumber(comments.length)} comments</SheetTitle>
            <SheetClose className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4 h-[calc(80vh-180px)]">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarImage src={comment.authorAvatar} />
                  <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl p-3 inline-block">
                    <div className="font-semibold text-sm">{comment.author}</div>
                    <div className="text-sm">{comment.text}</div>
                  </div>
                  <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                    <span>{formatDate(comment.date)}</span>
                    <button 
                      className="flex items-center"
                      onClick={() => onLikeComment(comment.id)}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span>{formatNumber(comment.likes)}</span>
                    </button>
                    <button className="hover:text-gray-700">Reply</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1">Be the first to comment!</p>
            </div>
          )}
          <div ref={commentsEndRef} />
        </div>
        
        <SheetFooter className="border-t pt-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=current-user" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <Input
              ref={inputRef}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="rounded-full"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!commentText.trim()}
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}