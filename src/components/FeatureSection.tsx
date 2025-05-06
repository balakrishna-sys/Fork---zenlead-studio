import { ArrowUpDown, Mic, File, Languages, BarChart3, Video, Book } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      name: "Language Translation",
      description: "Translate audio across languages while preserving the original voice's emotion and style for seamless global communication.",
      icon: Languages,
    },
    {
      name: "Text to Speech",
      description: "Turn text into lifelike speech with customizable voices, perfect for presentations, audiobooks, or accessibility.",
      icon: Mic,
    },
    {
      name: "Resume Analyzer",
      description: "Optimize your resume with AI-driven insights to highlight strengths and improve your job application success.",
      icon: File,
    },
    {
      name: "ATS Score",
      description: "Boost your resume’s compatibility with Applicant Tracking Systems to increase your chances of getting hired.",
      icon: BarChart3,
    },
    {
      name: "Video Generation",
      description: "Create animated videos from text descriptions, bringing your ideas to life with AI in minutes.",
      icon: Video,
    },
    {
      name: "Long Book Generation",
      description: "Summarize or generate concise audio versions of long books, making complex content accessible and engaging.",
      icon: Book,
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-gray-800/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Powerful AI Voice Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our advanced AI technology powers a suite of voice, text, and video transformation tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative border border-border bg-card/80 p-8 rounded-2xl transition-all hover:shadow-md">
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900 dark:text-gray-100 pt-2">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
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