import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  onCapture: (mediaUrl: string, type: 'image' | 'video') => void;
  onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [countdown, setCountdown] = useState(0);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [permission, setPermission] = useState<boolean | null>(null);

  // Request camera access on component mount
  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: mode === 'video'
        });
        
        setStream(mediaStream);
        setPermission(true);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setPermission(false);
        toast({
          title: "Camera Access Denied",
          description: "Please allow camera access to use this feature.",
          variant: "destructive"
        });
      }
    };

    getMediaStream();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode, toast, stream]);

  // Handle mode change
  useEffect(() => {
    if (stream) {
      // Stop current stream
      stream.getTracks().forEach(track => track.stop());
      
      // Request new stream with appropriate permissions
      const updateStream = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: mode === 'video'
          });
          
          setStream(mediaStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error("Error updating media stream:", err);
        }
      };
      
      updateStream();
    }
  }, [mode]);

  // Handle countdown timer for photo capture
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        
        if (countdown === 1) {
          if (mode === 'photo') {
            capturePhoto();
          }
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [countdown, mode]);

  // Handle recording chunks
  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      onCapture(videoUrl, 'video');
      setRecordedChunks([]);
    }
  }, [recordedChunks, isRecording, onCapture]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        onCapture(imageUrl, 'image');
      }
    }
  };

  const startPhotoCountdown = () => {
    setCountdown(3);
  };

  const startVideoRecording = () => {
    if (!stream) return;
    
    setRecordedChunks([]);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks(prev => [...prev, e.data]);
      }
    };
    
    mediaRecorder.start();
    setIsRecording(true);

    // Auto-stop after 30 seconds to prevent very large files
    setTimeout(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        stopVideoRecording();
      }
    }, 30000);
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Video Captured",
        description: "Your video has been successfully recorded.",
      });
    }
  };

  if (permission === false) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <X className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
            <p className="text-gray-600 mb-4">
              Please allow camera access in your browser settings to use this feature.
            </p>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto relative">
      <CardContent className="p-6">
        <div className="absolute top-2 right-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full bg-black/20 text-white hover:bg-black/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4 flex space-x-2 justify-center">
          <Button
            variant={mode === 'photo' ? "default" : "outline"}
            onClick={() => setMode('photo')}
            className="flex items-center"
            disabled={isRecording}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Photo Mode
          </Button>
          <Button
            variant={mode === 'video' ? "default" : "outline"}
            onClick={() => setMode('video')}
            className="flex items-center"
            disabled={isRecording}
          >
            <Video className="h-4 w-4 mr-2" />
            Video Mode
          </Button>
        </div>
        
        <div className="bg-black rounded-md overflow-hidden relative">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-auto"
          />
          
          {countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-white text-7xl font-bold">{countdown}</span>
            </div>
          )}
          
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">Recording</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          {mode === 'photo' ? (
            <Button 
              onClick={startPhotoCountdown} 
              disabled={countdown > 0 || !stream}
              className="flex items-center"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          ) : (
            isRecording ? (
              <Button 
                variant="destructive" 
                onClick={stopVideoRecording}
                className="flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            ) : (
              <Button 
                onClick={startVideoRecording} 
                disabled={!stream}
                className="flex items-center"
              >
                <Video className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}