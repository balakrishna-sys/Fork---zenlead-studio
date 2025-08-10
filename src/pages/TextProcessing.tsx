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
  Book,
  FileText,
  Mail,
  GraduationCap,
  Search,
  Sparkles,
  Plus,
  History,
  Download,
  Copy,
  Edit,
  FileCheck,
  TrendingUp,
  Zap,
  Target,
  Users,
  ArrowRight,
  Play,
  Loader2,
  CheckCircle2,
  FileSpreadsheet,
  FileDigit,
  LucideIcon,
  Mic,
  BarChart3,
  Clock,
  Menu
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

interface ProcessingModel {
  key: string;
  title: string;
  titletagline: string;
  description: string;
  modelName: string;
  modelkeywords: string[];
  sucessrate: number;
  processingspeed: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  badge: string;
  category: 'traditional' | 'content-generation';
}

// Traditional models that work with existing components
const traditionalModels: ProcessingModel[] = [
  {
    key: "text-to-speech",
    title: "Convert texts to voice",
    titletagline: 'Natural voice synthesis',
    description: "Convert text into natural-sounding speech with customizable voices and multilingual support.",
    modelName: "VoiceCraft",
    modelkeywords: ["Text-to-Speech", "Voice Synthesis"],
    sucessrate: 94,
    processingspeed: "Fast",
    icon: Mic,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    badge: "Popular",
    category: 'traditional'
  },
  {
    key: "excel-to-charts",
    title: "Excel to Charts",
    titletagline: "Visualize spreadsheet data",
    description: "Transform Excel or CSV data into comprehensive audio summaries and visual charts.",
    modelName: "Excelerate",
    modelkeywords: ["Excel", "CSV"],
    sucessrate: 92,
    processingspeed: "Moderate",
    icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    badge: "Data Viz",
    category: 'traditional'
  },
  {
    key: "summarize",
    title: "Summarize",
    titletagline: "Intelligent text summarization",
    description: "Create concise, meaningful summaries of large text documents using advanced NLP technology.",
    modelName: "TextSummarizer",
    modelkeywords: ["Summarization", "Text Analysis"],
    sucessrate: 97,
    processingspeed: "Fast",
    icon: FileDigit,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    badge: "AI Powered",
    category: 'traditional'
  },
  {
    key: "ats-score",
    title: "ATS Score",
    titletagline: "Resume optimization scoring",
    description: "Evaluate resumes against job descriptions for ATS compatibility and provide detailed improvement suggestions.",
    modelName: "ResumeRater",
    modelkeywords: ["ATS", "Resume Analysis"],
    sucessrate: 96,
    processingspeed: "Fast",
    icon: FileCheck,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    badge: "Career Boost",
    category: 'traditional'
  },
  {
    key: "resume-analyser",
    title: "Resume Analyser",
    titletagline: "Professional resume enhancement",
    description: "Get tailored suggestions to improve your resume with industry-specific recommendations and best practices.",
    modelName: "ResumeOptimizer",
    modelkeywords: ["Resume Enhancement", "Career"],
    sucessrate: 94,
    processingspeed: "Moderate",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
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
  category: 'traditional' | 'content-generation';
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
    preview: 'A comprehensive guide covering React fundamentals, advanced patterns, and best practices...',
    category: 'content-generation'
  },
  {
    id: '2',
    title: 'Marketing Presentation Audio',
    type: 'text-to-speech',
    timestamp: '2024-01-14T14:20:00Z',
    status: 'completed',
    model: 'VoiceCraft',
    preview: 'Converted marketing presentation to natural-sounding speech in English...',
    category: 'traditional'
  },
  {
    id: '3',
    title: 'Sales Data Analysis Charts',
    type: 'excel-to-charts',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'completed',
    model: 'Excelerate',
    preview: 'Transformed Q4 sales data into comprehensive charts and audio summary...',
    category: 'traditional'
  },
  {
    id: '4',
    title: 'Backend Development Onboarding',
    type: 'course',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'processing',
    model: 'CourseBuilder',
    preview: 'Comprehensive onboarding course for new backend developers using our tech stack...',
    category: 'content-generation'
  },
  {
    id: '5',
    title: 'Research Paper Summary',
    type: 'summarize',
    timestamp: '2024-01-12T16:30:00Z',
    status: 'completed',
    model: 'TextSummarizer',
    preview: 'Summarized 50-page AI research paper into key insights and findings...',
    category: 'traditional'
  }
];

const TextProcessing = () => {
  // Active item state
  const [activeItem, setActiveItem] = useState<ProcessingModel | ContentPreset | null>(null);
  const [activeType, setActiveType] = useState<'traditional' | 'content-generation' | null>(null);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Project history state
  const [projects, setProjects] = useState<DocumentProject[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  // Content generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [contentIdea, setContentIdea] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [duration, setDuration] = useState(10);

  // Traditional model state - persistent settings
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

  // Modal state for traditional models
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
    "excel-to-charts": true,
    "summarize": true,
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleItemSelect = (item: ProcessingModel | ContentPreset, type: 'traditional' | 'content-generation') => {
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
    
    const newProject: DocumentProject = {
      id: Date.now().toString(),
      title: contentIdea,
      type: activeItem.id || (activeItem as ProcessingModel).key,
      timestamp: new Date().toISOString(),
      status: 'completed',
      model: 'AI Studio Pro',
      wordCount: Math.floor(Math.random() * 20000) + 5000,
      preview: `Generated ${activeItem.title.toLowerCase()} based on: ${contentIdea.substring(0, 100)}...`,
      category: activeType!
    };
    
    setProjects(prev => [newProject, ...prev]);
    setGeneratedContent(`# ${contentIdea}\n\nYour ${activeItem.title.toLowerCase()} has been generated successfully!\n\nThis would contain the full content of your ${activeItem.title.toLowerCase()} based on your specifications...`);
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

    const model = activeItem as ProcessingModel;
    switch (model.key) {
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

  // Project History Sidebar Component
  const ProjectHistorySidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 lg:p-6 border-b flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
            <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-base lg:text-lg">AI Studio</h2>
            <p className="text-xs lg:text-sm text-muted-foreground">Text Processing</p>
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
              <SelectItem value="text-to-speech">Voice</SelectItem>
              <SelectItem value="excel-to-charts">Charts</SelectItem>
              <SelectItem value="summarize">Summary</SelectItem>
              <SelectItem value="ats-score">ATS</SelectItem>
              <SelectItem value="resume-analyser">Resume</SelectItem>
              <SelectItem value="book">Books</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="course">Courses</SelectItem>
              <SelectItem value="letter">Letters</SelectItem>
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
              const contentPreset = contentPresets.find(p => p.id === project.type);
              const item = traditionalModel || contentPreset;
              const Icon = item?.icon || FileText;

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
                <FileText className="h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground/50 mx-auto mb-3" />
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
                <p className="text-xs text-muted-foreground">Text Processing</p>
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
                    AI Text Processing Studio
                  </h1>
                  <p className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8">
                    Transform your text with AI-powered tools and content generation. Choose your processing type to get started.
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
                        <p className="text-xl lg:text-2xl font-bold text-green-600">{contentPresets.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                      <CardContent className="p-4 text-center">
                        <Target className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                        <p className="text-xl lg:text-2xl font-bold text-purple-600">95%</p>
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
                    {contentPresets.map((preset) => {
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
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${(activeItem as ContentPreset).color}`}>
                      {(() => {
                        const Icon = (activeItem as ContentPreset).icon;
                        return <Icon className="h-4 w-4 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg lg:text-xl">{activeItem.title}</h2>
                      <p className="text-sm text-muted-foreground">{(activeItem as ContentPreset).estimatedTime}</p>
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
                  {(activeItem as ContentPreset).type === 'course' && (
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
                              <CardContent className="p-3 lg:p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl lg:text-2xl">{level.emoji}</span>
                                  <div>
                                    <p className="font-medium text-sm lg:text-base">{level.title}</p>
                                    <p className="text-xs lg:text-sm text-muted-foreground">{level.desc}</p>
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
                                  <span className="text-lg">{commitment.emoji}</span>
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
                            ].map((presetOption) => (
                              <Button
                                key={presetOption.value}
                                variant={duration === presetOption.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDuration(presetOption.value)}
                                className="text-xs"
                              >
                                {presetOption.value}h
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
                        <h2 className="text-xl lg:text-2xl font-bold">Content Generated Successfully</h2>
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
                      <div className={`p-6 rounded-xl bg-gradient-to-r ${(activeItem as ContentPreset).color} text-white mx-auto mb-6 w-fit`}>
                        {(() => {
                          const Icon = (activeItem as ContentPreset).icon;
                          return <Icon className="h-12 w-12" />;
                        })()}
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold mb-3">Ready to Generate Your {activeItem.title}</h2>
                      <p className="text-muted-foreground text-base lg:text-lg mb-6 max-w-md mx-auto">
                        Fill out the settings in the left panel and click generate to create your content.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{(activeItem as ContentPreset).estimatedTime}</span>
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
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${(activeItem as ProcessingModel).color}`}>
                      {(() => {
                        const Icon = (activeItem as ProcessingModel).icon;
                        return <Icon className="h-4 w-4 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg lg:text-xl">{activeItem.title}</h2>
                      <p className="text-sm text-muted-foreground">{(activeItem as ProcessingModel).titletagline}</p>
                    </div>
                  </div>
                  <Badge className={`ml-auto ${(activeItem as ProcessingModel).bgColor} border-0`}>
                    {(activeItem as ProcessingModel).badge}
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
        model={activeItem as ProcessingModel}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      >
        {renderModelContent()}
      </ModelModal>
    </div>
  );
};

export default TextProcessing;
