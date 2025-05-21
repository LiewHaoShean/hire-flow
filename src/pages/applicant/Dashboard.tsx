
import { Link } from "react-router-dom";
import { Briefcase, ChevronRight, CheckCircle } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import JobCard from "@/components/applicant/JobCard";

export default function ApplicantDashboard() {
  // Mock data
  const profileCompletion = 65;
  const recentJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedDate: "2025-05-15",
      matchScore: 92,
      skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL"]
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "Design Studios Co.",
      location: "New York, NY",
      type: "Full-time",
      postedDate: "2025-05-16",
      matchScore: 85,
      skills: ["Figma", "Adobe XD", "UI Design", "User Research"]
    }
  ];
  
  const applicationStatus = [
    { 
      id: "1", 
      position: "Full Stack Engineer", 
      company: "Innovate Labs", 
      date: "2025-05-10", 
      status: "Interview Scheduled",
      nextStep: "Video Interview on May 25"
    },
    { 
      id: "2", 
      position: "Frontend Developer", 
      company: "WebTech Solutions", 
      date: "2025-05-08", 
      status: "Application Submitted",
      nextStep: "Wait for review"
    }
  ];
  
  const profileCompletionItems = [
    { title: "Personal Information", completed: true },
    { title: "Education", completed: true },
    { title: "Work Experience", completed: true },
    { title: "Skills", completed: false },
    { title: "Interview Assessment", completed: false }
  ];
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Welcome, Jane!</h1>
          <p className="text-muted-foreground">Here's an overview of your job search</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Completion Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2 mb-6" />
              
              <div className="space-y-3">
                {profileCompletionItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2"></div>
                      )}
                      <span className={item.completed ? "text-gray-700" : "text-gray-500"}>
                        {item.title}
                      </span>
                    </div>
                    
                    {!item.completed && (
                      <Link to={item.title === "Skills" ? "/applicant/assessment" : "/applicant/interview"}>
                        <Button size="sm" variant="ghost">Complete</Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <Link to="/applicant/profile" className="mt-6 flex items-center justify-center text-sm text-hr-blue hover:underline">
                View Complete Profile
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Applications Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg">Your Applications</CardTitle>
              <Link to="/applicant/jobs">
                <Button variant="ghost" size="sm" className="text-hr-blue">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {applicationStatus.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No applications yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start applying to jobs to track your progress</p>
                  <Link to="/applicant/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicationStatus.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{app.position}</h4>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.status.includes("Interview") 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Applied on {new Date(app.date).toLocaleDateString()}</span>
                        <span className="font-medium">Next: {app.nextStep}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recommended Jobs Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2>Recommended Jobs</h2>
            <Link to="/applicant/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentJobs.map(job => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
