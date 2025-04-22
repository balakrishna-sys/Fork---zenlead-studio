
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Upload Your Content",
      description: "Upload audio files, enter text, import Excel spreadsheets, or describe your video scenario.",
    },
    {
      step: "02",
      title: "Configure Options",
      description: "Select your output type: audio, text, or video with various customization options.",
    },
    {
      step: "03",
      title: "Download Results",
      description: "Receive high-quality audio, text, or animated video output in your preferred format.",
    }
  ];

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Transform your <strong>audio, text, and video</strong> in three simple steps
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-14 left-12 right-12 h-0.5 bg-gradient-to-r from-purple-400 via-primary to-accent hidden lg:block"></div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="flex items-center justify-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold z-10">
                    {item.step}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300 mx-auto max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link to="/app">
            <Button className="flex items-center bg-primary hover:bg-primary/90">
              Try The Studio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
