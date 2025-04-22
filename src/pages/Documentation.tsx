
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileTextIcon } from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <FileTextIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Documentation</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Getting Started</h3>
              <p className="text-muted-foreground mb-4">
                Learn the basics of Vocal Verse AI Studio and how to set up your first project.
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">API Reference</h3>
              <p className="text-muted-foreground mb-4">
                Complete API documentation with examples and use cases.
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Step-by-step guides for common use cases and advanced features.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
