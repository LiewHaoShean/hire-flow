
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Plus, Trash2 } from "lucide-react";

import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["full-time", "part-time", "contract", "internship"], {
    required_error: "Please select a job type",
  }),
  experience: z.enum(["entry", "mid", "senior", "lead"], {
    required_error: "Please select experience level",
  }),
  salary: z.string().optional(),
  description: z.string().min(20, "Job description must be at least 20 characters"),
  requirements: z.string().min(20, "Job requirements must be at least 20 characters"),
  benefits: z.string().min(20, "Benefits must be at least 20 characters"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function JobPost() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      type: "full-time",
      experience: "mid",
      salary: "",
      description: "",
      requirements: "",
      benefits: "",
    },
  });
  
  const onSubmit = (data: JobFormValues) => {
    toast({
      title: "Job Posted Successfully",
      description: "Your job listing is now live and will be shown to potential candidates.",
    });
    
    // Reset form
    form.reset();
    setRequiredSkills([]);
  };
  
  const addSkill = () => {
    if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter(skill => skill !== skillToRemove));
  };
  
  const handleUploadJobDescription = () => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false);
        
        // Populate the form with "extracted" data
        form.setValue("title", "Senior Frontend Developer");
        form.setValue("department", "Engineering");
        form.setValue("location", "Remote (US)");
        form.setValue("type", "full-time");
        form.setValue("experience", "senior");
        form.setValue("salary", "$120,000 - $150,000");
        form.setValue("description", "We are looking for a Senior Frontend Developer to join our growing engineering team. You will be responsible for building high-quality, performant, and responsive web applications using modern JavaScript frameworks and libraries. You will collaborate with designers, backend engineers, and product managers to deliver exceptional user experiences.");
        form.setValue("requirements", "- 5+ years of experience with frontend development\n- Strong proficiency in JavaScript, HTML, and CSS\n- Experience with React and its ecosystem\n- Familiarity with TypeScript and state management libraries\n- Experience with responsive design and cross-browser compatibility\n- Understanding of web performance optimization techniques\n- Strong communication and collaboration skills");
        form.setValue("benefits", "- Competitive salary and equity package\n- Remote-first work environment\n- Health, dental, and vision insurance\n- 401(k) matching\n- Unlimited PTO\n- Professional development stipend\n- Home office setup allowance");
        
        // Add extracted skills
        setRequiredSkills([
          "React",
          "TypeScript",
          "JavaScript",
          "HTML/CSS",
          "Redux",
          "Responsive Design",
          "Web Performance"
        ]);
        
        toast({
          title: "Job Description Processed",
          description: "The AI has extracted job details. Please review and edit as needed.",
        });
      }, 2000);
    }, 1500);
  };
  
  return (
    <MainLayout userType="recruiter">
      <div className="page-container max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">Post a New Job</h1>
            <p className="text-muted-foreground">Create a job listing to attract qualified candidates</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleUploadJobDescription}
            disabled={isUploading || isProcessing}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Job Description"}
          </Button>
        </div>
        
        {isProcessing && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="py-4">
              <div className="flex items-center">
                <div className="animate-spin mr-2">
                  <svg className="h-5 w-5 text-hr-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-hr-blue">Processing Job Description</p>
                  <p className="text-sm text-hr-blue-dark">Our AI is analyzing the document and extracting relevant information...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details about this position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Frontend Developer" {...field} />
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
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Remote, New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional, but listings with salary ranges get more applications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="full-time" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Full-time
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="part-time" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Part-time
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="contract" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Contract
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="internship" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Internship
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="entry" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Entry Level
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mid" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Mid Level
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="senior" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Senior
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="lead" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Lead
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Add skills that candidates must have for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 pl-3 pr-2 flex items-center gap-1">
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill(skill)} 
                        className="ml-1 hover:bg-gray-200 rounded-full"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a required skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Provide comprehensive information about the position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List qualifications, education, and experience needed..."
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits & Perks*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe compensation, benefits, work environment, and other perks..."
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Post Job
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
