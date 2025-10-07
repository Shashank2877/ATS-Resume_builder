import { forwardRef } from 'react';
import type { ResumeData, ATSAnalysis } from '../types/resume';
import { MapPin, Phone, Mail, Globe, User, GraduationCap, Briefcase, Award, Target, Lightbulb } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  atsAnalysis?: ATSAnalysis | null;
  showATSHighlights?: boolean;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData, atsAnalysis, showATSHighlights = false }, ref) => {
    const highlightKeywords = (text: string): string => {
      if (!showATSHighlights || !atsAnalysis?.keywords) return text;
      
      let highlightedText = text;
      atsAnalysis.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        highlightedText = highlightedText.replace(regex, `<span class="highlighted-keyword">$&</span>`);
      });
      return highlightedText;
    };

    return (
      <div ref={ref} className="resume-preview print:shadow-none print:border-none">
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {resumeData.basicdetails.name}
          </h1>
          <p className="text-xl text-primary-600 font-medium mb-4">
            {resumeData.basicdetails.title}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            {resumeData.basicdetails.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{resumeData.basicdetails.phone}</span>
              </div>
            )}
            {resumeData.basicdetails.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{resumeData.basicdetails.email}</span>
              </div>
            )}
            {resumeData.basicdetails.website && (
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{resumeData.basicdetails.website}</span>
              </div>
            )}
            {resumeData.basicdetails.address && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.basicdetails.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* About Me */}
            {resumeData.about && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <User className="h-5 w-5 text-primary-600" />
                  <span>About Me</span>
                </h2>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightKeywords(resumeData.about) }}
                />
              </section>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <Lightbulb className="h-5 w-5 text-primary-600" />
                  <span>Skills</span>
                </h2>
                <div className="space-y-2">
                  {resumeData.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(`• ${skill}`) }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <Award className="h-5 w-5 text-primary-600" />
                  <span>Certifications</span>
                </h2>
                <div className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(`• ${cert}`) }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <Briefcase className="h-5 w-5 text-primary-600" />
                  <span>Professional Experience</span>
                </h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                          <p className="text-primary-600 font-medium">{exp.company}</p>
                          <p className="text-gray-600 text-sm">{exp.location}</p>
                        </div>
                        <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                          {exp.year}
                        </span>
                      </div>
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(exp.description) }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <GraduationCap className="h-5 w-5 text-primary-600" />
                  <span>Education</span>
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-primary-600">{edu.university}</p>
                      </div>
                      <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2 border-b border-gray-300 pb-2">
                  <Target className="h-5 w-5 text-primary-600" />
                  <span>Key Projects</span>
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <div 
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(project.result) }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* ATS Score Badge */}
        {showATSHighlights && atsAnalysis && (
          <div className="fixed top-4 right-4 z-50">
            <div className={`ats-score ${
              atsAnalysis.score >= 80 ? 'high' : 
              atsAnalysis.score >= 60 ? 'medium' : 'low'
            }`}>
              ATS Score: {atsAnalysis.score}%
            </div>
          </div>
        )}
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;