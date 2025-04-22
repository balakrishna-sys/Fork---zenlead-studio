
import { CheckCircle2 } from "lucide-react";

export const UseCasesSection = () => {
  const useCases = [
    {
      title: "Content Creators",
      description: "Create narration in multiple languages, clone your voice for consistent branding, and convert scripts to professional audio and video.",
      benefits: [
        "Expand global audience reach",
        "Maintain voice consistency",
        "Save time on recording sessions",
        "Generate animated videos from descriptions"
      ]
    },
    {
      title: "Educators & Trainers",
      description: "Transform learning materials into engaging audio, text, and animated video resources; create accessible content; and develop multilingual courses.",
      benefits: [
        "Improve accessibility",
        "Create multilingual materials",
        "Convert lecture notes to audio",
        "Generate educational videos from text"
      ]
    },
    {
      title: "Businesses",
      description: "Produce professional voice and video content for presentations, convert data reports to speech, and create consistent brand voice assets.",
      benefits: [
        "Professional voice & video for presentations",
        "Automated report narration",
        "Consistent brand voice across media"
      ]
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-muted/30 to-background dark:from-gray-800 dark:to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Trusted by creators, educators, and businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            VocalVerse Studio empowers users to unlock new possibilities with AI <span className="font-semibold text-primary">voice, text, and video</span> technology.
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
