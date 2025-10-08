import { useState, useEffect, useCallback } from 'react';
import type { ResumeData, ATSAnalysis, ATSKeywords } from '../types/resume';
import { BarChart3, AlertCircle, CheckCircle, TrendingUp, Search, Target } from 'lucide-react';

interface ATSAnalyzerProps {
  resumeData: ResumeData;
  onAnalysis: (analysis: ATSAnalysis) => void;
  analysis: ATSAnalysis | null;
}

const commonATSKeywords: ATSKeywords = {
  technical: [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS', 'SQL', 'Git',
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'API', 'REST', 'GraphQL',
    'Machine Learning', 'Data Analysis', 'Excel', 'PowerBI', 'Tableau', 'Agile', 'Scrum'
  ],
  soft: [
    'Leadership', 'Communication', 'Problem-solving', 'Teamwork', 'Critical thinking',
    'Creativity', 'Adaptability', 'Time management', 'Project management', 'Collaboration',
    'Analytical', 'Strategic', 'Innovation', 'Mentoring', 'Negotiation'
  ],
  industry: [
    'Marketing', 'Sales', 'Finance', 'Operations', 'Strategy', 'Business development',
    'Customer service', 'Product management', 'Digital marketing', 'Brand management',
    'Quality assurance', 'Risk management', 'Compliance', 'Process improvement'
  ]
};

export default function ATSAnalyzer({ resumeData, onAnalysis, analysis }: ATSAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const analyzeResume = useCallback(() => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const allText = `
        ${resumeData.basicdetails.name} ${resumeData.basicdetails.title}
        ${resumeData.about}
        ${resumeData.techSkills.join(' ')} ${resumeData.softSkills.join(' ')}
        ${resumeData.certifications.map(cert => typeof cert === 'string' ? cert : cert.name).join(' ')}
        ${resumeData.experience.map(exp => `${exp.role} ${exp.company} ${exp.description}`).join(' ')}
        ${resumeData.projects.map(proj => `${proj.name} ${proj.result}`).join(' ')}
        ${jobDescription}
      `.toLowerCase();

      // Find matching keywords
      const allKeywords = [
        ...commonATSKeywords.technical,
        ...commonATSKeywords.soft,
        ...commonATSKeywords.industry,
        ...selectedKeywords
      ];

      const foundKeywords = allKeywords.filter(keyword => 
        allText.includes(keyword.toLowerCase())
      );

      // Calculate score
      const uniqueKeywords = [...new Set(foundKeywords)];
      const baseScore = Math.min((uniqueKeywords.length / 20) * 100, 100);
      
      // Bonus points for specific sections
      let bonus = 0;
      if (resumeData.about.length > 50) bonus += 5;
      if ((resumeData.techSkills.length + resumeData.softSkills.length) >= 6) bonus += 5;
      if (resumeData.experience.length >= 2) bonus += 5;
      if (resumeData.certifications.length >= 1) bonus += 5;
      
      const finalScore = Math.min(baseScore + bonus, 100);

      // Generate suggestions
      const suggestions = [];
      if (resumeData.about.length < 50) suggestions.push('Add a more detailed professional summary');
      if ((resumeData.techSkills.length + resumeData.softSkills.length) < 6) suggestions.push('Include more relevant skills');
      if (uniqueKeywords.length < 10) suggestions.push('Include more industry-specific keywords');
      if (resumeData.experience.some(exp => exp.description.length < 50)) {
        suggestions.push('Provide more detailed job descriptions');
      }

      // Find missing keywords from job description
      const jobKeywords = jobDescription.toLowerCase().split(/\W+/).filter(word => word.length > 3);
      const missingKeywords = jobKeywords.filter(keyword => 
        !allText.includes(keyword) && keyword.length > 3
      ).slice(0, 10);

      const analysisResult: ATSAnalysis = {
        score: Math.round(finalScore),
        keywords: uniqueKeywords.slice(0, 15),
        suggestions,
        missingKeywords
      };

      onAnalysis(analysisResult);
      setIsAnalyzing(false);
    }, 2000);
  }, [resumeData, selectedKeywords, jobDescription, onAnalysis]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  useEffect(() => {
    // Auto-analyze when resume data changes
    const timer = setTimeout(() => {
      if (resumeData) {
        analyzeResume();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [resumeData, selectedKeywords, jobDescription, analyzeResume]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary-600" />
          <span>ATS Analysis</span>
        </h2>
        
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              analysis.score >= 80 ? 'bg-green-50 border border-green-200' :
              analysis.score >= 60 ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className={`text-3xl font-bold ${
                analysis.score >= 80 ? 'text-green-600' :
                analysis.score >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {analysis.score}%
              </div>
              <div className="text-sm text-gray-600">ATS Score</div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
              <div className="text-3xl font-bold text-blue-600">{analysis.keywords.length}</div>
              <div className="text-sm text-gray-600">Keywords Found</div>
            </div>
            
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
              <div className="text-3xl font-bold text-purple-600">{analysis.suggestions.length}</div>
              <div className="text-sm text-gray-600">Improvements</div>
            </div>
          </div>
        )}
      </div>

      {/* Job Description Input */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Job Description Analysis</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Job Description (Optional)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="input-field resize-none"
              placeholder="Paste the job description here to get targeted keyword analysis..."
            />
          </div>
          <button
            onClick={analyzeResume}
            disabled={isAnalyzing}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Keyword Suggestions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Keyword Suggestions</span>
        </h3>
        
        <div className="space-y-4">
          {Object.entries(commonATSKeywords).map(([category, keywords]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2 capitalize">
                {category.replace('_', ' ')} Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {keywords.slice(0, 12).map((keyword: string) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedKeywords.includes(keyword)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Found Keywords */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Keywords Found in Resume</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          {analysis.missingKeywords.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span>Missing Keywords from Job Description</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Improvement Suggestions</span>
            </h3>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800">{suggestion}</span>
                </div>
              ))}
              {analysis.suggestions.length === 0 && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Great job! Your resume looks well-optimized for ATS systems.</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}