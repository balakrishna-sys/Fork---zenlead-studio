import { useState, useEffect } from "react";
import { Check, Star, Users, Zap, Shield, ChevronDown, ArrowRight, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const PricingDropdown = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
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
      description: "Perfect for individuals",
      prices: {
        USD: { monthly: 9, yearly: 89 },
        INR: { monthly: 799, yearly: 7990 }
      },
      features: [
        "3 languages supported",
        "2 voice clones",
        "100 minutes audio processing",
        "Basic text-to-speech"
      ],
      color: "from-blue-500 to-blue-600",
      icon: Users,
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for creators",
      prices: {
        USD: { monthly: 29, yearly: 290 },
        INR: { monthly: 1999, yearly: 19990 }
      },
      features: [
        "20+ languages supported",
        "10 voice clones",
        "500 minutes audio processing",
        "Advanced text-to-speech",
        "Video generation",
        "API access"
      ],
      color: "from-purple-500 to-purple-600",
      icon: Zap,
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large teams",
      prices: {
        USD: { monthly: 99, yearly: 990 },
        INR: { monthly: 4999, yearly: 49990 }
      },
      features: [
        "50+ languages & dialects",
        "Unlimited voice clones",
        "Unlimited audio processing",
        "Premium text-to-speech",
        "White-label solutions",
        "24/7 dedicated support"
      ],
      color: "from-orange-500 to-orange-600",
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-3 py-2 text-sm font-medium hover:text-primary gap-1">
          Pricing
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[800px] p-0" align="center" sideOffset={8}>
        <div className="p-6 bg-gradient-to-br from-background to-muted/20">
          {/* Header */}
          <div className="text-center mb-6">
            <Badge variant="outline" className="mb-3 px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Choose Your Plan
            </Badge>
            <h3 className="text-2xl font-bold mb-2">Simple, Transparent Pricing</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start free, upgrade when you need more
            </p>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Tabs value={currency} onValueChange={(value) => setCurrency(value as "USD" | "INR")}>
                <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 h-8">
                  <TabsTrigger value="USD" className="text-xs px-2">USD</TabsTrigger>
                  <TabsTrigger value="INR" className="text-xs px-2">INR</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}>
                <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 h-8">
                  <TabsTrigger value="monthly" className="text-xs px-2">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly" className="text-xs px-2 relative">
                    Yearly
                    <Badge className="absolute -top-4 -right-1 bg-green-500 text-white text-xs scale-75">
                      Save 20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const currentPrice = plan.prices[currency][billingPeriod];
              const savings = billingPeriod === "yearly" ? getSavings(plan, currency) : 0;

              return (
                <Card 
                  key={plan.name}
                  className={`relative bg-card/50 backdrop-blur-sm border transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    plan.popular 
                      ? 'border-primary/50 ring-1 ring-primary/20' 
                      : 'border-border/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-3 py-0.5 text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-3">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${plan.color} text-white mx-auto mb-2`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{plan.description}</CardDescription>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">
                        {formatPrice(currentPrice, currency)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /{billingPeriod === "monthly" ? "mo" : "yr"}
                      </span>
                      {billingPeriod === "yearly" && savings > 0 && (
                        <div className="text-xs text-green-600 font-medium">
                          Save {formatPrice(savings, currency)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2 p-4 pt-0">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs leading-tight">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <div className="text-xs text-muted-foreground text-center pt-1">
                        +{plan.features.length - 4} more features
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-4 pt-2">
                    {isAuthenticated && user ? (
                      <Button
                        onClick={() => navigate('/pricing')}
                        size="sm"
                        className={`w-full text-xs h-8 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90'
                            : ''
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        <CreditCard className="mr-1 h-3 w-3" />
                        Subscribe
                      </Button>
                    ) : (
                      <Link to="/signup" className="w-full">
                        <Button
                          size="sm"
                          className={`w-full text-xs h-8 ${
                            plan.popular
                              ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90'
                              : ''
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center border-t border-border/50 pt-4">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <Link to="/pricing">
              <Button variant="outline" size="sm" className="text-xs">
                View Full Pricing Details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
