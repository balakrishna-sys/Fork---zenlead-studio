import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { PricingCards } from "@/components/PricingCards";
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCasesSection } from "@/components/UseCasesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
