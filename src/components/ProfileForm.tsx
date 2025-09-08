import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { CandidateProfile } from "@/types/internship";

interface ProfileFormProps {
  onComplete: (profile: CandidateProfile) => void;
}

const educationOptions = [
  "10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate"
];

const skillOptions = [
  "Communication", "Computer Skills", "Mathematics", "English", "Hindi",
  "Problem Solving", "Teamwork", "Leadership", "Creativity", "Research",
  "Data Entry", "Excel", "Social Media", "Writing", "Design"
];

const interestOptions = [
  "Technology", "Finance", "Marketing", "Healthcare", "Education",
  "Government", "Non-Profit", "Media", "Design", "Research",
  "Sales", "Customer Service", "Analytics", "Content Creation"
];

const locationOptions = [
  "Anywhere in India", "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur"
];

const ProfileForm = ({ onComplete }: ProfileFormProps) => {
  const [profile, setProfile] = useState<CandidateProfile>({
    education: "",
    skills: [],
    interests: [],
    location: "",
    preferredLocation: ""
  });

  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      addSkill(customSkill.trim());
      setCustomSkill("");
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim()) {
      addInterest(customInterest.trim());
      setCustomInterest("");
    }
  };

  const handleSubmit = () => {
    if (profile.education && profile.skills.length > 0 && profile.interests.length > 0 && 
        profile.location && profile.preferredLocation) {
      onComplete(profile);
    }
  };

  const isFormValid = profile.education && profile.skills.length > 0 && 
                     profile.interests.length > 0 && profile.location && profile.preferredLocation;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
          <p className="text-muted-foreground">
            Help us find the perfect internship opportunities for you
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Education */}
          <div className="space-y-2">
            <Label htmlFor="education">Education Level</Label>
            <Select value={profile.education} onValueChange={(value) => 
              setProfile(prev => ({ ...prev, education: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                {educationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skillOptions.map(skill => (
                <Badge
                  key={skill}
                  variant={profile.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => profile.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                >
                  {skill}
                  {profile.skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
              />
              <Button type="button" variant="outline" size="icon" onClick={addCustomSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md">
                {profile.skills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>Sector Interests</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {interestOptions.map(interest => (
                <Badge
                  key={interest}
                  variant={profile.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => profile.interests.includes(interest) ? removeInterest(interest) : addInterest(interest)}
                >
                  {interest}
                  {profile.interests.includes(interest) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom interest"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
              />
              <Button type="button" variant="outline" size="icon" onClick={addCustomInterest}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md">
                {profile.interests.map(interest => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeInterest(interest)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Current Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Current Location</Label>
            <Select value={profile.location} onValueChange={(value) => 
              setProfile(prev => ({ ...prev, location: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select your current location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Location */}
          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Internship Location</Label>
            <Select value={profile.preferredLocation} onValueChange={(value) => 
              setProfile(prev => ({ ...prev, preferredLocation: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Where would you like to intern?" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="w-full"
            size="lg"
          >
            Get My Recommendations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;