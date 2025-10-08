export interface BasicDetails {
  firstName: string;
  surname: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  city: string;
  country: string;
  pinCode: string;
  // Keep legacy fields for backward compatibility
  name: string;
  address: string;
  location: string;
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
  location: string;
  cgpa: string;
  percentage: string;
  // Legacy fields
  year: string;
  university: string;
}

export interface Experience {
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  // Keep legacy fields for backward compatibility
  year: string;
  company: string;
  location: string;
  role: string;
  position: string;
  description: string;
}

export interface Project {
  name: string;
  techStack: string;
  description: string;
  link: string;
  year: string;
  // Legacy fields
  result: string;
  technologies?: string[] | string;
}

export interface Skills {
  programmingLanguages: string;
  librariesFrameworks: string;
  toolsPlatforms: string;
  databases: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Award {
  title: string;
  description: string;
  year: string;
}

export interface ResumeData {
  basicdetails: BasicDetails;
  about: string;
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  experience: Experience[];
  projects: Project[];
  awards: Award[];
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