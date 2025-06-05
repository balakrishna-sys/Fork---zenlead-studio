import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Book, FileText, FileSpreadsheet, FileDigit, FileCheck, LucideIcon } from "lucide-react";
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
  setIsAtsLoading: (isLoading: boolean) => void;
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
  description: string;
  image : string;
  icon: LucideIcon;
}

const textProcessingModels: TextProcessingModel[] = [
  {
    key: "long-book",
    title: "Long Book",
    description: "Generate a full-length book or research paper based on your prompt.",
    icon: Book,
    image : 'https://static.vecteezy.com/system/resources/thumbnails/040/722/713/small/old-man-s-hands-reading-a-book-the-man-runs-his-fingers-through-the-book-free-video.jpg'
  },
  {
    key: "text-to-speech",
    title: "Text to Speech",
    description: "Convert text into natural-sounding speech with customizable voices.",
    icon: FileText,
    image : 'https://t3.ftcdn.net/jpg/02/44/46/32/360_F_244463221_9qvm69ukrh4NSfG4Vi2F8We4ZT5uhtSh.jpg'

  },
  {
    key: "excel-to-speech",
    title: "Excel to Speech",
    description: "Transform Excel or CSV data into spoken audio files.",
    icon: FileSpreadsheet,
    image : 'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2018/07/vba-macros-excel.jpg'

  },
  {
    key: "summarize",
    title: "Summarize",
    description: "Create concise summaries of large text documents.",
    icon: FileDigit,
    image : 'https://media.lovemaharashtra.org/sites/8/2016/09/Puzzle21.jpg'

  },
  {
    key: "ats-score",
    title: "ATS Score",
    description: "Evaluate resumes against job descriptions for ATS compatibility.",
    icon: FileCheck,
    image : 'https://media.licdn.com/dms/image/v2/D5612AQGCZ6Om1N34NA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732792994576?e=2147483647&v=beta&t=Dkxf3ohVZ_M1dVCAKnUKVdTg_uLmnveU6745iVVznYk'

  },
  {
    key: "resume-analyser",
    title: "Resume Analyser",
    description: "Get tailored suggestions to improve your resume.",
    icon: FileText,
    image : 'https://nluglob.org/wp-content/uploads/2023/11/ResumeProcessing.jpg'

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
  const [isAtsLoading, setIsAtsLoading] = useState(false);
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

  const state: TextProcessingState = {
    text,
    setText,
    excelFile,
    setExcelFile,
    targetLanguage,
    setTargetLanguage,
    selectedVoice,
    setSelectedVoice,
    isProcessing,
    setIsProcessing,
    bookPrompt,
    setBookPrompt,
    bookContent,
    setBookContent,
    isBookLoading,
    setIsBookLoading,
    atsFile,
    setAtsFile,
    jobDescription,
    setJobDescription,
    atsScore,
    setAtsScore,
    isAtsLoading,
    setIsAtsLoading,
    resumeFile,
    setResumeFile,
    resumeJobDescription,
    setResumeJobDescription,
    resumeAnalysis,
    setResumeAnalysis,
    isResumeLoading,
    setIsResumeLoading,
  };

  const lockedTabs = {
    "long-book": true,
    "ats-score": true,
    "resume-analyser": true,
    "text-to-speech": true,
    "excel-to-speech": true,
    "summarize": true,
  };

  // Reset activeTab when mounting or switching to grid view
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
      case "long-book":
        return <LongBook state={state} isLocked={lockedTabs["long-book"]} />;
      case "text-to-speech":
        return <TextToSpeech state={state} isLocked={lockedTabs["text-to-speech"]} />;
      case "excel-to-speech":
        return <ExcelToSpeech state={state} isLocked={lockedTabs["excel-to-speech"]} />;
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
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="inline-block rounded-lg bg-lime-500/10 px-3 py-1 text-sm text-lime-500 mb-2">
              Text Processing Models
            </div>
            <h1 className="text-3xl font-bold mb-2">Text Processing</h1>
            <p className="text-gray-600">Convert your text to natural-sounding speech, analyze resumes, or generate content</p>
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
          <Tabs value={activeTab || "text-to-speech"} onValueChange={setActiveTab} className="w-full">
            <TabsList className="inline-flex mb-6">
              <TabsTrigger value="long-book" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Long Book</span>
              </TabsTrigger>
              <TabsTrigger value="ats-score" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                <span>ATS Score</span>
              </TabsTrigger>
              <TabsTrigger value="resume-analyser" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Resume Analyser</span>
              </TabsTrigger>
              <TabsTrigger value="text-to-speech" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Text to Speech</span>
              </TabsTrigger>
              <TabsTrigger value="excel-to-speech" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Excel to Speech</span>
              </TabsTrigger>
              <TabsTrigger value="summarize" className="flex items-center gap-2">
                <FileDigit className="h-4 w-4" />
                <span>Summarize</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="long-book" className="space-y-6" id="long-book">
              <LongBook state={state} isLocked={lockedTabs["long-book"]} />
            </TabsContent>
            <TabsContent value="text-to-speech" className="space-y-6">
              <TextToSpeech state={state} isLocked={lockedTabs["text-to-speech"]} />
            </TabsContent>
            <TabsContent value="excel-to-speech" className="space-y-6">
              <ExcelToSpeech state={state} isLocked={lockedTabs["excel-to-speech"]} />
            </TabsContent>
            <TabsContent value="summarize" className="space-y-6">
              <Summarize state={state} isLocked={lockedTabs["summarize"]} />
            </TabsContent>
            <TabsContent value="ats-score" className="space-y-6">
              <AtsScore state={state} isLocked={lockedTabs["ats-score"]} />
            </TabsContent>
            <TabsContent value="resume-analyser" className="space-y-6">
              <ResumeAnalyser state={state} isLocked={lockedTabs["resume-analyser"]} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 grid-and-content-container h-screen overflow-hidden">
          {/* Left: Model Cards */}
          <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 flex-grow">
              {textProcessingModels.map((model) => (
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

export default TextProcessing;