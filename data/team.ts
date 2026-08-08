export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  branch: string;
  year: string;
  bio: string;
  photo: string;
  skills: string[];
  projects: { title: string; description: string; link?: string }[];
  achievements: string[];
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    email?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    slug: "aman-tiwari",
    name: "Aman Tiwari",
    role: "Founder",
    branch: "Computer Science & Engineering",
    year: "Graduated",
    bio: "Founder-level responsibilities include community direction, planning, partnerships, and public engagement.",
    photo: "/images/team/aman.jpg",
    skills: ["Community Building", "Public Speaking", "Strategic Planning"],
    projects: [
      { title: "Nexus Platform", description: "Strategic direction and growth of Nexus student community initiatives.", link: "https://vexta.collegecrm.in" }
    ],
    achievements: ["Founded Nexus Community", "Built student-led learning ecosystem", "Keynote Speaker"],
    social: {
      linkedin: "https://www.linkedin.com/in/aman-tiwari-dev",
      email: "aman@nexus.com"
    }
  },
  {
    id: "12",
    slug: "jaya-pandey",
    name: "Jaya Pandey",
    role: "Community Lead",
    branch: "Computer Science & Engineering",
    year: "4th Year",
    bio: "Coordinates community activities, communication, and initiatives that help students connect and learn together.",
    photo: "/images/team/jaya.jpg",
    skills: ["Public Relations", "Team Management", "Leadership"],
    projects: [
      { title: "Community Outreach", description: "Coordinated student engagement activities and cross-department initiatives.", link: "#" }
    ],
    achievements: ["Community Lead", "Led 15+ student development activities"],
    social: {
      linkedin: "https://www.linkedin.com/in/jaya-pandey-439204311",
      instagram: "https://instagram.com"
    }
  },
  {
    id: "13",
    slug: "ashray-dwivedi",
    name: "Ashray Dwivedi",
    role: "Community Co-Lead",
    branch: "Cyber Security",
    year: "4th Year",
    bio: "Supports community operations, event planning, and student engagement alongside the community leadership team.",
    photo: "/images/team/ashray.jpg",
    skills: ["Strategic Growth", "Communication", "Event Planning"],
    projects: [
      { title: "Student Operations", description: "Supported workshop planning, operations, and peer engagement.", link: "#" }
    ],
    achievements: ["Community Co-Lead", "Coordinated student learning drives"],
    social: {
      linkedin: "https://www.linkedin.com/in/ashray-dwivedi-b89295211"
    }
  },
  {
    id: "2",
    slug: "subid-kant-nigam",
    name: "Subid Kant Nigam",
    role: "Technical Lead",
    branch: "Cyber Security",
    year: "4th Year",
    bio: "Leads technical initiatives, coding activities, and development-focused learning within Nexus.",
    photo: "/images/team/subid.jpg",
    skills: ["Web Development", "Full Stack Development", "Competitive Programming"],
    projects: [
      { title: "Technical Learning Portal", description: "Development-focused coding challenges and problem-solving tracks.", link: "#" }
    ],
    achievements: ["Technical Lead at Nexus", "Solved 500+ coding challenges", "Hackathon Finalist"],
    social: {
      linkedin: "https://www.linkedin.com/in/subid-kant-nigam-3339142ab"
    }
  },
  {
    id: "3",
    slug: "etesh-singh",
    name: "Etesh Singh",
    role: "Technical Co-Lead",
    branch: "Computer Science",
    year: "4th Year",
    bio: "Supports technical development, coding initiatives, and mentoring activities within Nexus.",
    photo: "/images/team/etesh.jpg",
    skills: ["Frontend Development", "Node.js", "Express"],
    projects: [
      { title: "Coding Infrastructure", description: "Supported web development tools and technical workshop labs.", link: "#" }
    ],
    achievements: ["Technical Co-Lead", "Winner of College Coding Sprint"],
    social: {
      linkedin: "https://www.linkedin.com/in/etesh-singh-132675294"
    }
  },
  {
    id: "10",
    slug: "chitransh-singh",
    name: "Chitransh Singh",
    role: "Technical Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports technical activities, coding events, and other technical initiatives within the Nexus community.",
    photo: "/images/team/chitransh.jpg",
    skills: ["Java", "Data Structures", "Algorithms"],
    projects: [
      { title: "Coding Event Tools", description: "Technical setup and problem-solving tracks for coding events.", link: "#" }
    ],
    achievements: ["Technical Coordinator", "Top ranker in coding challenges"],
    social: {
      linkedin: "https://www.linkedin.com/in/chitransh-singh-rathour-279b94352"
    }
  },
  {
    id: "11",
    slug: "praval-srivastav",
    name: "Praval Srivastav",
    role: "Content Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Creates and manages content for Nexus, including community updates, educational resources, and student-focused communications.",
    photo: "/images/team/praval.jpg",
    skills: ["Copywriting", "Creative Writing", "Blogging"],
    projects: [
      { title: "Nexus Communications", description: "Educational resources, community updates, and written publications.", link: "#" }
    ],
    achievements: ["Content Coordinator", "Curated successful learning guides"],
    social: {
      linkedin: "https://www.linkedin.com/in/praval-srivastav-68017a381"
    }
  },
  {
    id: "14",
    slug: "samarth-singh",
    name: "Samarth Singh",
    role: "Event & PR Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports event planning, community activities, and communication initiatives at Nexus.",
    photo: "/images/team/samarth.jpg",
    skills: ["Event Organization", "Public Relations", "Communication"],
    projects: [
      { title: "Event Operations", description: "Planning and executing student activities and community meetups.", link: "#" }
    ],
    achievements: ["Event & PR Coordinator", "Recognized for seamless event management"],
    social: {
      linkedin: "https://www.linkedin.com/in/samarth-singh-057926367"
    }
  },
  {
    id: "15",
    slug: "divyanshi-singh",
    name: "Divyanshi Singh",
    role: "Event & PR Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports event promotion, communication, and coordination for Nexus activities.",
    photo: "/images/team/divyanshi.jpg",
    skills: ["Strategic Planning", "Marketing", "Event Hosting"],
    projects: [
      { title: "Event Promotions", description: "Promotional strategies and student onboarding for community activities.", link: "#" }
    ],
    achievements: ["Event & PR Coordinator", "Successfully onboarded 300+ students"],
    social: {
      linkedin: "https://www.linkedin.com/in/divyanshi-singh-4ba9123b7"
    }
  },
  {
    id: "16",
    slug: "aditya-nath-patel",
    name: "Aditya Nath Patel",
    role: "Event & PR Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports event coordination, public relations, and student engagement across Nexus activities.",
    photo: "/images/team/aditya-patel.jpg",
    skills: ["Event Coordination", "Public Relations", "Student Engagement"],
    projects: [
      { title: "Public Relations Drive", description: "Coordinated student engagement and logistics for events.", link: "#" }
    ],
    achievements: ["Event & PR Coordinator", "Coordinated 4+ student activities"],
    social: {
      linkedin: "https://www.linkedin.com/in/adityanathpatel"
    }
  },
  {
    id: "17",
    slug: "saumy-chaurasia",
    name: "Saumy Chaurasia",
    role: "Event & PR Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports PR activities, event coordination, and communication for Nexus initiatives.",
    photo: "/images/team/saumy.jpg",
    skills: ["PR Management", "Campaign Planning", "Scheduling"],
    projects: [
      { title: "PR Campaigns", description: "Event schedules and communication campaigns for Nexus activities.", link: "#" }
    ],
    achievements: ["Event & PR Coordinator", "Curated campaign media for events"],
    social: {
      linkedin: "https://www.linkedin.com/in/saumy-chaurasia"
    }
  },
  {
    id: "7",
    slug: "sumaiya-khan",
    name: "Sumaiya Khan",
    role: "Social Media Co-Lead",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Supports Nexus's social media presence through content creation, visual design, and digital communication.",
    photo: "/images/team/sumaiya.jpg",
    skills: ["Content Creation", "Graphic Designing", "Video Editing"],
    projects: [
      { title: "Visual Branding", description: "Designed digital communication assets and social media graphics.", link: "#" }
    ],
    achievements: ["Social Media Co-Lead", "Designed promotional campaigns for Nexus events"],
    social: {
      linkedin: "https://www.linkedin.com/in/sumaiya-khan-a9b017328"
    }
  },
  {
    id: "8",
    slug: "lakshya-verma",
    name: "Lakshya Verma",
    role: "Technical Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports technical activities, contest coordination, and website-related initiatives at Nexus.",
    photo: "/images/team/lakshya.jpg",
    skills: ["C++", "HTML/CSS", "Git"],
    projects: [
      { title: "Website Initiatives", description: "Website maintenance, bug fixes, and technical contest support.", link: "#" }
    ],
    achievements: ["Technical Coordinator", "Organized 5+ college coding sprints"],
    social: {
      linkedin: "https://www.linkedin.com/in/lakshya-verma-448a50365"
    }
  },
  {
    id: "9",
    slug: "sakshi-kashyap",
    name: "Sakshi Kashyap",
    role: "Technical Coordinator",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Supports technical workshops, bootcamps, and learning activities within the Nexus community.",
    photo: "/images/team/sakshi.jpg",
    skills: ["Python", "DSA Basics", "Technical Writing"],
    projects: [
      { title: "Workshop Labs", description: "Assisted in setting up hands-on technical labs and workshops.", link: "#" }
    ],
    achievements: ["Technical Coordinator", "Recognized for student support in workshops"],
    social: {
      linkedin: "https://www.linkedin.com/in/sakshi-kashyap-36a11238b"
    }
  },
  {
    id: "4",
    slug: "kirti-srivastava",
    name: "Kirti Srivastava",
    role: "Content Lead",
    branch: "Computer Science & Engineering",
    year: "4th Year",
    bio: "Leads content creation and documentation for Nexus, including educational resources and community updates.",
    photo: "/images/team/kirti.jpg",
    skills: ["Content Writing", "Technical Documentation", "Copywriting"],
    projects: [
      { title: "Educational Resources", description: "Documenting learning guides and structured content.", link: "#" }
    ],
    achievements: ["Content Lead", "Published 20+ educational guides"],
    social: {
      linkedin: "https://www.linkedin.com/in/kirti-srivastava-2270a9331"
    }
  },
  {
    id: "5",
    slug: "vanshika-saxena",
    name: "Vanshika Saxena",
    role: "Event & PR Lead",
    branch: "Computer Science",
    year: "3rd Year",
    bio: "Leads event planning and public relations activities, coordinating initiatives and student engagement.",
    photo: "/images/team/vanshika.jpg",
    skills: ["Event Management", "Public Relations", "Communication"],
    projects: [
      { title: "Event Management", description: "End-to-end planning of technical activities and public relations.", link: "#" }
    ],
    achievements: ["Event & PR Lead", "Successfully managed 10+ community events"],
    social: {
      linkedin: "https://www.linkedin.com/in/vanshika-saxena-039518329"
    }
  },
  {
    id: "6",
    slug: "mansi-ranjan",
    name: "Mansi Ranjan",
    role: "Social Media Lead",
    branch: "Computer Science & Engineering",
    year: "4th Year",
    bio: "Leads Nexus's social media initiatives, creating content and managing the community's online presence.",
    photo: "/images/team/mansi.jpg",
    skills: ["Social Media Marketing", "Content Strategy"],
    projects: [
      { title: "Social Outreach", description: "Strategic campaigns shaping Nexus's online presence.", link: "#" }
    ],
    achievements: ["Social Media Lead", "Increased community engagement by 150%"],
    social: {
      linkedin: "https://www.linkedin.com/in/mansi-ranjan-6873113aa"
    }
  },
  {
    id: "18",
    slug: "vaibhvi-agarwal",
    name: "Vaibhvi Agarwal",
    role: "Content Coordinator",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Creating engaging content for Nexus, including community updates, event promotions, and student-focused posts.",
    photo: "/images/team/vaibhvi.jpg",
    skills: ["Content Writing", "Copywriting", "Social Media Content", "Communication"],
    projects: [
      { title: "Content Pipeline", description: "Engaging posts, event promotions, and community updates.", link: "#" }
    ],
    achievements: ["Content Coordinator", "Created top engaging community posts"],
    social: {
      linkedin: "https://www.linkedin.com/company/nexus-23176/"
    }
  }
];
