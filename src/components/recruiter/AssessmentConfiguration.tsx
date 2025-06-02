
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Brain } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface AssessmentConfigurationProps {
  useAIAssessment: boolean;
  onSkillsChange: (skills: string[]) => void;
  onQuestionsChange: (questions: Question[]) => void;
  initialSkills?: string[];
  initialQuestions?: Question[];
}

export default function AssessmentConfiguration({ 
  useAIAssessment, 
  onSkillsChange, 
  onQuestionsChange,
  initialSkills = [],
  initialQuestions = []
}: AssessmentConfigurationProps) {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      onSkillsChange(updatedSkills);
      setNewSkill("");
      toast.success("Skill added for AI assessment generation");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
  };

  const addQuestion = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const question: Question = {
        id: Date.now().toString(),
        question: newQuestion.trim(),
        answer: newAnswer.trim()
      };
      const updatedQuestions = [...questions, question];
      setQuestions(updatedQuestions);
      onQuestionsChange(updatedQuestions);
      setNewQuestion("");
      setNewAnswer("");
      toast.success("Question added to assessment");
    }
  };

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);
  };

  if (useAIAssessment) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI-Generated Assessment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Skills for AI Assessment Generation</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Add skills that the AI should focus on when generating assessment questions
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-muted-foreground">No skills added yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="e.g. ReactJS, JavaScript, Node.js"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <Brain className="h-4 w-4 inline mr-1" />
              Our AI will automatically generate assessment questions based on the skills you specify. 
              The AI will also evaluate candidate responses and provide scoring.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Custom Assessment Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Assessment Questions & Answer Schema</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Add custom questions with expected answers. Our AI will use these to evaluate candidate responses.
          </p>

          <div className="space-y-3 mb-4">
            {questions.map((question) => (
              <div key={question.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">Question {questions.indexOf(question) + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="text-destructive hover:text-destructive h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm mb-2"><strong>Q:</strong> {question.question}</p>
                <p className="text-sm text-muted-foreground"><strong>Expected Answer:</strong> {question.answer}</p>
              </div>
            ))}
            {questions.length === 0 && (
              <p className="text-sm text-muted-foreground">No questions added yet</p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <Label>Question</Label>
              <Textarea
                placeholder="Enter your assessment question..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            <div>
              <Label>Expected Answer/Schema</Label>
              <Textarea
                placeholder="Describe the expected answer or key points for AI evaluation..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </div>
            <Button onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
