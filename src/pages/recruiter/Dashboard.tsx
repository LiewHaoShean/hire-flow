
import { Link } from "react-router-dom";
import { Inbox, Users, BarChart3, Activity, Calendar, ChevronRight } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ApplicantCard from "@/components/recruiter/ApplicantCard";

export default function RecruiterDashboard() {
  // Mock data
  const stats = [
    { title: "Open Positions", value: 12, icon: <Inbox className="h-5 w-5" />, change: "+3" },
    { title: "Total Applicants", value: 142, icon: <Users className="h-5 w-5" />, change: "+22" },
    { title: "Interviews This Week", value: 8, icon: <Calendar className="h-5 w-5" />, change: "+2" },
    { title: "Acceptance Rate", value: "68%", icon: <Activity className="h-5 w-5" />, change: "+5%" },
  ];
  
  const recentApplicants = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Frontend Developer",
      appliedDate: "2 days ago",
      skillMatch: 92,
      skillBadges: ["React", "TypeScript", "Tailwind CSS"],
      softSkills: {
        communication: "A",
        confidence: "A-",
        culturalFit: "A+"
      }
    },
    {
      id: "2",
      name: "Sarah Williams",
      position: "UX Designer",
      appliedDate: "3 days ago",
      skillMatch: 85,
      skillBadges: ["Figma", "UI/UX", "Design Systems"],
      softSkills: {
        communication: "A+",
        confidence: "B+",
        culturalFit: "A"
      }
    }
  ];
  
  const positionData = [
    { position: "Frontend Developer", applicants: 45, qualified: 28 },
    { position: "Backend Engineer", applicants: 32, qualified: 18 },
    { position: "Product Manager", applicants: 24, qualified: 12 },
    { position: "UX Designer", applicants: 15, qualified: 9 },
  ];
  
  const upcomingInterviews = [
    { name: "Michael Johnson", position: "Senior Developer", date: "2025-05-22T10:00:00", status: "Confirmed" },
    { name: "Emily Chen", position: "Product Manager", date: "2025-05-22T14:30:00", status: "Pending" },
    { name: "David Wilson", position: "UX Designer", date: "2025-05-23T11:00:00", status: "Confirmed" },
  ];
  
  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">Overview of your hiring activities</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-hr-blue/10' : 'bg-green-100'}`}>
                    {stat.icon}
                  </div>
                  <div className="text-xs font-medium text-right">
                    <span className={`${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applicants */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2>Recent Applicants</h2>
              <Link to="/recruiter/dashboard" className="text-hr-blue hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentApplicants.map(applicant => (
                <ApplicantCard key={applicant.id} {...applicant} />
              ))}
            </div>
            
            <div className="mt-6">
              <Link to="/recruiter/post-job">
                <Button>
                  Post a New Job
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Position Stats */}
          <div>
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positionData.map((position, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{position.position}</p>
                        <p className="text-sm text-muted-foreground">
                          {position.qualified}/{position.applicants} qualified
                        </p>
                      </div>
                      <Progress value={(position.qualified / position.applicants) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Interviews */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {upcomingInterviews.map((interview, index) => {
                    const interviewDate = new Date(interview.date);
                    const today = new Date();
                    const isToday = interviewDate.toDateString() === today.toDateString();
                    
                    return (
                      <div key={index} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{interview.name}</p>
                            <p className="text-sm text-muted-foreground">{interview.position}</p>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            interview.status === "Confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {interview.status}
                          </div>
                        </div>
                        <div className="mt-1 flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className={isToday ? "text-hr-blue font-medium" : ""}>
                            {isToday ? "Today" : interviewDate.toLocaleDateString()}, {" "}
                            {interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recommended Candidates */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2>AI Recommended Candidates</h2>
            <Link to="/recruiter/recommendations" className="text-hr-blue hover:underline flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ApplicantCard
              id="3"
              name="Jason Miller"
              position="Backend Engineer"
              appliedDate="1 day ago"
              skillMatch={94}
              skillBadges={["Node.js", "Python", "AWS", "Database Design"]}
              softSkills={{
                communication: "B+",
                confidence: "A",
                culturalFit: "A-"
              }}
            />
            
            <ApplicantCard
              id="4"
              name="Rachel Green"
              position="Product Manager"
              appliedDate="2 days ago"
              skillMatch={89}
              skillBadges={["Product Strategy", "User Research", "Agile"]}
              softSkills={{
                communication: "A+",
                confidence: "A",
                culturalFit: "A"
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
