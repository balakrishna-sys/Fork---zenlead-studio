
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const USD_PRICES = [
  { name: "Basic", price: 9.99 },
  { name: "Pro", price: 24.99 },
  { name: "Enterprise", price: 59.99 }
];

const INR_PRICES = [
  { name: "Basic", price: 799 },
  { name: "Pro", price: 1999 },
  { name: "Enterprise", price: 4999 }
];

export const PricingCards = () => {
  // Simple country detection: Use INR for India, USD otherwise
  const [currency, setCurrency] = React.useState<"USD" | "INR">("USD");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = navigator.language || "";
      if (lang.startsWith("en-IN") || lang.startsWith("hi") || lang.includes("IN")) {
        setCurrency("INR");
      }
    }
  }, []);

  const pricingPlans = [
    {
      name: "Basic",
      priceUSD: "$9.99",
      priceINR: "₹799",
      credits: "150 credits included",
      description: "Essential voice, text, and video conversion features",
      features: [
        "150 initial credits (5 credits per minute)",
        "Audio language translation (3 languages)",
        "Basic voice cloning (2 voices)",
        "Text-to-speech conversion",
        "Video description-to-animation",
        "Standard quality output"
      ],
      buttonText: "Get Started",
      popular: false,
      gradient: "from-blue-500/10 via-transparent to-purple-500/10"
    },
    {
      name: "Pro",
      priceUSD: "$24.99",
      priceINR: "₹1999",
      credits: "400 credits included",
      description: "Advanced features for professionals",
      features: [
        "400 initial credits (5 credits per minute)",
        "Audio language translation (20+ languages)",
        "Advanced voice cloning (10 voices)",
        "Text & Excel to speech conversion",
        "Text summarization",
        "Video script-to-animation (HD)",
        "High quality output"
      ],
      buttonText: "Try Pro",
      popular: true,
      gradient: "from-purple-500/10 via-transparent to-pink-500/10"
    },
    {
      name: "Enterprise",
      priceUSD: "$59.99",
      priceINR: "₹4999",
      credits: "1000 credits included",
      description: "Complete solution for businesses",
      features: [
        "1000 initial credits (5 credits per minute)",
        "Audio language translation (50+ languages)",
        "Unlimited voice cloning",
        "Batch processing of files",
        "Advanced summarization with customization",
        "Video generation from description (Full HD)",
        "Premium quality output",
        "Priority support"
      ],
      buttonText: "Contact Sales",
      popular: false,
      gradient: "from-pink-500/10 via-transparent to-orange-500/10"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent sm:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Start with 150 credits on us. Choose the plan that works best for you.
        </p>
      </div>
      <div className="flex justify-center mb-8">
        <span className="text-sm mr-3 text-gray-600">Currency:</span>
        <Button
          variant={currency === "USD" ? "secondary" : "outline"}
          size="sm"
          className="mr-2"
          onClick={() => setCurrency("USD")}
        >
          USD $
        </Button>
        <Button
          variant={currency === "INR" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setCurrency("INR")}
        >
          INR ₹
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative flex flex-col border-2 transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'border-primary shadow-lg' : 'border-border'
            } overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`} />
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight">
                  {currency === "INR" ? plan.priceINR : plan.priceUSD}
                </span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <p className="text-sm font-medium text-primary mt-2">{plan.credits}</p>
              <CardDescription className="mt-3">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow relative z-10">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="relative z-10">
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 shadow-lg' 
                    : 'bg-secondary/80 hover:bg-secondary/90'
                } transition-all duration-300`}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          All plans include a 7-day free trial with 150 initial credits. 
          <br />
          1 credit = 12 seconds of processing. Additional credits can be purchased separately.
        </p>
      </div>
    </div>
  );
};
