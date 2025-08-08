// Payment API service for Zenlead Studio - Updated to match backend exactly
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.zenlead.ai';

// Backend Response Types - Matching your FastAPI backend exactly
export interface BackendResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

// Plan Types - Matching your backend models exactly
export interface PlanFeatures {
  [key: string]: any;
}

export interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: 'USD' | 'INR';
  billing_cycle: 'monthly' | 'yearly' | 'lifetime';
  credits: number;
  features: PlanFeatures;
  status: 'active' | 'inactive' | 'deprecated';
  created_at: string;
}

export interface Organization {
  _id: string;
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

// Updated Transaction interface to match backend TransactionResponse
export interface Transaction {
  _id: string;
  plan_name: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  credits_added: number;
  created_at: string;
}

// Updated Subscription interface to match backend SubscriptionResponse
export interface Subscription {
  _id: string;
  plan: Plan;
  status: 'active' | 'expired' | 'cancelled' | 'suspended';
  start_date: string;
  end_date: string;
  auto_renew: boolean;
}

// Request Types for your backend
export interface InitiatePaymentRequest {
  plan_id: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
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
  ): Promise<BackendResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    console.log(`Making request to: ${url}`);
    console.log(`Request headers:`, headers);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(`Response from ${endpoint}:`, data);

    if (!response.ok) {
      // Handle validation errors (422) specifically
      if (response.status === 422 && data.detail) {
        const validationErrors = data.detail.map((err: any) => err.msg).join(', ');
        throw new Error(`Validation Error: ${validationErrors}`);
      }

      // Handle other errors
      const errorMessage = data.message || data.detail || `HTTP error! status: ${response.status}`;
      const error = new Error(errorMessage) as any;
      error.status = response.status;
      error.detail = data.detail;
      throw error;
    }

    return data as BackendResponse<T>;
  }

  // Plan Management APIs
  async getPlans(status?: 'active' | 'inactive' | 'deprecated'): Promise<Plan[]> {
    const params = status ? `?status=${status}` : '';
    const response = await this.request<Plan[]>(`/api/payments/plans${params}`);
    return response.data;
  }

  // Organization APIs
  async getOrganizations(): Promise<Organization[]> {
    const response = await this.request<Organization[]>('/api/payments/organizations');
    return response.data;
  }

  // Payment Processing APIs
  async initiatePayment(planId: string): Promise<PaymentInitiation> {
    if (!planId || typeof planId !== 'string' || planId.trim() === '') {
      throw new Error('Invalid plan ID provided');
    }

    try {
      console.log('Initiating payment for plan_id:', planId);

      const requestBody: InitiatePaymentRequest = { plan_id: planId.trim() };
      console.log('Payment initiation request:', requestBody);

      const response = await this.request<PaymentInitiation>('/api/payments/initiate', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      console.log('Payment initiation response:', response);
      return response.data;
    } catch (error: any) {
      console.error('Payment initiation failed:', error);

      // Handle specific error cases from your backend
      if (error.status === 404) {
        throw new Error('User not found. Please sign in again.');
      }
      if (error.status === 400) {
        throw new Error('Invalid plan selected. Please try again.');
      }
      if (error.status === 401) {
        throw new Error('Session expired. Please sign in again.');
      }
      if (error.status === 422) {
        throw new Error('Invalid request data. Please check the plan selection.');
      }

      const errorMessage = error.message || 'Failed to initiate payment. Please try again.';
      throw new Error(errorMessage);
    }
  }

  async verifyPayment(paymentData: PaymentVerificationRequest): Promise<void> {
    try {
      await this.request<null>('/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    } catch (error: any) {
      if (error.status === 400) {
        throw new Error('Invalid payment signature. Payment verification failed.');
      }
      if (error.status === 404) {
        throw new Error('Transaction not found. Please contact support.');
      }
      throw error;
    }
  }

  // Transaction and Subscription APIs - Updated to match your backend exactly
  async getTransactions(limit = 20, offset = 0): Promise<Transaction[]> {
    console.log(`Fetching transactions with limit=${limit}, offset=${offset}`);
    const response = await this.request<Transaction[]>(
      `/api/payments/transactions?limit=${limit}&offset=${offset}`
    );
    console.log('Transactions response:', response);
    return response.data;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    console.log('Fetching user subscriptions');
    const response = await this.request<Subscription[]>('/api/payments/subscriptions');
    console.log('Subscriptions response:', response);
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

  console.log(`Fetching public plans from: ${url}`);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log('Public plans response:', data);

  if (!response.ok) {
    if (response.status === 422 && data.detail) {
      const validationErrors = data.detail.map((err: any) => err.msg).join(', ');
      throw new Error(`Validation Error: ${validationErrors}`);
    }

    const errorMessage = data.message || data.detail || `HTTP error! status: ${response.status}`;
    console.error('Failed to fetch public plans:', errorMessage);
    throw new Error(errorMessage);
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

  console.log(`Fetching filtered plans from: ${url}`);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log('Filtered plans response:', data);

  if (!response.ok) {
    if (response.status === 422 && data.detail) {
      const validationErrors = data.detail.map((err: any) => err.msg).join(', ');
      throw new Error(`Validation Error: ${validationErrors}`);
    }

    const errorMessage = data.message || data.detail || `HTTP error! status: ${response.status}`;
    console.error('Failed to fetch filtered plans:', errorMessage);
    throw new Error(errorMessage);
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
  try {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: currency.toUpperCase() === 'INR' ? 0 : 2,
    });
    return formatter.format(amount);
  } catch (error) {
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  }
};

// Check if user is eligible for educational discount
export const checkEducationalDiscount = (email: string): boolean => {
  const educationalDomains = [
    '.edu',
    '.edu.in',
    '.ac.in',
    'vishnu.edu.in',
    'student.',
    'students.'
  ];

  return educationalDomains.some(domain =>
    email.toLowerCase().includes(domain.toLowerCase())
  );
};

// Format discount information
export const formatDiscount = (originalAmount: number, finalAmount: number, currency: string): string => {
  const discount = originalAmount - finalAmount;
  const percentage = ((discount / originalAmount) * 100).toFixed(0);
  return `Save ${formatCurrency(discount, currency)} (${percentage}% off)`;
};

// Plan comparison helper
export const comparePlans = (plans: Plan[]) => {
  return plans.sort((a, b) => a.price - b.price);
};
