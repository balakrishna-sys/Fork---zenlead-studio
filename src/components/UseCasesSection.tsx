import { CheckCircle2 } from "lucide-react";

export const UseCasesSection = () => {
  const useCases = [
    {
      title: "Content Creators",
      description: "Translate audio to reach global audiences, clone your voice for branding, and turn scripts into professional audio or animated videos.",
      benefits: [
        "Reach audiences in multiple languages",
        "Ensure consistent voice identity",
        "Save time with automated audio",
        "Create videos from text descriptions"
      ]
    },
    {
      title: "Educators & Trainers",
      description: "Convert texts to audio for accessibility, analyze resumes for training, and create multilingual videos or narrated course materials.",
      benefits: [
        "Enhance content accessibility",
        "Support multilingual learners",
        "Turn notes into audio narration",
        "Generate videos for teaching"
      ]
    },
    {
      title: "Businesses",
      description: "Generate professional audio for reports, optimize resumes for hiring, and create branded videos with AI-driven voice and visuals.",
      benefits: [
        "Narrate reports with AI audio",
        "Streamline resume screening",
        "Produce consistent video content"
      ]
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-muted/30 to-background dark:from-gray-800 dark:to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Trusted by creators, educators, and businesses for AI{" "}
            <span className="relative inline-block">
              Magic
              <span className="absolute inset-0 w-1/5 h-full bg-gradient-to-r from-transparent via-blue-500/70 to-purple-500/70 animate-slide-line transform -skew-x-[30deg] z-[-1]"></span>
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Zenlead empowers users to transform <span className="font-semibold text-primary">audio, text, and video</span> with cutting-edge AI technology.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex flex-col rounded-2xl border bg-card/80 p-8 hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{useCase.title}</h3>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-6 flex-grow">{useCase.description}</p>
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};