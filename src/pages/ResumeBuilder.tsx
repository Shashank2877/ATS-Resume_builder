import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Wand2, Loader2 } from 'lucide-react';
import AIResumeGenerator from '../services/AIResumeGenerator';
import { useFormController, useSectionVisibility } from '../hooks/useFormController';
import { resumeApi } from '../services/backendApi';
import { initialResumeData } from '../data/initialData';
import EnvironmentSelector from '../components/EnvironmentSelector';
import type { ResumeData } from '../types/resume';
import './ResumeBuilder.css';

export default function ResumeBuilder() {
  const navigate = useNavigate();
  
  // Use the new form management hooks
  const {
    formData: resume,
    errors,
    isValid,
    updateField,
    patchArray,
    validateForm,
    resetForm,
    setFormData
  } = useFormController(initialResumeData);

  const {
    sectionVisibility,
    toggleSection
  } = useSectionVisibility({
    experience: true,
    projects: true,
    certifications: true
  });

  // AI Processing State
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Environment selector state
  const [showEnvSelector, setShowEnvSelector] = useState(false);

  // Helper functions for array operations
  const addItem = (section: string) => {
    const templates = {
      education: { 
        institution: '', 
        degree: '', 
        specialization: '',
        startDate: '',
        endDate: '',
        location: '',
        cgpa: '',
        percentage: '',
        year: '',
        university: ''
      },
      experience: { 
        company: '', 
        position: '',
        location: '', 
        startDate: '',
        endDate: '',
        description: '',
        year: '', 
        role: '' 
      },
      projects: { 
        name: '', 
        description: '', 
        technologies: [],
        startDate: '',
        endDate: '',
        github: '',
        demo: '',
        result: '' 
      },
      techSkills: '',
      softSkills: '',
      certifications: { name: '', issuer: '', issueDate: '', link: '' }
    };
    
    patchArray(section, 'add', undefined, (templates as any)[section]);
  };

  const removeItem = (section: string, index: number) => {
    patchArray(section, 'remove', index);
  };

  // AI Resume Generation Function
  const generateATSResume = async () => {
    setApiError(null);
    
    // Validate the form before generation
    if (!validateForm()) {
      setApiError('Please fix the form errors before generating your resume.');
      return;
    }

    // Basic validation for required fields
    if (!resume.basicdetails.name || !resume.basicdetails.email) {
      setApiError('Please fill in at least your name and email before generating your resume.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Try to generate using API first, fall back to local AI service
      let optimizedResume;
      
      try {
        // Use the API service for AI generation
        optimizedResume = await resumeApi.saveAndGenerate(resume, {
          targetRole: resume.basicdetails.title || 'Software Engineer',
          industry: 'technology',
          experienceLevel: 'mid',
          atsOptimization: true,
          keywordDensity: 'medium'
        });
        
        // Extract the actual resume data from the backend response
        if (optimizedResume.success && optimizedResume.data) {
          optimizedResume = optimizedResume.data.optimizedResume;
        }
      } catch (apiError) {
        console.log('API generation failed, falling back to local service:', apiError);
        // Fallback to local AI service (your friend's implementation)
        optimizedResume = await AIResumeGenerator.generateOptimizedResume(resume as any, {
          targetRole: resume.basicdetails.title || 'Software Engineer',
          industry: 'technology',
          experienceLevel: 'mid',
          atsOptimization: true,
          keywordDensity: 'medium'
        });
      }
      
      // Navigate to preview page with the generated resume data
      navigate('/resume-preview', {
        state: {
          generatedResume: optimizedResume,
          sectionVisibility: sectionVisibility
        }
      });
    } catch (error) {
      console.error('Error generating ATS resume:', error);
      setApiError('Sorry, there was an error generating your resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="form-layout">
      {/* Environment Selector */}
      <EnvironmentSelector 
        isVisible={showEnvSelector} 
        onToggle={() => setShowEnvSelector(!showEnvSelector)} 
      />
      
      {/* FORM PANEL */}
      <div className="form-panel-centered">
        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">ATS Resume Builder</h1>
            <p className="form-subtitle">Fill in your details and let AI create an ATS-optimized resume for you</p>
          </div>

          {/* Basic Details */}
          <FormSection title="Basic Details">
            <FormInput label="Full Name *" value={resume.basicdetails.name} onChange={(v) => updateField('basicdetails', '', 'name', v)} placeholder="John Doe" />
            <FormInput label="Job Title *" value={resume.basicdetails.title} onChange={(v) => updateField('basicdetails', '', 'title', v)} placeholder="Software Engineer" />
            <FormInput label="Email *" value={resume.basicdetails.email} onChange={(v) => updateField('basicdetails', '', 'email', v)} placeholder="john@example.com" />
            <FormInput label="Phone" value={resume.basicdetails.phone || ''} onChange={(v) => updateField('basicdetails', '', 'phone', v)} placeholder="+1-234-567-8900" />
            <FormInput label="Website" value={resume.basicdetails.website || ''} onChange={(v) => updateField('basicdetails', '', 'website', v)} placeholder="www.johndoe.com" />
            <FormInput label="Address" value={resume.basicdetails.address || ''} onChange={(v) => updateField('basicdetails', '', 'address', v)} placeholder="123 Main St, City, State" />
          </FormSection>

          {/* About */}
          <FormSection title="Professional Summary">
            <FormTextarea label="About Yourself" value={resume.about} onChange={(v) => updateField('about', '', null, v)} placeholder="Brief description of your professional background and goals..." />
          </FormSection>

          {/* Education */}
          <FormSection title="Education" onAdd={() => addItem('education')}>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="form-item">
                {resume.education.length > 1 && (
                  <button onClick={() => removeItem('education', idx)} className="form-remove-btn">
                    <Trash2 size={14} />
                  </button>
                )}
                <FormInput label="Year" value={edu.year} onChange={(v) => updateField('education', idx, 'year', v)} placeholder="2020 - 2024" />
                <FormInput label="Degree" value={edu.degree} onChange={(v) => updateField('education', idx, 'degree', v)} placeholder="Bachelor of Computer Science" />
                <FormInput label="University" value={edu.university} onChange={(v) => updateField('education', idx, 'university', v)} placeholder="University Name" />
                <FormInput label="GPA/CGPA (optional)" value={edu.cgpa || ''} onChange={(v) => updateField('education', idx, 'cgpa', v)} placeholder="3.8/4.0 or 8.5/10" />
              </div>
            ))}
          </FormSection>

          {/* Experience */}
          {sectionVisibility.experience ? (
            <FormSection title="Work Experience" onAdd={() => addItem('experience')}>
              <div className="section-options">
                <button 
                  type="button" 
                  onClick={() => toggleSection('experience')} 
                  className="remove-section-btn"
                >
                  I don't have work experience
                </button>
              </div>
              {resume.experience?.map((exp, idx) => (
                <div key={idx} className="form-item">
                  {(resume.experience?.length || 0) > 1 && (
                    <button onClick={() => removeItem('experience', idx)} className="form-remove-btn">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <FormInput label="Duration" value={exp.year} onChange={(v) => updateField('experience', idx, 'year', v)} placeholder="Jan 2023 - Present" />
                  <FormInput label="Company" value={exp.company} onChange={(v) => updateField('experience', idx, 'company', v)} placeholder="Company Name" />
                  <FormInput label="Job Title" value={exp.role} onChange={(v) => updateField('experience', idx, 'role', v)} placeholder="Software Developer" />
                  <FormInput label="Location" value={exp.location} onChange={(v) => updateField('experience', idx, 'location', v)} placeholder="City, State" />
                  <FormTextarea label="Job Description" value={exp.description} onChange={(v) => updateField('experience', idx, 'description', v)} placeholder="Describe your responsibilities and achievements..." />
                </div>
              ))}
            </FormSection>
          ) : (
            <div className="hidden-section">
              <div className="hidden-section-header">
                <span className="hidden-section-title">Work Experience Section Hidden</span>
                <button 
                  type="button" 
                  onClick={() => toggleSection('experience')} 
                  className="restore-section-btn"
                >
                  Add Work Experience
                </button>
              </div>
              <p className="hidden-section-note">Perfect for students and fresh graduates. You can add work experience later if needed.</p>
            </div>
          )}

          {/* Technical Skills */}
          <FormSection title="Technical Skills" onAdd={() => addItem('techSkills')}>
            {resume.techSkills.map((skill, idx) => (
              <div key={idx} className="form-list-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateField('techSkills', idx, null, e.target.value)}
                  className="form-list-input"
                  placeholder="e.g., React, Python, AWS, MongoDB"
                />
                {resume.techSkills.length > 1 && (
                  <button onClick={() => removeItem('techSkills', idx)} className="form-list-remove-btn">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </FormSection>

          {/* Soft Skills */}
          <FormSection title="Soft Skills" onAdd={() => addItem('softSkills')}>
            {resume.softSkills.map((skill, idx) => (
              <div key={idx} className="form-list-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateField('softSkills', idx, null, e.target.value)}
                  className="form-list-input"
                  placeholder="e.g., Leadership, Communication, Problem Solving"
                />
                {resume.softSkills.length > 1 && (
                  <button onClick={() => removeItem('softSkills', idx)} className="form-list-remove-btn">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </FormSection>

          {/* Projects */}
          <FormSection title="Projects" onAdd={() => addItem('projects')}>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="form-item">
                {resume.projects.length > 1 && (
                  <button onClick={() => removeItem('projects', idx)} className="form-remove-btn">
                    <Trash2 size={14} />
                  </button>
                )}
                <FormInput label="Project Name" value={proj.name} onChange={(v) => updateField('projects', idx, 'name', v)} placeholder="My Awesome Project" />
                <FormTextarea label="Description & Results" value={proj.result} onChange={(v) => updateField('projects', idx, 'result', v)} placeholder="What did you build and what impact did it have?" />
                <FormInput label="GitHub/Demo Link" value={proj.github || ''} onChange={(v) => updateField('projects', idx, 'github', v)} placeholder="https://github.com/username/project" />
                <FormInput label="Technologies Used" value={proj.technologies} onChange={(v) => updateField('projects', idx, 'technologies', v)} placeholder="React, Node.js, MongoDB" />
              </div>
            ))}
          </FormSection>

          {/* Certifications */}
          <FormSection title="Certifications (Optional)" onAdd={() => addItem('certifications')}>
            {resume.certifications?.map((cert, idx) => (
              <div key={idx} className="form-item">
                {(resume.certifications?.length || 0) > 1 && (
                  <button onClick={() => removeItem('certifications', idx)} className="form-remove-btn">
                    <Trash2 size={14} />
                  </button>
                )}
                <FormInput label="Certification Name" value={cert.name} onChange={(v) => updateField('certifications', idx, 'name', v)} placeholder="AWS Certified Developer" />
                <FormInput label="Certificate Link (optional)" value={cert.link || ''} onChange={(v) => updateField('certifications', idx, 'link', v)} placeholder="https://certificate-link.com" />
              </div>
            ))}
          </FormSection>

          {/* AI Generation Button */}
          <div className="ai-generation-section">
            <h3 className="ai-section-title">AI-Powered Resume Optimization</h3>
            <p className="ai-section-description">
              Our AI will analyze your information and create an ATS-optimized resume that gets past screening systems and impresses recruiters.
            </p>
            
            {/* Error Display */}
            {apiError && (
              <div className="error-message">
                <strong>Error:</strong> {apiError}
              </div>
            )}
            
            {/* Form Validation Errors */}
            {!isValid && Object.keys(errors).length > 0 && (
              <div className="validation-errors">
                <h4>Please fix the following errors:</h4>
                <ul>
                  {Object.entries(errors).map(([section, sectionErrors]) => {
                    if (typeof sectionErrors === 'string') {
                      return <li key={section}>{sectionErrors}</li>;
                    } else if (typeof sectionErrors === 'object') {
                      return Object.entries(sectionErrors as any).map(([field, error]) => (
                        <li key={`${section}.${field}`}>
                          <strong>{section}.{field}:</strong> {error as string}
                        </li>
                      ));
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
            
            <button 
              onClick={generateATSResume}
              disabled={isGenerating}
              className={`generate-ats-btn ${isGenerating ? 'generating' : ''}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Your ATS Resume...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate My ATS Resume
                </>
              )}
            </button>
            <p className="ai-disclaimer">
              * Fields marked with asterisk are required
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
}

function FormSection({ title, children, onAdd }: FormSectionProps) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="form-section-title">{title}</h2>
        {onAdd && (
          <button onClick={onAdd} className="form-add-btn">
            <Plus size={18} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function FormInput({ label, value, onChange, placeholder }: FormInputProps) {
  return (
    <div className="form-input-group">
      <label className="form-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function FormTextarea({ label, value, onChange, placeholder }: FormTextareaProps) {
  return (
    <div className="form-input-group">
      <label className="form-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="form-textarea"
        placeholder={placeholder}
      />
    </div>
  );
}