import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  RefreshCw, 
  Download, 
  PlayCircle, 
  PauseCircle,
  Volume2,
  VolumeX
} from "lucide-react";

interface MediaPreviewProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  onAccept: () => void;
  onRetake: () => void;
  onCancel: () => void;
}

export default function MediaPreview({ 
  mediaUrl, 
  mediaType, 
  onAccept, 
  onRetake, 
  onCancel 
}: MediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = mediaUrl;
    a.download = `quickmenu-${mediaType}-${new Date().getTime()}.${mediaType === 'image' ? 'jpg' : 'webm'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">
            {mediaType === 'image' ? 'Photo Preview' : 'Video Preview'}
          </h3>
          <p className="text-gray-600 text-sm">
            {mediaType === 'image' 
              ? 'Review your photo before adding it to your menu' 
              : 'Review your video before adding it to your menu'}
          </p>
        </div>
        
        <div className="bg-black rounded-md overflow-hidden relative">
          {mediaType === 'image' ? (
            <img 
              src={mediaUrl} 
              alt="Captured" 
              className="w-full h-auto"
            />
          ) : (
            <div className="relative">
              <video 
                ref={videoRef} 
                src={mediaUrl} 
                className="w-full h-auto" 
                controls={false}
                loop
                muted={isMuted}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={togglePlayPause}
                  className="rounded-full bg-black/30 text-white hover:bg-black/50"
                >
                  {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className="rounded-full bg-black/30 text-white hover:bg-black/50"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="outline" size="sm" onClick={onRetake}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake
            </Button>
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button size="sm" onClick={onAccept}>
              <Check className="h-4 w-4 mr-2" />
              Use {mediaType === 'image' ? 'Photo' : 'Video'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}