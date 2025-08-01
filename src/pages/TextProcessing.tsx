import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelModal, ModelSidePanel } from "@/components/ModelModal";
import { Book, FileText, FileSpreadsheet, FileDigit, FileCheck, LucideIcon, Sparkles, Grid3X3, List, TrendingUp } from "lucide-react";
import LongBook from "@/components/text-processing/long-book";
import TextToSpeech from "@/components/text-processing/text-to-speech";
import ExcelToSpeech from "@/components/text-processing/excel-to-speech";
import Summarize from "@/components/text-processing/summarize";
import AtsScore from "@/components/text-processing/ats-score";
import ResumeAnalyser from "@/components/text-processing/resume-analyser";
import ModelCard from "@/components/ui/model-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TextProcessingState {
  text: string;
  setText: (text: string) => void;
  excelFile: File | null;
  setExcelFile: (file: File | null) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  bookPrompt: string;
  setBookPrompt: (prompt: string) => void;
  bookContent: { heading: string; content: string }[] | null;
  setBookContent: (content: { heading: string; content: string }[] | null) => void;
  isBookLoading: boolean;
  setIsBookLoading: (isLoading: boolean) => void;
  atsFile: File | null;
  setAtsFile: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  atsScore: number | null;
  setAtsScore: (score: number | null) => void;
  isAtsLoading: boolean;
  setAtsLoading: (isLoading: boolean) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeJobDescription: string;
  setResumeJobDescription: (desc: string) => void;
  resumeAnalysis: { bestPractices: string[]; tailoredSuggestions: string[]; generalRecommendations: string[] } | null;
  setResumeAnalysis: (analysis: { bestPractices: string[]; tailoredSuggestions: string[]; generalRecommendations: string[] } | null) => void;
  isResumeLoading: boolean;
  setIsResumeLoading: (isLoading: boolean) => void;
}

interface TextProcessingModel {
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

const textProcessingModels: TextProcessingModel[] = [
  {
    key: "long-book",
    title: "Long Book",
    titletagline: 'Generate comprehensive papers',
    description: "Generate a full-length book or research paper based on your prompt with AI-powered content creation.",
    modelName: "BookGenix",
    modelkeywords: ["Book Generation", "Research Paper", "Content Creation"],
    liveornot: false,
    totalruns: 12,
    sucessrate: 95,
    processingspeed: "Moderate",
    outputquality: "High",
    compatibility: ["PDF", "DOCX"],
    image: "https://static.vecteezy.com/system/resources/thumbnails/040/722/713/small/old-man-s-hands-reading-a-book-the-man-runs-his-fingers-through-the-book-free-video.jpg",
    icon: Book,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    badge: "Content AI"
  },
  {
    key: "text-to-speech",
    title: "Convert texts to voice",
    titletagline: 'Natural voice synthesis',
    description: "Convert text into natural-sounding speech with customizable voices and multilingual support.",
    modelName: "VoiceCraft",
    modelkeywords: ["Text-to-Speech", "Voice Synthesis", "Multilingual"],
    liveornot: false,
    totalruns: 20,
    sucessrate: 94,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["MP3", "WAV", "FLAC"],
    image: "https://t3.ftcdn.net/jpg/02/44/46/32/360_F_244463221_9qvm69ukrh4NSfG4Vi2F8We4ZT5uhtSh.jpg",
    icon: FileText,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    badge: "Popular"
  },
  {
    key: "excel-to-charts",
    title: "Excel to Charts",
    titletagline: "Visualize spreadsheet data",
    description: "Transform Excel or CSV data into comprehensive audio summaries and visual charts.",
    modelName: "Excelerate",
    modelkeywords: ["Excel", "CSV", "Audio Conversion"],
    liveornot: false,
    totalruns: 10,
    sucessrate: 92,
    processingspeed: "Moderate",
    outputquality: "Good",
    compatibility: ["XLSX", "CSV"],
    image: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2018/07/vba-macros-excel.jpg",
    icon: FileSpreadsheet,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    badge: "Data Viz"
  },
  {
    key: "summarize",
    title: "Summarize",
    titletagline: "Intelligent text summarization",
    description: "Create concise, meaningful summaries of large text documents using advanced NLP technology.",
    modelName: "TextSummarizer",
    modelkeywords: ["Summarization", "Text Analysis", "NLP"],
    liveornot: false,
    totalruns: 20,
    sucessrate: 97,
    processingspeed: "Fast",
    outputquality: "Excellent",
    compatibility: ["TXT", "PDF"],
    image: "https://media.lovemaharashtra.org/sites/8/2016/09/Puzzle21.jpg",
    icon: FileDigit,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
    badge: "AI Powered"
  },
  {
    key: "ats-score",
    title: "ATS Score",
    titletagline: "Resume optimization scoring",
    description: "Evaluate resumes against job descriptions for ATS compatibility and provide detailed improvement suggestions.",
    modelName: "ResumeRater",
    modelkeywords: ["ATS", "Resume Analysis", "Job Matching"],
    liveornot: false,
    totalruns: 30,
    sucessrate: 96,
    processingspeed: "Fast",
    outputquality: "High",
    compatibility: ["PDF", "DOCX"],
    image: "https://media.licdn.com/dms/image/v2/D5612AQGCZ6Om1N34NA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732792994576?e=2147483647&v=beta&t=Dkxf3ohVZ_M1dVCAKnUKVdTg_uLmnveU6745iVVznYk",
    icon: FileCheck,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
    badge: "Career Boost"
  },
  {
    key: "resume-analyser",
    title: "Resume Analyser",
    titletagline: "Professional resume enhancement",
    description: "Get tailored suggestions to improve your resume with industry-specific recommendations and best practices.",
    modelName: "ResumeOptimizer",
    modelkeywords: ["Resume Enhancement", "Career", "NLP"],
    liveornot: false,
    totalruns: 10,
    sucessrate: 94,
    processingspeed: "Moderate",
    outputquality: "High",
    compatibility: ["PDF", "DOCX"],
    image: "https://nluglob.org/wp-content/uploads/2023/11/ResumeProcessing.jpg",
    icon: FileText,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    badge: "Pro Tools"
  },
];

const TextProcessing = () => {
  const [text, setText] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookPrompt, setBookPrompt] = useState("");
  const [bookContent, setBookContent] = useState<{ heading: string; content: string }[] | null>(null);
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [atsFile, setAtsFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isAtsLoading, setAtsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeJobDescription, setResumeJobDescription] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState<{
    bestPractices: string[];
    tailoredSuggestions: string[];
    generalRecommendations: string[];
  } | null>(null);
  const [isResumeLoading, setIsResumeLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("grid");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const state: TextProcessingState = {
    text, setText, excelFile, setExcelFile, targetLanguage, setTargetLanguage,
    selectedVoice, setSelectedVoice, isProcessing, setIsProcessing, bookPrompt, setBookPrompt,
    bookContent, setBookContent, isBookLoading, setIsBookLoading, atsFile, setAtsFile,
    jobDescription, setJobDescription, atsScore, setAtsScore, isAtsLoading, setAtsLoading,
    resumeFile, setResumeFile, resumeJobDescription, setResumeJobDescription,
    resumeAnalysis, setResumeAnalysis, isResumeLoading, setIsResumeLoading,
  };

  const lockedTabs = {
    "long-book": true,
    "ats-score": true,
    "resume-analyser": true,
    "text-to-speech": true,
    "excel-to-speech": true,
    "summarize": true,
  };

  useEffect(() => {
    if (viewMode === "grid") {
      setActiveTab(null);
      setIsModalOpen(false);
    }
  }, [viewMode]);

  const handleTryNow = (tabKey: string) => {
    setActiveTab(tabKey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTab(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderModelContent = () => {
    if (!activeTab) return null;

    switch (activeTab) {
      case "long-book":
        return <LongBook state={state} isLocked={lockedTabs["long-book"]} />;
      case "text-to-speech":
        return <TextToSpeech state={state} isLocked={lockedTabs["text-to-speech"]} />;
      case "excel-to-charts":
        return <ExcelToSpeech state={state} isLocked={lockedTabs["excel-to-charts"]} />;
      case "summarize":
        return <Summarize state={state} isLocked={lockedTabs["summarize"]} />;
      case "ats-score":
        return <AtsScore state={state} isLocked={lockedTabs["ats-score"]} />;
      case "resume-analyser":
        return <ResumeAnalyser state={state} isLocked={lockedTabs["resume-analyser"]} />;
      default:
        return null;
    }
  };

  const activeModel = activeTab ? textProcessingModels.find(m => m.key === activeTab) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Text Processing Models
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Text Processing Studio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your text with AI-powered tools. Convert text to speech, analyze resumes, generate content, and more.
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Models</p>
                  <p className="text-2xl font-bold text-blue-600">{textProcessingModels.length}</p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">94.5%</p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FileCheck className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing Speed</p>
                  <p className="text-2xl font-bold text-purple-600">Fast</p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === "tabs" ? (
          <Tabs value={activeTab || "text-to-speech"} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2 bg-card/50 backdrop-blur-sm border border-border/50 p-2">
                {textProcessingModels.map((model) => {
                  const Icon = model.icon;
                  return (
                    <TabsTrigger 
                      key={model.key}
                      value={model.key} 
                      className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-3 py-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline text-sm">{model.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {textProcessingModels.map((model) => (
              <TabsContent key={model.key} value={model.key} className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${model.color} text-white`}>
                          <model.icon className="h-5 w-5" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {textProcessingModels.map((model) => (
              <Card 
                key={model.key}
                className={`group cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 ${model.bgColor}`}
                onClick={() => handleTryNow(model.key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg`}>
                      <model.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs mb-1">
                        {model.badge}
                      </Badge>
                      <p className="text-xs text-primary font-medium">{model.sucessrate}% Success</p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{model.title}</h3>
                  <p className="text-sm text-primary mb-2">{model.titletagline}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
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
            ))}
          </div>
        )}

        {/* Enhanced Modal */}
        <ModelModal
          isOpen={isModalOpen}
          onClose={closeModal}
          model={activeModel}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        >
          {renderModelContent()}
        </ModelModal>
      </main>
    </div>
  );
};

export default TextProcessing;
