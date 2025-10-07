import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Eye, Edit3, BarChart3, LogOut, User } from 'lucide-react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import ATSAnalyzer from '../components/ATSAnalyzer';
import ExportTools from '../components/ExportTools';
import { initialResumeData } from '../data/initialData';
import type { ResumeData, ATSAnalysis } from '../types/resume';

export default function ResumeBuilder() {
  const { user, signOut, getUserResume, saveUserResume } = useAuth();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'ats'>('edit');
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [atsAnalysis, setATSAnalysis] = useState<ATSAnalysis | null>(null);
  const [showATSHighlights, setShowATSHighlights] = useState(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  // Load user's resume data on component mount
  useEffect(() => {
    const userResume = getUserResume();
    if (userResume) {
      setResumeData(userResume);
    } else {
      // Set initial data with user's name if available
      if (user?.name) {
        setResumeData(prev => ({
          ...prev,
          basicdetails: {
            ...prev.basicdetails,
            name: user.name,
            email: user.email
          }
        }));
      }
    }
  }, [user, getUserResume]);

  // Save resume data whenever it changes
  useEffect(() => {
    saveUserResume(resumeData);
  }, [resumeData, saveUserResume]);

  const handleResumeChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleATSAnalysis = (analysis: ATSAnalysis) => {
    setATSAnalysis(analysis);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">ATS Resume Builder</h1>
              {user && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Tab Navigation */}
              <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'ats'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">ATS</span>
                </button>
              </nav>

              {/* Export Button */}
              <div className="hidden sm:block">
                <ExportTools resumeData={resumeData} resumeRef={resumePreviewRef} />
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-soft">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Resume</h2>
                  <p className="text-gray-600 mt-1">Update your information in real-time</p>
                </div>
                <div className="p-6">
                  <ResumeEditor resumeData={resumeData} onChange={handleResumeChange} />
                </div>
              </div>
            )}

            {activeTab === 'ats' && (
              <div className="bg-white rounded-xl shadow-soft">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">ATS Analysis</h2>
                      <p className="text-gray-600 mt-1">Optimize for Applicant Tracking Systems</p>
                    </div>
                    <button
                      onClick={() => setShowATSHighlights(!showATSHighlights)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        showATSHighlights
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {showATSHighlights ? 'Hide' : 'Show'} Keywords
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ATSAnalyzer
                    resumeData={resumeData}
                    onAnalysis={handleATSAnalysis}
                    analysis={atsAnalysis}
                  />
                </div>
              </div>
            )}

            {/* Mobile Export Tools */}
            <div className="sm:hidden bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Resume</h3>
              <ExportTools resumeData={resumeData} resumeRef={resumePreviewRef} />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                <p className="text-gray-600 mt-1">See how your resume looks</p>
              </div>
              <div className="p-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <ResumePreview
                    ref={resumePreviewRef}
                    resumeData={resumeData}
                    atsAnalysis={atsAnalysis}
                    showATSHighlights={showATSHighlights}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}