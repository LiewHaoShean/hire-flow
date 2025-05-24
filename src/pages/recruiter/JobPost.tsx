
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import DocumentAIExtractor from "@/components/recruiter/DocumentAIExtractor";

// Define the schema for the job post form
const jobFormSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  salary: z.string().optional(),
  description: z.string().min(10, "Job description must be at least 10 characters"),
  responsibilities: z.string().min(10, "Responsibilities must be at least 10 characters"),
  qualifications: z.string().min(10, "Qualifications must be at least 10 characters"),
  benefits: z.string().optional(),
  newSkill: z.string().optional()
});

type SkillLevel = "beginner" | "intermediate" | "expert";

interface Skill {
  name: string;
  level: SkillLevel;
}

export default function JobPost() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>("intermediate");
  
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      employmentType: "full-time",
      salary: "",
      description: "",
      responsibilities: "",
      qualifications: "",
      benefits: "",
      newSkill: ""
    }
  });
  
  const addSkill = () => {
    const newSkill = form.getValues("newSkill");
    if (newSkill && !skills.some(skill => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { name: newSkill, level: newSkillLevel }]);
      form.setValue("newSkill", "");
    }
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  
  const getSkillBadgeColor = (level: SkillLevel) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "expert":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    }
  };
  
  const onSubmit = (data: z.infer<typeof jobFormSchema>) => {
    if (skills.length === 0) {
      toast.error("Please add at least one required skill");
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log({ 
      ...data, 
      requiredSkills: skills
    });
    
    toast.success("Job posted successfully!");
    
    // Reset form
    form.reset();
    setSkills([]);
  };
  
  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="mb-2">Post a Job</h1>
            <p className="text-muted-foreground">Create a new job posting to attract the best candidates</p>
          </div>
          
          <DocumentAIExtractor form={form} setSkills={setSkills} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic job information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. San Francisco, CA or Remote" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $100,000 - $130,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Required skills section */}
                <div className="space-y-4">
                  <div>
                    <FormLabel>Required Skills*</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className={getSkillBadgeColor(skill.level)}
                        >
                          {skill.name}
                          <button 
                            type="button"
                            className="ml-1 hover:text-destructive focus:outline-none"
                            onClick={() => removeSkill(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {skills.length === 0 && (
                        <p className="text-muted-foreground text-sm">No skills added yet</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <FormField
                      control={form.control}
                      name="newSkill"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Add Skill</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. React" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="mb-[2px]">
                      <FormLabel>Level</FormLabel>
                      <Select 
                        value={newSkillLevel} 
                        onValueChange={(value) => setNewSkillLevel(value as SkillLevel)}
                      >
                        <FormControl>
                          <SelectTrigger className={`w-36 ${getSkillBadgeColor(newSkillLevel)}`}>
                            <SelectValue placeholder="Skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner" className="bg-green-100 text-green-800 focus:bg-green-100 focus:text-green-800">
                            Beginner
                          </SelectItem>
                          <SelectItem value="intermediate" className="bg-blue-100 text-blue-800 focus:bg-blue-100 focus:text-blue-800">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="expert" className="bg-yellow-100 text-yellow-800 focus:bg-yellow-100 focus:text-yellow-800">
                            Expert
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSkill} 
                      className="mb-[2px]"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
                
                {/* Job description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the job role and requirements"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Responsibilities */}
                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the key responsibilities for this role"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Qualifications */}
                <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualifications*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List required qualifications, education, and experience"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Benefits */}
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe benefits, perks, and company culture"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Post Job
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
