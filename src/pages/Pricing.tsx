import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PricingCards } from "@/components/PricingCards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Sparkles, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  HeadphonesIcon, 
  MessageSquare,
  ArrowRight,
  Calculator,
  Globe,
  Headphones
} from "lucide-react";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: { monthly: 9, yearly: 89 },
      badge: "Most Popular",
      features: [
        "3 languages supported",
        "2 voice clones",
        "100 minutes of audio processing",
        "Basic text-to-speech",
        "Standard support",
        "MP3 & WAV export"
      ],
      limitations: [
        "No video generation",
        "No priority processing"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Professional",
      description: "Ideal for content creators and businesses",
      price: { monthly: 29, yearly: 290 },
      badge: "Best Value",
      features: [
        "20+ languages supported",
        "10 voice clones",
        "500 minutes of audio processing",
        "Advanced text-to-speech",
        "Video generation (10 videos/month)",
        "Priority support",
        "All export formats",
        "Custom voice training",
        "API access"
      ],
      limitations: [],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large teams and organizations",
      price: { monthly: 99, yearly: 990 },
      badge: "Advanced",
      features: [
        "50+ languages & dialects",
        "Unlimited voice clones",
        "Unlimited audio processing",
        "Premium text-to-speech",
        "Unlimited video generation",
        "24/7 dedicated support",
        "White-label solutions",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee"
      ],
      limitations: [],
      color: "from-gold-500 to-orange-600",
      bgColor: "bg-orange-500/10"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the voice translation?",
      answer: "Our advanced AI models achieve 95%+ accuracy for most common languages. Quality depends on the clarity of the original audio, but even with challenging inputs, our system maintains high accuracy levels."
    },
    {
      question: "How many languages do you support?",
      answer: "The Starter plan supports 3 languages (English, Spanish, French), while the Professional plan supports 20+ languages including German, Italian, Japanese, Chinese, and many more. The Enterprise plan covers 50+ languages and dialects."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. We don't offer refunds for partial months, but you can downgrade or upgrade as needed."
    },
    {
      question: "How does voice cloning work?",
      answer: "Our AI analyzes the unique characteristics of a voice from a provided sample (minimum 30 seconds recommended). It then creates a digital model that can speak new content in that voice. The Starter plan offers 2 voice clones, Professional offers 10, and Enterprise offers unlimited clones."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security very seriously. All audio files and text are encrypted during transit and storage. We don't share your data with third parties. Enterprise customers can request data deletion after processing and get SOC 2 compliance."
    },
    {
      question: "What file formats do you support?",
      answer: "For audio, we support MP3, WAV, M4A, FLAC, and OGG formats. For spreadsheets, we support XLSX, XLS, and CSV formats. All output audio can be downloaded in either MP3, WAV, or FLAC format depending on your plan."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes! Enterprise customers get access to custom integrations, white-label solutions, dedicated support, and can work with our team to build custom features for their specific use cases."
    },
    {
      question: "How does the free trial work?",
      answer: "All new users get a 7-day free trial with full access to Professional plan features. No credit card required. You can explore all our AI models and see the quality of results before committing to a plan."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      company: "Digital Marketing Agency",
      content: "Zenlead Studio transformed how we create multilingual content. The voice cloning feature is incredible - it sounds exactly like our brand voice in 15+ languages!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Tech Startup",
      content: "The video generation saved us thousands in production costs. We can now create product demos in minutes instead of weeks.",
      rating: 5
    },
    {
      name: "Dr. Emma Thompson",
      role: "Researcher",
      company: "University",
      content: "Perfect for creating accessible content. The text-to-speech quality is outstanding, and students love the multilingual support.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      {/* Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 bg-card/50 backdrop-blur-sm border-primary/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Journey
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-8 text-muted-foreground mb-8">
            Start free, upgrade when you need more. All plans include our core AI features 
            with transparent pricing and no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")} className="relative">
              <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative">
                  Yearly
                  <Badge className="absolute -top-8 -right-2 bg-green-500 text-white text-xs">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  plan.popular 
                    ? 'border-primary/50 shadow-lg ring-2 ring-primary/20' 
                    : 'border-border/50 hover:border-primary/30'
                } ${plan.bgColor}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-6 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mx-auto mb-4`}>
                    {index === 0 && <Users className="h-6 w-6" />}
                    {index === 1 && <Zap className="h-6 w-6" />}
                    {index === 2 && <Shield className="h-6 w-6" />}
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                    {billingPeriod === "yearly" && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(plan.price.monthly * 12) - plan.price.yearly} annually
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/signup">
                    <Button 
                      className={`w-full h-12 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
                          : ''
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    7-day free trial • No credit card required
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground">See exactly what's included in each plan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HeadphonesIcon, title: "Audio Processing", description: "High-quality voice translation and enhancement" },
              { icon: MessageSquare, title: "Text-to-Speech", description: "Natural voice synthesis in multiple languages" },
              { icon: Headphones, title: "Voice Cloning", description: "Create digital replicas of any voice" },
              { icon: Calculator, title: "Document Analysis", description: "Resume optimization and ATS scoring" }
            ].map((feature, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by creators worldwide</h2>
            <p className="text-muted-foreground">See what our customers are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find answers to common questions about Zenlead Studio and our services.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your content with AI?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
            Join thousands of creators, businesses, and professionals who trust Zenlead Studio 
            for their AI-powered content needs. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/signup">
              <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline" size="lg" className="h-12 px-8 bg-card/50 backdrop-blur-sm border-primary/20">
                View Demo
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
