import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ModelModal } from "@/components/ModelModal";
import { 
  Book, 
  FileText, 
  Mail, 
  GraduationCap, 
  Briefcase,
  Search,
  Filter,
  Clock,
  Sparkles,
  Plus,
  History,
  Download,
  Copy,
  Edit,
  Trash2,
  Settings,
  BookOpen,
  FileCheck,
  TrendingUp,
  Zap,
  Target,
  Users,
  Calendar,
  ArrowRight,
  Play,
  Loader2,
  CheckCircle2,
  FileSpreadsheet,
  FileDigit,
  Grid3X3,
  List,
  LucideIcon
} from "lucide-react";

// Import existing components
import LongBook from "@/components/text-processing/long-book";
import TextToSpeech from "@/components/text-processing/text-to-speech";
import ExcelToSpeech from "@/components/text-processing/excel-to-speech";
import Summarize from "@/components/text-processing/summarize";
import AtsScore from "@/components/text-processing/ats-score";
import ResumeAnalyser from "@/components/text-processing/resume-analyser";

// Existing state interface
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
  category: 'traditional' | 'content-generation';
}

// Existing traditional models
const traditionalModels: TextProcessingModel[] = [
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
    badge: "Content AI",
    category: 'traditional'
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
    badge: "Popular",
    category: 'traditional'
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
    badge: "Data Viz",
    category: 'traditional'
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
    badge: "AI Powered",
    category: 'traditional'
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
    badge: "Career Boost",
    category: 'traditional'
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
    badge: "Pro Tools",
    category: 'traditional'
  },
];

// New content generation presets
interface ContentPreset {
  id: string;
  type: 'book' | 'research' | 'course' | 'letter' | 'report' | 'article';
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

const contentPresets: ContentPreset[] = [
  {
    id: 'book',
    type: 'book',
    title: 'Long-form Book',
    description: 'Generate comprehensive books with chapters, cover page, images, and research references',
    icon: Book,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    estimatedTime: '15-30 minutes',
    features: ['Chapter Structure', 'Cover Design', 'Image Integration', 'Bibliography', 'Table of Contents'],
    settings: {
      tone: ['Academic', 'Casual', 'Professional', 'Creative'],
      style: ['Narrative', 'Educational', 'Technical', 'Fiction'],
      length: ['50-100 pages', '100-200 pages', '200+ pages'],
      format: ['PDF', 'DOCX', 'EPUB']
    }
  },
  {
    id: 'research',
    type: 'research',
    title: 'Research Paper',
    description: 'Create academic papers with abstract, methodology, results, citations, and appendix',
    icon: FileCheck,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    estimatedTime: '10-20 minutes',
    features: ['Abstract', 'Literature Review', 'Methodology', 'Results & Analysis', 'Citations'],
    settings: {
      tone: ['Academic', 'Scientific', 'Technical'],
      style: ['APA', 'MLA', 'Chicago', 'IEEE'],
      length: ['5-10 pages', '10-20 pages', '20+ pages'],
      format: ['PDF', 'DOCX', 'LaTeX']
    }
  },
  {
    id: 'course',
    type: 'course',
    title: 'Course Material',
    description: 'Develop comprehensive courses with lesson modules, diagrams, and assignments',
    icon: GraduationCap,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    estimatedTime: '20-40 minutes',
    features: ['Lesson Modules', 'Interactive Exercises', 'Diagrams', 'Assessments', 'Progress Tracking'],
    settings: {
      tone: ['Beginner-friendly', 'Intermediate', 'Advanced', 'Expert'],
      style: ['Practical', 'Theoretical', 'Hands-on', 'Case Study'],
      length: ['10 Hours', '20 Hours', '40 Hours', 'Custom'],
      format: ['Interactive Web', 'PDF Modules', 'Video Script']
    }
  },
  {
    id: 'letter',
    type: 'letter',
    title: 'Professional Letter',
    description: 'Craft formal and informal letters with custom branding and formatting',
    icon: Mail,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    estimatedTime: '2-5 minutes',
    features: ['Letterhead', 'Formal Structure', 'Custom Branding', 'Multiple Formats', 'Templates'],
    settings: {
      tone: ['Formal', 'Semi-formal', 'Friendly', 'Persuasive'],
      style: ['Business', 'Cover Letter', 'Complaint', 'Thank You'],
      length: ['Brief', 'Standard', 'Detailed'],
      format: ['PDF', 'DOCX', 'Plain Text']
    }
  }
];

interface DocumentProject {
  id: string;
  title: string;
  type: string;
  timestamp: string;
  status: 'draft' | 'completed' | 'processing';
  model: string;
  wordCount?: number;
  preview: string;
}

const mockProjects: DocumentProject[] = [
  {
    id: '1',
    title: 'Complete Guide to React Development',
    type: 'book',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
    model: 'BookGenix Pro',
    wordCount: 45000,
    preview: 'A comprehensive guide covering React fundamentals, advanced patterns, and best practices...'
  },
  {
    id: '2',
    title: 'AI in Healthcare Research Study',
    type: 'research',
    timestamp: '2024-01-14T14:20:00Z',
    status: 'completed',
    model: 'ResearchAI',
    wordCount: 12000,
    preview: 'This study examines the impact of artificial intelligence technologies in modern healthcare...'
  },
  {
    id: '3',
    title: 'Backend Development Onboarding',
    type: 'course',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'processing',
    model: 'CourseBuilder',
    preview: 'Comprehensive onboarding course for new backend developers using our tech stack...'
  }
];

const TextProcessing = () => {
  // UI mode state
  const [uiMode, setUiMode] = useState<'studio' | 'traditional'>('traditional');
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("grid");
  
  // Traditional mode state
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Studio mode state
  const [selectedPreset, setSelectedPreset] = useState<ContentPreset | null>(null);
  const [projects, setProjects] = useState<DocumentProject[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  
  // Form state for content generation
  const [contentIdea, setContentIdea] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [duration, setDuration] = useState(10);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Existing text processing state
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

  const activeModel = activeTab ? traditionalModels.find(m => m.key === activeTab) : null;

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    return matchesSearch && matchesType;
  });

  const handlePresetSelect = (preset: ContentPreset) => {
    setSelectedPreset(preset);
    setSettings({});
  };

  const handleGenerate = async () => {
    if (!selectedPreset || !contentIdea.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newProject: DocumentProject = {
      id: Date.now().toString(),
      title: contentIdea,
      type: selectedPreset.type,
      timestamp: new Date().toISOString(),
      status: 'completed',
      model: 'AI Studio Pro',
      wordCount: Math.floor(Math.random() * 20000) + 5000,
      preview: `Generated ${selectedPreset.title.toLowerCase()} based on: ${contentIdea.substring(0, 100)}...`
    };
    
    setProjects(prev => [newProject, ...prev]);
    setGeneratedContent(`# ${contentIdea}\n\nYour ${selectedPreset.title.toLowerCase()} has been generated successfully!\n\nThis would contain the full content of your ${selectedPreset.title.toLowerCase()} based on your specifications...`);
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

  // Traditional Mode Interface
  if (uiMode === 'traditional') {
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
                <Separator orientation="vertical" className="h-6" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setUiMode('studio')}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Studio Mode
                </Button>
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
                    <p className="text-2xl font-bold text-blue-600">{traditionalModels.length}</p>
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

          {/* Traditional Models Grid/Tabs */}
          {viewMode === "tabs" ? (
            <Tabs value={activeTab || "text-to-speech"} onValueChange={setActiveTab} className="w-full">
              <div className="mb-8">
                <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2 bg-card/50 backdrop-blur-sm border border-border/50 p-2">
                  {traditionalModels.map((model) => {
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

              {traditionalModels.map((model) => (
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
              {traditionalModels.map((model) => (
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
  }

  // AI Studio Mode Interface
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Project History */}
        <div className="w-80 border-r bg-card/30 backdrop-blur-sm flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">AI Studio</h2>
                  <p className="text-sm text-muted-foreground">Text Generation</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUiMode('traditional')}
              >
                Traditional
              </Button>
            </div>
            
            <Button className="w-full gap-2" onClick={() => setSelectedPreset(null)}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
                <SelectItem value="letter">Letters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project History */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">Recent Projects</h3>
              </div>
              
              {filteredProjects.map((project) => {
                const preset = contentPresets.find(p => p.type === project.type);
                const Icon = preset?.icon || FileText;
                
                return (
                  <Card key={project.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${preset?.color || 'from-gray-500 to-gray-600'} text-white flex-shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate mb-1">{project.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.preview}</p>
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </Badge>
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
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No projects found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col">
          {!selectedPreset ? (
            /* Content Type Selection */
            <div className="flex-1 p-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    AI Text Generation Studio
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Create comprehensive content with AI-powered generation. Choose your content type to get started.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Content Types</p>
                        <p className="text-2xl font-bold text-blue-600">{contentPresets.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Avg Generation</p>
                        <p className="text-2xl font-bold text-green-600">5-20 min</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold text-purple-600">97%</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {contentPresets.map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <Card
                        key={preset.id}
                        className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${preset.bgColor} border-2 hover:border-primary/50`}
                        onClick={() => handlePresetSelect(preset)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${preset.color} shadow-lg group-hover:scale-110 transition-transform`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{preset.title}</h3>
                              <p className="text-sm text-muted-foreground">{preset.estimatedTime}</p>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
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
          ) : (
            /* Content Generation Interface */
            <div className="flex-1 flex">
              {/* Settings Panel */}
              <div className="w-96 border-r bg-card/30 backdrop-blur-sm p-6 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPreset(null)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedPreset.color}`}>
                      <selectedPreset.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold">{selectedPreset.title}</h2>
                      <p className="text-sm text-muted-foreground">{selectedPreset.estimatedTime}</p>
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
                      placeholder={`Tell us your idea - don't worry about making it perfect!\n\nExample: Create a comprehensive onboarding course for new backend developers using our tech stack documentation and coding standards...`}
                      value={contentIdea}
                      onChange={(e) => setContentIdea(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                  </div>

                  {/* Course-specific settings for demo */}
                  {selectedPreset.type === 'course' && (
                    <>
                      {/* Level Selection */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Select Your Level</Label>
                        <div className="grid gap-3">
                          {[
                            { id: 'beginner', emoji: '🌱', title: 'Beginner', desc: 'New to the subject' },
                            { id: 'intermediate', emoji: '🌿', title: 'Intermediate', desc: 'Familiar with basics' },
                            { id: 'advanced', emoji: '🌳', title: 'Advanced', desc: 'Experienced practitioner' }
                          ].map((level) => (
                            <Card
                              key={level.id}
                              className={`cursor-pointer transition-all ${selectedLevel === level.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                              onClick={() => setSelectedLevel(level.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{level.emoji}</span>
                                  <div>
                                    <p className="font-medium">{level.title}</p>
                                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Time Commitment */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Weekly Time Commitment</Label>
                        <div className="grid gap-3">
                          {[
                            { id: 'light', emoji: '☀️', title: 'Light', desc: '1-2 hours/week' },
                            { id: 'moderate', emoji: '🌤️', title: 'Moderate', desc: '3-5 hours/week' },
                            { id: 'intensive', emoji: '⚡', title: 'Intensive', desc: '6+ hours/week' }
                          ].map((commitment) => (
                            <Card
                              key={commitment.id}
                              className={`cursor-pointer transition-all ${timeCommitment === commitment.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                              onClick={() => setTimeCommitment(commitment.id)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{commitment.emoji}</span>
                                  <div>
                                    <p className="font-medium text-sm">{commitment.title}</p>
                                    <p className="text-xs text-muted-foreground">{commitment.desc}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Total Duration</Label>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              min={2}
                              max={60}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">Hours</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 10, label: 'Quick Skill' },
                              { value: 20, label: 'Comprehensive' },
                              { value: 40, label: 'Deep Mastery' }
                            ].map((preset) => (
                              <Button
                                key={preset.value}
                                variant={duration === preset.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDuration(preset.value)}
                                className="text-xs"
                              >
                                {preset.value}h
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
                          Generate {selectedPreset.title}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-8 overflow-y-auto">
                {generatedContent ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                        <h2 className="text-2xl font-bold">Content Generated Successfully</h2>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <Card className="bg-white dark:bg-gray-900 shadow-lg">
                      <CardContent className="p-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap">{generatedContent}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedPreset.color} text-white mx-auto mb-6 w-fit`}>
                        <selectedPreset.icon className="h-12 w-12" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3">Ready to Generate Your {selectedPreset.title}</h2>
                      <p className="text-muted-foreground text-lg mb-6 max-w-md">
                        Fill out the settings in the left panel and click generate to create your content.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{selectedPreset.estimatedTime}</span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TextProcessing;
