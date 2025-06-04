
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Target, BookOpen, X } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SkillAssessment() {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);

  const skills = [
    { name: "React", questions: 10, timeLimit: 15, difficulty: "Intermediate" },
    { name: "JavaScript", questions: 8, timeLimit: 12, difficulty: "Advanced" },
    { name: "CSS", questions: 6, timeLimit: 10, difficulty: "Beginner" },
    { name: "Node.js", questions: 7, timeLimit: 13, difficulty: "Intermediate" },
  ];

  // Reverted results to original
  const results = [
    { skill: "React", score: 78, strengths: ["Component Structure", "Props Usage"], weaknesses: ["State Management", "Hooks"] },
    { skill: "JavaScript", score: 78, strengths: ["ES6 Features", "Async Programming"], weaknesses: ["Closures", "Prototypes"] },
    { skill: "CSS", score: 65, strengths: ["Flexbox", "Grid"], weaknesses: ["Animations", "Responsive Design"] },
    { skill: "Node.js", score: 72, strengths: ["Express.js", "Middleware"], weaknesses: ["Authentication", "Database Integration"] },
  ];

  const overallScore = Math.round(results.reduce((acc, result) => acc + result.score, 0) / results.length);

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
  };

  const handleNextSkill = () => {
    if (currentSkill < skills.length - 1) {
      setCurrentSkill(currentSkill + 1);
    } else {
      setShowResults(true);
      setEvaluationComplete(true);
      
      // Check if React score is below 50% and show course dialog
      const reactResult = results.find(result => result.skill === "React");
      if (reactResult && reactResult.score < 50) {
        setShowCourseDialog(true);
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!assessmentStarted) {
    return (
      <MainLayout userType="applicant">
        <div className="page-container">
          <div className="mb-8">
            <h1 className="mb-2">Skill Assessment</h1>
            <p className="text-muted-foreground">
              Test your technical skills and get personalized feedback
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Assessment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Adaptive difficulty based on your responses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Total time: ~50 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Instant feedback and improvement suggestions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleStartAssessment} size="lg" className="w-full">
                Start Assessment
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Skills to be Assessed</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{skill.name}</h4>
                        <Badge variant="outline">{skill.difficulty}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{skill.questions} questions</p>
                        <p>{skill.timeLimit} minutes</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (showResults) {
    return (
      <MainLayout userType="applicant">
        <div className="page-container">
          <div className="mb-8">
            <h1 className="mb-2">Assessment Results</h1>
            <p className="text-muted-foreground">
              Your skill assessment has been completed
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore}%</div>
                <Progress value={overallScore} className="mb-4" />
                <p className="text-sm text-muted-foreground">
                  {overallScore >= 80 ? "Excellent performance!" : 
                   overallScore >= 60 ? "Good performance!" : 
                   "Room for improvement"}
                </p>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Detailed Results</h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{result.skill}</h4>
                        <span className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                      </div>
                      <Progress 
                        value={result.score} 
                        className={`mb-3 ${getProgressColor(result.score)}`} 
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-600 mb-1">Strengths:</p>
                          <ul className="space-y-1">
                            {result.strengths.map((strength, i) => (
                              <li key={i} className="text-green-600">• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-orange-600 mb-1">Areas for Improvement:</p>
                          <ul className="space-y-1">
                            {result.weaknesses.map((weakness, i) => (
                              <li key={i} className="text-orange-600">• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Skill Improvement Opportunity
                </DialogTitle>
                <DialogDescription>
                  We noticed your React score is below 50%. Would you like to enroll in our recommended course to improve your skills?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Recommended Course</h4>
                  <p className="text-sm text-blue-700 mb-2">React Fundamentals & Advanced Concepts</p>
                  <p className="text-xs text-blue-600">Duration: 4 weeks • Level: Beginner to Intermediate</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowCourseDialog(false)}>
                    Maybe Later
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Skill Assessment</h1>
          <p className="text-muted-foreground">
            Currently assessing: {skills[currentSkill].name}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentSkill + 1} of {skills.length}
              </span>
            </div>
            <Progress value={((currentSkill + 1) / skills.length) * 100} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{skills[currentSkill].name} Assessment</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline">{skills[currentSkill].difficulty}</Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {skills[currentSkill].timeLimit} min
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Sample Question:</p>
                  <p className="font-medium">
                    What is the purpose of the useEffect hook in React?
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Assessment simulation in progress...
                  </p>
                  <Button onClick={handleNextSkill}>
                    {currentSkill < skills.length - 1 ? "Next Skill" : "Complete Assessment"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
