// src/pages/AudioProcessing.tsx
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Languages, Headphones, Wand2, LucideIcon } from "lucide-react";
import AudioTranslate from "@/components/audio-processing/audio-translate";
import VoiceClone from "@/components/audio-processing/voice-clone";
import AudioEnhance from "@/components/audio-processing/audio-enhance";
import ModelCard from "@/components/ui/model-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AudioProcessingState {
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

interface AudioProcessingModel {
  key: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const audioProcessingModels: AudioProcessingModel[] = [
  {
    key: "translate",
    title: "Translate",
    description: "Translate audio into another language with customizable voices.",
    icon: Languages,
    image: "https://elearningindustry.com/wp-content/uploads/2020/11/creating-multi-language-elearning-content.png",
  },
  {
    key: "clone",
    title: "Voice Clone",
    description: "Create a digital clone of a voice from an audio sample.",
    icon: Headphones,
    image: "https://www.isme.in/wp-content/uploads/2024/03/image-3.jpg",
  },
  {
    key: "enhance",
    title: "Enhance",
    description: "Improve audio quality with noise reduction and clarity options.",
    icon: Wand2,
    image: "https://cdn.arstechnica.net/wp-content/uploads/2022/12/adobe_speech_enhance_hero_1.jpg",
  },
];

const AudioProcessing = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("grid");
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const state: AudioProcessingState = {
    audioFile,
    setAudioFile,
    targetLanguage,
    setTargetLanguage,
    selectedVoice,
    setSelectedVoice,
    isProcessing,
    setIsProcessing,
  };

  const lockedTabs = {
    translate: true,
    clone: true,
    enhance: true,
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
      case "translate":
        return <AudioTranslate state={state} isLocked={lockedTabs.translate} />;
      case "clone":
        return <VoiceClone state={state} isLocked={lockedTabs.clone} />;
      case "enhance":
        return <AudioEnhance state={state} isLocked={lockedTabs.enhance} />;
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
              Audio Processing Models
            </div>
            <h1 className="text-3xl font-bold mb-2">Audio Processing</h1>
            <p className="text-gray-600">Transform your audio with AI technology</p>
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
          <Tabs value={activeTab || "translate"} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="translate" className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                <span>Translate</span>
              </TabsTrigger>
              <TabsTrigger value="clone" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Voice Clone</span>
              </TabsTrigger>
              <TabsTrigger value="enhance" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Enhance</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="translate" className="space-y-6">
              <AudioTranslate state={state} isLocked={lockedTabs.translate} />
            </TabsContent>
            <TabsContent value="clone" className="space-y-6">
              <VoiceClone state={state} isLocked={lockedTabs.clone} />
            </TabsContent>
            <TabsContent value="enhance" className="space-y-6">
              <AudioEnhance state={state} isLocked={lockedTabs.enhance} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 grid-and-content-container  overflow-hidden">
          {/* <div className="flex flex-col lg:flex-row gap-6 grid-and-content-container h-screen overflow-hidden"> */}

            {/* Left: Model Cards */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 flex-grow">
                {audioProcessingModels.map((model) => (
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
            {activeTab && (
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-6 h-full">
                {renderModelContent()}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AudioProcessing;