import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  UserResponse, 
  UserUpdateRequest,
  CreditsResponse,
  ApiError 
} from '@/types/auth';
import { tokenManager } from './token';

// Configure your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.zenlead.ai';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = tokenManager.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.text() as unknown as T;
      }

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 422) {
          throw new Error(
            data.detail?.[0]?.msg || 'Validation error occurred'
          );
        }

        // Handle other API errors
        throw new Error(
          data.message ||
          data.detail ||
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return data;
    } catch (error) {
      // Handle network errors specifically
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection or try again later.');
      }

      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getUser(userId: string): Promise<UserResponse> {
    return this.makeRequest<UserResponse>(`/user/${userId}`);
  }

  async updateUser(userId: string, userData: UserUpdateRequest): Promise<UserResponse> {
    return this.makeRequest<UserResponse>(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserCredits(userId: string): Promise<CreditsResponse> {
    return this.makeRequest<CreditsResponse>(`/user/${userId}/credits`);
  }

  // Health check
  async healthCheck(): Promise<string> {
    return this.makeRequest<string>('/');
  }

  // Utility method to check if API is accessible
  async checkConnection(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      console.error('API connection failed:', error);
      return false;
    }
  }
}

// Create and export API service instance
export const apiService = new ApiService(API_BASE_URL);

// Export makeRequest method for external use
export const makeRequest = apiService.makeRequest.bind(apiService);

// Export error handler helper
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

// Retry mechanism for network requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }

  throw lastError!;
};
