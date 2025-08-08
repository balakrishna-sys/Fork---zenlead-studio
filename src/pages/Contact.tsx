import { useState, FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  ExternalLink,
  User,
  Building,
  Users,
  Clock
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    college: "",
    questions: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Google Form URL - update this with your actual Google Form URL
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdYOUR_ACTUAL_FORM_ID_HERE/viewform";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields (Name and Email)");
      return;
    }

    setIsSubmitting(true);
    
    // Create pre-filled Google Form URL
    const formUrl = new URL(GOOGLE_FORM_URL);
    const params = new URLSearchParams();
    
    // Add form data as URL parameters (adjust these based on your actual Google Form field IDs)
    if (formData.name) params.append('entry.123456789', formData.name);
    if (formData.email) params.append('entry.987654321', formData.email);
    if (formData.phone) params.append('entry.456789123', formData.phone);
    if (formData.designation) params.append('entry.789123456', formData.designation);
    if (formData.college) params.append('entry.321654987', formData.college);
    if (formData.questions) params.append('entry.654321789', formData.questions);
    
    // Open Google Form in new tab
    const finalUrl = `${formUrl.toString()}?${params.toString()}`;
    window.open(finalUrl, '_blank');
    
    toast.success("Redirecting to contact form...");
    setIsSubmitting(false);
  };

  const handleDirectFormAccess = () => {
    window.open(GOOGLE_FORM_URL, '_blank');
    toast.success("Opening contact form...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
            <MessageSquare className="h-3 w-3 mr-1" />
            Get In Touch
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Zenlead Studio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our AI technology? Want to collaborate or need support? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">contact@zenlead.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 AI Innovation Hub<br />
                      Tech Valley, CA 94000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM PST<br />
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleDirectFormAccess}
                  className="w-full justify-start h-auto p-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Open Contact Form</div>
                    <div className="text-xs opacity-90">Direct access to Google Form</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation" className="text-sm font-medium">
                        Your Current Designation *
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="designation"
                          type="text"
                          placeholder="e.g., Student, Software Engineer"
                          value={formData.designation}
                          onChange={(e) => handleInputChange("designation", e.target.value)}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college" className="text-sm font-medium">
                      College Name (if applicable)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="college"
                        type="text"
                        placeholder="Your college or university"
                        value={formData.college}
                        onChange={(e) => handleInputChange("college", e.target.value)}
                        className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="questions" className="text-sm font-medium">
                      Any Questions?
                    </Label>
                    <Textarea
                      id="questions"
                      placeholder="Tell us about your project, questions, or how we can help you..."
                      value={formData.questions}
                      onChange={(e) => handleInputChange("questions", e.target.value)}
                      className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      * Required fields. This will open our contact form in a new window.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
