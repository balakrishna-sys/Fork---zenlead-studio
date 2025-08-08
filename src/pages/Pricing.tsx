import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
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
  Headphones,
  CreditCard,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createPaymentAPI, Plan, formatCurrency, loadRazorpay, getPublicFilteredPlans, checkEducationalDiscount, formatDiscount } from "@/lib/paymentApi";
import { emitPaymentSuccess } from "@/lib/events";
import { toast } from "sonner";

const Pricing = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  const paymentAPI = token ? createPaymentAPI(token) : null;

  // Load plans from API (public, no authentication required)
  useEffect(() => {
    loadPlans();
  }, [billingPeriod]);

  const loadPlans = async () => {
    try {
      const filteredData = await getPublicFilteredPlans({
        currency: 'INR',
        billing_cycle: billingPeriod,
        status: 'active'
      });
      setPlans(filteredData.plans);
    } catch (error: any) {
      console.error('Failed to load plans:', error);
      const errorMessage = error.message || 'Failed to load pricing plans';
      toast.error(errorMessage);
      // Provide fallback static plans if API fails
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (plan: Plan) => {
    if (!user) {
      toast.error('Please sign in to purchase a plan');
      navigate('/signin');
      return;
    }

    if (!paymentAPI) {
      toast.error('Payment service not available');
      return;
    }

    // Validate plan data
    if (!plan || !plan._id) {
      toast.error('Invalid plan selected. Please try again.');
      return;
    }

    if (!plan.price || plan.price <= 0) {
      toast.error('Invalid plan pricing. Please contact support.');
      return;
    }

    try {
      setProcessingPayment(plan._id);
      console.log('Starting payment process for plan:', {
        plan_id: plan._id,
        plan_name: plan.name,
        price: plan.price,
        currency: plan.currency
      });

      // Initiate payment with the backend
      console.log('Calling initiatePayment with plan._id:', plan._id);
      const paymentData = await paymentAPI.initiatePayment(plan._id);
      console.log('Payment initiation successful:', paymentData);

      // Show discount information if applicable
      if (paymentData.discount_applied > 0) {
        toast.success(`Great! You get ${paymentData.discount_applied}% discount!`);
        console.log('Discount applied:', paymentData.discount_applied + '%');
      }

      // Load Razorpay
      const Razorpay = await loadRazorpay();

      const options = {
        key: paymentData.razorpay_key,
        amount: Math.round(paymentData.amount * 100), // Convert to paise
        currency: paymentData.currency,
        name: 'Zenlead Studio',
        description: `${plan.name} Plan Subscription`,
        order_id: paymentData.razorpay_order_id,
        handler: async (response: any) => {
          try {
            setProcessingPayment(plan._id); // Keep showing processing state
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            // Emit payment success event to refresh user data globally
            emitPaymentSuccess({
              plan_name: plan.name,
              plan_id: plan._id,
              amount: paymentData.amount
            });

            toast.success(`Payment successful! Welcome to ${plan.name} plan! 🎉`);

            // Wait a moment before redirecting to show the success message
            setTimeout(() => {
              navigate('/billing');
            }, 1500);
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error(error.message || 'Payment verification failed. Please contact support.');
            setProcessingPayment(null);
          }
        },
        prefill: {
          name: user.name || user.email,
          email: user.email,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: () => {
            setProcessingPayment(null);
            toast.info('Payment cancelled');
          },
          escape: true,
          backdropclose: false
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 300, // 5 minutes timeout
        remember_customer: true
      };

      const razorpay = new Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      const errorMessage = error.message || 'Failed to initiate payment. Please try again.';
      toast.error(errorMessage);
      setProcessingPayment(null);
    }
  };

  const getPlanIcon = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('starter')) return Users;
    if (name.includes('professional')) return Zap;
    if (name.includes('enterprise')) return Shield;
    return Star;
  };

  const getPlanColor = (index: number) => {
    const colors = [
      { gradient: "from-blue-500 to-blue-600", bg: "bg-blue-500/10" },
      { gradient: "from-purple-500 to-purple-600", bg: "bg-purple-500/10" },
      { gradient: "from-orange-500 to-orange-600", bg: "bg-orange-500/10" }
    ];
    return colors[index % colors.length];
  };

  const formatPlanFeatures = (plan: Plan): string[] => {
    const features = [];

    // Since backend uses Dict[str, Any] for features, we need to safely access properties
    const f = plan.features || {};

    if (f.languages_supported) {
      features.push(`${f.languages_supported} languages supported`);
    }
    if (f.voice_clones) {
      features.push(`${f.voice_clones} voice clones`);
    }
    if (f.audio_processing_minutes) {
      features.push(`${f.audio_processing_minutes} minutes of audio processing`);
    }
    if (f.text_to_speech) {
      features.push(`${f.text_to_speech} text-to-speech`);
    }
    if (f.video_generation) {
      features.push(`Video generation (${f.video_generation})`);
    }
    if (f.support) {
      features.push(`${f.support} support`);
    }
    if (f.export_formats && Array.isArray(f.export_formats)) {
      features.push(`${f.export_formats.join(', ')} export`);
    }
    if (f.api_access) {
      features.push('API access');
    }

    // Add credits info as a feature
    features.push(`${plan.credits.toLocaleString()} credits included`);

    return features;
  };

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
            <Tabs value={billingPeriod} onValueChange={(value) => {
              setBillingPeriod(value as "monthly" | "yearly");
            }} className="relative">
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading pricing plans...</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No pricing plans available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const planColor = getPlanColor(index);
                const PlanIcon = getPlanIcon(plan.name);
                const features = formatPlanFeatures(plan);
                const isPopular = plan.features?.best_value || false;
                const isProcessing = processingPayment === plan._id;
                
                return (
                  <Card
                    key={plan._id}
                    className={`relative bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      isPopular 
                        ? 'border-primary/50 shadow-lg ring-2 ring-primary/20' 
                        : 'border-border/50 hover:border-primary/30'
                    } ${planColor.bg}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-6 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Best Value
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${planColor.gradient} text-white mx-auto mb-4`}>
                        <PlanIcon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-muted-foreground">{plan.description}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          {formatCurrency(plan.price, plan.currency)}
                        </span>
                        <span className="text-muted-foreground">
                          /{plan.billing_cycle}
                        </span>
                        {user && checkEducationalDiscount(user.email) && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              🎓 Educational discount available!
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {features.map((feature, featureIndex) => (
                          <div key={`${plan._id}-feature-${featureIndex}`} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {user ? (
                        <Button 
                          onClick={() => handlePurchase(plan)}
                          disabled={isProcessing}
                          className={`w-full h-12 ${
                            isPopular 
                              ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
                              : ''
                          }`}
                          variant={isPopular ? "default" : "outline"}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Subscribe Now
                            </>
                          )}
                        </Button>
                      ) : (
                        <Link to="/signin">
                          <Button 
                            className={`w-full h-12 ${
                              isPopular 
                                ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
                                : ''
                            }`}
                            variant={isPopular ? "default" : "outline"}
                          >
                            Sign In to Subscribe
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      
                      <div className="text-xs text-center text-muted-foreground space-y-1">
                        <p>{plan.features.free_trial_days}-day free trial • {plan.features.no_credit_card_required ? 'No credit card required' : 'Credit card required'}</p>
                        <p>{plan.credits.toLocaleString()} credits included</p>
                        {user && checkEducationalDiscount(user.email) && (
                          <p className="text-green-600 font-medium">Educational discount applies at checkout</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
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
              <Card key={`feature-comparison-${index}-${feature.title}`} className="text-center bg-card/50 backdrop-blur-sm border border-border/50">
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
              <Card key={`testimonial-${index}-${testimonial.name}`} className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`${testimonial.name}-star-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
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
              <AccordionItem key={`faq-${index}-${faq.question.substring(0, 20)}`} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6">
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
            {user ? (
              <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                View Plans Above
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/billing">
              <Button variant="outline" size="lg" className="h-12 px-8 bg-card/50 backdrop-blur-sm border-primary/20">
                View Billing
                <CreditCard className="ml-2 h-5 w-5" />
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
