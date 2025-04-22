
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GavelIcon } from "lucide-react";

const GDPR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <GavelIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">GDPR Compliance</h1>
        </div>
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-12">
            <h2>Your Rights Under GDPR</h2>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectification</li>
              <li>The right to erasure</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2>How We Protect Your Data</h2>
            <p>
              We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
            </p>
            <ul>
              <li>Encryption of personal data</li>
              <li>Regular security assessments</li>
              <li>Staff training on data protection</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2>Data Processing Agreement</h2>
            <p>
              Our Data Processing Agreement outlines our commitment to protecting your data in accordance with GDPR requirements.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;
