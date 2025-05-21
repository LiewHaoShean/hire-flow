
import { useState } from "react";
import { Upload, UserCircle, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ApplicantProfile() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [profileProgress, setProfileProgress] = useState(65);
  
  // Mock profile data
  const [profile, setProfile] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    summary: "Experienced frontend developer with over 5 years of experience building responsive web applications using modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Node.js", "Git"],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2015 - 2019"
      }
    ],
    experience: [
      {
        title: "Frontend Developer",
        company: "WebTech Solutions",
        location: "San Francisco, CA",
        startDate: "2020-02",
        endDate: "Present",
        description: "Led development of the company's main SaaS product, improving performance by 35% and implementing new features that increased user retention."
      },
      {
        title: "Junior Developer",
        company: "Tech Startups Inc.",
        location: "San Francisco, CA",
        startDate: "2019-05",
        endDate: "2020-01",
        description: "Worked on various frontend projects using React and collaborated with designers to implement responsive UI components."
      }
    ]
  });
  
  const handleUploadResume = () => {
    setIsUploading(true);
    
    // Simulate file upload and processing
    setTimeout(() => {
      setIsUploading(false);
      setIsAutoFilling(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsAutoFilling(false);
        setProfileProgress(85);
        
        // Update profile with "extracted" data
        setProfile({
          ...profile,
          skills: [
            ...profile.skills,
            "GraphQL",
            "Redux",
            "Jest",
            "Webpack"
          ],
          experience: [
            {
              title: "Senior Frontend Developer",
              company: "InnovateX",
              location: "Remote",
              startDate: "2022-03",
              endDate: "Present",
              description: "Lead a team of 5 developers building enterprise SaaS applications with React, TypeScript, and GraphQL. Implemented CI/CD pipelines that reduced deployment time by 45%."
            },
            ...profile.experience
          ],
          education: [
            ...profile.education,
            {
              degree: "Frontend Development Certification",
              school: "Frontend Masters",
              year: "2020"
            }
          ]
        });
        
        toast({
          title: "Resume Processed Successfully",
          description: "Your profile has been updated with information from your resume.",
        });
      }, 2000);
    }, 1500);
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile changes have been saved successfully.",
    });
  };
  
  const addSkill = () => {
    const newSkill = prompt("Enter a new skill:");
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill]
      });
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your professional information</p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleUploadResume}
              disabled={isUploading || isAutoFilling}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Resume"}
            </Button>
            
            <Button onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
        
        {isAutoFilling && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="py-4">
              <div className="flex items-center">
                <div className="animate-spin mr-2">
                  <svg className="h-5 w-5 text-hr-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-hr-blue">AI is processing your resume</p>
                  <p className="text-sm text-hr-blue-dark">Extracting your skills, experience, and education...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Profile Completion */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Profile Completion</h3>
              <span className="text-sm font-medium">{profileProgress}%</span>
            </div>
            <Progress value={profileProgress} className="h-2" />
          </CardContent>
        </Card>
        
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Your personal and contact details</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  value={profile.title} 
                  onChange={(e) => setProfile({...profile, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={profile.email} 
                  onChange={(e) => setProfile({...profile, email: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={profile.location} 
                  onChange={(e) => setProfile({...profile, location: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea 
                id="summary" 
                rows={4}
                value={profile.summary} 
                onChange={(e) => setProfile({...profile, summary: e.target.value})} 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add skills to highlight your expertise</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 pl-3 pr-2 flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-1 hover:bg-gray-200 rounded-full">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              <Button variant="outline" size="sm" onClick={addSkill} className="h-7">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Skill
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Tip: Add skills that are relevant to the positions you're interested in.
            </p>
          </CardContent>
        </Card>
        
        {/* Work Experience */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Your professional experience</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className={index > 0 ? "pt-6 border-t" : ""}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{exp.title}</h4>
                      <p>{exp.company}, {exp.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                      {exp.endDate === 'Present' ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Education */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your educational background</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className={index > 0 ? "pt-6 border-t" : ""}>
                  <div className="mb-1">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p>{edu.school}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {edu.year}
                  </p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
