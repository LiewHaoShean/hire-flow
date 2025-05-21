
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SkillCardProps {
  skill: string;
  level?: string;
  category: string;
}

export default function SkillCard({ skill, level, category }: SkillCardProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [skillRating, setSkillRating] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const { toast } = useToast();
  
  const handleEvaluate = () => {
    setIsEvaluating(true);
    
    // Simulate AI evaluation process
    setTimeout(() => {
      // Generate a random rating between 65 and 95
      const rating = Math.floor(Math.random() * 31) + 65;
      setSkillRating(rating);
      setIsEvaluating(false);
      setIsEvaluated(true);
      
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
    return "Beginner";
  };
  
  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "bg-green-500";
    if (rating >= 80) return "bg-blue-500";
    if (rating >= 70) return "bg-yellow-500";
    return "bg-orange-400";
  };
  
  return (
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
  );
}
