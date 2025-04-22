
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BriefcaseIcon } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <BriefcaseIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Careers</h1>
        </div>
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
            <div className="space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Senior AI Engineer</h3>
                <p className="text-muted-foreground mb-4">
                  Join our team to develop cutting-edge AI voice technology solutions.
                </p>
                <p className="text-sm text-muted-foreground">Location: Remote</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Product Manager</h3>
                <p className="text-muted-foreground mb-4">
                  Shape the future of our voice technology products.
                </p>
                <p className="text-sm text-muted-foreground">Location: San Francisco, CA</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">UX Designer</h3>
                <p className="text-muted-foreground mb-4">
                  Create intuitive and engaging user experiences for our platform.
                </p>
                <p className="text-sm text-muted-foreground">Location: Remote</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
