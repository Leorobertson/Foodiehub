import { useState, useRef, useEffect } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  UserPlus, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import CommentsDrawer from "@/components/CommentsDrawer";

// Define the video post interface
interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface VideoPost {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  username: string;
  userAvatar: string;
  description: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  isFollowing: boolean;
  isLiked?: boolean;
}

// Sample data for demonstration
const sampleVideos: VideoPost[] = [
  {
    id: "1",
    videoUrl: "https://assets.codepen.io/10602517/Pizza.mp4",
    thumbnailUrl: "https://placehold.co/600x800/333/white?text=Food+Video",
    username: "masterchef",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=masterchef",
    description: "Homemade pizza with special tomato sauce and fresh mozzarella! #pizza #homemade #cooking",
    tags: ["pizza", "homemade", "cooking"],
    likes: 1254,
    comments: [
      {
        id: "c1",
        author: "pizzalover",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pizzalover",
        text: "I'm definitely trying this recipe this weekend!",
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        likes: 24,
        isLiked: false
      },
      {
        id: "c2",
        author: "homebakerxyz",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=homebakerxyz",
        text: "What temperature do you cook the pizza at?",
        date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        likes: 5,
        isLiked: true
      }
    ],
    shares: 21,
    isFollowing: false,
    isLiked: false
  },
  {
    id: "2",
    videoUrl: "https://assets.codepen.io/10602517/Food+Video.mp4",
    thumbnailUrl: "https://placehold.co/600x800/333/white?text=Food+Video",
    username: "chefanna",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chefanna",
    description: "Quick and easy pasta recipe that will impress your friends! #pasta #quickmeals #dinner",
    tags: ["pasta", "quickmeals", "dinner"],
    likes: 867,
    comments: [
      {
        id: "c3",
        author: "pastaenthusiast",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pastaenthusiast",
        text: "This looks amazing! What sauce did you use?",
        date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        likes: 12,
        isLiked: false
      }
    ],
    shares: 15,
    isFollowing: true,
    isLiked: true
  },
  {
    id: "3",
    videoUrl: "https://assets.codepen.io/10602517/Breakfast+Food.mp4",
    thumbnailUrl: "https://placehold.co/600x800/333/white?text=Food+Video",
    username: "foodielover",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=foodielover",
    description: "Morning breakfast ideas that are healthy and delicious! #breakfast #healthy #foodie",
    tags: ["breakfast", "healthy", "foodie"],
    likes: 1532,
    comments: [
      {
        id: "c4",
        author: "healthyeater",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=healthyeater",
        text: "I make something similar! Try adding some chia seeds for extra protein.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        likes: 31,
        isLiked: true
      },
      {
        id: "c5",
        author: "earlybird",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=earlybird",
        text: "How long does this take to prepare? I'm always short on time in the mornings.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        likes: 8,
        isLiked: false
      },
      {
        id: "c6",
        author: "nutritionguru",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nutritionguru",
        text: "Perfect macros for starting the day! Saved!",
        date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        likes: 15,
        isLiked: false
      }
    ],
    shares: 42,
    isFollowing: false,
    isLiked: false
  }
];

export default function VideoFeed() {
  const { toast } = useToast();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoPost[]>(sampleVideos);
  const [isMuted, setIsMuted] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // Auto-play the current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch(err => console.error('Error playing video:', err));
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  const handleLike = (videoId: string) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        return { ...video, likes: video.isLiked ? video.likes - 1 : video.likes + 1, isLiked: !video.isLiked };
      }
      return video;
    }));
  };

  const handleFollow = (videoId: string) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        return { ...video, isFollowing: !video.isFollowing };
      }
      return video;
    }));
  };
  
  const handleOpenComments = (videoId: string) => {
    setCurrentVideoId(videoId);
    setCommentsOpen(true);
    
    // Pause the current video when comments are opened
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
  };
  
  const handleCloseComments = () => {
    setCommentsOpen(false);
    setCurrentVideoId(null);
    
    // Resume playing the current video when comments are closed
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play().catch(err => console.error('Error playing video:', err));
    }
  };
  
  const handleAddComment = (text: string) => {
    if (!currentVideoId) return;
    
    const newComment = {
      id: `c${Date.now()}`,
      author: "you",
      authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=current-user",
      text,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setVideos(videos.map(video => {
      if (video.id === currentVideoId) {
        return {
          ...video,
          comments: [newComment, ...video.comments]
        };
      }
      return video;
    }));
  };
  
  const handleLikeComment = (commentId: string) => {
    if (!currentVideoId) return;
    
    setVideos(videos.map(video => {
      if (video.id === currentVideoId) {
        return {
          ...video,
          comments: video.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                isLiked: !comment.isLiked
              };
            }
            return comment;
          })
        };
      }
      return video;
    }));
  };

  const formatNumber = (num: number | { length: number }): string => {
    // If the input is an array-like object with length property, use its length
    if (typeof num === 'object' && num !== null && 'length' in num) {
      num = num.length;
    }
    
    // Now num is definitely a number
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-black overflow-hidden relative">
      {/* Comments Drawer */}
      {currentVideoId && (
        <CommentsDrawer
          isOpen={commentsOpen}
          onClose={handleCloseComments}
          videoId={currentVideoId}
          comments={videos.find(v => v.id === currentVideoId)?.comments || []}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      )}
      {/* Navigation controls */}
      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 space-y-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={() => handleScroll('up')}
          disabled={currentVideoIndex === 0}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={() => handleScroll('down')}
          disabled={currentVideoIndex === videos.length - 1}
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Container */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${currentVideoIndex * 100}%)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-full w-full flex justify-center relative">
            <video
              ref={el => videoRefs.current[index] = el}
              src={video.videoUrl}
              className="h-full w-full object-cover"
              loop
              muted={isMuted}
              playsInline
              poster={video.thumbnailUrl}
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex justify-between items-end">
                <div className="text-white max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={video.userAvatar} />
                      <AvatarFallback>{video.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{video.username}</div>
                      <div className="text-sm opacity-80">Chef & Food Creator</div>
                    </div>
                    <Button 
                      variant={video.isFollowing ? "default" : "outline"} 
                      size="sm"
                      className={video.isFollowing ? "bg-primary text-white" : "border-white text-white hover:bg-white/20"}
                      onClick={() => handleFollow(video.id)}
                    >
                      {video.isFollowing ? (
                        <><UserCheck className="h-4 w-4 mr-1" /> Following</>
                      ) : (
                        <><UserPlus className="h-4 w-4 mr-1" /> Follow</>
                      )}
                    </Button>
                  </div>
                  <p className="mb-2">{video.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-black/30 hover:bg-black/50 text-white border-none">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Interaction Buttons */}
                <div className="flex flex-col items-center space-y-4">
                  <button 
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={() => handleLike(video.id)}
                  >
                    <Heart className={`h-6 w-6 ${video.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <div className="text-xs mt-1">{formatNumber(video.likes)}</div>
                  </button>
                  <button 
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={() => handleOpenComments(video.id)}
                  >
                    <MessageCircle className="h-6 w-6" />
                    <div className="text-xs mt-1">{formatNumber(video.comments.length)}</div>
                  </button>
                  <button className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50">
                    <Share2 className="h-6 w-6" />
                    <div className="text-xs mt-1">{formatNumber(video.shares)}</div>
                  </button>
                  <button 
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}