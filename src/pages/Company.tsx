
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BriefcaseIcon } from "lucide-react";

const Company = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <BriefcaseIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Company</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              To revolutionize digital communication through innovative AI voice technology, making content more accessible and engaging for everyone.
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground mb-6">
              To be the global leader in AI-powered voice solutions, enabling seamless communication across languages and platforms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-2">Innovation</h3>
                <p className="text-muted-foreground">Pushing the boundaries of what's possible with AI voice technology.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                <p className="text-muted-foreground">Making voice technology available to everyone.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Company;
