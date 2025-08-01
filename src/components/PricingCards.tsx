import { useState, useEffect } from "react";
import { Check, Star, Users, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

type ButtonVariant = "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";

export const PricingCards = () => {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = navigator.language || "";
      if (lang.startsWith("en-IN") || lang.startsWith("hi") || lang.includes("IN")) {
        setCurrency("INR");
      }
    }
  }, []);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      prices: {
        USD: { monthly: 9, yearly: 89 },
        INR: { monthly: 799, yearly: 7990 }
      },
      badge: "Most Popular",
      features: [
        "3 languages supported",
        "2 voice clones",
        "100 minutes of audio processing",
        "Basic text-to-speech",
        "Standard support",
        "MP3 & WAV export"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      icon: Users,
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for content creators and businesses",
      prices: {
        USD: { monthly: 29, yearly: 290 },
        INR: { monthly: 1999, yearly: 19990 }
      },
      badge: "Best Value",
      features: [
        "20+ languages supported",
        "10 voice clones",
        "500 minutes of audio processing",
        "Advanced text-to-speech",
        "Video generation (10 videos/month)",
        "Priority support",
        "All export formats",
        "API access"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      icon: Zap,
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large teams and organizations",
      prices: {
        USD: { monthly: 99, yearly: 990 },
        INR: { monthly: 4999, yearly: 49990 }
      },
      badge: "Advanced",
      features: [
        "50+ languages & dialects",
        "Unlimited voice clones",
        "Unlimited audio processing",
        "Premium text-to-speech",
        "Unlimited video generation",
        "24/7 dedicated support",
        "White-label solutions",
        "SLA guarantee"
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      icon: Shield,
      popular: false
    }
  ];

  const formatPrice = (amount: number, curr: string) => {
    return curr === "INR" ? `₹${amount.toLocaleString()}` : `$${amount}`;
  };

  const getSavings = (plan: any, curr: string) => {
    const monthly = plan.prices[curr].monthly;
    const yearly = plan.prices[curr].yearly;
    return (monthly * 12) - yearly;
  };

  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 bg-card/50 backdrop-blur-sm border-primary/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl leading-8 text-muted-foreground">
            Start free, upgrade when you need more. All plans include our core AI features 
            with no hidden fees.
          </p>
        </div>

        {/* Currency and Billing Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
          {/* Currency Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Currency:</span>
            <Tabs value={currency} onValueChange={(value) => setCurrency(value as "USD" | "INR")}>
              <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
                <TabsTrigger value="USD" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-3">
                  USD $
                </TabsTrigger>
                <TabsTrigger value="INR" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-3">
                  INR ₹
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex items-center gap-3">
            <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}>
              <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-3">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative text-sm px-3">
                  Yearly
                  <Badge className="absolute -top-6 sm:-top-8 -right-1 sm:-right-2 bg-green-500 text-white text-xs scale-75 sm:scale-100">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = plan.prices[currency][billingPeriod];
            const savings = billingPeriod === "yearly" ? getSavings(plan, currency) : 0;

            return (
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
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {formatPrice(currentPrice, currency)}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                    {billingPeriod === "yearly" && savings > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {formatPrice(savings, currency)} annually
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
                </CardContent>

                <CardFooter>
                  <Link to="/signup" className="w-full">
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
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            All plans include core AI features. Additional credits can be purchased separately.
          </p>
        </div>
      </div>
    </div>
  );
};
