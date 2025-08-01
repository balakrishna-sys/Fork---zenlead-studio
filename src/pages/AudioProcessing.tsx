import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, Headphones, Wand2, LucideIcon, Sparkles, Grid3X3, List, TrendingUp, Volume2, Mic, AudioWaveform } from "lucide-react";
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

const audioProcessingModels: AudioProcessingModel[] = [
  {
    key: "translate",
    title: "Audio Translation",
    titletagline: "Multilingual voice conversion",
    description: "Translate audio into 20+ languages while preserving the original voice's emotion, tone, and speaking style for authentic cross-language communication.",
    modelName: "AudioTrans",
    modelkeywords: ["Audio Translation", "Multilingual", "Voice Synthesis", "Real-time"],
    liveornot: false,
    totalruns: 25,
    sucessrate: 97,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["MP3", "WAV", "M4A"],
    image: "https://elearningindustry.com/wp-content/uploads/2020/11/creating-multi-language-elearning-content.png",
    icon: Languages,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    badge: "Popular"
  },
  {
    key: "clone",
    title: "Voice Cloning",
    titletagline: "AI-powered voice replication",
    description: "Create an accurate digital clone of any voice from just a few audio samples. Perfect for content creation, personalization, and accessibility.",
    modelName: "VoiceReplicator",
    modelkeywords: ["Voice Cloning", "Audio Synthesis", "AI Voice", "Personalization"],
    liveornot: false,
    totalruns: 18,
    sucessrate: 94,
    processingspeed: "Moderate",
    outputquality: "High",
    compatibility: ["MP3", "WAV"],
    image: "https://www.isme.in/wp-content/uploads/2024/03/image-3.jpg",
    icon: Headphones,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    badge: "AI Powered"
  },
  {
    key: "enhance",
    title: "Audio Enhancement",
    titletagline: "Professional audio cleanup",
    description: "Transform low-quality audio into crystal-clear recordings with advanced noise reduction, echo removal, and clarity enhancement algorithms.",
    modelName: "AudioClear",
    modelkeywords: ["Audio Enhancement", "Noise Reduction", "Clarity", "Professional"],
    liveornot: false,
    totalruns: 10,
    sucessrate: 92,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["MP3", "WAV", "FLAC"],
    image: "https://cdn.arstechnica.net/wp-content/uploads/2022/12/adobe_speech_enhance_hero_1.jpg",
    icon: Wand2,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    badge: "Pro Tools"
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
    audioFile, setAudioFile, targetLanguage, setTargetLanguage,
    selectedVoice, setSelectedVoice, isProcessing, setIsProcessing,
  };

  const lockedTabs = {
    translate: true,
    clone: true,
    enhance: true,
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                <Volume2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Audio Processing Models
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Audio Processing Studio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your audio with cutting-edge AI technology. Translate languages, clone voices, 
              and enhance audio quality with professional-grade results.
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
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Languages</p>
                  <p className="text-2xl font-bold text-blue-600">20+</p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Languages className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Success</p>
                  <p className="text-2xl font-bold text-purple-600">94%</p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Audio Quality</p>
                  <p className="text-2xl font-bold text-green-600">HD</p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <AudioWaveform className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-orange-600">Real-time</p>
                </div>
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Mic className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === "tabs" ? (
          <Tabs value={activeTab || "translate"} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="grid grid-cols-3 gap-2 bg-card/50 backdrop-blur-sm border border-border/50 p-2">
                {audioProcessingModels.map((model) => {
                  const Icon = model.icon;
                  return (
                    <TabsTrigger 
                      key={model.key}
                      value={model.key} 
                      className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-3"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{model.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {audioProcessingModels.map((model) => (
              <TabsContent key={model.key} value={model.key} className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color} text-white shadow-lg`}>
                          <model.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{model.title}</CardTitle>
                          <p className="text-muted-foreground">{model.titletagline}</p>
                        </div>
                      </div>
                      <Badge className={`${model.bgColor} border-0`}>
                        {model.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderModelContent()}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Model Cards Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {audioProcessingModels.map((model) => (
                  <Card 
                    key={model.key}
                    className={`group cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 ${model.bgColor}`}
                    onClick={() => handleTryNow(model.key)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg`}>
                          <model.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="text-xs mb-1">
                            {model.badge}
                          </Badge>
                          <p className="text-xs text-primary font-medium">{model.sucessrate}% Success</p>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-1">{model.title}</h3>
                      <p className="text-sm text-primary mb-3">{model.titletagline}</p>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {model.description}
                      </p>
                      
                      {/* Model specs */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div>
                          <p className="text-muted-foreground">Speed</p>
                          <p className="font-medium">{model.processingspeed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quality</p>
                          <p className="font-medium">{model.outputquality}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Runs</p>
                          <p className="font-medium">{model.totalruns}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Formats</p>
                          <p className="font-medium">{model.compatibility.length}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex flex-wrap gap-1">
                          {model.modelkeywords.slice(0, 2).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                        >
                          Try Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selected Model Content */}
            {activeTab && (
              <div className="lg:w-1/2 xl:w-2/5">
                <Card className="sticky top-8 bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const model = audioProcessingModels.find(m => m.key === activeTab);
                          const Icon = model?.icon || Volume2;
                          return (
                            <>
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${model?.color} text-white`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{model?.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{model?.titletagline}</p>
                              </div>
                            </>
                          );
                        })()}
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
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 p-8">
              <CardContent className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Volume2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Ready to Transform Your Audio?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Experience the power of AI-driven audio processing. Translate across languages, clone voices, 
                  and enhance audio quality with professional results in minutes.
                </p>
                <Button 
                  size="lg" 
                  className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => handleTryNow("translate")}
                >
                  Start Processing Audio
                  <Volume2 className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AudioProcessing;
