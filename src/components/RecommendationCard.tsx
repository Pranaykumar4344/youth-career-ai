import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Building, Star } from "lucide-react";
import { Internship } from "@/types/internship";

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

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                #{rank}
              </Badge>
              <Badge className={getMatchColor(internship.matchScore)}>
                <Star className="h-3 w-3 mr-1" />
                {getMatchText(internship.matchScore)}
              </Badge>
            </div>
            <CardTitle className="text-xl mb-1">{internship.title}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm">
              <Building className="h-4 w-4 mr-1" />
              {internship.company}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground">{internship.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{internship.stipend}</span>
          </div>
        </div>

        <div>
          <Badge variant="secondary" className="mb-2">
            {internship.sector}
          </Badge>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {internship.requirements.map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1">
            Apply Now
          </Button>
          <Button variant="outline" className="flex-1">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;