import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Mail, Phone, Download, X, MessageCircle } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ChatbotAssistant from "@/components/recruiter/ChatbotAssistant";

export default function ApplicantReview() {
  const [applicant, setApplicant] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    location: "New York, NY",
    title: "Software Engineer",
    experience: [
      {
        title: "Software Engineer",
        company: "Tech Corp",
        years: "2020 - Present",
        description:
          "Developed and maintained web applications using React and Node.js.",
      },
      {
        title: "Frontend Developer",
        company: "Web Solutions",
        years: "2018 - 2020",
        description: "Built responsive user interfaces using HTML, CSS, and JavaScript.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        university: "University of Tech",
        years: "2014 - 2018",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    certifications: ["Certified React Developer", "AWS Certified Developer"],
    resume: "john_doe_resume.pdf",
    profileCompletion: 85,
    pastCompanyComments: [
      {
        company: "Tech Corp",
        reviewer: "Sarah Johnson, Engineering Manager",
        comment: "John was an exceptional team player with strong technical skills. He consistently delivered high-quality code and was always willing to help colleagues. His communication skills and ability to work under pressure were particularly noteworthy.",
        rating: 4.8,
        date: "March 2024"
      },
      {
        company: "Web Solutions",
        reviewer: "Mike Chen, Lead Developer",
        comment: "Excellent frontend developer with great attention to detail. John's work on our main product interface significantly improved user experience. He's reliable, creative, and adapts quickly to new technologies.",
        rating: 4.6,
        date: "January 2020"
      }
    ]
  });

  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Applicant Review</h1>
            <p className="text-muted-foreground">
              Review applicant details and make a decision
            </p>
          </div>
          <ChatbotAssistant />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription>Applicant details at a glance</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" alt={applicant.name} />
                  <AvatarFallback>{applicant.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{applicant.name}</h3>
                <p className="text-muted-foreground">{applicant.title}</p>
                <div className="flex items-center mt-2">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href={`mailto:${applicant.email}`} className="text-sm text-blue-500">
                    {applicant.email}
                  </a>
                </div>
                <div className="flex items-center mt-1">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="text-sm">{applicant.phone}</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm">{applicant.location}</span>
                </div>
                <Separator className="my-4" />
                <div className="w-full">
                  <Label className="text-sm">Profile Completion</Label>
                  <Progress value={applicant.profileCompletion} className="h-2 mt-1" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {applicant.profileCompletion}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
                <CardDescription>Professional history</CardDescription>
              </CardHeader>
              <CardContent>
                {applicant.experience.map((exp, index) => (
                  <div key={index} className={index > 0 ? "mt-6 pt-6 border-t" : ""}>
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.years}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Academic background</CardDescription>
              </CardHeader>
              <CardContent>
                {applicant.education.map((edu, index) => (
                  <div key={index} className={index > 0 ? "mt-6 pt-6 border-t" : ""}>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.university}</p>
                    <p className="text-sm text-muted-foreground">{edu.years}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Skills & Certifications</CardTitle>
                <CardDescription>Technical proficiencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label className="text-sm">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {applicant.skills.map((skill, index) => (
                      <Badge key={index}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Certifications</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {applicant.certifications.map((cert, index) => (
                      <Badge key={index}>{cert}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resume</CardTitle>
                <CardDescription>Download applicant's resume</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume ({applicant.resume})
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comments from Past Companies
                </CardTitle>
                <CardDescription>Feedback from previous employers</CardDescription>
              </CardHeader>
              <CardContent>
                {applicant.pastCompanyComments.map((comment, index) => (
                  <div key={index} className={index > 0 ? "mt-6 pt-6 border-t" : ""}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{comment.company}</h4>
                        <p className="text-sm text-muted-foreground">{comment.reviewer}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{comment.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{comment.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Decision</CardTitle>
                <CardDescription>Approve or reject applicant</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button variant="destructive" className="mr-2">
                  <X className="mr-1 h-4 w-4" /> Reject
                </Button>
                <Button variant="secondary" className="ml-2">
                  <Check className="mr-1 h-4 w-4" /> Approve
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
