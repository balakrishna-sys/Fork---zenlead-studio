import { Languages, Mic, File, BarChart3, Video, Book, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FeatureSection = () => {
  const features = [
    {
      name: "Language Translation",
      description: "Translate audio across languages while preserving the original voice's emotion and style for seamless global communication.",
      icon: Languages,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      link: "/audio",
      badge: "Popular",
      stats: "20+ Languages"
    },
    {
      name: "Text to Speech",
      description: "Turn text into lifelike speech with customizable voices, perfect for presentations, audiobooks, or accessibility.",
      icon: Mic,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      link: "/text",
      badge: "AI Powered",
      stats: "Natural Voices"
    },
    {
      name: "Resume Analyzer",
      description: "Optimize your resume with AI-driven insights to highlight strengths and improve your job application success.",
      icon: File,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      link: "/text",
      badge: "Career Boost",
      stats: "95% Success Rate"
    },
    {
      name: "ATS Score",
      description: "Boost your resume's compatibility with Applicant Tracking Systems to increase your chances of getting hired.",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      link: "/text",
      badge: "Job Ready",
      stats: "Instant Results"
    },
    {
      name: "Video Generation",
      description: "Create animated videos from text descriptions, bringing your ideas to life with AI in minutes.",
      icon: Video,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10",
      link: "/video",
      badge: "New",
      stats: "HD Quality"
    },
    {
      name: "Long Book Generation",
      description: "Generate comprehensive books or research papers from simple prompts, perfect for educational content.",
      icon: Book,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-500/10",
      link: "/text",
      badge: "Content AI",
      stats: "Full Length"
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 bg-card/50 backdrop-blur-sm border-primary/20">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            Powerful AI Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Everything You Need for
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI-Powered Productivity
            </span>
          </h2>
          <p className="text-xl leading-8 text-muted-foreground">
            Our advanced AI technology powers a comprehensive suite of voice, text, and video transformation tools 
            designed to supercharge your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.name} 
              className={`group relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 ${feature.bgColor}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-sm font-medium text-primary">
                    {feature.stats}
                  </span>
                  <Link to={feature.link}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                    >
                      Try Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals who are already using Zenlead Studio to boost their productivity.
            </p>
            <Link to="/app">
              <Button size="lg" className="h-12 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
