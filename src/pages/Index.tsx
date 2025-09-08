import { useState } from "react";
import { CandidateProfile, Internship, FormStep } from "@/types/internship";
import { generateRecommendations } from "@/utils/recommendationEngine";
import Header from "@/components/Header";
import ProgressIndicator from "@/components/ProgressIndicator";
import ProfileForm from "@/components/ProfileForm";
import RecommendationCard from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RefreshCw, Users, Target, MapPin } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  const steps: FormStep[] = [
    { id: 1, title: "Profile", completed: false },
    { id: 2, title: "Results", completed: false }
  ];

  const handleProfileComplete = (candidateProfile: CandidateProfile) => {
    setProfile(candidateProfile);
    const recommendations = generateRecommendations(candidateProfile);
    setRecommendations(recommendations);
    setCurrentStep(1);
    
    // Mark profile step as completed
    steps[0].completed = true;
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setProfile(null);
    setRecommendations([]);
    steps.forEach(step => step.completed = false);
  };

  const renderWelcomeScreen = () => (
    <div className="text-center max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Find Your Perfect Internship
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Get personalized internship recommendations based on your skills, interests, and preferences
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations based on your profile
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quality Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              Verified internships from trusted organizations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <MapPin className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Location Flexible</h3>
            <p className="text-sm text-muted-foreground">
              Find opportunities near you or anywhere in India
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={() => setCurrentStep(1)} 
        size="lg" 
        className="px-8"
      >
        Start Finding Internships
      </Button>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Your Personalized Recommendations
        </h2>
        <p className="text-muted-foreground mb-4">
          Based on your profile, here are the top internship matches for you
        </p>
        
        {profile && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="outline">
              Education: {profile.education}
            </Badge>
            <Badge variant="outline">
              Skills: {profile.skills.length}
            </Badge>
            <Badge variant="outline">
              Interests: {profile.interests.length}
            </Badge>
            <Badge variant="outline">
              Location: {profile.preferredLocation}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {recommendations.map((internship, index) => (
          <RecommendationCard
            key={internship.id}
            internship={internship}
            rank={index + 1}
          />
        ))}
      </div>

      <div className="text-center pt-6">
        <Button onClick={handleStartOver} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep > 0 && (
          <ProgressIndicator steps={steps} currentStep={currentStep - 1} />
        )}
        
        {currentStep === 0 && renderWelcomeScreen()}
        {currentStep === 1 && !recommendations.length && (
          <ProfileForm onComplete={handleProfileComplete} />
        )}
        {currentStep === 1 && recommendations.length > 0 && renderResults()}
      </main>
    </div>
  );
};

export default Index;
