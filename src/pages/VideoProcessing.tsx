import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wand2, LucideIcon, Sparkles, Grid3X3, List, Play, Clock, Star, TrendingUp, Video, Zap } from "lucide-react";
import VideoGeneration from "@/components/video-processing/video-generation";
import ModelCard from "@/components/ui/model-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface VideoProcessingState {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

interface VideoProcessingModel {
  key: string;
  title: string;
  titletagline: string;
  description: string;
  modelName: string;
  modelkeywords: string[];
  liveornot: boolean;
  totalruns: number;
  sucessrate: number;
  processingspeed: string;
  outputquality: string;
  compatibility: string[];
  image: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  badge: string;
}

const videoProcessingModels: VideoProcessingModel[] = [
  {
    key: "video-generation",
    title: "Video Generation",
    titletagline: "Create animated videos from text prompts",
    description: "Generate stunning animated videos from simple text descriptions using state-of-the-art AI technology. Perfect for content creators, marketers, and educators.",
    modelName: "VideoGenix",
    modelkeywords: ["Video Generation", "AI Animation", "Text-to-Video", "Content Creation"],
    liveornot: false,
    totalruns: 7,
    sucessrate: 95,
    processingspeed: "Moderate",
    outputquality: "High",
    compatibility: ["MP4", "AVI", "MOV"],
    image: "https://www.shutterstock.com/image-photo/doctor-appointment-online-on-screen-260nw-2366001551.jpg",
    icon: Wand2,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    badge: "AI Powered"
  },
];

const examplePrompts = [
  "A serene sunset over calm ocean waves with seagulls flying",
  "A bustling city street at night with neon lights reflecting on wet pavement",
  "A magical forest with glowing fireflies and ancient trees",
  "A modern office space with people collaborating on innovative projects",
  "A peaceful countryside with rolling hills and wildflowers swaying in the breeze",
  "An astronaut exploring a colorful alien planet with multiple moons"
];

const VideoProcessing = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("grid");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const state: VideoProcessingState = {
    prompt,
    setPrompt,
    isGenerating,
    setIsGenerating,
  };

  const lockedTabs = {
    "video-generation": true,
  };

  useEffect(() => {
    if (viewMode === "grid") {
      setActiveTab(null);
    }
  }, [viewMode]);

  const handleTryNow = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setSelectedPrompt(selectedPrompt);
    setActiveTab("video-generation");
  };

  const renderModelContent = () => {
    if (!activeTab) return null;

    switch (activeTab) {
      case "video-generation":
        return <VideoGeneration state={state} isLocked={lockedTabs["video-generation"]} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Video className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Video Processing Models
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Video Generation Studio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Create stunning animated videos from text descriptions using cutting-edge AI technology. 
              Transform your ideas into visual stories in minutes.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="view-toggle" className="text-sm font-medium">Grid View</Label>
              </div>
              <Switch
                id="view-toggle"
                checked={viewMode === "grid"}
                onCheckedChange={() => setViewMode(viewMode === "tabs" ? "grid" : "tabs")}
              />
              <div className="flex items-center space-x-2">
                <List className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Tab View</Label>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-purple-600">95%</p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold text-blue-600">30s</p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className="text-2xl font-bold text-green-600">HD</p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-orange-600">Fast</p>
                </div>
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example Prompts Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">✨ Try These Example Prompts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examplePrompts.map((promptText, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 ${
                  selectedPrompt === promptText ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => handlePromptSelect(promptText)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-foreground">{promptText}</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary hover:text-primary/80">
                        Use This Prompt →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {viewMode === "tabs" ? (
          <Tabs value={activeTab || "video-generation"} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 p-2">
                <TabsTrigger 
                  value="video-generation" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
                >
                  <Wand2 className="h-4 w-4" />
                  <span>Video Generation</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="video-generation" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <Wand2 className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Video Generation</CardTitle>
                        <p className="text-muted-foreground">Create animated videos from text prompts</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-500/10 border-0 text-purple-600">
                      AI Powered
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <VideoGeneration state={state} isLocked={lockedTabs["video-generation"]} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Model Cards Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-6">
                {videoProcessingModels.map((model) => (
                  <Card 
                    key={model.key}
                    className={`group cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 ${model.bgColor}`}
                    onClick={() => handleTryNow(model.key)}
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Left side - Icon and basic info */}
                        <div className="flex-shrink-0">
                          <div className={`p-4 rounded-2xl bg-gradient-to-r ${model.color} shadow-lg mb-4`}>
                            <model.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="space-y-2">
                            <Badge variant="secondary" className="text-xs">
                              {model.badge}
                            </Badge>
                            <p className="text-sm text-primary font-medium">{model.sucessrate}% Success Rate</p>
                          </div>
                        </div>
                        
                        {/* Right side - Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-2xl mb-2">{model.title}</h3>
                          <p className="text-lg text-primary mb-4">{model.titletagline}</p>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {model.description}
                          </p>
                          
                          {/* Model stats */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                              <p className="text-xs text-muted-foreground">Total Runs</p>
                              <p className="font-semibold">{model.totalruns}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Speed</p>
                              <p className="font-semibold">{model.processingspeed}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Quality</p>
                              <p className="font-semibold">{model.outputquality}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Formats</p>
                              <p className="font-semibold">{model.compatibility.length} types</p>
                            </div>
                          </div>
                          
                          {/* Keywords and action */}
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                              {model.modelkeywords.map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              size="lg" 
                              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 px-6"
                            >
                              Start Creating
                              <Play className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selected Model Content */}
            {activeTab && (
              <div className="lg:w-1/2">
                <Card className="sticky top-8 bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                          <Wand2 className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Video Generation</CardTitle>
                          <p className="text-sm text-muted-foreground">Create your animated video</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[70vh] overflow-y-auto">
                    {renderModelContent()}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {!activeTab && (
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20 p-8">
              <CardContent className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Ready to Create Amazing Videos?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform your ideas into stunning animated videos with our AI-powered video generation technology. 
                  Perfect for content creators, marketers, and storytellers.
                </p>
                <Button 
                  size="lg" 
                  className="h-12 px-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => handleTryNow("video-generation")}
                >
                  Start Creating Videos
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoProcessing;
