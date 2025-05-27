
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  matchScore: number;
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

  const roundConfig = [
    { key: 'round1', title: 'Initial Screening', color: 'bg-blue-50 border-blue-200' },
    { key: 'round2', title: 'Technical Interview', color: 'bg-yellow-50 border-yellow-200' },
    { key: 'round3', title: 'Final Interview', color: 'bg-green-50 border-green-200' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Interview Rounds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {roundConfig.map((round, index) => (
            <div key={round.key}>
              <div className="flex items-center mb-3">
                <h4 className="font-medium text-sm">{round.title}</h4>
                <Badge variant="outline" className="ml-2">
                  {rounds[round.key as keyof typeof rounds].length}
                </Badge>
                {index < roundConfig.length - 1 && (
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                )}
              </div>
              
              <div
                className={`min-h-[300px] p-3 rounded-lg border-2 border-dashed ${round.color} transition-colors`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, round.key)}
              >
                <div className="space-y-2">
                  {rounds[round.key as keyof typeof rounds].map((applicant) => (
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
                  
                  {rounds[round.key as keyof typeof rounds].length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      Drop applicants here
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
