import { useState } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CameraCapture from "./CameraCapture";
import MediaPreview from "./MediaPreview";

interface MediaCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaCaptured: (mediaUrl: string, mediaType: 'image' | 'video') => void;
}

type CaptureState = 'capturing' | 'preview' | 'complete';

export default function MediaCaptureModal({ 
  isOpen, 
  onClose, 
  onMediaCaptured 
}: MediaCaptureModalProps) {
  const [captureState, setCaptureState] = useState<CaptureState>('capturing');
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleCapture = (capturedMediaUrl: string, type: 'image' | 'video') => {
    setMediaUrl(capturedMediaUrl);
    setMediaType(type);
    setCaptureState('preview');
  };

  const handleAccept = () => {
    onMediaCaptured(mediaUrl, mediaType);
    setCaptureState('complete');
    handleClose();
  };

  const handleRetake = () => {
    setCaptureState('capturing');
    setMediaUrl('');
  };

  const handleClose = () => {
    onClose();
    // Reset state after modal is closed
    setTimeout(() => {
      setCaptureState('capturing');
      setMediaUrl('');
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {captureState === 'capturing' 
              ? 'Capture Media' 
              : captureState === 'preview' 
                ? 'Media Preview' 
                : 'Complete'}
          </DialogTitle>
          <DialogDescription>
            {captureState === 'capturing' 
              ? 'Take a photo or record a video to add to your menu' 
              : captureState === 'preview' 
                ? 'Review your media before adding it to your menu' 
                : 'Media successfully captured'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          {captureState === 'capturing' && (
            <CameraCapture 
              onCapture={handleCapture} 
              onClose={handleClose} 
            />
          )}
          
          {captureState === 'preview' && mediaUrl && (
            <MediaPreview 
              mediaUrl={mediaUrl}
              mediaType={mediaType}
              onAccept={handleAccept}
              onRetake={handleRetake}
              onCancel={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}