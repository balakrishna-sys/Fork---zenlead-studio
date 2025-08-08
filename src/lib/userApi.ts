// User API service for Zenlead Studio
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// User Types matching your backend
export interface UserResponse {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  credits: number;
  auth_provider?: string;
  google_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface BackendUserResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface UserResponseData {
  user: UserResponse;
}

export interface CreditsResponseData {
  credits: number;
}

// User API class
export class UserAPI {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<BackendUserResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      ...options.headers,
    };

    console.log(`Making user API request to: ${url}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(`User API response from ${endpoint}:`, data);

    if (!response.ok) {
      // Handle validation errors (422) specifically
      if (response.status === 422 && data.detail) {
        const validationErrors = data.detail.map((err: any) => err.msg).join(', ');
        throw new Error(`Validation Error: ${validationErrors}`);
      }
      
      const errorMessage = data.message || data.detail || `HTTP error! status: ${response.status}`;
      const error = new Error(errorMessage) as any;
      error.status = response.status;
      error.detail = data.detail;
      throw error;
    }

    return data as BackendUserResponse<T>;
  }

  // Get user details
  async getUser(userId: string): Promise<UserResponse> {
    const response = await this.request<UserResponseData>(`/user/${userId}`);
    return response.data.user;
  }

  // Update user details
  async updateUser(userId: string, userData: UserUpdate): Promise<UserResponse> {
    const response = await this.request<UserResponseData>(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.data.user;
  }

  // Get user credits only
  async getUserCredits(userId: string): Promise<number> {
    const response = await this.request<CreditsResponseData>(`/user/${userId}/credits`);
    return response.data.credits;
  }
}

// Helper function to create UserAPI instance
export const createUserAPI = (token: string): UserAPI => {
  return new UserAPI(token);
};
