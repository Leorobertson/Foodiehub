import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  Upload, 
  ImagePlus, 
  Camera, 
  X, 
  Play, 
  Pause 
} from "lucide-react";
import MediaCaptureModal from "@/components/MediaCaptureModal";

const COOKING_CATEGORIES = [
  "Quick Recipes",
  "Breakfast Ideas",
  "Lunch Recipes",
  "Dinner Recipes",
  "Desserts",
  "Vegan",
  "Vegetarian",
  "Healthy",
  "Comfort Food",
  "Meal Prep",
  "Baking",
  "Grilling",
  "One Pot Meals"
];

export default function UploadVideo() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaCaptureModalOpen, setMediaCaptureModalOpen] = useState(false);
  const [captureType, setCaptureType] = useState<'video' | 'thumbnail'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    if (type === 'video') {
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive"
        });
        return;
      }
      
      setVideoFile(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    } else {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      setThumbnail(imageUrl);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleMediaCapture = (mediaUrl: string, type: 'image' | 'video') => {
    if (captureType === 'video' && type === 'video') {
      setVideoPreview(mediaUrl);
      
      // Convert data URL to a File object
      fetch(mediaUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "captured-video.webm", { type: "video/webm" });
          setVideoFile(file);
        });
    } else if (captureType === 'thumbnail' && type === 'image') {
      setThumbnail(mediaUrl);
    }
  };

  const openMediaCapture = (type: 'video' | 'thumbnail') => {
    setCaptureType(type);
    setMediaCaptureModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Missing video",
        description: "Please upload or record a video",
        variant: "destructive"
      });
      return;
    }
    
    if (!thumbnail) {
      toast({
        title: "Missing thumbnail",
        description: "Please upload or capture a thumbnail image",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // In a real app, you would upload the files to a server here
    // For this demo, we'll simulate a successful upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful!",
        description: "Your cooking video has been uploaded",
      });
      
      // Navigate to the video feed
      navigate("/");
    }, 2000);
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const clearThumbnail = () => {
    setThumbnail(null);
  };

  return (
    <div className="container max-w-3xl py-6 px-4 md:py-10">
      <MediaCaptureModal
        isOpen={mediaCaptureModalOpen}
        onClose={() => setMediaCaptureModalOpen(false)}
        onMediaCaptured={handleMediaCapture}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Cooking Video</CardTitle>
              <CardDescription>
                Share your cooking skills with the FoodTok community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="video">Cooking Video</Label>
                <div className="border-2 border-dashed rounded-lg p-4 relative">
                  {videoPreview ? (
                    <div className="relative">
                      <video 
                        ref={videoRef}
                        src={videoPreview} 
                        className="w-full aspect-[9/16] object-contain bg-black rounded-md"
                        onEnded={() => setIsPlaying(false)}
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={clearVideo}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={togglePlayPause}
                          className="rounded-full bg-black/50 hover:bg-black/70"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Video className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500 mb-4">
                        Drag and drop a video file or click to browse
                      </p>
                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Button 
                          type="button" 
                          variant="default"
                          onClick={() => openMediaCapture('video')}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Record Video
                        </Button>
                      </div>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, 'video')}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  {thumbnail ? (
                    <div className="relative">
                      <img 
                        src={thumbnail} 
                        alt="Thumbnail" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={clearThumbnail}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <ImagePlus className="h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500 mb-4">
                        Upload a thumbnail image for your video
                      </p>
                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('thumbnail-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button 
                          type="button" 
                          variant="default"
                          onClick={() => openMediaCapture('thumbnail')}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      <Input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, 'thumbnail')}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Video Details Section */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Easy 5-Minute Breakfast"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Share the details of your cooking video..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {COOKING_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tags">Tags (separated by comma)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="cooking, easy, breakfast"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isUploading}
                className="min-w-[100px]"
              >
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}