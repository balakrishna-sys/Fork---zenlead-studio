import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock,
  Star,
  Users,
  Zap,
  Shield,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createPaymentAPI, Transaction, Subscription, formatCurrency } from "@/lib/paymentApi";
import { eventEmitter, EVENTS } from "@/lib/events";
import { toast } from "sonner";

const Billing = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Load billing data when component mounts
  useEffect(() => {
    if (token && user) {
      loadBillingData();
    }
  }, [token, user]);

  // Listen for payment success events to refresh billing data
  useEffect(() => {
    const handlePaymentSuccess = () => {
      console.log('Payment success detected in Billing page, refreshing data...');
      loadBillingData();
    };

    eventEmitter.on(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);

    return () => {
      eventEmitter.off(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);
    };
  }, []);

  const loadBillingData = async () => {
    if (!token || !user) {
      console.log('No token or user available for billing data load');
      return;
    }

    try {
      setIsLoading(true);
      setConnectionError(null);
      console.log('Loading billing data for user:', user._id);

      const api = createPaymentAPI(token);

      // Make API calls and handle responses
      const [transactionsResult, subscriptionsResult] = await Promise.allSettled([
        api.getTransactions(50, 0),
        api.getSubscriptions()
      ]);

      // Handle transactions
      if (transactionsResult.status === 'fulfilled') {
        console.log('Transactions loaded:', transactionsResult.value);
        setTransactions(transactionsResult.value || []);
      } else {
        console.error('Failed to load transactions:', transactionsResult.reason);
        setTransactions([]);
        toast.error('Failed to load transaction history');
      }

      // Handle subscriptions  
      if (subscriptionsResult.status === 'fulfilled') {
        console.log('Subscriptions loaded:', subscriptionsResult.value);
        setSubscriptions(subscriptionsResult.value || []);
      } else {
        console.error('Failed to load subscriptions:', subscriptionsResult.reason);
        setSubscriptions([]);
        toast.error('Failed to load subscription information');
      }

    } catch (error: any) {
      console.error('Billing data load error:', error);
      const errorMessage = error.message || 'Failed to load billing information';
      
      setConnectionError(errorMessage);
      toast.error(errorMessage);
      setTransactions([]);
      setSubscriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      active: "default",
      failed: "destructive",
      expired: "secondary",
      cancelled: "secondary",
      pending: "outline"
    } as const;

    const colors = {
      completed: "text-green-600",
      active: "text-green-600",
      failed: "text-red-600",
      expired: "text-gray-600",
      cancelled: "text-gray-600",
      pending: "text-yellow-600"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPlanIcon = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('starter')) return <Users className="h-5 w-5" />;
    if (name.includes('professional')) return <Zap className="h-5 w-5" />;
    if (name.includes('enterprise')) return <Shield className="h-5 w-5" />;
    return <Star className="h-5 w-5" />;
  };

  // Calculate stats
  const activeSubscription = subscriptions.find(sub => sub.status === 'active');
  const totalSpent = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Billing & Subscriptions</h1>
                <p className="text-muted-foreground">
                  Manage your subscriptions, view payment history, and download invoices
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={loadBillingData}
                  className="gap-2"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  onClick={() => navigate('/pricing')}
                  className="gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Connection Error */}
          {connectionError && (
            <Card className="bg-destructive/5 border-destructive/20 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <h3 className="font-medium text-destructive mb-1">Connection Error</h3>
                    <p className="text-sm text-muted-foreground mb-3">{connectionError}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setConnectionError(null);
                        loadBillingData();
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading billing information...</span>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-fit">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                <TabsTrigger value="transactions">Payment History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Plan</p>
                          <p className="text-2xl font-bold">
                            {activeSubscription?.plan.name || 'Free'}
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-primary/10">
                          {activeSubscription ? getPlanIcon(activeSubscription.plan.name) : <Users className="h-5 w-5" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(totalSpent, 'INR')}
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-green-500/10">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Billing</p>
                          <p className="text-2xl font-bold">
                            {activeSubscription?.end_date 
                              ? formatDate(activeSubscription.end_date)
                              : 'N/A'
                            }
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-500/10">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Subscription */}
                {activeSubscription && (
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {getPlanIcon(activeSubscription.plan.name)}
                        Current Subscription
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{activeSubscription.plan.name}</h3>
                          <p className="text-muted-foreground">{activeSubscription.plan.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {formatCurrency(activeSubscription.plan.price, activeSubscription.plan.currency)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            per {activeSubscription.plan.billing_cycle}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(activeSubscription.status)}
                            {getStatusBadge(activeSubscription.status)}
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Credits</p>
                          <p className="font-semibold">{activeSubscription.plan.credits.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Auto Renew</p>
                          <p className="font-semibold">{activeSubscription.auto_renew ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Billing</p>
                          <p className="font-semibold">{formatDate(activeSubscription.end_date)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Transactions */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {transactions.slice(0, 5).length > 0 ? (
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((transaction) => (
                          <div key={transaction._id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(transaction.status)}
                              <div>
                                <p className="font-medium">{transaction.plan_name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(transaction.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {formatCurrency(transaction.amount, 'INR')}
                              </p>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("transactions")}
                          className="w-full"
                        >
                          View All Transactions
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No transactions found
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscriptions Tab */}
              <TabsContent value="subscriptions" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Your Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {subscriptions.length > 0 ? (
                      <div className="space-y-4">
                        {subscriptions.map((subscription) => (
                          <Card key={subscription._id} className="border">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  {getPlanIcon(subscription.plan.name)}
                                  <div>
                                    <h3 className="text-lg font-semibold">{subscription.plan.name}</h3>
                                    <p className="text-muted-foreground">{subscription.plan.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold">
                                    {formatCurrency(subscription.plan.price, subscription.plan.currency)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    per {subscription.plan.billing_cycle}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Status</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusIcon(subscription.status)}
                                    {getStatusBadge(subscription.status)}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Start Date</p>
                                  <p className="font-semibold">{formatDate(subscription.start_date)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">End Date</p>
                                  <p className="font-semibold">{formatDate(subscription.end_date)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Auto Renew</p>
                                  <p className="font-semibold">{subscription.auto_renew ? 'Yes' : 'No'}</p>
                                </div>
                              </div>

                              <Separator className="my-4" />

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">
                                  {subscription.plan.credits.toLocaleString()} Credits
                                </Badge>
                                {subscription.plan.features && Object.keys(subscription.plan.features).map((key) => (
                                  <Badge key={key} variant="outline">
                                    {key}: {subscription.plan.features[key]}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No active subscriptions</p>
                        <Button onClick={() => navigate('/pricing')}>
                          Browse Plans
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Payment History
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 0 ? (
                      <ScrollArea className="h-[500px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Plan</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Credits</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction) => (
                              <TableRow key={transaction._id}>
                                <TableCell className="font-medium">
                                  {transaction.plan_name}
                                </TableCell>
                                <TableCell>
                                  {formatCurrency(transaction.amount, 'INR')}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(transaction.status)}
                                    {getStatusBadge(transaction.status)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {transaction.credits_added.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {formatDate(transaction.created_at)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No transactions found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Debug Panel - Remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <BillingDebug />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Billing;
