import { apiService } from './apiService';
import type { ResumeData } from '../utils/validationSchemas';

// API Request/Response Interfaces matching your backend exactly
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// POST /api/resume/Resume - Upload or update resume JSON data (public)
interface ResumeUploadRequest {
  resumeData: ResumeData;
  userId?: string;
}

// POST /api/resume/Ats_resume - Generate HTML resume (protected)
interface ATSResumeRequest {
  resumeData: ResumeData;
  options?: {
    targetRole?: string;
    industry?: string;
    experienceLevel?: 'entry' | 'mid' | 'senior';
    atsOptimization?: boolean;
    keywordDensity?: 'low' | 'medium' | 'high';
  };
}

interface ATSResumeResponse {
  success: boolean;
  html?: string;
  data?: any;
  message?: string;
}

interface UserResponse {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
}

/**
 * Authentication API Service - matches your /api/auth endpoints
 */
export class AuthApiService {
  /**
   * POST /api/auth - Login with email & password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiService.post('/api/auth', credentials, { skipAuth: true });
      const data = response.data as LoginResponse;
      
      // Store token
      if (data.token) {
        apiService.setAuthToken(data.token);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Invalid email or password. Please try again.');
    }
  }

  /**
   * Logout user
   */
  static logout(): void {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      apiService.clearAuth();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  /**
   * Get current user info
   */
  static getCurrentUser(): { id: string; email: string; name?: string } | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

/**
 * Resume API Service - matches your /api/resume endpoints
 */
export class ResumeApiService {
  /**
   * POST /api/resume/Resume - Upload or update resume JSON data (public endpoint)
   */
  async uploadResume(data: ResumeUploadRequest): Promise<any> {
    try {
      const response = await apiService.post('/api/resume/Resume', data, { skipAuth: true });
      return response.data;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw new Error('Failed to upload resume. Please try again.');
    }
  }

  /**
   * POST /api/resume/Ats_resume - Generate HTML resume layout (protected route)
   */
  async generateATSResume(data: ATSResumeRequest): Promise<ATSResumeResponse> {
    try {
      const response = await apiService.post('/api/resume/Ats_resume', data);
      const result = response.data as ATSResumeResponse;
      return result;
    } catch (error) {
      console.error('Error generating ATS resume:', error);
      throw new Error('Failed to generate ATS resume. Please try again.');
    }
  }

  /**
   * Combined: Save resume data and generate ATS version
   */
  async saveAndGenerate(resumeData: ResumeData, options?: any): Promise<ATSResumeResponse> {
    try {
      // First upload the resume data
      await this.uploadResume({ resumeData });
      
      // Then generate the ATS version (requires authentication)
      const atsRequest: ATSResumeRequest = {
        resumeData,
        options: {
          atsOptimization: true,
          keywordDensity: 'medium',
          ...options
        }
      };
      
      return await this.generateATSResume(atsRequest);
    } catch (error) {
      console.error('Error in save and generate:', error);
      throw new Error('Failed to save and generate resume. Please try again.');
    }
  }
}

/**
 * User API Service - matches your /me endpoint
 */
export class UserApiService {
  /**
   * GET /me - Get details of currently authenticated user
   */
  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await apiService.get('/me');
      return response.data as UserResponse;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user details. Please try again.');
    }
  }
}

// Create singleton instances
export const authApi = AuthApiService;
export const resumeApi = new ResumeApiService();
export const userApi = new UserApiService();

// Export types for use in components
export type {
  LoginRequest,
  LoginResponse,
  ResumeUploadRequest,
  ATSResumeRequest,
  ATSResumeResponse,
  UserResponse
};