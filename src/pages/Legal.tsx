
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GavelIcon } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <GavelIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Legal Information</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Legal Overview</h2>
            <p className="text-muted-foreground mb-6">
              Find all the legal information about our services, including terms of service, privacy policy, and more.
            </p>
            <div className="grid gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Terms of Service</h3>
                <p className="text-muted-foreground">Details about using our services.</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Privacy Policy</h3>
                <p className="text-muted-foreground">How we handle and protect your data.</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Cookie Policy</h3>
                <p className="text-muted-foreground">Information about our use of cookies.</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">GDPR Compliance</h3>
                <p className="text-muted-foreground">Our commitment to data protection.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
