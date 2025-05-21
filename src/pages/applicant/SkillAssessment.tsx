
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChipIcon } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import SkillCard from "@/components/applicant/SkillCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
          {/* Add Skill Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChipIcon className="mr-2 h-5 w-5" />
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
                  <ChipIcon className="mx-auto h-10 w-10 text-gray-300 mb-3" />
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
    </MainLayout>
  );
}
