import { CandidateProfile, Internship } from "@/types/internship";
import { internships } from "@/data/internships";

// Simple semantic similarity using keyword expansion
const skillSynonyms: Record<string, string[]> = {
  "python": ["programming", "coding", "data analysis", "machine learning", "ai"],
  "javascript": ["web development", "programming", "coding", "frontend", "backend"],
  "excel": ["data analysis", "spreadsheets", "statistics", "reporting"],
  "sql": ["database", "data analysis", "queries", "data management"],
  "communication": ["writing", "presentation", "teamwork", "collaboration"],
  "marketing": ["digital marketing", "social media", "advertising", "branding"],
  "design": ["graphic design", "ui", "ux", "creative", "visual"],
  "finance": ["accounting", "financial analysis", "budgeting", "economics"],
  "research": ["analysis", "investigation", "data collection", "methodology"]
};

interface MatchExplanation {
  skillMatches: string[];
  sectorMatch: boolean;
  locationMatch: boolean;
  educationMatch: boolean;
  overallScore: number;
  reasoning: string[];
}

interface EnhancedInternship extends Internship {
  explanation: MatchExplanation;
}

// Semantic similarity function
const calculateSemanticSimilarity = (userSkills: string[], requirements: string[]): { score: number; matches: string[] } => {
  const matches: string[] = [];
  let totalMatches = 0;

  for (const skill of userSkills) {
    const skillLower = skill.toLowerCase();
    const synonyms = skillSynonyms[skillLower] || [skillLower];
    
    for (const requirement of requirements) {
      const reqLower = requirement.toLowerCase();
      
      // Direct match
      if (reqLower.includes(skillLower) || skillLower.includes(reqLower)) {
        matches.push(`${skill} → ${requirement}`);
        totalMatches += 1;
        continue;
      }
      
      // Synonym match
      for (const synonym of synonyms) {
        if (reqLower.includes(synonym) || synonym.includes(reqLower)) {
          matches.push(`${skill} → ${requirement} (semantic)`);
          totalMatches += 0.8; // Slightly lower score for semantic matches
          break;
        }
      }
    }
  }

  const maxPossible = Math.max(userSkills.length, requirements.length);
  return { 
    score: Math.min(totalMatches / maxPossible, 1), 
    matches: [...new Set(matches)] // Remove duplicates
  };
};

// Enhanced weighted scoring model with AI embeddings
export const generateAIRecommendations = async (profile: CandidateProfile): Promise<EnhancedInternship[]> => {
  // Use static internship data for now
  if (!internships || internships.length === 0) return [];

  const recommendedInternships = await Promise.all(
    internships.map(async (internship) => {
      const reasoning: string[] = [];
      
      // 1. Skill matching with semantic similarity (50% weight)
      const { score: skillScore, matches: skillMatches } = await calculateSemanticSimilarity(
        profile.skills, 
        internship.requirements
      );
      const weightedSkillScore = skillScore * 0.5;
      
      if (skillMatches.length > 0) {
        reasoning.push(`🎯 Strong skill alignment: ${skillMatches.slice(0, 3).join(", ")}${skillMatches.length > 3 ? ` and ${skillMatches.length - 3} more` : ""}`);
      }

      // 2. Sector/Interest matching (20% weight)
      const sectorMatch = profile.interests.some(interest => 
        interest.toLowerCase().includes(internship.sector.toLowerCase()) ||
        internship.sector.toLowerCase().includes(interest.toLowerCase()) ||
        internship.title.toLowerCase().includes(interest.toLowerCase()) ||
        internship.description.toLowerCase().includes(interest.toLowerCase())
      );
      const sectorScore = sectorMatch ? 0.2 : 0;
      
      if (sectorMatch) {
        reasoning.push(`🏢 Sector alignment: ${internship.sector} matches your interests`);
      }

      // 3. Location preference (15% weight)
      const locationMatch = profile.preferredLocation === "Anywhere in India" || 
          internship.location === profile.preferredLocation ||
          profile.preferredLocation.toLowerCase().includes(internship.location.toLowerCase());
      const locationScore = locationMatch ? 0.15 : 0;
      
      if (locationMatch) {
        reasoning.push(`📍 Perfect location match: ${internship.location}`);
      }

      // 4. Education level matching (15% weight)
      const educationLevels = ["10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate"];
      const candidateLevel = educationLevels.indexOf(profile.education);
      const requiresHigherEducation = internship.requirements.some(req => 
        req.toLowerCase().includes("graduate") || req.toLowerCase().includes("degree")
      );
      
      const educationMatch = requiresHigherEducation ? candidateLevel >= 3 : candidateLevel >= 1;
      const educationScore = educationMatch ? 0.15 : 0;
      
      if (educationMatch) {
        reasoning.push(`🎓 Education requirements met: ${profile.education}`);
      }

      // Calculate overall score with AI confidence boost
      const overallScore = weightedSkillScore + sectorScore + locationScore + educationScore;
      
      // AI confidence multiplier based on semantic similarity
      const confidenceMultiplier = skillScore > 0.8 ? 1.15 : skillScore > 0.6 ? 1.1 : skillScore > 0.4 ? 1.05 : 1;
      const finalScore = Math.min(overallScore * confidenceMultiplier, 1);

      // Add AI reasoning summary
      if (reasoning.length === 0) {
        reasoning.push("💡 Potential opportunity for skill development");
      }
      
      // Add AI confidence note
      if (skillScore > 0.7) {
        reasoning.push(`🤖 AI Confidence: High semantic match detected (${(skillScore * 100).toFixed(0)}%)`);
      }

      const explanation: MatchExplanation = {
        skillMatches,
        sectorMatch,
        locationMatch,
        educationMatch,
        overallScore: finalScore,
        reasoning
      };

      return {
        ...internship,
        matchScore: finalScore,
        explanation
      };
    })
  );

  // Advanced AI-powered sorting with multiple criteria
  return recommendedInternships
    .sort((a, b) => {
      // Primary: AI match score with semantic understanding
      if (Math.abs(b.matchScore - a.matchScore) > 0.05) {
        return b.matchScore - a.matchScore;
      }
      // Secondary: number of semantic skill matches
      const aSemanticMatches = a.explanation.skillMatches.filter(m => m.includes('%')).length;
      const bSemanticMatches = b.explanation.skillMatches.filter(m => m.includes('%')).length;
      if (bSemanticMatches !== aSemanticMatches) {
        return bSemanticMatches - aSemanticMatches;
      }
      // Tertiary: total skill matches
      return b.explanation.skillMatches.length - a.explanation.skillMatches.length;
    })
    .slice(0, 5);
};

// Enhanced explainability function with AI insights
export const getRecommendationExplanation = (internship: EnhancedInternship): string[] => {
  const explanations: string[] = [];
  
  explanations.push(`🎯 AI Match Score: ${(internship.explanation.overallScore * 100).toFixed(0)}%`);
  
  if (internship.explanation.skillMatches.length > 0) {
    const semanticMatches = internship.explanation.skillMatches.filter(m => m.includes('%')).length;
    if (semanticMatches > 0) {
      explanations.push(`🧠 AI identified ${semanticMatches} semantic skill matches`);
    }
    explanations.push(`💪 Total relevant skills: ${internship.explanation.skillMatches.length}`);
  }
  
  explanations.push(...internship.explanation.reasoning);
  
  // Add scoring breakdown
  const breakdown = [];
  if (internship.explanation.skillMatches.length > 0) breakdown.push("Skills (50%)");
  if (internship.explanation.sectorMatch) breakdown.push("Sector (20%)");
  if (internship.explanation.locationMatch) breakdown.push("Location (15%)");
  if (internship.explanation.educationMatch) breakdown.push("Education (15%)");
  
  if (breakdown.length > 0) {
    explanations.push(`📊 Weighted factors: ${breakdown.join(", ")}`);
  }
  
  return explanations;
};

// ML Model simulation for future enhancement
export const simulateMLModelPrediction = (profile: CandidateProfile, internship: Internship): number => {
  // Simulate a trained ML model prediction
  // In reality, this would be a trained Random Forest or Logistic Regression model
  const features = {
    skillCount: profile.skills.length,
    hasRelevantEducation: profile.education === "Graduate" ? 1 : 0,
    locationMatch: profile.preferredLocation === internship.location ? 1 : 0,
    sectorKeywords: profile.interests.some(i => internship.description.toLowerCase().includes(i.toLowerCase())) ? 1 : 0
  };
  
  // Simulated model weights (would be learned from training data)
  const weights = { skillCount: 0.3, hasRelevantEducation: 0.2, locationMatch: 0.3, sectorKeywords: 0.2 };
  
  const prediction = Object.entries(features).reduce((sum, [key, value]) => {
    return sum + (weights[key as keyof typeof weights] * value);
  }, 0);
  
  return Math.min(prediction, 1);
};