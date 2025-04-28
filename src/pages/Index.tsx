import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { PricingCards } from "@/components/PricingCards";
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCasesSection } from "@/components/UseCasesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-yellow-300 text-black text-center py-1 flex items-center justify-center gap-2 text-sm">
        <span className="text-lg">🚧</span>
        <p className="font-semibold underline">
          App under construction: All functionalities are currently disabled. See you soon 😉
        </p>
      </div>




      <Navbar />
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <UseCasesSection />
      <PricingCards />
      <Footer />
    </div>
  );
};

export default Index;
