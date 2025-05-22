
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tag, Briefcase, Search } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import SkillCard from "@/components/applicant/SkillCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const skillSchema = z.object({
  skill: z.string().min(1, "Skill is required"),
  category: z.string().min(1, "Category is required"),
});

type SkillFormValues = z.infer<typeof skillSchema>;

export default function SkillAssessment() {
  const { toast } = useToast();
  const [skills, setSkills] = useState([
    { skill: "React", category: "Frontend", level: "Advanced" },
    { skill: "TypeScript", category: "Programming Language", level: "Intermediate" },
    { skill: "Node.js", category: "Backend", level: "Intermediate" },
    { skill: "GraphQL", category: "API", level: "Beginner" },
  ]);
  
  const [showCareerSuggestions, setShowCareerSuggestions] = useState(false);
  const [careerSearchInput, setCareerSearchInput] = useState("");
  
  const suggestedCareers = [
    { title: "Frontend Developer", match: 95, skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS"] },
    { title: "Full Stack Developer", match: 85, skills: ["React", "Node.js", "JavaScript", "GraphQL", "Database"] },
    { title: "UI Developer", match: 80, skills: ["React", "CSS", "HTML", "Design Systems"] },
  ];
  
  const careerRequirements = {
    "Frontend Developer": ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Redux", "Testing"],
    "Backend Developer": ["Node.js", "Express", "Databases", "API Design", "Authentication", "Testing"],
    "Full Stack Developer": ["JavaScript", "React", "Node.js", "Databases", "API Design", "CSS"],
    "Data Scientist": ["Python", "Statistics", "Machine Learning", "Data Analysis", "SQL"],
    "DevOps Engineer": ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms", "Scripting"],
    "UI/UX Designer": ["Figma", "Design Systems", "User Research", "Prototyping", "Visual Design"]
  };
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
      category: "",
    },
  });
  
  function onSubmit(data: SkillFormValues) {
    const newSkill = {
      skill: data.skill,
      category: data.category,
      level: "Not Evaluated",
    };
    
    setSkills([...skills, newSkill]);
    form.reset();
    
    toast({
      title: "Skill Added",
      description: `${data.skill} has been added to your profile.`,
    });
  }
  
  const handleCareerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter the careers based on input
    // For now, we'll just display the dialog
    setShowCareerSuggestions(true);
  };
  
  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Skill Assessment</h1>
          <p className="text-muted-foreground">
            Evaluate and showcase your skills to potential employers
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            {/* Add Skill Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Add New Skill
                </CardTitle>
                <CardDescription>Add skills to your profile for assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. JavaScript, Project Management" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Programming, Design, Management" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Add Skill</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Career Suggestion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Career Suggestions
                </CardTitle>
                <CardDescription>Discover careers that match your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on your current skills, you might be a good fit for:
                    </p>
                    {suggestedCareers.map((career, index) => (
                      <div 
                        key={index} 
                        className="mb-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{career.title}</span>
                          <Badge variant={career.match >= 90 ? "default" : "outline"}>
                            {career.match}% Match
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {career.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs text-muted-foreground">
                              {skill}{i < Math.min(3, career.skills.length) - 1 ? " • " : ""}
                            </span>
                          ))}
                          {career.skills.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{career.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Search for specific career requirements:
                    </p>
                    <form onSubmit={handleCareerSearch} className="flex gap-2">
                      <Input 
                        placeholder="e.g. Data Scientist" 
                        value={careerSearchInput}
                        onChange={(e) => setCareerSearchInput(e.target.value)}
                      />
                      <Button type="submit">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="mb-6">
                <h2 className="text-lg font-semibold mb-3">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                  ))}
                </div>
              </div>
            ))}
            
            {skills.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <Tag className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No skills added yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add skills to your profile to get them evaluated
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Career Requirements Dialog */}
      <Dialog open={showCareerSuggestions} onOpenChange={setShowCareerSuggestions}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Career Requirements: {careerSearchInput || "Popular Careers"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {(careerSearchInput ? 
              Object.entries(careerRequirements)
                .filter(([career]) => career.toLowerCase().includes(careerSearchInput.toLowerCase()))
              : Object.entries(careerRequirements)
            ).map(([career, requiredSkills]) => (
              <div key={career} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">{career}</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, i) => {
                      const hasSkill = skills.some(s => 
                        s.skill.toLowerCase() === skill.toLowerCase()
                      );
                      
                      return (
                        <Badge 
                          key={i} 
                          variant={hasSkill ? "default" : "outline"}
                          className={!hasSkill ? "opacity-70" : ""}
                        >
                          {hasSkill ? "✓ " : ""}{skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">
                    {requiredSkills.filter(skill => 
                      skills.some(s => s.skill.toLowerCase() === skill.toLowerCase())
                    ).length} of {requiredSkills.length} skills matched
                  </p>
                </div>
              </div>
            ))}
            
            {careerSearchInput && 
             !Object.keys(careerRequirements).some(
               career => career.toLowerCase().includes(careerSearchInput.toLowerCase())
             ) && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No careers found matching "{careerSearchInput}"</p>
                <Button variant="outline" className="mt-4" onClick={() => setCareerSearchInput("")}>
                  Show All Careers
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCareerSuggestions(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
