
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, MapPin, Calendar, Clock, CheckCircle, Award } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  
  // Mock job data (would normally be fetched based on ID)
  const job = {
    id: id || "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120,000 - $150,000 per year",
    postedDate: "2025-05-15",
    closingDate: "2025-06-15",
    matchScore: 92,
    description: "We are seeking a talented and experienced Frontend Developer to join our growing team. The successful candidate will be responsible for implementing visual elements and user interactions for our web applications. You will work closely with designers, backend developers, and product managers to deliver exceptional user experiences.",
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across a vast array of web-capable devices and browsers",
      "Participate in code reviews and help maintain code quality"
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency in JavaScript, TypeScript, and React",
      "Knowledge of modern frontend build pipelines and tools",
      "Experience with responsive design and mobile-first development",
      "Familiarity with RESTful APIs and GraphQL"
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "GraphQL", "API Integration", "State Management"]
  };
  
  const handleApply = () => {
    setIsApplying(true);
    
    // Simulate application process
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      
      toast({
        title: "Application Submitted",
        description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
      });
    }, 1500);
  };
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container max-w-5xl">
        <div className="mb-6">
          <Link to="/applicant/jobs" className="inline-flex items-center text-hr-blue hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to job listings
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="mb-2 md:mb-0">{job.title}</h1>
            <div className="flex items-center">
              <Badge className="mr-2" variant="outline">{job.type}</Badge>
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-1" />
                {job.matchScore}% Match
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground mt-2">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" /> {job.company}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" /> {job.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> Posted {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {/* Job details card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Overview</h3>
              <p>{job.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Skills and Apply Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Apply Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Closing Date:</span>
                <span className="text-sm">{new Date(job.closingDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Salary Range:</span>
                <span className="text-sm">{job.salary}</span>
              </div>
              
              <Separator />
              
              {applied ? (
                <div className="text-center py-2">
                  <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">Applied</h3>
                  <p className="text-sm text-muted-foreground">
                    Your application has been submitted
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={handleApply} 
                  disabled={isApplying} 
                  className="w-full"
                >
                  {isApplying ? "Applying..." : "Apply Now"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
