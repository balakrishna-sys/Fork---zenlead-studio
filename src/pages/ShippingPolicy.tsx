import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, Download, Cloud, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ShippingPolicy = () => {
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
              <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Digital Delivery Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                How we deliver our digital services and content
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">
              Digital Services Only
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              Zenlead Studio provides exclusively digital services and products. We do not ship physical items. 
              All our AI-powered services, generated content, and software are delivered digitally through 
              our secure online platform.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                Service Delivery Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Instant Access</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upon successful payment confirmation through Razorpay, you will receive immediate access 
                  to your purchased plan and credits. Our services are available 24/7 through your account dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Account Activation</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Services activate automatically upon payment confirmation</li>
                  <li>No waiting period for digital service delivery</li>
                  <li>Access credentials are sent to your registered email address</li>
                  <li>Login to your account to start using services immediately</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-600" />
                Content Delivery & Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Generated Content</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>AI-generated audio files are available for immediate download</li>
                  <li>Video content is processed and delivered within our platform</li>
                  <li>Voice clones are accessible through your voice library</li>
                  <li>Text processing results are displayed instantly</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Download Formats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Audio Formats</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• MP3 (Standard quality)</li>
                      <li>• WAV (High quality)</li>
                      <li>• FLAC (Lossless)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Document Formats</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• PDF reports</li>
                      <li>• CSV exports</li>
                      <li>• TXT transcriptions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Download Availability</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Generated content remains available for download through your account for the duration 
                  of your active subscription plus 30 days after cancellation. After this period, 
                  content may be archived and require special request for access.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Global Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Worldwide Access</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our digital services are available globally to users in supported countries. 
                  Access is provided through secure cloud infrastructure with servers located 
                  in multiple regions for optimal performance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Regional Considerations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Service availability may vary based on local regulations</li>
                  <li>Payment methods supported through Razorpay's global network</li>
                  <li>Multi-language support for international users</li>
                  <li>24/7 customer support across time zones</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Internet Requirements</h3>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>Important:</strong> A stable internet connection is required to access our services. 
                    Minimum recommended speed: 5 Mbps for basic features, 25 Mbps for video processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange-600" />
                Processing & Delivery Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Processing Times</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Instant Services</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Account activation</li>
                      <li>• Text processing</li>
                      <li>• Resume analysis</li>
                      <li>• ATS scoring</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Processing Required</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Voice translation: 1-5 minutes</li>
                      <li>• Voice cloning: 5-15 minutes</li>
                      <li>• Video generation: 10-30 minutes</li>
                      <li>• Large file processing: Variable</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Factors Affecting Processing Time</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>File size and complexity</li>
                  <li>Current system load and queue position</li>
                  <li>Selected quality settings and output format</li>
                  <li>Number of languages for translation services</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Confirmation & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Delivery Confirmation</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Email notifications for successful payments and activations</li>
                  <li>Real-time status updates in your account dashboard</li>
                  <li>Processing completion notifications</li>
                  <li>Download links and access instructions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Technical Support</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  If you experience any issues with service delivery or access:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@zenleadstudio.com</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                  <p><strong>Live Chat:</strong> Available during business hours</p>
                  <p><strong>Knowledge Base:</strong> Self-service help articles available 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Questions About Digital Delivery?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Since we provide digital services exclusively, traditional shipping terms don't apply. 
              If you have questions about accessing your services, downloading content, or need 
              technical assistance, please don't hesitate to contact our support team.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
