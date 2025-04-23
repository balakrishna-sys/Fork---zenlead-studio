import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { TextInput } from "@/components/TextInput";
import { ExcelUpload } from "@/components/ExcelUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, FileSpreadsheet, FileDigit, Book } from "lucide-react";

const exampleBookContent = (prompt: string) => [
  { heading: "Title", content: `AI-Generated Book: ${prompt}` },
  { heading: "Chapter 1: Introduction", content: "This is a generated introduction about your chosen topic, laying the foundation for the rest of the book." },
  { heading: "Chapter 2: Deep Dive", content: "In this chapter, we'll explore the main concepts of your topic in great detail, with examples and explanations." },
  { heading: "Chapter 3: Case Studies", content: "Here, real-world examples and research findings are shared to deepen your understanding." },
  { heading: "Conclusion", content: "A summary of the book and final insights are presented here." },
];

const TextProcessing = () => {
  const [text, setText] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [bookPrompt, setBookPrompt] = useState("");
  const [bookContent, setBookContent] = useState<{heading: string, content: string}[]|null>(null);
  const [isBookLoading, setIsBookLoading] = useState(false);

  const handleProcessText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const handleGenerateBook = () => {
    setIsBookLoading(true);
    setBookContent(null);
    setTimeout(() => {
      setBookContent(exampleBookContent(bookPrompt));
      setIsBookLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Text Processing</h1>
        <p className="text-gray-600 mb-8">Convert your text to natural-sounding speech</p>
        
        <div className="mb-8">
          <Card className="border-l-4 border-primary bg-secondary/40">
            <CardContent className="flex flex-col md:flex-row gap-4 py-4">
              <div className="flex items-center gap-2">
                <Book className="h-7 w-7 text-primary" />
                <span className="font-semibold text-lg">Long Book Generation</span>
              </div>
              <div className="text-muted-foreground text-sm flex-1">
                Instantly generate a complete book or research paper (as a downloadable PDF) from a single prompt—ideal for AI courses, full stack learning paths, or any topic you want. Go beyond chatbots—get book-length, ready-to-use content for education, research, or publishing. <Link to="/text-processing#long-book" className="ml-2 underline text-primary font-medium">Try now &rarr;</Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="text-to-speech" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
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
            <TabsTrigger value="long-book" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Long Book (AI Model)</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="long-book" className="space-y-6" id="long-book">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Prompt</CardTitle>
                  <CardDescription>
                    Enter a topic, course, or subject. The model will generate a full book or research paper!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full border rounded-md p-3 min-h-[100px] resize-none"
                    placeholder="e.g. Advanced AI Course, Full Stack Web Development, Quantum Computing…"
                    value={bookPrompt}
                    onChange={(e) => setBookPrompt(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleGenerateBook} disabled={!bookPrompt.trim() || isBookLoading} className="w-full">
                      {isBookLoading ? "Generating Book..." : "Generate Book"}
                      {!isBookLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  You will get a full-length, structured book—great for learning, research, or publishing as a PDF.
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Generated Book</CardTitle>
                  <CardDescription>
                    The generated content will appear here in a readable, scrollable document style.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[400px] overflow-y-auto border bg-background rounded-md px-4 py-3 shadow-inner">
                    {isBookLoading && (
                      <div className="text-center text-muted-foreground py-12">Generating book, please wait...</div>
                    )}
                    {!isBookLoading && bookContent && (
                      <div className="space-y-6">
                        {bookContent.map((sec, idx) => (
                          <section key={idx}>
                            <h3 className="font-bold text-lg mb-2">{sec.heading}</h3>
                            <p className="text-base text-gray-700 whitespace-pre-wrap">{sec.content}</p>
                          </section>
                        ))}
                      </div>
                    )}
                    {!isBookLoading && !bookContent && (
                      <div className="text-muted-foreground text-sm text-center py-10">
                        No book generated yet. Enter a prompt and start!
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end space-x-2 pt-2">
                  <Button variant="outline" disabled={!bookContent} className="text-xs px-3 py-1">
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="text-to-speech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Text</CardTitle>
                  <CardDescription>
                    Enter the text you want to convert to speech
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextInput 
                    onSubmit={setText} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Voice Settings</CardTitle>
                  <CardDescription>
                    Select language and voice for your audio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LanguageSelector 
                    onChange={setTargetLanguage} 
                    label="Content Language" 
                    placeholder="Select content language..." 
                  />
                  <VoiceSelector 
                    onChange={setSelectedVoice} 
                    label="Voice" 
                    placeholder="Select voice..." 
                  />
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessText}
                      disabled={!text || !targetLanguage || !selectedVoice || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Converting..." : "Convert to Speech"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Processed audio can be downloaded as MP3 or WAV format.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="excel-to-speech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Excel</CardTitle>
                  <CardDescription>
                    Upload your Excel or CSV file with text to convert
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExcelUpload 
                    onUpload={setExcelFile} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  First column should contain the text to be converted.
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Settings</CardTitle>
                  <CardDescription>
                    Configure how your spreadsheet data will be spoken
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LanguageSelector 
                    onChange={setTargetLanguage} 
                    label="Content Language" 
                    placeholder="Select content language..." 
                  />
                  <VoiceSelector 
                    onChange={setSelectedVoice} 
                    label="Voice" 
                    placeholder="Select voice..." 
                  />
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessText}
                      disabled={!excelFile || !targetLanguage || !selectedVoice || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Converting..." : "Convert to Speech"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Multiple rows will be processed as separate audio files.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="summarize" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Content</CardTitle>
                  <CardDescription>
                    Enter the text you want to summarize
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextInput 
                    onSubmit={setText} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Summarization Options</CardTitle>
                  <CardDescription>
                    Choose how to summarize your content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Summary Length</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="short">Short (1-2 paragraphs)</option>
                        <option value="medium">Medium (3-4 paragraphs)</option>
                        <option value="long">Long (5+ paragraphs)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Summary Style</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="concise">Concise</option>
                        <option value="detailed">Detailed</option>
                        <option value="bullet">Bullet Points</option>
                      </select>
                    </div>
                    
                    <LanguageSelector 
                      onChange={setTargetLanguage} 
                      label="Output Language" 
                      placeholder="Same as input or select new..." 
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessText}
                      disabled={!text || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Summarizing..." : "Generate Summary"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Summaries can also be converted to audio after generation.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TextProcessing;
