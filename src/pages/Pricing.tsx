
import { Navbar } from "@/components/Navbar";
import { PricingCards } from "@/components/PricingCards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Pricing = () => {
  const faqs = [
    {
      question: "How accurate is the voice translation?",
      answer: "Our advanced AI models achieve 95%+ accuracy for most common languages. Quality depends on the clarity of the original audio, but even with challenging inputs, our system maintains high accuracy levels."
    },
    {
      question: "How many languages do you support?",
      answer: "The Basic plan supports 3 languages (English, Spanish, French), while the Pro plan supports 20+ languages including German, Italian, Japanese, Chinese, and many more. The Enterprise plan covers 50+ languages and dialects."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. We don't offer refunds for partial months."
    },
    {
      question: "How does voice cloning work?",
      answer: "Our AI analyzes the unique characteristics of a voice from a provided sample (minimum 30 seconds recommended). It then creates a digital model that can speak new content in that voice. The Basic plan offers 2 voice clones, Pro offers 10, and Enterprise offers unlimited clones."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security very seriously. All audio files and text are encrypted during transit and storage. We don't share your data with third parties. Enterprise customers can request data deletion after processing."
    },
    {
      question: "What file formats do you support?",
      answer: "For audio, we support MP3, WAV, M4A, and OGG formats. For spreadsheets, we support XLSX, XLS, and CSV formats. All output audio can be downloaded in either MP3 or WAV format."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PricingCards />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to common questions about VocalVerse and our services.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to transform your audio and text?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 mb-10">
            Start your 7-day free trial today. No credit card required.
          </p>
          <button className="rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
