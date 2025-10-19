import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from '../config/environment';

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  status?: number;
}

// Request interceptor config
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipRetry?: boolean;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private retryCount = new Map<string, number>();

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.apiConfig.baseURL,
      timeout: config.apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (requestConfig) => {
        const token = this.getAuthToken();
        
        // Add auth header if token exists and not skipped
        if (token && !(requestConfig as any).skipAuth) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        requestConfig.headers['X-Request-ID'] = this.generateRequestId();

        config.log('API Request:', {
          method: requestConfig.method?.toUpperCase(),
          url: requestConfig.url,
          data: requestConfig.data
        });

        return requestConfig;
      },
      (error) => {
        config.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        config.log('API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data
        });

        // Reset retry count on successful request
        const requestKey = this.getRequestKey(response.config);
        this.retryCount.delete(requestKey);

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as RequestConfig;
        
        if (originalRequest) {
          const requestKey = this.getRequestKey(originalRequest);
          const currentRetryCount = this.retryCount.get(requestKey) || 0;

          // Handle token expiration
          if (error.response?.status === 401 && !originalRequest.skipAuth) {
            this.handleTokenExpiration();
            return Promise.reject(this.formatError(error));
          }

          // Retry logic for network errors and 5xx errors
          if (
            !originalRequest.skipRetry &&
            currentRetryCount < config.apiConfig.retryAttempts &&
            this.shouldRetry(error)
          ) {
            this.retryCount.set(requestKey, currentRetryCount + 1);
            
            config.log(`Retrying request (attempt ${currentRetryCount + 1}):`, originalRequest.url);
            
            // Exponential backoff
            const delay = Math.pow(2, currentRetryCount) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            return this.axiosInstance(originalRequest);
          }

          // Clear retry count if max retries exceeded
          this.retryCount.delete(requestKey);
        }

        config.error('API Error:', error);
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem(`${config.storageConfig.localStoragePrefix}token`);
  }

  private handleTokenExpiration(): void {
    // Clear stored tokens
    localStorage.removeItem(`${config.storageConfig.localStoragePrefix}token`);
    sessionStorage.removeItem(`${config.storageConfig.sessionStoragePrefix}user`);
    
    // Redirect to login if not already there
    if (window.location.pathname !== '/signin') {
      window.location.href = '/signin';
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getRequestKey(config: AxiosRequestConfig): string {
    return `${config.method}_${config.url}`;
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.response) {
      // Network errors
      return true;
    }

    const status = error.response.status;
    // Retry on 5xx errors and specific 4xx errors
    return status >= 500 || status === 408 || status === 429;
  }

  private formatError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const data = error.response.data as any;
      return {
        message: data?.message || error.message || 'An error occurred',
        code: data?.code || error.code,
        details: data?.details || data,
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR'
      };
    } else {
      // Request setup error
      return {
        message: error.message || 'Request failed',
        code: 'REQUEST_ERROR'
      };
    }
  }

  // Public API methods
  public async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload method
  public async uploadFile<T>(url: string, file: File, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: RequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, uploadConfig);
    return response.data;
  }

  // Set authentication token
  public setAuthToken(token: string): void {
    localStorage.setItem(`${config.storageConfig.localStoragePrefix}token`, token);
  }

  // Clear authentication
  public clearAuth(): void {
    localStorage.removeItem(`${config.storageConfig.localStoragePrefix}token`);
    sessionStorage.removeItem(`${config.storageConfig.sessionStoragePrefix}user`);
  }

  // Health check
  public async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health', { skipAuth: true });
      return true;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export service instance and types
export type { RequestConfig };