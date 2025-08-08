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
  AlertCircle,
  Crown,
  Rocket,
  Award,
  TrendingUp,
  Infinity,
  CheckCircle2
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
      { 
        gradient: "from-blue-500 via-purple-500 to-indigo-600", 
        bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
        border: "border-blue-200 dark:border-blue-800",
        icon: "bg-gradient-to-r from-blue-500 to-indigo-600"
      },
      { 
        gradient: "from-purple-500 via-pink-500 to-rose-600", 
        bg: "bg-gradient-to-br from-purple-50 to-rose-50 dark:from-purple-950/20 dark:to-rose-950/20",
        border: "border-purple-200 dark:border-purple-800",
        icon: "bg-gradient-to-r from-purple-500 to-rose-600"
      },
      { 
        gradient: "from-orange-500 via-red-500 to-pink-600", 
        bg: "bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20",
        border: "border-orange-200 dark:border-orange-800",
        icon: "bg-gradient-to-r from-orange-500 to-pink-600"
      }
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
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Tech Startup",
      content: "The video generation saved us thousands in production costs. We can now create product demos in minutes instead of weeks.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emma Thompson",
      role: "Researcher",
      company: "University",
      content: "Perfect for creating accessible content. The text-to-speech quality is outstanding, and students love the multilingual support.",
      rating: 5,
      avatar: "ET"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Transparent Pricing • No Hidden Fees
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Journey
            </span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-xl md:text-2xl leading-8 text-gray-600 dark:text-gray-300 mb-12">
            Transform your content with cutting-edge AI technology. Start free, scale as you grow, 
            and unlock the power of multilingual voice synthesis.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-20">
            <div className="relative">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-200 dark:border-gray-700 shadow-xl">
                <Tabs value={billingPeriod} onValueChange={(value) => {
                  setBillingPeriod(value as "monthly" | "yearly");
                }}>
                  <TabsList className="bg-transparent border-0 p-0 h-auto space-x-2">
                    <TabsTrigger
                      value="monthly"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[140px]"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="yearly"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[140px] relative"
                    >
                      Yearly
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {/* Savings badge positioned outside the toggle */}
              <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm px-3 py-1.5 rounded-full shadow-lg animate-pulse font-medium">
                Save 25%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Pricing Plans</h3>
                <p className="text-gray-600 dark:text-gray-400">Fetching the latest pricing information...</p>
              </div>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-24">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Plans Available</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Pricing plans are currently unavailable. Please try again later.</p>
              <Button onClick={() => loadPlans()} variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Retry Loading
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const planColor = getPlanColor(index);
                const PlanIcon = getPlanIcon(plan.name);
                const features = formatPlanFeatures(plan);
                const isPopular = plan.features?.best_value || index === 1;
                const isProcessing = processingPayment === plan._id;

                return (
                  <Card
                    key={plan._id}
                    className={`relative ${planColor.bg} ${planColor.border} border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden group min-h-[800px] flex flex-col ${
                      isPopular
                        ? 'shadow-2xl lg:scale-105 ring-4 ring-purple-500/20 lg:-mt-8'
                        : 'shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 py-2.5 text-sm font-bold shadow-lg whitespace-nowrap">
                          <Crown className="h-4 w-4 mr-2" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/50 dark:to-transparent pointer-events-none"></div>

                    <CardHeader className={`text-center relative z-10 flex-shrink-0 ${isPopular ? 'pt-12' : 'pt-8'} pb-6`}>
                      <div className={`inline-flex p-4 rounded-2xl ${planColor.icon} text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <PlanIcon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{plan.name}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed px-2">{plan.description}</p>

                      <div className="mt-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-none">
                            {formatCurrency(plan.price, plan.currency)}
                          </span>
                          <span className="text-lg text-gray-600 dark:text-gray-400">
                            /{plan.billing_cycle}
                          </span>
                        </div>

                        {user && checkEducationalDiscount(user.email) && (
                          <div className="mt-4">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 text-sm">
                              🎓 Educational Discount Available!
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative z-10 px-8">
                      <div className="space-y-4">
                        {features.map((feature, featureIndex) => (
                          <div key={`${plan._id}-feature-${featureIndex}`} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-8">
                        {user ? (
                          <Button 
                            onClick={() => handlePurchase(plan)}
                            disabled={isProcessing}
                            className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                              isPopular 
                                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white' 
                                : 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 dark:hover:from-gray-100 dark:hover:to-gray-200'
                            }`}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Processing Payment...
                              </>
                            ) : (
                              <>
                                <CreditCard className="mr-3 h-5 w-5" />
                                Subscribe to {plan.name}
                                <ArrowRight className="ml-3 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        ) : (
                          <Link to="/signin">
                            <Button 
                              className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                                isPopular 
                                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white' 
                                  : 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 dark:hover:from-gray-100 dark:hover:to-gray-200'
                              }`}
                            >
                              Get Started with {plan.name}
                              <ArrowRight className="ml-3 h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                        
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                          7-day free trial • No credit card required • Cancel anytime
                        </p>
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
      <div className="relative py-24 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 mb-6">
              <Award className="h-4 w-4 mr-2" />
              Feature Comparison
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Create Amazing Content
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See exactly what's included in each plan and choose the perfect fit for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: HeadphonesIcon, 
                title: "Voice Translation", 
                description: "High-quality voice translation with natural pronunciation across multiple languages",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: MessageSquare, 
                title: "Text-to-Speech", 
                description: "Premium neural voice synthesis with emotion and tone control",
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: Headphones, 
                title: "Voice Cloning", 
                description: "Create perfect digital replicas of any voice with just 30 seconds of audio",
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: Calculator, 
                title: "Smart Analytics", 
                description: "Advanced analytics, resume optimization, and ATS scoring for better results",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <Card key={feature.title} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-2 mb-6">
              <Star className="h-4 w-4 mr-2" />
              Customer Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Creators Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who are transforming their content with Zenlead Studio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-24 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 mb-6">
              <MessageSquare className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get answers to the most common questions about Zenlead Studio and our pricing
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of creators, businesses, and professionals who trust Zenlead Studio 
              for their AI-powered content needs. Start your journey today with a free trial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {user ? (
                <Button 
                  size="lg" 
                  className="h-16 px-12 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Choose Your Plan Above
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              ) : (
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="h-16 px-12 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Start Free Trial
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              )}
              
              <Link to="/billing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-16 px-12 text-lg font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl transition-all duration-300"
                >
                  <CreditCard className="mr-3 h-6 w-6" />
                  View My Billing
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
