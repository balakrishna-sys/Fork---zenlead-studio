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
  CheckCircle2
} from "lucide-react";

interface DocumentProject {
  id: string;
  title: string;
  type: 'book' | 'research' | 'course' | 'letter' | 'report' | 'article' | 'text-to-speech' | 'excel-charts' | 'summarize' | 'ats-score' | 'resume-analyser';
  timestamp: string;
  status: 'draft' | 'completed' | 'processing';
  model: string;
  wordCount?: number;
  preview: string;
}

interface ContentPreset {
  id: string;
  type: 'book' | 'research' | 'course' | 'letter' | 'report' | 'article' | 'text-to-speech' | 'excel-charts' | 'summarize' | 'ats-score' | 'resume-analyser';
  title: string;
  titletagline: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  badge: string;
  successRate: number;
  estimatedTime: string;
  features: string[];
  keywords: string[];
  settings: {
    tone?: string[];
    style?: string[];
    length?: string[];
    format?: string[];
    language?: string[];
    voice?: string[];
    quality?: string[];
  };
}

const contentPresets: ContentPreset[] = [
  // Original Text Processing Models
  {
    id: 'long-book',
    type: 'book',
    title: 'Long Book',
    titletagline: 'Generate comprehensive papers',
    description: 'Generate a full-length book or research paper based on your prompt with AI-powered content creation.',
    icon: Book,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    badge: 'Content AI',
    successRate: 95,
    estimatedTime: '15-30 minutes',
    features: ['Chapter Structure', 'Cover Design', 'Image Integration', 'Bibliography', 'Table of Contents'],
    keywords: ['Book Generation', 'Research Paper', 'Content Creation'],
    settings: {
      tone: ['Academic', 'Casual', 'Professional', 'Creative'],
      style: ['Narrative', 'Educational', 'Technical', 'Fiction'],
      length: ['50-100 pages', '100-200 pages', '200+ pages'],
      format: ['PDF', 'DOCX', 'EPUB']
    }
  },
  {
    id: 'text-to-speech',
    type: 'text-to-speech',
    title: 'Convert texts to voice',
    titletagline: 'Natural voice synthesis',
    description: 'Convert text into natural-sounding speech with customizable voices and multilingual support.',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    badge: 'Popular',
    successRate: 94,
    estimatedTime: '2-5 minutes',
    features: ['Natural Voice', 'Multiple Languages', 'Custom Speed', 'Voice Cloning', 'High Quality Audio'],
    keywords: ['Text-to-Speech', 'Voice Synthesis', 'Multilingual'],
    settings: {
      language: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'],
      voice: ['Male Professional', 'Female Professional', 'Male Casual', 'Female Casual', 'Child Voice'],
      quality: ['Standard', 'High Quality', 'Ultra HD'],
      format: ['MP3', 'WAV', 'FLAC']
    }
  },
  {
    id: 'excel-charts',
    type: 'excel-charts',
    title: 'Excel to Charts',
    titletagline: 'Visualize spreadsheet data',
    description: 'Transform Excel or CSV data into comprehensive audio summaries and visual charts.',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    badge: 'Data Viz',
    successRate: 92,
    estimatedTime: '5-10 minutes',
    features: ['Chart Generation', 'Audio Summary', 'Data Analysis', 'Multiple Formats', 'Interactive Visuals'],
    keywords: ['Excel', 'CSV', 'Audio Conversion'],
    settings: {
      style: ['Bar Charts', 'Line Charts', 'Pie Charts', 'Scatter Plots', 'Mixed Charts'],
      tone: ['Professional', 'Casual', 'Technical', 'Executive Summary'],
      format: ['PNG', 'SVG', 'PDF', 'Interactive HTML'],
      quality: ['Standard', 'High Resolution', 'Print Quality']
    }
  },
  {
    id: 'summarize',
    type: 'summarize',
    title: 'Summarize',
    titletagline: 'Intelligent text summarization',
    description: 'Create concise, meaningful summaries of large text documents using advanced NLP technology.',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    badge: 'AI Powered',
    successRate: 97,
    estimatedTime: '1-3 minutes',
    features: ['Key Points', 'Executive Summary', 'Bullet Points', 'Custom Length', 'Multiple Formats'],
    keywords: ['Summarization', 'Text Analysis', 'NLP'],
    settings: {
      style: ['Executive Summary', 'Bullet Points', 'Paragraph Form', 'Key Highlights'],
      length: ['Brief (100 words)', 'Standard (250 words)', 'Detailed (500 words)', 'Custom'],
      tone: ['Professional', 'Academic', 'Casual', 'Technical'],
      format: ['Plain Text', 'Markdown', 'PDF', 'HTML']
    }
  },
  {
    id: 'ats-score',
    type: 'ats-score',
    title: 'ATS Score',
    titletagline: 'Resume optimization scoring',
    description: 'Evaluate resumes against job descriptions for ATS compatibility and provide detailed improvement suggestions.',
    icon: FileCheck,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    badge: 'Career Boost',
    successRate: 96,
    estimatedTime: '2-5 minutes',
    features: ['ATS Compatibility', 'Score Analysis', 'Keyword Matching', 'Improvement Tips', 'Industry Standards'],
    keywords: ['ATS', 'Resume Analysis', 'Job Matching'],
    settings: {
      style: ['Detailed Analysis', 'Quick Score', 'Keyword Focus', 'Format Check'],
      tone: ['Professional', 'Constructive', 'Detailed', 'Concise'],
      length: ['Summary Only', 'Detailed Report', 'Full Analysis'],
      format: ['PDF Report', 'Text Summary', 'Interactive Dashboard']
    }
  },
  {
    id: 'resume-analyser',
    type: 'resume-analyser',
    title: 'Resume Analyser',
    titletagline: 'Professional resume enhancement',
    description: 'Get tailored suggestions to improve your resume with industry-specific recommendations and best practices.',
    icon: Users,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    badge: 'Pro Tools',
    successRate: 94,
    estimatedTime: '3-8 minutes',
    features: ['Industry Analysis', 'Best Practices', 'Tailored Suggestions', 'Format Optimization', 'Content Enhancement'],
    keywords: ['Resume Enhancement', 'Career', 'NLP'],
    settings: {
      style: ['Industry Specific', 'General Best Practices', 'Executive Level', 'Entry Level'],
      tone: ['Constructive', 'Detailed', 'Encouraging', 'Direct'],
      length: ['Quick Tips', 'Comprehensive Review', 'Detailed Analysis'],
      format: ['PDF Report', 'Checklist', 'Action Plan', 'Side-by-side Comparison']
    }
  },
  // New Content Types
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
  },
  {
    id: 'report',
    type: 'report',
    title: 'Business Report',
    description: 'Generate detailed business reports with data analysis and recommendations',
    icon: Briefcase,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    estimatedTime: '8-15 minutes',
    features: ['Executive Summary', 'Data Analysis', 'Charts & Graphs', 'Recommendations', 'Appendices'],
    settings: {
      tone: ['Professional', 'Executive', 'Technical', 'Strategic'],
      style: ['Annual Report', 'Market Analysis', 'Financial Report', 'Project Report'],
      length: ['Summary (5-10 pages)', 'Standard (15-25 pages)', 'Comprehensive (30+ pages)'],
      format: ['PDF', 'DOCX', 'PowerPoint']
    }
  },
  {
    id: 'article',
    type: 'article',
    title: 'Article & Blog',
    titletagline: 'Engaging content creation',
    description: 'Write engaging articles and blog posts with SEO optimization',
    icon: FileText,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    badge: 'Content',
    successRate: 95,
    estimatedTime: '3-8 minutes',
    features: ['SEO Optimization', 'Meta Descriptions', 'Engaging Headlines', 'Call-to-Actions', 'Social Sharing'],
    keywords: ['Article', 'Blog', 'SEO'],
    settings: {
      tone: ['Conversational', 'Professional', 'Authoritative', 'Engaging'],
      style: ['How-to Guide', 'Listicle', 'Opinion Piece', 'News Article'],
      length: ['500-1000 words', '1000-2000 words', '2000+ words'],
      format: ['Markdown', 'HTML', 'Plain Text']
    }
  }
];

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Project History */}
        <div className="w-80 border-r bg-card/30 backdrop-blur-sm flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">AI Studio</h2>
                <p className="text-sm text-muted-foreground">Text Generation</p>
              </div>
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
                <SelectItem value="report">Reports</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentPresets.map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <Card
                        key={preset.id}
                        className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${preset.bgColor} border-2 hover:border-primary/50`}
                        onClick={() => handlePresetSelect(preset)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${preset.color} shadow-lg`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="text-xs mb-1">
                                {preset.badge}
                              </Badge>
                              <p className="text-xs text-primary font-medium">{preset.successRate}% Success</p>
                            </div>
                          </div>

                          <h3 className="font-semibold text-lg mb-1">{preset.title}</h3>
                          <p className="text-sm text-primary mb-2">{preset.titletagline}</p>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {preset.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex flex-wrap gap-1">
                              {preset.keywords.slice(0, 2).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">{preset.estimatedTime}</p>
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

                  {/* Universal Settings for all models */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Model Settings</Label>
                    <div className="space-y-4">
                      {/* Tone Selection */}
                      {selectedPreset.settings.tone && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Tone</Label>
                          <Select value={settings.tone || ''} onValueChange={(value) => setSettings(prev => ({...prev, tone: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select tone..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.tone.map((tone) => (
                                <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Style Selection */}
                      {selectedPreset.settings.style && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Style</Label>
                          <Select value={settings.style || ''} onValueChange={(value) => setSettings(prev => ({...prev, style: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select style..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.style.map((style) => (
                                <SelectItem key={style} value={style}>{style}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Length Selection */}
                      {selectedPreset.settings.length && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Length</Label>
                          <Select value={settings.length || ''} onValueChange={(value) => setSettings(prev => ({...prev, length: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select length..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.length.map((length) => (
                                <SelectItem key={length} value={length}>{length}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Format Selection */}
                      {selectedPreset.settings.format && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Output Format</Label>
                          <Select value={settings.format || ''} onValueChange={(value) => setSettings(prev => ({...prev, format: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select format..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.format.map((format) => (
                                <SelectItem key={format} value={format}>{format}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Language Selection for TTS */}
                      {selectedPreset.settings.language && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Language</Label>
                          <Select value={settings.language || ''} onValueChange={(value) => setSettings(prev => ({...prev, language: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.language.map((language) => (
                                <SelectItem key={language} value={language}>{language}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Voice Selection for TTS */}
                      {selectedPreset.settings.voice && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Voice</Label>
                          <Select value={settings.voice || ''} onValueChange={(value) => setSettings(prev => ({...prev, voice: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select voice..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.voice.map((voice) => (
                                <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Quality Selection */}
                      {selectedPreset.settings.quality && (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Quality</Label>
                          <Select value={settings.quality || ''} onValueChange={(value) => setSettings(prev => ({...prev, quality: value}))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select quality..." />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPreset.settings.quality.map((quality) => (
                                <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

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
