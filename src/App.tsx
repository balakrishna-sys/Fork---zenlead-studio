
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AudioProcessing from "./pages/AudioProcessing";
import TextProcessing from "./pages/TextProcessing";
import VideoProcessing from "./pages/VideoProcessing";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check for system dark mode preference if no theme is set
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/audio" element={<AudioProcessing />} />
            <Route path="/text" element={<TextProcessing />} />
            <Route path="/video" element={<VideoProcessing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/library" element={<Library />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
