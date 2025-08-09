import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModelModal } from "@/components/ModelModal";
import { 
  Book, 
  FileText, 
  Mail, 
  GraduationCap,
  FileCheck,
  TrendingUp,
  Zap,
  Target,
  Users,
  ArrowRight,
  FileSpreadsheet,
  FileDigit,
  LucideIcon,
  Mic,
  BarChart3
} from "lucide-react";

// Import modular components
import ProjectHistorySidebar from "@/components/text-processing/ProjectHistorySidebar";
import ProcessingToolGrid from "@/components/text-processing/ProcessingToolGrid";
import ContentGenerationGrid from "@/components/text-processing/ContentGenerationGrid";
import ContentGenerationWorkspace from "@/components/text-processing/ContentGenerationWorkspace";

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
  
  // Project history state
  const [projects, setProjects] = useState<DocumentProject[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  // Content generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");

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

  const handleItemSelect = (item: ProcessingModel | ContentPreset, type: 'traditional' | 'content-generation') => {
    setActiveItem(item);
    setActiveType(type);
    setGeneratedContent("");
    if (type === 'traditional') {
      setIsModalOpen(true);
    }
  };

  const handleGenerate = async (contentIdea: string, settings: any) => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Project History Sidebar */}
        <ProjectHistorySidebar
          projects={projects}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          onNewProject={() => {setActiveItem(null); setActiveType(null);}}
          contentPresets={contentPresets}
          traditionalModels={traditionalModels}
        />

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col">
          {!activeItem ? (
            /* Main Selection Interface */
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 lg:mb-12">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    AI Text Processing Studio
                  </h1>
                  <p className="text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8">
                    Transform your text with AI-powered tools and content generation. Choose your processing type to get started.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                <ProcessingToolGrid
                  models={traditionalModels}
                  onModelSelect={(model) => handleItemSelect(model, 'traditional')}
                  title="Processing Tools"
                  className="mb-8 lg:mb-12"
                />

                {/* Content Generation Presets */}
                <ContentGenerationGrid
                  presets={contentPresets}
                  onPresetSelect={(preset) => handleItemSelect(preset, 'content-generation')}
                  title="Content Generation"
                />
              </div>
            </div>
          ) : activeType === 'content-generation' ? (
            /* Content Generation Interface */
            <ContentGenerationWorkspace
              preset={activeItem as ContentPreset}
              onBack={() => setActiveItem(null)}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generatedContent={generatedContent}
            />
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
