import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Users, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import AssessmentConfiguration from "./AssessmentConfiguration";

export interface InterviewRound {
  id: string;
  title: string;
  interviewer: string;
  venue: string;
  interviewType: "technical" | "behavioral" | "assessment" | "final";
  duration: string;
  description: string;
  useAIAssessment?: boolean;
  assessmentSkills?: string[];
  assessmentQuestions?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

interface InterviewConfigurationProps {
  onComplete: (rounds: InterviewRound[]) => void;
  onBack: () => void;
}

export default function InterviewConfiguration({ onComplete, onBack }: InterviewConfigurationProps) {
  const [rounds, setRounds] = useState<InterviewRound[]>([]);
  const [isAddingRound, setIsAddingRound] = useState(false);
  const [newRound, setNewRound] = useState<Partial<InterviewRound>>({
    title: "",
    interviewer: "",
    venue: "",
    interviewType: "technical",
    duration: "",
    description: "",
    useAIAssessment: false,
    assessmentSkills: [],
    assessmentQuestions: []
  });

  const addRound = () => {
    if (!newRound.title || !newRound.interviewer || !newRound.venue || !newRound.duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate assessment configuration
    if (newRound.interviewType === "assessment") {
      if (newRound.useAIAssessment && (!newRound.assessmentSkills || newRound.assessmentSkills.length === 0)) {
        toast.error("Please add at least one skill for AI assessment generation");
        return;
      }
      if (!newRound.useAIAssessment && (!newRound.assessmentQuestions || newRound.assessmentQuestions.length === 0)) {
        toast.error("Please add at least one assessment question");
        return;
      }
    }

    const round: InterviewRound = {
      id: Date.now().toString(),
      title: newRound.title!,
      interviewer: newRound.interviewer!,
      venue: newRound.venue!,
      interviewType: newRound.interviewType as "technical" | "behavioral" | "assessment" | "final",
      duration: newRound.duration!,
      description: newRound.description || "",
      useAIAssessment: newRound.useAIAssessment || false,
      assessmentSkills: newRound.assessmentSkills || [],
      assessmentQuestions: newRound.assessmentQuestions || []
    };

    setRounds([...rounds, round]);
    setNewRound({
      title: "",
      interviewer: "",
      venue: "",
      interviewType: "technical",
      duration: "",
      description: "",
      useAIAssessment: false,
      assessmentSkills: [],
      assessmentQuestions: []
    });
    setIsAddingRound(false);
    toast.success("Interview round added successfully!");
  };

  const removeRound = (id: string) => {
    setRounds(rounds.filter(round => round.id !== id));
    toast.success("Interview round removed");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "behavioral":
        return "bg-green-100 text-green-800";
      case "assessment":
        return "bg-purple-100 text-purple-800";
      case "final":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleComplete = () => {
    if (rounds.length === 0) {
      toast.error("Please add at least one interview round");
      return;
    }
    onComplete(rounds);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Configure Interview Process</h2>
          <p className="text-muted-foreground">Set up interview rounds for this position</p>
        </div>
        <Button onClick={() => setIsAddingRound(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Interview Round
        </Button>
      </div>

      {/* Existing rounds */}
      <div className="grid gap-4">
        {rounds.map((round, index) => (
          <Card key={round.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{round.title}</CardTitle>
                    <Badge className={getTypeColor(round.interviewType)} variant="secondary">
                      {round.interviewType}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRound(round.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{round.interviewer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{round.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{round.duration}</span>
                </div>
              </div>
              {round.description && (
                <p className="text-sm text-muted-foreground mt-3">{round.description}</p>
              )}
              {round.interviewType === "assessment" && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  {round.useAIAssessment ? (
                    <div>
                      <Badge variant="outline" className="mb-2">AI Assessment</Badge>
                      <p className="text-sm text-muted-foreground">Skills: {round.assessmentSkills?.join(", ")}</p>
                    </div>
                  ) : (
                    <div>
                      <Badge variant="outline" className="mb-2">Custom Questions</Badge>
                      <p className="text-sm text-muted-foreground">{round.assessmentQuestions?.length} questions configured</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add new round form */}
      {isAddingRound && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Interview Round</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Round Title*</Label>
                <Input
                  id="title"
                  placeholder="e.g. Technical Interview"
                  value={newRound.title}
                  onChange={(e) => setNewRound({ ...newRound, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="interviewer">Interviewer*</Label>
                <Input
                  id="interviewer"
                  placeholder="e.g. John Smith"
                  value={newRound.interviewer}
                  onChange={(e) => setNewRound({ ...newRound, interviewer: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="venue">Venue*</Label>
                <Input
                  id="venue"
                  placeholder="e.g. Conference Room A or Zoom"
                  value={newRound.venue}
                  onChange={(e) => setNewRound({ ...newRound, venue: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration*</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 60 minutes"
                  value={newRound.duration}
                  onChange={(e) => setNewRound({ ...newRound, duration: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="type">Interview Type*</Label>
                <Select
                  value={newRound.interviewType}
                  onValueChange={(value) => setNewRound({ ...newRound, interviewType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Additional details about this interview round"
                value={newRound.description}
                onChange={(e) => setNewRound({ ...newRound, description: e.target.value })}
              />
            </div>

            {newRound.interviewType === "assessment" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aiAssessment"
                    checked={newRound.useAIAssessment}
                    onChange={(e) => setNewRound({ ...newRound, useAIAssessment: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="aiAssessment">Use AI-generated assessment questions</Label>
                </div>

                <AssessmentConfiguration
                  useAIAssessment={newRound.useAIAssessment || false}
                  onSkillsChange={(skills) => setNewRound({ ...newRound, assessmentSkills: skills })}
                  onQuestionsChange={(questions) => setNewRound({ ...newRound, assessmentQuestions: questions })}
                  initialSkills={newRound.assessmentSkills}
                  initialQuestions={newRound.assessmentQuestions}
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button onClick={addRound}>Add Round</Button>
              <Button variant="outline" onClick={() => setIsAddingRound(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {rounds.length === 0 && !isAddingRound && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No interview rounds added yet</h3>
            <p className="text-muted-foreground mb-4">Add interview rounds to structure your hiring process</p>
            <Button onClick={() => setIsAddingRound(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Round
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Job Details
        </Button>
        <Button onClick={handleComplete} disabled={rounds.length === 0}>
          Post Job
        </Button>
      </div>
    </div>
  );
}
