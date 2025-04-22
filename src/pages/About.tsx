
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InfoIcon } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <InfoIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Founded in 2023, Vocal Verse AI Studio emerged from a vision to transform how we interact with digital content through voice technology.
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Leadership Team</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-medium mb-2">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">CEO & Co-founder</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-medium mb-2">Michael Chen</h3>
                <p className="text-sm text-muted-foreground">CTO & Co-founder</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
