import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreviewPage from './pages/ResumePreviewPage';
import BackendTest from './components/BackendTest';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route 
            path="/builder" 
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resume-preview" 
            element={
              <ProtectedRoute>
                <ResumePreviewPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/test" element={<BackendTest />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}