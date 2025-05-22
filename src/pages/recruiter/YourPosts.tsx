
import { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data
const jobsByDepartment = {
  "IT Department": [
    {
      id: "1",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      postedDate: "May 10, 2025",
      applicants: 24,
      department: "IT Department",
      skills: [
        { name: "React", level: "expert" },
        { name: "TypeScript", level: "expert" },
        { name: "UI/UX", level: "intermediate" },
      ],
    },
    {
      id: "2",
      title: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      postedDate: "May 15, 2025",
      applicants: 18,
      department: "IT Department",
      skills: [
        { name: "Node.js", level: "expert" },
        { name: "SQL", level: "expert" },
        { name: "AWS", level: "intermediate" },
      ],
    },
  ],
  "Finance Department": [
    {
      id: "3",
      title: "Financial Analyst",
      location: "New York, NY",
      type: "Full-time",
      postedDate: "May 12, 2025",
      applicants: 15,
      department: "Finance Department",
      skills: [
        { name: "Financial Modeling", level: "expert" },
        { name: "Excel", level: "expert" },
        { name: "Data Analysis", level: "intermediate" },
      ],
    },
  ],
  "Marketing Department": [
    {
      id: "4",
      title: "Digital Marketing Specialist",
      location: "Chicago, IL",
      type: "Full-time",
      postedDate: "May 18, 2025",
      applicants: 22,
      department: "Marketing Department",
      skills: [
        { name: "SEO", level: "intermediate" },
        { name: "Content Marketing", level: "expert" },
        { name: "Social Media", level: "expert" },
      ],
    },
  ],
};

// Mock applicant data for the detailed view
const applicantRankingsData = [
  {
    id: "app1",
    name: "Jessica Miller",
    matchScore: 92,
    technicalScore: 95,
    softSkillsScore: 90,
    culturalFitScore: 88,
    experience: "5 years",
    education: "Master's in Computer Science",
    skills: ["React", "TypeScript", "UI/UX Design", "Node.js"],
  },
  {
    id: "app2",
    name: "Michael Chen",
    matchScore: 89,
    technicalScore: 92,
    softSkillsScore: 85,
    culturalFitScore: 90,
    experience: "4 years",
    education: "Bachelor's in Software Engineering",
    skills: ["React", "JavaScript", "CSS", "UI Design"],
  },
  {
    id: "app3",
    name: "Sarah Johnson",
    matchScore: 87,
    technicalScore: 88,
    softSkillsScore: 92,
    culturalFitScore: 85,
    experience: "3 years",
    education: "Bachelor's in Computer Science",
    skills: ["React", "TypeScript", "Frontend Development"],
  },
  {
    id: "app4",
    name: "David Wilson",
    matchScore: 84,
    technicalScore: 89,
    softSkillsScore: 80,
    culturalFitScore: 82,
    experience: "6 years",
    education: "Bachelor's in Software Engineering",
    skills: ["React", "Redux", "JavaScript", "HTML/CSS"],
  },
  {
    id: "app5",
    name: "Emily Brown",
    matchScore: 80,
    technicalScore: 78,
    softSkillsScore: 88,
    culturalFitScore: 85,
    experience: "2 years",
    education: "Bachelor's in Information Technology",
    skills: ["React", "JavaScript", "Responsive Design"],
  },
];

export default function YourPosts() {
  const departments = Object.keys(jobsByDepartment);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  };
  
  const getSkillBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "expert":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Your Job Posts</h1>
          <p className="text-muted-foreground">Manage your job listings and view applicant rankings</p>
        </div>

        {!selectedJob ? (
          <Tabs defaultValue={departments[0]} className="w-full">
            <TabsList className="mb-6">
              {departments.map((dept) => (
                <TabsTrigger key={dept} value={dept} className="px-6">
                  {dept}
                </TabsTrigger>
              ))}
            </TabsList>

            {departments.map((dept) => (
              <TabsContent key={dept} value={dept} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobsByDepartment[dept as keyof typeof jobsByDepartment].map((job) => (
                    <Card 
                      key={job.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleJobClick(job)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant="outline" className="bg-gray-100">
                            {job.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">Posted {job.postedDate}</span>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-2" />
                            <span className="text-sm">{job.applicants} Applicants</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {job.skills.map((skill, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className={getSkillBadgeColor(skill.level)}
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setSelectedJob(null)} 
                className="text-hr-blue hover:underline flex items-center mr-4"
              >
                ← Back to listings
              </button>
              <h2 className="text-xl font-medium">{selectedJob.title} - Applicant Rankings</h2>
            </div>
            
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedJob.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedJob.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedJob.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Posted Date</p>
                    <p className="font-medium">{selectedJob.postedDate}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill: any, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className={getSkillBadgeColor(skill.level)}
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ranked Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead className="hidden md:table-cell">Technical</TableHead>
                      <TableHead className="hidden md:table-cell">Soft Skills</TableHead>
                      <TableHead className="hidden lg:table-cell">Cultural Fit</TableHead>
                      <TableHead className="hidden lg:table-cell">Experience</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicantRankingsData.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">
                          <Link to={`/recruiter/applicants/${applicant.id}`} className="text-hr-blue hover:underline">
                            {applicant.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              applicant.matchScore >= 90 
                                ? "bg-green-100 text-green-800" 
                                : applicant.matchScore >= 80 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {applicant.matchScore}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{applicant.technicalScore}%</TableCell>
                        <TableCell className="hidden md:table-cell">{applicant.softSkillsScore}%</TableCell>
                        <TableCell className="hidden lg:table-cell">{applicant.culturalFitScore}%</TableCell>
                        <TableCell className="hidden lg:table-cell">{applicant.experience}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
