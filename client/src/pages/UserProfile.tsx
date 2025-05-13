import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings, 
  Video, 
  Heart, 
  UserCheck, 
  UserPlus,
  Share2,
  Grid,
  Users,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface UserPost {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  likes: number;
  description: string;
  date: string;
}

interface UserProfile {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  posts: UserPost[];
  likedPosts: UserPost[];
}

// Sample user data
const sampleUser: UserProfile = {
  id: "user1",
  username: "masterchef",
  name: "Chef Alex",
  bio: "Professional chef sharing quick and delicious recipes 🍳 Follow for daily cooking inspiration!",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=masterchef",
  followers: 12800,
  following: 243,
  isFollowing: false,
  posts: [
    {
      id: "p1",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Pizza",
      videoUrl: "https://assets.codepen.io/10602517/Pizza.mp4",
      views: 34500,
      likes: 1254,
      description: "Homemade pizza with special tomato sauce and fresh mozzarella! #pizza #homemade #cooking",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: "p2",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Pasta",
      videoUrl: "https://assets.codepen.io/10602517/Food+Video.mp4",
      views: 21200,
      likes: 867,
      description: "Quick and easy pasta recipe that will impress your friends! #pasta #quickmeals #dinner",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
    },
    {
      id: "p3",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Breakfast",
      videoUrl: "https://assets.codepen.io/10602517/Breakfast+Food.mp4",
      views: 42800,
      likes: 1532,
      description: "Morning breakfast ideas that are healthy and delicious! #breakfast #healthy #foodie",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString()
    },
    {
      id: "p4",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Dessert",
      videoUrl: "https://assets.codepen.io/10602517/Pizza.mp4",
      views: 18700,
      likes: 932,
      description: "Easy 5-minute dessert anyone can make! #dessert #quick #sweet",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString()
    }
  ],
  likedPosts: [
    {
      id: "lp1",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Cookies",
      videoUrl: "https://assets.codepen.io/10602517/Food+Video.mp4",
      views: 26300,
      likes: 1105,
      description: "The best chocolate chip cookies you'll ever taste! #cookies #baking #chocolate",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
    },
    {
      id: "lp2",
      thumbnailUrl: "https://placehold.co/600x800/333/white?text=Smoothie",
      videoUrl: "https://assets.codepen.io/10602517/Breakfast+Food.mp4",
      views: 19800,
      likes: 743,
      description: "Protein-packed smoothie bowl for breakfast! #smoothie #breakfast #protein",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString()
    }
  ]
};

export default function UserProfile() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile>(sampleUser);
  const [activeTab, setActiveTab] = useState("videos");
  const { username } = useParams<{ username: string }>();
  
  useEffect(() => {
    // In a real app, fetch user profile data based on username
    console.log(`Fetching profile for username: ${username}`);
    // For demo, we're using sample data
  }, [username]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleFollow = () => {
    setUser({
      ...user,
      isFollowing: !user.isFollowing,
      followers: user.isFollowing ? user.followers - 1 : user.followers + 1
    });
    
    toast({
      title: user.isFollowing ? "Unfollowed" : "Following",
      description: user.isFollowing 
        ? `You have unfollowed ${user.username}` 
        : `You are now following ${user.username}`,
    });
  };

  const handleShare = () => {
    // In a real app, implement sharing functionality
    toast({
      title: "Profile Shared",
      description: `Share link for ${user.username} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">{user.username}</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <h1 className="text-xl font-bold mb-1">@{user.username}</h1>
          <h2 className="text-lg mb-3">{user.name}</h2>
          
          <div className="flex items-center space-x-6 mb-4">
            <div className="text-center">
              <div className="font-bold">{formatNumber(user.posts.length)}</div>
              <div className="text-sm text-gray-500">Videos</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{formatNumber(user.followers)}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{formatNumber(user.following)}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
          
          <p className="text-center mb-4 max-w-md">{user.bio}</p>
          
          <div className="flex space-x-3 mb-6">
            <Button
              variant={user.isFollowing ? "default" : "outline"}
              onClick={handleFollow}
              className={user.isFollowing ? "bg-primary text-white" : ""}
            >
              {user.isFollowing ? (
                <><UserCheck className="h-4 w-4 mr-1" /> Following</>
              ) : (
                <><UserPlus className="h-4 w-4 mr-1" /> Follow</>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs 
          defaultValue="videos" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="videos" className="flex items-center">
              <Grid className="h-4 w-4 mr-1" /> Videos
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center">
              <Heart className="h-4 w-4 mr-1" /> Liked
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center">
              <Users className="h-4 w-4 mr-1" /> Followers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {user.posts.map((post) => (
                <div key={post.id} className="aspect-[9/16] relative overflow-hidden rounded-md group cursor-pointer">
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 flex items-center text-white text-sm">
                      <Video className="h-3 w-3 mr-1" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center text-white text-sm">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {user.likedPosts.map((post) => (
                <div key={post.id} className="aspect-[9/16] relative overflow-hidden rounded-md group cursor-pointer">
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 flex items-center text-white text-sm">
                      <Video className="h-3 w-3 mr-1" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center text-white text-sm">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="followers">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Followers</h3>
                <div className="space-y-4">
                  {/* Simulated follower list */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${index + 2}`} />
                          <AvatarFallback>U{index + 2}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">user{index + 1}</div>
                          <div className="text-sm text-gray-500">Foodie Fan</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}