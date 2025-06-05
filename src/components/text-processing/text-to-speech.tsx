import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedFeature } from "@/components/ui/locked-feature";
import { TextInput } from "@/components/TextInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { ArrowRight } from "lucide-react";
import { TextProcessingState } from "@/pages/TextProcessing";

interface TextToSpeechProps {
  state: TextProcessingState;
  isLocked: boolean;
}

const TextToSpeech = ({ state, isLocked }: TextToSpeechProps) => {
  const { text, setText, targetLanguage, setTargetLanguage, selectedVoice, setSelectedVoice, isProcessing, setIsProcessing } = state;

  const handleProcessText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <LockedFeature isLocked={isLocked}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>
              Enter the text you want to convert to speech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TextInput 
              onSubmit={setText} 
              isLoading={isProcessing} 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>
              Select language and voice for your audio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LanguageSelector 
              onChange={setTargetLanguage} 
              label="Content Language" 
              placeholder="Select content language..." 
            />
            <VoiceSelector 
              onChange={setSelectedVoice} 
              label="Voice" 
              placeholder="Select voice..." 
            />
            <div className="pt-4">
              <Button 
                onClick={handleProcessText}
                disabled={!text || !targetLanguage || !selectedVoice || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Converting..." : "Convert to Speech"} 
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Processed audio can be downloaded as MP3 or WAV format.
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default TextToSpeech;