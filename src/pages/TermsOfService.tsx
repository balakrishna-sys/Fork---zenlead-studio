
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GavelIcon } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <GavelIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-12">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing our service, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>
          <section className="mb-12">
            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily use our service for personal, non-commercial use only.
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Transfer the materials to another person</li>
              <li>Attempt to reverse engineer any software contained in our service</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2>Disclaimer</h2>
            <p>
              Our service is provided "as is". We make no warranties, expressed or implied, and hereby disclaim all warranties.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
