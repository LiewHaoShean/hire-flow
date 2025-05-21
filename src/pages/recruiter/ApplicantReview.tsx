
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Download, Briefcase, GraduationCap, Star, Check, X, Video } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function ApplicantReview() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Mock applicant data
  const applicant = {
    id: id || "1",
    name: "Jane Smith",
    title: "Senior Frontend Developer",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    photo: "https://i.pravatar.cc/300?img=1",
    application: {
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      date: "2025-05-18",
      coverLetter: "Dear Hiring Manager, I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. With over 5 years of experience in frontend development using React and TypeScript, I believe I would be a valuable addition to your team. I have a strong track record of building responsive and performant web applications and I am passionate about creating exceptional user experiences.",
    },
    experience: [
      {
        title: "Frontend Developer",
        company: "WebTech Solutions",
        duration: "2020 - Present",
        description: "Led development of the company's main SaaS product, improving performance by 35% and implementing new features that increased user retention."
      },
      {
        title: "Junior Developer",
        company: "Tech Startups Inc.",
        duration: "2019 - 2020",
        description: "Worked on various frontend projects using React and collaborated with designers to implement responsive UI components."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2015 - 2019"
      }
    ],
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 85 },
      { name: "Node.js", level: 70 },
      { name: "GraphQL", level: 75 }
    ],
    assessments: {
      technical: 92,
      communication: 88,
      problemSolving: 90,
      culturalFit: 85
    },
    resumeUrl: "#"
  };
  
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  
  const handleAccept = () => {
    setStatus('accepted');
    toast({
      title: "Applicant Accepted",
      description: `${applicant.name} has been moved to the accepted candidates list.`
    });
  };
  
  const handleReject = () => {
    setStatus('rejected');
    toast({
      title: "Applicant Rejected",
      description: `${applicant.name} has been moved to the rejected candidates list.`
    });
  };
  
  const scheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${applicant.name} has been scheduled.`
    });
  };
  
  return (
    <MainLayout userType="recruiter">
      <div className="page-container max-w-5xl">
        <Link to="/recruiter/dashboard" className="inline-flex items-center text-hr-blue hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to dashboard
        </Link>
        
        {/* Applicant Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 mx-auto md:mx-0">
            <img src={applicant.photo} alt={applicant.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-1">{applicant.name}</h1>
                <p className="text-lg text-muted-foreground mb-2">{applicant.title}</p>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{applicant.location}</Badge>
                  <Badge 
                    variant={status === 'pending' ? 'outline' : (status === 'accepted' ? 'success' : 'destructive')}
                  >
                    {status === 'pending' ? 'Under Review' : (status === 'accepted' ? 'Accepted' : 'Rejected')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" onClick={scheduleInterview}>
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Interview
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={applicant.resumeUrl} download>
                    <Download className="h-4 w-4 mr-2" /> Download Resume
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm mt-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" /> Applied on {new Date(applicant.application.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-2" /> {applicant.application.position} at {applicant.application.company}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Skills & Assessment */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Skill Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Technical Skills</span>
                    <span className="font-medium">{applicant.assessments.technical}%</span>
                  </div>
                  <Progress value={applicant.assessments.technical} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-medium">{applicant.assessments.communication}%</span>
                  </div>
                  <Progress value={applicant.assessments.communication} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span className="font-medium">{applicant.assessments.problemSolving}%</span>
                  </div>
                  <Progress value={applicant.assessments.problemSolving} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Cultural Fit</span>
                    <span className="font-medium">{applicant.assessments.culturalFit}%</span>
                  </div>
                  <Progress value={applicant.assessments.culturalFit} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {status === 'pending' && (
                  <>
                    <Button onClick={handleAccept} className="w-full mb-2">
                      <Check className="h-4 w-4 mr-2" /> Accept Candidate
                    </Button>
                    <Button variant="outline" onClick={handleReject} className="w-full">
                      <X className="h-4 w-4 mr-2" /> Reject Candidate
                    </Button>
                  </>
                )}
                
                {status === 'accepted' && (
                  <Button className="w-full" onClick={scheduleInterview}>
                    <Video className="h-4 w-4 mr-2" /> Schedule Interview
                  </Button>
                )}
                
                {status === 'rejected' && (
                  <div className="text-center text-muted-foreground">
                    <p>Candidate has been rejected.</p>
                    <Button variant="ghost" onClick={() => setStatus('pending')} className="mt-2">
                      Undo Rejection
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Profile details */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" /> 
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applicant.experience.map((exp, index) => (
                      <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                        <h3 className="font-medium">{exp.title}</h3>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">{exp.company}</span>
                          <span className="text-sm text-muted-foreground">{exp.duration}</span>
                        </div>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" /> 
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applicant.education.map((edu, index) => (
                      <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{edu.school}</span>
                          <span className="text-sm text-muted-foreground">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="application">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{applicant.application.coverLetter}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Interview Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      className="w-full min-h-[200px] p-3 border rounded-md" 
                      placeholder="Add your interview notes here..."
                    />
                    <Button className="mt-4">Save Notes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
