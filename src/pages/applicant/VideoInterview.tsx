
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Camera, Volume2 } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";

export default function VideoInterview() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const questions = [
    "Tell me about yourself and your background in software development.",
    "Describe a challenging project you've worked on recently.",
    "How do you stay updated with the latest technology trends?",
    "What interests you most about this position?",
    "How do you handle tight deadlines and pressure?"
  ];

  useEffect(() => {
    if (interviewStarted && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log("Error accessing camera:", err));
    }
  }, [interviewStarted]);

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const startInterview = () => {
    setInterviewStarted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const endInterview = () => {
    setInterviewStarted(false);
    setCurrentQuestion(0);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  if (!interviewStarted) {
    return (
      <MainLayout userType="applicant">
        <div className="page-container">
          <div className="mb-8">
            <h1 className="mb-2">Video Interview</h1>
            <p className="text-muted-foreground">
              Prepare for your upcoming interview session
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Position: Frontend Developer</p>
                    <p className="text-sm text-muted-foreground">Tech Corp Inc.</p>
                  </div>
                  <div>
                    <p className="font-medium">Interview Type: Technical</p>
                    <p className="text-sm text-muted-foreground">Expected Duration: 45 minutes</p>
                  </div>
                  <div>
                    <p className="font-medium">Interviewer: Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Senior Engineering Manager</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    AI-Powered Interview
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Camera & Audio Check</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Test Camera
                      </Button>
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Test Audio
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Interview Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ensure good lighting and quiet environment</li>
                      <li>• Have your resume and portfolio ready</li>
                      <li>• Test your internet connection</li>
                      <li>• Prepare questions about the role</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button onClick={startInterview} size="lg">
                Start Interview
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-6">
          <h1 className="mb-2">Live Interview Session</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  {isVideoOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoOff className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button
                      variant={isVideoOn ? "secondary" : "destructive"}
                      size="sm"
                      onClick={toggleVideo}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={isAudioOn ? "secondary" : "destructive"}
                      size="sm"
                      onClick={toggleAudio}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={endInterview}>
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    {questions[currentQuestion]}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Take your time to answer thoughtfully. The AI will analyze your response.
                  </p>
                </div>

                <div className="flex gap-2">
                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={nextQuestion} className="flex-1">
                      Next Question
                    </Button>
                  ) : (
                    <Button onClick={endInterview} className="flex-1">
                      Complete Interview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
