import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Timer, Search } from "lucide-react";

interface SkillCardProps {
  skill: string;
  level?: string;
  category: string;
}

export default function SkillCard({ skill, level, category }: SkillCardProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [skillRating, setSkillRating] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showEvalDialog, setShowEvalDialog] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [showCourseRecommendations, setShowCourseRecommendations] = useState(false);
  const { toast } = useToast();
  
  const courses = {
    Programming: [
      { title: "Modern JavaScript from the Beginning", platform: "Udemy", url: "#" },
      { title: "The Complete Guide to React", platform: "Udemy", url: "#" },
      { title: "TypeScript Deep Dive", platform: "Coursera", url: "#" },
    ],
    Design: [
      { title: "UI/UX Design Principles", platform: "Coursera", url: "#" },
      { title: "Advanced Web Design", platform: "Udemy", url: "#" },
    ],
    Management: [
      { title: "Project Management Professional", platform: "Coursera", url: "#" },
      { title: "Agile and Scrum Mastery", platform: "Udemy", url: "#" },
    ],
    API: [
      { title: "GraphQL Masterclass", platform: "Udemy", url: "#" },
      { title: "RESTful API Design", platform: "Coursera", url: "#" },
    ],
    Frontend: [
      { title: "Advanced React Patterns", platform: "Udemy", url: "#" },
      { title: "Modern CSS for Developers", platform: "Coursera", url: "#" },
    ],
    Backend: [
      { title: "Node.js, Express & MongoDB", platform: "Udemy", url: "#" },
      { title: "Advanced Backend Development", platform: "Coursera", url: "#" },
    ],
    "Programming Language": [
      { title: "TypeScript Deep Dive", platform: "Udemy", url: "#" },
      { title: "JavaScript: The Advanced Concepts", platform: "Coursera", url: "#" },
    ],
  };
  
  const handleEvaluate = () => {
    setShowEvalDialog(true);
    
    // Start the timer
    let time = 5;
    const timer = setInterval(() => {
      time--;
      setTimeRemaining(time);
      
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  
  const handleSubmitEvaluation = () => {
    setShowEvalDialog(false);
    setIsEvaluating(true);
    
    // Simulate AI evaluation process
    setTimeout(() => {
      let rating;
      
      // Special case for React - always return below 50%
      if (skill.toLowerCase() === 'react') {
        rating = Math.floor(Math.random() * 20) + 30; // 30-49
      } else {
        // Generate a random rating between 30 and 95 for other skills
        rating = Math.floor(Math.random() * 66) + 30;
      }
      
      setSkillRating(rating);
      setIsEvaluating(false);
      setIsEvaluated(true);
      
      if (rating < 50) {
        setShowCourseRecommendations(true);
      }
      
      toast({
        title: "Skill Evaluated",
        description: `Your ${skill} skill has been assessed.`,
      });
    }, 2000);
  };
  
  const getRatingText = (rating: number) => {
    if (rating >= 90) return "Expert";
    if (rating >= 80) return "Advanced";
    if (rating >= 70) return "Intermediate";
    if (rating >= 50) return "Beginner";
    return "Needs Improvement";
  };
  
  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "bg-green-500";
    if (rating >= 80) return "bg-blue-500";
    if (rating >= 70) return "bg-yellow-500";
    if (rating >= 50) return "bg-orange-400";
    return "bg-red-500";
  };
  
  const getRecommendedCourses = () => {
    const categoryKey = Object.keys(courses).find(key => 
      key === category || skill.toLowerCase().includes(key.toLowerCase())
    );
    
    return categoryKey ? courses[categoryKey as keyof typeof courses] : courses.Programming;
  };
  
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{skill}</h3>
              <Badge variant="outline" className="mt-1">{category}</Badge>
            </div>
            {level && <Badge>{level}</Badge>}
          </div>
          
          {isEvaluated && skillRating && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Skill Strength</span>
                <span className="text-sm font-semibold">{skillRating}%</span>
              </div>
              <Progress value={skillRating} className={getRatingColor(skillRating)} />
              <p className="text-sm text-muted-foreground mt-2">
                Rating: <span className="font-medium">{getRatingText(skillRating)}</span>
              </p>
            </div>
          )}
        </CardContent>
        
        {!isEvaluated && (
          <CardFooter className="bg-muted/50 px-6 py-4">
            <Button 
              onClick={handleEvaluate} 
              disabled={isEvaluating} 
              className="w-full"
            >
              {isEvaluating ? "Evaluating..." : "Evaluate Skill"}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Skill Evaluation Dialog */}
      <Dialog open={showEvalDialog} onOpenChange={setShowEvalDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Skill Assessment: {skill}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="border rounded-lg p-6 bg-white">
                <h3 className="text-lg font-medium mb-3">Assessment Questions</h3>
                
                {category === "Programming Language" || category === "Frontend" || category === "Backend" ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">1. What is the primary use case for {skill}?</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                    <div>
                      <p className="font-medium">2. Describe a challenging problem you solved using {skill}.</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                    <div>
                      <p className="font-medium">3. Rate your proficiency in {skill} on a scale of 1-10 and explain why.</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">1. How would you describe your experience with {skill}?</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                    <div>
                      <p className="font-medium">2. Provide an example of how you've used {skill} in a professional setting.</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                    <div>
                      <p className="font-medium">3. What aspects of {skill} do you want to improve?</p>
                      <textarea 
                        className="mt-2 w-full border rounded-md p-2 h-20" 
                        placeholder="Enter your answer here"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="border rounded-lg p-4 bg-gray-900 flex-grow flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p>Camera Recording</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-center">
                  <Timer className="h-5 w-5 text-hr-blue mr-2" />
                  <span className="text-xl font-bold">{timeRemaining}s</span>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-1">Time Remaining</p>
              </div>
              
              <Button 
                onClick={handleSubmitEvaluation}
                disabled={timeRemaining > 0}
              >
                Submit Answers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Course Recommendations Dialog */}
      <Dialog open={showCourseRecommendations} onOpenChange={setShowCourseRecommendations}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recommended Courses for {skill}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Based on your assessment, we recommend these courses to improve your {skill} skills:
            </p>
            
            <div className="space-y-4">
              {getRecommendedCourses().map((course, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.platform}</p>
                    </div>
                    <Badge variant="outline">{course.platform}</Badge>
                  </div>
                  <Button variant="link" className="px-0 py-1 h-auto" asChild>
                    <a href={course.url} target="_blank" rel="noopener noreferrer">View Course</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCourseRecommendations(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
