export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  credits: number;
  auth_provider?: string;
}

export interface AuthData {
  user: User;
  access_token: string;
  token_type: string;
}

export interface AuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: AuthData;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface CreditsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    credits: number;
  };
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: UserUpdateRequest) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

export interface ApiError {
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
  message?: string;
}
