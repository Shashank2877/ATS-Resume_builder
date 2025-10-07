import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Clock, Trophy, Target, Shield, Zap, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials, AuthError } from '../types/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error?.field === name) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.email) {
      setError({ message: 'Email is required', field: 'email' });
      setIsLoading(false);
      return;
    }
    if (!formData.password) {
      setError({ message: 'Password is required', field: 'password' });
      setIsLoading(false);
      return;
    }

    const result = await login(formData);
    if (result.success) {
      navigate('/');
    } else if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-1/4 animate-float">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float animation-delay-1000">
        <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-2000">
        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
          </div>

          <div className="relative z-10 animate-slideInLeft">
            <div className="mb-8">
              <Sparkles className="w-12 h-12 text-white mb-4" />
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                Create a resume you are 
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text">
                  proud of
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 animate-fadeInUp animation-delay-200">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Save time with hassle-free templates</h3>
                  <p className="text-indigo-100 text-sm">Professional templates designed by experts</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-fadeInUp animation-delay-400">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Beat the competition</h3>
                  <p className="text-indigo-100 text-sm">Using actionable, contextual advice</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-fadeInUp animation-delay-600">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Highlight key achievements</h3>
                  <p className="text-indigo-100 text-sm">With memorable visuals and formatting</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-fadeInUp animation-delay-800">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Get inspired by 1800+ examples</h3>
                  <p className="text-indigo-100 text-sm">Free Resume Examples and Templates</p>
                </div>
              </div>
            </div>

            <div className="mt-12 animate-fadeInUp animation-delay-1000">
              <div className="flex items-center space-x-2 text-indigo-200">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md animate-slideInRight">
            {/* Login Form Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sign in your account
                </h2>
                <p className="text-gray-600">Welcome back! Please enter your details.</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('linkedin')}
                  className="w-full bg-[#0077b5] hover:bg-[#005885] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>Continue with LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl border border-gray-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
                
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Continue with Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or use your email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-shake">
                    <p className="text-red-600 text-sm font-medium">{error.message}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        error?.field === 'email' 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 bg-white/70 backdrop-blur-sm hover:border-indigo-300'
                      }`}
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        error?.field === 'password' 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 bg-white/70 backdrop-blur-sm hover:border-indigo-300'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-3">
                <Link 
                  to="/forgot-password" 
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </Link>
                <p className="text-gray-600 text-sm">
                  First time here?{' '}
                  <Link 
                    to="/register" 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}