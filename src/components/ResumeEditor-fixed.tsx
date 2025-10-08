import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Sparkles, 
  Save, 
  Eye,
  MapPin,
  Target
} from 'lucide-react';
import type { ResumeData, BasicDetails } from '../types/resume';

interface ResumeEditorProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditor({ resumeData, onChange }: ResumeEditorProps) {
  const [expandedSections] = useState({
    basic: true,
    about: true
  });
  
  const [saveStatus, setSaveStatus] = useState('');

  const updateBasicDetails = (field: keyof BasicDetails, value: string) => {
    onChange({
      ...resumeData,
      basicdetails: {
        ...resumeData.basicdetails,
        [field]: value
      }
    });
    setSaveStatus('unsaved');
  };

  const updateAbout = (value: string) => {
    onChange({
      ...resumeData,
      about: value
    });
    setSaveStatus('unsaved');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  return (
    <div className="dynamic-resume-editor">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
      </div>

      <div className="editor-container">
        {/* Header */}
        <div className="editor-header">
          <div className="editor-title-card">
            <Sparkles className="sparkle-icon" />
            <h1 className="editor-title">Edit Resume</h1>
            <Sparkles className="sparkle-icon" />
          </div>
          <p className="editor-subtitle">Update your information in real-time</p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={handleSave}
            className="save-button"
          >
            <div className="button-overlay"></div>
            <div className="button-content">
              <Save className="button-icon" />
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
            </div>
          </button>
          
          <button className="preview-button">
            <div className="button-content">
              <Eye className="button-icon" />
              Preview
            </div>
          </button>
        </div>

        <div className="main-content">
          <div className="content-card">
            {/* Basic Information Section */}
            {expandedSections.basic && (
              <div className="form-section">
                <div className="section-header">
                  <div className="section-header-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                    <User className="section-icon" style={{ color: '#60a5fa' }} />
                  </div>
                  <h2 className="section-header-title">Basic Information</h2>
                </div>

                <div className="form-grid form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      <User className="form-label-icon" style={{ color: '#60a5fa' }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.name}
                      onChange={(e) => updateBasicDetails('name', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#60a5fa' } as React.CSSProperties}
                      placeholder="Enter your full name"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Briefcase className="form-label-icon" style={{ color: '#a78bfa' }} />
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.title}
                      onChange={(e) => updateBasicDetails('title', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#a78bfa' } as React.CSSProperties}
                      placeholder="Your job title"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone className="form-label-icon" style={{ color: '#34d399' }} />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={resumeData.basicdetails.phone}
                      onChange={(e) => updateBasicDetails('phone', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                      placeholder="+1 234 567 8900"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail className="form-label-icon" style={{ color: '#f472b6' }} />
                      Email
                    </label>
                    <input
                      type="email"
                      value={resumeData.basicdetails.email}
                      onChange={(e) => updateBasicDetails('email', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#f472b6' } as React.CSSProperties}
                      placeholder="your@email.com"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">
                      <MapPin className="form-label-icon" style={{ color: '#fb923c' }} />
                      Location
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.address}
                      onChange={(e) => updateBasicDetails('address', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#fb923c' } as React.CSSProperties}
                      placeholder="City, State, Country"
                    />
                    <div className="form-input-overlay"></div>
                  </div>
                </div>

                {/* AI Suggestions Card */}
                <div className="ai-tip-card">
                  <div className="ai-tip-content">
                    <Sparkles className="ai-tip-icon" />
                    <div>
                      <h4 className="ai-tip-title">AI Tip</h4>
                      <p className="ai-tip-text">Make sure your professional title includes relevant keywords for better ATS optimization. Try "Senior Marketing Manager | Digital Strategy Expert"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {expandedSections.about && (
              <div className="form-section">
                <div className="section-header">
                  <div className="section-header-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                    <Target className="section-icon" style={{ color: '#a78bfa' }} />
                  </div>
                  <h2 className="section-header-title">About Me</h2>
                </div>
                <div className="form-group">
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    value={resumeData.about}
                    onChange={(e) => updateAbout(e.target.value)}
                    className="form-input form-textarea"
                    style={{ '--focus-color': '#a78bfa' } as React.CSSProperties}
                    placeholder="Write a compelling summary about yourself..."
                  />
                  <div className="form-input-overlay"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}