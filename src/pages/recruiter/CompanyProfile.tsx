
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building, MapPin, Users, Award, Plus, X, Edit, Upload, FileText, Loader2 } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";

const companyProfileSchema = z.object({
  // Company Overview
  companyName: z.string().min(2, "Company name is required"),
  overview: z.string().min(10, "Company overview is required"),
  mission: z.string().min(10, "Mission statement is required"),
  vision: z.string().min(10, "Vision statement is required"),
  targetMarket: z.string().min(5, "Target market is required"),
  keyAchievements: z.string().min(10, "Key achievements are required"),
  
  // Company Location
  headquarters: z.string().min(5, "Headquarters location is required"),
  branchOffices: z.string().optional(),
  globalPresence: z.string().optional(),
  
  // Company Culture
  workingStyle: z.string().min(5, "Working style is required"),
  teamDynamic: z.string().min(10, "Team dynamic is required"),
  leadershipApproach: z.string().min(10, "Leadership approach is required"),
});

type CompanyProfileData = z.infer<typeof companyProfileSchema>;

export default function CompanyProfile() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [awards, setAwards] = useState<string[]>([]);
  const [newValue, setNewValue] = useState("");
  const [newAward, setNewAward] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  const form = useForm<CompanyProfileData>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: "",
      overview: "",
      mission: "",
      vision: "",
      targetMarket: "",
      keyAchievements: "",
      headquarters: "",
      branchOffices: "",
      globalPresence: "",
      workingStyle: "",
      teamDynamic: "",
      leadershipApproach: "",
    },
  });

  const extractCompanyDetailsFromDocument = (text: string) => {
    // Simulate AI extraction for company profile
    const mockExtraction = {
      companyName: "TechCorp Solutions",
      overview: "We are a leading technology company specializing in innovative software solutions for enterprise clients. Our products help businesses streamline operations and improve efficiency through cutting-edge technology.",
      mission: "To empower businesses worldwide through innovative technology solutions that drive growth and efficiency.",
      vision: "To be the global leader in enterprise software solutions, transforming how businesses operate in the digital age.",
      targetMarket: "Enterprise software, Fortune 500 companies, Technology sector",
      keyAchievements: "• 500+ enterprise clients worldwide\n• $100M+ in annual revenue\n• Award-winning customer support\n• 99.9% uptime guarantee",
      headquarters: "San Francisco, California, USA",
      branchOffices: "New York, London, Tokyo, Sydney",
      globalPresence: "North America, Europe, Asia-Pacific",
      workingStyle: "Collaborative, innovative, remote-first, fast-paced",
      teamDynamic: "Cross-functional teams working in agile sprints with emphasis on innovation and continuous learning. Regular team building activities and knowledge sharing sessions.",
      leadershipApproach: "Servant leadership approach with open communication, mentorship programs, and employee empowerment. Leaders focus on removing obstacles and supporting team growth.",
    };

    const mockValues = ["Innovation", "Collaboration", "Excellence", "Integrity"];
    const mockAwards = ["Best Tech Company 2024", "Industry Innovation Award", "Top Employer Certification"];

    return { extraction: mockExtraction, values: mockValues, awards: mockAwards };
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('document') && !file.type.includes('text')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const text = await file.text().catch(() => "Sample company document content");
      const { extraction, values: extractedValues, awards: extractedAwards } = extractCompanyDetailsFromDocument(text);
      
      // Auto-fill form fields
      Object.entries(extraction).forEach(([key, value]) => {
        form.setValue(key as keyof CompanyProfileData, value);
      });
      
      setValues(extractedValues);
      setAwards(extractedAwards);
      setIsEditing(true);
      
      toast({
        title: "Document Processed",
        description: "Company details have been extracted and filled automatically.",
      });
    } catch (error) {
      console.error("Error processing document:", error);
      toast({
        title: "Processing Failed",
        description: "Failed to process document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const onSubmit = async (data: CompanyProfileData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasProfile(true);
      setIsEditing(false);
      
      toast({
        title: "Company Profile Updated",
        description: "Your company profile has been successfully updated.",
      });
      
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update company profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addValue = () => {
    if (newValue.trim() && !values.includes(newValue.trim())) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (valueToRemove: string) => {
    setValues(values.filter(value => value !== valueToRemove));
  };

  const addAward = () => {
    if (newAward.trim() && !awards.includes(newAward.trim())) {
      setAwards([...awards, newAward.trim()]);
      setNewAward("");
    }
  };

  const removeAward = (awardToRemove: string) => {
    setAwards(awards.filter(award => award !== awardToRemove));
  };

  return (
    <MainLayout userType="recruiter">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-hr-blue" />
            <h1 className="text-3xl font-bold">Company Profile</h1>
          </div>
          
          <div className="flex gap-2">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleDocumentUpload}
              className="hidden"
              id="company-document-upload"
              disabled={isExtracting}
            />
            <label htmlFor="company-document-upload">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={isExtracting}
                asChild
              >
                <div className="cursor-pointer">
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Extract from Document
                    </>
                  )}
                </div>
              </Button>
            </label>
            
            {hasProfile && !isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {hasProfile && !isEditing ? (
          // View Mode
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{form.getValues("companyName")}</h3>
                  <p className="text-gray-600 mt-2">{form.getValues("overview")}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Mission</h4>
                    <p className="text-sm text-gray-600">{form.getValues("mission")}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Vision</h4>
                    <p className="text-sm text-gray-600">{form.getValues("vision")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Company Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Headquarters:</span> {form.getValues("headquarters")}
                  </div>
                  {form.getValues("branchOffices") && (
                    <div>
                      <span className="font-medium">Branch Offices:</span> {form.getValues("branchOffices")}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Company Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">Working Style:</span> {form.getValues("workingStyle")}
                  </div>
                  {values.length > 0 && (
                    <div>
                      <span className="font-medium">Values:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {values.map((value) => (
                          <Badge key={value} variant="secondary">{value}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {awards.map((award) => (
                      <Badge key={award} variant="outline" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Edit Mode
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Company Overview
                  </CardTitle>
                  <CardDescription>
                    Basic information about your company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="overview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What does your company do?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what your company does, products/services offered..."
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mission Statement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your company's mission..."
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vision"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vision Statement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your company's vision..."
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetMarket"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Market</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Enterprise software, Healthcare, FinTech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="keyAchievements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Achievements & Milestones</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Major achievements, milestones, growth metrics..."
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Company Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Company Location
                  </CardTitle>
                  <CardDescription>
                    Information about your company's physical presence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="headquarters"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headquarters Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State/Province, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="branchOffices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Offices (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List other office locations..."
                            rows={2}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="globalPresence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Global Presence (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Countries/regions where you operate..."
                            rows={2}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Company Culture */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Company Culture & Environment
                  </CardTitle>
                  <CardDescription>
                    Describe your company's culture and work environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Working Style</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Collaborative, Fast-paced, Flexible, Remote-first" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Company Values */}
                  <div className="space-y-2">
                    <FormLabel>Company Values</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a company value (e.g., Innovation, Inclusion)"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValue())}
                      />
                      <Button type="button" onClick={addValue} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value) => (
                        <Badge key={value} variant="secondary" className="flex items-center gap-1">
                          {value}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeValue(value)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="teamDynamic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Dynamic</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how teams work together, collaboration style..."
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="leadershipApproach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leadership Approach</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe leadership style, management approach..."
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Awards and Recognition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Awards & Recognition
                  </CardTitle>
                  <CardDescription>
                    Showcase your company's achievements and recognition
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Awards & Certifications</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an award or certification"
                        value={newAward}
                        onChange={(e) => setNewAward(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAward())}
                      />
                      <Button type="button" onClick={addAward} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {awards.map((award) => (
                        <Badge key={award} variant="outline" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {award}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeAward(award)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating Profile..." : "Save Company Profile"}
                </Button>
                {hasProfile && (
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </div>
    </MainLayout>
  );
}
