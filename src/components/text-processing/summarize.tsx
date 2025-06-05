import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedFeature } from "@/components/ui/locked-feature";
import { TextInput } from "@/components/TextInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ArrowRight } from "lucide-react";
import { TextProcessingState } from "@/pages/TextProcessing";

interface SummarizeProps {
  state: TextProcessingState;
  isLocked: boolean;
}

const Summarize = ({ state, isLocked }: SummarizeProps) => {
  const { text, setText, targetLanguage, setTargetLanguage, isProcessing, setIsProcessing } = state;

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
            <CardTitle>Input Content</CardTitle>
            <CardDescription>
              Enter the text you want to summarize
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
            <CardTitle>Summarization Options</CardTitle>
            <CardDescription>
              Choose how to summarize your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Summary Length</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="short">Short (1-2 paragraphs)</option>
                  <option value="medium">Medium (3-4 paragraphs)</option>
                  <option value="long">Long (5+ paragraphs)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Summary Style</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="concise">Concise</option>
                  <option value="detailed">Detailed</option>
                  <option value="bullet">Bullet Points</option>
                </select>
              </div>
              <LanguageSelector 
                onChange={setTargetLanguage} 
                label="Output Language" 
                placeholder="Same as input or select new..." 
              />
            </div>
            <div className="pt-4">
              <Button 
                onClick={handleProcessText}
                disabled={!text || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Summarizing..." : "Generate Summary"} 
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Summaries can also be converted to audio after generation.
          </CardFooter>
        </Card>
      </div>
    </LockedFeature>
  );
};

export default Summarize;