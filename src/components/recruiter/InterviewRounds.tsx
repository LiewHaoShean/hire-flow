
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ArrowRight, Plus, Edit, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Applicant {
  id: string;
  name: string;
  matchScore: number;
}

interface InterviewRound {
  key: string;
  title: string;
  color: string;
  interviewer?: string;
  venue?: string;
  duration?: string;
  interviewType?: "technical" | "behavioral" | "assessment" | "final";
}

interface InterviewRoundsProps {
  applicants: Applicant[];
}

export default function InterviewRounds({ applicants }: InterviewRoundsProps) {
  const [rounds, setRounds] = useState({
    round1: applicants.map(app => ({ ...app })),
    round2: [] as Applicant[],
    round3: [] as Applicant[]
  });

  const [draggedItem, setDraggedItem] = useState<Applicant | null>(null);
  const [draggedFromRound, setDraggedFromRound] = useState<string | null>(null);
  const [editingRound, setEditingRound] = useState<string | null>(null);
  const [isAddingRound, setIsAddingRound] = useState(false);

  const [roundConfig, setRoundConfig] = useState<InterviewRound[]>([
    { 
      key: 'round1', 
      title: 'Initial Screening', 
      color: 'bg-blue-50 border-blue-200',
      interviewer: 'HR Team',
      venue: 'Conference Room A',
      duration: '30 minutes',
      interviewType: 'behavioral'
    },
    { 
      key: 'round2', 
      title: 'Technical Interview', 
      color: 'bg-yellow-50 border-yellow-200',
      interviewer: 'Tech Lead',
      venue: 'Meeting Room B',
      duration: '60 minutes',
      interviewType: 'technical'
    },
    { 
      key: 'round3', 
      title: 'Final Interview', 
      color: 'bg-green-50 border-green-200',
      interviewer: 'CTO',
      venue: 'Executive Office',
      duration: '45 minutes',
      interviewType: 'final'
    }
  ]);

  const [editForm, setEditForm] = useState<Partial<InterviewRound>>({});
  const [newRoundForm, setNewRoundForm] = useState<Partial<InterviewRound>>({
    title: '',
    interviewer: '',
    venue: '',
    duration: '',
    interviewType: 'technical',
    color: 'bg-purple-50 border-purple-200'
  });

  const handleDragStart = (applicant: Applicant, roundKey: string) => {
    setDraggedItem(applicant);
    setDraggedFromRound(roundKey);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetRound: string) => {
    e.preventDefault();
    
    if (!draggedItem || !draggedFromRound) return;

    // Remove from source round
    const sourceRoundApplicants = rounds[draggedFromRound as keyof typeof rounds].filter(
      app => app.id !== draggedItem.id
    );

    // Add to target round
    const targetRoundApplicants = [...rounds[targetRound as keyof typeof rounds], draggedItem];

    setRounds(prev => ({
      ...prev,
      [draggedFromRound]: sourceRoundApplicants,
      [targetRound]: targetRoundApplicants
    }));

    setDraggedItem(null);
    setDraggedFromRound(null);
  };

  const startEditRound = (round: InterviewRound) => {
    setEditingRound(round.key);
    setEditForm(round);
  };

  const saveRoundEdit = () => {
    if (!editingRound) return;
    
    setRoundConfig(prev => prev.map(round => 
      round.key === editingRound 
        ? { ...round, ...editForm }
        : round
    ));
    
    setEditingRound(null);
    setEditForm({});
    toast.success("Interview round updated successfully!");
  };

  const cancelEdit = () => {
    setEditingRound(null);
    setEditForm({});
  };

  const addNewRound = () => {
    if (!newRoundForm.title || !newRoundForm.interviewer || !newRoundForm.venue) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newKey = `round${roundConfig.length + 1}`;
    const newRound: InterviewRound = {
      key: newKey,
      title: newRoundForm.title!,
      color: newRoundForm.color!,
      interviewer: newRoundForm.interviewer,
      venue: newRoundForm.venue,
      duration: newRoundForm.duration,
      interviewType: newRoundForm.interviewType as any
    };

    setRoundConfig(prev => [...prev, newRound]);
    setRounds(prev => ({ ...prev, [newKey]: [] }));
    
    setNewRoundForm({
      title: '',
      interviewer: '',
      venue: '',
      duration: '',
      interviewType: 'technical',
      color: 'bg-purple-50 border-purple-200'
    });
    setIsAddingRound(false);
    toast.success("New interview round added successfully!");
  };

  const getTypeColor = (type?: string) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Interview Rounds
          </CardTitle>
          <Button 
            onClick={() => setIsAddingRound(true)} 
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Round
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {roundConfig.map((round, index) => (
            <div key={round.key}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{round.title}</h4>
                  <Badge variant="outline">
                    {rounds[round.key as keyof typeof rounds]?.length || 0}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditRound(round)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  {index < roundConfig.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />
                  )}
                </div>
              </div>

              {editingRound === round.key ? (
                <div className="space-y-3 p-3 border rounded-lg bg-white mb-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Interviewer</Label>
                    <Input
                      value={editForm.interviewer || ''}
                      onChange={(e) => setEditForm({ ...editForm, interviewer: e.target.value })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Venue</Label>
                    <Input
                      value={editForm.venue || ''}
                      onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Duration</Label>
                    <Input
                      value={editForm.duration || ''}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select
                      value={editForm.interviewType}
                      onValueChange={(value) => setEditForm({ ...editForm, interviewType: value as any })}
                    >
                      <SelectTrigger className="h-8">
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
                  <div className="flex gap-2">
                    <Button onClick={saveRoundEdit} size="sm" className="h-6">
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button onClick={cancelEdit} variant="outline" size="sm" className="h-6">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div>👤 {round.interviewer}</div>
                  <div>📍 {round.venue}</div>
                  <div>⏱️ {round.duration}</div>
                  <Badge className={getTypeColor(round.interviewType)} variant="secondary">
                    {round.interviewType}
                  </Badge>
                </div>
              )}
              
              <div
                className={`min-h-[300px] p-3 rounded-lg border-2 border-dashed ${round.color} transition-colors`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, round.key)}
              >
                <div className="space-y-2">
                  {rounds[round.key as keyof typeof rounds]?.map((applicant) => (
                    <div
                      key={applicant.id}
                      draggable
                      onDragStart={() => handleDragStart(applicant, round.key)}
                      className="bg-white p-3 rounded-lg border shadow-sm cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{applicant.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            applicant.matchScore >= 90 
                              ? "bg-green-100 text-green-800" 
                              : applicant.matchScore >= 80 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {applicant.matchScore}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {(!rounds[round.key as keyof typeof rounds] || rounds[round.key as keyof typeof rounds].length === 0) && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      Drop applicants here
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isAddingRound && (
          <Card className="border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add New Interview Round</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title*</Label>
                  <Input
                    placeholder="e.g. Panel Interview"
                    value={newRoundForm.title}
                    onChange={(e) => setNewRoundForm({ ...newRoundForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Interviewer*</Label>
                  <Input
                    placeholder="e.g. Senior Manager"
                    value={newRoundForm.interviewer}
                    onChange={(e) => setNewRoundForm({ ...newRoundForm, interviewer: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Venue*</Label>
                  <Input
                    placeholder="e.g. Board Room"
                    value={newRoundForm.venue}
                    onChange={(e) => setNewRoundForm({ ...newRoundForm, venue: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. 90 minutes"
                    value={newRoundForm.duration}
                    onChange={(e) => setNewRoundForm({ ...newRoundForm, duration: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={newRoundForm.interviewType}
                    onValueChange={(value) => setNewRoundForm({ ...newRoundForm, interviewType: value as any })}
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
              <div className="flex gap-2">
                <Button onClick={addNewRound}>Add Round</Button>
                <Button variant="outline" onClick={() => setIsAddingRound(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
