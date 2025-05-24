
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Star, ArrowRight, User, Award, Send } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function RecommendedCandidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [invitedCandidates, setInvitedCandidates] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  // Mock data for recommended candidates
  const candidates = [
    {
      id: "1",
      name: "Jane Smith",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      photo: "https://i.pravatar.cc/300?img=1",
      matchScore: 95,
      topSkills: ["React", "TypeScript", "GraphQL"],
      jobMatch: "Senior Frontend Developer"
    },
    {
      id: "2",
      name: "Michael Johnson",
      title: "Full Stack Developer",
      location: "New York, NY",
      photo: "https://i.pravatar.cc/300?img=2",
      matchScore: 92,
      topSkills: ["React", "Node.js", "MongoDB"],
      jobMatch: "Full Stack Engineer"
    },
    {
      id: "3",
      name: "Emily Davis",
      title: "UI/UX Designer",
      location: "Chicago, IL",
      photo: "https://i.pravatar.cc/300?img=3",
      matchScore: 88,
      topSkills: ["Figma", "UI Design", "User Research"],
      jobMatch: "Product Designer"
    },
    {
      id: "4",
      name: "David Wilson",
      title: "DevOps Engineer",
      location: "Austin, TX",
      photo: "https://i.pravatar.cc/300?img=4",
      matchScore: 85,
      topSkills: ["AWS", "Docker", "Kubernetes"],
      jobMatch: "DevOps Specialist"
    },
    {
      id: "5",
      name: "Sophia Brown",
      title: "Backend Developer",
      location: "Seattle, WA",
      photo: "https://i.pravatar.cc/300?img=5",
      matchScore: 82,
      topSkills: ["Python", "Django", "PostgreSQL"],
      jobMatch: "Senior Frontend Developer"
    }
  ];
  
  // Jobs for filtering
  const jobs = [
    "Senior Frontend Developer",
    "Full Stack Engineer",
    "Product Designer",
    "DevOps Specialist"
  ];

  const handleSendInvitation = (candidateId: string, candidateName: string) => {
    setInvitedCandidates(prev => new Set([...prev, candidateId]));
    
    toast({
      title: "Invitation Sent Successfully!",
      description: `Interview invitation sent to ${candidateName}`,
    });
  };
  
  // Filter candidates based on search and job filter
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.topSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesJob = jobFilter === 'all' || candidate.jobMatch === jobFilter;
    
    return matchesSearch && matchesJob;
  });
  
  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Recommended Candidates</h1>
          <p className="text-muted-foreground">
            AI-powered candidate recommendations based on your job listings
          </p>
        </div>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates or skills"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map(job => (
                    <SelectItem key={job} value={job}>{job}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Tabs defaultValue="match" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="match" className="flex-1">Best Match</TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                  <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Filter className="h-4 w-4 mr-2" />
            <span>{filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
        
        {/* Candidate Grid */}
        <div className="space-y-4 mb-8">
          {filteredCandidates.map(candidate => (
            <Card key={candidate.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 flex-grow">
                  <Avatar className="w-16 h-16 border">
                    <AvatarImage src={candidate.photo} alt={candidate.name} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-medium">{candidate.name}</h3>
                      <div className="flex items-center text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        <Award className="h-4 w-4 mr-1" />
                        <span>{candidate.matchScore}% Match</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center text-muted-foreground mb-3 gap-y-1 gap-x-3">
                      <span>{candidate.title}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{candidate.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {candidate.topSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center p-4 bg-gray-50 border-t md:border-t-0 md:border-l gap-2">
                  <div className="text-sm text-muted-foreground text-center">
                    <span>Best for:</span>
                    <p className="font-medium">{candidate.jobMatch}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link to={`/recruiter/applicants/${candidate.id}`}>
                      <Button size="sm" variant="outline">
                        View Profile <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleSendInvitation(candidate.id, candidate.name)}
                      disabled={invitedCandidates.has(candidate.id)}
                      className={invitedCandidates.has(candidate.id) ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {invitedCandidates.has(candidate.id) ? (
                        "Invited ✓"
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Invitation
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {filteredCandidates.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <User className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">No candidates found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search criteria to find more candidates
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setJobFilter('all');
                }}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
