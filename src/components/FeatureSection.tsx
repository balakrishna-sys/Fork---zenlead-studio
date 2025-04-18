
import { ArrowUpDown, Mic, File, Headphones, Languages, FileText, BarChart3 } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      name: "Language Translation",
      description: "Convert your audio files to different languages while preserving the original voice style and emotion.",
      icon: Languages,
    },
    {
      name: "Voice Cloning",
      description: "Create a digital twin of any voice with just a short audio sample. Perfect for content creators.",
      icon: Headphones,
    },
    {
      name: "Text to Speech",
      description: "Convert your written text to natural-sounding speech with customizable voices and speaking styles.",
      icon: Mic,
    },
    {
      name: "Excel to Audio",
      description: "Turn spreadsheet data into spoken content. Perfect for data presentations and accessibility.",
      icon: File,
    },
    {
      name: "Text Summarization",
      description: "Extract the most important information from documents and create concise audio summaries.",
      icon: FileText,
    },
    {
      name: "Analytics & Reports",
      description: "Track your usage and optimize your content with detailed analytics on all your conversions.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful AI Voice Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our advanced AI technology powers a suite of voice and text transformation tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative border border-border bg-card/80 p-8 rounded-2xl transition-all hover:shadow-md">
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900 pt-2">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
