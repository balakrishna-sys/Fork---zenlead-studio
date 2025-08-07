import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleAuthService } from '@/lib/googleAuth';
import { tokenManager } from '@/lib/token';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AuthCallback = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { refreshUserData } = useAuth();

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      const { auth_data, token, error, success } = GoogleAuthService.extractTokenFromUrl();

      if (error || success === 'false') {
        setStatus('error');
        setErrorMessage(error || 'Authentication failed');
        toast.error('Google authentication failed: ' + (error || 'Unknown error'));
        return;
      }

      // Handle new auth_data format (base64 encoded complete auth response)
      if (auth_data) {
        try {
          // Decode base64 auth data
          const authDataJson = atob(auth_data);
          const authResponse = JSON.parse(authDataJson);

          console.log('Received auth data:', authResponse);

          if (authResponse.access_token && authResponse.user) {
            // Store the token
            tokenManager.setToken(authResponse.access_token);

            // Map the user data to expected format
            const userInfo = {
              _id: authResponse.user.uid,
              firstName: authResponse.user.firstName,
              lastName: authResponse.user.lastName,
              email: authResponse.user.email,
              credits: authResponse.user.credits,
              auth_provider: authResponse.user.auth_provider
            };

            tokenManager.setUser(userInfo);

            // Update auth context state directly since we have complete user data
            const { refreshUserData } = useAuth();
            await refreshUserData();

            setStatus('success');
            toast.success('Successfully signed in with Google!');

            // Clean URL and redirect after a short delay
            setTimeout(() => {
              GoogleAuthService.cleanUrlParams();
              navigate('/dashboard', { replace: true });
            }, 2000);

          } else {
            throw new Error('Invalid auth data structure');
          }

        } catch (decodeError) {
          console.error('Auth data decode error:', decodeError);
          setStatus('error');
          setErrorMessage('Invalid authentication data received');
          toast.error('Authentication failed: Invalid data format');
        }
      }
      // Fallback to old token format for backward compatibility
      else if (token) {
        // Store the token
        tokenManager.setToken(token);

        // Decode token to get user info (basic validation)
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userInfo = {
            _id: payload.sub,
            email: payload.email,
            firstName: '', // Will be updated by refreshUserData
            lastName: '',
            credits: 0
          };

          tokenManager.setUser(userInfo);

          // Refresh user data from backend
          await refreshUserData();

          setStatus('success');
          toast.success('Successfully signed in with Google!');

          // Clean URL and redirect after a short delay
          setTimeout(() => {
            GoogleAuthService.cleanUrlParams();
            navigate('/dashboard', { replace: true });
          }, 2000);

        } catch (decodeError) {
          console.error('Token decode error:', decodeError);
          setStatus('error');
          setErrorMessage('Invalid token received');
          toast.error('Authentication failed: Invalid token');
        }
      } else {
        setStatus('error');
        setErrorMessage('No authentication data received from Google');
        toast.error('Authentication failed: No data received');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      toast.error('Authentication failed');
    }
  };

  const handleRetry = () => {
    GoogleAuthService.cleanUrlParams();
    navigate('/signin', { replace: true });
  };

  const handleGoHome = () => {
    GoogleAuthService.cleanUrlParams();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl relative">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto p-3 rounded-2xl bg-gradient-to-r from-primary to-purple-600">
            {status === 'loading' && <Loader2 className="h-8 w-8 text-white animate-spin" />}
            {status === 'success' && <CheckCircle className="h-8 w-8 text-white" />}
            {status === 'error' && <XCircle className="h-8 w-8 text-white" />}
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold">
              {status === 'loading' && 'Completing Sign In...'}
              {status === 'success' && 'Welcome to Zenlead Studio!'}
              {status === 'error' && 'Authentication Failed'}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Please wait while we complete your Google authentication...
              </p>
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You have been successfully signed in with Google. Redirecting to your dashboard...
              </p>
              <div className="flex justify-center">
                <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-purple-600 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We encountered an issue while signing you in with Google.
              </p>
              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
              )}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleRetry}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={handleGoHome}
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
