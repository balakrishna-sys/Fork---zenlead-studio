
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BriefcaseIcon } from "lucide-react";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <BriefcaseIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Case Studies</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Enterprise Voice Transformation</h3>
              <p className="text-muted-foreground mb-4">
                How a Fortune 500 company improved their customer service using our AI voice technology.
              </p>
              <p className="text-sm text-muted-foreground">Results: 40% reduction in response time</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Educational Content Localization</h3>
              <p className="text-muted-foreground mb-4">
                A leading online learning platform used our technology to translate courses into 12 languages.
              </p>
              <p className="text-sm text-muted-foreground">Results: 300% increase in global reach</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Podcast Accessibility Initiative</h3>
              <p className="text-muted-foreground mb-4">
                How a media company made their content accessible to hearing-impaired audiences.
              </p>
              <p className="text-sm text-muted-foreground">Results: 25K new listeners reached</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
