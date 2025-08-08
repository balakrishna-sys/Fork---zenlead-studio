import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                How we collect, use, and protect your personal information
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
                <Eye className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Create an account (name, email address, password)</li>
                  <li>Subscribe to our services (billing information through Razorpay)</li>
                  <li>Contact our support team (communication records)</li>
                  <li>Participate in surveys or feedback programs</li>
                  <li>Upload content for AI processing (audio files, text, documents)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Usage Information</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We automatically collect information about how you use our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns (features used, processing time, error logs)</li>
                  <li>Performance data (processing success rates, system load)</li>
                  <li>Authentication logs (login attempts, security events)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Content Data</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  When you use our AI services, we process your uploaded content (audio files, text, 
                  documents) to provide the requested services. This content is processed securely 
                  and is not used to train our AI models without explicit consent.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Provision</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Process your content using our AI models</li>
                  <li>Manage your account and subscription</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Process payments through Razorpay's secure system</li>
                  <li>Send service-related notifications and updates</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Service Improvement</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Monitor system performance and reliability</li>
                  <li>Develop new features and capabilities</li>
                  <li>Conduct research and development (with anonymized data)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Legal and Security</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Comply with legal obligations and regulations</li>
                  <li>Protect against fraud, abuse, and security threats</li>
                  <li>Enforce our Terms of Service and policies</li>
                  <li>Respond to legal requests and court orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Third-Party Service Providers</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We share information with trusted service providers who help us operate our business:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Razorpay:</strong> Payment processing and billing management</li>
                  <li><strong>Cloud Providers:</strong> Secure hosting and data storage</li>
                  <li><strong>Analytics Services:</strong> Platform usage and performance monitoring</li>
                  <li><strong>Support Tools:</strong> Customer service and communication</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Legal Requirements</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may disclose your information when required by law, such as in response to 
                  legal processes, government requests, or to protect our rights and the safety 
                  of our users.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">What We Don't Share</h3>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
                    <li>We never sell your personal information to third parties</li>
                    <li>Your content is not shared with other users without permission</li>
                    <li>We don't use your data for advertising or marketing to third parties</li>
                    <li>Voice clones and generated content remain private to your account</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-orange-600" />
                Data Security & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Security Measures</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>End-to-end encryption for data transmission</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Secure cloud infrastructure with redundancy</li>
                  <li>Employee access controls and security training</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Data Retention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Account Data</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Retained for the duration of your account plus 90 days after deletion
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Content Data</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Processed content deleted within 30 days unless saved to your account
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Data Location</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your data is primarily stored in secure data centers in India, with backup 
                  systems in other regions for redundancy. Data may be processed in different 
                  locations as part of our global cloud infrastructure.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Data Access & Control</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Export your data in a standard format</li>
                  <li><strong>Restriction:</strong> Limit how we process your information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Account Management</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Update your profile and preferences through your account dashboard</li>
                  <li>Manage email notification settings</li>
                  <li>Download your generated content and data</li>
                  <li>Delete specific content or your entire account</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Marketing Communications</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You can opt out of marketing emails at any time by clicking the unsubscribe 
                  link or updating your preferences. Essential service communications cannot 
                  be disabled while you have an active account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Types of Cookies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Essential</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Required for platform functionality and security
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Analytics</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Help us understand usage patterns and improve services
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Preferences</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Remember your settings and personalization choices
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Cookie Control</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You can control cookies through your browser settings. Disabling essential 
                  cookies may affect platform functionality. We use local storage and session 
                  storage for temporary data handling during your session.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Cross-Border Data Transfers</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our services are operated from India. If you are accessing our services from 
                  other countries, your information may be transferred to and processed in India. 
                  We implement appropriate safeguards to protect your data during international transfers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Regional Compliance</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>GDPR compliance for European users</li>
                  <li>CCPA compliance for California residents</li>
                  <li>Indian data protection law compliance</li>
                  <li>Industry-standard security practices globally</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Privacy Inquiries</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For questions about this Privacy Policy or your personal data:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@zenleadstudio.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@zenleadstudio.com</p>
                  <p><strong>Response Time:</strong> Within 72 hours</p>
                  <p><strong>Address:</strong> Zenlead Studio, Bangalore, Karnataka, India</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Policy Updates</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Privacy Policy periodically. Material changes will be 
                  communicated via email or platform notification at least 30 days before 
                  taking effect. Continued use of our services constitutes acceptance of 
                  the updated policy.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">
              Your Privacy Matters
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              We are committed to protecting your privacy and being transparent about our data practices. 
              If you have any concerns or questions about how we handle your information, please don't 
              hesitate to contact our privacy team. Your trust is essential to our business.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
