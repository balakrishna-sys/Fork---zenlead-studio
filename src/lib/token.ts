const TOKEN_KEY = 'zenlead_access_token';
const USER_KEY = 'zenlead_user';
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const tokenManager = {
  // Store token securely
  setToken: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  },

  // Retrieve token
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  },

  // Remove token
  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  },

  // Store user data
  setUser: (user: any): void => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  },

  // Retrieve user data
  getUser: (): any | null => {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  },

  // Remove user data
  removeUser: (): void => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  },

  // Clear all auth data
  clearAuth: (): void => {
    tokenManager.removeToken();
    tokenManager.removeUser();
  },

  // Check if token is valid (basic validation)
  isTokenValid: (token: string | null): boolean => {
    if (!token) return false;
    
    try {
      // Basic JWT structure validation
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload (without verification for client-side check)
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  // Check if token needs refresh
  shouldRefreshToken: (token: string | null): boolean => {
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token expires within threshold
      if (payload.exp && payload.exp * 1000 - Date.now() < TOKEN_REFRESH_THRESHOLD) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh check failed:', error);
      return false;
    }
  },

  // Get token expiry time
  getTokenExpiry: (token: string | null): Date | null => {
    if (!token) return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      if (payload.exp) {
        return new Date(payload.exp * 1000);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get token expiry:', error);
      return null;
    }
  }
};
