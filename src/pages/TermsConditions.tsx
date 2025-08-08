import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, Gavel } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Terms and Conditions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Your agreement for using Zenlead Studio services
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Welcome to Zenlead Studio. These Terms and Conditions ("Terms") govern your use of our 
                AI-powered content creation platform, including voice translation, text-to-speech, 
                voice cloning, and video generation services ("Services"). By accessing or using our 
                platform, you agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Account Registration</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the security of your account credentials</li>
                  <li>You must be at least 18 years old to use our services</li>
                  <li>Business accounts must be registered by authorized representatives</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Acceptable Use</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Use our services only for lawful purposes</li>
                  <li>Do not upload content that infringes on intellectual property rights</li>
                  <li>Do not create deepfakes or misleading content without proper disclosure</li>
                  <li>Respect voice ownership and obtain necessary permissions for voice cloning</li>
                  <li>Do not attempt to reverse engineer or exploit our AI models</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Prohibited Activities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Harassment, abuse, or harmful content creation</li>
                  <li>Spam, malware, or fraudulent activities</li>
                  <li>Unauthorized access to our systems or other users' accounts</li>
                  <li>Commercial use beyond your subscription limits</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Our Content</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Zenlead Studio owns all rights to our platform, AI models, software, and related 
                  intellectual property. You may not copy, modify, or distribute our proprietary 
                  technology without written permission.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Your Content</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You retain ownership of content you upload to our platform. By using our services, 
                  you grant us a limited license to process and enhance your content using our AI 
                  technology. Generated content belongs to you, subject to these Terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Voice Rights</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You must have explicit permission to clone any voice that is not your own. 
                  Unauthorized voice cloning may result in account termination and legal action.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Service Availability & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Availability</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                  Scheduled maintenance will be announced in advance when possible.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Usage Limits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Fair usage policies apply to prevent system abuse</li>
                  <li>API rate limits may be enforced</li>
                  <li>Processing time may vary based on system load</li>
                  <li>Large files may be subject to additional processing time</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Data Processing</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your data is processed using secure cloud infrastructure. We implement industry-standard 
                  security measures but cannot guarantee absolute security against all threats.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-red-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Limitations</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our services are provided "as is" without warranties of any kind. We do not guarantee 
                  the accuracy, completeness, or reliability of AI-generated content. Users are responsible 
                  for reviewing and validating all outputs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Liability Limits</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our liability for any damages arising from the use of our services is limited to 
                  the amount paid for the specific service in question, not to exceed the total 
                  amount paid in the preceding 12 months.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">User Responsibility</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Users are responsible for ensuring their use of generated content complies with 
                  applicable laws, regulations, and third-party rights. We are not liable for 
                  misuse of our services or generated content.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Billing and Payments</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>All payments are processed securely through Razorpay</li>
                  <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
                  <li>All fees are non-refundable except as stated in our Refund Policy</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Subscription Management</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You may upgrade, downgrade, or cancel your subscription at any time through your 
                  account dashboard. Changes take effect at the next billing cycle unless otherwise specified.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                These Terms are governed by the laws of India. Any disputes will be resolved through 
                binding arbitration in Bangalore, Karnataka, India. If any provision of these Terms 
                is found invalid, the remaining provisions will continue in effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be 
                communicated via email or platform notification at least 30 days before taking effect. 
                Continued use of our services after changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@zenleadstudio.com</p>
                <p><strong>Address:</strong> Zenlead Studio, Bangalore, Karnataka, India</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;
