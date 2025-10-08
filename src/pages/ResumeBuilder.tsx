import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import './ResumeBuilder.css';

export default function ResumeBuilder() {
  const [resume, setResume] = useState({
    basicdetails: {
      name: 'Olivia Sanchez',
      title: 'Marketing Manager',
      phone: '+123-456-7890',
      email: 'hello@reallygreatsite.com',
      website: 'www.reallygreatsite.com',
      address: '123 Anywhere St, Any City'
    },
    about: 'Motivated professional with strong problem-solving skills, seeking to contribute value in a dynamic organization.',
    education: [
      {
        year: '2020 – 2023',
        degree: 'Bachelor of Design',
        university: 'Borceile University',
        cgpa: '8.67'
      }
    ],
    techSkills: [
      'React',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'MongoDB',
      'Python'
    ],
    softSkills: [
      'Leadership',
      'Communication',
      'Problem Solving',
      'Teamwork',
      'Time Management'
    ],
    certifications: [
      { name: 'Google Digital Marketing Certification', link: 'https://skillshop.exceedlms.com/student/path/18128-google-ads-search-certification' },
      { name: 'HubSpot Inbound Marketing', link: 'https://academy.hubspot.com/courses/inbound-marketing' },
      { name: 'Project Management Professional (PMP)', link: 'https://www.pmi.org/certifications/project-management-pmp' }
    ],
    experience: [
      {
        year: '2020 – 2023',
        company: 'Ginyard International Co.',
        location: 'Sydney, Australia',
        role: 'Product Design Manager',
        description: 'Led product design initiatives to improve user experience and drive growth.'
      }
    ],
    projects: [
      {
        name: 'Brand Redesign Strategy',
        result: 'Increased client engagement by 40%',
        github: 'https://github.com/username/brand-redesign',
        technologies: 'React, Node.js, MongoDB'
      }
    ]
  });

  const [sectionVisibility, setSectionVisibility] = useState({
    experience: true,
    projects: true,
    certifications: true
  });

  const updateField = (section: string, index: number | string, field: string | null, value: string) => {
    const newResume = { ...resume };
    if (section === 'basicdetails') {
      (newResume.basicdetails as any)[field as string] = value;
    } else if (section === 'about') {
      newResume.about = value;
    } else if (typeof index === 'number') {
      (newResume as any)[section][index][field as string] = value;
    } else {
      (newResume as any)[section][field as string] = value;
    }
    setResume(newResume);
  };

  const addItem = (section: string) => {
    const newResume = { ...resume };
    const templates = {
      education: { year: '', degree: '', university: '', cgpa: '' },
      experience: { year: '', company: '', location: '', role: '', description: '' },
      projects: { name: '', result: '', github: '', technologies: '' },
      techSkills: '',
      softSkills: '',
      certifications: { name: '', link: '' }
    };
    
    if (Array.isArray((newResume as any)[section])) {
      (newResume as any)[section].push((templates as any)[section]);
    }
    setResume(newResume);
  };

  const removeItem = (section: string, index: number) => {
    const newResume = { ...resume };
    (newResume as any)[section].splice(index, 1);
    setResume(newResume);
  };

  const toggleSection = (section: keyof typeof sectionVisibility) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const downloadPDF = () => {
    const printContent = document.getElementById('resume-preview')?.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Resume</title>');
      printWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:40px;} h1{font-size:32px;margin-bottom:8px;} h2{font-size:18px;font-weight:bold;text-transform:uppercase;border-bottom:2px solid #000;padding-bottom:4px;margin-top:20px;margin-bottom:12px;} h3{font-weight:bold;text-transform:uppercase;margin-bottom:4px;} p{margin:2px 0;} .header{border-bottom:2px solid #000;padding-bottom:12px;margin-bottom:20px;} .section{margin-bottom:20px;} a{color:#2563eb;text-decoration:none;} ul{margin:4px 0;padding-left:20px;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="split-layout">
      
      {/* LEFT SIDE - FORM */}
      <div className="form-panel">
        <div className="form-container">
          <h1 className="form-title">Resume Builder</h1>
          
          {/* Personal Info */}
          <FormSection title="Personal Information">
            <FormInput label="Full Name" value={resume.basicdetails.name} onChange={(v) => updateField('basicdetails', 'name', 'name', v)} />
            <FormInput label="Title" value={resume.basicdetails.title} onChange={(v) => updateField('basicdetails', 'title', 'title', v)} />
            <FormInput label="Phone" value={resume.basicdetails.phone} onChange={(v) => updateField('basicdetails', 'phone', 'phone', v)} />
            <FormInput label="Email" value={resume.basicdetails.email} onChange={(v) => updateField('basicdetails', 'email', 'email', v)} />
            <FormInput label="Website" value={resume.basicdetails.website} onChange={(v) => updateField('basicdetails', 'website', 'website', v)} />
            <FormInput label="Address" value={resume.basicdetails.address} onChange={(v) => updateField('basicdetails', 'address', 'address', v)} />
          </FormSection>

          {/* About */}
          <FormSection title="About Me">
            <FormTextarea label="About" value={resume.about} onChange={(v) => updateField('about', '', null, v)} />
          </FormSection>

          {/* Education */}
          <FormSection title="Education" onAdd={() => addItem('education')}>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="form-item">
                <button onClick={() => removeItem('education', idx)} className="form-remove-btn">
                  <Trash2 size={14} />
                </button>
                <FormInput label="Year" value={edu.year} onChange={(v) => updateField('education', idx, 'year', v)} />
                <FormInput label="Degree" value={edu.degree} onChange={(v) => updateField('education', idx, 'degree', v)} />
                <FormInput label="University" value={edu.university} onChange={(v) => updateField('education', idx, 'university', v)} />
                <FormInput label="CGPA (e.g., 8.67, 9.2)" value={edu.cgpa} onChange={(v) => updateField('education', idx, 'cgpa', v)} />
              </div>
            ))}
          </FormSection>

          {/* Experience */}
          {sectionVisibility.experience ? (
            <FormSection title="Experience" onAdd={() => addItem('experience')}>
              <div className="section-options">
                <button 
                  type="button" 
                  onClick={() => toggleSection('experience')} 
                  className="remove-section-btn"
                >
                  Remove Experience Section (No Experience)
                </button>
              </div>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="form-item">
                  <button onClick={() => removeItem('experience', idx)} className="form-remove-btn">
                    <Trash2 size={14} />
                  </button>
                  <FormInput label="Year" value={exp.year} onChange={(v) => updateField('experience', idx, 'year', v)} />
                  <FormInput label="Company" value={exp.company} onChange={(v) => updateField('experience', idx, 'company', v)} />
                  <FormInput label="Role/Position" value={exp.role} onChange={(v) => updateField('experience', idx, 'role', v)} />
                  <FormInput label="Location" value={exp.location} onChange={(v) => updateField('experience', idx, 'location', v)} />
                  <FormTextarea label="Description" value={exp.description} onChange={(v) => updateField('experience', idx, 'description', v)} />
                </div>
              ))}
            </FormSection>
          ) : (
            <div className="hidden-section">
              <div className="hidden-section-header">
                <span className="hidden-section-title">Experience Section Hidden</span>
                <button 
                  type="button" 
                  onClick={() => toggleSection('experience')} 
                  className="restore-section-btn"
                >
                  Add Experience Section
                </button>
              </div>
              <p className="hidden-section-note">You've chosen to hide the experience section. Click "Add Experience Section" if you want to add work experience.</p>
            </div>
          )}

          {/* Technical Skills */}
          <FormSection title="Technical Skills" onAdd={() => addItem('techSkills')}>
            {resume.techSkills.map((skill, idx) => (
              <div key={idx} className="form-list-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newResume = {...resume};
                    newResume.techSkills[idx] = e.target.value;
                    setResume(newResume);
                  }}
                  className="form-list-input"
                  placeholder="e.g., React, Python, AWS"
                />
                <button onClick={() => removeItem('techSkills', idx)} className="form-list-remove-btn">
                  <Trash2 size={16} />
                </button>
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
                  onChange={(e) => {
                    const newResume = {...resume};
                    newResume.softSkills[idx] = e.target.value;
                    setResume(newResume);
                  }}
                  className="form-list-input"
                  placeholder="e.g., Leadership, Communication"
                />
                <button onClick={() => removeItem('softSkills', idx)} className="form-list-remove-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </FormSection>

          {/* Projects */}
          <FormSection title="Projects" onAdd={() => addItem('projects')}>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="form-item">
                <button onClick={() => removeItem('projects', idx)} className="form-remove-btn">
                  <Trash2 size={14} />
                </button>
                <FormInput label="Project Name" value={proj.name} onChange={(v) => updateField('projects', idx, 'name', v)} />
                <FormTextarea label="Result" value={proj.result} onChange={(v) => updateField('projects', idx, 'result', v)} />
                <FormInput label="GitHub Link" value={proj.github} onChange={(v) => updateField('projects', idx, 'github', v)} />
                <FormInput label="Technologies Used" value={proj.technologies} onChange={(v) => updateField('projects', idx, 'technologies', v)} />
              </div>
            ))}
          </FormSection>

          {/* Certifications */}
          <FormSection title="Certifications" onAdd={() => addItem('certifications')}>
            {resume.certifications.map((cert, idx) => (
              <div key={idx} className="form-item">
                <button onClick={() => removeItem('certifications', idx)} className="form-remove-btn">
                  <Trash2 size={14} />
                </button>
                <FormInput label="Certification Name" value={cert.name} onChange={(v) => updateField('certifications', idx, 'name', v)} />
                <FormInput label="Certification Link" value={cert.link} onChange={(v) => updateField('certifications', idx, 'link', v)} />
              </div>
            ))}
          </FormSection>

        </div>
      </div>

      {/* RIGHT SIDE - LIVE PREVIEW */}
      <div className="preview-panel">
        <div className="preview-header">
          <button onClick={downloadPDF} className="download-pdf-btn">
            <Download size={18} />
            Download PDF
          </button>
        </div>
        
        <div id="resume-preview" className="preview-content">
          {/* Header */}
          <div className="preview-header-section">
            <h1 className="preview-name">{resume.basicdetails.name}</h1>
            <p className="preview-email">{resume.basicdetails.email}</p>
            <p className="preview-phone">{resume.basicdetails.phone}</p>
            <p className="preview-address">{resume.basicdetails.address}</p>
            <p className="preview-links">
              <a href={`https://${resume.basicdetails.website}`} className="preview-link">{resume.basicdetails.website}</a>
            </p>
          </div>

          {/* About Section */}
          {resume.about && (
            <div className="preview-section">
              <h2 className="preview-section-title">ABOUT</h2>
              <p className="preview-section-content">{resume.about}</p>
            </div>
          )}

          {/* Education */}
          <div className="preview-section">
            <h2 className="preview-section-title">EDUCATION</h2>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="preview-item">
                <div className="preview-item-header">
                  <h3 className="preview-item-title">{edu.university}</h3>
                  <span className="preview-item-date">{edu.year}</span>
                </div>
                <p className="preview-item-subtitle">{edu.degree}</p>
                {edu.cgpa && <p className="preview-item-detail">CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </div>

          {/* Experience */}
          {sectionVisibility.experience && (
            <div className="preview-section">
              <h2 className="preview-section-title">EXPERIENCE</h2>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="preview-item">
                  <div className="preview-item-header">
                    <h3 className="preview-item-title">{exp.company} | {exp.role}</h3>
                    <span className="preview-item-date">{exp.location} | {exp.year}</span>
                  </div>
                  <p className="preview-item-description">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          <div className="preview-section">
            <h2 className="preview-section-title">SKILLS</h2>
            
            {resume.techSkills.length > 0 && (
              <div className="preview-skill-category">
                <h3 className="preview-skill-category-title">Technical Skills</h3>
                <div className="preview-skills">
                  {resume.techSkills.map((skill, idx) => (
                    <span key={idx} className="preview-skill-tag technical">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {resume.softSkills.length > 0 && (
              <div className="preview-skill-category">
                <h3 className="preview-skill-category-title">Soft Skills</h3>
                <div className="preview-skills">
                  {resume.softSkills.map((skill, idx) => (
                    <span key={idx} className="preview-skill-tag soft">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="preview-section">
            <h2 className="preview-section-title">PROJECTS / OPEN-SOURCE</h2>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="preview-item">
                <div className="preview-item-header">
                  <h3 className="preview-item-title">{proj.name}</h3>
                  {proj.technologies && <span className="preview-item-tech">{proj.technologies}</span>}
                </div>
                {proj.github && <a href={proj.github} className="preview-project-link" target="_blank" rel="noopener noreferrer">GitHub: {proj.github}</a>}
                <p className="preview-item-description">{proj.result}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="preview-section">
            <h2 className="preview-section-title">CERTIFICATIONS</h2>
            <ul className="preview-list">
              {resume.certifications.map((cert, idx) => (
                <li key={idx} className="preview-cert-item">
                  <span>{cert.name}</span>
                  {cert.link && <a href={cert.link} className="preview-cert-link" target="_blank" rel="noopener noreferrer"> - View Certificate</a>}
                </li>
              ))}
            </ul>
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
}

function FormInput({ label, value, onChange }: FormInputProps) {
  return (
    <div className="form-input-group">
      <label className="form-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FormTextarea({ label, value, onChange }: FormTextareaProps) {
  return (
    <div className="form-input-group">
      <label className="form-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="form-textarea"
      />
    </div>
  );
}