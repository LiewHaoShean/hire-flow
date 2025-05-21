
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Briefcase } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import JobCard from "@/components/applicant/JobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  
  // Mock job data
  const jobs = [
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
    },
    {
      id: "3",
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Remote",
      type: "Contract",
      postedDate: "2025-05-14",
      matchScore: 78,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Data Solutions",
      location: "Austin, TX",
      type: "Part-time",
      postedDate: "2025-05-12",
      matchScore: 70,
      skills: ["Node.js", "Python", "MongoDB", "SQL"]
    }
  ];
  
  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesJobType = jobType === 'all' || job.type.includes(jobType);
    const matchesLocation = location === 'all' || job.location.includes(location);
    
    return matchesSearch && matchesJobType && matchesLocation;
  });
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Job Listings</h1>
          <p className="text-muted-foreground">Find the perfect job that matches your skills</p>
        </div>
        
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or skills"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="New York">New York, NY</SelectItem>
                  <SelectItem value="Austin">Austin, TX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Filter className="h-4 w-4 mr-2" />
            <span>{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Most Recent
            </Button>
            <Button variant="outline" size="sm">
              Best Match
            </Button>
          </div>
        </div>
        
        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {filteredJobs.map(job => (
              <Link key={job.id} to={`/applicant/jobs/${job.id}`}>
                <JobCard {...job} />
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium mb-1">No jobs found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search filters to find more jobs
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setJobType('all');
                setLocation('all');
              }}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
