export interface CandidateProfile {
  education: string;
  skills: string[];
  interests: string[];
  location: string;
  preferredLocation: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  matchScore: number;
}

export interface FormStep {
  id: number;
  title: string;
  completed: boolean;
}