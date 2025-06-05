// src/components/video-processing/video-generation.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LockedFeature } from "@/components/ui/locked-feature";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { VideoProcessingState } from "@/pages/VideoProcessing";

interface VideoGenerationProps {
  state: VideoProcessingState;
  isLocked: boolean;
}

const VideoGeneration = ({ state, isLocked }: VideoGenerationProps) => {
  const { prompt, setPrompt, isGenerating, setIsGenerating } = state;
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your video",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Here you would integrate with your video generation API
      toast({
        title: "Video Generation Started",
        description: "Your video is being generated. This may take a few minutes.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <LockedFeature isLocked={isLocked}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Animated Videos</CardTitle>
          <CardDescription>
            Describe what you want to see in your video, and we'll generate it using AI.
            Videos require 50 credits per minute of generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Video Description
            </label>
            <Textarea
              id="prompt"
              placeholder="Describe your video scene (e.g., 'A cat playing with a ball of yarn in a sunny room')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? "Generating Video..." : "Generate Video"}
          </Button>

          <div className="text-sm text-muted-foreground text-center">
            Note: Video generation may take several minutes depending on the complexity
            of your description and desired output length.
          </div>
        </CardContent>
      </Card>
    </LockedFeature>
  );
};

export default VideoGeneration;