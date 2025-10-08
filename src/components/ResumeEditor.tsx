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
  Target,
  Plus,
  X,
  Github,
  Linkedin
} from 'lucide-react';
import type { ResumeData, BasicDetails, Experience } from '../types/resume';

interface ResumeEditorProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditor({ resumeData, onChange }: ResumeEditorProps) {
  const [expandedSections] = useState({
    basic: true,
    about: true,
    experience: true
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

  const addExperience = () => {
    onChange({
      ...resumeData,
      experience: [...resumeData.experience, { 
        jobTitle: '', 
        employer: '', 
        city: '', 
        country: '', 
        startMonth: '', 
        startYear: '', 
        endMonth: '', 
        endYear: '',
        // Legacy fields
        year: '', 
        company: '', 
        location: '', 
        role: '', 
        position: '', 
        description: '' 
      }]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({ ...resumeData, experience: newExperience });
    setSaveStatus('unsaved');
  };

  const removeExperience = (index: number) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
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
                      First Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.firstName || ''}
                      onChange={(e) => updateBasicDetails('firstName', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#60a5fa' } as React.CSSProperties}
                      placeholder="Diya"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <User className="form-label-icon" style={{ color: '#60a5fa' }} />
                      Surname
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.surname || ''}
                      onChange={(e) => updateBasicDetails('surname', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#60a5fa' } as React.CSSProperties}
                      placeholder="Agarwal"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin className="form-label-icon" style={{ color: '#34d399' }} />
                      City
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.city || ''}
                      onChange={(e) => updateBasicDetails('city', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                      placeholder="New Delhi"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin className="form-label-icon" style={{ color: '#34d399' }} />
                      Country
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.country || ''}
                      onChange={(e) => updateBasicDetails('country', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                      placeholder="India"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin className="form-label-icon" style={{ color: '#34d399' }} />
                      Pin Code
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.pinCode || ''}
                      onChange={(e) => updateBasicDetails('pinCode', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                      placeholder="110034"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone className="form-label-icon" style={{ color: '#f472b6' }} />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={resumeData.basicdetails.phone}
                      onChange={(e) => updateBasicDetails('phone', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#f472b6' } as React.CSSProperties}
                      placeholder="+91 11 1234 5677"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail className="form-label-icon" style={{ color: '#a78bfa' }} />
                      Email*
                    </label>
                    <input
                      type="email"
                      value={resumeData.basicdetails.email}
                      onChange={(e) => updateBasicDetails('email', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#a78bfa' } as React.CSSProperties}
                      placeholder="shashank8877xxdprakash@gmail.com"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Github className="form-label-icon" style={{ color: '#6b7280' }} />
                      GitHub
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.github || ''}
                      onChange={(e) => updateBasicDetails('github', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#6b7280' } as React.CSSProperties}
                      placeholder="GitHub"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Linkedin className="form-label-icon" style={{ color: '#0077b5' }} />
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.linkedin || ''}
                      onChange={(e) => updateBasicDetails('linkedin', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#0077b5' } as React.CSSProperties}
                      placeholder="LinkedIn"
                    />
                    <div className="form-input-overlay"></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Briefcase className="form-label-icon" style={{ color: '#fb923c' }} />
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={resumeData.basicdetails.title}
                      onChange={(e) => updateBasicDetails('title', e.target.value)}
                      className="form-input"
                      style={{ '--focus-color': '#fb923c' } as React.CSSProperties}
                      placeholder="Software Engineer"
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

            {/* Experience Section */}
            {expandedSections.experience && (
              <div className="form-section">
                <div className="section-header">
                  <div className="section-header-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                    <Briefcase className="section-icon" style={{ color: '#f59e0b' }} />
                  </div>
                  <h2 className="section-header-title">Experience</h2>
                  <button
                    onClick={addExperience}
                    className="add-item-button"
                    type="button"
                  >
                    <Plus className="add-icon" />
                    Add Experience
                  </button>
                </div>

                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="item-header">
                      <h3 className="item-title">Experience {index + 1}</h3>
                      <button
                        onClick={() => removeExperience(index)}
                        className="remove-item-button"
                        type="button"
                      >
                        <X className="remove-icon" />
                      </button>
                    </div>

                    <div className="form-grid form-grid-2">
                      <div className="form-group">
                        <label className="form-label">
                          <Briefcase className="form-label-icon" style={{ color: '#f59e0b' }} />
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle || ''}
                          onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                          className="form-input"
                          style={{ '--focus-color': '#f59e0b' } as React.CSSProperties}
                          placeholder="Retail Sales Associate"
                        />
                        <div className="form-input-overlay"></div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Briefcase className="form-label-icon" style={{ color: '#f59e0b' }} />
                          Employer
                        </label>
                        <input
                          type="text"
                          value={exp.employer || ''}
                          onChange={(e) => updateExperience(index, 'employer', e.target.value)}
                          className="form-input"
                          style={{ '--focus-color': '#f59e0b' } as React.CSSProperties}
                          placeholder="ZARA"
                        />
                        <div className="form-input-overlay"></div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <MapPin className="form-label-icon" style={{ color: '#34d399' }} />
                          City
                        </label>
                        <input
                          type="text"
                          value={exp.city || ''}
                          onChange={(e) => updateExperience(index, 'city', e.target.value)}
                          className="form-input"
                          style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                          placeholder="New Delhi"
                        />
                        <div className="form-input-overlay"></div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <MapPin className="form-label-icon" style={{ color: '#34d399' }} />
                          Country
                        </label>
                        <input
                          type="text"
                          value={exp.country || ''}
                          onChange={(e) => updateExperience(index, 'country', e.target.value)}
                          className="form-input"
                          style={{ '--focus-color': '#34d399' } as React.CSSProperties}
                          placeholder="India"
                        />
                        <div className="form-input-overlay"></div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <div className="date-inputs">
                          <div className="date-input-group">
                            <label className="date-sub-label">Month</label>
                            <select
                              value={exp.startMonth || ''}
                              onChange={(e) => updateExperience(index, 'startMonth', e.target.value)}
                              className="form-input"
                              style={{ '--focus-color': '#8b5cf6' } as React.CSSProperties}
                            >
                              <option value="">Select</option>
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">March</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">July</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                          </div>
                          <div className="date-input-group">
                            <label className="date-sub-label">Year</label>
                            <input
                              type="number"
                              value={exp.startYear || ''}
                              onChange={(e) => updateExperience(index, 'startYear', e.target.value)}
                              className="form-input"
                              style={{ '--focus-color': '#8b5cf6' } as React.CSSProperties}
                              placeholder="2023"
                              min="1950"
                              max="2030"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <div className="date-inputs">
                          <div className="date-input-group">
                            <label className="date-sub-label">Month</label>
                            <select
                              value={exp.endMonth || ''}
                              onChange={(e) => updateExperience(index, 'endMonth', e.target.value)}
                              className="form-input"
                              style={{ '--focus-color': '#8b5cf6' } as React.CSSProperties}
                            >
                              <option value="">Select</option>
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">March</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">July</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                          </div>
                          <div className="date-input-group">
                            <label className="date-sub-label">Year</label>
                            <input
                              type="number"
                              value={exp.endYear || ''}
                              onChange={(e) => updateExperience(index, 'endYear', e.target.value)}
                              className="form-input"
                              style={{ '--focus-color': '#8b5cf6' } as React.CSSProperties}
                              placeholder="2024"
                              min="1950"
                              max="2030"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {resumeData.experience.length === 0 && (
                  <div className="empty-state">
                    <p className="empty-state-text">No experience added yet. Click "Add Experience" to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}