import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Book, Users, TrendingUp, Target, FileCheck } from "lucide-react";

const TextProcessing = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Text Processing Studio</h1>
          <p className="text-xl text-muted-foreground">
            Transform your text with AI-powered tools. Convert text to speech, analyze resumes, generate content, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Long Book */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                  <Book className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">Content AI</Badge>
                  <p className="text-xs text-primary font-medium">95% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">Long Book</h3>
              <p className="text-sm text-primary mb-2">Generate comprehensive papers</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Generate a full-length book or research paper based on your prompt with AI-powered content creation.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Book Generation</Badge>
                  <Badge variant="outline" className="text-xs">Research Paper</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Text to Speech */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">Popular</Badge>
                  <p className="text-xs text-primary font-medium">94% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">Convert texts to voice</h3>
              <p className="text-sm text-primary mb-2">Natural voice synthesis</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Convert text into natural-sounding speech with customizable voices and multilingual support.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Text-to-Speech</Badge>
                  <Badge variant="outline" className="text-xs">Voice Synthesis</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Excel to Charts */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">Data Viz</Badge>
                  <p className="text-xs text-primary font-medium">92% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">Excel to Charts</h3>
              <p className="text-sm text-primary mb-2">Visualize spreadsheet data</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Transform Excel or CSV data into comprehensive audio summaries and visual charts.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Excel</Badge>
                  <Badge variant="outline" className="text-xs">CSV</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Summarize */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">AI Powered</Badge>
                  <p className="text-xs text-primary font-medium">97% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">Summarize</h3>
              <p className="text-sm text-primary mb-2">Intelligent text summarization</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Create concise, meaningful summaries of large text documents using advanced NLP technology.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Summarization</Badge>
                  <Badge variant="outline" className="text-xs">Text Analysis</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* ATS Score */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                  <FileCheck className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">Career Boost</Badge>
                  <p className="text-xs text-primary font-medium">96% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">ATS Score</h3>
              <p className="text-sm text-primary mb-2">Resume optimization scoring</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Evaluate resumes against job descriptions for ATS compatibility and provide detailed improvement suggestions.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">ATS</Badge>
                  <Badge variant="outline" className="text-xs">Resume Analysis</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Analyser */}
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs mb-1">Pro Tools</Badge>
                  <p className="text-xs text-primary font-medium">94% Success</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">Resume Analyser</h3>
              <p className="text-sm text-primary mb-2">Professional resume enhancement</p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Get tailored suggestions to improve your resume with industry-specific recommendations and best practices.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Resume Enhancement</Badge>
                  <Badge variant="outline" className="text-xs">Career</Badge>
                </div>
                <Button size="sm">Try Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextProcessing;
