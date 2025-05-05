import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioUpload } from "@/components/AudioUpload";
import { TextInput } from "@/components/TextInput";
import { ExcelUpload } from "@/components/ExcelUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { Mic, FileText, Languages, Clapperboard, FileTextIcon, Book, FileCheck, ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const modelsRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (modelsRef.current && window.innerWidth >= 768) { // Only check scroll on md and above
      const { scrollLeft, scrollWidth, clientWidth } = modelsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };

  const scrollModels = (direction: "left" | "right") => {
    if (modelsRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      modelsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    const modelsContainer = modelsRef.current;
    if (modelsContainer) {
      modelsContainer.addEventListener("scroll", checkScroll);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      if (modelsContainer) {
        modelsContainer.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">VocalVerse Studio Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Process audio, text, and video with advanced AI technology. Select what you want to do!
        </p>

        {/* Top models including Resume Analyser, Long Book, Video Generation, ATS Score */}
        <div className="mb-6">
          <div className="mb-2 text-primary font-semibold text-xl">Check out top models</div>
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scrollModels("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-muted rounded-full shadow-sm hover:bg-muted/80 transition-colors sm:p-2 hidden md:block"
                aria-label="Scroll models left"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
            <div
              ref={modelsRef}
              className="flex flex-col md:flex-row md:flex-nowrap overflow-x-auto scrollbar-none gap-4 py-2"
            >
              {/* Resume Analyser */}
              <Card className="border-l-4 border-primary bg-secondary/40 min-w-0 w-full md:min-w-[250px] md:flex-1">
                <CardContent className="flex flex-col gap-2 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Resume Analyser</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Upload a PDF or Word resume to get AI-driven suggestions for improvement based on job descriptions.
                    <Link className="ml-2 underline text-primary font-medium" to="/text-processing">Try now →</Link>
                  </div>
                </CardContent>
              </Card>
              {/* Long Book Generation */}
              <Card className="border-l-4 border-primary bg-secondary/40 min-w-0 w-full md:min-w-[250px] md:flex-1">
                <CardContent className="flex flex-col gap-2 py-4">
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Long Book Generation</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Generate a complete book or research paper (PDF) from a single topic or prompt. Perfect for comprehensive course material or in-depth guides.
                    <Link className="ml-2 underline text-primary font-medium" to="/text-processing">Try now →</Link>
                  </div>
                </CardContent>
              </Card>
            {/* ATS Score */}
              <Card className="border-l-4 border-primary bg-secondary/40 min-w-0 w-full md:min-w-[250px] md:flex-1">
                <CardContent className="flex flex-col gap-2 py-4">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    <span className="font-semibold">ATS Score</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Upload a resume and job description to calculate an ATS compatibility score, helping optimize for job applications.
                    <Link className="ml-2 underline text-primary font-medium" to="/text-processing">Try now →</Link>
                  </div>
                </CardContent>
              </Card>
              {/* Video Generation */}
              <Card className="border-l-4 border-primary bg-secondary/40 min-w-0 w-full md:min-w-[250px] md:flex-1">
                <CardContent className="flex flex-col gap-2 py-4">
                  <div className="flex items-center gap-2">
                    <Clapperboard className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Video Generation</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Create short or long animated videos just by describing your scene. The best-in-class text-to-video AI with vibrant visuals.
                    <Link className="ml-2 underline text-primary font-medium" to="/video">Try now →</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            {canScrollRight && (
              <button
                onClick={() => scrollModels("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-muted rounded-full shadow-sm hover:bg-muted/80 transition-colors sm:p-2 hidden md:block"
                aria-label="Scroll models right"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
            <style>{`
              .scrollbar-none {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              }
              .scrollbar-none::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            `}</style>
          </div>
        </div>

        {/* Try other AI section title */}
        <div className="font-semibold text-lg mb-2">Try other AI as well</div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Mic className="h-5 w-5 mr-2 text-primary" />
                Audio Files
              </CardTitle>
              <CardDescription>Transform and translate your audio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                10 files processed this month
              </p>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                10/25 files (Pro Plan)
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Text-to-Speech
              </CardTitle>
              <CardDescription>Convert text to natural speech</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                30 minutes processed this month
              </p>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                30/50 minutes (Pro Plan)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clapperboard className="h-5 w-5 mr-2 text-primary" />
                Video Generation
              </CardTitle>
              <CardDescription>Generate animated video from a prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                0 videos generated this month
              </p>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                0/10 videos (Pro Plan)
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Languages className="h-5 w-5 mr-2 text-primary" />
                Language Support
              </CardTitle>
              <CardDescription>Available languages for conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All 20+ languages available
              </p>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                20/20 languages (Pro Plan)
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="audio">Audio Processing</TabsTrigger>
            <TabsTrigger value="text">Text to Speech</TabsTrigger>
            <TabsTrigger value="excel">Excel to Audio</TabsTrigger>
            <TabsTrigger value="video">Video Generation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audio Processing</CardTitle>
                <CardDescription>
                  Upload an audio file to translate, clone, or enhance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <AudioUpload onUpload={(file) => console.log(file)} />
                  </div>
                  <div className="space-y-4">
                    <LanguageSelector 
                      onChange={setTargetLanguage} 
                      label="Target Language" 
                      placeholder="Select target language..." 
                    />
                    <VoiceSelector 
                      onChange={setSelectedVoice} 
                      label="Voice Style" 
                      placeholder="Keep original or select new voice..." 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Text to Speech</CardTitle>
                <CardDescription>
                  Convert written text to natural-sounding audio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <TextInput onSubmit={(text) => console.log(text)} />
                  </div>
                  <div className="space-y-4">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="excel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Excel to Audio</CardTitle>
                <CardDescription>
                  Convert spreadsheet data to spoken audio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ExcelUpload onUpload={(file) => console.log(file)} />
                  </div>
                  <div className="space-y-4">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Generation</CardTitle>
                <CardDescription>
                  Describe your scene and generate an animated video with AI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-semibold">New!</span> Create short animated videos by providing a prompt.
                  </p>
                  <a href="/video">
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition font-semibold">
                      Go to Video Generation
                    </button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;