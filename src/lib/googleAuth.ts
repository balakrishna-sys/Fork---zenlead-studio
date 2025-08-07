import { makeRequest } from './api';

interface GoogleAuthUrlResponse {
  status: number;
  success: boolean;
  message: string;
  auth_url: string;
}

export class GoogleAuthService {
  /**
   * Get Google OAuth URL from backend
   */
  static async getGoogleAuthUrl(): Promise<string> {
    try {
      const response = await makeRequest<GoogleAuthUrlResponse>('/auth/google');
      
      if (response.success && response.auth_url) {
        return response.auth_url;
      }
      
      throw new Error(response.message || 'Failed to get Google auth URL');
    } catch (error) {
      console.error('Google auth URL error:', error);
      throw error;
    }
  }

  /**
   * Initiate Google OAuth flow
   */
  static async initiateGoogleAuth(): Promise<void> {
    try {
      const authUrl = await this.getGoogleAuthUrl();
      
      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to initiate Google auth:', error);
      throw error;
    }
  }

  /**
   * Extract auth data from URL params (for callback handling)
   */
  static extractTokenFromUrl(): {
    auth_data?: string;
    token?: string;
    error?: string;
    success?: string
  } {
    const urlParams = new URLSearchParams(window.location.search);

    return {
      auth_data: urlParams.get('auth_data') || undefined,
      token: urlParams.get('token') || undefined,
      error: urlParams.get('error') || undefined,
      success: urlParams.get('success') || undefined,
    };
  }

  /**
   * Clean URL params after processing
   */
  static cleanUrlParams(): void {
    if (window.history.replaceState) {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, document.title, url.toString());
    }
  }
}
