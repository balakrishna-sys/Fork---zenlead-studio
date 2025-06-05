// src/components/audio-processing/audio-enhance.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioUpload } from "@/components/AudioUpload";
import { LockedFeature } from "@/components/ui/locked-feature";
import { ArrowRight } from "lucide-react";
import { AudioProcessingState } from "@/pages/AudioProcessing";

interface AudioEnhanceProps {
  state: AudioProcessingState;
  isLocked: boolean;
}

const AudioEnhance = ({ state, isLocked }: AudioEnhanceProps) => {
  const { audioFile, setAudioFile, isProcessing, setIsProcessing } = state;

  const handleProcessAudio = () => {
    if (!audioFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <LockedFeature isLocked={isLocked}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Source Audio</CardTitle>
            <CardDescription>Upload the audio file you want to enhance</CardDescription>
          </CardHeader>
          <CardContent>
            <AudioUpload onUpload={setAudioFile} isLoading={isProcessing} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enhancement Options</CardTitle>
            <CardDescription>Choose how to improve your audio quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="noise-reduction" className="form-checkbox h-4 w-4 text-primary" />
                <label htmlFor="noise-reduction" className="text-sm">Noise Reduction</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="clarity" className="form-checkbox h-4 w-4 text-primary" />
                <label htmlFor="clarity" className="text-sm">Increase Clarity</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="bass" className="form-checkbox h-4 w-4 text-primary" />
                <label htmlFor="bass" className="text-sm">Enhance Bass</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="volume" className="form-checkbox h-4 w-4 text-primary" />
                <label htmlFor="volume" className="text-sm">Normalize Volume</label>
              </div>
            </div>
            <div className="pt-4">
              <Button
                onClick={handleProcessAudio}
                disabled={!audioFile || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Enhance Audio"}
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Audio enhancement preserves the original content while improving quality.
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default AudioEnhance;