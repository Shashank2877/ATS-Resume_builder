import { useState } from 'react';
import type { ResumeData, BasicDetails, Education, Experience, Project } from '../types/resume';
import { Plus, Trash2, User, GraduationCap, Briefcase, Award, Target, Lightbulb } from 'lucide-react';

interface ResumeEditorProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditor({ resumeData, onChange }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState('basic');

  const updateBasicDetails = (field: keyof BasicDetails, value: string) => {
    onChange({
      ...resumeData,
      basicdetails: {
        ...resumeData.basicdetails,
        [field]: value
      }
    });
  };

  const updateAbout = (value: string) => {
    onChange({
      ...resumeData,
      about: value
    });
  };

  const addEducation = () => {
    onChange({
      ...resumeData,
      education: [...resumeData.education, { year: '', degree: '', university: '' }]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange({ ...resumeData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    onChange({
      ...resumeData,
      experience: [...resumeData.experience, { year: '', company: '', location: '', role: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({ ...resumeData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    onChange({
      ...resumeData,
      projects: [...resumeData.projects, { name: '', result: '' }]
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...resumeData, projects: newProjects });
  };

  const removeProject = (index: number) => {
    onChange({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    onChange({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    onChange({ ...resumeData, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    onChange({
      ...resumeData,
      certifications: [...resumeData.certifications, '']
    });
  };

  const updateCertification = (index: number, value: string) => {
    const newCertifications = [...resumeData.certifications];
    newCertifications[index] = value;
    onChange({ ...resumeData, certifications: newCertifications });
  };

  const removeCertification = (index: number) => {
    onChange({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index)
    });
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'about', label: 'About Me', icon: Target },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'projects', label: 'Projects', icon: Target }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Resume</h2>
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-3 rounded-lg text-left flex items-center space-x-2 transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <div className="resume-section">
        {activeSection === 'basic' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.basicdetails.name}
                  onChange={(e) => updateBasicDetails('name', e.target.value)}
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={resumeData.basicdetails.title}
                  onChange={(e) => updateBasicDetails('title', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={resumeData.basicdetails.phone}
                  onChange={(e) => updateBasicDetails('phone', e.target.value)}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={resumeData.basicdetails.email}
                  onChange={(e) => updateBasicDetails('email', e.target.value)}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={resumeData.basicdetails.website}
                  onChange={(e) => updateBasicDetails('website', e.target.value)}
                  className="input-field"
                  placeholder="www.yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={resumeData.basicdetails.address}
                  onChange={(e) => updateBasicDetails('address', e.target.value)}
                  className="input-field"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>About Me</span>
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                value={resumeData.about}
                onChange={(e) => updateAbout(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
              />
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Education</span>
              </h3>
              <button onClick={addEducation} className="btn-primary flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Education</span>
              </button>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeEducation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        className="input-field"
                        placeholder="2020 - 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="input-field"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                      <input
                        type="text"
                        value={edu.university}
                        onChange={(e) => updateEducation(index, 'university', e.target.value)}
                        className="input-field"
                        placeholder="University Name"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </h3>
              <button onClick={addExperience} className="btn-primary flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Experience</span>
              </button>
            </div>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          value={exp.year}
                          onChange={(e) => updateExperience(index, 'year', e.target.value)}
                          className="input-field"
                          placeholder="2020 - 2023"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(index, 'role', e.target.value)}
                          className="input-field"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          className="input-field"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(index, 'location', e.target.value)}
                          className="input-field"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        rows={3}
                        className="input-field resize-none"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Skills</span>
              </h3>
              <button onClick={addSkill} className="btn-primary flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </button>
            </div>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Enter a skill"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Certifications</span>
              </h3>
              <button onClick={addCertification} className="btn-primary flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Certification</span>
              </button>
            </div>
            <div className="space-y-2">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => updateCertification(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Enter certification name"
                  />
                  <button
                    onClick={() => removeCertification(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Projects</span>
              </h3>
              <button onClick={addProject} className="btn-primary flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeProject(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                        className="input-field"
                        placeholder="Project name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Result/Achievement</label>
                      <input
                        type="text"
                        value={project.result}
                        onChange={(e) => updateProject(index, 'result', e.target.value)}
                        className="input-field"
                        placeholder="e.g. Increased user engagement by 40%"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}