
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldIcon } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <ShieldIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-12">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>
          <section className="mb-12">
            <h2>Information We Collect</h2>
            <ul>
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Voice data and recordings</li>
              <li>Usage data and analytics</li>
              <li>Technical information about your device and connection</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
