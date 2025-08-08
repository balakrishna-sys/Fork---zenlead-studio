// Payment API service for Zenlead Studio
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types for Payment APIs
export interface PlanFeatures {
  languages_supported: number;
  voice_clones: number;
  audio_processing_minutes: number;
  text_to_speech: string;
  video_generation?: string;
  support: string;
  export_formats: string[];
  api_access?: boolean;
  best_value?: boolean;
  free_trial_days: number;
  no_credit_card_required: boolean;
}

export interface Plan {
  uid: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_cycle: 'monthly' | 'yearly' | 'lifetime';
  credits: number;
  features: PlanFeatures;
  status: 'active' | 'inactive' | 'deprecated';
  created_at: string;
}

export interface Organization {
  uid: string;
  name: string;
  domain: string;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface PaymentInitiation {
  transaction_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  razorpay_key: string;
  discount_applied: number;
}

export interface Transaction {
  uid: string;
  plan_name: string;
  amount: number;
  status: 'completed' | 'failed' | 'pending';
  credits_added: number;
  created_at: string;
}

export interface Subscription {
  uid: string;
  plan: Plan;
  status: 'active' | 'expired' | 'cancelled';
  start_date: string;
  end_date: string;
  auto_renew: boolean;
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  success: false;
  message: string;
  detail?: string;
}

// Payment API class
export class PaymentAPI {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  // Plan Management APIs
  async getPlans(status?: 'active' | 'inactive' | 'deprecated'): Promise<Plan[]> {
    const params = status ? `?status=${status}` : '';
    const response = await this.request<ApiResponse<Plan[]>>(`/api/payments/plans${params}`);
    return response.data;
  }

  async getFilteredPlans(filters?: {
    currency?: 'USD' | 'INR';
    billing_cycle?: 'monthly' | 'yearly' | 'lifetime';
    status?: 'active' | 'inactive' | 'deprecated';
  }): Promise<{ plans: Plan[]; grouped_plans: Record<string, Plan[]> }> {
    const params = new URLSearchParams();
    if (filters?.currency) params.append('currency', filters.currency);
    if (filters?.billing_cycle) params.append('billing_cycle', filters.billing_cycle);
    if (filters?.status) params.append('status', filters.status);
    
    const queryString = params.toString();
    const response = await this.request<ApiResponse<{ plans: Plan[]; grouped_plans: Record<string, Plan[]> }>>(
      `/api/payments/plans/filtered${queryString ? `?${queryString}` : ''}`
    );
    return response.data;
  }

  // Organization APIs
  async getOrganizations(): Promise<Organization[]> {
    const response = await this.request<ApiResponse<Organization[]>>('/api/payments/organizations');
    return response.data;
  }

  // Payment Processing APIs
  async initiatePayment(planId: string): Promise<PaymentInitiation> {
    const response = await this.request<ApiResponse<PaymentInitiation>>('/api/payments/initiate', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
    return response.data;
  }

  async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<void> {
    await this.request<ApiResponse<null>>('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Transaction and Subscription APIs
  async getTransactions(limit = 20, offset = 0): Promise<Transaction[]> {
    const response = await this.request<ApiResponse<Transaction[]>>(
      `/api/payments/transactions?limit=${limit}&offset=${offset}`
    );
    return response.data;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    const response = await this.request<ApiResponse<Subscription[]>>('/api/payments/subscriptions');
    return response.data;
  }
}

// Helper function to create PaymentAPI instance
export const createPaymentAPI = (token: string): PaymentAPI => {
  return new PaymentAPI(token);
};

// Public API functions that don't require authentication
export const getPublicPlans = async (status?: 'active' | 'inactive' | 'deprecated'): Promise<Plan[]> => {
  const params = status ? `?status=${status}` : '';
  const url = `${API_BASE_URL}/api/payments/plans${params}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data.data;
};

export const getPublicFilteredPlans = async (filters?: {
  currency?: 'USD' | 'INR';
  billing_cycle?: 'monthly' | 'yearly' | 'lifetime';
  status?: 'active' | 'inactive' | 'deprecated';
}): Promise<{ plans: Plan[]; grouped_plans: Record<string, Plan[]> }> => {
  const params = new URLSearchParams();
  if (filters?.currency) params.append('currency', filters.currency);
  if (filters?.billing_cycle) params.append('billing_cycle', filters.billing_cycle);
  if (filters?.status) params.append('status', filters.status);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/api/payments/plans/filtered${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data.data;
};

// Razorpay integration helper
export const loadRazorpay = (): Promise<any> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve((window as any).Razorpay);
    };
    document.body.appendChild(script);
  });
};

// Currency formatting helper
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Plan comparison helper
export const comparePlans = (plans: Plan[]) => {
  return plans.sort((a, b) => a.price - b.price);
};
