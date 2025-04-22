
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <PhoneCallIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md h-32"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">support@vocalverse.ai</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
