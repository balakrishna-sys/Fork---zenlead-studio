import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedFeature } from "@/components/ui/locked-feature";
import { ExcelUpload } from "@/components/ExcelUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { ArrowRight } from "lucide-react";
import { TextProcessingState } from "@/pages/TextProcessing";

interface ExcelToSpeechProps {
  state: TextProcessingState;
  isLocked: boolean;
}

const ExcelToSpeech = ({ state, isLocked }: ExcelToSpeechProps) => {
  const { excelFile, setExcelFile, targetLanguage, setTargetLanguage, selectedVoice, setSelectedVoice, isProcessing, setIsProcessing } = state;

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
            <CardTitle>Upload Excel</CardTitle>
            <CardDescription>
              Upload your Excel or CSV file with text to convert
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExcelUpload 
              onUpload={setExcelFile} 
              isLoading={isProcessing} 
            />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            First column should contain the text to be converted.
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
            <CardDescription>
              Configure how your spreadsheet data will be spoken
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
                disabled={!excelFile || !targetLanguage || !selectedVoice || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Converting..." : "Convert to Speech"} 
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Multiple rows will be processed as separate audio files.
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default ExcelToSpeech;