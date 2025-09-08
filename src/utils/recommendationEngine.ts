import { CandidateProfile, Internship } from "@/types/internship";
import { internships } from "@/data/internships";

export const generateRecommendations = (profile: CandidateProfile): Internship[] => {
  const recommendedInternships = internships.map(internship => {
    let score = 0;
    let factors = 0;

    // Skill matching (40% weight)
    const skillMatches = profile.skills.filter(skill => 
      internship.requirements.some(req => 
        req.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(req.toLowerCase())
      )
    );
    const skillScore = skillMatches.length / Math.max(profile.skills.length, internship.requirements.length);
    score += skillScore * 0.4;
    factors++;

    // Interest/Sector matching (30% weight)
    const sectorMatch = profile.interests.some(interest => 
      interest.toLowerCase().includes(internship.sector.toLowerCase()) ||
      internship.sector.toLowerCase().includes(interest.toLowerCase()) ||
      internship.title.toLowerCase().includes(interest.toLowerCase()) ||
      internship.description.toLowerCase().includes(interest.toLowerCase())
    );
    if (sectorMatch) {
      score += 0.3;
    }
    factors++;

    // Location preference (20% weight)
    if (profile.preferredLocation === "Anywhere in India" || 
        internship.location === profile.preferredLocation ||
        profile.preferredLocation.includes(internship.location)) {
      score += 0.2;
    }
    factors++;

    // Education level bonus (10% weight)
    const educationLevels = ["10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate"];
    const candidateLevel = educationLevels.indexOf(profile.education);
    const requiredLevel = internship.requirements.some(req => 
      req.toLowerCase().includes("graduate") || req.toLowerCase().includes("degree")
    ) ? 3 : 1;
    
    if (candidateLevel >= requiredLevel) {
      score += 0.1;
    }
    factors++;

    return {
      ...internship,
      matchScore: Math.min(score, 1) // Cap at 1.0
    };
  });

  // Sort by match score and return top 5
  return recommendedInternships
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
};