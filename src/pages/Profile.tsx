import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createUserAPI, UserResponse } from "@/lib/userApi";
import { eventEmitter, EVENTS } from "@/lib/events";
import { toast } from "sonner";
import {
  User,
  Mail,
  CreditCard,
  Shield,
  Save,
  Loader2,
  Edit,
  Eye,
  Calendar,
  Award,
  RefreshCw
} from "lucide-react";

const Profile = () => {
  const { user, updateUser, isLoading, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshingCredits, setIsRefreshingCredits] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || ""
  });

  const userAPI = token ? createUserAPI(token) : null;

  // Update local state when auth user changes
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, [user]);

  // Function to refresh user credits from backend
  const refreshCredits = async () => {
    if (!userAPI || !user) return;

    try {
      setIsRefreshingCredits(true);
      const credits = await userAPI.getUserCredits(user._id);

      // Update the current user state with new credits
      setCurrentUser(prev => prev ? { ...prev, credits } : null);

      toast.success('Credits refreshed successfully');
    } catch (error: any) {
      console.error('Failed to refresh credits:', error);
      toast.error('Failed to refresh credits');
    } finally {
      setIsRefreshingCredits(false);
    }
  };

  // Listen for payment success events to refresh credits
  useEffect(() => {
    if (user && userAPI) {
      const handlePaymentSuccess = () => {
        console.log('Payment success detected in Profile, refreshing credits...');
        refreshCredits();
      };

      eventEmitter.on(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);

      return () => {
        eventEmitter.off(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);
      };
    }
  }, [user, userAPI]);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || ""
    });
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1 bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentUser.avatarUrl} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                  <AvatarFallback className="text-lg">
                    {getUserInitials(currentUser.firstName || '', currentUser.lastName || '')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <CardTitle className="text-xl">
                  {currentUser.firstName} {currentUser.lastName}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {currentUser.email}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credits</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <CreditCard className="h-3 w-3 mr-1" />
                    {currentUser.credits?.toLocaleString() || 0}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshCredits}
                    disabled={isRefreshingCredits}
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    title="Refresh Credits"
                  >
                    <RefreshCw className={`h-3 w-3 ${isRefreshingCredits ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <Shield className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  {new Date().getFullYear()}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="md:col-span-2 bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Profile Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`pl-10 h-12 ${!isEditing ? 'bg-muted/50' : 'bg-background/50'} border-border/50 focus:border-primary/50`}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`pl-10 h-12 ${!isEditing ? 'bg-muted/50' : 'bg-background/50'} border-border/50 focus:border-primary/50`}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 h-12 ${!isEditing ? 'bg-muted/50' : 'bg-background/50'} border-border/50 focus:border-primary/50`}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">User ID</Label>
                  <div className="relative">
                    <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={user._id}
                      className="pl-10 h-12 bg-muted/50 border-border/50"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is your unique user identifier and cannot be changed.
                  </p>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="h-12 px-6"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards for Future Features */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Security Card */}
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Password</span>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  Not Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats Card */}
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
              <CardDescription>
                Your account activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Credits Used This Month</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Projects Created</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Activity</span>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
