// Mock data for War Observe website

export const teamMembers = [
  {
    id: 1,
    name: "Egor Brailyan",
    position: "Head of the analytical department, journalist",
    email: "office@warobserve.com",
    image: "https://www.warobserve.com/img/team/EB.jpg",
    bio: "Experienced journalist specializing in conflict analysis and international relations with over 8 years in the field."
  },
  {
    id: 2,
    name: "Bohdana Bondarenko",
    position: "Director of international communications, journalist",
    email: "office@warobserve.com",
    image: "https://www.warobserve.com/img/team/BB.jfif",
    bio: "International communications expert with extensive experience in media relations and conflict reporting."
  },
  {
    id: 3,
    name: "Oleh Denysenko",
    position: "Manager of analytical projects, photocorrespondent",
    email: "office@warobserve.com",
    image: "https://www.warobserve.com/img/team/%D0%9E%D0%9E.jpeg",
    bio: "Analytical projects manager and photojournalist documenting conflicts and humanitarian crises."
  },
  {
    id: 4,
    name: "Valeria Skvortsova",
    position: "Executive director of UCIPR",
    email: "valeriia.skvortsova@ucipr.org.ua",
    image: "https://www.warobserve.com/img/team/valeria.jpg",
    bio: "Executive director with expertise in public policy and international communications."
  },
  {
    id: 5,
    name: "Bohdan Zaychenko",
    position: "International law expert and human rights expert",
    email: "Office@warobserve.com",
    image: "https://www.warobserve.com/img/team/B.Z..jpeg",
    bio: "International law specialist focusing on human rights violations in armed conflicts."
  }
];

export const newsArticles = [
  {
    id: 1,
    title: "Global Peace Summit: Comprehensive Analysis of International Initiatives",
    excerpt: "A detailed examination of recent global peace initiatives and their potential impact on ongoing conflicts in Eastern Europe.",
    content: "The Global Peace Summit represents a critical juncture in international diplomacy...",
    author: "Egor Brailyan",
    publishedDate: "2024-03-15",
    category: "Analysis",
    imageUrl: "https://images.unsplash.com/photo-1541948840-b5b86b1eea1b?w=800&h=400&fit=crop",
    tags: ["diplomacy", "peace", "ukraine", "international-relations"]
  },
  {
    id: 2,
    title: "Media Coverage Ethics in Active Conflict Zones",
    excerpt: "Exploring the challenges and responsibilities of journalists reporting from war zones while maintaining objectivity and safety.",
    content: "Ethical journalism in conflict zones requires careful balance between truth-telling and safety...",
    author: "Bohdana Bondarenko",
    publishedDate: "2024-03-10",
    category: "Journalism",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
    tags: ["ethics", "journalism", "safety", "conflict-reporting"]
  },
  {
    id: 3,
    title: "Documentation of Human Rights Violations: Legal Framework",
    excerpt: "An analytical study on the legal mechanisms for documenting and prosecuting war crimes in contemporary conflicts.",
    content: "International law provides clear frameworks for documenting human rights violations...",
    author: "Bohdan Zaychenko",
    publishedDate: "2024-03-05",
    category: "Legal Analysis",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=400&fit=crop",
    tags: ["human-rights", "legal-framework", "documentation", "war-crimes"]
  },
  {
    id: 4,
    title: "Youth Engagement in Conflict Resolution: New Perspectives",
    excerpt: "How young journalists and experts are reshaping the narrative around conflict resolution and peace-building efforts.",
    content: "Young voices bring fresh perspectives to traditional conflict resolution approaches...",
    author: "Valeria Skvortsova",
    publishedDate: "2024-02-28",
    category: "Youth Engagement",
    imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=400&fit=crop",
    tags: ["youth", "conflict-resolution", "peace-building", "new-perspectives"]
  }
];

export const researchProjects = [
  {
    id: 1,
    title: "Comprehensive Analysis of International Peace Initiatives",
    description: "An in-depth study examining various international peace initiatives and their effectiveness in resolving contemporary conflicts.",
    status: "Completed",
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    team: ["Egor Brailyan", "Valeria Skvortsova"],
    category: "Peace Studies",
    results: "Published comprehensive report with policy recommendations for international organizations."
  },
  {
    id: 2,
    title: "Media Coverage Impact Assessment",
    description: "Analyzing the impact of media coverage on public perception and policy decisions regarding armed conflicts.",
    status: "In Progress",
    startDate: "2024-02-01",
    endDate: "2024-05-30",
    team: ["Bohdana Bondarenko", "Oleh Denysenko"],
    category: "Media Analysis",
    results: "Preliminary findings show significant correlation between media framing and public support."
  },
  {
    id: 3,
    title: "Legal Documentation Framework for Conflict Zones",
    description: "Developing standardized procedures for legal documentation of human rights violations in active conflict zones.",
    status: "In Progress",
    startDate: "2024-01-10",
    endDate: "2024-06-15",
    team: ["Bohdan Zaychenko", "Egor Brailyan"],
    category: "Legal Framework",
    results: "Framework currently being tested with partner organizations in the field."
  }
];

export const partners = [
  {
    id: 1,
    name: "Ukrainian Crisis Information and Policy Research (UCIPR)",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    description: "Leading Ukrainian think tank focused on crisis research and policy development.",
    website: "https://ucipr.org.ua"
  },
  {
    id: 2,
    name: "European Press Institute",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop",
    description: "Organization supporting press freedom and journalism excellence across Europe.",
    website: "#"
  },
  {
    id: 3,
    name: "International Journalism Safety Institute",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop",
    description: "Dedicated to protecting journalists and promoting safety in conflict reporting.",
    website: "#"
  },
  {
    id: 4,
    name: "Global Peace Research Network",
    logo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&h=100&fit=crop",
    description: "International network of researchers focusing on peace and conflict studies.",
    website: "#"
  }
];

export const resources = [
  {
    id: 1,
    title: "Conflict Reporting Safety Guidelines",
    type: "Guide",
    downloadUrl: "#",
    description: "Comprehensive safety guidelines for journalists working in conflict zones.",
    publishedDate: "2024-02-15",
    fileType: "PDF"
  },
  {
    id: 2,
    title: "International Law Reference Manual",
    type: "Manual",
    downloadUrl: "#",
    description: "Reference manual on international humanitarian law and human rights documentation.",
    publishedDate: "2024-01-20",
    fileType: "PDF"
  },
  {
    id: 3,
    title: "Media Ethics in Conflict Zones Toolkit",
    type: "Toolkit",
    downloadUrl: "#",
    description: "Practical toolkit for maintaining ethical standards in conflict reporting.",
    publishedDate: "2024-03-01",
    fileType: "PDF"
  },
  {
    id: 4,
    title: "Young Journalists Training Materials",
    type: "Training",
    downloadUrl: "#",
    description: "Complete training package for young journalists entering conflict reporting.",
    publishedDate: "2024-02-10",
    fileType: "ZIP"
  }
];

export const donationTiers = [
  {
    id: 1,
    name: "Supporter",
    amount: 25,
    currency: "EUR",
    description: "Help us maintain our research databases and online resources.",
    benefits: ["Monthly newsletter", "Access to research summaries"]
  },
  {
    id: 2,
    name: "Advocate",
    amount: 50,
    currency: "EUR",
    description: "Support our training programs for young journalists.",
    benefits: ["Monthly newsletter", "Access to research summaries", "Invitation to webinars"]
  },
  {
    id: 3,
    name: "Partner",
    amount: 100,
    currency: "EUR",
    description: "Fund field research and analytical projects.",
    benefits: ["Monthly newsletter", "Full research reports", "Webinar access", "Annual impact report"]
  },
  {
    id: 4,
    name: "Champion",
    amount: 250,
    currency: "EUR",
    description: "Enable our comprehensive conflict analysis and documentation work.",
    benefits: ["All previous benefits", "Direct consultation opportunities", "Priority project updates"]
  }
];

export const jobOpenings = [
  {
    id: 1,
    title: "Junior Research Analyst",
    department: "Research",
    location: "Kyiv, Ukraine (Hybrid)",
    type: "Full-time",
    experience: "1-2 years",
    description: "Join our analytical team to research international conflicts and peace initiatives.",
    requirements: ["Bachelor's degree in International Relations, Journalism, or related field", "Strong analytical skills", "Excellent written English", "Knowledge of conflict analysis methodologies"],
    applicationDeadline: "2024-04-30"
  },
  {
    id: 2,
    title: "Communications Specialist",
    department: "Communications",
    location: "Brussels, Belgium",
    type: "Full-time",
    experience: "2-3 years",
    description: "Manage international communications and media relations for our Brussels office.",
    requirements: ["Experience in communications or journalism", "Fluency in English and French", "Social media management skills", "Experience with international organizations"],
    applicationDeadline: "2024-05-15"
  },
  {
    id: 3,
    title: "Legal Documentation Specialist",
    department: "Legal",
    location: "Remote",
    type: "Contract",
    experience: "3+ years",
    description: "Support legal documentation of human rights violations in conflict zones.",
    requirements: ["Law degree with focus on international law", "Experience in human rights documentation", "Knowledge of conflict zones", "Multilingual capabilities preferred"],
    applicationDeadline: "2024-04-20"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    position: "International Relations Professor, University of Cambridge",
    content: "War:Observe provides crucial analytical insights that bridge the gap between academic research and practical conflict resolution. Their work is invaluable for understanding contemporary conflicts.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    position: "Senior Correspondent, Global News Network",
    content: "The resources and training provided by War:Observe have been instrumental in my development as a conflict journalist. Their commitment to ethical reporting is exemplary.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Anna Kowalski",
    position: "Human Rights Lawyer, International Justice Coalition",
    content: "War:Observe's documentation work provides essential evidence for human rights cases. Their meticulous approach to legal documentation sets the standard in the field.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];