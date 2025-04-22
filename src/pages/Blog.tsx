
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpenIcon } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <BookOpenIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Blog</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">The Future of AI Voice Technology</h2>
              <p className="text-sm text-muted-foreground mb-4">March 15, 2024</p>
              <p className="text-muted-foreground">
                Exploring upcoming trends in AI voice synthesis and their impact on various industries.
              </p>
            </div>
          </article>
          <article className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Voice Cloning Ethics</h2>
              <p className="text-sm text-muted-foreground mb-4">March 10, 2024</p>
              <p className="text-muted-foreground">
                Understanding the ethical implications of voice cloning technology.
              </p>
            </div>
          </article>
          <article className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Multilingual Content Creation</h2>
              <p className="text-sm text-muted-foreground mb-4">March 5, 2024</p>
              <p className="text-muted-foreground">
                How AI is breaking down language barriers in content creation.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
