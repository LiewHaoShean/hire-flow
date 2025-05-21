
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Check, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ApplicantCardProps {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  skillMatch: number;
  skillBadges: string[];
  softSkills: {
    communication: string;
    confidence: string;
    culturalFit: string;
  };
}

export default function ApplicantCard({
  id,
  name,
  position,
  appliedDate,
  skillMatch,
  skillBadges,
  softSkills,
}: ApplicantCardProps) {
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending");
  const { toast } = useToast();
  
  const handleAccept = () => {
    setStatus("accepted");
    toast({
      title: "Applicant Accepted",
      description: `You've accepted ${name} for the next interview round.`,
    });
  };
  
  const handleReject = () => {
    setStatus("rejected");
    toast({
      title: "Applicant Rejected",
      description: `You've rejected ${name} for this position.`,
    });
  };
  
  const handleSchedule = () => {
    toast({
      title: "Interview Scheduled",
      description: `A Google Meet invitation has been sent to ${name}.`,
    });
  };
  
  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-blue-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-orange-400";
  };
  
  const getGradeColor = (grade: string) => {
    const grades: Record<string, string> = {
      "A+": "text-green-600",
      "A": "text-green-600",
      "A-": "text-green-500",
      "B+": "text-blue-600",
      "B": "text-blue-500",
      "B-": "text-blue-400",
      "C+": "text-yellow-600",
      "C": "text-yellow-500",
      "C-": "text-orange-500",
    };
    return grades[grade] || "text-gray-600";
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-hr-blue rounded-full p-2 mr-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          </div>
          
          {status === "accepted" && (
            <Badge className="bg-green-500">Accepted</Badge>
          )}
          
          {status === "rejected" && (
            <Badge className="bg-red-500">Rejected</Badge>
          )}
          
          {status === "pending" && (
            <Badge variant="outline">Pending Review</Badge>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Skills Match</span>
            <span className="text-sm font-semibold">{skillMatch}%</span>
          </div>
          <Progress value={skillMatch} className={getMatchColor(skillMatch)} />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {skillBadges.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-gray-500">Communication</p>
            <p className={`font-bold ${getGradeColor(softSkills.communication)}`}>
              {softSkills.communication}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Confidence</p>
            <p className={`font-bold ${getGradeColor(softSkills.confidence)}`}>
              {softSkills.confidence}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Cultural Fit</p>
            <p className={`font-bold ${getGradeColor(softSkills.culturalFit)}`}>
              {softSkills.culturalFit}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Applied {appliedDate}</span>
        </div>
      </CardContent>
      
      {status === "pending" && (
        <CardFooter className="bg-muted/50 px-6 py-4 flex gap-2">
          <Link to={`/recruiter/applicants/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Profile</Button>
          </Link>
          <Button onClick={handleAccept} className="flex-1 bg-green-500 hover:bg-green-600">
            <Check className="h-4 w-4 mr-1" /> Accept
          </Button>
          <Button onClick={handleReject} variant="destructive" className="flex-1">
            <X className="h-4 w-4 mr-1" /> Reject
          </Button>
        </CardFooter>
      )}
      
      {status === "accepted" && (
        <CardFooter className="bg-muted/50 px-6 py-4 flex gap-2">
          <Link to={`/recruiter/applicants/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Profile</Button>
          </Link>
          <Button onClick={handleSchedule} className="flex-1">
            <Calendar className="h-4 w-4 mr-1" /> Schedule
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
