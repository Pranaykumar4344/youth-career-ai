import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateProfile } from "@/types/internship";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, MapPin, GraduationCap } from "lucide-react";

interface ProfileVisualizationProps {
  profile: CandidateProfile;
}

const ProfileVisualization = ({ profile }: ProfileVisualizationProps) => {
  // Skill distribution data
  const skillData = profile.skills.slice(0, 6).map((skill, index) => ({
    name: skill,
    value: Math.floor(Math.random() * 30) + 70, // Mock proficiency
    fill: `hsl(${210 + index * 30}, 60%, 50%)`
  }));

  // Interest distribution for pie chart
  const interestData = profile.interests.slice(0, 5).map((interest, index) => ({
    name: interest,
    value: Math.floor(Math.random() * 30) + 20,
    fill: `hsl(${145 + index * 40}, 60%, 50%)`
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Skills Chart */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Skill Proficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={skillData}>
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Interests Pie Chart */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-secondary" />
            Interest Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={interestData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={10}
              >
                {interestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profile Summary Cards */}
      <Card className="animate-fade-in lg:col-span-2">
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Education</p>
                <p className="text-sm text-muted-foreground">{profile.education}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Award className="h-8 w-8 text-secondary" />
              <div>
                <p className="font-semibold">Skills</p>
                <p className="text-sm text-muted-foreground">{profile.skills.length} skills listed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <MapPin className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">{profile.preferredLocation}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileVisualization;