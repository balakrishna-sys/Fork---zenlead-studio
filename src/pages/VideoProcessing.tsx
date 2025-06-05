// src/pages/VideoProcessing.tsx
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Wand2, LucideIcon } from "lucide-react";
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
  description: string;
  image: string;
  icon: LucideIcon;
}

const videoProcessingModels: VideoProcessingModel[] = [
  {
    key: "video-generation",
    title: "Video Generation",
    description: "Create animated videos from text descriptions using AI.",
    icon: Wand2,
    image: "https://www.shutterstock.com/image-photo/doctor-appointment-online-on-screen-260nw-2366001551.jpg",
  },
];

const VideoProcessing = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("grid");
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const state: VideoProcessingState = {
    prompt,
    setPrompt,
    isGenerating,
    setIsGenerating,
  };

  const lockedTabs = {
    "video-generation": true,
  };

  // Reset activeTab when switching to grid view
  useEffect(() => {
    if (viewMode === "grid") {
      setActiveTab(null);
    }
  }, [viewMode]);

  const handleTryNow = (tabKey: string) => {
    setActiveTab(tabKey);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="inline-block rounded-lg bg-lime-500/10 px-3 py-1 text-sm text-lime-500 mb-2">
              Video Processing Models
            </div>
            <h1 className="text-3xl font-bold mb-2">Video Processing</h1>
            <p className="text-gray-600">Create stunning videos with AI technology</p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="view-toggle">Grid View</Label>
            <Switch
              id="view-toggle"
              checked={viewMode === "grid"}
              onCheckedChange={() => setViewMode(viewMode === "tabs" ? "grid" : "tabs")}
            />
          </div>
        </div>

        {viewMode === "tabs" ? (
          <Tabs value={activeTab || "video-generation"} onValueChange={setActiveTab} className="w-full">
  
            <TabsContent value="video-generation" className="space-y-6">
              <VideoGeneration state={state} isLocked={lockedTabs["video-generation"]} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 grid-and-content-container overflow-hidden">
          {/* <div className="flex flex-col lg:flex-row gap-6 grid-and-content-container h-screen overflow-hidden"> */}

            {/* Left: Model Cards */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 flex-grow">
                {videoProcessingModels.map((model) => (
                  <ModelCard
                    key={model.key}
                    title={model.title}
                    description={model.description}
                    icon={model.icon}
                    image={model.image}
                    onTryNow={() => handleTryNow(model.key)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Selected Model Content */}
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-6 h-full">
              <VideoGeneration state={state} isLocked={lockedTabs["video-generation"]} />
               
              </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoProcessing;