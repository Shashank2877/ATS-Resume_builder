import type { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  basicdetails: {
    firstName: "Shashank",
    surname: "R Prakash",
    title: "Software Engineer",
    phone: "+91 8877xxdprakash@gmail.com",
    email: "shashank8877xxdprakash@gmail.com",
    website: "www.shashankprakash.com",
    github: "GitHub",
    linkedin: "LinkedIn",
    city: "Mysore",
    country: "Karnataka",
    pinCode: "570001",
    // Legacy fields for backward compatibility
    name: "Shashank R Prakash",
    address: "Mysore, Karnataka",
    location: "Mysore, Karnataka"
  },
  about: "Software engineering student with experience in web development and AI technologies. Passionate about creating innovative solutions.",
  education: [
    {
      institution: "VIDYA VARDHAKA COLLEGE OF ENGINEERING",
      degree: "FULL-TIME BACHELOR OF ENGINEERING IN INFORMATION SCIENCE",
      specialization: "Information Science",
      startDate: "2022-08-01",
      endDate: "2026-08-01",
      location: "Mysore, Karnataka",
      cgpa: "8.79",
      percentage: "",
      // Legacy fields
      year: "2022-2026",
      university: "Vidya Vardhaka College of Engineering"
    },
    {
      institution: "SHARADA VIDYA MANDIR",
      degree: "FULL-TIME PCMC PRE UNIVERSITY",
      specialization: "Science",
      startDate: "2020-06-01",
      endDate: "2022-06-01",
      location: "Mysore, Karnataka",
      cgpa: "",
      percentage: "96%",
      // Legacy fields
      year: "2020-2022",
      university: "Sharada Vidya Mandir"
    }
  ],
  skills: {
    programmingLanguages: "Python, C++, JavaScript",
    librariesFrameworks: "React, AWS, Flask, Express.js",
    toolsPlatforms: "Git, VS Code, Kubernetes, Jenkins",
    databases: "SQL, MySQL, MongoDB"
  },
  certifications: [
    {
      name: "Developing Back-end apps with Node.js and React",
      issuer: "IBM - Coursera",
      year: "2024"
    },
    {
      name: "Developing with HTML, CSS, JS: Web3 Applications",
      issuer: "Coursera",
      year: "2024"
    },
    {
      name: "C++ Basic Structures: Vectors, Pointers, Strings, and Files",
      issuer: "Coursera",
      year: "2024"
    }
  ],
  experience: [
    {
      jobTitle: "Intern",
      employer: "NAMMA WEB",
      city: "Bengaluru",
      country: "India",
      startMonth: "09",
      startYear: "2024",
      endMonth: "",
      endYear: "Present",
      description: "Currently interning at NammaWeb LLP, where I contribute to real-world projects in web development and digital solutions. This role is helping me build skills in front-end technologies, UI/UX, and teamwork while gaining hands-on industry experience.",
      // Legacy fields for compatibility
      year: "September - Present",
      company: "NAMMA WEB",
      location: "Bengaluru, India",
      role: "Intern",
      position: "Intern"
    }
  ],
  projects: [
    {
      name: "BOOK REVIEW APPLICATION",
      techStack: "MERN Stack",
      description: "A web application with full CRUD operations for managing book reviews. Users can add books, rate them, write reviews, and update or delete entities. It features user authentication, responsive design, and browsing by ratings or categories.",
      link: "Link",
      year: "2024",
      // Legacy fields
      result: "Full CRUD operations for book management",
      technologies: "MongoDB, Express.js, React, Node.js"
    },
    {
      name: "AI THERAPIST WEBSITE AURA 3.0",
      techStack: "JavaScript, Supabase, OpenAI API",
      description: "Developed a responsive AI-powered mental wellness platform providing personalized therapy-like interactions using JavaScript and Supabase. Designed secure user authentication, real-time chat functionality, and emotion-aware AI responses for enhanced user experience. Implemented scalable backend with Supabase for data management, session tracking, and secure storage of user interactions. Focused on accessibility and intuitive UI/UX to make mental wellness tools more engaging and supportive.",
      link: "Link",
      year: "2024",
      // Legacy fields
      result: "AI-powered mental wellness platform",
      technologies: "JavaScript, Supabase, OpenAI API"
    },
    {
      name: "REACT_FIREBASE CHAT APPLICATION",
      techStack: "AWS, React, Node.js",
      description: "A React-Firebase Chat Application enables real-time messaging using React for the UI and Firebase for backend services like authentication, Firestore, and storage. It supports live updates, secure login, and media sharing. Ideal for scalable, interactive chat platforms.",
      link: "Link",
      year: "2024",
      // Legacy fields
      result: "Real-time messaging application",
      technologies: "React, Firebase, AWS"
    },
    {
      name: "EXO-FINDING: AI-POWERED EXOPLANET DETECTION",
      techStack: "Python, TensorFlow",
      description: "This project is particularly useful for those interested in the intersection of astronomy and machine learning, offering a practical approach to exoplanet detection through data analysis and predictive modeling.",
      link: "Link",
      year: "2024",
      // Legacy fields
      result: "AI-powered exoplanet detection system",
      technologies: "Python, TensorFlow"
    }
  ],
  awards: [
    {
      title: "Represented college at the IEEE Technical Symposium 2023 with a paper on AI-driven cloud optimization",
      description: "Presented research on AI-driven cloud optimization at prestigious technical symposium",
      year: "2023"
    },
    {
      title: "Consistently ranked in the top 5% of the batch for academic performance",
      description: "Maintained excellent academic performance throughout college",
      year: "2022-2024"
    }
  ]
};