export interface BasicDetails {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface Education {
  year: string;
  degree: string;
  university: string;
}

export interface Experience {
  year: string;
  company: string;
  location: string;
  role: string;
  description: string;
}

export interface Project {
  name: string;
  result: string;
  description?: string;
  technologies?: string[];
}

export interface ResumeData {
  basicdetails: BasicDetails;
  about: string;
  education: Education[];
  skills: string[];
  certifications: string[];
  experience: Experience[];
  projects: Project[];
}

export interface ATSAnalysis {
  score: number;
  keywords: string[];
  suggestions: string[];
  missingKeywords: string[];
}

export interface ATSKeywords {
  technical: string[];
  soft: string[];
  industry: string[];
}