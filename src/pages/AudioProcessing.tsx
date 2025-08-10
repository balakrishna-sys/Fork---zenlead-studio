import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModelModal } from "@/components/ModelModal";
import { 
  Languages, 
  Headphones, 
  Wand2, 
  LucideIcon, 
  Sparkles, 
  Plus,
  History,
  Download,
  Copy,
  Edit,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Play,
  Loader2,
  CheckCircle2,
  Volume2,
  Mic,
  AudioWaveform,
  Menu,
  Search,
  Clock
} from "lucide-react";
import AudioTranslate from "@/components/audio-processing/audio-translate";
import VoiceClone from "@/components/audio-processing/voice-clone";
import AudioEnhance from "@/components/audio-processing/audio-enhance";

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
  category: 'traditional' | 'content-generation';
}

// Traditional audio processing models
const traditionalModels: AudioProcessingModel[] = [
  {
    key: "translate",
    title: "Audio Translation",
    titletagline: "Multilingual voice conversion",
    description: "Translate audio into 20+ languages while preserving the original voice's emotion, tone, and speaking style for authentic cross-language communication.",
    modelName: "AudioTrans",
    modelkeywords: ["Audio Translation", "Multilingual"],
    liveornot: false,
    totalruns: 25,
    sucessrate: 97,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["MP3", "WAV", "M4A"],
    image: "https://elearningindustry.com/wp-content/uploads/2020/11/creating-multi-language-elearning-content.png",
    icon: Languages,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    badge: "Popular",
    category: 'traditional'
  },
  {
    key: "clone",
    title: "Voice Cloning",
    titletagline: "AI-powered voice replication",
    description: "Create an accurate digital clone of any voice from just a few audio samples. Perfect for content creation, personalization, and accessibility.",
    modelName: "VoiceReplicator",
    modelkeywords: ["Voice Cloning", "AI Voice"],
    liveornot: false,
    totalruns: 18,
    sucessrate: 94,
    processingspeed: "Moderate",
    outputquality: "High",
    compatibility: ["MP3", "WAV"],
    image: "https://www.isme.in/wp-content/uploads/2024/03/image-3.jpg",
    icon: Headphones,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    badge: "AI Powered",
    category: 'traditional'
  },
  {
    key: "enhance",
    title: "Audio Enhancement",
    titletagline: "Professional audio cleanup",
    description: "Transform low-quality audio into crystal-clear recordings with advanced noise reduction, echo removal, and clarity enhancement algorithms.",
    modelName: "AudioClear",
    modelkeywords: ["Audio Enhancement", "Noise Reduction"],
    liveornot: false,
    totalruns: 10,
    sucessrate: 92,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["MP3", "WAV", "FLAC"],
    image: "https://cdn.arstechnica.net/wp-content/uploads/2022/12/adobe_speech_enhance_hero_1.jpg",
    icon: Wand2,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    badge: "Pro Tools",
    category: 'traditional'
  },
];

// New content generation presets for audio
interface AudioContentPreset {
  id: string;
  type: 'podcast' | 'music' | 'audiobook' | 'voiceover';
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  estimatedTime: string;
  features: string[];
  settings: {
    tone?: string[];
    style?: string[];
    length?: string[];
    format?: string[];
  };
}

const audioContentPresets: AudioContentPreset[] = [
  {
    id: 'podcast',
    type: 'podcast',
    title: 'Podcast Episode',
    description: 'Create engaging podcast episodes with intro music, chapters, and professional editing',
    icon: Mic,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    estimatedTime: '20-45 minutes',
    features: ['Intro/Outro Music', 'Chapter Markers', 'Noise Reduction', 'Auto-leveling', 'Show Notes'],
    settings: {
      tone: ['Conversational', 'Professional', 'Educational', 'Entertainment'],
      style: ['Interview', 'Solo Commentary', 'Panel Discussion', 'Storytelling'],
      length: ['15 minutes', '30 minutes', '60 minutes', 'Custom'],
      format: ['MP3', 'AAC', 'WAV']
    }
  },
  {
    id: 'music',
    type: 'music',
    title: 'Music Track',
    description: 'Generate original music tracks with AI composition and professional mixing',
    icon: AudioWaveform,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    estimatedTime: '10-25 minutes',
    features: ['AI Composition', 'Genre Styling', 'Professional Mixing', 'Multiple Instruments', 'Mastering'],
    settings: {
      tone: ['Upbeat', 'Calm', 'Energetic', 'Emotional'],
      style: ['Pop', 'Rock', 'Electronic', 'Classical', 'Hip-Hop', 'Jazz'],
      length: ['30 seconds', '1 minute', '3 minutes', '5 minutes'],
      format: ['MP3', 'WAV', 'FLAC']
    }
  },
  {
    id: 'voiceover',
    type: 'voiceover',
    title: 'Professional Voiceover',
    description: 'Create professional voiceovers with natural AI voices and script optimization',
    icon: Volume2,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    estimatedTime: '5-15 minutes',
    features: ['AI Voice Selection', 'Script Optimization', 'Emotion Control', 'Background Music', 'Export Ready'],
    settings: {
      tone: ['Professional', 'Friendly', 'Authoritative', 'Warm'],
      style: ['Commercial', 'Narration', 'Educational', 'Character'],
      length: ['30 seconds', '1 minute', '5 minutes', 'Custom'],
      format: ['MP3', 'WAV', 'AAC']
    }
  }
];

interface AudioProject {
  id: string;
  title: string;
  type: string;
  timestamp: string;
  status: 'draft' | 'completed' | 'processing';
  model: string;
  duration?: string;
  preview: string;
  category: 'traditional' | 'content-generation';
}

const mockProjects: AudioProject[] = [
  {
    id: '1',
    title: 'Marketing Podcast Episode',
    type: 'podcast',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
    model: 'PodcastPro',
    duration: '32:45',
    preview: 'Weekly marketing insights podcast with intro music and chapter markers...',
    category: 'content-generation'
  },
  {
    id: '2',
    title: 'French Audio Translation',
    type: 'translate',
    timestamp: '2024-01-14T14:20:00Z',
    status: 'completed',
    model: 'AudioTrans',
    duration: '8:30',
    preview: 'Translated product demo from English to French preserving speaker tone...',
    category: 'traditional'
  },
  {
    id: '3',
    title: 'CEO Voice Clone',
    type: 'clone',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'completed',
    model: 'VoiceReplicator',
    duration: '5:20',
    preview: 'Created AI voice clone for automated company announcements...',
    category: 'traditional'
  },
  {
    id: '4',
    title: 'Background Music Track',
    type: 'music',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'processing',
    model: 'MusicAI',
    preview: 'Upbeat electronic track for product video background...',
    category: 'content-generation'
  },
  {
    id: '5',
    title: 'Interview Audio Enhancement',
    type: 'enhance',
    timestamp: '2024-01-12T16:30:00Z',
    status: 'completed',
    model: 'AudioClear',
    duration: '45:12',
    preview: 'Enhanced remote interview recording with noise reduction and clarity...',
    category: 'traditional'
  }
];

const AudioProcessing = () => {
  // Active item state
  const [activeItem, setActiveItem] = useState<AudioProcessingModel | AudioContentPreset | null>(null);
  const [activeType, setActiveType] = useState<'traditional' | 'content-generation' | null>(null);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Project history state
  const [projects, setProjects] = useState<AudioProject[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  // Content generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [contentIdea, setContentIdea] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [duration, setDuration] = useState(3);

  // Traditional model state - persistent settings
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Modal state for traditional models
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const state: AudioProcessingState = {
    audioFile, setAudioFile, targetLanguage, setTargetLanguage,
    selectedVoice, setSelectedVoice, isProcessing, setIsProcessing,
  };

  const lockedTabs = {
    translate: true,
    clone: true,
    enhance: true,
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleItemSelect = (item: AudioProcessingModel | AudioContentPreset, type: 'traditional' | 'content-generation') => {
    setActiveItem(item);
    setActiveType(type);
    setGeneratedContent("");
    if (type === 'traditional') {
      setIsModalOpen(true);
    }
  };

  const handleGenerate = async () => {
    if (!activeItem || !contentIdea.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newProject: AudioProject = {
      id: Date.now().toString(),
      title: contentIdea,
      type: activeItem.id || (activeItem as AudioProcessingModel).key,
      timestamp: new Date().toISOString(),
      status: 'completed',
      model: 'AI Studio Pro',
      duration: `${Math.floor(Math.random() * 30) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      preview: `Generated ${activeItem.title.toLowerCase()} based on: ${contentIdea.substring(0, 100)}...`,
      category: activeType!
    };
    
    setProjects(prev => [newProject, ...prev]);
    setGeneratedContent(`# ${contentIdea}\n\nYour ${activeItem.title.toLowerCase()} has been generated successfully!\n\nThis would contain the full audio content based on your specifications...`);
    setIsGenerating(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderModelContent = () => {
    if (!activeItem || activeType !== 'traditional') return null;

    const model = activeItem as AudioProcessingModel;
    switch (model.key) {
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

  // Project History Sidebar Component
  const ProjectHistorySidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 lg:p-6 border-b flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
            <Volume2 className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-base lg:text-lg">AI Studio</h2>
            <p className="text-xs lg:text-sm text-muted-foreground">Audio Processing</p>
          </div>
        </div>
        
        <Button className="w-full gap-2 text-sm" onClick={() => {setActiveItem(null); setActiveType(null); onClose?.();}}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="p-3 lg:p-4 border-b space-y-3 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="traditional">Traditional Tools</SelectItem>
              <SelectItem value="content-generation">Content Generation</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="translate">Translation</SelectItem>
              <SelectItem value="clone">Voice Clone</SelectItem>
              <SelectItem value="enhance">Enhancement</SelectItem>
              <SelectItem value="podcast">Podcast</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="voiceover">Voiceover</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project History - Scrollable with fixed height */}
      <div className="flex-1 min-h-0">
        <div className="p-3 lg:p-4 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm">Recent Projects</h3>
          </div>
        </div>
        
        <ScrollArea className="h-full px-3 lg:px-4">
          <div className="space-y-3 pb-4">
            {filteredProjects.map((project) => {
              const traditionalModel = traditionalModels.find(m => m.key === project.type);
              const contentPreset = audioContentPresets.find(p => p.id === project.type);
              const item = traditionalModel || contentPreset;
              const Icon = item?.icon || Volume2;
              
              return (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onClose?.()}
                >
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item?.color || 'from-gray-500 to-gray-600'} text-white flex-shrink-0`}>
                        {(() => {
                          const IconComponent = Icon;
                          return <IconComponent className="h-3 w-3 lg:h-4 lg:w-4" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs lg:text-sm truncate mb-1">{project.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.preview}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.category === 'traditional' ? 'Tool' : 'Gen'}
                            </Badge>
                            {project.duration && (
                              <Badge variant="outline" className="text-xs">
                                {project.duration}
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(project.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <Volume2 className="h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No projects found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Desktop Sidebar */}
        <div className="w-80 border-r bg-card/30 backdrop-blur-sm hidden lg:block">
          <ProjectHistorySidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-full sm:w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Project History</SheetTitle>
            </SheetHeader>
            <ProjectHistorySidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden border-b bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-lg">AI Studio</h1>
                <p className="text-xs text-muted-foreground">Audio Processing</p>
              </div>
            </div>
            <Button
              onClick={() => {setActiveItem(null); setActiveType(null);}}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>

          {!activeItem ? (
            /* Main Selection Interface */
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 lg:mb-12">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    AI Audio Processing Studio
                  </h1>
                  <p className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8">
                    Transform your audio with cutting-edge AI technology. Translate languages, clone voices, enhance quality, and create professional content.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Processing Tools</p>
                        <p className="text-xl lg:text-2xl font-bold text-blue-600">{traditionalModels.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                      <CardContent className="p-4 text-center">
                        <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Content Types</p>
                        <p className="text-xl lg:text-2xl font-bold text-green-600">{audioContentPresets.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                      <CardContent className="p-4 text-center">
                        <Target className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                        <p className="text-xl lg:text-2xl font-bold text-purple-600">94%</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Traditional Processing Tools */}
                <div className="mb-8 lg:mb-12">
                  <h2 className="text-xl lg:text-2xl font-bold mb-6">Processing Tools</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {traditionalModels.map((model) => {
                      const Icon = model.icon;
                      return (
                        <Card
                          key={model.key}
                          className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${model.bgColor} border-2 hover:border-primary/50`}
                          onClick={() => {
                            handleItemSelect(model, 'traditional');
                            setIsMobileSidebarOpen(false);
                          }}
                        >
                          <CardContent className="p-4 lg:p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="text-xs mb-1">
                                  {model.badge}
                                </Badge>
                                <p className="text-xs text-primary font-medium">{model.sucessrate}% Success</p>
                              </div>
                            </div>
                            
                            <h3 className="font-semibold text-base lg:text-lg mb-1">{model.title}</h3>
                            <p className="text-sm text-primary mb-2">{model.titletagline}</p>
                            <p className="text-muted-foreground text-xs lg:text-sm mb-4 leading-relaxed line-clamp-3">
                              {model.description}
                            </p>
                            
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
                      );
                    })}
                  </div>
                </div>

                {/* Content Generation Presets */}
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold mb-6">Content Generation</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {audioContentPresets.map((preset) => {
                      const Icon = preset.icon;
                      return (
                        <Card
                          key={preset.id}
                          className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${preset.bgColor} border-2 hover:border-primary/50`}
                          onClick={() => {
                            handleItemSelect(preset, 'content-generation');
                            setIsMobileSidebarOpen(false);
                          }}
                        >
                          <CardContent className="p-4 lg:p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${preset.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-base lg:text-lg">{preset.title}</h3>
                                <p className="text-sm text-muted-foreground">{preset.estimatedTime}</p>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                              {preset.description}
                            </p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{preset.estimatedTime}</span>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Features:</p>
                                <div className="flex flex-wrap gap-1">
                                  {preset.features.slice(0, 3).map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {preset.features.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{preset.features.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              Start Creating
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : activeType === 'content-generation' ? (
            /* Content Generation Interface */
            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Settings Panel */}
              <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r bg-card/30 backdrop-blur-sm p-4 lg:p-6 max-h-screen overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveItem(null)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${(activeItem as AudioContentPreset).color}`}>
                      {(() => {
                        const Icon = (activeItem as AudioContentPreset).icon;
                        return <Icon className="h-4 w-4 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg lg:text-xl">{activeItem.title}</h2>
                      <p className="text-sm text-muted-foreground">{(activeItem as AudioContentPreset).estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Content Idea Input */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      What do you want to create?
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      placeholder={`Describe your ${activeItem.title.toLowerCase()} idea...\n\nExample: Create a weekly marketing podcast episode discussing the latest digital trends and featuring guest interviews...`}
                      value={contentIdea}
                      onChange={(e) => setContentIdea(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                  </div>

                  {/* Audio-specific settings */}
                  {(activeItem as AudioContentPreset).type === 'podcast' && (
                    <>
                      {/* Level Selection */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Select Your Style</Label>
                        <div className="grid gap-3">
                          {[
                            { id: 'interview', emoji: '🎤', title: 'Interview', desc: 'Q&A style conversation' },
                            { id: 'solo', emoji: '🗣️', title: 'Solo Commentary', desc: 'Single host format' },
                            { id: 'panel', emoji: '👥', title: 'Panel Discussion', desc: 'Multiple participants' }
                          ].map((style) => (
                            <Card
                              key={style.id}
                              className={`cursor-pointer transition-all ${selectedLevel === style.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                              onClick={() => setSelectedLevel(style.id)}
                            >
                              <CardContent className="p-3 lg:p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl lg:text-2xl">{style.emoji}</span>
                                  <div>
                                    <p className="font-medium text-sm lg:text-base">{style.title}</p>
                                    <p className="text-xs lg:text-sm text-muted-foreground">{style.desc}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Episode Duration</Label>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              min={5}
                              max={120}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">Minutes</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 15, label: 'Short' },
                              { value: 30, label: 'Standard' },
                              { value: 60, label: 'Long' }
                            ].map((presetOption) => (
                              <Button
                                key={presetOption.value}
                                variant={duration === presetOption.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDuration(presetOption.value)}
                                className="text-xs"
                              >
                                {presetOption.value}m
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Generate Button */}
                  <div className="pt-4">
                    <Button
                      className="w-full gap-2"
                      onClick={handleGenerate}
                      disabled={!contentIdea.trim() || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Generate {activeItem.title}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                {generatedContent ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                        <h2 className="text-xl lg:text-2xl font-bold">Audio Generated Successfully</h2>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <Card className="bg-white dark:bg-gray-900 shadow-lg">
                      <CardContent className="p-6 lg:p-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap">{generatedContent}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <div className={`p-6 rounded-xl bg-gradient-to-r ${(activeItem as AudioContentPreset).color} text-white mx-auto mb-6 w-fit`}>
                        {(() => {
                          const Icon = (activeItem as AudioContentPreset).icon;
                          return <Icon className="h-12 w-12" />;
                        })()}
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold mb-3">Ready to Generate Your {activeItem.title}</h2>
                      <p className="text-muted-foreground text-base lg:text-lg mb-6 max-w-md mx-auto">
                        Fill out the settings in the left panel and click generate to create your audio content.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{(activeItem as AudioContentPreset).estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          <span>High Quality</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Traditional Tool Interface - Shows in main area */
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveItem(null)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${(activeItem as AudioProcessingModel).color}`}>
                      {(() => {
                        const Icon = (activeItem as AudioProcessingModel).icon;
                        return <Icon className="h-4 w-4 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg lg:text-xl">{activeItem.title}</h2>
                      <p className="text-sm text-muted-foreground">{(activeItem as AudioProcessingModel).titletagline}</p>
                    </div>
                  </div>
                  <Badge className={`ml-auto ${(activeItem as AudioProcessingModel).bgColor} border-0`}>
                    {(activeItem as AudioProcessingModel).badge}
                  </Badge>
                </div>
                
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardContent className="p-4 lg:p-8">
                    {renderModelContent()}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal for Traditional Tools */}
      <ModelModal
        isOpen={isModalOpen}
        onClose={closeModal}
        model={activeItem as AudioProcessingModel}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      >
        {renderModelContent()}
      </ModelModal>
    </div>
  );
};

export default AudioProcessing;
