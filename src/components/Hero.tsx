import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Play, ArrowRight, Star, Users, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradients and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10"></div>
      <div className="absolute inset-0 bg-[url('/waveform-pattern.svg')] bg-center opacity-5"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-card/50 backdrop-blur-sm border-primary/20">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              New: Advanced AI Voice Technology
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 lg:mb-8">
            <span className="block bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Zenlead Studio
            </span>
            <span className="block text-foreground mt-2 lg:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              AI Technologies as
              <span className="bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent"> Magic</span>
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">
            Supercharge your work with cutting-edge AI. Seamlessly translate audio, create stunning videos, 
            summarize content, and optimize your resume to skyrocket your career.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-8 lg:mt-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span>Lightning fast processing</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link to="/app" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold rounded-xl bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
            >
              <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Feature cards */}
          <div className="mx-auto mt-12 lg:mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 px-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="mx-auto h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-2 lg:p-3 mb-3 lg:mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">Audio Translation</h3>
                <p className="mt-2 text-xs lg:text-sm text-muted-foreground">Real-time voice translation across 20+ languages</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="mx-auto h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-2 lg:p-3 mb-3 lg:mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">Video Generation</h3>
                <p className="mt-2 text-xs lg:text-sm text-muted-foreground">Create stunning videos from text descriptions</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="mx-auto h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2 lg:p-3 mb-3 lg:mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504-1.125 1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">Smart Documents</h3>
                <p className="mt-2 text-xs lg:text-sm text-muted-foreground">AI-powered resume analysis and optimization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};
