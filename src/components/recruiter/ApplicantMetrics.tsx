
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, User, Briefcase, GraduationCap, Star, Brain, Code, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ApplicantMetricsProps {
  applicant: {
    id: string;
    name: string;
    matchScore: number;
    technicalScore: number;
    softSkillsScore: number;
    culturalFitScore: number;
    experience: string;
    education: string;
    skills: string[];
  };
  assessmentData?: {
    score: number;
    strengths: string[];
    improvements: string[];
    aiInsights: string;
  };
  onClose: () => void;
}

export default function ApplicantMetrics({ applicant, assessmentData, onClose }: ApplicantMetricsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{applicant.name}</h2>
              <p className="text-muted-foreground">Detailed Applicant Metrics</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-sm">{applicant.experience}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Education</span>
                  </div>
                  <p className="text-sm">{applicant.education}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Scoring Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Match Score</span>
                    <span className="text-sm font-bold">{applicant.matchScore}%</span>
                  </div>
                  <Progress value={applicant.matchScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Technical Skills</span>
                    <span className="text-sm font-bold">{applicant.technicalScore}%</span>
                  </div>
                  <Progress value={applicant.technicalScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Soft Skills</span>
                    <span className="text-sm font-bold">{applicant.softSkillsScore}%</span>
                  </div>
                  <Progress value={applicant.softSkillsScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cultural Fit</span>
                    <span className="text-sm font-bold">{applicant.culturalFitScore}%</span>
                  </div>
                  <Progress value={applicant.culturalFitScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Assessment Results */}
            {assessmentData && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Assessment Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Assessment Score</span>
                      <span className="text-lg font-bold text-green-600">{assessmentData.score}%</span>
                    </div>
                    <Progress value={assessmentData.score} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {assessmentData.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-green-600">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {assessmentData.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm text-orange-600">• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">AI Insights</h4>
                        <p className="text-sm text-blue-700">{assessmentData.aiInsights}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
