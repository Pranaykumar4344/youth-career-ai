import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Building, Star, TrendingUp } from "lucide-react";
import { Internship } from "@/types/internship";
import VisualMatchScore from "./VisualMatchScore";
import { Progress } from "@/components/ui/progress";

interface RecommendationCardProps {
  internship: Internship;
  rank: number;
}

const RecommendationCard = ({ internship, rank }: RecommendationCardProps) => {
  const getMatchColor = (score: number) => {
    if (score >= 0.8) return "bg-success text-success-foreground";
    if (score >= 0.6) return "bg-accent text-accent-foreground";
    return "bg-warning text-warning-foreground";
  };

  const getMatchText = (score: number) => {
    if (score >= 0.8) return "Excellent Match";
    if (score >= 0.6) return "Good Match";
    return "Fair Match";
  };

  const getBorderClass = (rank: number) => {
    if (rank === 1) return "border-success border-2 animate-pulse-glow";
    if (rank === 2) return "border-accent border-2";
    return "border-border";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${getBorderClass(rank)} animate-slide-up`}
          style={{ animationDelay: `${rank * 0.1}s` }}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{getRankIcon(rank)}</div>
              <Badge className={getMatchColor(internship.matchScore)}>
                <Star className="h-3 w-3 mr-1" />
                {getMatchText(internship.matchScore)}
              </Badge>
            </div>
            <CardTitle className="text-xl mb-2">{internship.title}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Building className="h-4 w-4 mr-2" />
              {internship.company}
            </div>
          </div>
          
          <div className="ml-4">
            <VisualMatchScore 
              score={internship.matchScore} 
              title="Match Score"
              size="md"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">{internship.description}</p>
        
        {/* Visual Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium text-sm">{internship.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium text-sm">{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <DollarSign className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Stipend</p>
              <p className="font-medium text-sm">{internship.stipend}</p>
            </div>
          </div>
        </div>

        {/* Sector Badge with Icon */}
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <Badge variant="secondary" className="text-sm">
            {internship.sector}
          </Badge>
        </div>

        {/* Requirements with Progress Bars */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Key Requirements
          </h4>
          <div className="space-y-2">
            {internship.requirements.slice(0, 3).map((req, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{req}</span>
                  <span className="text-muted-foreground">
                    {Math.floor(Math.random() * 30) + 70}% match
                  </span>
                </div>
                <Progress 
                  value={Math.floor(Math.random() * 30) + 70} 
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1 hover:scale-105 transition-transform">
            Apply Now
          </Button>
          <Button variant="outline" className="flex-1 hover:scale-105 transition-transform">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;