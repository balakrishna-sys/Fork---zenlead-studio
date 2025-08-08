import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createPaymentAPI } from "@/lib/paymentApi";
import { emitPaymentSuccess } from "@/lib/events";

const BillingDebug = () => {
  const { user, token } = useAuth();
  const [testResults, setTestResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async () => {
    if (!token) {
      setTestResults({ error: "No token available" });
      return;
    }

    setIsLoading(true);
    const api = createPaymentAPI(token);
    const results: any = {};

    try {
      // Test transactions API
      console.log('Testing transactions API...');
      const transactions = await api.getTransactions(5, 0);
      results.transactions = { success: true, data: transactions, count: transactions.length };
    } catch (error: any) {
      results.transactions = { success: false, error: error.message };
    }

    try {
      // Test subscriptions API  
      console.log('Testing subscriptions API...');
      const subscriptions = await api.getSubscriptions();
      results.subscriptions = { success: true, data: subscriptions, count: subscriptions.length };
    } catch (error: any) {
      results.subscriptions = { success: false, error: error.message };
    }

    try {
      // Test plans API
      console.log('Testing plans API...');
      const plans = await api.getPlans('active');
      results.plans = { success: true, data: plans, count: plans.length };
    } catch (error: any) {
      results.plans = { success: false, error: error.message };
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>API Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={testAPI} disabled={isLoading || !token}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing APIs...
              </>
            ) : (
              'Test All APIs'
            )}
          </Button>
          <Badge variant="outline">
            User: {user?.email || 'Not logged in'}
          </Badge>
          <Badge variant="outline">
            Token: {token ? 'Available' : 'Missing'}
          </Badge>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div className="space-y-3">
            {Object.entries(testResults).map(([key, result]: [string, any]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.success)}
                  <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)} API</span>
                </div>
                <div className="text-right">
                  {result.success ? (
                    <Badge variant="secondary">{result.count} items</Badge>
                  ) : (
                    <Badge variant="destructive">Error</Badge>
                  )}
                </div>
              </div>
            ))}
            
            {/* Show details */}
            <div className="mt-4 p-3 bg-muted rounded text-xs">
              <pre>{JSON.stringify(testResults, null, 2)}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingDebug;
