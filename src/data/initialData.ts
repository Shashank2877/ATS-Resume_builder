import type { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  basicdetails: {
    name: "Olivia Sanchez",
    title: "Marketing Manager",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    website: "www.reallygreatsite.com",
    address: "123 Anywhere St, Any City"
  },
  about: "Motivated professional with strong problem-solving skills, seeking to contribute value in a dynamic organization.",
  education: [
    {
      year: "2020 – 2023",
      degree: "Bachelor of Design",
      university: "Borceile University"
    },
    {
      year: "2016 – 2020",
      degree: "Bachelor of Business",
      university: "Borceile University"
    },
    {
      year: "2010 – 2014",
      degree: "Bachelor of Business",
      university: "Wardiere University"
    }
  ],
  skills: [
    "Management Skills",
    "Creativity",
    "Digital Marketing",
    "Critical Thinking",
    "Leadership",
    "Branding"
  ],
  certifications: [
    "Google Digital Marketing Certification",
    "HubSpot Inbound Marketing",
    "Project Management Professional (PMP)"
  ],
  experience: [
    {
      year: "2020 – 2023",
      company: "Ginyard International Co.",
      location: "Sydney, Australia",
      role: "Product Design Manager",
      description: "Led product design initiatives to improve user experience and drive growth."
    },
    {
      year: "2019 – 2020",
      company: "Wardiere Inc.",
      location: "Sydney, Australia",
      role: "Product Design Manager",
      description: "Led product design initiatives to improve user experience and drive growth."
    },
    {
      year: "2017 – 2019",
      company: "Wardiere Inc.",
      location: "Sydney, Australia",
      role: "Product Design Manager",
      description: "Led product design initiatives to improve user experience and drive growth."
    }
  ],
  projects: [
    {
      name: "Brand Redesign Strategy",
      result: "Increased client engagement by 40%"
    },
    {
      name: "E-commerce Growth Campaign",
      result: "Boosted revenue by 30%"
    },
    {
      name: "Social Media Analytics Dashboard",
      result: "Improved insights reporting"
    }
  ]
};