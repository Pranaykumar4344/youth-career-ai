import { useState } from "react";
import { CandidateProfile, Internship, FormStep } from "@/types/internship";
import { generateRecommendations } from "@/utils/recommendationEngine";
import Header from "@/components/Header";
import ProgressIndicator from "@/components/ProgressIndicator";
import ProfileForm from "@/components/ProfileForm";
import RecommendationCard from "@/components/RecommendationCard";
import ProfileVisualization from "@/components/ProfileVisualization";
import VisualMatchScore from "@/components/VisualMatchScore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RefreshCw, Users, Target, MapPin, Sparkles, BarChart3, Award, TrendingUp } from "lucide-react";

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
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 animate-pulse-glow">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Find Your Perfect Internship
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Get AI-powered, personalized internship recommendations based on your unique profile
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up border-2 hover:border-primary/20">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Smart AI Matching</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced algorithms analyze your skills and interests for perfect matches
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up border-2 hover:border-success/20" style={{ animationDelay: "0.1s" }}>
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-bold text-lg mb-3">Quality Opportunities</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Verified internships from trusted organizations across India
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up border-2 hover:border-accent/20" style={{ animationDelay: "0.2s" }}>
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-3">Visual Insights</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interactive charts and visual feedback for better decisions
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={() => setCurrentStep(1)} 
        size="lg" 
        className="px-12 py-6 text-lg hover:scale-105 transition-all duration-300 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <Target className="h-5 w-5 mr-2" />
        Start Finding Internships
      </Button>
    </div>
  );

  const renderResults = () => {
    const averageMatch = recommendations.length > 0 
      ? recommendations.reduce((sum, rec) => sum + rec.matchScore, 0) / recommendations.length 
      : 0;

    return (
      <div className="space-y-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            🎯 Your Perfect Matches
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Here are the top internship recommendations tailored just for you
          </p>
          
          {/* Overall Statistics */}
          <div className="flex justify-center mb-8">
            <Card className="w-80">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-8">
                  <VisualMatchScore 
                    score={averageMatch} 
                    title="Overall Match"
                    size="lg"
                  />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-foreground">
                      {recommendations.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Top Matches Found
                    </div>
                    <div className="text-xs text-success mt-1">
                      ✨ AI Curated
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Visualization */}
        {profile && <ProfileVisualization profile={profile} />}

        {/* Recommendations Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Your Personalized Recommendations
          </h3>
          {recommendations.map((internship, index) => (
            <RecommendationCard
              key={internship.id}
              internship={internship}
              rank={index + 1}
            />
          ))}
        </div>

        <div className="text-center pt-8">
          <Button onClick={handleStartOver} variant="outline" size="lg" className="hover:scale-105 transition-transform">
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Different Preferences
          </Button>
        </div>
      </div>
    );
  };

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
