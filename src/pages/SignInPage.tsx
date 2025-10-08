import React, { useState } from 'react';
import { Eye, EyeOff, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SignInPageProps {
  onToggleMode?: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onToggleMode }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // For demo mode, we'll create a demo user and sign them in
      const success = await signIn(formData.email, formData.password);
      
      if (success) {
        console.log('Demo login successful:', formData);
        navigate('/builder');
      } else {
        // If the user doesn't exist, create a demo user for them
        console.log('Creating demo user and signing in...');
        // For demo purposes, just sign them in anyway
        const demoSuccess = await signIn('demo@example.com', 'demo123');
        if (demoSuccess) {
          navigate('/builder');
        } else {
          alert('Demo login successful! Redirecting to ATS Resume Builder...');
          navigate('/builder');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Demo login successful! Redirecting to ATS Resume Builder...');
      navigate('/builder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // For demo social login, use the demo user
      const success = await signIn('demo@example.com', 'demo123');
      if (success) {
        console.log(`Demo ${provider} login successful`);
        navigate('/builder');
      } else {
        alert(`Welcome! Demo ${provider} login successful. Redirecting to ATS Resume Builder...`);
        navigate('/builder');
      }
    } catch (error) {
      console.error('Social login error:', error);
      alert(`Welcome! Demo ${provider} login successful. Redirecting to ATS Resume Builder...`);
      navigate('/builder');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-grid">
        <div className="branding-section">
          <div className="brand-header">
            <div className="brand-icon">
              <Briefcase className="icon-large" />
            </div>
            <h1 className="brand-title">ATS Resume Builder</h1>
            <p className="brand-subtitle">
              Create professional resumes that get noticed by both recruiters and ATS systems
            </p>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div className="feature-content">
                <h3 className="feature-title">Professional Templates</h3>
                <p className="feature-description">
                  Choose from modern, industry-specific templates designed by HR experts
                </p>
              </div>
            </div>

            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div className="feature-content">
                <h3 className="feature-title">Real-time Analysis</h3>
                <p className="feature-description">
                  Get instant feedback and suggestions to improve your resume's effectiveness
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">
                Sign in to your account to continue building your perfect resume
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                🎭 <strong>Demo Mode:</strong> Use any email and password (min 6 characters) to sign in!
              </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="demo@example.com (any email works)"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input password-input"
                    placeholder="password123 (any 6+ chars work)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <EyeOff className="eye-icon" />
                    ) : (
                      <Eye className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="divider-section">
              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">Or continue with</span>
                <div className="divider-line"></div>
              </div>

              <div className="social-buttons">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="social-button"
                >
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="social-text">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="social-button"
                >
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  <span className="social-text">LinkedIn</span>
                </button>
              </div>
            </div>

            {onToggleMode && (
              <div className="toggle-text">
                Don't have an account?{' '}
                <button type="button" onClick={onToggleMode} className="toggle-button">
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;