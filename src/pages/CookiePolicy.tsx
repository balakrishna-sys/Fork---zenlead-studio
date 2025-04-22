
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieIcon } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <CookieIcon className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
        </div>
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-12">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer by websites that you visit.
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>
          <section className="mb-12">
            <h2>How We Use Cookies</h2>
            <ul>
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand how visitors use our website</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies to help us improve our service</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2>Managing Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
