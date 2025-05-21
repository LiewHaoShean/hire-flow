
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, Building } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
  matchScore?: number;
  skills: string[];
}

export default function JobCard({ 
  id, 
  title, 
  company, 
  location, 
  type, 
  postedDate, 
  matchScore, 
  skills 
}: JobCardProps) {
  // Calculate days ago
  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };
  
  // Get match score color
  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-blue-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-orange-400";
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {matchScore && (
            <Badge className={`${getMatchColor(matchScore)} text-white`}>
              {matchScore}% Match
            </Badge>
          )}
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{company}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{type}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{getDaysAgo(postedDate)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline">+{skills.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 px-6 py-4">
        <Link to={`/applicant/jobs/${id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
