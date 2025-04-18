
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AudioUpload } from "@/components/AudioUpload";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceSelector } from "@/components/VoiceSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Languages, Headphones, Wand2 } from "lucide-react";

const AudioProcessing = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessAudio = () => {
    if (!audioFile) return;
    setIsProcessing(true);
    
    // Mock processing - would connect to API in real implementation
    setTimeout(() => {
      setIsProcessing(false);
      // Show success state or results
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Audio Processing</h1>
        <p className="text-gray-600 mb-8">Transform your audio with AI technology</p>
        
        <Tabs defaultValue="translate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="translate" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>Translate</span>
            </TabsTrigger>
            <TabsTrigger value="clone" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>Voice Clone</span>
            </TabsTrigger>
            <TabsTrigger value="enhance" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              <span>Enhance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="translate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Source Audio</CardTitle>
                  <CardDescription>
                    Upload the audio file you want to translate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AudioUpload 
                    onUpload={setAudioFile} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Translation Settings</CardTitle>
                  <CardDescription>
                    Select the target language and voice options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessAudio}
                      disabled={!audioFile || !targetLanguage || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Translate Audio"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Processing typically takes 30-60 seconds depending on audio length.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clone" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Sample</CardTitle>
                  <CardDescription>
                    Upload a clear audio sample of the voice to clone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AudioUpload 
                    onUpload={setAudioFile} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Best results require at least 30 seconds of clear speech.
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cloning Settings</CardTitle>
                  <CardDescription>
                    Configure your voice cloning options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LanguageSelector 
                    onChange={setTargetLanguage} 
                    label="Target Language" 
                    placeholder="Same as source or select new..." 
                  />
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessAudio}
                      disabled={!audioFile || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Create Voice Clone"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Voice cloning requires additional processing time (2-3 minutes).
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="enhance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Source Audio</CardTitle>
                  <CardDescription>
                    Upload the audio file you want to enhance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AudioUpload 
                    onUpload={setAudioFile} 
                    isLoading={isProcessing} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Enhancement Options</CardTitle>
                  <CardDescription>
                    Choose how to improve your audio quality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="noise-reduction" className="form-checkbox h-4 w-4 text-primary" />
                      <label htmlFor="noise-reduction" className="text-sm">Noise Reduction</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="clarity" className="form-checkbox h-4 w-4 text-primary" />
                      <label htmlFor="clarity" className="text-sm">Increase Clarity</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="bass" className="form-checkbox h-4 w-4 text-primary" />
                      <label htmlFor="bass" className="text-sm">Enhance Bass</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="volume" className="form-checkbox h-4 w-4 text-primary" />
                      <label htmlFor="volume" className="text-sm">Normalize Volume</label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={handleProcessAudio}
                      disabled={!audioFile || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Enhance Audio"} 
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Audio enhancement preserves the original content while improving quality.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AudioProcessing;
