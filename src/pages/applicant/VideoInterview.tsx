import { useState, useRef, useEffect } from "react";
import { Play, Pause, RefreshCw, ChevronRight } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function VideoInterview() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [assessmentTimer, setAssessmentTimer] = useState(20); // Set to 20 seconds
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [results, setResults] = useState<null | {
    confidence: string;
    communication: string;
    culturalFit: string;
    overall: string;
    feedback: string;
  }>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const assessmentTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest professional strengths?",
    "Describe a challenging situation you faced at work and how you resolved it.",
    "Why are you interested in this position?",
  ];

  // Auto-submit when assessment timer reaches 0
  useEffect(() => {
    if (isAssessmentActive && assessmentTimer === 0) {
      handleSubmitEvaluation();
    }
  }, [assessmentTimer, isAssessmentActive]);
  
  const startRecording = () => {
    setIsRecording(true);
    setIsAssessmentActive(true);
    setAssessmentTimer(20); // Reset to 20 seconds
    
    // Start recording timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Start assessment timer
    assessmentTimerRef.current = setInterval(() => {
      setAssessmentTimer(prev => {
        if (prev <= 1) {
          clearInterval(assessmentTimerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    toast({
      title: "Recording Started",
      description: "You are now recording your response.",
    });
  };
  
  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (assessmentTimerRef.current) {
      clearInterval(assessmentTimerRef.current);
    }
    setIsRecording(false);
    setIsAssessmentActive(false);
    
    toast({
      title: "Recording Stopped",
      description: "Your response has been saved.",
    });
  };
  
  const resetRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (assessmentTimerRef.current) {
      clearInterval(assessmentTimerRef.current);
    }
    setIsRecording(false);
    setIsAssessmentActive(false);
    setRecordingTime(0);
    setAssessmentTimer(20);
    
    toast({
      title: "Recording Reset",
      description: "You can start a new recording.",
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setRecordingTime(0);
      setAssessmentTimer(20);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (assessmentTimerRef.current) {
        clearInterval(assessmentTimerRef.current);
      }
      setIsRecording(false);
      setIsAssessmentActive(false);
    } else {
      submitInterview();
    }
  };
  
  const handleSubmitEvaluation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (assessmentTimerRef.current) {
      clearInterval(assessmentTimerRef.current);
    }
    setIsRecording(false);
    setIsAssessmentActive(false);
    
    if (assessmentTimer === 0) {
      toast({
        title: "Time's Up!",
        description: "Your response has been automatically submitted.",
      });
    }
    
    nextQuestion();
  };
  
  const submitInterview = () => {
    setVideoSubmitted(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        confidence: "A-",
        communication: "B+",
        culturalFit: "A",
        overall: "A-",
        feedback: "You demonstrated strong communication skills and cultural fit. Consider working on maintaining consistent eye contact and speaking with more confidence in your responses. Your answers were well-structured and showed good problem-solving abilities."
      });
      
      toast({
        title: "Interview Analysis Complete",
        description: "View your results below.",
      });
    }, 3000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getGradeColor = (grade: string) => {
    switch (grade[0]) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Video Interview Assessment</h1>
          <p className="text-muted-foreground">
            Complete this mock interview to assess your soft skills
          </p>
        </div>
        
        {!videoSubmitted ? (
          <div className="grid grid-cols-1 gap-6">
            {/* Video Recording - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Recording</CardTitle>
                <CardDescription>Record your responses to the interview questions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Video preview placeholder */}
                <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center p-6">
                    {isRecording ? (
                      <div className="flex items-center">
                        <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Recording... {formatTime(recordingTime)}</span>
                      </div>
                    ) : (
                      <p>Camera preview will appear here</p>
                    )}
                  </div>
                </div>
                
                {/* Assessment Timer */}
                {isAssessmentActive && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-red-600">
                        {assessmentTimer}s
                      </span>
                    </div>
                    <p className="text-center text-sm text-red-600 mt-1">
                      Time remaining - Answer will auto-submit when timer reaches 0
                    </p>
                  </div>
                )}
                
                {/* Recording controls */}
                <div className="flex justify-center gap-3">
                  {!isRecording ? (
                    <Button onClick={startRecording} disabled={isRecording}>
                      <Play className="h-4 w-4 mr-2" /> Start Recording
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} variant="destructive">
                      <Pause className="h-4 w-4 mr-2" /> Stop Recording
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={resetRecording} disabled={isRecording && recordingTime === 0}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Reset
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Our AI will interact with you and ask questions during the interview
                </p>
                
                <Button 
                  onClick={handleSubmitEvaluation} 
                  disabled={recordingTime === 0 && !isAssessmentActive}
                  className="ml-auto"
                >
                  Submit Interview
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Tips for a successful video interview:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                <li>Ensure you are in a quiet environment with good lighting</li>
                <li>Speak clearly and maintain eye contact with the camera</li>
                <li>Show enthusiasm and positive body language</li>
                <li>Our AI will guide you through the interview process</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Assessment Results</CardTitle>
                <CardDescription>
                  {results ? "AI-generated evaluation of your interview performance" : "Analyzing your responses..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hr-blue mb-4"></div>
                    <p className="text-muted-foreground">Our AI is analyzing your interview responses</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                        <Badge className={`text-lg ${getGradeColor(results.confidence)}`}>
                          {results.confidence}
                        </Badge>
                      </div>
                      
                      <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Communication</p>
                        <Badge className={`text-lg ${getGradeColor(results.communication)}`}>
                          {results.communication}
                        </Badge>
                      </div>
                      
                      <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Cultural Fit</p>
                        <Badge className={`text-lg ${getGradeColor(results.culturalFit)}`}>
                          {results.culturalFit}
                        </Badge>
                      </div>
                      
                      <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                        <Badge className={`text-lg ${getGradeColor(results.overall)}`}>
                          {results.overall}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Feedback</h3>
                      <p className="text-muted-foreground">{results.feedback}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>Steps to leverage your assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="bg-hr-blue/10 rounded-full p-1 w-7 h-7 flex items-center justify-center mr-3 text-hr-blue">1</div>
                    <div>
                      <h4 className="font-medium">Update Your Profile</h4>
                      <p className="text-sm text-muted-foreground">Your assessment results have been added to your profile for potential employers to view.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="bg-hr-blue/10 rounded-full p-1 w-7 h-7 flex items-center justify-center mr-3 text-hr-blue">2</div>
                    <div>
                      <h4 className="font-medium">Review Areas for Improvement</h4>
                      <p className="text-sm text-muted-foreground">Focus on the feedback provided to improve your interview performance.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="bg-hr-blue/10 rounded-full p-1 w-7 h-7 flex items-center justify-center mr-3 text-hr-blue">3</div>
                    <div>
                      <h4 className="font-medium">Apply to Jobs</h4>
                      <p className="text-sm text-muted-foreground">Start applying to positions that match your skillset and personality traits.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="bg-hr-blue/10 rounded-full p-1 w-7 h-7 flex items-center justify-center mr-3 text-hr-blue">4</div>
                    <div>
                      <h4 className="font-medium">Retake Assessment (Optional)</h4>
                      <p className="text-sm text-muted-foreground">You can retake this assessment in 30 days if you'd like to improve your scores.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
