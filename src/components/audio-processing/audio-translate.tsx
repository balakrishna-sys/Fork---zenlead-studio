// src/components/audio-processing/audio-translate.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioUpload } from "@/components/AudioUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { LockedFeature } from "@/components/ui/locked-feature";
import { ArrowRight } from "lucide-react";
import { AudioProcessingState } from "@/pages/AudioProcessing";

interface AudioTranslateProps {
  state: AudioProcessingState;
  isLocked: boolean;
}

const AudioTranslate = ({ state, isLocked }: AudioTranslateProps) => {
  const { audioFile, setAudioFile, targetLanguage, setTargetLanguage, selectedVoice, setSelectedVoice, isProcessing, setIsProcessing } = state;

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
            <CardDescription>Upload the audio file you want to translate</CardDescription>
          </CardHeader>
          <CardContent>
            <AudioUpload onUpload={setAudioFile} isLoading={isProcessing} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Translation Settings</CardTitle>
            <CardDescription>Select the target language and voice options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LanguageSelector
              onChange={setTargetLanguage}
              label="Target Language"
              placeholder="Select target language..."
            />
            <VoiceSelector
              onChange={setSelectedVoice}
              label="Voice Style"
              placeholder="Keep original or select new voice..."
            />
            <div className="pt-4">
              <Button
                onClick={handleProcessAudio}
                disabled={!audioFile || !targetLanguage || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Translate Audio"}
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Processing typically takes 30-60 seconds depending on audio length.
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default AudioTranslate;