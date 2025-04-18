
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const PricingCards = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Essential voice and text conversion features",
      features: [
        "Audio language translation (3 languages)",
        "Basic voice cloning (2 voices)",
        "Text-to-speech conversion",
        "Limited processing time (30 min/month)",
        "Standard quality output"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$24.99",
      description: "Advanced features for professionals",
      features: [
        "Audio language translation (20+ languages)",
        "Advanced voice cloning (10 voices)",
        "Text & Excel to speech conversion",
        "Text summarization",
        "Enhanced processing time (2 hours/month)",
        "High quality output"
      ],
      buttonText: "Try Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$59.99",
      description: "Complete solution for businesses",
      features: [
        "Audio language translation (50+ languages)",
        "Unlimited voice cloning",
        "Batch processing of files",
        "Advanced summarization with customization",
        "Unlimited processing time",
        "Premium quality output",
        "Priority support"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Choose the right plan for your needs. All plans include a 7-day free trial.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col border-2 ${
              plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <CardDescription className="mt-3">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
