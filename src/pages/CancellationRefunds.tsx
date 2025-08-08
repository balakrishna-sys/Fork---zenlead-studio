import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, CreditCard, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CancellationRefunds = () => {
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
              <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Cancellation & Refunds Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Learn about our cancellation and refund procedures
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
                <Clock className="h-5 w-5 text-blue-600" />
                Order Cancellation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility for Cancellation</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Customers may cancel their orders within 24 hours of placing the order. After this period, 
                  cancellations may not be accepted as our AI processing may have already begun.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Cancellation Process</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Log into your account and navigate to the billing section</li>
                  <li>Find your active subscription and click "Cancel Subscription"</li>
                  <li>For immediate assistance, contact our support team at support@zenleadstudio.com</li>
                  <li>Provide your order ID and reason for cancellation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Refund Eligibility</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Refunds are available under the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Technical issues that prevent you from using our services</li>
                  <li>Service downtime exceeding 24 hours without notice</li>
                  <li>Billing errors or duplicate charges</li>
                  <li>Cancellation within the first 7 days (trial period)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Refund Process</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Initiation</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Refunds can be initiated by contacting our support team at support@zenleadstudio.com 
                      within 30 days of the billing date.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Processing Time</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Once a refund request is approved, the refund will be processed within 5-7 business days 
                      through Razorpay's refund system.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Refund Method</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Refunds will be issued to the original payment method used for the purchase 
                      (credit card, debit card, UPI, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Non-Refundable Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                The following items and services are non-refundable:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>AI processing credits that have been used</li>
                <li>Custom voice clones that have been generated</li>
                <li>Downloaded audio or video files</li>
                <li>Services used beyond the trial period without technical issues</li>
                <li>Partial months of subscription (you retain access until the end of billing period)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For any questions or concerns regarding our refund and cancellation policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> support@zenleadstudio.com</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <p><strong>Business Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM IST</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">
              Important Note
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              This refund and cancellation policy is in compliance with Razorpay's payment gateway 
              terms and Indian consumer protection laws. We reserve the right to modify this policy 
              at any time, with changes taking effect immediately upon posting on our website.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CancellationRefunds;
