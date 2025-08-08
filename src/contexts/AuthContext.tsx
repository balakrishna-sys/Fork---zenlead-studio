import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  AuthContextType,
  User,
  LoginRequest,
  RegisterRequest,
  UserUpdateRequest
} from '@/types/auth';
import { GoogleAuthService } from '@/lib/googleAuth';
import { apiService, handleApiError } from '@/lib/api';
import { eventEmitter, EVENTS } from '@/lib/events';
import { tokenManager } from '@/lib/token';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Auto-refresh user data periodically and listen for payment events
  useEffect(() => {
    if (user && token) {
      const interval = setInterval(() => {
        refreshUserData();
      }, 5 * 60 * 1000); // Refresh every 5 minutes

      // Listen for payment success events to refresh user data
      const handlePaymentSuccess = () => {
        console.log('Payment success detected, refreshing user data...');
        setTimeout(() => {
          refreshUserData();
        }, 1000); // Small delay to ensure backend has processed the payment
      };

      eventEmitter.on(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);

      return () => {
        clearInterval(interval);
        eventEmitter.off(EVENTS.PAYMENT_SUCCESS, handlePaymentSuccess);
      };
    }
  }, [user, token]);

  const initializeAuth = async () => {
    try {
      const storedToken = tokenManager.getToken();
      const storedUser = tokenManager.getUser();

      if (storedToken && tokenManager.isTokenValid(storedToken) && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        
        // Verify token with backend and refresh user data
        await refreshUserData();
      } else {
        // Clear invalid auth data
        clearAuthState();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        const { user: userData, access_token } = response.data;
        
        // Store auth data
        tokenManager.setToken(access_token);
        tokenManager.setUser(userData);
        
        // Update state
        setToken(access_token);
        setUser(userData);
        
        toast.success('Welcome back! You have been signed in successfully.');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.register(userData);

      if (response.success && response.data) {
        const { user: newUser, access_token } = response.data;

        // Store auth data
        tokenManager.setToken(access_token);
        tokenManager.setUser(newUser);

        // Update state
        setToken(access_token);
        setUser(newUser);

        toast.success('Account created successfully! Welcome to Zenlead Studio.');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Just initiate the OAuth flow - the actual authentication
      // will be handled by the AuthCallback component
      await GoogleAuthService.initiateGoogleAuth();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error('Failed to initiate Google authentication: ' + errorMessage);
      setIsLoading(false); // Reset loading state on error
      throw error;
    }
    // Don't set loading to false here as the page will redirect
  };

  const logout = (): void => {
    clearAuthState();
    toast.success('You have been signed out successfully.');
  };

  const updateUser = async (updateData: UserUpdateRequest): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      setIsLoading(true);
      const response = await apiService.updateUser(user._id, updateData);
      
      if (response.success && response.data) {
        const updatedUser = response.data.user;
        
        // Update stored user data
        tokenManager.setUser(updatedUser);
        setUser(updatedUser);
        
        toast.success('Profile updated successfully!');
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (!user || !token) return;

    try {
      // Check if token needs refresh
      if (tokenManager.shouldRefreshToken(token)) {
        console.warn('Token needs refresh - implement token refresh logic');
        // TODO: Implement token refresh endpoint if available
      }

      const response = await apiService.getUser(user._id);
      
      if (response.success && response.data) {
        const updatedUser = response.data.user;
        tokenManager.setUser(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      
      // If token is invalid, clear auth state
      if (error instanceof Error && error.message.includes('401')) {
        clearAuthState();
        toast.error('Your session has expired. Please sign in again.');
      }
    }
  };

  const clearAuthState = (): void => {
    tokenManager.clearAuth();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(user && token && tokenManager.isTokenValid(token));

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateUser,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
