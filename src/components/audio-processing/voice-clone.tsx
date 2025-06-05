// src/components/audio-processing/voice-clone.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioUpload } from "@/components/AudioUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LockedFeature } from "@/components/ui/locked-feature";
import { ArrowRight } from "lucide-react";
import { AudioProcessingState } from "@/pages/AudioProcessing";

interface VoiceCloneProps {
  state: AudioProcessingState;
  isLocked: boolean;
}

const VoiceClone = ({ state, isLocked }: VoiceCloneProps) => {
  const { audioFile, setAudioFile, targetLanguage, setTargetLanguage, isProcessing, setIsProcessing } = state;

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
            <CardTitle>Voice Sample</CardTitle>
            <CardDescription>Upload a clear audio sample of the voice to clone</CardDescription>
          </CardHeader>
          <CardContent>
            <AudioUpload onUpload={setAudioFile} isLoading={isProcessing} />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Best results require at least 30 seconds of clear speech.
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cloning Settings</CardTitle>
            <CardDescription>Configure your voice cloning options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LanguageSelector
              onChange={setTargetLanguage}
              label="Target Language"
              placeholder="Same as source or select new..."
            />
            <div className="pt-4">
              <Button
                onClick={handleProcessAudio}
                disabled={!audioFile || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Create Voice Clone"}
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Voice cloning requires additional processing time (2-3 minutes).
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default VoiceClone;