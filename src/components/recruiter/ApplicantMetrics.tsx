
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, User, Briefcase, GraduationCap, Star, Brain, Code, MessageSquare, Edit, Save, Cancel } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedApplicant, setEditedApplicant] = useState(applicant);
  const [editedAssessment, setEditedAssessment] = useState(assessmentData);

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    toast.success("Applicant metrics updated successfully");
  };

  const handleCancel = () => {
    setEditedApplicant(applicant);
    setEditedAssessment(assessmentData);
    setIsEditing(false);
  };

  const updateScore = (field: string, value: number) => {
    setEditedApplicant(prev => ({
      ...prev,
      [field]: Math.min(100, Math.max(0, value))
    }));
  };

  const updateAssessmentScore = (value: number) => {
    if (editedAssessment) {
      setEditedAssessment(prev => ({
        ...prev!,
        score: Math.min(100, Math.max(0, value))
      }));
    }
  };

  const updateAssessmentField = (field: 'aiInsights', value: string) => {
    if (editedAssessment) {
      setEditedAssessment(prev => ({
        ...prev!,
        [field]: value
      }));
    }
  };

  const updateAssessmentArrayField = (field: 'strengths' | 'improvements', index: number, value: string) => {
    if (editedAssessment) {
      setEditedAssessment(prev => ({
        ...prev!,
        [field]: prev![field].map((item, i) => i === index ? value : item)
      }));
    }
  };

  const addArrayItem = (field: 'strengths' | 'improvements') => {
    if (editedAssessment) {
      setEditedAssessment(prev => ({
        ...prev!,
        [field]: [...prev![field], '']
      }));
    }
  };

  const removeArrayItem = (field: 'strengths' | 'improvements', index: number) => {
    if (editedAssessment) {
      setEditedAssessment(prev => ({
        ...prev!,
        [field]: prev![field].filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{editedApplicant.name}</h2>
              <p className="text-muted-foreground">Detailed Applicant Metrics</p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <Cancel className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                  {isEditing ? (
                    <Input
                      value={editedApplicant.experience}
                      onChange={(e) => setEditedApplicant(prev => ({ ...prev, experience: e.target.value }))}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm">{editedApplicant.experience}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Education</span>
                  </div>
                  {isEditing ? (
                    <Input
                      value={editedApplicant.education}
                      onChange={(e) => setEditedApplicant(prev => ({ ...prev, education: e.target.value }))}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm">{editedApplicant.education}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editedApplicant.skills.map((skill, index) => (
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
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedApplicant.matchScore}
                        onChange={(e) => updateScore('matchScore', parseInt(e.target.value) || 0)}
                        className="w-20 h-8 text-sm font-bold"
                      />
                    ) : (
                      <span className="text-sm font-bold">{editedApplicant.matchScore}%</span>
                    )}
                  </div>
                  <Progress value={editedApplicant.matchScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Technical Skills</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedApplicant.technicalScore}
                        onChange={(e) => updateScore('technicalScore', parseInt(e.target.value) || 0)}
                        className="w-20 h-8 text-sm font-bold"
                      />
                    ) : (
                      <span className="text-sm font-bold">{editedApplicant.technicalScore}%</span>
                    )}
                  </div>
                  <Progress value={editedApplicant.technicalScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Soft Skills</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedApplicant.softSkillsScore}
                        onChange={(e) => updateScore('softSkillsScore', parseInt(e.target.value) || 0)}
                        className="w-20 h-8 text-sm font-bold"
                      />
                    ) : (
                      <span className="text-sm font-bold">{editedApplicant.softSkillsScore}%</span>
                    )}
                  </div>
                  <Progress value={editedApplicant.softSkillsScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cultural Fit</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedApplicant.culturalFitScore}
                        onChange={(e) => updateScore('culturalFitScore', parseInt(e.target.value) || 0)}
                        className="w-20 h-8 text-sm font-bold"
                      />
                    ) : (
                      <span className="text-sm font-bold">{editedApplicant.culturalFitScore}%</span>
                    )}
                  </div>
                  <Progress value={editedApplicant.culturalFitScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Assessment Results */}
            {editedAssessment && (
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
                      {isEditing ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editedAssessment.score}
                          onChange={(e) => updateAssessmentScore(parseInt(e.target.value) || 0)}
                          className="w-20 h-8 text-lg font-bold text-green-600"
                        />
                      ) : (
                        <span className="text-lg font-bold text-green-600">{editedAssessment.score}%</span>
                      )}
                    </div>
                    <Progress value={editedAssessment.score} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                      {isEditing ? (
                        <div className="space-y-2">
                          {editedAssessment.strengths.map((strength, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={strength}
                                onChange={(e) => updateAssessmentArrayField('strengths', index, e.target.value)}
                                className="text-sm"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('strengths', index)}
                                className="text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrayItem('strengths')}
                          >
                            Add Strength
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-1">
                          {editedAssessment.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-green-600">• {strength}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                      {isEditing ? (
                        <div className="space-y-2">
                          {editedAssessment.improvements.map((improvement, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={improvement}
                                onChange={(e) => updateAssessmentArrayField('improvements', index, e.target.value)}
                                className="text-sm"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('improvements', index)}
                                className="text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrayItem('improvements')}
                          >
                            Add Improvement
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-1">
                          {editedAssessment.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm text-orange-600">• {improvement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-800 mb-1">AI Insights</h4>
                        {isEditing ? (
                          <Textarea
                            value={editedAssessment.aiInsights}
                            onChange={(e) => updateAssessmentField('aiInsights', e.target.value)}
                            className="text-sm text-blue-700 bg-white"
                            rows={4}
                          />
                        ) : (
                          <p className="text-sm text-blue-700">{editedAssessment.aiInsights}</p>
                        )}
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
